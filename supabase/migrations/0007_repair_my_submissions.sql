-- Repair: recreate my_submissions and reload the API schema cache.
--
-- Symptom: the dashboard shows
--   PGRST205 Could not find the table 'public.my_submissions' in the schema cache
-- while published_tools works. 0006 drops the view before recreating it, so if
-- the create did not land, the view is simply gone.
--
-- This is the whole view in one statement plus a cache reload, so it fixes
-- both possible causes: a missing view, and a view that exists while PostgREST
-- still has not noticed it.
--
-- Run it on its own and READ THE RESULT. "Success. No rows returned" means it
-- worked; anything red means it did not, and the message matters.
--
-- Idempotent. Safe to run repeatedly.

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
    -- 'spam' reads as 'declined' to its submitter; 'awaiting_payment' is shown
    -- as itself, because the owner is the only person who can resolve it.
    (case when s.status = 'spam' then 'declined' else s.status::text end) as status,
    public.is_sponsored(s.sponsored, s.sponsored_until, s.sponsored_lifetime) as sponsored,
    s.sponsored_until,
    s.sponsored_lifetime,
    s.submitted_at,
    s.reviewed_at
  from public.submissions s
  where s.owner_id = auth.uid();

grant select on public.my_submissions to authenticated;

-- PostgREST caches the schema and does not always notice a dropped and
-- recreated view. This tells it to look again.
notify pgrst, 'reload schema';
