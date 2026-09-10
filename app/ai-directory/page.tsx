"use client";

import { useState, useMemo, useDeferredValue, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import {
  aiDirectoryTools,
  aiCategories,
  type AIDirectoryTool,
  type AICategory,
  type AIPricing,
} from "@/lib/ai-directory";
import {
  Search,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  ArrowRight,
  BadgeCheck,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const pricingFilters: Array<"All" | AIPricing> = [
  "All",
  "Free",
  "Freemium",
  "Paid",
  "Open Source",
];

function ToolCard({ tool }: { tool: AIDirectoryTool }) {
  const initial = tool.name.charAt(0).toUpperCase();
  const isFree = tool.pricing === "Free" || tool.pricing === "Open Source";
  return (
    <Link
      href={`/ai-directory/${tool.slug}`}
      className="group relative flex flex-col h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        {/* Avatar — neutral zinc, indigo tint on hover. Matches /tools cards. */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-semibold text-sm group-hover:bg-indigo-50 group-hover:border-indigo-200 group-hover:text-indigo-700 dark:group-hover:bg-indigo-500/10 dark:group-hover:border-indigo-500/30 dark:group-hover:text-indigo-300 transition-colors">
            {initial}
          </div>
          {tool.approved && (
            <div
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-zinc-950 flex items-center justify-center"
              title="Verified"
            >
              <BadgeCheck className="w-2.5 h-2.5 text-white" strokeWidth={3} />
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {tool.trending && (
            <Badge variant="warning" className="text-[10px] py-0">
              <TrendingUp className="w-2.5 h-2.5" />
              Trending
            </Badge>
          )}
          {tool.isNew && (
            <Badge variant="success" className="text-[10px] py-0">
              New
            </Badge>
          )}
          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>

      <h3 className="font-semibold text-[15px] text-zinc-950 dark:text-white mb-1">
        {tool.name}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3 leading-relaxed flex-1">
        {tool.tagline}
      </p>
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-900">
        <span className="text-xs text-zinc-500 dark:text-zinc-500">{tool.category}</span>
        <span
          className={`text-[10px] uppercase tracking-wider font-semibold ${
            isFree
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-zinc-500 dark:text-zinc-500"
          }`}
        >
          {tool.pricing}
        </span>
      </div>
    </Link>
  );
}

/**
 * Entry from the bulk index (public/ai-directory-index.json).
 *
 * These have no detail page — the card links straight to the tool. They are
 * unreviewed third-party listings, so the link carries rel="nofollow ugc":
 * passing ranking signal to ~19k unvetted domains is what a link farm looks
 * like, and none of these have been checked by hand.
 */
interface IndexedTool {
  name: string;
  tagline: string;
  url: string;
  category: string;
  pricing: string;
}

function IndexedToolCard({ tool }: { tool: IndexedTool }) {
  const initial = tool.name.charAt(0).toUpperCase();
  const isFree = tool.pricing === "Free" || tool.pricing === "Open Source";
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="nofollow ugc noopener"
      className="group relative flex flex-col h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-10 h-10 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-semibold text-sm group-hover:bg-indigo-50 group-hover:border-indigo-200 group-hover:text-indigo-700 dark:group-hover:bg-indigo-500/10 dark:group-hover:border-indigo-500/30 dark:group-hover:text-indigo-300 transition-colors flex-shrink-0">
          {initial}
        </div>
        <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
      <h3 className="font-semibold text-[15px] text-zinc-950 dark:text-white mb-1">
        {tool.name}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3 leading-relaxed flex-1">
        {tool.tagline}
      </p>
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-900">
        <span className="text-xs text-zinc-500 dark:text-zinc-500">
          {tool.category}
        </span>
        <span
          className={`text-[10px] uppercase tracking-wider font-semibold ${
            isFree
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-zinc-500 dark:text-zinc-500"
          }`}
        >
          {tool.pricing}
        </span>
      </div>
    </a>
  );
}

/** Wire format of public/ai-directory-index.json — positional to keep it small. */
interface DirectoryIndex {
  v: number;
  categories: string[];
  pricing: string[];
  /** [name, tagline, url, categoryIndex, pricingIndex] */
  tools: [string, string, string, number, number][];
}

const faqs = [
  {
    q: "What is the AI Directory?",
    a: "A hand-curated list of the best AI tools across content, image, video, code, and productivity. Every tool is reviewed before listing — no spam, no affiliate fluff.",
  },
  {
    q: "How do I get my tool listed?",
    a: "Hit the 'Submit your tool' button and fill in the short form. We review every submission within 7 days. Listing is completely free.",
  },
  {
    q: "What does the Verified badge mean?",
    a: "Verified tools have been reviewed by our team — we've checked the tool is live, the pricing is accurate, and the description is honest.",
  },
  {
    q: "Are the pricing details accurate?",
    a: "We update listings regularly, but pricing can change. Always confirm on the tool's own site before committing to a plan.",
  },
  {
    q: "Can I suggest edits to a listing?",
    a: "Yes — use the contact page to flag outdated info and we'll update it within a few days.",
  },
];

const reviewsRow1 = [
  { name: "Sarah K.", role: "Content Creator", avatar: "S", text: "Found three tools I now use daily. The search filters make it so much easier than scrolling through Product Hunt for hours.", stars: 5 },
  { name: "James O.", role: "YouTuber · 120k subs", avatar: "J", text: "The verified badge actually means something here. Every tool I clicked was live and exactly as described. Zero wasted clicks.", stars: 5 },
  { name: "Priya M.", role: "Social Media Manager", avatar: "P", text: "Clean, fast, no ads. Finally a place to compare AI writing tools side by side without being upsold every 10 seconds.", stars: 5 },
  { name: "Lena W.", role: "Freelance Designer", avatar: "L", text: "I bookmarked this the day I found it. The honest pros/cons on each listing saves me so much research time every week.", stars: 5 },
  { name: "Arjun S.", role: "SaaS Founder", avatar: "A", text: "Listed my own tool here and had it approved in under 48 hours. The process was smooth and the team actually responded.", stars: 5 },
];

const reviewsRow2 = [
  { name: "Marcus T.", role: "Indie Developer", avatar: "M", text: "Better than any AI tools list I've seen. No affiliate spam, no paid placements hidden behind 'featured'. Just real tools.", stars: 5 },
  { name: "Chloe B.", role: "Email Marketer", avatar: "C", text: "The pricing filters alone are worth it. I was able to find three solid free AI tools in under five minutes.", stars: 5 },
  { name: "Derek H.", role: "Startup CTO", avatar: "D", text: "Our whole team uses this as a reference. The category breakdowns are clean and the descriptions are actually accurate.", stars: 5 },
  { name: "Nina R.", role: "Brand Strategist", avatar: "N", text: "Love that every tool shows both pros AND cons. Rare to find that level of honesty in a directory. Comes back every week.", stars: 5 },
  { name: "Tomas V.", role: "Product Designer", avatar: "T", text: "Discovered Midjourney alternatives here I had never heard of. The 'similar tools' section on each page is a hidden gem.", stars: 5 },
];

export default function AIDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<"All" | AICategory>("All");
  const [selectedPricing, setSelectedPricing] = useState<"All" | AIPricing>("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const approved = useMemo(
    () => aiDirectoryTools.filter((t) => t.approved),
    []
  );

  // ── Wider index ─────────────────────────────────────────────────────────
  // ~19k imported listings live in a separate JSON served from /public, not in
  // the bundle. It is fetched only once the visitor actually searches or
  // filters — the default view is the curated set and costs no extra bytes.
  const [index, setIndex] = useState<DirectoryIndex | null>(null);
  const [indexState, setIndexState] = useState<"idle" | "loading" | "error">("idle");
  const indexRequested = useRef(false);

  const isFiltering =
    searchQuery.trim().length > 0 ||
    selectedCategory !== "All" ||
    selectedPricing !== "All";

  useEffect(() => {
    if (!isFiltering || indexRequested.current) return;
    indexRequested.current = true;
    setIndexState("loading");
    fetch("/ai-directory-index.json")
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data: DirectoryIndex) => {
        setIndex(data);
        setIndexState("idle");
      })
      .catch(() => {
        // Non-fatal: the curated results above still render.
        setIndexState("error");
      });
  }, [isFiltering]);

  const MAX_INDEX_RESULTS = 120;

  const indexResults = useMemo(() => {
    if (!index || !isFiltering) return { items: [] as IndexedTool[], total: 0 };
    const q = deferredSearch.trim().toLowerCase();
    const items: IndexedTool[] = [];
    let total = 0;
    for (const [name, tagline, url, ci, pi] of index.tools) {
      const category = index.categories[ci] ?? "";
      const pricing = index.pricing[pi] ?? "";
      if (selectedCategory !== "All" && category !== selectedCategory) continue;
      if (selectedPricing !== "All" && pricing !== selectedPricing) continue;
      if (q && !`${name} ${tagline}`.toLowerCase().includes(q)) continue;
      total++;
      // Count everything for the heading, but only build cards for the first
      // page of results — rendering thousands of nodes locks up the tab.
      if (items.length < MAX_INDEX_RESULTS) {
        items.push({ name, tagline, url, category, pricing });
      }
    }
    return { items, total };
  }, [index, isFiltering, deferredSearch, selectedCategory, selectedPricing]);
  const filtered = useMemo(() => {
    return approved.filter((tool) => {
      if (
        selectedCategory !== "All" &&
        tool.category !== selectedCategory &&
        !tool.subcategories?.includes(selectedCategory)
      ) {
        return false;
      }
      if (selectedPricing !== "All" && tool.pricing !== selectedPricing) {
        return false;
      }
      if (deferredSearch) {
        const q = deferredSearch.toLowerCase();
        const haystack = [
          tool.name,
          tool.tagline,
          tool.description,
          tool.category,
          ...(tool.tags || []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [approved, selectedCategory, selectedPricing, deferredSearch]);

  const totalTools = approved.length;
  const totalCategories = aiCategories.length;

  // Schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Tools Directory — Discover the Best AI Tools",
    description:
      "Curated directory of the best AI tools for content, image, video, code, and more.",
    url: "https://aisocialtools.co/ai-directory",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalTools,
      itemListElement: approved.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: tool.name,
          description: tool.tagline,
          url: `https://aisocialtools.co/ai-directory/${tool.slug}`,
          applicationCategory: tool.category,
          offers: {
            "@type": "Offer",
            price: tool.pricing === "Free" || tool.pricing === "Open Source" ? "0" : undefined,
            priceCurrency: "USD",
          },
        },
      })),
    },
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
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
          <div className="aurora" aria-hidden />
          <div className="absolute inset-0 bg-dot-grid-animated opacity-50" aria-hidden />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
            <Breadcrumbs center />
            <Badge variant="accent" className="mb-6 float-soft">
              <Sparkles className="w-3 h-3" />
              {totalTools}+ AI tools · Hand-curated · {totalCategories} categories
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-[1.05] mb-5 max-w-4xl mx-auto">
              The best AI tools,
              <br />
              <span className="text-zinc-500 dark:text-zinc-400">curated for creators.</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              A hand-picked directory of AI tools we actually recommend — with honest pros,
              cons, and pricing. Find the right tool fast, no fluff.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ButtonLink href="#all-tools" size="lg">
                Browse the directory
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
              <ButtonLink href="/ai-directory/submit" variant="secondary" size="lg">
                Submit your tool
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* ── Browse all tools — right after hero ── */}
        <section id="all-tools" className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <Badge variant="neutral" className="mb-3">Directory</Badge>
                <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight">
                  Browse all tools
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  {totalTools} verified tools · filter by category or pricing
                </p>
              </div>
              <Link
                href="/ai-directory/submit"
                className="self-start sm:self-end inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                + Submit a tool
              </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, tag, or use case…"
                  className="w-full pl-9 pr-3 h-11 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {(["All", ...aiCategories] as Array<"All" | AICategory>).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 h-8 text-xs font-medium rounded-lg border transition-colors ${
                      selectedCategory === cat
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mr-1">Pricing:</span>
                {pricingFilters.map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPricing(p)}
                    className={`px-3 h-7 text-xs font-medium rounded-lg border transition-colors ${
                      selectedPricing === p
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-5">
              {filtered.length} {filtered.length === 1 ? "tool" : "tools"}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {selectedPricing !== "All" && ` · ${selectedPricing}`}
              {deferredSearch && ` matching "${deferredSearch}"`}
            </p>

            {filtered.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((tool, i) => (
                  <Reveal key={tool.slug} delay={Math.min(i * 30, 250)}>
                    <ToolCard tool={tool} />
                  </Reveal>
                ))}
              </div>
            )}

            {/* ── Wider index ──────────────────────────────────────────────
                Results from the ~19k imported listings. Kept visually and
                textually separate from the reviewed set above: those carry a
                Verified badge and a detail page, these link straight out and
                have not been checked by hand. Conflating the two would make
                the Verified badge meaningless.
                Only rendered once the visitor searches or filters. */}
            {isFiltering && (
              <div className="mt-12">
                {indexState === "loading" && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-8">
                    Searching the wider index…
                  </p>
                )}

                {indexState === "error" && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-8">
                    Couldn&apos;t load the wider index. The reviewed listings
                    above are unaffected.
                  </p>
                )}

                {index && indexResults.total > 0 && (
                  <>
                    <div className="flex items-baseline justify-between gap-4 flex-wrap mb-1 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                      <h3 className="text-lg font-semibold text-zinc-950 dark:text-white tracking-tight">
                        More from the wider index
                      </h3>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {indexResults.total.toLocaleString()}{" "}
                        {indexResults.total === 1 ? "match" : "matches"}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-5">
                      Not yet reviewed — these link straight to the tool.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {indexResults.items.map((tool, i) => (
                        <IndexedToolCard key={`${tool.url}-${i}`} tool={tool} />
                      ))}
                    </div>
                    {indexResults.total > indexResults.items.length && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-5 text-center">
                        Showing the first {indexResults.items.length} of{" "}
                        {indexResults.total.toLocaleString()}. Narrow your
                        search to see fewer, more relevant results.
                      </p>
                    )}
                  </>
                )}
              </div>
            )}

            {filtered.length === 0 &&
              (!isFiltering ||
                (indexState !== "loading" && indexResults.total === 0)) && (
                <div className="text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                  <p className="text-zinc-500 dark:text-zinc-400 mb-1">No tools match those filters</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">Try a different category, pricing, or search term</p>
                </div>
              )}
          </div>
        </section>

        {/* ── User Reviews — dual marquee ── */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 overflow-hidden bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-4">
            <div className="text-center mb-10">
              <Badge variant="neutral" className="mb-3">Reviews</Badge>
              <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight">
                Loved by creators & builders
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                {reviewsRow1.length + reviewsRow2.length} reviews from real users
              </p>
            </div>
          </div>

          {/* Row 1 — scrolls left */}
          <div className="reviews-marquee-wrapper mb-4">
            <div className="flex gap-4 animate-marquee-left w-max">
              {[...reviewsRow1, ...reviewsRow1].map((r, i) => (
                <div key={i} className="w-80 flex-shrink-0 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.stars }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed flex-1">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {r.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-950 dark:text-white leading-tight">{r.name}</p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-500">{r.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="reviews-marquee-wrapper">
            <div className="flex gap-4 animate-marquee-right w-max">
              {[...reviewsRow2, ...reviewsRow2].map((r, i) => (
                <div key={i} className="w-80 flex-shrink-0 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.stars }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed flex-1">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {r.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-950 dark:text-white leading-tight">{r.name}</p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-500">{r.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* See more */}
          <div className="text-center py-10">
            <Link
              href="/ai-directory/submit"
              className="inline-flex items-center gap-2 h-10 px-5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-lg text-sm font-semibold transition-colors"
            >
              Share your experience
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="mb-8">
              <Badge variant="neutral" className="mb-3">FAQ</Badge>
              <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight">
                Frequently asked questions
              </h2>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800 border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white dark:bg-zinc-950">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    <span className="text-sm font-semibold text-zinc-950 dark:text-white">{faq.q}</span>
                    {openFaq === i
                      ? <ChevronUp className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                      : <ChevronDown className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    }
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Submit CTA ── */}
        <section className="bg-zinc-950 dark:bg-zinc-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
              Built an AI tool? List it free.
            </h2>
            <p className="text-zinc-400 mb-7 max-w-lg mx-auto text-sm leading-relaxed">
              No fee, no &quot;featured&quot; upsell, no SEO link demands. Reviewed within 7 days.
            </p>
            <Link
              href="/ai-directory/submit"
              className="inline-flex items-center gap-2 h-11 px-6 bg-white hover:bg-zinc-100 text-zinc-950 rounded-lg text-sm font-semibold transition-colors"
            >
              Submit your tool
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
