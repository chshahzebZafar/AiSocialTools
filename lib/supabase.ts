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

/**
 * Supabase is mid-rename: older projects issue an "anon" JWT, newer ones a
 * "publishable" key, and the dashboard's own Connect snippet hands you
 * whichever your project uses. Accepting both names means a correct key under
 * either variable works, instead of the app reporting "not configured" while
 * the key sits right there under the other spelling.
 */
const ANON =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * A present variable is not a usable one. A placeholder, a trailing comment or
 * a half-pasted value all read as truthy, and createClient throws on a bad
 * URL - which, during a build, fails the whole page rather than disabling one
 * feature. Validate the shape first and treat anything else as unconfigured.
 */
function validUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const u = new globalThis.URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

/** True when the public config is present AND usable. */
export const isSupabaseReady = validUrl(URL) && Boolean(ANON);

let browserClient: SupabaseClient | null | undefined;

/** Browser-side client. Subject to RLS. Safe to use in client components. */
export function supabaseBrowser(): SupabaseClient | null {
  if (browserClient !== undefined) return browserClient;
  try {
    browserClient = validUrl(URL) && ANON ? createClient(URL, ANON) : null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[supabase] browser client could not be created:", err);
    browserClient = null;
  }
  if (!browserClient) {
    // eslint-disable-next-line no-console
    console.warn(
      "[supabase] NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY " +
        "(or _PUBLISHABLE_KEY) not set — accounts disabled."
    );
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
  if (!validUrl(URL) || !key) {
    // eslint-disable-next-line no-console
    console.warn(
      "[supabase] " +
        `${!validUrl(URL) ? "NEXT_PUBLIC_SUPABASE_URL (missing or not a URL) " : ""}` +
        `${!key ? "SUPABASE_SERVICE_ROLE_KEY " : ""}` +
        "— server-side directory storage disabled, falling back to Firestore."
    );
    adminClient = null;
    return adminClient;
  }

  try {
    adminClient = createClient(URL, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch (err) {
    // A bad value must disable Supabase, not crash every page that reads the
    // directory. getPublishedTools() falls back to Firestore when this is null.
    // eslint-disable-next-line no-console
    console.error("[supabase] admin client could not be created:", err);
    adminClient = null;
  }
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
