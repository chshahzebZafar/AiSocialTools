import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { getDirectoryToolBySlug, type AIDirectoryTool } from "@/lib/ai-directory";
import {
  directoryCollections,
  getCollectionBySlug,
  type CollectionPick,
} from "@/lib/directory-collections";
import { getCategorySlug } from "@/lib/directory-categories";
import { ArrowLeft, ArrowUpRight, Check, Info } from "lucide-react";

/**
 * Collection pages - "best free AI video generators", not "category: Video".
 *
 * A category page lists what exists. A collection answers a question someone
 * types, and the answer is the reasoning: every pick carries a stated reason,
 * and the page says what it left out. That is the part a filtered list cannot
 * produce and the part other sites link to.
 *
 * These are indexable. Unlike category pages they are hand-written end to end,
 * so there is no thin-content case to guard against - the guard instead is
 * scripts/check-collections.mjs, which fails the build if a pick points at a
 * slug that no longer exists.
 */
export const revalidate = 300;

export function generateStaticParams() {
  return directoryCollections.map((c) => ({ slug: c.slug }));
}

/** A pick joined to its directory entry. Picks whose entry has gone are dropped. */
type ResolvedPick = CollectionPick & { tool: AIDirectoryTool };

function resolvePicks(picks: CollectionPick[]): ResolvedPick[] {
  return picks.flatMap((p) => {
    const tool = getDirectoryToolBySlug(p.slug);
    return tool && tool.approved ? [{ ...p, tool }] : [];
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Collection not found" };

  const url = `https://aisocialtools.co/ai-directory/collections/${collection.slug}`;
  return {
    title: `${collection.title} (${new Date().getFullYear()})`,
    description: collection.description,
    alternates: { canonical: url },
    openGraph: {
      title: collection.heading,
      description: collection.description,
      url,
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const picks = resolvePicks(collection.picks);
  const others = directoryCollections.filter((c) => c.slug !== collection.slug);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: collection.heading,
    description: collection.description,
    numberOfItems: picks.length,
    itemListElement: picks.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.tool.name,
      description: p.why,
      url: `https://aisocialtools.co/ai-directory/${p.tool.slug}`,
    })),
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
          <div className="aurora" aria-hidden />
          <div className="absolute inset-0 bg-dot-grid-animated opacity-50" aria-hidden />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Breadcrumbs embedded />
            <Link
              href="/ai-directory"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              AI directory
            </Link>

            <Badge variant="neutral" className="mb-3">
              {picks.length} {picks.length === 1 ? "pick" : "picks"}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-tight mb-5">
              {collection.heading}
            </h1>
            <div className="space-y-4">
              {collection.intro.map((p, i) => (
                <p
                  key={i}
                  className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* How these were chosen - the credibility of the whole page rests here */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-5">
              How these were chosen
            </h2>
            <ul className="space-y-3">
              {collection.criteria.map((c, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed"
                >
                  <Check
                    className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0"
                    strokeWidth={2.5}
                  />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The list */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <ol className="space-y-8">
              {picks.map((p, i) => (
                <li key={p.slug} className="flex gap-4 sm:gap-5">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-500 dark:text-zinc-400"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                      <h3 className="text-lg font-semibold text-zinc-950 dark:text-white tracking-tight">
                        <Link
                          href={`/ai-directory/${p.tool.slug}`}
                          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {p.tool.name}
                        </Link>
                      </h3>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-500">
                        {p.tool.pricing}
                      </span>
                      {getCategorySlug(p.tool.category) && (
                        <Link
                          href={`/ai-directory/category/${getCategorySlug(p.tool.category)}`}
                          className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                        >
                          {p.tool.category}
                        </Link>
                      )}
                    </div>

                    <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed mb-2">
                      {p.why}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">
                      {p.tool.tagline}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                      <a
                        href={p.tool.url}
                        target="_blank"
                        rel="noopener nofollow ugc"
                        className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
                      >
                        Visit {p.tool.name}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <Link
                        href={`/ai-directory/${p.tool.slug}`}
                        className="text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            {collection.caveat && (
              <div className="mt-10 flex gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 p-4">
                <Info className="w-4 h-4 mt-0.5 text-zinc-400 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    What is not here
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {collection.caveat}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Other collections - internal linking so these are reachable */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-5">
              More collections
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {others.map((c) => (
                <Link
                  key={c.slug}
                  href={`/ai-directory/collections/${c.slug}`}
                  className="group rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <p className="font-medium text-zinc-950 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {c.heading}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {c.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-2">
              Think something is missing?
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Submit it and we will check it against the criteria above. Listing is free.
            </p>
            <ButtonLink href="/ai-directory/submit" size="md">
              Submit a tool
            </ButtonLink>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
