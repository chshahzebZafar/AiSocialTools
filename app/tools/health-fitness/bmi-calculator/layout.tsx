import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "BMI Calculator — Free, Metric & Imperial, Healthy Range",
  description:
    "Free BMI calculator with metric and imperial units, healthy weight range, and category breakdown. Calculate Body Mass Index in seconds.",
  keywords: [
    "BMI calculator",
    "body mass index calculator",
    "free BMI calculator",
    "BMI calculator metric",
    "BMI calculator imperial",
    "BMI calculator kg",
    "BMI calculator lbs",
    "healthy weight calculator",
    "BMI range",
    "BMI categories",
  ],
  openGraph: {
    title: "BMI Calculator — Free, Metric & Imperial",
    description:
      "Calculate your Body Mass Index with metric or imperial units. Free, instant, no signup.",
    type: "website",
    url: "https://aisocialtools.co/tools/health-fitness/bmi-calculator",
    siteName: "Social Media Tools",
    images: [
      {
        url: getOGImageUrl("default"),
        width: 1200,
        height: 630,
        alt: "BMI Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI Calculator — Free, Metric & Imperial",
    description:
      "Calculate your Body Mass Index with metric or imperial units. Free, no signup.",
    images: [getOGImageUrl("default")],
  },
  alternates: {
    canonical: "https://aisocialtools.co/tools/health-fitness/bmi-calculator",
  },
  robots: { index: true, follow: true },
};

export default function BMICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
