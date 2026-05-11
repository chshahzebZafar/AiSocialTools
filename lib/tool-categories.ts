/**
 * Top-level tool category hubs — the cards shown on /tools.
 *
 * Adding a new category:
 *   1. Append an entry below.
 *   2. Create `app/tools/{slug}/page.tsx` and `layout.tsx`.
 *   3. Add to sitemap.ts.
 *   4. Rebuild + redeploy.
 *
 * Status:
 *   - "live"        = clickable, has tools
 *   - "coming-soon" = clickable, placeholder page with waitlist
 *   - "planned"     = visible but greyed out, no link
 */

import type { LucideIcon } from "lucide-react";
import {
  Share2,
  HardHat,
  Wallet,
  Home,
  HeartPulse,
  Code2,
  GraduationCap,
} from "lucide-react";
import { socialTools } from "./social-tools";
import { categoryTools } from "./category-tools";

const countLive = (slug: string) =>
  categoryTools.filter((t) => t.category === slug).length;

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
  {
    slug: "construction",
    name: "Construction Tools",
    tagline: "Free calculators and planners for builders.",
    description:
      "Calculators, estimators, and planners for contractors, builders, and DIYers. First tool live, more on the way.",
    url: "/tools/construction",
    icon: HardHat,
    toolCount: countLive("construction"),
    status: countLive("construction") > 0 ? "live" : "coming-soon",
    highlights: [
      "Material estimators",
      "Cost calculators",
      "Roof & stair planners",
      "Unit converters",
    ],
  },
  {
    slug: "finance",
    name: "Finance Tools",
    tagline: "Free calculators for everyday money decisions.",
    description:
      "Mortgage, compound interest, loan, retirement, and tax calculators. First two live, more on the way.",
    url: "/tools/finance",
    icon: Wallet,
    toolCount: countLive("finance"),
    status: countLive("finance") > 0 ? "live" : "coming-soon",
    highlights: [
      "Mortgage & loans",
      "Compound interest",
      "Tax & income",
      "Retirement planning",
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate Tools",
    tagline: "Calculators for buyers, sellers, and investors.",
    description:
      "Coming soon — affordability, rent vs. buy, cap rate, ROI, and closing-cost calculators for the real-estate workflow.",
    url: "/tools/real-estate",
    icon: Home,
    toolCount: 0,
    status: "coming-soon",
    highlights: [
      "Mortgage affordability",
      "Rent vs. buy",
      "Cap rate & ROI",
      "Closing cost estimator",
    ],
  },
  {
    slug: "health-fitness",
    name: "Health & Fitness Tools",
    tagline: "Calculators for body, training, and nutrition.",
    description:
      "BMI, calorie, body-fat, heart-rate, and training calculators. BMI live now, more on the way.",
    url: "/tools/health-fitness",
    icon: HeartPulse,
    toolCount: countLive("health-fitness"),
    status: countLive("health-fitness") > 0 ? "live" : "coming-soon",
    highlights: [
      "BMI & body fat",
      "Calories & TDEE",
      "Heart-rate zones",
      "Pace & training",
    ],
  },
  {
    slug: "developer",
    name: "Developer Tools",
    tagline: "Quick utilities every coder needs daily.",
    description:
      "Coming soon — JSON formatter, base64, URL encoder, UUID, regex tester, and dozens more. All client-side, your data never leaves your browser.",
    url: "/tools/developer",
    icon: Code2,
    toolCount: 0,
    status: "coming-soon",
    highlights: [
      "Formatters & converters",
      "Encoders & hashes",
      "Generators (UUID, lorem)",
      "Regex & validators",
    ],
  },
  {
    slug: "education",
    name: "Education Tools",
    tagline: "Calculators and helpers for students.",
    description:
      "GPA, grade, citation, study planner, and reading-time calculators. GPA Calculator live, more on the way.",
    url: "/tools/education",
    icon: GraduationCap,
    toolCount: countLive("education"),
    status: countLive("education") > 0 ? "live" : "coming-soon",
    highlights: [
      "GPA & grade calculators",
      "Citation generators",
      "Study planners",
      "Reading-time estimators",
    ],
  },
];

export function getCategoryHubBySlug(slug: string): ToolCategoryHub | undefined {
  return toolCategoryHubs.find((c) => c.slug === slug);
}
