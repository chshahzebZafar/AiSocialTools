"use client";

import Link from "next/link";
import { Ruler, ArrowRight } from "lucide-react";
import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolHero from "@/components/ToolHero";
import ToolFAQ from "@/components/ToolFAQ";
import RelatedTools from "@/components/RelatedTools";
import ToolDetailsSection from "@/components/ToolDetailsSection";
import { ToolComments } from "@/components/ToolComments";

interface Size {
  name: string;
  dims: string;
  aspect: string;
  note?: string;
}

interface Platform {
  name: string;
  color: string;
  sizes: Size[];
}

const PLATFORMS: Platform[] = [
  {
    name: "Instagram",
    color: "from-pink-500 to-purple-600",
    sizes: [
      { name: "Feed (square)", dims: "1080 × 1080", aspect: "1:1" },
      { name: "Feed (portrait)", dims: "1080 × 1350", aspect: "4:5", note: "Best all-round feed size" },
      { name: "Feed (landscape)", dims: "1080 × 566", aspect: "1.91:1" },
      { name: "Reels & Stories", dims: "1080 × 1920", aspect: "9:16", note: "Keep 220px safe zones top & bottom" },
      { name: "Profile picture", dims: "320 × 320", aspect: "1:1" },
      { name: "Carousel", dims: "1080 × 1350", aspect: "4:5", note: "Up to 10 slides" },
    ],
  },
  {
    name: "TikTok",
    color: "from-slate-900 to-pink-500",
    sizes: [
      { name: "Video", dims: "1080 × 1920", aspect: "9:16" },
      { name: "Profile picture", dims: "200 × 200", aspect: "1:1" },
      { name: "Thumbnail / cover", dims: "1080 × 1920", aspect: "9:16", note: "Centered safe zone 1080 × 1150" },
      { name: "In-feed ad video", dims: "1080 × 1920", aspect: "9:16" },
    ],
  },
  {
    name: "YouTube",
    color: "from-red-600 to-red-500",
    sizes: [
      { name: "Thumbnail", dims: "1280 × 720", aspect: "16:9", note: "Min 640 × 360, under 2 MB" },
      { name: "Long-form video", dims: "1920 × 1080", aspect: "16:9" },
      { name: "Shorts", dims: "1080 × 1920", aspect: "9:16" },
      { name: "Channel art / banner", dims: "2560 × 1440", aspect: "16:9", note: "Safe zone 1546 × 423" },
      { name: "Profile picture", dims: "800 × 800", aspect: "1:1" },
    ],
  },
  {
    name: "LinkedIn",
    color: "from-[#0A66C2] to-blue-500",
    sizes: [
      { name: "Post image", dims: "1200 × 627", aspect: "1.91:1" },
      { name: "Square post image", dims: "1080 × 1080", aspect: "1:1" },
      { name: "Video post", dims: "1920 × 1080", aspect: "16:9" },
      { name: "Personal banner", dims: "1584 × 396", aspect: "4:1" },
      { name: "Company banner", dims: "1128 × 191", aspect: "~5.9:1" },
      { name: "Profile picture", dims: "400 × 400", aspect: "1:1" },
    ],
  },
  {
    name: "X (Twitter)",
    color: "from-sky-500 to-sky-400",
    sizes: [
      { name: "Post image (single)", dims: "1600 × 900", aspect: "16:9" },
      { name: "Post image (multi)", dims: "1200 × 675", aspect: "16:9" },
      { name: "Header photo", dims: "1500 × 500", aspect: "3:1" },
      { name: "Profile picture", dims: "400 × 400", aspect: "1:1" },
    ],
  },
  {
    name: "Facebook",
    color: "from-blue-600 to-blue-500",
    sizes: [
      { name: "Feed post (landscape)", dims: "1200 × 630", aspect: "1.91:1" },
      { name: "Feed post (square)", dims: "1080 × 1080", aspect: "1:1" },
      { name: "Stories / Reels", dims: "1080 × 1920", aspect: "9:16" },
      { name: "Cover photo", dims: "820 × 312", aspect: "~2.63:1" },
      { name: "Event cover", dims: "1920 × 1005", aspect: "~1.91:1" },
    ],
  },
  {
    name: "Pinterest",
    color: "from-red-600 to-red-700",
    sizes: [
      { name: "Standard pin", dims: "1000 × 1500", aspect: "2:3" },
      { name: "Idea / story pin", dims: "1080 × 1920", aspect: "9:16" },
      { name: "Long pin (discouraged)", dims: "1000 × 2100", aspect: "~1:2.1" },
      { name: "Board cover", dims: "600 × 600", aspect: "1:1" },
    ],
  },
  {
    name: "Threads",
    color: "from-slate-900 to-slate-700",
    sizes: [
      { name: "Post image (portrait)", dims: "1080 × 1350", aspect: "4:5" },
      { name: "Post image (square)", dims: "1080 × 1080", aspect: "1:1" },
      { name: "Video post", dims: "1080 × 1920", aspect: "9:16" },
    ],
  },
];

const imageListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Social Media Image Sizes 2026 — Complete Platform Reference",
  description: "The complete 2026 reference of every social media image and video size for Instagram, TikTok, YouTube, LinkedIn, X (Twitter), Facebook, Pinterest, and Threads.",
  url: "https://aisocialtools.co/tools/social-media-image-sizes",
  numberOfItems: PLATFORMS.length,
  itemListElement: PLATFORMS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${p.name} Image Sizes 2026`,
  })),
};

export default function SocialMediaImageSizesPage() {
  const tool = getToolById("social-media-image-sizes");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageListSchema) }} />
      {tool && <ToolSEO tool={tool} />}
      <ToolHero
        toolId={tool?.id}
        icon={Ruler}
        iconGradient="from-blue-500 to-purple-600"
        title="Social Media Image Sizes 2026 — Complete Size Guide (Every Platform)"
        description="The complete 2026 reference of every social media image and video size — Instagram, TikTok, YouTube, LinkedIn, X, Facebook, Pinterest, and Threads. Bookmark this page; we keep it updated as platforms change their specs."
        shareTitle="Social Media Image Sizes 2026"
        shareText="Complete social media image size reference, every platform, updated 2026."
      />
      <div className="p-8 max-w-6xl mx-auto">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5 mb-8 text-sm text-blue-900 dark:text-blue-100">
          <p className="font-semibold mb-1">Need to resize an image right now?</p>
          <p>
            Our free <Link href="/tools/image-resizer" className="underline font-medium">Image Resizer</Link> has presets for every size below. Our free <Link href="/tools/image-compressor" className="underline font-medium">Image Compressor</Link> keeps file sizes under platform upload limits.
          </p>
        </div>

        <div className="space-y-6">
          {PLATFORMS.map((p) => (
            <section key={p.name} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className={`bg-gradient-to-r ${p.color} px-6 py-4`}>
                <h2 className="text-xl font-bold text-white">{p.name}</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {p.sizes.map((s) => (
                    <div key={s.name} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-900/40">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{s.name}</p>
                      <p className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-1">{s.dims} px</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Aspect ratio: {s.aspect}</p>
                      {s.note && <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">{s.note}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Why image sizes matter for engagement</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm space-y-3">
            <p>
              Every social network crops uploads that don&rsquo;t match its preferred aspect ratio. The wrong size means your caption gets cut off (Instagram), your CTA disappears behind UI (TikTok, Reels), or your thumbnail looks blurry in search results (YouTube). Matching the exact pixel dimensions below gives the algorithm the full image it expects, and the algorithm rewards complete, high-fidelity uploads with more reach.
            </p>
            <p>
              In 2026, every major platform has moved toward a 9:16 vertical-first experience for short video (Reels, Shorts, TikTok, Pinterest Ideas, Facebook Reels). If you only produce content at one ratio, 9:16 reaches the most people. For feed posts, 4:5 portrait (1080 × 1350 px) still tops 1:1 square on Instagram, Threads, and LinkedIn because it occupies more screen real estate on mobile.
            </p>
            <p>
              YouTube is the outlier — long-form videos and thumbnails are still 16:9 and haven&rsquo;t budged. Keep thumbnails at 1280 × 720 px under 2 MB so they render instantly even on slow mobile connections.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/tools/image-resizer" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg flex items-center gap-1">
              Open Image Resizer <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/tools/image-compressor" className="px-4 py-2 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm rounded-lg flex items-center gap-1">
              Compress before uploading <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/tools/image-converter" className="px-4 py-2 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm rounded-lg flex items-center gap-1">
              Convert format (WebP / PNG / JPG) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {tool && <ToolComments toolId={tool.id} />}
        {tool && <ToolFAQ tool={tool} />}
        {tool && <RelatedTools currentTool={tool} />}
        {tool && <ToolDetailsSection tool={tool} />}
      </div>
    </>
  );
}
