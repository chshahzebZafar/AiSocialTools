import { FavoriteButton } from "@/components/FavoriteButton";
import ShareButtons from "@/components/ShareButtons";
import Breadcrumbs from "@/components/Breadcrumbs";

interface ToolHeroProps {
  /** Tool id for the favorite button. Omit to hide it. */
  toolId?: string;
  /** Lucide (or any) icon component */
  icon: React.ComponentType<{ className?: string }>;
  /** Tailwind gradient stops for the icon tile, e.g. "from-purple-500 to-pink-500" */
  iconGradient?: string;
  title: string;
  description: string;
  shareTitle: string;
  shareText: string;
}

/**
 * Standard hero band for tool pages — mirrors the hero treatment used on the
 * rest of the site (a full-width, bottom-bordered section with a centered
 * max-width container). Keeps every tool page consistent with the homepage,
 * blog, about, and other pages.
 */
export default function ToolHero({
  toolId,
  icon: Icon,
  iconGradient = "from-indigo-500 to-violet-500",
  title,
  description,
  shareTitle,
  shareText,
}: ToolHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
      <div className="aurora" aria-hidden />
      <div className="absolute inset-0 bg-dot-grid-animated opacity-50" aria-hidden />
      <div className="absolute inset-0 bg-radial-wash" aria-hidden />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <Breadcrumbs embedded />
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${iconGradient} flex items-center justify-center shadow-sm`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-tight">
              {title}
            </h1>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3 flex-wrap">
          {toolId && <FavoriteButton toolId={toolId} />}
          <ShareButtons title={shareTitle} text={shareText} />
        </div>
      </div>
    </section>
  );
}
