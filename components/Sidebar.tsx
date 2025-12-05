"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { socialTools, getToolsByCategory } from "@/lib/social-tools";
import { 
  X, 
  ChevronDown, 
  ChevronUp,
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
  Code,
  Settings,
  Heart,
  Sparkles,
  Video
} from "lucide-react";
import { useState, useMemo } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/components/AuthProvider";

interface SidebarProps {
  onClose?: () => void;
}

// Category icons mapping
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Instagram": Instagram,
  "Twitter": Twitter,
  "YouTube": Youtube,
  "Facebook": Facebook,
  "Content": Type,
  "Text Tools": Hash,
  "Image Tools": ImageIcon,
  "Design": Palette,
  "Links": LinkIcon,
  "Planning": Calendar,
  "Analytics": BarChart3,
  "SEO": FileText,
  "Converters": FileText,
  "Vimeo": Video,
  "Miscellaneous": Settings,
};

// Category display names and ordering
const categoryConfig: Array<{ name: string; displayName: string; icon: React.ComponentType<{ className?: string }> }> = [
  { name: "Instagram", displayName: "Instagram Tools", icon: Instagram },
  { name: "Twitter", displayName: "Twitter Tools", icon: Twitter },
  { name: "YouTube", displayName: "YouTube Tools", icon: Youtube },
  { name: "Facebook", displayName: "Facebook Tools", icon: Facebook },
  { name: "Content", displayName: "Content Tools", icon: Type },
  { name: "Design", displayName: "Design Tools", icon: Palette },
  { name: "Links", displayName: "Link Tools", icon: LinkIcon },
  { name: "Planning", displayName: "Planning Tools", icon: Calendar },
  { name: "Analytics", displayName: "Analytics Tools", icon: BarChart3 },
  { name: "SEO", displayName: "SEO Tools", icon: FileText },
  { name: "Converters", displayName: "Converters", icon: FileText },
  { name: "Vimeo", displayName: "Vimeo Tools", icon: Youtube },
];

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { favorites, loading: favoritesLoading } = useFavorites();
  const [favoritesExpanded, setFavoritesExpanded] = useState(true);
  
  // Get all categories from tools
  const allCategories = useMemo(() => {
    return Array.from(new Set(socialTools.map(tool => tool.category)));
  }, []);

  // Create category list with icons, only including categories that have tools
  const categories = useMemo(() => {
    return categoryConfig
      .filter(config => allCategories.includes(config.name))
      .concat(
        allCategories
          .filter(cat => !categoryConfig.find(c => c.name === cat))
          .map(cat => ({
            name: cat,
            displayName: cat,
            icon: categoryIcons[cat] || Settings
          }))
      );
  }, [allCategories]);
  
  // Only expand first category by default for better UX
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    return new Set(categories.length > 0 ? [categories[0].name] : []);
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (onClose && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen lg:h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
      {/* Desktop Header */}
      <div className="hidden lg:block p-4 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Tool Categories
        </h2>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-shrink-0">
        <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Tool Categories
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </button>
        )}
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <ul className="py-2">
          {/* All Tools Link */}
          <li className="mb-1">
            <Link
              href="/tools"
              onClick={handleLinkClick}
              className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-colors ${
                pathname === "/tools"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <Sparkles className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">All Tools</span>
            </Link>
          </li>

          {/* Favorites Section - Only show if user is logged in */}
          {user && (
            <>
              <li className="border-t border-slate-200 dark:border-slate-700 my-2"></li>
              <li className="mb-1">
                <button
                  onClick={() => setFavoritesExpanded(!favoritesExpanded)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 mx-2 rounded-lg transition-colors ${
                    favorites.some(tool => pathname === tool.path)
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">Favorite Tools</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      favoritesExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {favoritesExpanded && (
                  <ul className="mt-1 space-y-0.5">
                    {favoritesLoading ? (
                      <li className="px-4 py-2 mx-2 ml-8 text-sm text-slate-500 dark:text-slate-400">
                        Loading...
                      </li>
                    ) : favorites.length === 0 ? (
                      <li className="px-4 py-2 mx-2 ml-8 text-sm text-slate-500 dark:text-slate-400">
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
                              className={`flex items-center gap-3 px-4 py-2 mx-2 ml-8 rounded-lg transition-colors ${
                                isActive
                                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium"
                                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                              }`}
                            >
                              <Icon className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm truncate">{tool.name}</span>
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

          {/* Divider */}
          <li className="border-t border-slate-200 dark:border-slate-700 my-2"></li>

          {/* Category Sections */}
          {categories.map((categoryConfig) => {
            const categoryTools = getToolsByCategory(categoryConfig.name);
            const isCategoryExpanded = expandedCategories.has(categoryConfig.name);
            const CategoryIcon = categoryConfig.icon;
            const hasActiveTool = categoryTools.some(tool => pathname === tool.path);
            
            return (
              <li key={categoryConfig.name} className="mb-1">
                <button
                  onClick={() => toggleCategory(categoryConfig.name)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 mx-2 rounded-lg transition-colors ${
                    hasActiveTool
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CategoryIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{categoryConfig.displayName}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      isCategoryExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isCategoryExpanded && (
                  <ul className="mt-1 space-y-0.5">
                    {categoryTools.map((tool) => {
                      const Icon = tool.icon;
                      const isActive = pathname === tool.path;
                      
                      return (
                        <li key={tool.id}>
                          <Link
                            href={tool.path}
                            onClick={handleLinkClick}
                            className={`flex items-center gap-3 px-4 py-2 mx-2 ml-8 rounded-lg transition-colors ${
                              isActive
                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }`}
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm truncate">{tool.name}</span>
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

