"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import ToolSchemaInjector from "@/components/ToolSchemaInjector";
import { X } from "lucide-react";

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950">
      {/* WebApplication JSON-LD schema — injected once here so all 55 tool
          pages get structured data without touching individual page files */}
      <ToolSchemaInjector />

      {/* Main Header - Full width */}
      <Header />

      {/* Content Area with Sidebar and Main Content */}
      <div className="flex flex-1 relative">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Sticky on left side, scrolls with page */}
        <aside
          className={`
            fixed lg:sticky lg:top-16 left-0 h-screen lg:h-[calc(100vh-4rem)] z-40
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </aside>

        {/* Main Content - 40px gap from sidebar on desktop */}
              <main className="flex-1 w-full min-w-0 lg:ml-10">
                <Breadcrumbs />
                {children}
              </main>
      </div>
      
      {/* Footer - Full width at the bottom, independent of sidebar */}
      <Footer />
    </div>
  );
}

