-- Lifetime featured placements.
--
-- The pricing moved from "$5 for 30 days" to "$5 once, for the life of the
-- listing", so a placement needs to be able to have no end date. This is an
-- explicit flag rather than treating a null sponsored_until as "forever",
-- because a missing date is far more often a mistake than an intention.
--
-- Idempotent - safe to run twice. Run after 0001.

alter table public.submissions
  add column if not exists sponsored_lifetime boolean not null default false;

-- A lifetime placement outranks the date check; otherwise the rules are
-- unchanged, and both flavours still require `sponsored` to be true.
create or replace function public.is_sponsored(
  sponsored boolean,
  sponsored_until date,
  sponsored_lifetime boolean default false
)
returns boolean language sql immutable as $$
  select coalesce(sponsored, false)
     and (
       coalesce(sponsored_lifetime, false)
       or (sponsored_until is not null
           and sponsored_until >= (now() at time zone 'utc')::date)
     );
$$;

-- Both views call is_sponsored, so they are rebuilt against the new signature.
--
-- Dropped rather than replaced: CREATE OR REPLACE VIEW can only append columns
-- to the end of the list. my_submissions gains sponsored_lifetime in the
-- middle, which Postgres reads as renaming the column that was already in that
-- position and refuses with 42P16.
drop view if exists public.published_tools;
drop view if exists public.my_submissions;

create view public.published_tools as
  select
    s.id,
    s.slug,
    s.name,
    s.tagline,
    s.description,
    s.url,
    s.category,
    s.pricing,
    s.pricing_details,
    s.features,
    s.founder,
    s.twitter,
    s.submitted_at,
    public.is_sponsored(s.sponsored, s.sponsored_until, s.sponsored_lifetime) as sponsored
  from public.submissions s
  where s.status = 'approved' and s.slug is not null;

grant select on public.published_tools to anon, authenticated;

create view public.my_submissions
with (security_invoker = true) as
  select
    s.id,
    s.reference,
    s.name,
    s.url,
    s.tagline,
    s.category,
    s.pricing,
    s.slug,
    (case when s.status = 'spam' then 'declined' else s.status::text end) as status,
    public.is_sponsored(s.sponsored, s.sponsored_until, s.sponsored_lifetime) as sponsored,
    s.sponsored_until,
    s.sponsored_lifetime,
    s.submitted_at
  from public.submissions s
  where s.owner_id = auth.uid();

grant select on public.my_submissions to authenticated;
