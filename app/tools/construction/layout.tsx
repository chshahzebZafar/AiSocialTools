import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Free Construction Calculators & Estimators 2026 | Contractors & DIY",
  description:
    "Free construction calculators for concrete, lumber, roofing, flooring, tile, paint, fencing, stairs, and more. For contractors, builders, and DIYers. No signup required.",
  keywords: [
    "construction tools",
    "free construction calculator",
    "concrete calculator",
    "lumber estimator",
    "roof pitch calculator",
    "stair calculator",
    "drywall estimator",
    "free contractor tools",
    "DIY calculators",
  ],
  openGraph: {
    title: "Free Construction Calculators & Estimators 2026",
    description:
      "Free construction calculators for concrete, roofing, flooring, tile, paint, fencing, lumber, and stairs. No signup required.",
    type: "website",
    url: "https://aisocialtools.co/tools/construction",
    siteName: "AISocialTools",
    images: [
      {
        url: getOGImageUrl("default"),
        width: 1200,
        height: 630,
        alt: "Construction Tools — Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Construction Calculators & Estimators 2026",
    description: "Free construction calculators for concrete, roofing, flooring, tile, paint, and fencing. No signup.",
    images: [getOGImageUrl("default")],
  },
  alternates: {
    canonical: "https://aisocialtools.co/tools/construction",
    languages: {
      "en": "https://aisocialtools.co/tools/construction",
      "x-default": "https://aisocialtools.co/tools/construction",
    },
  },
  robots: { index: true, follow: true },
};

export default function ConstructionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
