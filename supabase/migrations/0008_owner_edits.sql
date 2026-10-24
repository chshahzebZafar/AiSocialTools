-- Let owners edit their published listings, and let the reviewer see it.
--
-- An owner can change what their listing SAYS - title, tagline, description,
-- category, pricing, features. They cannot change where it POINTS. The URL is
-- what was reviewed, and letting it move after approval is the classic
-- bait-and-switch: submit something reasonable, get approved, then repoint the
-- published page at anything. The URL column is simply not in the editable set
-- in the application, and the slug is assigned once on first approval.
--
-- last_edited_at exists so moderation is not blind. A listing edited after it
-- was reviewed stays live - taking a page down because someone fixed a typo
-- would be worse - but /admin can see that it changed and re-read it.
--
-- Idempotent. Run after 0007.

alter table public.submissions
  add column if not exists last_edited_at timestamptz;

-- The reviewer's queue sorts on this, so it is worth an index once there are
-- enough rows for the scan to matter.
create index if not exists submissions_edited_since_review_idx
  on public.submissions (last_edited_at desc)
  where last_edited_at is not null;

-- my_submissions gains the field so the owner's dashboard can show when they
-- last changed something. Dropped and recreated: CREATE OR REPLACE VIEW only
-- appends columns, and this one lands beside the existing timestamps.
drop view if exists public.my_submissions;

create view public.my_submissions
with (security_invoker = true) as
  select
    s.id,
    s.reference,
    s.name,
    s.url,
    s.tagline,
    s.description,
    s.category,
    s.pricing,
    s.pricing_details,
    s.features,
    s.twitter,
    s.founder,
    s.slug,
    (case when s.status = 'spam' then 'declined' else s.status::text end) as status,
    public.is_sponsored(s.sponsored, s.sponsored_until, s.sponsored_lifetime) as sponsored,
    s.sponsored_until,
    s.sponsored_lifetime,
    s.submitted_at,
    s.reviewed_at,
    s.last_edited_at
  from public.submissions s
  where s.owner_id = auth.uid();

grant select on public.my_submissions to authenticated;

-- PostgREST caches the schema and does not always notice a recreated view.
notify pgrst, 'reload schema';
