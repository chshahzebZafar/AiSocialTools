import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { toolCategoryHubs } from "@/lib/tool-categories";
import { socialTools } from "@/lib/social-tools";
import { ArrowUpRight, ArrowRight, Clock, Sparkles, Search } from "lucide-react";

const totalCategories = toolCategoryHubs.length;
const liveCategories = toolCategoryHubs.filter((c) => c.status === "live").length;
const totalLiveTools = toolCategoryHubs
  .filter((c) => c.status === "live")
  .reduce((sum, c) => sum + c.toolCount, 0);

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "All Tools — Categories",
  description:
    "Top-level categories of free, browser-based tools. Pick a category to browse.",
  url: "https://aisocialtools.co/tools",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: totalCategories,
    itemListElement: toolCategoryHubs.map((cat, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CollectionPage",
        name: cat.name,
        description: cat.tagline,
        url: `https://aisocialtools.co${cat.url}`,
      },
    })),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://aisocialtools.co" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://aisocialtools.co/tools" },
  ],
};

export default function ToolsHubPage() {
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
              {totalLiveTools}+ tools across {liveCategories} categor
              {liveCategories === 1 ? "y" : "ies"}
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-[1.05] mb-5 max-w-4xl mx-auto">
              Pick a category.
              <br />
              <span className="text-zinc-500 dark:text-zinc-400">Get the right tool.</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Free, browser-based tools organized by what you&apos;re trying to do. No signup,
              no tracking, no upsell.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ButtonLink href="#categories" size="lg">
                Browse categories
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Suggest a category
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* Category cards */}
        <section
          id="categories"
          className="border-b border-zinc-200 dark:border-zinc-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="mb-12 max-w-2xl">
              <Badge variant="neutral" className="mb-4">
                Categories
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
                Find your tool by category.
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Each category is its own focused workspace with a sidebar and filters. Click
                a card to dive in.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {toolCategoryHubs.map((cat, i) => {
                const Icon = cat.icon;
                const isLive = cat.status === "live";
                return (
                  <Reveal key={cat.slug} delay={i * 80}>
                    <Link
                      href={cat.url}
                      className="group relative block h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-7 sm:p-8 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-200 dark:group-hover:bg-indigo-500/10 dark:group-hover:border-indigo-500/30 transition-colors">
                          <Icon
                            className="w-5 h-5 text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                            strokeWidth={1.75}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          {isLive ? (
                            <Badge variant="success" className="text-[10px] py-0">
                              {cat.toolCount} tools
                            </Badge>
                          ) : (
                            <Badge variant="warning" className="text-[10px] py-0">
                              <Clock className="w-2.5 h-2.5" />
                              Coming soon
                            </Badge>
                          )}
                          <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-2">
                        {cat.name}
                      </h3>
                      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-5 leading-relaxed">
                        {cat.description}
                      </p>

                      {cat.highlights && cat.highlights.length > 0 && (
                        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900">
                          <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
                            {cat.highlights.map((h) => (
                              <li
                                key={h}
                                className="text-xs text-zinc-500 dark:text-zinc-500 inline-flex items-center gap-1.5"
                              >
                                <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quick popular tools — exposes social tools right on the hub */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div className="max-w-2xl">
                <Badge variant="neutral" className="mb-4">
                  Popular
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-3">
                  Most-used tools.
                </h2>
                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Quick access to the tools people open most. Or browse the full category
                  for filters and search.
                </p>
              </div>
              <Link
                href="/tools/social-media"
                className="text-sm font-medium text-zinc-950 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1 self-start sm:self-end"
              >
                <Search className="w-4 h-4" />
                Browse & search all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {socialTools.slice(0, 6).map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <Reveal key={tool.id} delay={Math.min(i * 40, 240)}>
                    <Link
                      href={tool.path}
                      className="group relative block h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="w-9 h-9 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-200 dark:group-hover:bg-indigo-500/10 dark:group-hover:border-indigo-500/30 transition-colors">
                          <Icon className="w-4 h-4 text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <h3 className="font-semibold text-[15px] text-zinc-950 dark:text-white mb-1">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                        {tool.description}
                      </p>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-zinc-950 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4 max-w-2xl mx-auto">
              Need a category we don&apos;t have?
            </h2>
            <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
              We add new categories based on user demand. Tell us what you&apos;re building.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-white text-zinc-950 hover:bg-zinc-200 rounded-md text-base font-medium transition-colors"
            >
              Suggest a category
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
