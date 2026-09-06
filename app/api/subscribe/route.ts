import { NextRequest, NextResponse } from "next/server";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Notifies the site owner of a new subscriber and sends the subscriber a
 * confirmation. Mirrors /api/submit-ai-tool: same Resend env vars, same
 * failure-tolerant behaviour — a mail problem must never fail the signup,
 * because the address is already captured by then.
 */
async function sendSubscriptionEmails(email: string, subscribedAt: string) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const SUBMISSION_TO_EMAIL = process.env.SUBMISSION_TO_EMAIL;

  if (!RESEND_API_KEY || !SUBMISSION_TO_EMAIL) {
    // eslint-disable-next-line no-console
    console.warn(
      `[Subscribe] email skipped — ${!RESEND_API_KEY ? "RESEND_API_KEY " : ""}${!SUBMISSION_TO_EMAIL ? "SUBMISSION_TO_EMAIL " : ""}not set.`
    );
    return;
  }

  const send = (payload: Record<string, unknown>) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  try {
    const notify = await send({
      from: "AI Social Tools <submissions@aisocialtools.co>",
      to: [SUBMISSION_TO_EMAIL],
      reply_to: email,
      subject: `New subscriber: ${email}`,
      html: `<p><strong>${escapeHtml(email)}</strong> subscribed at ${escapeHtml(subscribedAt)}.</p>
<p style="color:#666;font-size:12px;">Sent automatically from /api/subscribe · aisocialtools.co</p>`,
    });
    if (!notify.ok) {
      // eslint-disable-next-line no-console
      console.warn("[Subscribe] Resend failed (owner notification):", notify.status, await notify.text());
    }

    const welcome = await send({
      from: "AI Social Tools <submissions@aisocialtools.co>",
      to: [email],
      reply_to: SUBMISSION_TO_EMAIL,
      subject: "You're subscribed to AI Social Tools",
      html: `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;color:#18181b;line-height:1.6;">
  <h2 style="margin:0 0 16px;font-size:20px;">You're subscribed</h2>
  <p style="margin:0 0 16px;">
    Thanks for signing up. You'll hear from us when we ship new free tools or
    publish something worth your time — no fixed schedule, and nothing else.
  </p>
  <p style="margin:0 0 16px;">
    All ${""}70+ tools are free and run in your browser, with no signup:
    <a href="https://aisocialtools.co/tools" style="color:#2563eb;">aisocialtools.co/tools</a>
  </p>
  <p style="margin:0 0 16px;color:#71717a;font-size:13px;">
    If you didn't sign up, ignore this email and you won't hear from us again.
  </p>
  <p style="margin:0;color:#a1a1aa;font-size:12px;">aisocialtools.co</p>
</div>`,
    });
    if (!welcome.ok) {
      // eslint-disable-next-line no-console
      console.warn("[Subscribe] Resend failed (subscriber welcome):", welcome.status, await welcome.text());
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[Subscribe] Email error:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // ──────────────────────────────────────────────────────────────
    // Option A — Mailchimp (recommended)
    // Set MAILCHIMP_API_KEY, MAILCHIMP_SERVER (e.g. "us21"),
    // and MAILCHIMP_LIST_ID in your .env.local
    // ──────────────────────────────────────────────────────────────
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const server = process.env.MAILCHIMP_SERVER;
    const listId = process.env.MAILCHIMP_LIST_ID;

    if (apiKey && server && listId) {
      const res = await fetch(
        `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `apikey ${apiKey}`,
          },
          body: JSON.stringify({
            email_address: email,
            status: "subscribed",
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        // 400 "Member Exists" is not a real failure — treat as success
        if (data.title !== "Member Exists") {
          return NextResponse.json({ error: data.detail }, { status: 400 });
        }
      }

      await sendSubscriptionEmails(email, new Date().toISOString());
      return NextResponse.json({ success: true });
    }

    // ──────────────────────────────────────────────────────────────
    // Fallback — no integration configured, just log and accept
    // Replace this block with your preferred provider
    // ──────────────────────────────────────────────────────────────
    // Without Mailchimp configured, the Vercel log plus the owner notification
    // below are the only record of the signup — so the email matters more here,
    // not less.
    console.log("[Subscribe] New lead:", email);
    await sendSubscriptionEmails(email, new Date().toISOString());
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
