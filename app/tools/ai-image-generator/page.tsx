import Link from "next/link";
import { Wand2, Sparkles, Clock, ArrowRight, Hammer } from "lucide-react";

const WHILE_YOU_WAIT = [
  { name: "Instagram Post Generator", href: "/tools/instagram-post-generator", note: "Mock-ups with avatars, verification, engagement" },
  { name: "Image Compressor", href: "/tools/image-compressor", note: "Shrink JPG/PNG/WebP in your browser" },
  { name: "Color Palette Generator", href: "/tools/color-palette", note: "Pull brand colors from any image" },
  { name: "Tweet to Image", href: "/tools/tweet-to-image", note: "Turn tweets into shareable images" },
  { name: "SVG Pattern Generator", href: "/tools/svg-pattern-generator", note: "Mandalas, grids, waves for backgrounds" },
  { name: "Favicon Generator", href: "/tools/favicon-generator", note: "Every favicon size + HTML snippet" },
];

export default function AIImageGeneratorComingSoon() {
  return (
    <main className="relative min-h-[80vh] overflow-hidden bg-slate-50 dark:bg-slate-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora aurora-a" />
        <div className="aurora aurora-b" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/30 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300 mb-6">
            <Hammer className="w-3 h-3" />
            Coming soon
          </div>

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 shadow-xl shadow-fuchsia-500/30 mb-6 float-anim">
            <Wand2 className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
            AI Image Generator is{" "}
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              getting a glow-up
            </span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We&rsquo;re swapping out our initial text-to-image model for a faster, more reliable free model. The upgrade means better image quality and no 15-second rate limits — worth the short wait.
          </p>
        </div>

        {/* Disabled preview card */}
        <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 mb-10">
          <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl backdrop-blur-[1px] z-10 flex items-center justify-center">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-2 shadow-lg flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              <Clock className="w-4 h-4 text-amber-500" />
              Paused while we build v2
            </div>
          </div>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2 opacity-50">
            Prompt
          </label>
          <textarea
            disabled
            placeholder="Describe an image — e.g. 'a golden retriever puppy in a sunflower field at golden hour'"
            rows={3}
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 rounded-lg opacity-50 cursor-not-allowed"
          />

          <div className="grid grid-cols-3 gap-2 mt-3 opacity-50">
            {["Cinematic", "Photorealistic", "Anime"].map((s) => (
              <div key={s} className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-full text-xs text-center text-slate-500 dark:text-slate-400">
                {s}
              </div>
            ))}
          </div>

          <button
            disabled
            className="w-full mt-5 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 opacity-40 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
          >
            <Sparkles className="w-5 h-5" />
            Generate image
          </button>
        </div>

        {/* While you wait */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 text-center">
            In the meantime, try one of these
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {WHILE_YOU_WAIT.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:-translate-y-0.5 hover:shadow-lg hover:border-fuchsia-300 dark:hover:border-fuchsia-700 transition-all"
              >
                <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 mb-1 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">
                  {t.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">{t.note}</p>
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-fuchsia-600 dark:text-fuchsia-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Open <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-semibold hover:opacity-90 transition"
            >
              Browse all 45+ tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes aurora-shift {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(30px, 20px) scale(1.1); opacity: 0.6; }
        }
        @keyframes float-anim {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .aurora {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
        }
        .aurora-a {
          top: -160px; left: 10%;
          height: 360px; width: 360px;
          background: radial-gradient(circle at 30% 30%, #a78bfa 0%, transparent 60%);
          animation: aurora-shift 14s ease-in-out infinite;
        }
        .aurora-b {
          top: -200px; right: 10%;
          height: 420px; width: 420px;
          background: radial-gradient(circle at 70% 40%, #f472b6 0%, transparent 60%);
          animation: aurora-shift 16s ease-in-out infinite reverse;
        }
        .float-anim { animation: float-anim 3.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .aurora, .float-anim { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
