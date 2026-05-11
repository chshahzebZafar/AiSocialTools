"use client";

import {
  DollarSign,
  Percent,
  PiggyBank,
  TrendingUp,
  Banknote,
  Calculator,
  Wallet,
} from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";
import { getCategoryToolsBy } from "@/lib/category-tools";

const plannedTools: PlannedTool[] = [
  {
    icon: Calculator,
    name: "Mortgage Calculator",
    description:
      "Monthly payment, total interest, amortization schedule for any rate, term, and down payment.",
  },
  {
    icon: Percent,
    name: "Loan Repayment Calculator",
    description:
      "Payment, payoff date, and total interest for personal, auto, or student loans.",
  },
  {
    icon: TrendingUp,
    name: "Compound Interest Calculator",
    description:
      "How your money grows over time — monthly, yearly, or arbitrary compounding.",
  },
  {
    icon: PiggyBank,
    name: "Retirement Savings Calculator",
    description:
      "How much you'll have at 65 (or any age) given current savings, contributions, and return.",
  },
  {
    icon: DollarSign,
    name: "Tax Bracket Calculator",
    description:
      "Federal income tax owed at any salary, with brackets visualised as a stacked chart.",
  },
  {
    icon: Banknote,
    name: "Salary to Hourly Converter",
    description:
      "Annual → hourly, weekly, monthly across countries with paid-time-off adjustments.",
  },
];

export default function FinanceToolsPage() {
  return (
    <ComingSoonCategoryPage
      slug="finance"
      shortName="Finance"
      longName="Finance Tools"
      launchWindow="Q2 2026"
      Icon={Wallet}
      headline={{ first: "Money math,", second: "without the spreadsheet." }}
      subheadline="Free calculators for the financial decisions you actually face — mortgages, loans, retirement, taxes. All client-side. Your numbers never leave your browser."
      plannedToolsHeading="Six calculators on the way."
      plannedToolsBlurb="Starting with the most-searched financial tools. Honest math, no upsell to a financial advisor."
      plannedTools={plannedTools}
      liveTools={getCategoryToolsBy("finance")}
      suggestHeading="What calculator do you need?"
      suggestBlurb="If you've been jury-rigging a spreadsheet for a recurring financial decision, we want to know. The most-requested calculators ship first."
    />
  );
}
