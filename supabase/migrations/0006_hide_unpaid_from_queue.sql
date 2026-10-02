-- Views rebuilt for the awaiting_payment state.
--
-- published_tools already required status = 'approved', so an unpaid listing
-- was never public; it is rebuilt only because my_submissions is, and keeping
-- the two in step is cheaper than remembering which one changed.
--
-- my_submissions now passes awaiting_payment through, because the owner must
-- be able to see it and finish paying. The admin queue excludes it in the
-- application, not here, so a reviewer can still be shown unpaid rows
-- deliberately if that is ever wanted.
--
-- Idempotent. Run after 0005, in a separate statement from it: a new enum
-- value cannot be used in the same transaction that added it.

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
    -- 'spam' still reads as 'declined': saying otherwise invites an argument
    -- and tells a spammer what tripped the filter. awaiting_payment is shown
    -- as itself, because the owner is the one who can resolve it.
    (case when s.status = 'spam' then 'declined' else s.status::text end) as status,
    public.is_sponsored(s.sponsored, s.sponsored_until, s.sponsored_lifetime) as sponsored,
    s.sponsored_until,
    s.sponsored_lifetime,
    s.submitted_at,
    s.reviewed_at
  from public.submissions s
  where s.owner_id = auth.uid();

grant select on public.my_submissions to authenticated;
