import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Mail, Github, Twitter, Linkedin, Coffee, Globe, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "About the Author — Shahzeb Zafar",
  description:
    "Meet Shahzeb Zafar, the developer behind Social Tools. Independent developer building free, private tools for content creators.",
  keywords: ["author", "creator", "developer", "Shahzeb Zafar"],
  openGraph: {
    title: "About the Author — Shahzeb Zafar",
    description: "The developer behind Social Tools.",
    type: "website",
    url: "https://aisocialtools.co/author",
    siteName: "AISocialTools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "Author" }],
  },
  alternates: { canonical: "https://aisocialtools.co/author" },
};

const social = [
  { href: "https://shahzebzafar.netlify.app/", icon: Globe, label: "Portfolio", handle: "shahzebzafar.netlify.app" },
  { href: "https://github.com/chshahzebZafar/", icon: Github, label: "GitHub", handle: "@chshahzebZafar" },
  { href: "https://x.com/SHAHZEBZAFAR99", icon: Twitter, label: "Twitter / X", handle: "@SHAHZEBZAFAR99" },
  { href: "https://www.linkedin.com/in/shahzaib-zafer/", icon: Linkedin, label: "LinkedIn", handle: "shahzaib-zafer" },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://aisocialtools.co" },
    { "@type": "ListItem", position: 2, name: "Author", item: "https://aisocialtools.co/author" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shahzeb Zafar",
  url: "https://aisocialtools.co/author",
  jobTitle: "Developer · Creator of Social Tools",
  sameAs: [
    "https://github.com/chshahzebZafar/",
    "https://x.com/SHAHZEBZAFAR99",
    "https://www.linkedin.com/in/shahzaib-zafer/",
    "https://shahzebzafar.netlify.app/",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Social Tools",
    url: "https://aisocialtools.co",
  },
};

export default function AuthorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Header />
      <main className="flex-1">
        <Breadcrumbs />

        {/* Hero */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <Badge variant="neutral" className="mb-4">
              Author
            </Badge>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl sm:text-3xl font-semibold text-zinc-700 dark:text-zinc-300 tracking-tight">
                  SZ
                </span>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-tight mb-2">
                  Shahzeb Zafar
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  Developer · Creator of Social Tools
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 prose prose-zinc dark:prose-invert max-w-none">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mt-0 mb-6 not-prose">
              Why this site exists
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed not-prose mb-6">
              I&apos;m a developer who also makes content. Every time I needed a quick utility — a
              hashtag count, a thumbnail download, an image resize — the existing options were
              either bloated SaaS tools, ad-stuffed free sites, or browser extensions that asked
              for too many permissions.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed not-prose mb-6">
              So I started building the small ones for myself, then put them online. Forty tools
              later, this is what they look like — clean, fast, free, no signup, no tracking, no
              upsell. The site stays this way because I host it personally and refuse to add
              anything that compromises the trade.
            </p>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed not-prose">
              If a tool here saves you time, that&apos;s the whole point. If it doesn&apos;t do
              what you need, email me and odds are it&apos;ll exist by next month.
            </p>
          </div>
        </section>

        {/* What I value */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-8">
              What I value
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              {[
                {
                  title: "Free, accessible",
                  body: "Powerful tools should be available to everyone — not gated behind a credit card.",
                },
                {
                  title: "Privacy first",
                  body: "Tools run in your browser. Nothing is uploaded, analyzed, or sold.",
                },
                {
                  title: "User-focused",
                  body: "Each tool does one thing well. No tabs to discover, no settings to learn.",
                },
                {
                  title: "Continuous improvement",
                  body: "Real fixes, not made-up changelogs. User feedback drives the roadmap.",
                },
              ].map((v) => (
                <div key={v.title} className="bg-white dark:bg-zinc-950 p-6 sm:p-7">
                  <h3 className="text-base font-semibold text-zinc-950 dark:text-white mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get in touch */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
                  Get in touch
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  Bug reports, feature requests, partnerships, or just to say hi. Replies
                  usually within 24-48 hours.
                </p>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink
                    href="mailto:shahzaibzafar093@gmail.com"
                    variant="primary"
                    size="md"
                    external
                  >
                    <Mail className="w-4 h-4" />
                    Email me
                  </ButtonLink>
                  <ButtonLink
                    href="https://buymeacoffee.com/shahzebzafar"
                    variant="secondary"
                    size="md"
                    external
                  >
                    <Coffee className="w-4 h-4" />
                    Buy me a coffee
                  </ButtonLink>
                </div>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 mb-4">
                  Find me elsewhere
                </h3>
                <div className="space-y-1">
                  {social.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 -mx-2 px-2 py-2.5 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    >
                      <s.icon className="w-4 h-4 text-zinc-700 dark:text-zinc-300 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-zinc-950 dark:text-white">
                          {s.label}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-500 truncate">
                          {s.handle}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
