import { NextResponse } from "next/server";
import {
  verifyDodoWebhook,
  referenceFromEvent,
  type DodoEvent,
} from "@/lib/payments/dodo";
import {
  getSubmissionByReference,
  getSubmissionByPaymentRef,
  updateSubmission,
} from "@/lib/submission-store";

/**
 * Dodo Payments webhook: the only thing that may mark a placement as paid.
 *
 * The redirect back from checkout proves nothing - anyone can open the success
 * URL directly - so it is cosmetic, and this is the source of truth.
 *
 * Nothing here trusts the request body until the signature is verified. The
 * body is read as raw text rather than parsed JSON because the signature
 * covers the exact bytes sent: re-serialising parsed JSON would change the
 * whitespace and the signature would never match.
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const raw = await req.text();

  if (!verifyDodoWebhook(req.headers, raw)) {
    // Deliberately terse. A detailed rejection tells an attacker which part of
    // their forgery to fix next.
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let event: DodoEvent;
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  // A reversed payment takes the placement back. The placement is for life,
  // so without this someone can pay $5, keep the permanent slot, refund, and
  // lose nothing. Handled before the success path because it is the case that
  // costs money if missed.
  if (event.type === "refund.succeeded") {
    return reversePlacement(event);
  }

  // Everything else - failed and cancelled payments, every subscription and
  // payout event - is acknowledged and ignored. A 200 stops Dodo retrying
  // events this app will never act on.
  if (event.type !== "payment.succeeded") {
    return NextResponse.json({ ok: true, ignored: event.type ?? "unknown" });
  }

  const reference = referenceFromEvent(event);
  if (!reference) {
    // 200, not an error: the payment is real and retrying will not add the
    // metadata. Logged so it can be applied by hand from the Dodo dashboard.
    // eslint-disable-next-line no-console
    console.error(
      "[dodo] payment.succeeded with no reference metadata:",
      event.data?.payment_id
    );
    return NextResponse.json({ ok: true, warning: "no reference in metadata" });
  }

  try {
    const row = await getSubmissionByReference(reference);
    if (!row) {
      // eslint-disable-next-line no-console
      console.error("[dodo] paid reference not found:", reference, event.data?.payment_id);
      return NextResponse.json({ ok: true, warning: "reference not found" });
    }

    // Idempotent. Webhooks are delivered at least once, so the same payment
    // can arrive twice; applying a lifetime placement twice is harmless but
    // worth not doing, and the early return keeps the log honest.
    if (row.sponsored && row.sponsoredLifetime) {
      return NextResponse.json({ ok: true, alreadyApplied: true });
    }

    await updateSubmission(row.id, {
      sponsored: true,
      sponsoredLifetime: true,
      // Recorded so a refund can find this row later. The unique index on it
      // also makes a duplicated webhook a no-op at the database level.
      sponsoredPaymentRef: event.data?.payment_id ?? null,
      sponsorshipNote: [
        row.sponsorshipNote,
        `Dodo ${event.data?.payment_id ?? "payment"} — ` +
          `${((event.data?.total_amount ?? 0) / 100).toFixed(2)} ` +
          `${event.data?.currency ?? "USD"} on ${new Date().toISOString().slice(0, 10)}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true, reference, applied: true });
  } catch (err) {
    // 500 so Dodo retries: the payment succeeded and the placement is owed.
    // eslint-disable-next-line no-console
    console.error("[dodo] could not apply placement:", err);
    return NextResponse.json({ error: "Could not apply placement." }, { status: 500 });
  }
}

/**
 * Undo a placement whose payment was refunded.
 *
 * Finds the listing by the payment reference recorded when it was bought,
 * falling back to checkout metadata where the refund carries it. Returns 200
 * even when nothing matches: the refund is real and retrying will not make a
 * match appear, so it is logged for a person rather than retried forever.
 */
const NEWLINE = String.fromCharCode(10);

async function reversePlacement(event: DodoEvent) {
  const paymentId = event.data?.payment_id ?? "";
  const reference = referenceFromEvent(event);

  try {
    const row =
      (paymentId ? await getSubmissionByPaymentRef(paymentId) : null) ??
      (reference ? await getSubmissionByReference(reference) : null);

    if (!row) {
      // eslint-disable-next-line no-console
      console.error("[dodo] refund with no matching listing:", paymentId, reference);
      return NextResponse.json({ ok: true, warning: "no matching listing" });
    }

    if (!row.sponsored) {
      return NextResponse.json({ ok: true, alreadyReversed: true });
    }

    await updateSubmission(row.id, {
      sponsored: false,
      sponsoredLifetime: false,
      sponsoredUntil: "",
      // Cleared so the refunded payment cannot be matched again, and so the
      // unique index does not block a later genuine purchase of the same slot.
      sponsoredPaymentRef: null,
      sponsorshipNote: [
        row.sponsorshipNote,
        `Refunded ${paymentId || "payment"} on ${new Date().toISOString().slice(0, 10)} — placement removed`,
      ]
        .filter(Boolean)
        .join(NEWLINE),
    });

    return NextResponse.json({ ok: true, reference: row.reference, reversed: true });
  } catch (err) {
    // 500 so Dodo retries: the money has gone back and the placement is still
    // showing, which is the expensive direction to fail in.
    // eslint-disable-next-line no-console
    console.error("[dodo] could not reverse placement:", err);
    return NextResponse.json({ error: "Could not reverse placement." }, { status: 500 });
  }
}
