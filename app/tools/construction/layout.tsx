import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Construction Tools — Free Calculators & Estimators (Coming Soon)",
  description:
    "Free construction calculators, estimators, and planners for contractors, builders, and DIYers. Concrete, lumber, roofing, stairs — coming 2026.",
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
    title: "Construction Tools — Free Calculators & Estimators (Coming Soon)",
    description:
      "Free construction calculators and estimators for contractors and DIYers. Coming 2026.",
    type: "website",
    url: "https://aisocialtools.co/tools/construction",
    siteName: "Social Media Tools",
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
    title: "Construction Tools — Free Calculators & Estimators (Coming Soon)",
    description: "Free calculators and estimators for builders and DIYers.",
    images: [getOGImageUrl("default")],
  },
  alternates: { canonical: "https://aisocialtools.co/tools/construction" },
  robots: { index: true, follow: true },
};

export default function ConstructionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
