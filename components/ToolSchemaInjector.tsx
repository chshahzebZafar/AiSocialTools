"use client";

/**
 * ToolSchemaInjector
 *
 * Renders two JSON-LD <script> tags for whichever tool page is currently
 * active:
 *   1. WebApplication — free tool offer card
 *   2. BreadcrumbList — Home › Tools › [Tool Name]
 *
 * Injected once inside ToolLayout so all 55+ live tool pages get
 * structured data automatically without touching individual page files.
 *
 * Why "use client": ToolLayout is already a client component. usePathname()
 * resolves on the server during SSR, so both schemas are present in the
 * initial HTML and fully visible to Googlebot.
 */

import { usePathname } from "next/navigation";
import { socialTools } from "@/lib/social-tools";

const BASE_URL = "https://aisocialtools.co";

export default function ToolSchemaInjector() {
  const pathname = usePathname();

  // Match by exact path (e.g. /tools/tweet-generator)
  const tool = socialTools.find((t) => t.path === pathname);

  if (!tool) return null;

  const toolUrl = `${BASE_URL}${tool.path}`;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url: toolUrl,
    description: tool.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    ...(tool.category && { applicationSubCategory: tool.category }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${BASE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: toolUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
