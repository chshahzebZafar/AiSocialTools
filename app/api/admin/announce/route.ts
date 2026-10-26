import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin-auth";
import { recipients, sendAnnouncement, CAMPAIGN_KEY } from "@/lib/feature-announcement";

/**
 * Sending the feature announcement.
 *
 * GET previews: who would receive it, and nothing is sent. Mail to real people
 * should never be one click away from a page load, and a dry run is the only
 * way to find out that the recipient query is wrong before 200 people find out
 * for you.
 *
 * POST sends, and only to addresses the database still lists. It records each
 * send before moving on, so a timeout halfway through is safe to retry: the
 * second run skips whoever already had it.
 *
 * Rate limited to a trickle rather than fired in parallel. This is a one-off
 * run of a couple of hundred emails, there is no hurry, and a burst is how a
 * sending domain's reputation gets damaged.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const GAP_MS = 600;

async function requireAdmin(): Promise<NextResponse | null> {
  const jar = await cookies();
  if (!verifySessionToken(jar.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const list = await recipients();
  return NextResponse.json({
    ok: true,
    campaign: CAMPAIGN_KEY,
    wouldSend: list.length,
    featured: list.filter((r) => r.featured).length,
    free: list.filter((r) => !r.featured).length,
    // A sample, not the lot: enough to sanity-check the query without putting
    // every address on this machine's screen.
    sample: list.slice(0, 5).map((r) => ({
      email: r.email.replace(/^(.).*(@.*)$/, "$1***$2"),
      name: r.name,
      featured: r.featured,
    })),
    note: "Nothing sent. POST to this endpoint to send.",
  });
}

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "RESEND_API_KEY is not set, so nothing can be sent." },
      { status: 503 }
    );
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    /* an empty body is fine */
  }

  // Typing the campaign key is a deliberate speed bump: this sends real mail to
  // real people and should not be reachable by a stray fetch.
  if (String(body.confirm ?? "") !== CAMPAIGN_KEY) {
    return NextResponse.json(
      { error: `Send "confirm": "${CAMPAIGN_KEY}" to proceed.` },
      { status: 400 }
    );
  }

  const limit = Math.min(Number(body.limit) || 500, 500);
  const list = (await recipients()).slice(0, limit);

  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const r of list) {
    const result = await sendAnnouncement(r);
    if (result === "sent") sent++;
    else if (result === "failed") failed++;
    else skipped++;
    await new Promise((res) => setTimeout(res, GAP_MS));
  }

  return NextResponse.json({
    ok: true,
    campaign: CAMPAIGN_KEY,
    sent,
    failed,
    skipped,
    remaining: (await recipients()).length,
  });
}
