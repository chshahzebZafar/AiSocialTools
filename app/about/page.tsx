import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "About — Free Social Media Tools",
  description:
    "Learn about Social Tools — free, browser-based tools for content creators and marketers. No signup, no tracking, no premium tier.",
  keywords: ["about social media tools", "free tools", "social media management", "content creation"],
  openGraph: {
    title: "About — Free Social Media Tools",
    description: "Free, browser-based tools for content creators and marketers. No signup, no tracking.",
    type: "website",
    url: "https://aisocialtools.co/about",
    siteName: "Social Media Tools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "About Us" }],
  },
  alternates: { canonical: "https://aisocialtools.co/about" },
};

const principles = [
  {
    title: "Free, forever.",
    body: "Every tool, every feature, every use. No premium tier, no credit card prompt at the end of the workflow.",
  },
  {
    title: "No signup, ever.",
    body: "You arrive on a tool page and start using it. There's no email gate, no auth wall, no \"verify your account.\"",
  },
  {
    title: "Your content stays yours.",
    body: "Tools run in your browser. We don't upload your text or images to a server. We don't analyze, store, or sell anything.",
  },
  {
    title: "One job per tool.",
    body: "We don't bolt features onto tools. If you need something different, there's a different tool — or there will be soon.",
  },
];

const toolCategories = [
  {
    title: "Generation",
    items: ["Tweet generator", "Instagram captions", "TikTok hooks", "Bio generator", "Username ideas"],
  },
  {
    title: "Media",
    items: ["YouTube thumbnails", "Image resize/compress", "Video to GIF", "QR codes", "Favicons"],
  },
  {
    title: "Strategy",
    items: ["Engagement calculator", "Best time to post", "Analytics calculator", "Content calendar"],
  },
  {
    title: "Utilities",
    items: ["Hashtag tools", "Character counter", "Open Graph generator", "PDF tools", "Emoji picker"],
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://aisocialtools.co" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://aisocialtools.co/about" },
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About — Free Social Media Tools",
  description: "Free, browser-based tools for content creators and marketers. No signup, no tracking.",
  url: "https://aisocialtools.co/about",
  mainEntity: {
    "@type": "Organization",
    name: "Social Tools",
    url: "https://aisocialtools.co",
    founder: {
      "@type": "Person",
      name: "Shahzeb Zafar",
    },
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumbs />

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
          <div className="aurora" aria-hidden />
          <div className="absolute inset-0 bg-dot-grid-animated opacity-50" aria-hidden />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <Badge variant="accent" className="mb-5">
              About
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-[1.05] mb-5">
              Free tools for people who
              <br />
              <span className="text-zinc-500 dark:text-zinc-400">actually create.</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              Most "free" tools are funnel pages — useful for 30 seconds, then a paywall. We
              built the opposite: 40+ tools that just work, in your browser, on the first
              visit.
            </p>
          </div>
        </section>

        {/* Principles */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="mb-12 max-w-2xl">
              <Badge variant="neutral" className="mb-4">
                Principles
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
                What we won&apos;t do.
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                The constraints below are deliberate. They&apos;re what keeps the site fast,
                trustworthy, and worth bookmarking.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              {principles.map((p) => (
                <div
                  key={p.title}
                  className="bg-white dark:bg-zinc-950 p-7 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <h3 className="text-base font-semibold text-zinc-950 dark:text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's inside */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="mb-12 max-w-2xl">
              <Badge variant="neutral" className="mb-4">
                Tools
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
                Forty-plus tools, one site.
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Organized into four categories — pick what you need, ignore the rest.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {toolCategories.map((cat) => (
                <div key={cat.title}>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 mb-4">
                    {cat.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
                      >
                        <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" strokeWidth={2.5} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <ButtonLink href="/tools" variant="primary" size="lg">
              Browse all tools
              <ArrowRight className="w-4 h-4" />
            </ButtonLink>
          </div>
        </section>

        {/* Closing */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
              Built and maintained by one person.
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              No team, no investors, no roadmap meeting. If a tool is broken, email me. If
              you have an idea, email me. The reply might take a day, but it&apos;ll come from
              the person who wrote the code.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="secondary" size="md">
                Get in touch
              </ButtonLink>
              <ButtonLink href="/author" variant="ghost" size="md">
                About the author
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
