"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search, 
  Menu, 
  X, 
  Home, 
  Info, 
  Mail, 
  HelpCircle,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { socialTools } from "@/lib/social-tools";

export default function Header() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter tools based on search query
  const filteredTools = searchQuery
    ? socialTools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Close search when clicking outside
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

  // Close mobile menu and search on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleToolClick = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline-block">
              Social Media Tools
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Home className="w-4 h-4 inline mr-1" />
              Home
            </Link>
            
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-4 h-4" />
                Tools
                <ChevronDown className={`w-3 h-3 transition-transform ${isToolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isToolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 p-2 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-1 gap-1">
                    {socialTools.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={tool.id}
                          href={tool.path}
                          onClick={() => setIsToolsDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <Icon className="w-4 h-4 text-slate-500" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-slate-900">{tool.name}</div>
                            <div className="text-xs text-slate-500 truncate">{tool.description}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/about"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Info className="w-4 h-4 inline mr-1" />
              About
            </Link>
            <Link
              href="/contact"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/contact"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Mail className="w-4 h-4 inline mr-1" />
              Contact
            </Link>
            <Link
              href="/faq"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/faq"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <HelpCircle className="w-4 h-4 inline mr-1" />
              FAQ
            </Link>
          </nav>

          {/* Search */}
          <div className="hidden md:block relative flex-1 max-w-md mx-4" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
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
                placeholder="Search tools..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {isSearchOpen && filteredTools.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-200 max-h-96 overflow-y-auto z-50">
                <div className="p-2">
                  <div className="text-xs font-semibold text-slate-500 px-3 py-2">
                    Found {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""}
                  </div>
                  {filteredTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.id}
                        href={tool.path}
                        onClick={handleToolClick}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <Icon className="w-5 h-5 text-slate-500" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-slate-900">{tool.name}</div>
                          <div className="text-xs text-slate-500 truncate">{tool.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            {isSearchOpen && searchQuery && filteredTools.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-200 p-4 z-50">
                <p className="text-sm text-slate-500 text-center">No tools found</p>
              </div>
            )}
          </div>

          {/* Mobile Search & Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-6 h-6 text-slate-700" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-700" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden pb-4" ref={searchRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                  }
                }}
                placeholder="Search tools..."
                className="w-full pl-10 pr-10 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Search Results */}
            {searchQuery && filteredTools.length > 0 && (
              <div className="mt-2 bg-white rounded-lg border border-slate-200 max-h-64 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs font-semibold text-slate-500 px-3 py-2">
                    Found {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""}
                  </div>
                  {filteredTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.id}
                        href={tool.path}
                        onClick={handleToolClick}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <Icon className="w-5 h-5 text-slate-500" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-slate-900">{tool.name}</div>
                          <div className="text-xs text-slate-500 truncate">{tool.description}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            {searchQuery && filteredTools.length === 0 && (
              <div className="mt-2 bg-white rounded-lg border border-slate-200 p-4">
                <p className="text-sm text-slate-500 text-center">No tools found</p>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4">
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  pathname === "/"
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link
                href="/about"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  pathname === "/about"
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Info className="w-4 h-4" />
                About
              </Link>
              <Link
                href="/contact"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  pathname === "/contact"
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Mail className="w-4 h-4" />
                Contact
              </Link>
              <Link
                href="/faq"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  pathname === "/faq"
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                FAQ
              </Link>
              <div className="px-4 py-2">
                <div className="text-xs font-semibold text-slate-500 mb-2">All Tools</div>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {socialTools.slice(0, 10).map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.id}
                        href={tool.path}
                        className="flex items-center gap-2 px-2 py-1.5 rounded text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-slate-500" />
                        <span>{tool.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

