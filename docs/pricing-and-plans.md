# Directory pricing: free listing + $5 featured

Decided 2026-10-01. Two tiers, deliberately. A directory with four pricing
columns at zero traffic is pretending to be a business; two is a price test.

## Free — "Listed"

**$0, permanent.**

- Submit any AI tool through `/ai-directory/submit`
- A human checks it: the link works, the pricing is what the tool claims, the
  description matches the product
- Permanent listing once approved — no expiry, no renewal
- Appears in its category page, any collection it qualifies for, and search
- Email when the decision is made, either way (built, live)
- Track it from the account dashboard (pending Supabase rewiring)

The free tier is the product. It is what makes the directory worth visiting,
and therefore what makes the paid tier worth buying. Degrading it to push
upgrades would remove the thing being sold.

## Featured — $5, one-time, 30 days

Everything in Listed, plus:

- A slot in the homepage featured strip (4 paid slots, already built)
- Pinned to the top of the directory and of its category for 30 days
- Labelled **Sponsored**, with `rel="sponsored"` on the link
- Priority review: 48 hours instead of 7 days
- Renewable for another $5 whenever it lapses

### Why $5

It is priced against the traffic that exists, not the traffic we want. The
site has close to no organic traffic today, so a $50 placement would be
selling something we cannot deliver. $5 is low enough that a tool owner can
say yes without a procurement conversation, which is what we need while we
are finding out whether anyone will pay at all.

Raise it when there is traffic to justify it. Existing placements run out
after 30 days anyway, so a price rise needs no grandfathering.

## What the paid tier deliberately does **not** include

These are stated on the pricing page, not buried.

- **No guaranteed approval.** Payment buys placement, not a listing. A tool
  that fails review gets refunded, not published.
- **No dofollow link and no SEO benefit.** Selling followed links is a link
  scheme under Google's spam policies and risks a manual action against both
  the buyer and this domain. Sponsored links carry `rel="sponsored"`. Anyone
  buying this for SEO should be told plainly that it is not what they are
  getting.
- **No editorial control.** The description stays as reviewed. A paid listing
  that reads like an advert devalues every other entry on the page.
- **No reviews or ratings for sale**, ever.

## The payment-timing decision

The request was "pay for featured at submit". That creates a problem worth
naming: payment arrives **before** review, so every declined submission
becomes a refund, and there is quiet pressure to approve weak tools because
money has already changed hands. The integrity of the directory is the asset
here.

Two workable shapes:

**A. Free submit, upgrade after approval (recommended).**
The submitter gets the approval email — which already offers featured
placement — and the dashboard shows an "Upgrade to featured, $5" button on
any approved listing. No refund path to build, no incentive conflict, and the
upsell lands when the person is already pleased.

**B. Pay at submit, auto-refund on decline.**
Matches the original request. Needs refund handling against the provider,
a "paid but pending review" state, and a policy page saying how long refunds
take. More moving parts, and the first unhappy refund is a support
conversation.

Both can coexist later. Start with A; it is a smaller build and it is the one
that cannot corrupt the review.

## Payment provider

Unresolved. Dodo Payments was requested, but Dodo rejected Pakistan-based
merchants when evaluated for TroveJob — needs confirming before anything is
built against it. Paddle is the fallback (merchant of record, supports PK).

The schema does not care: `featured_orders.provider` records which provider
handled each order, so switching is a new implementation of one interface
rather than a migration.

Until a provider is live, the flow is manual: the pricing page and dashboard
button open a contact/checkout request, and the placement is set from `/admin`
with its end date, exactly as it works today.
