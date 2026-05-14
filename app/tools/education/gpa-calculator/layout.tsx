import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "GPA Calculator — Free 4.0 & 5.0 Scale, Semester or Cumulative",
  description:
    "Free GPA calculator. Add courses with grades and credits. Works for 4.0 or 5.0 scale, semester or cumulative GPA.",
  keywords: [
    "GPA calculator",
    "free GPA calculator",
    "4.0 scale GPA calculator",
    "5.0 scale GPA calculator",
    "weighted GPA calculator",
    "cumulative GPA calculator",
    "semester GPA calculator",
    "college GPA calculator",
    "high school GPA calculator",
  ],
  openGraph: {
    title: "GPA Calculator — Free 4.0 & 5.0 Scale",
    description: "Free GPA calculator for semester or cumulative GPA on any scale.",
    type: "website",
    url: "https://aisocialtools.co/tools/education/gpa-calculator",
    siteName: "AISocialTools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "GPA Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GPA Calculator — Free 4.0 & 5.0 Scale",
    description: "Free GPA calculator for semester or cumulative GPA.",
    images: [getOGImageUrl("default")],
  },
  alternates: { canonical: "https://aisocialtools.co/tools/education/gpa-calculator" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
