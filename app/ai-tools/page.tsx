import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { socialTools } from "@/lib/social-tools";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { CountUp } from "@/components/animations/CountUp";
import type { Metadata } from "next";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  PenTool,
  Wand2,
  BarChart2,
  Globe,
  Instagram,
  Twitter,
  Layers,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Tools — Free AI-Powered Social Media Tools 2026",
  description:
    "AI-powered tools for content, design, analytics, and SEO. Free, browser-based, no signup. For creators and marketers.",
  keywords: [
    "AI tools",
    "free AI tools online",
    "AI social media tools",
    "AI content generator",
    "AI tweet generator",
    "AI caption generator",
    "AI hashtag generator",
    "free AI tools no signup",
    "AI tools 2026",
    "best free AI tools",
  ],
  openGraph: {
    title: "AI Tools — Free AI-Powered Social Media Tools 2026",
    description: "AI-powered tools for content, design, analytics, and SEO. No signup.",
    type: "website",
    url: "https://aisocialtools.co/ai-tools",
    siteName: "Social Media Tools",
    images: [
      {
        url: "https://aisocialtools.co/og-default.png",
        width: 1200,
        height: 630,
        alt: "AI Tools — Free AI-Powered Social Media Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools — Free AI-Powered Social Media Tools 2026",
    description: "AI tools by category. 100% free, no signup required.",
    images: ["https://aisocialtools.co/og-default.png"],
  },
  alternates: { canonical: "https://aisocialtools.co/ai-tools" },
  robots: { index: true, follow: true },
};

type CategoryConfig = {
  label: string;
  tagline: string;
  Icon: LucideIcon;
};

const CATS: Record<string, CategoryConfig> = {
  Content: {
    label: "Content generators",
    tagline: "AI-written captions, bios, hooks, hashtags, and usernames.",
    Icon: PenTool,
  },
  Twitter: {
    label: "Twitter / X tools",
    tagline: "Tweet drafts, threads, and revenue forecasts powered by AI.",
    Icon: Twitter,
  },
  Instagram: {
    label: "Instagram tools",
    tagline: "AI for posts, captions, engagement analysis, and stylish fonts.",
    Icon: Instagram,
  },
  Design: {
    label: "Design tools",
    tagline: "Image upscaler, SVG patterns, and other AI-assisted visuals.",
    Icon: Wand2,
  },
  SEO: {
    label: "SEO tools",
    tagline: "AI-generated Open Graph tags, meta tags, and on-page SEO.",
    Icon: Globe,
  },
  Analytics: {
    label: "Analytics tools",
    tagline: "AI-driven engagement, revenue, and KPI calculators.",
    Icon: BarChart2,
  },
};

const FALLBACK: CategoryConfig = {
  label: "AI tools",
  tagline: "Free AI tools.",
  Icon: Layers,
};

// Display order
const CATEGORY_ORDER = ["Content", "Instagram", "Twitter", "Design", "SEO", "Analytics"];

export default function AIToolsPage() {
  const aiTools = socialTools.filter((t) => t.isAI);
  const presentCategories = Array.from(new Set(aiTools.map((t) => t.category)));
  const categories = [
    ...CATEGORY_ORDER.filter((c) => presentCategories.includes(c)),
    ...presentCategories.filter((c) => !CATEGORY_ORDER.includes(c)).sort(),
  ];

  const toolsByCategory = categories.reduce<Record<string, typeof socialTools>>(
    (acc, cat) => {
      acc[cat] = aiTools.filter((t) => t.category === cat);
      return acc;
    },
    {}
  );

  const totalTools = aiTools.length;
  const totalCategories = categories.length;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Tools — Free AI-Powered Social Media Tools",
    description: "AI-powered tools for content, design, analytics, and SEO.",
    url: "https://aisocialtools.co/ai-tools",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalTools,
      itemListElement: aiTools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "WebApplication",
          name: tool.name,
          description: tool.description,
          url: `https://aisocialtools.co${tool.path}`,
          applicationCategory: "SocialMediaApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aisocialtools.co",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Tools",
        item: "https://aisocialtools.co/ai-tools",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are these AI tools really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, every AI tool here is 100% free. No paid tier, no credit card prompt, no email gate. They run in your browser and use free model APIs underneath.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to sign up to use AI tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No signup, no email, no account. Visit any AI tool page and start using it immediately.",
        },
      },
      {
        "@type": "Question",
        name: "Which AI models power these tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Different tools use different models. The image upscaler uses Real-ESRGAN, the AI image generator uses Flux and Stable Diffusion, and most text generators use GPT-class models. Each tool's page lists the exact backend.",
        },
      },
      {
        "@type": "Question",
        name: "Is my content kept private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We don't store the prompts you submit or the outputs you generate. Most tools don't even send anything to a server beyond the model API call.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use AI-generated content commercially?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. There are no licensing fees or attribution requirements on outputs. Use them in your client work, products, or marketing freely.",
        },
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="flex-1">
        <Breadcrumbs />
        {/* ============================================================
             HERO — same aurora + dot-grid + two-tone heading pattern
             ============================================================ */}
        <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
          <div className="aurora" aria-hidden />
          <div className="absolute inset-0 bg-dot-grid-animated opacity-50" aria-hidden />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 text-center">
            <Badge variant="accent" className="mb-6 float-soft">
              <Sparkles className="w-3 h-3" />
              {totalTools}+ AI tools · No account needed
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-[1.05] mb-6 max-w-4xl mx-auto">
              AI-powered tools,
              <br />
              <span className="text-zinc-500 dark:text-zinc-400">without the wait.</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Captions, hashtags, headlines, art, and analytics — generated in seconds.
              Browser-based, no signup, no tracking.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ButtonLink href="#categories" size="lg">
                Browse categories
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
              <ButtonLink href="/tools" variant="secondary" size="lg">
                See all tools
              </ButtonLink>
            </div>
          </div>
        </section>

        {/* ============================================================
             STATS — same divide-x pattern as landing page
             ============================================================ */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-3 divide-x divide-zinc-200 dark:divide-zinc-800">
              <Reveal delay={0} className="text-center px-4">
                <div className="text-4xl sm:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight tabular-nums">
                  <CountUp end={totalTools} suffix="+" />
                </div>
                <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  AI tools
                </div>
              </Reveal>
              <Reveal delay={80} className="text-center px-4">
                <div className="text-4xl sm:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight tabular-nums">
                  <CountUp end={totalCategories} />
                </div>
                <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  Categories
                </div>
              </Reveal>
              <Reveal delay={160} className="text-center px-4">
                <div className="text-4xl sm:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight">
                  Free
                </div>
                <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  Always
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================================================
             CATEGORIES — one section per category, same rhythm as
             landing-page sections (badge + h2 + grid of tool cards)
             ============================================================ */}
        <div id="categories">
          {categories.map((cat, sectionIndex) => {
            const tools = toolsByCategory[cat];
            const cfg = CATS[cat] ?? { ...FALLBACK, label: `${cat} tools` };
            const Icon = cfg.Icon;
            return (
              <section
                key={cat}
                className="border-b border-zinc-200 dark:border-zinc-800"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                  {/* Section header — same pattern as /landing /about */}
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                    <div className="max-w-2xl">
                      <Badge variant="neutral" className="mb-4">
                        <Icon className="w-3 h-3" />
                        {String(sectionIndex + 1).padStart(2, "0")} · {cat}
                      </Badge>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-3">
                        {cfg.label}
                      </h2>
                      <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {cfg.tagline}
                      </p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 self-start sm:self-end whitespace-nowrap">
                      {tools.length} tool{tools.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Tool grid — identical to /tools page card design */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {tools.map((tool, i) => {
                      const ToolIcon = tool.icon;
                      return (
                        <Reveal key={tool.id} delay={Math.min(i * 50, 300)}>
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
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3">
                              {tool.description}
                            </p>
                            <div className="text-xs text-zinc-500 dark:text-zinc-500">
                              {tool.category}
                            </div>
                          </Link>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* ============================================================
             CTA — same dark block pattern as landing page
             ============================================================ */}
        <section className="bg-zinc-950 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-5 max-w-3xl mx-auto">
              Got an AI tool idea?
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Most existing tools came from user requests. Send me one and it might ship
              next month.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-white text-zinc-950 hover:bg-zinc-200 rounded-md text-base font-medium transition-colors"
              >
                Suggest a tool
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-transparent text-white border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900 rounded-md text-base font-medium transition-colors"
              >
                Browse all tools
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
