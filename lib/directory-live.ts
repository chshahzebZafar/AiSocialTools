import "server-only";

import { getDb, SUBMISSIONS } from "@/lib/firebase-admin";
import {
  aiDirectoryTools,
  type AICategory,
  type AIDirectoryTool,
  type AIPricing,
} from "@/lib/ai-directory";

/**
 * Approved submissions, published without a deploy.
 *
 * The curated directory in lib/ai-directory.ts is a code file, so listing a
 * tool used to mean a commit and a deploy. Anything marked approved in /admin
 * is now published from Firestore instead, and appears alongside the curated
 * entries.
 *
 * Curated entries always win. If the same tool exists in both places - which
 * happens when an approved submission is later written into the code file -
 * the code version is shown and the live one is suppressed, so nothing is
 * listed twice.
 */

export interface LiveTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  category: string;
  pricing: string;
  pricingDetails?: string;
  features: string[];
  founder?: string;
  twitter?: string;
  addedAt: string;
  sponsored?: boolean;
  sponsoredUntil?: string;
  /** Marks entries published from the admin inbox rather than the code file. */
  live: true;
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function domainOf(url: string): string {
  try {
    const h = new URL(url).hostname.toLowerCase();
    return h.startsWith("www.") ? h.slice(4) : h;
  } catch {
    return "";
  }
}

function splitFeatures(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value !== "string") return [];
  return value
    .split(/\r?\n|\s\|\s|;\s*/)
    .map((f) => f.trim())
    .filter(Boolean)
    .slice(0, 12);
}

/**
 * Approved submissions that are not already in the curated file.
 *
 * Returns [] when Firestore is not configured, so the public site degrades to
 * the curated directory rather than erroring.
 */
/**
 * In-process cache. Every category page, detail page and API call used to run
 * its own 500-document query, each revalidating every 5 minutes - across 27
 * category pages that is millions of reads a day against Firestore's 50,000
 * free-tier allowance. The quota duly ran out, the query started failing with
 * RESOURCE_EXHAUSTED, the catch below returned [], and the public directory
 * silently showed nothing.
 *
 * A warm serverless instance now does one read per TTL instead of one per
 * render. Instances are ephemeral so this is not a guarantee, only a large
 * reduction - the real fix is moving this data to Supabase, where it is a
 * single indexed view rather than a full-collection scan.
 */
const CACHE_TTL_MS = 5 * 60 * 1000;
let cache: { at: number; tools: LiveTool[] } | null = null;

export async function getLiveApprovedTools(): Promise<LiveTool[]> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.tools;

  const db = getDb();
  if (!db) return [];

  const curatedSlugs = new Set(aiDirectoryTools.map((t) => t.slug));
  const curatedDomains = new Set(
    aiDirectoryTools.map((t) => domainOf(t.url)).filter(Boolean)
  );

  try {
    const snap = await db
      .collection(SUBMISSIONS)
      .where("status", "==", "approved")
      .limit(500)
      .get();

    const out: LiveTool[] = [];
    const seen = new Set<string>();

    for (const doc of snap.docs) {
      const d = doc.data() as Record<string, unknown>;
      const name = String(d.name ?? "").trim();
      const url = String(d.url ?? "").trim();
      if (!name || !url) continue;

      const slug = String(d.slug ?? "").trim() || slugify(name);
      const domain = domainOf(url);

      // Curated wins, and never list the same tool twice.
      if (curatedSlugs.has(slug) || (domain && curatedDomains.has(domain))) continue;
      if (seen.has(slug)) continue;
      seen.add(slug);

      out.push({
        slug,
        name,
        tagline: String(d.tagline ?? "").trim(),
        description: String(d.description ?? "").trim(),
        url,
        category: String(d.category ?? "Productivity").trim(),
        pricing: String(d.pricing ?? "Free").trim(),
        pricingDetails: String(d.pricingDetails ?? "").trim() || undefined,
        features: splitFeatures(d.features),
        founder: String(d.founder ?? "").trim() || undefined,
        twitter: String(d.twitter ?? "").replace(/^@/, "").trim() || undefined,
        addedAt: String(d.submittedAt ?? "").slice(0, 10),
        sponsored: d.sponsored === true,
        sponsoredUntil: d.sponsoredUntil ? String(d.sponsoredUntil) : undefined,
        live: true,
      });
    }
    cache = { at: Date.now(), tools: out };
    return out;
  } catch (err) {
    // A Firestore problem must not take the public directory down.
    // eslint-disable-next-line no-console
    console.warn("[directory-live] could not read approved submissions:", err);
    // Serve the last good result rather than an empty directory. A quota
    // failure is temporary; showing nothing looks like the listings were
    // deleted, which is far worse and is exactly what happened here.
    return cache?.tools ?? [];
  }
}

/** One approved submission by slug, for the detail page. */
export async function getLiveToolBySlug(slug: string): Promise<LiveTool | null> {
  const all = await getLiveApprovedTools();
  return all.find((t) => t.slug === slug) ?? null;
}

/** Shape a LiveTool like a curated entry so existing components can render it. */
export function asDirectoryTool(t: LiveTool): AIDirectoryTool {
  return {
    slug: t.slug,
    name: t.name,
    tagline: t.tagline,
    description: t.description,
    url: t.url,
    category: t.category as AICategory,
    pricing: t.pricing as AIPricing,
    pricingDetails: t.pricingDetails,
    features: t.features,
    tags: [] as string[],
    addedAt: t.addedAt,
    sponsored: t.sponsored,
    sponsoredUntil: t.sponsoredUntil,
    approved: true,
    founder: t.founder,
    twitter: t.twitter,
  };
}
