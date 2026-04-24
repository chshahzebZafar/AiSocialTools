import Link from "next/link";
import { Youtube, ArrowRight, Rocket, DollarSign, Search, TrendingUp } from "lucide-react";
import { getToolById } from "@/lib/social-tools";

const TOOL_IDS = [
  "youtube-thumbnail",
  "youtube-tag-generator",
  "youtube-description-generator",
  "youtube-money-calculator",
  "best-time-calculator",
  "engagement-calculator",
  "analytics-calculator",
  "content-ideas",
];

const FAQS = [
  {
    q: "What are the best free YouTube tools for new creators in 2026?",
    a: "Start with a thumbnail downloader for competitor research, a tag generator for SEO, a description generator for consistent formatting, and a money calculator for realistic earnings expectations. This toolkit covers every one of those, entirely free, no signup.",
  },
  {
    q: "Does YouTube still use tags for ranking in 2026?",
    a: "Tags are a minor ranking signal — title, description, watch time, and click-through rate matter far more. But well-chosen tags help YouTube understand ambiguous titles and surface your video for misspellings and related searches. Our Tag Generator produces tags that stay under the 500-character total limit.",
  },
  {
    q: "How accurate is the YouTube Money Calculator?",
    a: "It produces a realistic range based on your niche CPM and YouTube's standard 55% creator share for long-form videos (and the separate Creator Pool formula for Shorts). Actual earnings vary with viewer geography, watch time, and ad blockers — treat the output as a ballpark.",
  },
  {
    q: "Can I use these YouTube tools without logging into YouTube?",
    a: "Yes. Every tool here is standalone. Nothing connects to the YouTube API or needs your account. You paste a video URL, topic, or view count — we do the rest in your browser.",
  },
  {
    q: "Do I need YouTube Partner Program access to use these tools?",
    a: "No — all tools work for channels of any size, including brand-new ones. The Money Calculator is especially useful for channels that are close to monetisation eligibility and want to forecast earnings before applying.",
  },
];

const STAGES = [
  { icon: Rocket, title: "Starting a channel", desc: "Plan your niche, generate descriptions, pick tags that rank." },
  { icon: Search, title: "Growing to 1K", desc: "Research competitor thumbnails, optimise for CTR, track engagement." },
  { icon: TrendingUp, title: "Scaling past monetisation", desc: "Estimate revenue, benchmark against your niche, double down on what works." },
  { icon: DollarSign, title: "Maximising earnings", desc: "Model different view counts, CPM ranges, and Shorts vs long-form strategies." },
];

export default function YouTubeToolsHub() {
  const tools = TOOL_IDS.map(getToolById).filter((t): t is NonNullable<typeof t> => Boolean(t));

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free YouTube Tools 2026",
    description: "Complete free YouTube toolkit for creators — tags, descriptions, thumbnails, earnings.",
    url: "https://aisocialtools.co/tools/youtube-tools",
    hasPart: tools.map((t) => ({ "@type": "WebApplication", name: t.name, url: `https://aisocialtools.co${t.path}` })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://aisocialtools.co" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://aisocialtools.co/tools" },
      { "@type": "ListItem", position: 3, name: "YouTube Tools", item: "https://aisocialtools.co/tools/youtube-tools" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="p-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/30 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-300 mb-4">
            <Youtube className="w-3 h-3" />
            {tools.length} free YouTube tools
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
            Free YouTube Tools{" "}
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 bg-clip-text text-transparent">
              for 2026
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A complete free toolkit for YouTube creators — tag generator, description builder, money calculator, thumbnail downloader. No signup, no YouTube login, no ads in the tool.
          </p>
        </div>

        <section aria-label="YouTube tools" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.id}
                  href={t.path}
                  className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:-translate-y-0.5 hover:shadow-lg hover:border-red-300 dark:hover:border-red-700 transition-all"
                >
                  {t.isNew && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wide bg-red-600 text-white rounded-full px-2 py-0.5">
                      New
                    </span>
                  )}
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {t.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{t.description}</p>
                  <div className="mt-3 text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open tool <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="prose prose-slate dark:prose-invert max-w-none mb-12 text-slate-700 dark:text-slate-300">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">The free YouTube toolkit for 2026</h2>
          <p>
            YouTube has never been more crowded. 500 hours of video upload every minute, Shorts have reshaped the algorithm, and the bar for a clickable thumbnail keeps rising. The creators winning in 2026 are the ones who ship consistently and pay attention to the metadata YouTube uses to rank them — the title, the description, the tags, and the first 15 seconds.
          </p>
          <p>
            This toolkit covers the metadata side end-to-end, free. The <Link href="/tools/youtube-tag-generator" className="text-red-600 dark:text-red-400 underline">YouTube Tag Generator</Link> builds tag lists under the 500-character limit using keyword-expansion patterns proven across SERP research. The <Link href="/tools/youtube-description-generator" className="text-red-600 dark:text-red-400 underline">YouTube Description Generator</Link> structures your description the way YouTube ranks — hook in the first two lines, timestamps for chapters, links, CTA, hashtags. The <Link href="/tools/youtube-thumbnail" className="text-red-600 dark:text-red-400 underline">YouTube Thumbnail Grabber</Link> lets you study any competitor&rsquo;s thumbnail at full 1280×720 resolution.
          </p>
          <p>
            On the business side, the <Link href="/tools/youtube-money-calculator" className="text-red-600 dark:text-red-400 underline">YouTube Money Calculator</Link> is the most realistic free estimator available — it accounts for YouTube&rsquo;s 55% creator share, separate Shorts Creator Pool math, niche-specific CPM ranges, and a monetised-views percentage that reflects ad blockers and non-monetisable regions. Pair it with the <Link href="/tools/engagement-calculator" className="text-red-600 dark:text-red-400 underline">Engagement Calculator</Link> and <Link href="/tools/analytics-calculator" className="text-red-600 dark:text-red-400 underline">Analytics Calculator</Link> to benchmark your performance before (and after) you join the Partner Program.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-5 text-center">Where you are in your YouTube journey</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STAGES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                  <Icon className="w-6 h-6 text-red-500 mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

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

        <section className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Explore other toolkits</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Growing on more than one platform? Check these out.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/tools/instagram-tools" className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-slate-100 hover:shadow-md transition">
              Instagram Tools
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
