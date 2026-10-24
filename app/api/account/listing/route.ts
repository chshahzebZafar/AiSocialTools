import { NextResponse } from "next/server";
import { userFromRequest } from "@/lib/supabase";
import { getSubmissionByReference, updateSubmission } from "@/lib/submission-store";
import { aiCategories } from "@/lib/ai-directory";

/**
 * Lets an owner edit what their listing says.
 *
 * What it SAYS, never where it POINTS. The URL is what was reviewed, and
 * allowing it to change after approval is the classic bait-and-switch:
 * submit something reasonable, get approved, then repoint the published page
 * at anything. `url` and `slug` are not in EDITABLE and are ignored even if
 * sent, rather than rejected, so a stale client cannot be told which field to
 * try next.
 *
 * An edited listing stays live. Taking a published page down because somebody
 * fixed a typo would be worse than the risk, and the edit is recorded so
 * /admin can see the listing changed since it was reviewed.
 */
export const dynamic = "force-dynamic";

const EDITABLE: Record<string, number> = {
  name: 80,
  tagline: 140,
  description: 4000,
  category: 60,
  pricing: 40,
  pricingDetails: 300,
  features: 1200,
  twitter: 40,
  founder: 120,
};

const PRICING = ["Free", "Freemium", "Paid", "Open Source"];

export async function PATCH(req: Request) {
  const who = await userFromRequest(req.headers.get("authorization"));
  if (!who) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

  let body: Record<string, unknown>;
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
  if (!row) return NextResponse.json({ error: "Listing not found." }, { status: 404 });

  const owner = (row as { ownerId?: string }).ownerId;
  if (owner && owner !== who.id) {
    return NextResponse.json({ error: "That is not your listing." }, { status: 403 });
  }

  // A declined listing is not yours to keep editing into something else - that
  // is a resubmission, which goes through review from the start.
  if (row.status === "declined") {
    return NextResponse.json(
      { error: "This listing was not accepted. Submit it again if the tool has changed." },
      { status: 409 }
    );
  }

  const patch: Record<string, string> = {};
  for (const [key, max] of Object.entries(EDITABLE)) {
    if (body[key] === undefined) continue;
    const value = typeof body[key] === "string" ? (body[key] as string).trim() : "";
    if (value.length > max) {
      return NextResponse.json(
        { error: `${key} must be under ${max} characters.` },
        { status: 400 }
      );
    }
    patch[key] = value;
  }

  // Required fields may be changed but not emptied - a listing with no name or
  // description is worse than the one it replaced.
  for (const key of ["name", "tagline", "description", "category", "pricing"]) {
    if (patch[key] !== undefined && !patch[key]) {
      return NextResponse.json({ error: `${key} cannot be empty.` }, { status: 400 });
    }
  }

  if (patch.category && !(aiCategories as readonly string[]).includes(patch.category)) {
    return NextResponse.json({ error: "That is not a category we list." }, { status: 400 });
  }
  if (patch.pricing && !PRICING.includes(patch.pricing)) {
    return NextResponse.json({ error: "That is not a pricing model we list." }, { status: 400 });
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ ok: true, unchanged: true });
  }

  try {
    await updateSubmission(row.id, { ...patch, lastEditedAt: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not save your changes." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    // Said plainly so the UI can repeat it: the page is live now, and a human
    // will look at the change.
    published: row.status === "approved",
    message:
      row.status === "approved"
        ? "Saved. Your listing is live with these changes and we will re-read it."
        : "Saved.",
  });
}
