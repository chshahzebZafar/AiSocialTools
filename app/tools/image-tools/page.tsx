import Link from "next/link";
import { Image as ImageIcon, ArrowRight, Shield, Zap, Sparkles, FileImage } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import Breadcrumbs from "@/components/Breadcrumbs";

const TOOL_IDS = [
  "image-compressor",
  "image-converter",
  "image-resizer",
  "color-palette",
  "svg-pattern-generator",
  "tweet-to-image",
  "text-to-handwriting",
  "instagram-filters",
  "video-to-gif",
];

const FAQS = [
  {
    q: "Are these image tools really free with no signup?",
    a: "Yes. Every image tool on this page is free forever, requires no account, no payment info, and has no watermarks. They run entirely in your browser using the Canvas and File APIs.",
  },
  {
    q: "Do you upload my images to your servers?",
    a: "No — ever. Every tool here is client-side only. Your images are processed locally in your browser, never leave your device, and aren't stored or logged. That's faster, more private, and works even if you lose internet mid-edit.",
  },
  {
    q: "What's the difference between Image Compressor and Image Converter?",
    a: "The Compressor keeps your file in its original format (JPG stays JPG) and shrinks it using quality reduction. The Converter changes the format entirely (PNG → JPG → WebP) so you can target whichever format your destination needs. Use both together: convert to WebP, then compress for even smaller files.",
  },
  {
    q: "What image sizes should I use for each social network?",
    a: "Check our full reference at Social Media Image Sizes 2026 — it covers every major platform (Instagram, TikTok, YouTube, LinkedIn, X, Facebook, Pinterest, Threads) with exact pixel dimensions and aspect ratios.",
  },
  {
    q: "Can I use these tools on mobile?",
    a: "Yes. Every tool is fully responsive and works on iOS, Android, tablets, and desktop. Image editing works via the same file picker you use elsewhere — choose from camera roll, Files, or Google Drive.",
  },
];

const BENEFITS = [
  { icon: Shield, title: "Private by design", desc: "Every tool is browser-only. Nothing is uploaded to our servers — ever." },
  { icon: Zap, title: "Fast, no queue", desc: "No upload wait, no processing queue. Results appear as fast as your CPU can calculate them." },
  { icon: Sparkles, title: "No watermarks", desc: "Output is clean — no logos, no 'made with X' tag, no quality gating." },
  { icon: FileImage, title: "Every format", desc: "PNG, JPG, WebP, SVG, PDF, GIF — we cover the formats creators actually use." },
];

export default function ImageToolsHub() {
  const tools = TOOL_IDS.map(getToolById).filter((t): t is NonNullable<typeof t> => Boolean(t));

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Image Tools 2026",
    description: "Free browser-side image toolkit — compress, convert, resize, favicon, and more.",
    url: "https://aisocialtools.co/tools/image-tools",
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
      { "@type": "ListItem", position: 3, name: "Image Tools", item: "https://aisocialtools.co/tools/image-tools" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="p-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Breadcrumbs center />
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-900/30 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-4">
            <ImageIcon className="w-3 h-3" />
            {tools.length} free image tools
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
            Free Image Tools{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              for 2026
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Compress, convert, resize, generate favicons, extract colors — every image task creators need, running entirely in your browser. No uploads, no signup, no watermark.
          </p>
        </div>

        <section aria-label="Image tools" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.id}
                  href={t.path}
                  className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:-translate-y-0.5 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
                >
                  {t.isNew && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wide bg-indigo-600 text-white rounded-full px-2 py-0.5">
                      New
                    </span>
                  )}
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {t.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{t.description}</p>
                  <div className="mt-3 text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open tool <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="prose prose-slate dark:prose-invert max-w-none mb-12 text-slate-700 dark:text-slate-300">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Private, browser-side image tools</h2>
          <p>
            Most online image tools work like this: you upload your file, wait for a server to process it, then download the result. That model has three problems — you&rsquo;re handing your images to a third party, you&rsquo;re limited by their queue and file-size caps, and the output usually comes with a watermark or upsell. Our image toolkit takes the opposite approach. Every tool on this page runs entirely in your browser using the Canvas and File APIs. Your images never leave your device, the processing is as fast as your hardware, and the output is clean.
          </p>
          <p>
            Start with the core four. The <Link href="/tools/image-compressor" className="text-indigo-600 dark:text-indigo-400 underline">Image Compressor</Link> uses quality-based compression to shrink JPG, PNG, and WebP files by 40–70% with no visible quality loss. The <Link href="/tools/image-converter" className="text-indigo-600 dark:text-indigo-400 underline">Image Format Converter</Link> swaps between PNG, JPG, and WebP — perfect for converting old PNGs to smaller WebP for your website. The <Link href="/tools/image-resizer" className="text-indigo-600 dark:text-indigo-400 underline">Image Resizer</Link> has platform presets for every Instagram, TikTok, YouTube, and LinkedIn dimension.
          </p>
          <p>
            For creative work, the <Link href="/tools/color-palette" className="text-indigo-600 dark:text-indigo-400 underline">Color Palette Generator</Link> extracts brand colors from any uploaded image, the <Link href="/tools/svg-pattern-generator" className="text-indigo-600 dark:text-indigo-400 underline">SVG Pattern Generator</Link> creates tileable backgrounds, the <Link href="/tools/tweet-to-image" className="text-indigo-600 dark:text-indigo-400 underline">Tweet to Image</Link> converter makes pretty tweet screenshots, and the <Link href="/tools/video-to-gif" className="text-indigo-600 dark:text-indigo-400 underline">Video to GIF</Link> tool turns clips into shareable loops.
          </p>
          <p>
            Before you upload anywhere, check the <Link href="/tools/social-media-image-sizes" className="text-indigo-600 dark:text-indigo-400 underline">Social Media Image Sizes 2026</Link> reference to make sure you&rsquo;re using the exact dimensions each network expects — it directly affects engagement and thumbnail clarity.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-5 text-center">Why this toolkit</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                  <Icon className="w-6 h-6 text-indigo-500 mb-2" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{b.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{b.desc}</p>
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

        <section className="bg-gradient-to-br from-cyan-50 to-indigo-50 dark:from-cyan-900/20 dark:to-indigo-900/20 border border-cyan-200 dark:border-cyan-800 rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Explore other toolkits</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Or dive into platform-specific tools.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/tools/instagram-tools" className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-slate-100 hover:shadow-md transition">
              Instagram Tools
            </Link>
            <Link href="/tools/youtube-tools" className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-slate-100 hover:shadow-md transition">
              YouTube Tools
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
