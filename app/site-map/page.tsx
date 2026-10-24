import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { getOGImageUrl } from "@/lib/og-image-generator";
import { socialTools } from "@/lib/social-tools";
import { blogPosts } from "@/lib/blog-posts";
import { directoryCollections } from "@/lib/directory-collections";
import { directoryCategories, getCategoryBySlug } from "@/lib/directory-categories";
import { toolReviews } from "@/lib/tool-reviews";
import {
  toolCategories,
  getToolsInCategory,
  isIndexableToolCategory,
} from "@/lib/tool-groups";
import { indexableCategorySlugs } from "@/lib/category-indexing";
import { aiDirectoryTools } from "@/lib/ai-directory";

/**
 * The human sitemap.
 *
 * Two jobs. For a visitor it is the one page that shows the whole site at once,
 * which a search box cannot do. For a crawler it is a second internal link to
 * every page worth indexing - and the 27 blog posts each had exactly one, which
 * is Google's cue that nobody thinks a page matters.
 *
 * It lists what is indexable and nothing else. Linking the noindex pages would
 * spend crawl budget on pages that will be dropped the moment they are read,
 * and crawl budget on this domain is scarce enough that some tool pages are
 * still unknown to Google months after launch. Every section below therefore
 * reads the same gate its XML counterpart reads, so this page cannot start
 * advertising something the sitemap has dropped.
 *
 * Plain <Link> elements throughout, server-rendered, no interactivity. A
 * crawler should not need to run anything to read it.
 */
export const revalidate = 300;

const BASE = "https://aisocialtools.co";

export const metadata: Metadata = {
  title: "Site Map — Every Page on AISocialTools",
  description:
    "The full index of AISocialTools: free browser-based tools, AI directory categories and reviews, editorial collections, and every article.",
  keywords: ["site map", "all tools", "all pages", "ai directory index"],
  openGraph: {
    title: "Site Map — Every Page on AISocialTools",
    description: "The full index of free tools, AI directory reviews, collections and articles.",
    type: "website",
    url: `${BASE}/site-map`,
    siteName: "AISocialTools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "Site Map" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Site Map — Every Page on AISocialTools",
    description: "The full index of free tools, AI directory reviews, collections and articles.",
  },
  alternates: { canonical: `${BASE}/site-map` },
  robots: { index: true, follow: true },
};

function Section({
  title,
  note,
  count,
  children,
}: {
  title: string;
  note: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="flex items-baseline gap-3 mb-2">
          <h2 className="text-2xl font-semibold text-zinc-950 dark:text-white tracking-tight">
            {title}
          </h2>
          <span className="text-sm text-zinc-400 tabular-nums">{count}</span>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl leading-relaxed">{note}</p>
        {children}
      </div>
    </section>
  );
}

function LinkList({ items }: { items: { href: string; label: string }[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2.5">
      {items.map((i) => (
        <li key={i.href}>
          <Link
            href={i.href}
            className="text-[15px] text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline underline-offset-4 transition-colors"
          >
            {i.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function SiteMapPage() {
  // Directory categories, gated exactly as the XML sitemap gates them.
  const catSlugs = await indexableCategorySlugs();
  const categories = catSlugs
    .map((slug) => getCategoryBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map((c) => ({ href: `/ai-directory/category/${c.slug}`, label: c.heading }));

  // Only reviewed tools are indexable, so only reviewed tools are listed.
  const reviewed = Object.keys(toolReviews)
    .map((slug) => {
      const t = aiDirectoryTools.find((x) => x.slug === slug);
      return { href: `/ai-directory/${slug}`, label: t?.name ?? slug };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  const collections = directoryCollections
    .map((c) => ({ href: `/ai-directory/collections/${c.slug}`, label: c.title }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const hubs = toolCategories
    .filter((c) => isIndexableToolCategory(c.slug))
    .map((c) => ({
      href: `/tools/${c.slug}`,
      label: `${c.name} (${getToolsInCategory(c.slug).length})`,
    }));

  const tools = socialTools
    .map((t) => ({ href: t.path, label: t.name }))
    .sort((a, b) => a.label.localeCompare(b.label));

  // Newest first - the one place on the site where every article is linked.
  const articles = [...blogPosts]
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .map((p) => ({ href: `/blog/${p.slug}`, label: p.title }));

  const pages = [
    { href: "/", label: "Home" },
    { href: "/tools", label: "All tools" },
    { href: "/ai-directory", label: "AI Directory" },
    { href: "/blog", label: "Blog" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ];

  const total =
    categories.length +
    reviewed.length +
    collections.length +
    hubs.length +
    tools.length +
    articles.length +
    pages.length;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
          <div className="aurora" aria-hidden />
          <div className="absolute inset-0 bg-dot-grid-animated opacity-50" aria-hidden />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <Breadcrumbs embedded schema={false} />
            <Badge variant="accent" className="mb-5">
              Site Map
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
              Every page, in one place
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              {total} pages. Tools you can use without an account, AI tools we have actually
              opened and written about, and everything we have published.
            </p>
          </div>
        </section>

        <Section
          title="Free tools"
          count={tools.length}
          note="Every tool runs in your browser. No account, no watermark, no upload."
        >
          <LinkList items={tools} />
        </Section>

        <Section
          title="Tool categories"
          count={hubs.length}
          note="Grouped by platform and by job. The count beside each is how many tools it holds."
        >
          <LinkList items={hubs} />
        </Section>

        <Section
          title="AI directory categories"
          count={categories.length}
          note="Each category page explains what actually separates good tools from bad in that space, then lists what we have."
        >
          <LinkList items={categories} />
        </Section>

        <Section
          title="Collections"
          count={collections.length}
          note="Hand-picked lists where every entry carries a written reason for being on it."
        >
          <LinkList items={collections} />
        </Section>

        <Section
          title="Reviewed AI tools"
          count={reviewed.length}
          note="Tools we opened ourselves and wrote about, including what each one is bad at. Listings without a review are not indexed and are not listed here."
        >
          <LinkList items={reviewed} />
        </Section>

        <Section title="Articles" count={articles.length} note="Newest first.">
          <LinkList items={articles} />
        </Section>

        <Section title="Pages" count={pages.length} note="Everything else.">
          <LinkList items={pages} />
        </Section>
      </main>
      <Footer />
    </div>
  );
}
