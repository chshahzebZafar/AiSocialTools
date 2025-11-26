"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on homepage
  if (pathname === "/") {
    return null;
  }

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Home", href: "/" },
    ];

    let currentPath = "";
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      
      // Format label
      let label = path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Special cases
      if (path === "tools") {
        label = "All Tools";
      } else if (path === "faq") {
        label = "FAQ";
      }

      breadcrumbs.push({
        label,
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Generate structured data for breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `https://socialmediatools.netlify.app${crumb.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <nav
        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-4 px-4 sm:px-6 lg:px-8 pt-4"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-2 flex-wrap">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {index === 0 ? (
                  <Link
                    href={crumb.href}
                    className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                    aria-label="Home"
                  >
                    <Home className="w-4 h-4" />
                  </Link>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    {isLast ? (
                      <span className="text-slate-900 dark:text-slate-100 font-medium" aria-current="page">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

