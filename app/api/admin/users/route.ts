import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";
import { verifySessionToken, ADMIN_COOKIE } from "@/lib/admin-auth";

/**
 * Registered accounts, for the admin's Users tab.
 *
 * Reads the auth schema, which only the service role can do, so this is a
 * route rather than a browser query - there is no RLS policy that could ever
 * expose this list to a client, and there should not be.
 *
 * Each row is joined to that person's submissions, because an account with no
 * submissions and an account with ten are different things and the raw auth
 * list cannot tell them apart.
 */
export const dynamic = "force-dynamic";

const MAX_USERS = 500;

export async function GET() {
  const jar = await cookies();
  if (!verifySessionToken(jar.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const db = supabaseAdmin();
  if (!db) {
    return NextResponse.json({ error: "Storage is not configured." }, { status: 503 });
  }

  try {
    // listUsers is paginated; one page of 500 is plenty for now and keeps this
    // a single round trip. If it ever fills up, page it rather than raising it.
    const { data, error } = await db.auth.admin.listUsers({ page: 1, perPage: MAX_USERS });
    if (error) throw new Error(error.message);

    const users = data.users ?? [];

    // One query for every submission owner, then counted in memory - cheaper
    // than a per-user query and the row count here is small.
    const { data: subs } = await db
      .from("submissions")
      .select("owner_id,status,sponsored,submitter_email");

    const byOwner = new Map<string, { total: number; published: number; featured: number }>();
    const byEmail = new Map<string, number>();
    for (const s of subs ?? []) {
      const owner = s.owner_id ? String(s.owner_id) : "";
      if (owner) {
        const e = byOwner.get(owner) ?? { total: 0, published: 0, featured: 0 };
        e.total += 1;
        if (s.status === "approved") e.published += 1;
        if (s.sponsored) e.featured += 1;
        byOwner.set(owner, e);
      }
      const email = String(s.submitter_email ?? "").toLowerCase();
      if (email) byEmail.set(email, (byEmail.get(email) ?? 0) + 1);
    }

    return NextResponse.json({
      ok: true,
      count: users.length,
      users: users
        .map((u) => {
          const counts = byOwner.get(u.id) ?? { total: 0, published: 0, featured: 0 };
          const email = (u.email ?? "").toLowerCase();
          return {
            id: u.id,
            email: u.email ?? "",
            name:
              (u.user_metadata?.full_name as string) ||
              (u.user_metadata?.name as string) ||
              "",
            createdAt: u.created_at ?? "",
            lastSignInAt: u.last_sign_in_at ?? "",
            confirmed: Boolean(u.email_confirmed_at),
            submissions: counts.total,
            published: counts.published,
            featured: counts.featured,
            // Submissions made under this address but not yet attached to the
            // account - they claim on first sign-in once the email is verified.
            unclaimed: Math.max(0, (byEmail.get(email) ?? 0) - counts.total),
          };
        })
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[admin] failed to read users:", err);
    return NextResponse.json({ error: "Could not read users." }, { status: 500 });
  }
}
