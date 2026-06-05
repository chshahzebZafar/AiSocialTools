/**
 * Top-level tool category hubs — the cards shown on /tools.
 *
 * The site is focused on social media tools + the AI directory. Other
 * categories (construction, finance, health, education, and the various
 * "coming soon" placeholders) were removed; construction moved to its own
 * site (freeconstructiontools.com).
 *
 * Status:
 *   - "live"        = clickable, has tools
 *   - "coming-soon" = clickable, placeholder page with waitlist
 *   - "planned"     = visible but greyed out, no link
 */

import type { LucideIcon } from "lucide-react";
import { Share2 } from "lucide-react";
import { socialTools } from "./social-tools";

export type ToolCategoryStatus = "live" | "coming-soon" | "planned";

export interface ToolCategoryHub {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  icon: LucideIcon;
  toolCount: number;
  status: ToolCategoryStatus;
  /** subset of category labels you'll see on the inner page */
  highlights?: string[];
}

export const toolCategoryHubs: ToolCategoryHub[] = [
  {
    slug: "social-media",
    name: "Social Media Tools",
    tagline: "Free tools for content, image, and growth.",
    description:
      "Generate tweets, download thumbnails, count hashtags, compress images, and more — all in your browser, no signup required.",
    url: "/tools/social-media",
    icon: Share2,
    toolCount: socialTools.length,
    status: "live",
    highlights: [
      "Content generators",
      "Image & video tools",
      "Analytics calculators",
      "Platform utilities",
    ],
  },
];

export function getCategoryHubBySlug(slug: string): ToolCategoryHub | undefined {
  return toolCategoryHubs.find((c) => c.slug === slug);
}
