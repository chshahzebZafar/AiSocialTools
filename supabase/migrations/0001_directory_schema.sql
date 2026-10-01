-- AI directory backend: accounts, listings, paid placement.
--
-- Run this in the Supabase SQL editor (or `supabase db push`) before pointing
-- the app at Supabase. It is idempotent - safe to run twice.
--
-- Design notes worth knowing before changing anything here:
--
--  * RLS is row-level, not column-level. A submitter must never see the
--    private reviewer note on their own row, so notes live in a separate
--    table (submission_notes) that no client policy grants access to. Putting
--    them in a column on submissions would leak them the moment the browser
--    queries the table directly.
--
--  * Submitters can insert and read their own rows but can never write
--    status, slug or sponsorship. Those are moderation and billing decisions;
--    a column-level grant keeps that true even if an API route is careless.
--
--  * Everything the public directory reads comes from a view that exposes
--    approved rows only, so "what is published" is enforced by the database
--    rather than by remembering to add .eq('status','approved') everywhere.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles: one row per auth user, created automatically on signup
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text,
  display_name text,
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles: read own" on public.profiles;
create policy "profiles: read own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles: update own" on public.profiles;
create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Supabase creates the auth user; this mirrors it into profiles so the app has
-- somewhere to hang display names without touching the auth schema.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- submissions: the directory inbox and, once approved, the listing itself
-- ---------------------------------------------------------------------------
do $$ begin
  create type submission_status as enum ('new', 'approved', 'declined', 'spam');
exception when duplicate_object then null; end $$;

create table if not exists public.submissions (
  id              uuid primary key default gen_random_uuid(),
  -- Human-facing reference quoted in emails (SC-20260920-AB12).
  reference       text unique not null,
  owner_id        uuid references auth.users (id) on delete set null,

  name            text not null,
  url             text not null,
  tagline         text not null default '',
  description     text not null default '',
  category        text not null default '',
  pricing         text not null default '',
  pricing_details text not null default '',
  features        text not null default '',
  twitter         text not null default '',
  founder         text not null default '',

  submitter_name  text not null default '',
  submitter_email text not null default '',
  submitter_role  text not null default '',

  status          submission_status not null default 'new',
  -- Assigned once on first approval and never changed: a published URL must
  -- not move underneath anyone who linked to it.
  slug            text unique,
  source          text not null default 'form',

  -- Paid placement. Both must be set for it to count; see is_sponsored().
  sponsored       boolean not null default false,
  sponsored_until date,

  -- Which decision the submitter was last emailed about, so the same button
  -- pressed twice does not send twice.
  notified_status submission_status,
  notified_at     timestamptz,

  submitted_at    timestamptz not null default now(),
  reviewed_at     timestamptz
);

create index if not exists submissions_owner_idx   on public.submissions (owner_id);
create index if not exists submissions_status_idx  on public.submissions (status);
create index if not exists submissions_added_idx   on public.submissions (submitted_at desc);
-- Partial index: the public directory only ever reads approved rows.
create index if not exists submissions_published_idx
  on public.submissions (submitted_at desc) where status = 'approved';

alter table public.submissions enable row level security;

-- Submitters read their own rows. Anonymous submissions (owner_id null) are
-- claimed by email only through the server, never by a client policy - an
-- email address in a JWT is not proof of anything the client cannot forge.
drop policy if exists "submissions: read own" on public.submissions;
create policy "submissions: read own" on public.submissions
  for select using (auth.uid() = owner_id);

-- A signed-in user may file a submission as themselves, and only as 'new'.
-- The status check stops someone inserting a pre-approved listing.
drop policy if exists "submissions: insert own" on public.submissions;
create policy "submissions: insert own" on public.submissions
  for insert with check (
    auth.uid() = owner_id
    and status = 'new'
    and sponsored = false
    and slug is null
  );

-- Deliberately no update or delete policy for ordinary users. Editing a live
-- listing goes through the server so it can be re-reviewed; moderation and
-- sponsorship are service-role only.

-- ---------------------------------------------------------------------------
-- submission_notes: private reviewer notes. No client policy, by design.
-- ---------------------------------------------------------------------------
create table if not exists public.submission_notes (
  submission_id uuid primary key references public.submissions (id) on delete cascade,
  notes         text not null default '',
  -- What was charged for a placement, invoice reference, who paid.
  sponsorship_note text not null default '',
  updated_at    timestamptz not null default now()
);

alter table public.submission_notes enable row level security;
-- No policies at all: only the service role can reach this table. That is the
-- point - RLS denies everything by default once enabled.

-- ---------------------------------------------------------------------------
-- featured_orders: payment for a placement, whoever processes it
-- ---------------------------------------------------------------------------
do $$ begin
  create type order_status as enum ('pending', 'paid', 'failed', 'refunded', 'cancelled');
exception when duplicate_object then null; end $$;

create table if not exists public.featured_orders (
  id            uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions (id) on delete cascade,
  owner_id      uuid references auth.users (id) on delete set null,

  -- 'dodo', 'paddle', 'manual' - the app talks to a provider interface, so the
  -- column records which one handled this order rather than assuming one.
  provider      text not null default 'manual',
  -- The provider's own id for the checkout/payment, for reconciliation.
  provider_ref  text,

  amount_cents  integer not null check (amount_cents >= 0),
  currency      text not null default 'USD',
  -- How long the placement runs once paid.
  period_days   integer not null default 30 check (period_days > 0),

  status        order_status not null default 'pending',
  created_at    timestamptz not null default now(),
  paid_at       timestamptz
);

create index if not exists featured_orders_submission_idx on public.featured_orders (submission_id);
create index if not exists featured_orders_owner_idx      on public.featured_orders (owner_id);
-- One provider payment must never be applied twice, whatever a webhook does.
create unique index if not exists featured_orders_provider_ref_idx
  on public.featured_orders (provider, provider_ref) where provider_ref is not null;

alter table public.featured_orders enable row level security;

drop policy if exists "orders: read own" on public.featured_orders;
create policy "orders: read own" on public.featured_orders
  for select using (auth.uid() = owner_id);

-- Orders are created and settled server-side only. A client that could insert
-- its own order row could mark itself paid.

-- ---------------------------------------------------------------------------
-- Published view: what the public directory reads
-- ---------------------------------------------------------------------------

-- A placement counts only while it is paid up. Date comparison in UTC so it
-- expires at the same instant for everyone.
create or replace function public.is_sponsored(sponsored boolean, sponsored_until date)
returns boolean language sql immutable as $$
  select coalesce(sponsored, false)
     and sponsored_until is not null
     and sponsored_until >= (now() at time zone 'utc')::date;
$$;

create or replace view public.published_tools as
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
    public.is_sponsored(s.sponsored, s.sponsored_until) as sponsored
  from public.submissions s
  where s.status = 'approved' and s.slug is not null;

-- The view carries no submitter name, email or role. The directory never needs
-- them, so they are not one forgotten select away from being published.
grant select on public.published_tools to anon, authenticated;

-- ---------------------------------------------------------------------------
-- my_submissions: the account dashboard, with only the columns a submitter
-- is entitled to see about their own entry.
-- ---------------------------------------------------------------------------
create or replace view public.my_submissions
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
    -- 'spam' reads as 'declined'. Saying otherwise invites an argument and
    -- teaches spammers what tripped the filter.
    (case when s.status = 'spam' then 'declined' else s.status::text end) as status,
    public.is_sponsored(s.sponsored, s.sponsored_until) as sponsored,
    s.sponsored_until,
    s.submitted_at
  from public.submissions s
  where s.owner_id = auth.uid();

grant select on public.my_submissions to authenticated;
