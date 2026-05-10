"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { socialTools } from "@/lib/social-tools";
import { AuthButtons } from "./AuthButtons";

const navLinks: Array<{ href: string; label: string; badge?: string }> = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/ai-tools", label: "AI Tools", badge: "New" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredTools = searchQuery
    ? socialTools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-8 h-8 bg-zinc-950 dark:bg-white rounded-md flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-3 h-3 bg-white dark:bg-zinc-950 rounded-sm" />
            </div>
            <span className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight hidden sm:inline-block">
              Social Tools
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${
                    active
                      ? "text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-800"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="inline-flex items-center px-1.5 h-4 rounded text-[10px] font-semibold bg-indigo-600 text-white leading-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                className="px-3 py-1.5 rounded-md text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors flex items-center gap-1"
              >
                Browse
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    isToolsDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isToolsDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800 p-1.5 max-h-96 overflow-y-auto">
                  {socialTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.id}
                        href={tool.path}
                        onClick={() => setIsToolsDropdownOpen(false)}
                        className="flex items-center gap-3 px-2.5 py-2 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                            {tool.name}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                            {tool.description}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Search */}
          <div className="hidden md:block relative flex-1 max-w-xs mx-4" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(e.target.value.length > 0);
                }}
                onFocus={() => {
                  if (searchQuery) setIsSearchOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                  }
                }}
                placeholder="Search tools…"
                aria-label="Search tools"
                className="w-full pl-9 pr-3 h-9 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {isSearchOpen && filteredTools.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800 max-h-96 overflow-y-auto z-50 p-1.5">
                <div className="text-xs font-medium text-zinc-500 px-2.5 py-1.5">
                  {filteredTools.length} result{filteredTools.length !== 1 ? "s" : ""}
                </div>
                {filteredTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.id}
                      href={tool.path}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 px-2.5 py-2 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                          {tool.name}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                          {tool.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
            {isSearchOpen && searchQuery && filteredTools.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 z-50">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">No tools found</p>
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1.5">
            <div className="hidden md:flex items-center gap-1.5">
              <AuthButtons />
            </div>
            <div className="flex items-center gap-1 lg:hidden">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                ) : (
                  <Menu className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        {isSearchOpen && (
          <div className="lg:hidden pb-4" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                  }
                }}
                placeholder="Search tools…"
                aria-label="Search tools"
                className="w-full pl-9 pr-9 h-10 border border-zinc-200 dark:border-zinc-800 rounded-md focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 text-sm bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {searchQuery && filteredTools.length > 0 && (
              <div className="mt-2 bg-white dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800 max-h-64 overflow-y-auto p-1.5">
                {filteredTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.id}
                      href={tool.path}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 px-2.5 py-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{tool.name}</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{tool.description}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 py-3">
            <nav className="flex flex-col gap-0.5">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center gap-1.5 ${
                      active
                        ? "text-zinc-950 dark:text-white bg-zinc-100 dark:bg-zinc-800"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="inline-flex items-center px-1.5 h-4 rounded text-[10px] font-semibold bg-indigo-600 text-white leading-none">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
