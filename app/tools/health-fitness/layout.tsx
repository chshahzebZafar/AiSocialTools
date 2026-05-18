import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Health & Fitness Tools — Free Calculators (Coming Soon)",
  description:
    "Free health and fitness calculators — BMI, calories, TDEE, water intake, heart-rate zones, pace, and one-rep max. Coming Q2 2026.",
  keywords: [
    "BMI calculator",
    "calorie calculator",
    "TDEE calculator",
    "water intake calculator",
    "heart rate zone calculator",
    "one rep max calculator",
    "running pace calculator",
    "free fitness tools",
    "free health calculator",
  ],
  openGraph: {
    title: "Health & Fitness Tools — Free Calculators (Coming Soon)",
    description:
      "Free fitness and health calculators — BMI, calories, heart rate, training.",
    type: "website",
    url: "https://aisocialtools.co/tools/health-fitness",
    siteName: "AISocialTools",
    images: [
      {
        url: getOGImageUrl("default"),
        width: 1200,
        height: 630,
        alt: "Health & Fitness Tools — Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Health & Fitness Tools — Free Calculators (Coming Soon)",
    description: "Free fitness and health calculators — coming Q2 2026.",
    images: [getOGImageUrl("default")],
  },
  alternates: {
    canonical: "https://aisocialtools.co/tools/health-fitness",
    languages: {
      "en": "https://aisocialtools.co/tools/health-fitness",
      "x-default": "https://aisocialtools.co/tools/health-fitness",
    },
  },
  robots: { index: true, follow: true },
};

export default function HealthFitnessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
