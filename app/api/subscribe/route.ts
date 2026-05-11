import { NextRequest, NextResponse } from "next/server";

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

      return NextResponse.json({ success: true });
    }

    // ──────────────────────────────────────────────────────────────
    // Fallback — no integration configured, just log and accept
    // Replace this block with your preferred provider
    // ──────────────────────────────────────────────────────────────
    console.log("[Subscribe] New lead:", email);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
