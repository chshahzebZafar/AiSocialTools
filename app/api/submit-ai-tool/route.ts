import { NextResponse } from "next/server";

/**
 * POST /api/submit-ai-tool
 *
 * Receives AI-directory submissions from /ai-directory/submit.
 *
 * Storage strategy:
 *   - Logs the submission to the server console (visible in Vercel function logs).
 *   - Sends an email via Resend if RESEND_API_KEY is set.
 *   - Falls back gracefully if email isn't configured — submission still succeeds.
 *
 * To wire up email delivery later:
 *   1. Sign up at https://resend.com (free tier: 100 emails/day)
 *   2. Set RESEND_API_KEY and SUBMISSION_TO_EMAIL in the Vercel project environment variables
 *   3. Redeploy — no code changes needed
 *
 * Bot protection:
 *   - Honeypot field `companyWebsite`, a 3s minimum fill time, and per-field
 *     length caps. Always on.
 *   - Cloudflare Turnstile, enforced only when TURNSTILE_SECRET_KEY is set. Set
 *     NEXT_PUBLIC_TURNSTILE_SITE_KEY at the same time and redeploy -
 *     NEXT_PUBLIC_ values are inlined at build time, so the widget will not
 *     appear on an existing deployment.
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
  /** Honeypot. Hidden from users; only bots fill it. Must arrive empty. */
  companyWebsite?: string;
  /** ms epoch stamped when the form mounted, used to reject instant submits. */
  formLoadedAt?: number;
  /** Cloudflare Turnstile token from the widget; verified server-side. */
  turnstileToken?: string;
}

/** Minimum time a human plausibly needs to fill this form. */
const MIN_FILL_MS = 3000;

/** Upper bounds per field — stops multi-megabyte payloads being posted. */
const MAX_LENGTHS: Record<string, number> = {
  name: 120,
  url: 500,
  tagline: 120,
  description: 5000,
  category: 60,
  pricing: 30,
  pricingDetails: 500,
  features: 2000,
  twitter: 50,
  founder: 120,
  submitterName: 120,
  submitterEmail: 200,
  submitterRole: 30,
};

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

  // ── Bot checks ──────────────────────────────────────────────────────────
  // Honeypot: the field is hidden from users, so anything in it means an
  // automated form-filler. Respond as though it succeeded — telling a bot it
  // was caught just teaches whoever wrote it which field to skip next time.
  // Nothing is stored or emailed.
  if (typeof body.companyWebsite === "string" && body.companyWebsite.trim()) {
    // eslint-disable-next-line no-console
    console.warn("[ai-directory submission] honeypot triggered — discarded");
    return NextResponse.json(
      { ok: true, reference: "SC-00000000-0000", message: "Submission received." },
      { status: 200 }
    );
  }

  // Timing: a human cannot complete nine fields in under three seconds.
  // This one returns a real error, because an unusually fast legitimate user
  // should be told to retry rather than silently dropped.
  if (typeof body.formLoadedAt === "number" && Number.isFinite(body.formLoadedAt)) {
    const elapsed = Date.now() - body.formLoadedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_MS) {
      return NextResponse.json(
        { error: "That was submitted unusually quickly. Please try again." },
        { status: 400 }
      );
    }
  }

  // Size caps: reject oversized payloads before any further work.
  for (const [field, max] of Object.entries(MAX_LENGTHS)) {
    const value = body[field as keyof SubmissionPayload];
    if (typeof value === "string" && value.length > max) {
      return NextResponse.json(
        { error: `${field} is too long (max ${max} characters)` },
        { status: 400 }
      );
    }
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

  // -- Cloudflare Turnstile ------------------------------------------------
  // The honeypot and timing checks stop naive form-fillers. They do not stop an
  // AI agent that fills every field properly and takes its time, which is how an
  // agent-built "company" on a staging host got submitted on 2026-09-11.
  // Turnstile targets exactly that kind of automation.
  //
  // Enforced only when TURNSTILE_SECRET_KEY is set, so submissions keep working
  // until the keys exist. Set it together with NEXT_PUBLIC_TURNSTILE_SITE_KEY:
  // with the secret but no site key the widget never renders, and every
  // submission would then fail verification.
  //
  // Hostname pinning is left to Cloudflare - restrict the widget to
  // aisocialtools.co in the Turnstile dashboard. (Pinning it here as well would
  // break Cloudflare's test keys, which report hostname example.com.)
  const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
  if (TURNSTILE_SECRET_KEY) {
    const token =
      typeof body.turnstileToken === "string" ? body.turnstileToken.trim() : "";
    if (!token) {
      return NextResponse.json(
        { error: "Please complete the verification check, then submit again." },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("cf-connecting-ip") ??
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "";

    let verified = false;
    try {
      const form = new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY,
        response: token,
      });
      if (ip) form.set("remoteip", ip);
      const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        { method: "POST", body: form }
      );
      const outcome = (await verifyRes.json()) as {
        success?: boolean;
        "error-codes"?: string[];
      };
      verified = outcome.success === true;
      if (!verified) {
        // eslint-disable-next-line no-console
        console.warn(
          "[ai-directory submission] Turnstile rejected:",
          outcome["error-codes"] ?? []
        );
      }
    } catch (err) {
      // Fail closed. If verification cannot complete, reject: a real person can
      // retry, but an unverified bot should not slip through during an outage.
      // eslint-disable-next-line no-console
      console.warn("[ai-directory submission] Turnstile verification error:", err);
    }

    if (!verified) {
      return NextResponse.json(
        { error: "Verification failed. Please try the check again." },
        { status: 400 }
      );
    }
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
