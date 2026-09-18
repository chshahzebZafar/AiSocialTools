import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { aiDirectoryTools, type AIDirectoryTool } from "@/lib/ai-directory";
import {
  directoryCategories,
  getCategoryBySlug,
  MIN_TOOLS_TO_INDEX,
} from "@/lib/directory-categories";
import { asDirectoryTool, getLiveApprovedTools } from "@/lib/directory-live";
import { ArrowLeft, ArrowUpRight, BadgeCheck, Check } from "lucide-react";

/**
 * Category pages - the directory's indexable surface.
 *
 * Before these existed, /ai-directory and /ai-directory/submit were the only
 * indexable directory URLs: category filtering was client-side, so "Video"
 * produced no URL and nothing for Google to index or anyone to link to.
 *
 * Pages with fewer than MIN_TOOLS_TO_INDEX reviewed tools still render for
 * visitors but are noindex and stay out of the sitemap. A page holding two
 * entries is the same thin content we removed from the tool pages.
 *
 * Revalidates so tools approved in /admin appear without a deploy.
 */
export const revalidate = 300;

export function generateStaticParams() {
  return directoryCategories.map((c) => ({ slug: c.slug }));
}

async function toolsInCategory(name: string): Promise<AIDirectoryTool[]> {
  const curated = aiDirectoryTools.filter(
    (t) => t.approved && (t.category === name || t.subcategories?.includes(name as never))
  );
  const live = (await getLiveApprovedTools())
    .filter((t) => t.category === name)
    .map(asDirectoryTool);
  const taken = new Set(curated.map((t) => t.slug));
  return [...curated, ...live.filter((t) => !taken.has(t.slug))];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category not found" };

  const tools = await toolsInCategory(category.name);
  const url = `https://aisocialtools.co/ai-directory/category/${category.slug}`;
  const description =
    `${tools.length} reviewed ${category.name.toLowerCase()} AI tools, with what each one does, ` +
    `how it is priced, and what to check before you commit.`;

  return {
    title: `${category.heading} — Reviewed & Compared`,
    description,
    alternates: { canonical: url },
    openGraph: { title: category.heading, description, url, type: "website" },
    // Indexable only once the page has enough reviewed tools to be worth
    // reading. See MIN_TOOLS_TO_INDEX.
    robots:
      tools.length >= MIN_TOOLS_TO_INDEX
        ? { index: true, follow: true }
        : { index: false, follow: true },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const tools = await toolsInCategory(category.name);
  const related = directoryCategories.filter((c) => c.slug !== category.slug).slice(0, 8);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.heading,
    numberOfItems: tools.length,
    itemListElement: tools.slice(0, 50).map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `https://aisocialtools.co/ai-directory/${t.slug}`,
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
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Breadcrumbs embedded />
            <Link
              href="/ai-directory"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              All categories
            </Link>

            <Badge variant="neutral" className="mb-3">
              {tools.length} reviewed {tools.length === 1 ? "tool" : "tools"}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-tight mb-5">
              {category.heading}
            </h1>
            <div className="max-w-2xl space-y-4">
              {category.intro.map((p, i) => (
                <p key={i} className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* What to look for - the part that makes this page worth reading */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-5">
              What to check before you commit
            </h2>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl">
              {category.lookFor.map((point, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  <Check className="w-4 h-4 mt-0.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" strokeWidth={2.5} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Comparison table */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-1">
              {category.heading} compared
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Every tool below has been checked: the link works, the pricing is
              what the tool says it is, and the description matches the product.
            </p>

            {tools.length === 0 ? (
              <div className="text-center py-14 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                <p className="text-zinc-500 dark:text-zinc-400 mb-1">
                  Nothing reviewed in this category yet.
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  Know a good one?{" "}
                  <Link href="/ai-directory/submit" className="underline">
                    Submit it
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="w-full min-w-[640px] text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800 text-left">
                      <th className="py-2.5 pr-4 font-semibold text-zinc-950 dark:text-white">Tool</th>
                      <th className="py-2.5 pr-4 font-semibold text-zinc-950 dark:text-white">What it does</th>
                      <th className="py-2.5 pr-4 font-semibold text-zinc-950 dark:text-white whitespace-nowrap">Pricing</th>
                      <th className="py-2.5 font-semibold text-zinc-950 dark:text-white" />
                    </tr>
                  </thead>
                  <tbody>
                    {tools.map((t) => {
                      const isFree = t.pricing === "Free" || t.pricing === "Open Source";
                      return (
                        <tr
                          key={t.slug}
                          className="border-b border-zinc-100 dark:border-zinc-900 align-top hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
                        >
                          <td className="py-3 pr-4 whitespace-nowrap">
                            <Link
                              href={`/ai-directory/${t.slug}`}
                              className="font-medium text-zinc-950 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1.5"
                            >
                              {t.name}
                              <BadgeCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                            </Link>
                          </td>
                          <td className="py-3 pr-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {t.tagline}
                          </td>
                          <td className="py-3 pr-4 whitespace-nowrap">
                            <span
                              className={`text-[11px] uppercase tracking-wider font-semibold ${
                                isFree
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-zinc-500 dark:text-zinc-500"
                              }`}
                            >
                              {t.pricing}
                            </span>
                          </td>
                          <td className="py-3 whitespace-nowrap">
                            <a
                              href={t.url}
                              target="_blank"
                              rel="noopener"
                              className="text-xs text-zinc-500 hover:text-zinc-950 dark:hover:text-white inline-flex items-center gap-1"
                            >
                              Visit
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* Related categories - internal linking, so these pages are reachable */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-5">
              Other categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {related.map((c) => (
                <Link
                  key={c.slug}
                  href={`/ai-directory/category/${c.slug}`}
                  className="inline-flex items-center h-8 px-3 text-sm rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-2">
              Built something in {category.name.toLowerCase()}?
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Listing is free. We check every submission before it goes live.
            </p>
            <ButtonLink href="/ai-directory/submit" size="md">
              Submit your tool
            </ButtonLink>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
