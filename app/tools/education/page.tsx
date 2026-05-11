"use client";

import {
  Calculator,
  Quote,
  Clock,
  BookOpen,
  GraduationCap,
  ListChecks,
  Calendar,
  Timer,
  Globe,
  Ruler,
  Percent,
  BarChart3,
  Divide,
  Hash,
} from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";
import { getCategoryToolsBy } from "@/lib/category-tools";

const plannedTools: PlannedTool[] = [
  { icon: ListChecks, name: "Grade Calculator", description: "Compute final grade from weighted categories — homework, midterm, final, projects." },
  { icon: Calculator, name: "Final Grade Calculator", description: "What you need on the final to hit any target grade. Solves the equation both ways." },
  { icon: Quote, name: "Citation Generator", description: "MLA, APA, Chicago, Harvard, IEEE citations from a title, URL, ISBN, or DOI." },
  { icon: Clock, name: "Reading-Time Estimator", description: "Estimated reading time for any text at adjustable WPM, including comprehension breaks." },
  { icon: BookOpen, name: "Study Planner", description: "Spaced-repetition planner that schedules your reviews automatically before the exam." },
  { icon: Calendar, name: "Age Calculator", description: "Exact age in years, months, and days from any birthdate — or between any two dates." },
  { icon: Calendar, name: "Date Calculator", description: "Add or subtract days, weeks, months, or years from any date. Find the difference between two dates." },
  { icon: Clock, name: "Time Calculator", description: "Add, subtract, and convert time values — hours, minutes, seconds across multiple entries." },
  { icon: Timer, name: "Hours Calculator", description: "Total hours between two times, with support for overnight spans and multiple shifts." },
  { icon: Ruler, name: "Height Calculator", description: "Convert height between feet/inches and centimeters, and predict adult height for children." },
  { icon: Globe, name: "Time Zone Calculator", description: "Convert any time between 400+ world time zones with daylight saving time handled automatically." },
  { icon: Clock, name: "Time Duration Calculator", description: "Calculate the exact duration between two date-times in days, hours, minutes, and seconds." },
  { icon: Calendar, name: "Day Counter", description: "Count the number of days between two dates, with optional business-day-only mode." },
  { icon: Calendar, name: "Day of the Week Calculator", description: "Find what day of the week any date falls on — past or future." },
  { icon: Percent, name: "Percentage Calculator", description: "What % is X of Y, percentage increase/decrease, and reverse percentage — all in one tool." },
  { icon: BarChart3, name: "Average Calculator", description: "Calculate mean, median, mode, and range for any set of numbers." },
  { icon: Divide, name: "Fraction Calculator", description: "Add, subtract, multiply, and divide fractions with step-by-step working shown." },
  { icon: Hash, name: "Scientific Notation Converter", description: "Convert between standard notation and scientific notation in both directions." },
  { icon: Hash, name: "Number Base Converter", description: "Convert numbers between binary, octal, decimal, and hexadecimal instantly." },
];

export default function EducationToolsPage() {
  return (
    <ComingSoonCategoryPage
      slug="education"
      shortName="Education"
      longName="Education Tools"
      launchWindow="2026"
      Icon={GraduationCap}
      headline={{ first: "Study tools,", second: "no app required." }}
      subheadline="Free calculators and helpers for students — GPA, grades, dates, time zones, citations, study planners. Bookmarkable, mobile-friendly, no subscription."
      plannedToolsHeading="19 tools on the way."
      plannedToolsBlurb="The most-asked-for student and everyday tools. More subject-specific calculators will follow."
      plannedTools={plannedTools}
      liveTools={getCategoryToolsBy("education")}
      suggestHeading="Studying something specific?"
      suggestBlurb="If you're prepping for a specific test (SAT, GRE, MCAT, Bar) or studying a subject with unique tools, tell us. Sub-categories ship next."
    />
  );
}
