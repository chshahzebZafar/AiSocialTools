import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import {
  toolCategories,
  getCategoryBySlug,
  getToolsInCategory,
} from "@/lib/tool-groups";

export const dynamicParams = false;

export function generateStaticParams() {
  return toolCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  const count = getToolsInCategory(category).length;
  const url = `https://aisocialtools.co/tools/${category}`;
  const title = `${cat.name} — ${count} Free Online Tools 2026`;
  return {
    title,
    description: cat.description,
    keywords: [
      `${cat.shortName.toLowerCase()} tools`,
      `free ${cat.shortName.toLowerCase()} tools`,
      `${cat.shortName.toLowerCase()} tools online`,
      "free social media tools",
      "no signup tools",
    ],
    alternates: { canonical: url },
    openGraph: { title, description: cat.description, url, type: "website", siteName: "AISocialTools" },
    twitter: { card: "summary_large_image", title, description: cat.description },
    robots: { index: true, follow: true },
  };
}

export default async function ToolCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const tools = getToolsInCategory(category);
  const Icon = cat.icon;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: cat.name,
    description: cat.description,
    url: `https://aisocialtools.co/tools/${category}`,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      url: `https://aisocialtools.co${tool.path}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aisocialtools.co" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://aisocialtools.co/tools" },
      { "@type": "ListItem", position: 3, name: cat.shortName, item: `https://aisocialtools.co/tools/${category}` },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
          <div className="aurora" aria-hidden />
          <div className="absolute inset-0 bg-dot-grid-animated opacity-50" aria-hidden />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
            <Breadcrumbs center />
            <Badge variant="accent" className="mb-6 float-soft">
              <Icon className="w-3 h-3" />
              {cat.shortName} · {tools.length} {tools.length === 1 ? "tool" : "tools"}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-[1.05] mb-5 max-w-3xl mx-auto">
              {cat.name}
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {cat.description} Free, browser-based, and no signup required.
            </p>
          </div>
        </section>

        {/* Tools grid */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
            {tools.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {tools.map((tool, i) => {
                  const ToolIcon = tool.icon;
                  return (
                    <Reveal key={tool.id} delay={Math.min(i * 30, 400)}>
                      <Link
                        href={tool.path}
                        className="group relative block h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="w-9 h-9 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-200 dark:group-hover:bg-indigo-500/10 dark:group-hover:border-indigo-500/30 transition-colors">
                            <ToolIcon className="w-4 h-4 text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                          </div>
                          <div className="flex items-center gap-1.5">
                            {tool.isNew && (
                              <Badge variant="success" className="text-[10px] py-0">New</Badge>
                            )}
                            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          </div>
                        </div>
                        <h2 className="font-semibold text-[15px] text-zinc-950 dark:text-white mb-1">
                          {tool.name}
                        </h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                          {tool.description}
                        </p>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
                <p className="text-zinc-500 dark:text-zinc-400 mb-2">No tools here yet</p>
                <p className="text-sm text-zinc-400 dark:text-zinc-500">More {cat.shortName} tools are on the way.</p>
              </div>
            )}

            {/* Footer nav */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/tools"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                All categories
              </Link>
              <Link
                href="/tools/social-media"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-950 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Search className="w-4 h-4" />
                Browse &amp; search all tools
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
