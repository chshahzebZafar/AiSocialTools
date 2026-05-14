import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Math Calculators — Percentage, Fractions, Exponents & More (Coming Soon)",
  description:
    "Free math calculators for percentages, averages, fractions, exponents, square roots, prime numbers, LCM, GCF, and more — with step-by-step working. Coming 2026.",
  keywords: [
    "percentage calculator",
    "fraction calculator",
    "average calculator",
    "exponent calculator",
    "square root calculator",
    "prime number checker",
    "LCM calculator",
    "GCF calculator",
    "math calculators",
    "number base converter",
  ],
  openGraph: {
    title: "Math Calculators — Percentage, Fractions & More (Coming Soon)",
    description:
      "Free math calculators with step-by-step working. Coming 2026.",
    type: "website",
    url: "https://aisocialtools.co/tools/math",
    siteName: "AISocialTools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "Math Calculators — Coming Soon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Math Calculators — Coming Soon",
    description: "Free math calculators with step-by-step working.",
    images: [getOGImageUrl("default")],
  },
  alternates: { canonical: "https://aisocialtools.co/tools/math" },
  robots: { index: false, follow: true },
};

export default function MathLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
