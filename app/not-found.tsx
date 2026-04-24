import Link from "next/link";
import {
  ArrowRight,
  Home,
  LayoutGrid,
  Hash,
  Twitter,
  Instagram,
  Youtube,
  QrCode,
  Sparkles,
  Zap,
} from "lucide-react";

const POPULAR_TOOLS = [
  { name: "Tweet Generator", href: "/tools/tweet-generator", icon: Twitter, tint: "sky" },
  { name: "Instagram Fonts", href: "/tools/instagram-fonts", icon: Instagram, tint: "pink" },
  { name: "YouTube Thumbnail", href: "/tools/youtube-thumbnail", icon: Youtube, tint: "red" },
  { name: "Hashtag Generator", href: "/tools/hashtag-generator", icon: Hash, tint: "fuchsia" },
  { name: "QR Code Generator", href: "/tools/qr-code-generator", icon: QrCode, tint: "emerald" },
  { name: "Image Compressor", href: "/tools/image-compressor", icon: Sparkles, tint: "amber" },
] as const;

const TINTS: Record<string, { bg: string; text: string; ring: string }> = {
  sky: { bg: "bg-sky-500/10", text: "text-sky-600 dark:text-sky-400", ring: "group-hover:ring-sky-500/40" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-600 dark:text-pink-400", ring: "group-hover:ring-pink-500/40" },
  red: { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400", ring: "group-hover:ring-red-500/40" },
  fuchsia: { bg: "bg-fuchsia-500/10", text: "text-fuchsia-600 dark:text-fuchsia-400", ring: "group-hover:ring-fuchsia-500/40" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", ring: "group-hover:ring-emerald-500/40" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", ring: "group-hover:ring-amber-500/40" },
};

export const metadata = {
  title: "404 — Page Not Found | AI Social Tools",
  description: "The page you're looking for doesn't exist. Explore 40+ free social media tools instead.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-slate-50 dark:bg-slate-950">
      {/* Subtle dotted grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(148 163 184) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)",
        }}
      />

      {/* Soft aurora gradient */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
        <div className="aurora aurora-a" />
        <div className="aurora aurora-b" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        {/* Small badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/70 dark:text-slate-300">
          <Zap className="h-3 w-3 text-amber-500" />
          Error 404
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-2xl text-center text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
          This page{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            took a wrong turn
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-center text-base text-slate-600 sm:text-lg dark:text-slate-400">
          We couldn&rsquo;t find what you were looking for. The link may have moved, or the URL has a typo — but 40+ free social media tools are still here.
        </p>

        {/* Action buttons */}
        <div className="mt-10 flex w-full max-w-md flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          {/* Primary — gradient pill with shine */}
          <Link
            href="/"
            className="btn-primary group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(79,70,229,0.6)] ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_rgba(79,70,229,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
          >
            <span className="btn-shine" aria-hidden="true" />
            <Home className="relative h-4 w-4" />
            <span className="relative">Back to home</span>
            <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* Secondary — solid white, clear border, no pattern bleed */}
          <Link
            href="/tools"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:focus-visible:ring-slate-600 dark:focus-visible:ring-offset-slate-950"
          >
            <LayoutGrid className="h-4 w-4" />
            Browse all tools
            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </Link>
        </div>

        {/* Bento grid of popular tools */}
        <section aria-labelledby="popular-heading" className="mt-20 w-full">
          <h2
            id="popular-heading"
            className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-500"
          >
            Or try one of these
          </h2>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
            {POPULAR_TOOLS.map((t, i) => {
              const Icon = t.icon;
              const tint = TINTS[t.tint];
              return (
                <Link
                  key={t.name}
                  href={t.href}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className={`card-pop group relative flex flex-col items-start gap-2.5 overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-4 ring-1 ring-transparent backdrop-blur transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-xl hover:shadow-slate-900/5 ${tint.ring} hover:ring-4 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:shadow-black/40`}
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${tint.bg} transition-transform group-hover:scale-110`}>
                    <Icon className={`h-4 w-4 ${tint.text}`} />
                  </div>
                  <p className="text-sm font-semibold leading-snug text-slate-900 dark:text-white">
                    {t.name}
                  </p>
                  <ArrowRight className={`ml-auto mt-auto h-3.5 w-3.5 ${tint.text} translate-x-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100`} />
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      <style>{`
        @keyframes aurora-shift {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.55; }
          50% { transform: translate(30px, 20px) scale(1.1); opacity: 0.75; }
        }
        @keyframes card-pop {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes btn-shine {
          0% { transform: translateX(-150%) skewX(-20deg); }
          60% { transform: translateX(220%) skewX(-20deg); }
          100% { transform: translateX(220%) skewX(-20deg); }
        }

        .btn-primary {
          background-image: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%);
          background-size: 200% 200%;
          background-position: 0% 0%;
          transition: background-position 0.5s ease, transform 0.2s ease, box-shadow 0.3s ease;
        }
        .btn-primary:hover {
          background-position: 100% 100%;
        }
        .btn-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%);
          transform: translateX(-150%) skewX(-20deg);
          pointer-events: none;
        }
        .btn-primary:hover .btn-shine {
          animation: btn-shine 0.9s ease-out;
        }

        .aurora {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          will-change: transform, opacity;
        }
        .aurora-a {
          top: -160px;
          left: 10%;
          height: 360px;
          width: 360px;
          background: radial-gradient(circle at 30% 30%, #818cf8 0%, transparent 60%);
          animation: aurora-shift 14s ease-in-out infinite;
        }
        .aurora-b {
          top: -200px;
          right: 10%;
          height: 420px;
          width: 420px;
          background: radial-gradient(circle at 70% 40%, #f472b6 0%, transparent 60%);
          animation: aurora-shift 16s ease-in-out infinite reverse;
        }

        .card-pop {
          opacity: 0;
          animation: card-pop 0.5s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora, .card-pop, .btn-primary, .btn-shine {
            animation: none !important;
            transition: none !important;
          }
          .card-pop { opacity: 1; }
        }
      `}</style>
    </main>
  );
}
