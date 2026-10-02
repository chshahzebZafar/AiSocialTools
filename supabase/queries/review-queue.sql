-- Reviewing the submission queue, and spotting spam in it.
--
-- Paste any single block into the Supabase SQL editor. These are read-only -
-- nothing here changes a status. Moderation stays in /admin so the decision
-- email fires; a status changed directly in SQL skips that and the submitter
-- is never told.
--
-- Requires the migration to have run. Before that, submissions is empty and
-- every query below returns nothing.


-- ===========================================================================
-- 1. Where everything stands
-- ===========================================================================
select
  status,
  count(*) as submissions,
  count(*) filter (where slug is not null) as published,
  min(submitted_at)::date as oldest,
  max(submitted_at)::date as newest
from public.submissions
group by status
order by submissions desc;


-- ===========================================================================
-- 2. The queue: everything waiting on a decision, oldest first
--
-- Oldest first on purpose - someone who submitted three weeks ago has been
-- waiting longest, and the confirmation email promised a review in 7 days.
-- ===========================================================================
select
  reference,
  submitted_at::date as submitted,
  (current_date - submitted_at::date) as days_waiting,
  name,
  url,
  category,
  pricing,
  submitter_email,
  left(description, 90) as description_start
from public.submissions
where status = 'new'
order by submitted_at asc;


-- ===========================================================================
-- 3. Spam signals among the pending submissions
--
-- Signals, not verdicts. Each one is a reason to look harder, not a reason to
-- decline - a legitimate founder submitting two tools from one domain trips
-- the same check as someone spraying links. Read the row before deciding.
-- ===========================================================================
with pending as (
  select
    *,
    lower(split_part(regexp_replace(url, '^https?://(www\.)?', ''), '/', 1)) as domain
  from public.submissions
  where status = 'new'
),
by_email as (
  select submitter_email, count(*) as n
  from pending
  where submitter_email <> ''
  group by submitter_email
),
by_domain as (
  select domain, count(*) as n from pending group by domain
)
select
  p.reference,
  p.name,
  p.url,
  p.submitter_email,
  -- Each flag is independent; several at once is the interesting case.
  (select n from by_email e where e.submitter_email = p.submitter_email) as from_same_email,
  (select n from by_domain d where d.domain = p.domain) as from_same_domain,
  length(p.description) as description_length,
  (p.url not like 'https://%') as not_https,
  (p.description = '' or length(p.description) < 60) as thin_description,
  (p.tagline = '') as no_tagline,
  -- A domain already listed means a duplicate submission, or someone trying
  -- to get a second entry for the same product.
  exists (
    select 1 from public.submissions s2
    where s2.status = 'approved'
      and lower(split_part(regexp_replace(s2.url, '^https?://(www\.)?', ''), '/', 1)) = p.domain
  ) as domain_already_listed,
  p.submitted_at::date as submitted
from pending p
order by
  (select n from by_email e where e.submitter_email = p.submitter_email) desc nulls last,
  length(p.description) asc;


-- ===========================================================================
-- 4. Bursts: several submissions from one person within a few minutes
--
-- The clearest automated-submission signal in the data. A person filling in a
-- form takes minutes per tool; a script does not.
-- ===========================================================================
select
  submitter_email,
  count(*) as submissions,
  min(submitted_at) as first_at,
  max(submitted_at) as last_at,
  extract(epoch from (max(submitted_at) - min(submitted_at)))::int / 60 as spread_minutes,
  string_agg(name, ' | ' order by submitted_at) as tools
from public.submissions
where status = 'new' and submitter_email <> ''
group by submitter_email
having count(*) > 1
order by spread_minutes asc, submissions desc;


-- ===========================================================================
-- 5. What was already filed as spam
--
-- Useful for calibration: if pending rows look like these, they probably are.
-- Submitters are never told they were filed as spam - my_submissions reports
-- it as 'declined' - so this view is internal only.
-- ===========================================================================
select
  reference,
  submitted_at::date as submitted,
  name,
  url,
  submitter_email
from public.submissions
where status = 'spam'
order by submitted_at desc;
