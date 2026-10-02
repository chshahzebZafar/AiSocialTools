-- A featured submission that has not been paid for must not reach the review
-- queue.
--
-- The listing is created before checkout, so a webhook always has a row to
-- attach to. But it was created as 'new', which IS the review queue - so
-- cancelling payment left an unpaid submission waiting to be reviewed and
-- possibly published for free.
--
-- 'awaiting_payment' is that row's real state: it exists, its owner can see
-- it and finish paying, and moderation never sees it until the payment lands.
--
-- Run after 0004. ALTER TYPE ... ADD VALUE cannot run inside a transaction
-- block, so run this statement on its own if your client wraps statements.

alter type submission_status add value if not exists 'awaiting_payment';
