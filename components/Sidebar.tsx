"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { socialTools } from "@/lib/social-tools";
import { ChevronUp, X } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Social Media Tools
            </h2>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
            aria-label="Toggle sidebar"
          >
            <ChevronUp 
              className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform ${isExpanded ? '' : 'rotate-180'}`} 
            />
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Menu
          </h2>
        </div>
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
      
      {isExpanded && (
        <nav className="p-2 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {socialTools.map((tool) => {
              const Icon = tool.icon;
              const isActive = pathname === tool.path;
              
              return (
                <li key={tool.id}>
                  <Link
                    href={tool.path}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-l-4 border-blue-600 dark:border-blue-400"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"}`} />
                    <span className="text-sm font-medium truncate">{tool.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </aside>
  );
}

