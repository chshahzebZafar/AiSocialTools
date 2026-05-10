"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { socialTools, getToolsByCategory } from "@/lib/social-tools";
import {
  X,
  ChevronDown,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Hash,
  Type,
  Image as ImageIcon,
  Palette,
  Link as LinkIcon,
  Calendar,
  BarChart3,
  FileText,
  Settings,
  Heart,
  Sparkles,
  Video,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/components/AuthProvider";

interface SidebarProps {
  onClose?: () => void;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram: Instagram,
  Twitter: Twitter,
  YouTube: Youtube,
  Facebook: Facebook,
  Content: Type,
  "Text Tools": Hash,
  "Image Tools": ImageIcon,
  Design: Palette,
  Links: LinkIcon,
  Planning: Calendar,
  Analytics: BarChart3,
  SEO: FileText,
  Converters: FileText,
  Vimeo: Video,
  Miscellaneous: Settings,
};

const categoryConfig: Array<{
  name: string;
  displayName: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { name: "Instagram", displayName: "Instagram", icon: Instagram },
  { name: "Twitter", displayName: "Twitter / X", icon: Twitter },
  { name: "YouTube", displayName: "YouTube", icon: Youtube },
  { name: "Facebook", displayName: "Facebook", icon: Facebook },
  { name: "Content", displayName: "Content", icon: Type },
  { name: "Design", displayName: "Design", icon: Palette },
  { name: "Links", displayName: "Links", icon: LinkIcon },
  { name: "Planning", displayName: "Planning", icon: Calendar },
  { name: "Analytics", displayName: "Analytics", icon: BarChart3 },
  { name: "SEO", displayName: "SEO", icon: FileText },
  { name: "Converters", displayName: "Converters", icon: FileText },
  { name: "Vimeo", displayName: "Vimeo", icon: Youtube },
];

const navItem =
  "flex items-center justify-between gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors";
const navItemActive =
  "bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white";
const navItemIdle =
  "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900";

const subItem =
  "flex items-center gap-2.5 px-3 py-1.5 ml-6 rounded-md text-sm transition-colors";
const subItemActive =
  "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-medium";
const subItemIdle =
  "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900";

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { favorites, loading: favoritesLoading } = useFavorites();
  const [favoritesExpanded, setFavoritesExpanded] = useState(true);

  const allCategories = useMemo(
    () => Array.from(new Set(socialTools.map((t) => t.category))),
    []
  );

  const categories = useMemo(() => {
    return categoryConfig
      .filter((c) => allCategories.includes(c.name))
      .concat(
        allCategories
          .filter((cat) => !categoryConfig.find((c) => c.name === cat))
          .map((cat) => ({
            name: cat,
            displayName: cat,
            icon: categoryIcons[cat] || Settings,
          }))
      );
  }, [allCategories]);

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(categories.length > 0 ? [categories[0].name] : [])
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  const handleLinkClick = () => {
    if (onClose && window.innerWidth < 1024) onClose();
  };

  return (
    <aside className="w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 h-screen lg:h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between flex-shrink-0">
        <h2 className="text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-[0.15em]">
          Categories
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-0.5">
          {/* All Tools */}
          <li>
            <Link
              href="/tools"
              onClick={handleLinkClick}
              className={`${navItem} ${pathname === "/tools" ? navItemActive : navItemIdle}`}
            >
              <span className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 flex-shrink-0" />
                All tools
              </span>
            </Link>
          </li>

          {/* Favorites */}
          {user && (
            <>
              <li className="border-t border-zinc-200 dark:border-zinc-800 my-2" />
              <li>
                <button
                  onClick={() => setFavoritesExpanded(!favoritesExpanded)}
                  className={`w-full ${navItem} ${
                    favorites.some((t) => pathname === t.path) ? navItemActive : navItemIdle
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Heart className="w-4 h-4 flex-shrink-0" />
                    Favorites
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                      favoritesExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {favoritesExpanded && (
                  <ul className="mt-1 space-y-0.5">
                    {favoritesLoading ? (
                      <li className="px-3 py-1.5 ml-6 text-xs text-zinc-500 dark:text-zinc-500">
                        Loading…
                      </li>
                    ) : favorites.length === 0 ? (
                      <li className="px-3 py-1.5 ml-6 text-xs text-zinc-500 dark:text-zinc-500">
                        No favorites yet
                      </li>
                    ) : (
                      favorites.map((tool) => {
                        const Icon = tool.icon;
                        const isActive = pathname === tool.path;
                        return (
                          <li key={tool.id}>
                            <Link
                              href={tool.path}
                              onClick={handleLinkClick}
                              className={`${subItem} ${isActive ? subItemActive : subItemIdle}`}
                            >
                              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="truncate flex-1">{tool.name}</span>
                            </Link>
                          </li>
                        );
                      })
                    )}
                  </ul>
                )}
              </li>
            </>
          )}

          <li className="border-t border-zinc-200 dark:border-zinc-800 my-2" />

          {/* Categories */}
          {categories.map((cat) => {
            const tools = getToolsByCategory(cat.name);
            const isExpanded = expandedCategories.has(cat.name);
            const Icon = cat.icon;
            const hasActive = tools.some((t) => pathname === t.path);

            return (
              <li key={cat.name}>
                <button
                  onClick={() => toggleCategory(cat.name)}
                  className={`w-full ${navItem} ${hasActive ? navItemActive : navItemIdle}`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {cat.displayName}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isExpanded && (
                  <ul className="mt-1 space-y-0.5">
                    {tools.map((tool) => {
                      const ToolIcon = tool.icon;
                      const isActive = pathname === tool.path;
                      return (
                        <li key={tool.id}>
                          <Link
                            href={tool.path}
                            onClick={handleLinkClick}
                            className={`${subItem} ${isActive ? subItemActive : subItemIdle}`}
                          >
                            <ToolIcon className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate flex-1">{tool.name}</span>
                            {tool.isNew && (
                              <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                New
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
