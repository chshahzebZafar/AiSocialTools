import { NextResponse } from "next/server";

/**
 * POST /api/submit-ai-tool
 *
 * Receives AI-directory submissions from /ai-directory/submit.
 *
 * Storage strategy:
 *   - Logs the submission to the server console (visible in Netlify Function logs).
 *   - Sends an email via Resend if RESEND_API_KEY is set.
 *   - Falls back gracefully if email isn't configured — submission still succeeds.
 *
 * To wire up email delivery later:
 *   1. Sign up at https://resend.com (free tier: 100 emails/day)
 *   2. Set RESEND_API_KEY and SUBMISSION_TO_EMAIL in your Netlify env
 *   3. Redeploy — no code changes needed
 */

interface SubmissionPayload {
  name?: string;
  url?: string;
  tagline?: string;
  description?: string;
  category?: string;
  pricing?: string;
  pricingDetails?: string;
  features?: string;
  twitter?: string;
  founder?: string;
  submitterName?: string;
  submitterEmail?: string;
  submitterRole?: string;
}

function isHttpUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isEmail(value: string | undefined): value is string {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let body: SubmissionPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // Required fields
  const required: Array<[keyof SubmissionPayload, string]> = [
    ["name", "Tool name is required"],
    ["url", "Website URL is required"],
    ["tagline", "One-line pitch is required"],
    ["description", "Description is required"],
    ["category", "Category is required"],
    ["pricing", "Pricing model is required"],
    ["submitterName", "Your name is required"],
    ["submitterEmail", "Your email is required"],
    ["submitterRole", "Your role is required"],
  ];

  for (const [field, message] of required) {
    const value = body[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      return NextResponse.json({ error: message }, { status: 400 });
    }
  }

  // Validators
  if (!isHttpUrl(body.url)) {
    return NextResponse.json(
      { error: "Website URL must start with http:// or https://" },
      { status: 400 }
    );
  }
  if (!isEmail(body.submitterEmail)) {
    return NextResponse.json(
      { error: "Submitter email is invalid" },
      { status: 400 }
    );
  }
  if ((body.tagline?.length ?? 0) > 120) {
    return NextResponse.json(
      { error: "Tagline must be 120 chars or less" },
      { status: 400 }
    );
  }

  const submittedAt = new Date().toISOString();
  // Short, human-quotable reference. Lets a submitter point at one specific
  // submission when following up, and makes duplicates easy to spot.
  // Format: SC-YYYYMMDD-XXXX
  // padEnd matters: Math.random() can produce a short base36 string (0.5 ->
  // "0.i"), which would yield a 1-character suffix and inconsistent references.
  const reference = `SC-${submittedAt.slice(0, 10).replace(/-/g, "")}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .padEnd(4, "0")
    .toUpperCase()}`;

  const summary = {
    reference,
    submittedAt,
    name: body.name,
    url: body.url,
    tagline: body.tagline,
    category: body.category,
    pricing: body.pricing,
    pricingDetails: body.pricingDetails || "(not provided)",
    twitter: body.twitter || "(none)",
    founder: body.founder || "(none)",
    submitterName: body.submitterName,
    submitterEmail: body.submitterEmail,
    submitterRole: body.submitterRole,
    description: body.description,
    features: body.features || "(none)",
  };

  // Log for Vercel Function logs (Deployments > project > Logs).
  // This is the durable record when email is not configured — every submission
  // lands here regardless, so nothing is silently lost.
  // eslint-disable-next-line no-console
  console.log("[ai-directory submission]", JSON.stringify(summary));

  // Optional: send email via Resend
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const SUBMISSION_TO_EMAIL = process.env.SUBMISSION_TO_EMAIL;

  // Surface misconfiguration in the logs instead of failing silently — the
  // submission still succeeds, but you want to know mail is not going out.
  if (!RESEND_API_KEY || !SUBMISSION_TO_EMAIL) {
    // eslint-disable-next-line no-console
    console.warn(
      `[ai-directory submission] ${reference}: email skipped — ` +
        `${!RESEND_API_KEY ? "RESEND_API_KEY " : ""}${!SUBMISSION_TO_EMAIL ? "SUBMISSION_TO_EMAIL " : ""}not set.`
    );
  }

  if (RESEND_API_KEY && SUBMISSION_TO_EMAIL) {
    try {
      const html = `
<h2>New AI Directory submission</h2>
<table style="border-collapse: collapse; width: 100%; max-width: 600px;">
${Object.entries(summary)
  .map(
    ([k, v]) => `
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #e5e5e5; font-weight: 600; vertical-align: top;">${escapeHtml(k)}</td>
    <td style="padding: 8px; border-bottom: 1px solid #e5e5e5; white-space: pre-wrap;">${escapeHtml(String(v))}</td>
  </tr>`
  )
  .join("")}
</table>
<p style="margin-top: 20px; color: #666; font-size: 12px;">
  Sent automatically from /api/submit-ai-tool · aisocialtools.co
</p>`;

      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "AI Directory <submissions@aisocialtools.co>",
          to: [SUBMISSION_TO_EMAIL],
          reply_to: body.submitterEmail,
          subject: `New AI tool submission: ${body.name}`,
          html,
        }),
      });
      if (!emailRes.ok) {
        // eslint-disable-next-line no-console
        console.warn(
          "[ai-directory submission] Resend failed (owner notification):",
          emailRes.status,
          await emailRes.text()
        );
      }

      // Confirmation receipt to the submitter. Previously nobody sent one, so a
      // submitter had no record their entry arrived — the exact complaint that
      // prompted this. Sent second and failure-tolerant: the owner
      // notification is the one that must not be blocked.
      const confirmationHtml = `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; color: #18181b; line-height: 1.6;">
  <h2 style="margin: 0 0 16px; font-size: 20px;">We received your submission</h2>
  <p style="margin: 0 0 16px;">Hi ${escapeHtml(body.submitterName ?? "there")},</p>
  <p style="margin: 0 0 16px;">
    Thanks for submitting <strong>${escapeHtml(body.name ?? "")}</strong> to the
    AI Directory on aisocialtools.co. This email is your receipt.
  </p>
  <table style="border-collapse: collapse; margin: 0 0 20px; font-size: 14px;">
    <tr>
      <td style="padding: 6px 16px 6px 0; color: #71717a;">Reference</td>
      <td style="padding: 6px 0;"><strong>${escapeHtml(reference)}</strong></td>
    </tr>
    <tr>
      <td style="padding: 6px 16px 6px 0; color: #71717a;">Tool</td>
      <td style="padding: 6px 0;">${escapeHtml(body.name ?? "")}</td>
    </tr>
    <tr>
      <td style="padding: 6px 16px 6px 0; color: #71717a;">Website</td>
      <td style="padding: 6px 0;">${escapeHtml(body.url ?? "")}</td>
    </tr>
    <tr>
      <td style="padding: 6px 16px 6px 0; color: #71717a;">Submitted</td>
      <td style="padding: 6px 0;">${escapeHtml(submittedAt)}</td>
    </tr>
  </table>
  <p style="margin: 0 0 16px;">
    We review submissions within 7 days. If it is a fit, the listing goes live and
    we will let you know. If we need anything else, we will reply to this address.
  </p>
  <p style="margin: 0 0 16px; color: #71717a; font-size: 13px;">
    Listings are free and editorial — we do not charge for inclusion, and we cannot
    guarantee every submission is accepted. Quote your reference if you follow up.
  </p>
  <p style="margin: 0; color: #a1a1aa; font-size: 12px;">
    aisocialtools.co · you received this because this address was used to submit a tool.
  </p>
</div>`;

      const confirmRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "AI Directory <submissions@aisocialtools.co>",
          to: [body.submitterEmail],
          reply_to: SUBMISSION_TO_EMAIL,
          subject: `Submission received: ${body.name} (${reference})`,
          html: confirmationHtml,
        }),
      });
      if (!confirmRes.ok) {
        // eslint-disable-next-line no-console
        console.warn(
          "[ai-directory submission] Resend failed (submitter confirmation):",
          confirmRes.status,
          await confirmRes.text()
        );
      }
    } catch (err) {
      // Email failure shouldn't block the submission
      // eslint-disable-next-line no-console
      console.warn("[ai-directory submission] Email error:", err);
    }
  }

  return NextResponse.json(
    {
      ok: true,
      reference,
      message: "Submission received — we'll review within 7 days.",
    },
    { status: 200 }
  );
}
