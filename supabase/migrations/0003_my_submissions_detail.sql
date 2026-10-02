-- The owner's view of their own listing needs the full detail.
--
-- my_submissions was built for a summary list, so it carries no description,
-- features or pricing detail. The dashboard now shows a submitter everything
-- they entered, so the view has to return it.
--
-- Still RLS-filtered to auth.uid() and still reports 'spam' as 'declined'.
-- Submitter name, email and role are deliberately absent: the owner already
-- knows who they are, and the columns exist only for moderation.
--
-- Dropped before recreation because CREATE OR REPLACE VIEW can only append
-- columns, and this inserts several in the middle (42P16 otherwise).
-- Idempotent. Run after 0002.

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
    s.reviewed_at
  from public.submissions s
  where s.owner_id = auth.uid();

grant select on public.my_submissions to authenticated;
