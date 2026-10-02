import { NextResponse } from "next/server";
import { userFromRequest, supabaseAdmin } from "@/lib/supabase";

/**
 * Attaches a signed-in account to submissions it made before the account
 * existed.
 *
 * Needed because the dashboard reads my_submissions through RLS, which
 * matches on owner_id - and every row migrated from Firestore has none. The
 * submitter's email address is the only link between a person and work they
 * did before signing up, so this claims rows by that.
 *
 * Only ever matches a VERIFIED address. An unverified one is a string someone
 * typed into a form, so claiming on it would hand a stranger's submissions to
 * whoever guessed their email. It also only claims unowned rows: a row that
 * already has an owner is never reassigned, whatever address it carries.
 */
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const who = await userFromRequest(req.headers.get("authorization"));
  if (!who) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const db = supabaseAdmin();
  if (!db) {
    // Submissions are not in Supabase yet, so there is nothing to claim. Not
    // an error - the dashboard will simply be empty until the move happens.
    return NextResponse.json({ ok: true, claimed: 0, reason: "supabase not in use" });
  }

  if (!who.email || !who.emailVerified) {
    return NextResponse.json({
      ok: true,
      claimed: 0,
      reason: "email not verified",
    });
  }

  const { data, error } = await db
    .from("submissions")
    .update({ owner_id: who.id })
    .is("owner_id", null)
    .eq("submitter_email", who.email)
    .select("id");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, claimed: data?.length ?? 0 });
}
