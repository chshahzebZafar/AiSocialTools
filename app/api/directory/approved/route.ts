import { NextResponse } from "next/server";
import { getLiveApprovedTools } from "@/lib/directory-live";

export const runtime = "nodejs";
// Cached for 5 minutes: an approval should show up quickly, but the public
// directory should not hit Firestore on every page view.
export const revalidate = 300;

/**
 * GET /api/directory/approved — public.
 *
 * Tools approved in /admin that are not already in the curated code file.
 * Returns listing fields only; no submitter names, emails or private notes
 * ever leave the admin API.
 */
export async function GET() {
  const tools = await getLiveApprovedTools();
  return NextResponse.json(
    {
      ok: true,
      count: tools.length,
      tools: tools.map((t) => ({
        slug: t.slug,
        name: t.name,
        tagline: t.tagline,
        url: t.url,
        category: t.category,
        pricing: t.pricing,
      })),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
      },
    }
  );
}
