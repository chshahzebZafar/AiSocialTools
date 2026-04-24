import Link from "next/link";
import { Instagram, ArrowRight, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { getToolById } from "@/lib/social-tools";

const TOOL_IDS = [
  "instagram-post-generator",
  "instagram-fonts",
  "instagram-engagement-calculator",
  "instagram-filters",
  "hashtag-generator",
  "hashtag-counter",
  "caption-templates",
  "content-ideas",
  "best-time-calculator",
  "emoji-picker",
  "bio-link-generator",
  "social-bio-generator",
];

const FAQS = [
  {
    q: "What are the best free Instagram tools for creators in 2026?",
    a: "The essentials are an Instagram post generator for mock-ups and drafts, a hashtag generator tuned to your niche, a caption template library, an engagement-rate calculator, and a best-time-to-post calculator. Every tool in this toolkit fits those categories and is 100% free with no signup.",
  },
  {
    q: "Are these Instagram tools actually free — no hidden fees?",
    a: "Yes. Every tool on this page is free forever, runs entirely in your browser, requires no account, has no watermark, and imposes no usage limits. We don't sell your data or upload your content to third-party servers.",
  },
  {
    q: "Do I need to connect my Instagram account?",
    a: "No. None of these tools connect to Instagram's API or require login. You paste captions, type text, or upload images locally — everything happens in your browser and your data never leaves your device.",
  },
  {
    q: "Which Instagram tool should I try first?",
    a: "If you're posting regularly, start with the Hashtag Generator and Caption Templates — they save time on every post. For growth analysis, run your latest reel through the Instagram Engagement Calculator. Creators wanting aesthetic flair love the Instagram Font Generator for bios.",
  },
  {
    q: "Can I use these tools for business or client Instagram accounts?",
    a: "Absolutely. These tools are trusted by solo creators, freelance social media managers, and in-house marketing teams at agencies. Use them for unlimited client accounts without any licensing concerns.",
  },
];

const USE_CASES = [
  { icon: Sparkles, title: "Content creators", desc: "Plan posts faster with captions, hashtags, and fonts that match your aesthetic." },
  { icon: TrendingUp, title: "Growth marketers", desc: "Track engagement, find best posting times, and benchmark against industry averages." },
  { icon: Users, title: "Social media managers", desc: "Run multiple client accounts without paying per-seat fees to enterprise platforms." },
  { icon: Zap, title: "Small business owners", desc: "Do your own Instagram marketing — no agency retainer, no learning curve." },
];

export default function InstagramToolsHub() {
  const tools = TOOL_IDS.map(getToolById).filter((t): t is NonNullable<typeof t> => Boolean(t));

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Instagram Tools 2026",
    description: "Complete free Instagram toolkit for creators, marketers, and businesses.",
    url: "https://aisocialtools.co/tools/instagram-tools",
    hasPart: tools.map((t) => ({
      "@type": "WebApplication",
      name: t.name,
      url: `https://aisocialtools.co${t.path}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aisocialtools.co" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://aisocialtools.co/tools" },
      { "@type": "ListItem", position: 3, name: "Instagram Tools", item: "https://aisocialtools.co/tools/instagram-tools" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="p-8 max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 dark:border-pink-800 dark:bg-pink-900/30 px-3 py-1 text-xs font-medium text-pink-700 dark:text-pink-300 mb-4">
            <Instagram className="w-3 h-3" />
            {tools.length} free Instagram tools
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
            Free Instagram Tools{" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              for 2026
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Everything you need to plan, write, design, and measure Instagram content — captions, hashtags, fonts, engagement, best posting times. 100% free, no signup, browser-only.
          </p>
        </div>

        {/* Tools grid */}
        <section aria-label="Instagram tools" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.id}
                  href={t.path}
                  className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:-translate-y-0.5 hover:shadow-lg hover:border-pink-300 dark:hover:border-pink-700 transition-all"
                >
                  {t.isNew && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wide bg-pink-600 text-white rounded-full px-2 py-0.5">
                      New
                    </span>
                  )}
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    {t.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{t.description}</p>
                  <div className="mt-3 text-xs text-pink-600 dark:text-pink-400 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open tool <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* SEO content block */}
        <section className="prose prose-slate dark:prose-invert max-w-none mb-12 text-slate-700 dark:text-slate-300">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Why this free Instagram toolkit exists</h2>
          <p>
            Instagram remains the single most competitive platform for creators and small businesses in 2026. Reels dominate reach, Stories drive retention, the carousel is still the highest-engagement feed format, and the algorithm rewards profiles that post consistently and use the platform-native features. Doing all of that well used to require Canva Pro, Later, Tailwind, and a handful of Chrome extensions — costing hundreds of dollars a year and pushing every post through third-party servers.
          </p>
          <p>
            We built this free Instagram toolkit to replace those subscriptions. Every tool on this page runs in your browser, needs no signup, and never uploads your content anywhere. The <Link href="/tools/instagram-post-generator" className="text-pink-600 dark:text-pink-400 underline">Instagram Post Generator</Link> and <Link href="/tools/instagram-filters" className="text-pink-600 dark:text-pink-400 underline">Instagram Filters</Link> cover visual mock-ups. The <Link href="/tools/hashtag-generator" className="text-pink-600 dark:text-pink-400 underline">Hashtag Generator</Link> and <Link href="/tools/hashtag-counter" className="text-pink-600 dark:text-pink-400 underline">Hashtag Counter</Link> handle discovery (Instagram caps you at 30 hashtags per post). The <Link href="/tools/caption-templates" className="text-pink-600 dark:text-pink-400 underline">Caption Templates</Link> library and <Link href="/tools/content-ideas" className="text-pink-600 dark:text-pink-400 underline">Content Ideas Generator</Link> solve writer&rsquo;s block. The new <Link href="/tools/instagram-fonts" className="text-pink-600 dark:text-pink-400 underline">Instagram Font Generator</Link> unlocks 20+ aesthetic Unicode fonts for bios and captions.
          </p>
          <p>
            For measurement, the <Link href="/tools/instagram-engagement-calculator" className="text-pink-600 dark:text-pink-400 underline">Instagram Engagement Rate Calculator</Link> plugs your numbers into the 2026 benchmarks (excellent &gt; 6%, good 3–6%, average 1–3%), and the <Link href="/tools/best-time-calculator" className="text-pink-600 dark:text-pink-400 underline">Best Time to Post Calculator</Link> suggests optimal posting windows by timezone and audience. Together these tools form a complete, zero-cost Instagram workflow — plan, write, design, post, measure, iterate.
          </p>
        </section>

        {/* Use cases */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-5 text-center">Who uses these tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {USE_CASES.map((u) => {
              const Icon = u.icon;
              return (
                <div key={u.title} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                  <Icon className="w-6 h-6 text-pink-500 mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{u.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{u.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq" className="mb-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 sm:p-8">
          <h2 id="faq" className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-5">Frequently asked questions</h2>
          <div className="space-y-5">
            {FAQS.map((f) => (
              <div key={f.q} className="border-b border-slate-200 dark:border-slate-700 last:border-0 pb-5 last:pb-0">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{f.q}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-hub */}
        <section className="bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-indigo-900/20 dark:to-pink-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Explore other toolkits</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Looking for another platform? We cover every major channel.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/tools/youtube-tools" className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-slate-100 hover:shadow-md transition">
              YouTube Tools
            </Link>
            <Link href="/tools/image-tools" className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-slate-100 hover:shadow-md transition">
              Image Tools
            </Link>
            <Link href="/tools" className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:opacity-90 transition">
              All 46+ tools
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
