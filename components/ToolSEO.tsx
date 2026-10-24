"use client";

import { SocialTool } from "@/lib/social-tools";
import {
  getEnhancedFAQSchema,
  getEnhancedHowToSchema
} from "@/lib/enhanced-schemas";

/**
 * The FAQ and HowTo markup for a tool page.
 *
 * It used to emit the application entity too, which meant every tool page
 * described itself three times: a WebApplication from here, a second, poorer
 * WebApplication from ToolSchemaInjector's richer twin, and a third
 * SoftwareApplication from getReviewSchema. Three entities for one tool is a
 * conflict Google resolves by picking one, and the one it picked was not
 * reliably the best.
 *
 * ToolSchemaInjector now owns the application entity alone. Its version
 * carries browserRequirements, offer availability and an applicationSubCategory
 * that this one lacked, and it uses the valid "UtilitiesApplication" category
 * where this one used "UtilityApplication", which is not a schema.org value.
 * Every page that renders ToolSEO also renders ToolSchemaInjector - verified
 * across all 48 - so nothing loses its markup by this being dropped.
 *
 * The SoftwareApplication from getReviewSchema went with it. It had already
 * been stripped of its rating and review count, leaving a stub that repeated
 * the name, category and a $0 offer and said nothing the application entity
 * did not already say.
 */
interface ToolSEOProps {
  tool: SocialTool;
}

export default function ToolSEO({ tool }: ToolSEOProps) {
  const faqSchema = getEnhancedFAQSchema(tool);
  const howToSchema = getEnhancedHowToSchema(tool);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  );
}
