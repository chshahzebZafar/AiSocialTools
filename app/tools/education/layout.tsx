import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Education Tools — Free Calculators for Students (Coming Soon)",
  description:
    "Free education tools — GPA calculator, grade calculator, citation generator, study planner, reading-time estimator. Coming Q2 2026.",
  keywords: [
    "GPA calculator",
    "grade calculator",
    "final grade calculator",
    "citation generator",
    "study planner",
    "reading time calculator",
    "free education tools",
    "student calculators",
  ],
  openGraph: {
    title: "Education Tools — Free Calculators for Students (Coming Soon)",
    description:
      "Free student tools — GPA, grades, citations, study planning, reading time.",
    type: "website",
    url: "https://aisocialtools.co/tools/education",
    siteName: "AISocialTools",
    images: [
      {
        url: getOGImageUrl("default"),
        width: 1200,
        height: 630,
        alt: "Education Tools — Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Education Tools — Free Calculators for Students (Coming Soon)",
    description: "Free student tools — coming Q2 2026.",
    images: [getOGImageUrl("default")],
  },
  alternates: {
    canonical: "https://aisocialtools.co/tools/education",
    languages: {
      "en": "https://aisocialtools.co/tools/education",
      "x-default": "https://aisocialtools.co/tools/education",
    },
  },
  robots: { index: true, follow: true },
};

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
