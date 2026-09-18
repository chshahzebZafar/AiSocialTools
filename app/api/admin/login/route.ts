import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  isAdminConfigured,
  passwordMatches,
} from "@/lib/admin-auth";

// firebase-admin and node:crypto both need the Node runtime.
export const runtime = "nodejs";

/**
 * POST /api/admin/login  — exchange the admin password for a session cookie.
 * DELETE /api/admin/login — sign out.
 *
 * A failed attempt sleeps briefly. Serverless functions have no shared memory,
 * so a per-IP counter would not survive between invocations; a fixed delay at
 * least removes the ability to brute force at full speed from one connection.
 */
export async function POST(req: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin access is not configured on this deployment." },
      { status: 503 }
    );
  }

  let password: unknown;
  try {
    password = (await req.json())?.password;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!passwordMatches(password)) {
    await new Promise((r) => setTimeout(r, 700));
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = createSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Admin access is not configured." }, { status: 503 });
  }

  const jar = await cookies();
  jar.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}
