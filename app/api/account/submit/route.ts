import { NextResponse } from "next/server";
import { userFromRequest } from "@/lib/supabase";
import { createSubmission, getSubmissionByReference } from "@/lib/submission-store";
import { dodoCheckoutUrl, dodoConfigured } from "@/lib/payments/dodo";

/**
 * Submitting a tool from a signed-in account.
 *
 * Separate from /api/submit-ai-tool, which is the older anonymous form: that
 * one has to ask who you are, verify a Turnstile token and guard against bots,
 * because anyone can post to it. Here the account already answers all three -
 * the submitter is a verified session, not a name typed into a box - so the
 * form asks about the tool and nothing else.
 *
 * Returns where to go next. Free goes straight to the listing; featured goes
 * to Dodo and comes back to the same place. The listing is created either way
 * BEFORE checkout, so a payment always has a row to attach to - a webhook
 * arriving for a submission that does not exist yet would be unfixable.
 */
export const dynamic = "force-dynamic";

const LIMITS: Record<string, number> = {
  name: 80,
  url: 300,
  tagline: 140,
  description: 4000,
  category: 60,
  pricing: 40,
  pricingDetails: 300,
  features: 1200,
  twitter: 40,
  founder: 120,
};

const REQUIRED: Array<[string, string]> = [
  ["name", "The tool needs a name"],
  ["url", "The tool needs a link"],
  ["tagline", "A one-line summary is required"],
  ["description", "A description is required"],
  ["category", "Pick a category"],
  ["pricing", "Pick a pricing model"],
];

function reference(now: string) {
  const day = now.slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 6).padEnd(4, "0").toUpperCase();
  return `SC-${day}-${rand}`;
}

export async function POST(req: Request) {
  const who = await userFromRequest(req.headers.get("authorization"));
  if (!who) {
    return NextResponse.json({ error: "Please sign in first." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const fields: Record<string, string> = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    const value = typeof body[key] === "string" ? (body[key] as string).trim() : "";
    if (value.length > max) {
      return NextResponse.json(
        { error: `${key} must be under ${max} characters.` },
        { status: 400 }
      );
    }
    fields[key] = value;
  }

  for (const [key, message] of REQUIRED) {
    if (!fields[key]) return NextResponse.json({ error: message }, { status: 400 });
  }

  // Validated rather than trusted: a bad URL here becomes a dead link on a
  // public page, and the directory's whole claim is that the links work.
  try {
    const u = new URL(fields.url);
    if (u.protocol !== "https:" && u.protocol !== "http:") throw new Error("scheme");
  } catch {
    return NextResponse.json(
      { error: "That does not look like a valid link. Include https://" },
      { status: 400 }
    );
  }

  const plan = body.plan === "featured" ? "featured" : "free";
  const submittedAt = new Date().toISOString();
  const ref = reference(submittedAt);

  try {
    await createSubmission(
      ref,
      {
        ...fields,
        submittedAt,
        // Taken from the verified session, never from the form. The account is
        // the identity; a name in a request body is just a string.
        submitterEmail: who.email ?? "",
        submitterName:
          (typeof body.displayName === "string" && body.displayName.trim()) ||
          (who.email ?? "").split("@")[0],
        submitterRole: "",
      },
      who.id
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not save your submission." },
      { status: 500 }
    );
  }

  if (plan === "free") {
    return NextResponse.json({ ok: true, reference: ref, next: `/account/listing/${ref}` });
  }

  if (!dodoConfigured()) {
    // The listing exists and is in review; only the upgrade is unavailable.
    // Saying so beats pretending the submission failed.
    return NextResponse.json({
      ok: true,
      reference: ref,
      next: `/account/listing/${ref}`,
      warning: "Payments are not configured, so this was submitted on the free plan.",
    });
  }

  const origin = new URL(req.url).origin;
  const checkout = dodoCheckoutUrl({
    reference: ref,
    email: who.email ?? undefined,
    returnTo: `${origin}/account/listing/${ref}`,
  });

  return NextResponse.json({ ok: true, reference: ref, next: checkout, checkout: true });
}

/** Lets the listing page confirm a reference belongs to the caller. */
export async function GET(req: Request) {
  const who = await userFromRequest(req.headers.get("authorization"));
  if (!who) return NextResponse.json({ error: "Please sign in first." }, { status: 401 });

  const ref = new URL(req.url).searchParams.get("reference") ?? "";
  if (!ref) return NextResponse.json({ error: "reference is required." }, { status: 400 });

  const row = await getSubmissionByReference(ref);
  if (!row) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ ok: true, reference: row.reference, status: row.status });
}
