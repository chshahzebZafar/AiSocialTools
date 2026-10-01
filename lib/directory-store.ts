import "server-only";
import { aiDirectoryTools, type AIDirectoryTool, type AICategory, type AIPricing } from "@/lib/ai-directory";
import { asDirectoryTool, getLiveApprovedTools, getLiveToolBySlug, type LiveTool } from "@/lib/directory-live";
import { supabaseAdmin } from "@/lib/supabase";

/**
 * Where published listings come from, during and after the move to Supabase.
 *
 * Supabase wins when SUPABASE_SERVICE_ROLE_KEY is configured; otherwise this
 * falls through to the existing Firestore reads. That makes the cutover a
 * config change rather than a deploy, and - more usefully - makes it
 * reversible: if Supabase misbehaves on a live site, removing the env var puts
 * Firestore back without shipping code.
 *
 * Both sources are deduped against the curated TS file the same way, because
 * a tool existing in two places is the one bug that shows up as a duplicate on
 * a public page.
 */

/** Rows as the published_tools view returns them. */
type PublishedRow = {
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  url: string;
  category: string | null;
  pricing: string | null;
  pricing_details: string | null;
  features: string | null;
  founder: string | null;
  twitter: string | null;
  submitted_at: string | null;
  sponsored: boolean | null;
};

/** True once Supabase is the source of truth for published listings. */
export function usingSupabase(): boolean {
  return supabaseAdmin() !== null;
}

function rowToTool(r: PublishedRow): AIDirectoryTool {
  return {
    slug: r.slug,
    name: r.name,
    tagline: r.tagline ?? "",
    description: r.description ?? "",
    url: r.url,
    category: (r.category ?? "") as AICategory,
    pricing: (r.pricing ?? "") as AIPricing,
    pricingDetails: r.pricing_details ?? undefined,
    // Stored as one newline-separated string, same as the Firestore shape.
    features: (r.features ?? "")
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean),
    tags: [],
    addedAt: (r.submitted_at ?? "").slice(0, 10),
    approved: true,
    founder: r.founder || undefined,
    twitter: r.twitter || undefined,
    // The view already applied the expiry check, so this is "currently paid
    // for" rather than "was sold at some point".
    sponsored: r.sponsored ?? false,
    sponsoredUntil: r.sponsored ? "9999-12-31" : undefined,
  };
}

/** Domain of a URL, for deduping against curated entries that use a different slug. */
function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function dedupeAgainstCurated(tools: AIDirectoryTool[]): AIDirectoryTool[] {
  const slugs = new Set(aiDirectoryTools.map((t) => t.slug));
  const domains = new Set(aiDirectoryTools.map((t) => domainOf(t.url)).filter(Boolean));
  const seen = new Set<string>();
  const out: AIDirectoryTool[] = [];
  for (const t of tools) {
    const d = domainOf(t.url);
    if (slugs.has(t.slug) || (d && domains.has(d)) || seen.has(t.slug)) continue;
    seen.add(t.slug);
    out.push(t);
  }
  return out;
}

/** Every published listing that is not already a curated entry. */
export async function getPublishedTools(): Promise<AIDirectoryTool[]> {
  const db = supabaseAdmin();
  if (!db) {
    // Firestore path: unchanged behaviour while the move is in progress.
    const live: LiveTool[] = await getLiveApprovedTools();
    return live.map(asDirectoryTool);
  }

  const { data, error } = await db
    .from("published_tools")
    .select("*")
    .order("submitted_at", { ascending: false })
    .limit(500);

  if (error) {
    // eslint-disable-next-line no-console
    console.error("[directory-store] published_tools read failed:", error.message);
    // A directory missing its newest entries is survivable; a 500 on every
    // category page is not. Curated listings still render.
    return [];
  }

  return dedupeAgainstCurated((data as PublishedRow[]).map(rowToTool));
}

/** One published listing by slug, for the detail page. */
export async function getPublishedToolBySlug(slug: string): Promise<AIDirectoryTool | undefined> {
  const db = supabaseAdmin();
  if (!db) {
    const live = await getLiveToolBySlug(slug);
    return live ? asDirectoryTool(live) : undefined;
  }

  const { data, error } = await db
    .from("published_tools")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    // eslint-disable-next-line no-console
    console.error("[directory-store] published_tools slug read failed:", error.message);
    return undefined;
  }
  return data ? rowToTool(data as PublishedRow) : undefined;
}
