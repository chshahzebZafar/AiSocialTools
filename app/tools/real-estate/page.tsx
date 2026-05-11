"use client";

import {
  Home,
  Calculator,
  TrendingUp,
  Percent,
  Building2,
  DollarSign,
} from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";

const plannedTools: PlannedTool[] = [
  {
    icon: Home,
    name: "Mortgage Affordability Calculator",
    description:
      "How much house you can afford given income, debt, down payment, and target DTI.",
  },
  {
    icon: Calculator,
    name: "Rent vs. Buy Calculator",
    description:
      "Break-even analysis with property taxes, maintenance, and opportunity cost of down payment.",
  },
  {
    icon: TrendingUp,
    name: "Property ROI Calculator",
    description:
      "Cash flow, appreciation, tax benefit, and total return on any rental property.",
  },
  {
    icon: Percent,
    name: "Cap Rate Calculator",
    description:
      "Capitalization rate, gross rent multiplier, and price-per-door for investment analysis.",
  },
  {
    icon: DollarSign,
    name: "Cash-on-Cash Return",
    description:
      "True yield on the actual cash you put in — the metric flippers and BRRRR investors live by.",
  },
  {
    icon: Building2,
    name: "Closing Cost Estimator",
    description:
      "All-in closing costs by state — loan origination, title, escrow, taxes, recording fees.",
  },
];

export default function RealEstateToolsPage() {
  return (
    <ComingSoonCategoryPage
      slug="real-estate"
      shortName="Real Estate"
      longName="Real Estate Tools"
      launchWindow="Q2 2026"
      Icon={Home}
      headline={{ first: "Real-estate math,", second: "done right." }}
      subheadline="Free calculators for the decisions that move six figures — affordability, rent vs. buy, ROI, cap rate, closing costs. Built for actual house-buying and investing workflows."
      plannedToolsHeading="Six tools to start."
      plannedToolsBlurb="The most-requested calculators for first-time buyers, agents, and rental investors. More will ship as we get user feedback."
      plannedTools={plannedTools}
      suggestHeading="Different calculation in your workflow?"
      suggestBlurb="If you're an agent, investor, or first-time buyer with a calculation you keep redoing — let us know. Real workflows shape the priority list."
    />
  );
}
