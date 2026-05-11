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
  const summary = {
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

  // Log for Netlify Function logs
  // eslint-disable-next-line no-console
  console.log("[ai-directory submission]", JSON.stringify(summary));

  // Optional: send email via Resend
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const SUBMISSION_TO_EMAIL = process.env.SUBMISSION_TO_EMAIL;

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
          "[ai-directory submission] Resend failed:",
          emailRes.status,
          await emailRes.text()
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
      message: "Submission received — we'll review within 7 days.",
    },
    { status: 200 }
  );
}
