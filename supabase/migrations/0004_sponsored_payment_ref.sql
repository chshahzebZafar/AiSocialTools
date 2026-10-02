-- Record which payment bought a placement.
--
-- Needed to reverse one. A refund webhook carries the payment it reverses,
-- not necessarily the checkout metadata that named the listing, so without
-- this there is no reliable way back from a payment to the row it paid for -
-- only the free-text sponsorship note, which is for people to read, not for
-- code to match on.
--
-- Matters because the placement is for life: without refund handling, someone
-- can pay $5, take the permanent placement, refund, and keep it.
--
-- Idempotent. Run after 0003.

alter table public.submissions
  add column if not exists sponsored_payment_ref text;

-- One payment can only ever have bought one placement. The unique index makes
-- a duplicate webhook delivery a no-op at the database level rather than
-- relying on the handler getting it right.
create unique index if not exists submissions_sponsored_payment_ref_idx
  on public.submissions (sponsored_payment_ref)
  where sponsored_payment_ref is not null;
