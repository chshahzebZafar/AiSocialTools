import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase access, in two flavours with very different authority.
 *
 * - supabaseBrowser(): the anon key, used in the browser. Every query it makes
 *   is subject to RLS, so what a signed-in person can read is decided by the
 *   policies in supabase/migrations, not by the code calling it.
 *
 * - supabaseAdmin(): the service role key, used only in route handlers. It
 *   bypasses RLS entirely. Never import this into a client component - the key
 *   would ship to the browser and hand every visitor the whole database.
 *
 * Both return null when the environment is not configured, matching how
 * getDb() behaves for Firebase: an unconfigured deploy degrades to "this
 * feature is off" rather than crashing on import.
 */

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True when the public keys are present, so UI can hide what cannot work. */
export const isSupabaseReady = Boolean(URL && ANON);

let browserClient: SupabaseClient | null | undefined;

/** Browser-side client. Subject to RLS. Safe to use in client components. */
export function supabaseBrowser(): SupabaseClient | null {
  if (browserClient !== undefined) return browserClient;
  browserClient = URL && ANON ? createClient(URL, ANON) : null;
  if (!browserClient) {
    // eslint-disable-next-line no-console
    console.warn("[supabase] NEXT_PUBLIC_SUPABASE_URL/ANON_KEY not set — accounts disabled.");
  }
  return browserClient;
}

let adminClient: SupabaseClient | null | undefined;

/**
 * Service-role client. Bypasses RLS - server-only, never a client component.
 *
 * Sessions are not persisted and tokens are not auto-refreshed: this client
 * represents the server itself, not a signed-in person, and a route handler
 * that silently adopted a cached session would be a confusing security bug.
 */
export function supabaseAdmin(): SupabaseClient | null {
  if (adminClient !== undefined) return adminClient;

  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!URL || !key) {
    // eslint-disable-next-line no-console
    console.warn(
      "[supabase] " +
        `${!URL ? "NEXT_PUBLIC_SUPABASE_URL " : ""}${!key ? "SUPABASE_SERVICE_ROLE_KEY " : ""}` +
        "not set — server-side directory storage disabled."
    );
    adminClient = null;
    return adminClient;
  }

  adminClient = createClient(URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return adminClient;
}

/**
 * Identifies the caller of an API route from their Authorization header.
 *
 * The token is verified by Supabase rather than decoded locally - a JWT read
 * without verification is just a string the browser chose. Returns null for
 * anything missing, expired or forged, and the caller turns that into a 401.
 */
export async function userFromRequest(
  authorizationHeader: string | null
): Promise<{ id: string; email: string | null; emailVerified: boolean } | null> {
  const token = authorizationHeader?.startsWith("Bearer ")
    ? authorizationHeader.slice(7).trim()
    : "";
  if (!token) return null;

  const admin = supabaseAdmin();
  if (!admin) return null;

  const { data, error } = await admin.auth.getUser(token);
  if (error || !data.user) return null;

  return {
    id: data.user.id,
    email: data.user.email ?? null,
    // Used to decide whether old submissions may be claimed by email address.
    emailVerified: Boolean(data.user.email_confirmed_at),
  };
}
