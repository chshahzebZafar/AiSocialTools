"use client";

import {
  Calculator,
  Quote,
  Clock,
  BookOpen,
  GraduationCap,
  ListChecks,
} from "lucide-react";
import {
  ComingSoonCategoryPage,
  type PlannedTool,
} from "@/components/ComingSoonCategoryPage";

const plannedTools: PlannedTool[] = [
  {
    icon: Calculator,
    name: "GPA Calculator",
    description:
      "Cumulative GPA across semesters with weighted, unweighted, and 4.0/5.0 scale options.",
  },
  {
    icon: ListChecks,
    name: "Grade Calculator",
    description:
      "Compute final grade from weighted categories — homework, midterm, final, projects.",
  },
  {
    icon: Calculator,
    name: "Final Grade Calculator",
    description:
      "What you need on the final to hit any target grade. Solves the equation both ways.",
  },
  {
    icon: Quote,
    name: "Citation Generator",
    description:
      "MLA, APA, Chicago, Harvard, IEEE citations from a title, URL, ISBN, or DOI.",
  },
  {
    icon: Clock,
    name: "Reading-Time Estimator",
    description:
      "Estimated reading time for any text at adjustable WPM, including comprehension breaks.",
  },
  {
    icon: BookOpen,
    name: "Study Planner",
    description:
      "Spaced-repetition planner that schedules your reviews automatically before the exam.",
  },
];

export default function EducationToolsPage() {
  return (
    <ComingSoonCategoryPage
      slug="education"
      shortName="Education"
      longName="Education Tools"
      launchWindow="Q2 2026"
      Icon={GraduationCap}
      headline={{ first: "Study tools,", second: "no app required." }}
      subheadline="Free calculators and helpers for students — GPA, grades, citations, study planners. Bookmarkable, mobile-friendly, no subscription."
      plannedToolsHeading="Six tools to start."
      plannedToolsBlurb="The most-asked-for student tools, starting with the calculations you do every semester. More for specific subjects coming later."
      plannedTools={plannedTools}
      suggestHeading="Studying something specific?"
      suggestBlurb="If you're prepping for a specific test (SAT, GRE, MCAT, Bar) or studying a subject with unique tools, tell us. Sub-categories ship next."
    />
  );
}
