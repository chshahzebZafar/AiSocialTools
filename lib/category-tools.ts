/**
 * Live tools that live under category hubs (finance, health-fitness, etc.)
 *
 * Distinct from `socialTools` in lib/social-tools.ts which has its own
 * legacy data shape.
 *
 * Adding a new live tool:
 *   1. Append an entry here.
 *   2. Create the page at `app/tools/{category}/{slug}/page.tsx`.
 *   3. Add to sitemap.ts.
 *   4. Bump `toolCount` in lib/tool-categories.ts if the category is now live.
 */

import type { LucideIcon } from "lucide-react";
import { Scale, TrendingUp, Calculator, Hammer, GraduationCap, Ruler, Home, Footprints, Layers, PaintBucket, Grid3X3, Fence } from "lucide-react";

export interface CategoryTool {
  slug: string;
  /** Matches a slug in lib/tool-categories.ts */
  category: string;
  name: string;
  /** Short tagline shown on cards */
  tagline: string;
  /** Longer description for SEO */
  description: string;
  /** Full path — must match the file path */
  path: string;
  icon: LucideIcon;
  isNew?: boolean;
}

export const categoryTools: CategoryTool[] = [
  {
    slug: "bmi-calculator",
    category: "health-fitness",
    name: "BMI Calculator",
    tagline: "Body Mass Index with healthy-weight range, metric & imperial.",
    description:
      "Free BMI calculator with metric and imperial units. Shows BMI category, healthy weight range, and side-by-side comparison.",
    path: "/tools/health-fitness/bmi-calculator",
    icon: Scale,
    isNew: true,
  },
  {
    slug: "compound-interest-calculator",
    category: "finance",
    name: "Compound Interest Calculator",
    tagline: "See how money grows with monthly contributions and any compounding.",
    description:
      "Free compound interest calculator with monthly contributions, daily/monthly/yearly compounding, and a year-by-year growth table.",
    path: "/tools/finance/compound-interest-calculator",
    icon: TrendingUp,
    isNew: true,
  },
  {
    slug: "mortgage-calculator",
    category: "finance",
    name: "Mortgage Calculator",
    tagline: "Monthly payment, total interest, and full amortization schedule.",
    description:
      "Free mortgage calculator with property tax, insurance, HOA, monthly payment breakdown, and a full amortization schedule.",
    path: "/tools/finance/mortgage-calculator",
    icon: Calculator,
    isNew: true,
  },
  {
    slug: "concrete-calculator",
    category: "construction",
    name: "Concrete Calculator",
    tagline: "Cubic yards, bags, and cost for slabs, footings, and columns.",
    description:
      "Free concrete calculator for slabs, footings, and columns. Outputs cubic yards, 60/80 lb bag counts, and cost estimate.",
    path: "/tools/construction/concrete-calculator",
    icon: Hammer,
    isNew: true,
  },
  {
    slug: "lumber-calculator",
    category: "construction",
    name: "Lumber Calculator",
    tagline: "Board feet, framing studs, and sheet goods with waste & cost.",
    description:
      "Free lumber calculator for framing studs, boards & trim, and plywood/OSB sheet goods. Board feet, m³, waste allowance, and cost estimate. Imperial and metric.",
    path: "/tools/construction/lumber-calculator",
    icon: Ruler,
    isNew: true,
  },
  {
    slug: "roof-pitch-calculator",
    category: "construction",
    name: "Roof Pitch Calculator",
    tagline: "Convert pitch ratios, calculate rafter length, slope angle, and rise.",
    description:
      "Free roof pitch calculator. Convert rise/run to pitch ratio, degrees, and percent slope. Calculate rafter length with overhang. Imperial and metric.",
    path: "/tools/construction/roof-pitch-calculator",
    icon: Home,
    isNew: true,
  },
  {
    slug: "drywall-estimator",
    category: "construction",
    name: "Drywall Estimator",
    tagline: "Sheets, screws, mud, and tape for any room with deductions and waste.",
    description:
      "Free drywall estimator. Calculate sheets, screws, joint compound, and tape for any room. Multiple rooms, door/window deductions, waste factor, cost estimate, and PDF export. Imperial and metric.",
    path: "/tools/construction/drywall-estimator",
    icon: Layers,
    isNew: true,
  },
  {
    slug: "stair-calculator",
    category: "construction",
    name: "Stair Calculator",
    tagline: "Riser count, tread depth, stringer length, and IRC code check.",
    description:
      "Free stair calculator. Enter total rise and run to get riser count, riser height, tread depth, stringer length, headroom clearance, and lumber cost. IRC code-compliant. Imperial and metric.",
    path: "/tools/construction/stair-calculator",
    icon: Footprints,
    isNew: true,
  },
  {
    slug: "paint-calculator",
    category: "construction",
    name: "Paint Calculator",
    tagline: "Estimate gallons, primer, and cost for walls and ceilings.",
    description:
      "Free paint calculator. Calculate gallons needed for walls and ceilings. Accounts for doors, windows, multiple coats, waste factor, primer, and cost. Multiple rooms, PDF export. Imperial and metric.",
    path: "/tools/construction/paint-calculator",
    icon: PaintBucket,
    isNew: true,
  },
  {
    slug: "flooring-calculator",
    category: "construction",
    name: "Flooring Calculator",
    tagline: "Estimate hardwood, laminate, vinyl, carpet, and tile materials and cost.",
    description:
      "Free flooring calculator. Calculate square footage, planks/tiles needed, boxes to purchase, and material cost for hardwood, laminate, vinyl, carpet, and tile. L-shape rooms, custom specs, PDF export. Imperial and metric.",
    path: "/tools/construction/flooring-calculator",
    icon: Grid3X3,
    isNew: true,
  },
  {
    slug: "tile-calculator",
    category: "construction",
    name: "Tile Calculator",
    tagline: "Tiles needed for floors, walls, and backsplashes with grout and waste.",
    description:
      "Free tile calculator. Calculate tiles needed for floors, walls, and backsplashes. Accounts for grout spacing, pattern layout (straight, diagonal, herringbone), waste factor, and material cost. Multiple rooms, PDF export. Ceramic, porcelain, subway, mosaic, and large format tiles.",
    path: "/tools/construction/tile-calculator",
    icon: Grid3X3,
    isNew: true,
  },
  {
    slug: "square-footage-calculator",
    category: "construction",
    name: "Square Footage Calculator",
    tagline: "Calculate area for rooms, yards, and irregular shapes in sq ft or meters.",
    description:
      "Free square footage calculator. Calculate area for rooms, houses, yards, and irregular shapes. Supports rectangles, L-shapes, triangles, and circles. Converts between feet, inches, meters, and yards. Cost estimation and PDF export. Perfect for flooring, paint, and real estate.",
    path: "/tools/construction/square-footage-calculator",
    icon: Calculator,
    isNew: true,
  },
  {
    slug: "roofing-calculator",
    category: "construction",
    name: "Roofing Calculator",
    tagline: "Roofing squares, shingles, underlayment, and material cost for any roof shape.",
    description:
      "Free roofing calculator. Estimate roofing squares, shingle bundles, underlayment, ice & water shield, drip edge, ridge vent, and total material cost. Supports gable, hip, gambrel, and flat roofs. Multiple sections, waste factor, slope calculations, and PDF export.",
    path: "/tools/construction/roofing-calculator",
    icon: Home,
    isNew: true,
  },
  {
    slug: "fence-calculator",
    category: "construction",
    name: "Fence Calculator",
    tagline: "Posts, rails, panels, and concrete for any fence length and style.",
    description:
      "Free fence calculator. Estimate fence posts, rails, panels, concrete bags, and total material cost for wood, vinyl, chain-link, split-rail, and aluminum fences. Supports multiple sections, gate openings, post spacing, waste factor, and PDF export.",
    path: "/tools/construction/fence-calculator",
    icon: Fence,
    isNew: true,
  },
  {
    slug: "mulch-calculator",
    category: "construction",
    name: "Mulch Calculator",
    tagline: "Cubic yards and bags of mulch for any garden bed or landscape area.",
    description:
      "Free mulch calculator. Calculate cubic yards and bags of mulch needed for any garden bed or landscape area. Supports rectangular, circular, and triangular beds, multiple areas, depth settings, bulk vs. bagged cost comparison, and PDF export.",
    path: "/tools/construction/mulch-calculator",
    icon: Layers,
    isNew: true,
  },
  {
    slug: "gpa-calculator",
    category: "education",
    name: "GPA Calculator",
    tagline: "Calculate semester or cumulative GPA on 4.0 or 5.0 scale.",
    description:
      "Free GPA calculator for semester or cumulative GPA. Supports weighted and unweighted on 4.0 and 5.0 scales.",
    path: "/tools/education/gpa-calculator",
    icon: GraduationCap,
    isNew: true,
  },
];

export function getCategoryToolsBy(category: string): CategoryTool[] {
  return categoryTools.filter((t) => t.category === category);
}

export function getCategoryToolBySlug(slug: string): CategoryTool | undefined {
  return categoryTools.find((t) => t.slug === slug);
}
