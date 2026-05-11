import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogSlider from "@/components/BlogSlider";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { WordRotator } from "@/components/animations/WordRotator";
import { CountUp } from "@/components/animations/CountUp";
import { Reveal } from "@/components/animations/Reveal";
import { PlatformMarquee } from "@/components/animations/PlatformMarquee";
import { socialTools } from "@/lib/social-tools";
import { aiDirectoryTools } from "@/lib/ai-directory";
import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";
import { getSiteLinksSearchBoxSchema, getAuthorSchema } from "@/lib/enhanced-schemas";
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
  BadgeCheck,
  Shield,
  Heart,
  Lock,
  Layers,
  Infinity as InfinityIcon,
  Coffee,
  Github,
  Twitter,
  Linkedin,
  Globe,
  QrCode,
} from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Best Free Social Media Tools Online - No Signup Required 2026",
  description:
    "40+ free social media tools — tweets, Instagram posts, YouTube thumbnails, hashtags, and more. All run in your browser. No signup, no tracking.",
  keywords: [
    "free social media tools",
    "social media tools online",
    "best social media tools",
    "free online tools",
    "social media management tools",
    "content creation tools",
    "tweet generator free",
    "instagram tools online",
    "youtube thumbnail downloader free",
    "hashtag generator online",
    "social media analytics tools",
    "free tools no signup",
    "online social media tools",
    "social media content generator",
    "free instagram tools",
    "twitter tools free",
    "social media toolkit",
    "content creator tools",
    "social media marketing tools",
    "free tools for creators",
  ],
  openGraph: {
    title: "Free Social Media Tools - Create & Manage Content",
    description:
      "Powerful free social media tools for content creation, management, and optimization. 100% free, no signup required.",
    type: "website",
    url: "https://aisocialtools.co",
    siteName: "Social Media Tools",
    images: [
      {
        url: getOGImageUrl("home"),
        width: 1200,
        height: 630,
        alt: "Social Media Tools - Free Online Tools for Social Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Social Media Tools - Create & Manage Content",
    description:
      "Powerful free social media tools for content creation, management, and optimization. 100% free, no signup required.",
    images: [getOGImageUrl("home")],
  },
  alternates: {
    canonical: "https://aisocialtools.co",
  },
  robots: { index: true, follow: true },
};

export default function Home() {
  const featuredTools = socialTools.slice(0, 9);
  const totalTools = socialTools.length;
  const featuredAITools = aiDirectoryTools.filter((t) => t.approved && t.featured).slice(0, 4);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Social Media Tools",
    url: "https://aisocialtools.co",
    logo: {
      "@type": "ImageObject",
      url: "https://aisocialtools.co/og-default.png",
      width: 1200,
      height: 630,
    },
    description: "Free social media tools for content creation, management, and optimization",
    sameAs: [
      "https://github.com/chshahzebZafar/",
      "https://x.com/SHAHZEBZAFAR99",
      "https://www.linkedin.com/in/shahzaib-zafer/",
      "https://shahzebzafar.netlify.app/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: "https://aisocialtools.co/contact",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://aisocialtools.co/tools?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const websiteSchema = getSiteLinksSearchBoxSchema();
  const authorSchema = getAuthorSchema();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are the best free social media tools online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The best free social media tools online include tweet generators, Instagram post generators, YouTube thumbnail downloaders, hashtag generators, bio generators, and content calendars. All our tools are 100% free with no signup required, making them perfect for content creators, marketers, and social media managers.",
        },
      },
      {
        "@type": "Question",
        name: "Are these social media tools really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all our social media tools are 100% free to use. There are no hidden costs, no credit card required, and no signup necessary. You can use all tools immediately without any restrictions.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to create an account to use these tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, you don't need to create an account or sign up to use any of our tools. All tools work directly in your browser without requiring any registration or login.",
        },
      },
      {
        "@type": "Question",
        name: "Is my data safe when using these tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, your privacy is our priority. All tools work entirely in your browser without sending your data to our servers.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use these tools for commercial purposes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can use all our tools for both personal and commercial purposes. There are no restrictions on how you use the content generated by our tools.",
        },
      },
    ],
  };

  const features = [
    {
      icon: Zap,
      title: "Instant results",
      description:
        "All tools run client-side. No queues, no rate limits, no waiting on a server.",
    },
    {
      icon: Lock,
      title: "Private by default",
      description:
        "Your content never leaves your browser. We don't collect, store, or analyze it.",
    },
    {
      icon: Heart,
      title: "Genuinely free",
      description:
        "No paid tier, no credit card, no email. Everything works on the first visit.",
    },
    {
      icon: Layers,
      title: "Built for creators",
      description:
        "Each tool focuses on a single job and does it well. No bloat, no upsells.",
    },
    {
      icon: Shield,
      title: "Open & verifiable",
      description:
        "Source-available code, transparent privacy, no hidden tracking pixels.",
    },
    {
      icon: InfinityIcon,
      title: "Unlimited use",
      description:
        "Generate as many tweets, hashtags, or thumbnails as you want. Forever.",
    },
  ];

  const stats: Array<{
    value: string;
    label: string;
    countTo?: number;
    suffix?: string;
  }> = [
    { value: `${totalTools}+`, label: "Free tools", countTo: totalTools, suffix: "+" },
    { value: "0", label: "Sign-ups required", countTo: 0 },
    { value: "100%", label: "Browser-based", countTo: 100, suffix: "%" },
    { value: "∞", label: "Uses per day" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      <Header />

      <main className="flex-1">
        {/* ==========================================================
             HERO — animated aurora + rotating word + dot grid
             ========================================================== */}
        <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
          <div className="aurora" aria-hidden />
          <div className="absolute inset-0 bg-dot-grid-animated opacity-50" aria-hidden />
          <div
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none"
            aria-hidden
          />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 text-center">
            <Badge variant="accent" className="mb-6 float-soft">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
              </span>
              {totalTools}+ tools · No account needed
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-[1.05] mb-6 max-w-4xl mx-auto">
              Free social media tools,
              <br />
              <span className="text-zinc-500 dark:text-zinc-400">without the </span>
              <WordRotator
                words={["bloat.", "paywalls.", "signups.", "catch."]}
                className="text-indigo-600 dark:text-indigo-400"
              />
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Generate tweets, download thumbnails, count hashtags, compress images, and{" "}
              {totalTools - 4}+ more — all in your browser. No signup. No watermarks. No tracking.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ButtonLink href="/tools" size="lg">
                Browse all tools
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
              <ButtonLink href="#tools" variant="secondary" size="lg">
                See popular tools
              </ButtonLink>
            </div>

            {/* Quick proof line */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-zinc-500 dark:text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500" /> No signup
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500" /> No tracking
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500" /> Works offline
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500" /> Mobile-friendly
              </span>
            </div>
          </div>
        </section>

        {/* ==========================================================
             PLATFORM MARQUEE — scrolling strip
             ========================================================== */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 overflow-hidden">
          <div className="max-w-7xl mx-auto py-6">
            <div className="text-center mb-4">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500 uppercase tracking-[0.2em]">
                Works across every platform
              </span>
            </div>
            <PlatformMarquee />
          </div>
        </section>

        {/* ==========================================================
             STATS — count up on scroll
             ========================================================== */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-200 dark:divide-zinc-800">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 80} className="text-center px-4">
                  <div className="text-4xl sm:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight tabular-nums">
                    {typeof stat.countTo === "number" ? (
                      <CountUp end={stat.countTo} suffix={stat.suffix ?? ""} />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    {stat.label}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================
             FEATURES — quiet cards, no colored icon backgrounds
             ========================================================== */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <div className="max-w-2xl mb-12 sm:mb-16">
              <Badge variant="neutral" className="mb-4">
                Why
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
                Tools should help, not interrupt.
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Most &ldquo;free&rdquo; tools paywall the useful features, watermark your output, or
                demand an email before they&apos;ll do anything. We don&apos;t.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              {features.map((f, i) => (
                <Reveal
                  key={f.title}
                  delay={i * 60}
                  className="bg-white dark:bg-zinc-950 p-8 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-4 group-hover:bg-indigo-50 group-hover:border-indigo-200 dark:group-hover:bg-indigo-500/10 dark:group-hover:border-indigo-500/30 transition-colors">
                    <f.icon className="w-4 h-4 text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-950 dark:text-white mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {f.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================
             FEATURED TOOLS — clean grid, indigo on hover only
             ========================================================== */}
        <section id="tools" className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div className="max-w-2xl">
                <Badge variant="neutral" className="mb-4">
                  Tools
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
                  Pick a tool. Get it done.
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Each one focuses on a single job. No tabs to discover, no settings to learn.
                </p>
              </div>
              <Link
                href="/tools"
                className="text-sm font-medium text-zinc-950 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1 self-start sm:self-end"
              >
                View all {totalTools} tools
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {featuredTools.map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <Reveal key={tool.id} delay={i * 50}>
                    <Link
                      href={tool.path}
                      className="group relative block h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="w-9 h-9 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-indigo-50 group-hover:border-indigo-200 dark:group-hover:bg-indigo-500/10 dark:group-hover:border-indigo-500/30 transition-colors">
                          <Icon className="w-4 h-4 text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
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

        {/* ==========================================================
             AI DIRECTORY HIGHLIGHT
             ========================================================== */}
        <section className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div className="max-w-2xl">
                <Badge variant="accent" className="mb-4">
                  <BadgeCheck className="w-3 h-3" />
                  AI Directory
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-3">
                  Discover the best AI tools
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Hand-curated, verified AI tools with honest pros, cons, and pricing. No fluff.
                </p>
              </div>
              <Link
                href="/ai-directory"
                className="text-sm font-medium text-zinc-950 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-flex items-center gap-1 self-start sm:self-end shrink-0"
              >
                Browse all tools
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredAITools.map((tool, i) => (
                <Reveal key={tool.slug} delay={i * 60}>
                  <Link
                    href={`/ai-directory/${tool.slug}`}
                    className="group relative flex flex-col h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:border-indigo-200 dark:hover:border-indigo-500/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
                          {tool.name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-white dark:border-zinc-950 flex items-center justify-center">
                          <BadgeCheck className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mt-1" />
                    </div>
                    <h3 className="font-semibold text-[15px] text-zinc-950 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed flex-1">
                      {tool.tagline}
                    </p>
                    <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800">
                      <span className="text-xs text-zinc-400">{tool.category}</span>
                      <span className={`text-[10px] uppercase tracking-wider font-bold ${
                        tool.pricing === "Free" || tool.pricing === "Open Source"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-zinc-400"
                      }`}>{tool.pricing}</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================
             BLOG SLIDER
             ========================================================== */}
        <BlogSlider />

        {/* ==========================================================
             CTA — confident dark block, indigo accent
             ========================================================== */}
        <section className="bg-zinc-950 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-5 max-w-3xl mx-auto">
              Stop paying for tools you only use once.
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              {totalTools}+ free social media tools, ready when you need them. No account,
              no subscription, no catch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-white text-zinc-950 hover:bg-zinc-200 rounded-md text-base font-medium transition-colors"
              >
                Browse all tools
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-transparent text-white border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900 rounded-md text-base font-medium transition-colors"
              >
                How it works
              </Link>
            </div>
          </div>
        </section>

        {/* ==========================================================
             SUPPORT THE AUTHOR — quiet, elegant, not desperate
             ========================================================== */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-7">
                <Badge variant="neutral" className="mb-4">
                  Built by one person
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-5">
                  If these tools save you time, consider buying me a coffee.
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                  This site is built and maintained by{" "}
                  <a
                    href="https://shahzebzafar.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-950 dark:text-white font-medium underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-indigo-500"
                  >
                    Shahzeb Zafar
                  </a>
                  . There are no ads, no tracking, and no premium tier. Hosting and domain
                  fees come out of pocket. If a tool here saved you 30 minutes, that&apos;s
                  worth a coffee.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <a
                    href="https://buymeacoffee.com/shahzebzafar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-11 px-5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-md text-sm font-medium transition-colors"
                  >
                    <Coffee className="w-4 h-4" />
                    Buy me a coffee
                  </a>
                  <a
                    href="mailto:shahzaibzafar093@gmail.com"
                    className="inline-flex items-center gap-2 h-11 px-5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-md text-sm font-medium transition-colors"
                  >
                    Get in touch
                  </a>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <a
                    href="https://github.com/chshahzebZafar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="https://x.com/SHAHZEBZAFAR99"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </a>
                  <a
                    href="https://www.linkedin.com/in/shahzaib-zafer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href="https://shahzebzafar.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    Portfolio
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-zinc-200 lg:dark:border-zinc-800">
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 inline-flex items-center gap-2">
                  <QrCode className="w-4 h-4" />
                  Or scan to support
                </div>
                <div className="inline-block bg-white dark:bg-zinc-100 rounded-lg p-4 border border-zinc-200 dark:border-zinc-300">
                  <Image
                    src="/qr-code.png"
                    alt="Support QR Code"
                    width={200}
                    height={200}
                    className="object-contain rounded-md"
                  />
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-4 max-w-xs">
                  Works with any QR-capable payment app. Donations are completely optional —
                  the tools stay free either way.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
