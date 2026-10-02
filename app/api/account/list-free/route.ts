import { NextResponse } from "next/server";
import { userFromRequest } from "@/lib/supabase";
import { getSubmissionByReference, updateSubmission } from "@/lib/submission-store";
import { sendSubmissionReceived, notifyReviewer } from "@/lib/submission-emails";

/**
 * Give up on paying and list the tool for free instead.
 *
 * Without this, abandoning checkout strands a submission: it is out of the
 * review queue, so nobody will ever look at it, and the only way forward is
 * paying. That is a dead end dressed up as a choice.
 *
 * Only moves a listing that is actually awaiting payment, and only for its
 * owner. It cannot downgrade a placement that was paid for - that is what a
 * refund is.
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const who = await userFromRequest(req.headers.get("authorization"));
  if (!who) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

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
  if (!row) return NextResponse.json({ error: "Listing not found." }, { status: 404 });

  const owner = (row as { ownerId?: string }).ownerId;
  if (owner && owner !== who.id) {
    return NextResponse.json({ error: "That is not your listing." }, { status: 403 });
  }

  if (row.status !== "awaiting_payment") {
    // Already in review, published or declined: nothing to switch.
    return NextResponse.json({ ok: true, unchanged: true, status: row.status });
  }

  try {
    await updateSubmission(row.id, { status: "new" });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not update the listing." },
      { status: 500 }
    );
  }

  // Now it is in the queue, so confirm it like any other free submission.
  await Promise.allSettled([
    sendSubmissionReceived({ to: row.submitterEmail, toolName: row.name, reference: row.reference }),
    notifyReviewer({
      toolName: row.name,
      url: row.url,
      reference: row.reference,
      submitterEmail: row.submitterEmail,
      category: row.category,
    }),
  ]);

  return NextResponse.json({ ok: true, status: "new" });
}
