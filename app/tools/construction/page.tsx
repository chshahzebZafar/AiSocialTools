"use client";

import { Calculator, Ruler, Hammer, HardHat } from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";
import { getCategoryToolsBy } from "@/lib/category-tools";

const plannedTools: PlannedTool[] = [
  {
    icon: Calculator,
    name: "Concrete Calculator",
    description:
      "Cubic-yard, bag, and cost estimates for slabs, footings, and columns.",
  },
  {
    icon: Ruler,
    name: "Lumber Estimator",
    description:
      "Board-foot calculator with waste factor and stock-length optimizer.",
  },
  {
    icon: Hammer,
    name: "Roof Pitch Calculator",
    description:
      "Convert pitch ratios, calculate rafter length, slope angle, and rise.",
  },
  {
    icon: Ruler,
    name: "Stair Calculator",
    description:
      "Total rise, run, tread depth, riser height — code-compliant in seconds.",
  },
  {
    icon: Calculator,
    name: "Drywall Estimator",
    description: "Sheets, screws, mud, and tape needed for any room dimensions.",
  },
  {
    icon: Ruler,
    name: "Paint Coverage",
    description: "Gallons needed for any wall area with two-coat and trim allowances.",
  },
];

export default function ConstructionToolsPage() {
  return (
    <ComingSoonCategoryPage
      slug="construction"
      shortName="Construction"
      longName="Construction Tools"
      launchWindow="Early 2026"
      Icon={HardHat}
      headline={{ first: "Construction tools,", second: "built right." }}
      subheadline="We're building a curated set of free calculators, estimators, and planners for contractors, builders, and DIYers. No signup, no upsell."
      plannedToolsHeading="Six tools to start."
      plannedToolsBlurb="The first batch covers the most-requested estimating workflows. More will ship monthly based on user feedback."
      plannedTools={plannedTools}
      liveTools={getCategoryToolsBy("construction")}
      suggestHeading="Need a specific calculator?"
      suggestBlurb="We're building from real use cases. If you do construction work and have a calculation you redo every week, tell us — we'll prioritize it."
    />
  );
}
