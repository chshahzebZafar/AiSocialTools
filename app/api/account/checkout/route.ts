import { NextResponse } from "next/server";
import { userFromRequest } from "@/lib/supabase";
import { getSubmissionByReference } from "@/lib/submission-store";
import { dodoCheckoutUrl, dodoConfigured } from "@/lib/payments/dodo";

/**
 * Hands back a checkout URL for featuring one listing.
 *
 * A route rather than a plain link so the product id stays server-side and so
 * the caller is identified before a checkout is created. It creates nothing
 * and charges nothing - the webhook is what marks a placement paid.
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!dodoConfigured()) {
    return NextResponse.json(
      { error: "Payments are not configured yet." },
      { status: 503 }
    );
  }

  const who = await userFromRequest(req.headers.get("authorization"));
  if (!who) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let body: { reference?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const reference = String(body.reference ?? "").trim();
  if (!reference) {
    return NextResponse.json({ error: "reference is required." }, { status: 400 });
  }

  const row = await getSubmissionByReference(reference);
  if (!row) {
    return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  }

  // Two listings can be paid for: one awaiting the payment it was created
  // for, and a published free listing being upgraded. A declined one cannot -
  // that would take money for a placement that will never show.
  if (row.status !== "approved" && row.status !== "awaiting_payment") {
    return NextResponse.json(
      { error: "This listing cannot be featured." },
      { status: 409 }
    );
  }

  if (row.sponsored) {
    return NextResponse.json(
      { error: "This listing is already featured." },
      { status: 409 }
    );
  }

  // Ownership is only knowable once submissions carry an owner. Rows migrated
  // from Firestore have none, so this checks when it can rather than refusing
  // every pre-migration listing. Paying to feature a listing is not an attack
  // worth blocking; charging the wrong person would be, and that cannot happen
  // because the payer is whoever completes checkout.
  const owner = (row as { ownerId?: string }).ownerId;
  if (owner && owner !== who.id) {
    return NextResponse.json({ error: "That is not your listing." }, { status: 403 });
  }

  const origin = new URL(req.url).origin;
  const url = dodoCheckoutUrl({
    reference,
    email: who.email ?? undefined,
    // Back to the listing, not the dashboard: it is the page that can show
    // whether the payment landed, and the one they were upgrading.
    returnTo: `${origin}/account/listing/${reference}`,
  });

  return NextResponse.json({ url });
}
