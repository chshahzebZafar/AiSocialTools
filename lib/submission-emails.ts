import "server-only";

/**
 * Decision emails: telling a submitter their tool was listed, or was not.
 *
 * Until this existed the submitter got "we'll review within 7 days" and then
 * silence forever - they had to go and check the directory themselves to find
 * out. That is a poor experience generally, and specifically a bad footing for
 * asking someone to pay for a featured slot later.
 *
 * Nothing in here throws. A moderation decision is the important thing; an
 * email provider having a bad afternoon must not be able to fail it.
 */

/**
 * Whether to tell people their submission was declined.
 *
 * On by default: silence is worse than a plain no, and someone who never hears
 * back may resubmit the same tool repeatedly. Flip to false if replies arguing
 * the decision become a burden - approvals will still send.
 */
export const NOTIFY_ON_DECLINE = true;

const FROM = "AI Directory <submissions@aisocialtools.co>";
const SITE = "https://aisocialtools.co";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function shell(body: string): string {
  return `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 15px; line-height: 1.6; color: #18181b; max-width: 520px;">
${body}
<p style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e4e4e7; color: #71717a; font-size: 12px;">
  <a href="${SITE}/ai-directory" style="color: #71717a;">aisocialtools.co/ai-directory</a>
  — a hand-checked directory of AI tools.
</p>
</div>`;
}

export type DecisionEmail = {
  to: string;
  toolName: string;
  reference: string;
  /** Present for approvals - the live listing. */
  slug?: string;
};

function approvedEmail(d: DecisionEmail) {
  const name = escapeHtml(d.toolName);
  const url = d.slug ? `${SITE}/ai-directory/${d.slug}` : `${SITE}/ai-directory`;
  return {
    subject: `${d.toolName} is now listed on aisocialtools.co`,
    html: shell(`
<h2 style="font-size: 19px; margin: 0 0 16px;">${name} is live</h2>
<p style="margin: 0 0 16px;">
  We checked it over and it is now published in the AI directory.
</p>
<p style="margin: 0 0 24px;">
  <a href="${url}" style="display: inline-block; background: #18181b; color: #fff; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-weight: 500;">View your listing</a>
</p>
<p style="margin: 0 0 16px;">
  If anything on the page is wrong — pricing, description, a dead link — reply to
  this email and we will fix it.
</p>
<p style="margin: 0 0 8px; color: #52525b;">
  We also sell featured placement: a labelled slot on the homepage and at the top
  of the directory. Reply if you would like to know what that costs. Your free
  listing stays exactly as it is either way.
</p>
<p style="margin: 24px 0 0; color: #a1a1aa; font-size: 12px;">Reference ${escapeHtml(d.reference)}</p>`),
  };
}

function declinedEmail(d: DecisionEmail) {
  const name = escapeHtml(d.toolName);
  return {
    subject: `About your submission: ${d.toolName}`,
    html: shell(`
<h2 style="font-size: 19px; margin: 0 0 16px;">We are not listing ${name}</h2>
<p style="margin: 0 0 16px;">
  Thanks for sending it in. We have decided not to add it to the directory this
  time.
</p>
<p style="margin: 0 0 16px;">
  This is a judgement about fit rather than a mark against the tool — we keep the
  directory small enough to check every entry by hand, so plenty of decent tools
  do not make it in.
</p>
<p style="margin: 0 0 16px;">
  If the tool changes significantly, you are welcome to submit it again.
</p>
<p style="margin: 24px 0 0; color: #a1a1aa; font-size: 12px;">Reference ${escapeHtml(d.reference)}</p>`),
  };
}

/**
 * Sends the decision email. Returns what happened so the caller can log it,
 * never throws, and never emails anything but an approval or a decline.
 *
 * Deliberately no email for "spam": the address on a spam submission is one a
 * spammer typed, so mailing it either annoys a forged third party or confirms a
 * live inbox to the sender. It also tells them what tripped the filter.
 */
export async function sendDecisionEmail(
  status: string,
  d: DecisionEmail
): Promise<"sent" | "skipped" | "failed"> {
  if (status !== "approved" && status !== "declined") return "skipped";
  if (status === "declined" && !NOTIFY_ON_DECLINE) return "skipped";

  const key = process.env.RESEND_API_KEY;
  if (!key) return "skipped";
  if (!d.to || !d.to.includes("@")) return "skipped";

  const { subject, html } = status === "approved" ? approvedEmail(d) : declinedEmail(d);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [d.to],
        // Replies land with whoever reviews submissions, not in a void.
        reply_to: process.env.SUBMISSION_TO_EMAIL || undefined,
        subject,
        html,
      }),
    });
    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.warn("[decision email] Resend failed:", res.status, await res.text());
      return "failed";
    }
    return "sent";
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[decision email] send threw:", err);
    return "failed";
  }
}
