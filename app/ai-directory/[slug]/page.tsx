import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import {
  aiDirectoryTools,
  getDirectoryToolBySlug,
} from "@/lib/ai-directory";
import {
  ExternalLink,
  Check,
  X,
  Sparkles,
  TrendingUp,
  Twitter,
  Calendar,
  Tag,
  BadgeCheck,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return aiDirectoryTools
    .filter((t) => t.approved)
    .map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getDirectoryToolBySlug(slug);
  if (!tool) {
    return {
      title: "Tool not found",
      description: "This AI tool isn't in our directory.",
    };
  }
  const url = `https://aisocialtools.co/ai-directory/${tool.slug}`;
  // Pad short taglines so meta descriptions land in the 80-160 sweet spot.
  // Avoids Ahrefs "too short" warnings on ~170 directory entries.
  const padding = ` ${tool.name} review with pros, cons, pricing, and alternatives.`;
  let description = tool.tagline;
  if (description.length < 90) description = description + padding;
  if (description.length > 155) description = description.slice(0, 152) + "…";

  return {
    title: `${tool.name} Review — ${tool.category}`,
    description,
    keywords: [
      tool.name,
      `${tool.name} review`,
      `${tool.name} pricing`,
      `${tool.name} alternatives`,
      ...(tool.tags || []),
      tool.category.toLowerCase(),
    ],
    openGraph: {
      title: `${tool.name} — ${tool.tagline}`,
      description,
      type: "article",
      url,
      siteName: "Social Media Tools",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} — ${tool.tagline}`,
      description,
    },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

export default async function AIDirectoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getDirectoryToolBySlug(slug);
  if (!tool) notFound();

  const initial = tool.name.charAt(0).toUpperCase();
  const alternatives = (tool.alternatives || [])
    .map((altSlug) => getDirectoryToolBySlug(altSlug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  /* Schemas */
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.tagline,
    url: tool.url,
    applicationCategory: tool.category,
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price:
        tool.pricing === "Free" || tool.pricing === "Open Source"
          ? "0"
          : undefined,
      priceCurrency: "USD",
      description: tool.pricingDetails,
    },
    publisher: tool.founder
      ? { "@type": "Organization", name: tool.founder }
      : undefined,
    sameAs: tool.twitter ? [`https://twitter.com/${tool.twitter}`] : undefined,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aisocialtools.co" },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Directory",
        item: "https://aisocialtools.co/ai-directory",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: `https://aisocialtools.co/ai-directory/${tool.slug}`,
      },
    ],
  };

  const isFree = tool.pricing === "Free" || tool.pricing === "Open Source";

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      <main className="flex-1">
        <Breadcrumbs />

        {/* ============================================================
             HERO — same aurora + dot-grid pattern as other pages
             ============================================================ */}
        <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
          <div className="aurora" aria-hidden />
          <div className="absolute inset-0 bg-dot-grid-animated opacity-50" aria-hidden />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Link
              href="/ai-directory"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to directory
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8 mb-8">
              {/* Avatar — solid zinc, no gradient */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-zinc-950 dark:bg-white flex items-center justify-center text-3xl sm:text-4xl font-semibold text-white dark:text-zinc-950 tracking-tight flex-shrink-0 ring-1 ring-zinc-200 dark:ring-zinc-800">
                {initial}
              </div>

              {/* Title block */}
              <div className="flex-1 min-w-0">
                {/* Badge row — uses Badge component, consistent variants */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="neutral">{tool.category}</Badge>
                  <Badge variant={isFree ? "success" : "neutral"}>
                    {tool.pricing}
                  </Badge>
                  {tool.approved && (
                    <Badge variant="accent">
                      <BadgeCheck className="w-3 h-3" strokeWidth={2.5} />
                      Verified
                    </Badge>
                  )}
                  {tool.featured && (
                    <Badge variant="accent">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </Badge>
                  )}
                  {tool.trending && (
                    <Badge variant="warning">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </Badge>
                  )}
                  {tool.isNew && <Badge variant="success">New</Badge>}
                </div>

                {/* Tool name — site standard typography */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-tight mb-3">
                  {tool.name}
                </h1>
                <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                  {tool.tagline}
                </p>
              </div>
            </div>

            {/* CTAs — site standard buttons */}
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={tool.url} external size="lg">
                Visit {tool.name}
                <ExternalLink className="w-4 h-4" />
              </ButtonLink>
              {tool.twitter && (
                <ButtonLink
                  href={`https://twitter.com/${tool.twitter}`}
                  external
                  variant="secondary"
                  size="lg"
                >
                  <Twitter className="w-4 h-4" />
                  @{tool.twitter}
                </ButtonLink>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================
             BODY — description + features + pros/cons + sidebar
             ============================================================ */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
              {/* Main column */}
              <div className="lg:col-span-2 space-y-12">
                {/* About */}
                <div>
                  <h2 className="text-xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
                    About {tool.name}
                  </h2>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                    {tool.description}
                  </p>
                </div>

                {/* Features */}
                {tool.features.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
                      Key features
                    </h2>
                    <ul className="space-y-3">
                      {tool.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300 leading-relaxed"
                        >
                          <Check
                            className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0"
                            strokeWidth={2.5}
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Pros / Cons — hairline-grid pattern like /landing features */}
                {(tool.pros || tool.cons) && (
                  <div>
                    <h2 className="text-xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
                      Pros &amp; limitations
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                      {tool.pros && tool.pros.length > 0 && (
                        <div className="bg-white dark:bg-zinc-950 p-6">
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-4">
                            Pros
                          </h3>
                          <ul className="space-y-2.5">
                            {tool.pros.map((p, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
                              >
                                <Check
                                  className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0"
                                  strokeWidth={2.5}
                                />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {tool.cons && tool.cons.length > 0 && (
                        <div className="bg-white dark:bg-zinc-950 p-6">
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 mb-4">
                            Limitations
                          </h3>
                          <ul className="space-y-2.5">
                            {tool.cons.map((c, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300"
                              >
                                <X
                                  className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 mt-1 flex-shrink-0"
                                  strokeWidth={2.5}
                                />
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar — hairline border, rounded-lg, restrained */}
              <aside className="lg:col-span-1">
                <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 lg:sticky lg:top-24">
                  <h3 className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-500 font-semibold mb-4">
                    Quick facts
                  </h3>
                  <dl className="space-y-4 text-sm">
                    <div>
                      <dt className="text-zinc-500 dark:text-zinc-500 mb-1">
                        Pricing
                      </dt>
                      <dd className="text-zinc-950 dark:text-white font-medium">
                        {tool.pricing}
                      </dd>
                      {tool.pricingDetails && (
                        <dd className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                          {tool.pricingDetails}
                        </dd>
                      )}
                    </div>
                    <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <dt className="text-zinc-500 dark:text-zinc-500 mb-1">
                        Category
                      </dt>
                      <dd className="text-zinc-950 dark:text-white font-medium">
                        {tool.category}
                      </dd>
                    </div>
                    {tool.founder && (
                      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                        <dt className="text-zinc-500 dark:text-zinc-500 mb-1">
                          Made by
                        </dt>
                        <dd className="text-zinc-950 dark:text-white font-medium">
                          {tool.founder}
                        </dd>
                      </div>
                    )}
                    {tool.launchedAt && (
                      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                        <dt className="text-zinc-500 dark:text-zinc-500 mb-1 inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Launched
                        </dt>
                        <dd className="text-zinc-950 dark:text-white font-medium">
                          {new Date(tool.launchedAt).getFullYear()}
                        </dd>
                      </div>
                    )}
                    {tool.tags && tool.tags.length > 0 && (
                      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                        <dt className="text-zinc-500 dark:text-zinc-500 mb-2 inline-flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          Tags
                        </dt>
                        <dd className="flex flex-wrap gap-1.5">
                          {tool.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-block px-2 py-0.5 text-[10px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </dd>
                      </div>
                    )}
                  </dl>

                  <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full h-10 px-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-md text-sm font-medium transition-colors"
                    >
                      Try {tool.name}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ============================================================
             ALTERNATIVES — matches /tools card design exactly
             ============================================================ */}
        {alternatives.length > 0 && (
          <section className="border-b border-zinc-200 dark:border-zinc-800">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <Badge variant="neutral" className="mb-4">
                Alternatives
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-3">
                Tools similar to {tool.name}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl">
                If {tool.name} doesn&apos;t fit, here are the closest alternatives in
                our directory.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {alternatives.map((alt) => {
                  const altIsFree =
                    alt.pricing === "Free" || alt.pricing === "Open Source";
                  return (
                    <Link
                      key={alt.slug}
                      href={`/ai-directory/${alt.slug}`}
                      className="group relative block h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="w-10 h-10 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-semibold text-sm group-hover:bg-indigo-50 group-hover:border-indigo-200 group-hover:text-indigo-700 dark:group-hover:bg-indigo-500/10 dark:group-hover:border-indigo-500/30 dark:group-hover:text-indigo-300 transition-colors">
                          {alt.name.charAt(0)}
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <h3 className="font-semibold text-[15px] text-zinc-950 dark:text-white mb-1">
                        {alt.name}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
                        {alt.tagline}
                      </p>
                      <div className="flex items-center justify-between gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-900">
                        <span className="text-xs text-zinc-500 dark:text-zinc-500">
                          {alt.category}
                        </span>
                        <span
                          className={`text-[10px] uppercase tracking-wider font-semibold ${
                            altIsFree
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-zinc-500 dark:text-zinc-500"
                          }`}
                        >
                          {alt.pricing}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
             SUBMIT CTA — same dark block pattern as landing page
             ============================================================ */}
        <section className="bg-zinc-950 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-4 max-w-2xl mx-auto">
              Know a tool that should be here?
            </h2>
            <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Submit any AI tool — yours or one you love. Free listing, no link demands,
              reviewed within 7 days.
            </p>
            <Link
              href="/ai-directory/submit"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-white text-zinc-950 hover:bg-zinc-200 rounded-md text-base font-medium transition-colors"
            >
              Submit a tool
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
