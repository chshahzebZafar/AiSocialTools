import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { toolCategories, categoryToolCount } from "@/lib/tool-groups";
import { socialTools } from "@/lib/social-tools";
import { ArrowUpRight, ArrowRight, Sparkles, Search } from "lucide-react";

const totalCategories = toolCategories.length;
const totalTools = socialTools.length;

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "All Tools — Categories",
  description:
    "Free, browser-based social media tools organized by platform and function. Pick a category to browse.",
  url: "https://aisocialtools.co/tools",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: totalCategories,
    itemListElement: toolCategories.map((cat, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CollectionPage",
        name: cat.name,
        description: cat.description,
        url: `https://aisocialtools.co/tools/${cat.slug}`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
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
              <Sparkles className="w-3 h-3" />
              {totalTools}+ tools across {totalCategories} categories
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-[1.05] mb-5 max-w-4xl mx-auto">
              Pick a category.
              <br />
              <span className="text-zinc-500 dark:text-zinc-400">Get the right tool.</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Free, browser-based tools organized by platform and by what you&apos;re trying to do.
              No signup, no tracking, no upsell.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ButtonLink href="#categories" size="lg">
                Browse categories
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
              <ButtonLink href="/tools/social-media" variant="secondary" size="lg">
                Browse all tools
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* Category cards */}
        <section id="categories" className="border-b border-zinc-200 dark:border-zinc-800 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="mb-12 max-w-2xl">
              <Badge variant="neutral" className="mb-4">Categories</Badge>
              <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
                Browse tools by category.
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Pick a platform — Instagram, YouTube, TikTok, and more — or a function like
                Content, Image &amp; Design, or Analytics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {toolCategories.map((cat, i) => {
                const Icon = cat.icon;
                const count = categoryToolCount(cat.slug);
                return (
                  <Reveal key={cat.slug} delay={Math.min(i * 50, 400)}>
                    <Link
                      href={`/tools/${cat.slug}`}
                      className="group relative block h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-7 sm:p-8 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-200 dark:group-hover:bg-indigo-500/10 dark:group-hover:border-indigo-500/30 transition-colors">
                          <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" strokeWidth={1.75} />
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="neutral" className="text-[10px] py-0">
                            {count} {count === 1 ? "tool" : "tools"}
                          </Badge>
                          <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-2">
                        {cat.name}
                      </h3>
                      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {cat.description}
                      </p>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Popular tools */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div className="max-w-2xl">
                <Badge variant="neutral" className="mb-4">Popular</Badge>
                <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-3">
                  Most-used tools.
                </h2>
                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Quick access to the tools people open most. Or browse all tools for filters and search.
                </p>
              </div>
              <Link
                href="/tools/social-media"
                className="text-sm font-medium text-zinc-950 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1 self-start sm:self-end"
              >
                <Search className="w-4 h-4" />
                Browse &amp; search all
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
              Need a tool we don&apos;t have?
            </h2>
            <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
              We add new tools based on user demand. Tell us what you&apos;re building.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-white text-zinc-950 hover:bg-zinc-200 rounded-md text-base font-medium transition-colors"
            >
              Suggest a tool
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
