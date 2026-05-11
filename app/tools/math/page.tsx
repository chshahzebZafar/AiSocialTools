"use client";

import {
  Calculator,
  Percent,
  BarChart3,
  Divide,
  Hash,
  TrendingUp,
  Binary,
  Pi,
  Triangle,
  Sigma,
} from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";

const plannedTools: PlannedTool[] = [
  { icon: Percent, name: "Percentage Calculator", description: "What % is X of Y, percentage increase/decrease, and reverse percentage — all in one tool." },
  { icon: BarChart3, name: "Average Calculator", description: "Calculate mean, median, mode, and range for any set of numbers." },
  { icon: Divide, name: "Fraction Calculator", description: "Add, subtract, multiply, and divide fractions with step-by-step working shown." },
  { icon: Hash, name: "Scientific Notation Converter", description: "Convert between standard notation and scientific notation in both directions." },
  { icon: Binary, name: "Number Base Converter", description: "Convert numbers between binary, octal, decimal, and hexadecimal instantly." },
  { icon: TrendingUp, name: "Exponent Calculator", description: "Calculate any base raised to any power, including fractional and negative exponents." },
  { icon: Calculator, name: "Square Root Calculator", description: "Calculate square root, cube root, or nth root of any number with decimal precision." },
  { icon: Pi, name: "Prime Number Checker", description: "Check if any number is prime and find the prime factorization with step-by-step breakdown." },
  { icon: Sigma, name: "Summation Calculator", description: "Calculate the sum of any arithmetic or geometric series with sigma notation support." },
  { icon: Triangle, name: "Triangle Calculator", description: "Solve any triangle given sides and/or angles using law of sines, cosines, and Heron's formula." },
  { icon: Calculator, name: "LCM & GCF Calculator", description: "Find the Least Common Multiple and Greatest Common Factor of any two or more numbers." },
  { icon: Pi, name: "Circle Calculator", description: "Calculate area, circumference, diameter, or radius from any one known value." },
];

export default function MathToolsPage() {
  return (
    <ComingSoonCategoryPage
      slug="math"
      shortName="Math"
      longName="Math Calculators"
      launchWindow="2026"
      Icon={Calculator}
      headline={{ first: "Math calculators,", second: "step by step." }}
      subheadline="Free calculators for percentages, fractions, averages, exponents, primes, and more. Clear working shown — not just the answer."
      plannedToolsHeading="12 calculators on the way."
      plannedToolsBlurb="Every common math calculation from middle school through college, with step-by-step explanations. No subscription, no ads."
      plannedTools={plannedTools}
      suggestHeading="Need a specific math tool?"
      suggestBlurb="If you're studying a specific topic and need a calculator that shows its work, tell us. Student requests get prioritized."
    />
  );
}
