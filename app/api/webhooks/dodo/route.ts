import { NextResponse } from "next/server";
import {
  verifyDodoWebhook,
  referenceFromEvent,
  type DodoEvent,
} from "@/lib/payments/dodo";
import { getSubmissionByReference, updateSubmission } from "@/lib/submission-store";

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

  // Anything other than a completed payment is acknowledged and ignored.
  // Returning 200 stops Dodo retrying events we will never act on.
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
