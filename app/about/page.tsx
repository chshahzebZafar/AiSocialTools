import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Check, Mail, Github, Twitter, Linkedin, Coffee, Globe } from "lucide-react";
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
    siteName: "AISocialTools",
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
    { "@type": "ListItem", position: 2, name: "About", item: "https://aisocialtools.co/about" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shahzeb Zafar",
  url: "https://aisocialtools.co/about",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
          <div className="aurora" aria-hidden />
          <div className="absolute inset-0 bg-dot-grid-animated opacity-50" aria-hidden />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <Breadcrumbs embedded />
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

        {/* The person behind it */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <Badge variant="neutral" className="mb-6">
              The maker
            </Badge>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 mb-10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl sm:text-3xl font-semibold text-zinc-700 dark:text-zinc-300 tracking-tight">
                  SZ
                </span>
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 dark:text-white tracking-tight leading-tight mb-2">
                  Shahzeb Zafar
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  Developer · Creator of Social Tools
                </p>
              </div>
            </div>

            <div className="max-w-3xl space-y-5">
              <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                I&apos;m a developer who also makes content. Every time I needed a quick utility — a
                hashtag count, a thumbnail download, an image resize — the existing options were
                either bloated SaaS tools, ad-stuffed free sites, or browser extensions that asked
                for too many permissions.
              </p>
              <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                So I started building the small ones for myself, then put them online. Forty tools
                later, this is what they look like — clean, fast, free, no signup, no tracking, no
                upsell. The site stays this way because I host it personally and refuse to add
                anything that compromises the trade.
              </p>
              <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                No team, no investors, no roadmap meeting. If a tool is broken, email me. If you
                have an idea, email me. The reply might take a day, but it&apos;ll come from the
                person who wrote the code.
              </p>
            </div>
          </div>
        </section>

        {/* What I value */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-8">
              What I value
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
              {[
                { title: "Free, accessible", body: "Powerful tools should be available to everyone — not gated behind a credit card." },
                { title: "Privacy first", body: "Tools run in your browser. Nothing is uploaded, analyzed, or sold." },
                { title: "User-focused", body: "Each tool does one thing well. No tabs to discover, no settings to learn." },
                { title: "Continuous improvement", body: "Real fixes, not made-up changelogs. User feedback drives the roadmap." },
              ].map((v) => (
                <div key={v.title} className="bg-white dark:bg-zinc-950 p-6 sm:p-7">
                  <h3 className="text-base font-semibold text-zinc-950 dark:text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get in touch */}
        <section className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-white tracking-tight mb-4">
                  Get in touch
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  Bug reports, feature requests, partnerships, or just to say hi. Replies usually
                  within 24-48 hours.
                </p>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="mailto:shahzaibzafar093@gmail.com" variant="primary" size="md" external>
                    <Mail className="w-4 h-4" />
                    Email me
                  </ButtonLink>
                  <ButtonLink href="https://buymeacoffee.com/shahzebzafar" variant="secondary" size="md" external>
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
                        <div className="text-sm font-medium text-zinc-950 dark:text-white">{s.label}</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-500 truncate">{s.handle}</div>
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
