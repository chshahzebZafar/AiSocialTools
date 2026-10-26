import "server-only";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * The screenshots announcement.
 *
 * Deliberately not a marketing blast. It goes to people who have a listing,
 * says one new thing, and links straight to the page where they would do it.
 * Nobody who has not submitted a tool hears from us.
 *
 * Two rules worth keeping if this is ever copied for another feature:
 *
 *   1. Recipients are read from the database at send time, never from a pasted
 *      list, so somebody who deleted their listing yesterday is not emailed
 *      about it today.
 *   2. Every send is recorded before the next one goes out. A crash halfway
 *      through a run must not mean the first half gets it twice when the run
 *      is retried - people forgive a missing email, not a duplicate one.
 */

const FROM = "AI Directory <submissions@aisocialtools.co>";
const SITE = "https://aisocialtools.co";

/** Bump this when announcing something new, so past recipients are not re-sent. */
export const CAMPAIGN_KEY = "screenshots-2026-10";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export interface Recipient {
  email: string;
  name: string;
  reference: string;
  featured: boolean;
}

function body(r: Recipient): { subject: string; html: string } {
  const name = escapeHtml(r.name || "your tool");
  const link = `${SITE}/account/listing/${encodeURIComponent(r.reference)}`;

  // Two versions. A featured listing can use this today; a free one cannot, and
  // pretending otherwise would send them to a page with a disabled button.
  const middle = r.featured
    ? `<p>Your featured listing can now show up to four screenshots. People deciding
         between two tools get more from seeing the interface than from reading about
         it, so this is probably the single most useful thing you can add to the page.</p>
       <p style="margin: 24px 0;">
         <a href="${link}" style="display:inline-block;background:#18181b;color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;font-weight:500;">Add screenshots</a>
       </p>
       <p style="color:#52525b;font-size:14px;">PNG, JPEG, WebP or GIF under 2 MB. We convert
         them and check each one before it goes live — usually the same day.</p>`
    : `<p>Featured listings can now show up to four screenshots on their page. People
         deciding between two tools get more from seeing the interface than from reading
         about it.</p>
       <p>${name} is a free listing, so this is not available on it — but featuring is a
         one-off $5 and includes the gallery, the homepage strip and the top of its
         category.</p>
       <p style="margin: 24px 0;">
         <a href="${link}" style="display:inline-block;background:#18181b;color:#fff;text-decoration:none;padding:10px 18px;border-radius:6px;font-weight:500;">See your listing</a>
       </p>`;

  return {
    subject: r.featured
      ? `You can add screenshots to ${name}`
      : `Screenshots are now available for featured listings`,
    html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 15px; line-height: 1.6; color: #18181b; max-width: 520px;">
<p>Hello,</p>
${middle}
<p style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e4e4e7; color: #71717a; font-size: 12px;">
  You are getting this because you have a listing in the AI Directory.
  <a href="${SITE}/ai-directory" style="color: #71717a;">aisocialtools.co/ai-directory</a>
</p>
</div>`,
  };
}

/**
 * Everyone with a live listing who has not already had this announcement.
 *
 * Declined and spam submissions are excluded: a declined listing has nothing to
 * put screenshots on, and spam addresses are typed by spammers.
 */
export async function recipients(): Promise<Recipient[]> {
  const db = supabaseAdmin();
  if (!db) return [];

  const { data, error } = await db
    .from("submissions")
    .select("reference, name, submitter_email, sponsored, sponsored_until, sponsored_lifetime, announced")
    .in("status", ["new", "approved"]);

  if (error || !data) return [];

  const seen = new Set<string>();
  const out: Recipient[] = [];

  for (const r of data as Array<Record<string, unknown>>) {
    const email = String(r.submitter_email ?? "").trim().toLowerCase();
    if (!email || !email.includes("@")) continue;

    // Already told, on a previous run.
    const announced = Array.isArray(r.announced) ? (r.announced as string[]) : [];
    if (announced.includes(CAMPAIGN_KEY)) continue;

    // One email per person, even if they have several listings.
    if (seen.has(email)) continue;
    seen.add(email);

    out.push({
      email,
      name: String(r.name ?? ""),
      reference: String(r.reference ?? ""),
      featured:
        r.sponsored === true &&
        (r.sponsored_lifetime === true ||
          (typeof r.sponsored_until === "string" &&
            Date.parse(`${r.sponsored_until}T23:59:59Z`) >= Date.now())),
    });
  }

  return out;
}

/** Records the send before the next one goes out, so a retry cannot duplicate. */
async function markSent(reference: string): Promise<void> {
  const db = supabaseAdmin();
  if (!db) return;
  await db.rpc("append_announcement", {
    p_reference: reference,
    p_campaign: CAMPAIGN_KEY,
  });
}

export async function sendAnnouncement(
  r: Recipient
): Promise<"sent" | "skipped" | "failed"> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return "skipped";

  const { subject, html } = body(r);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [r.email],
        reply_to: process.env.SUBMISSION_TO_EMAIL || undefined,
        subject,
        html,
      }),
    });
    if (!res.ok) return "failed";
    await markSent(r.reference);
    return "sent";
  } catch {
    return "failed";
  }
}
