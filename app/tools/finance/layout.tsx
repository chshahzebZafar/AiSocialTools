import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Finance Tools — Free Calculators (Coming Soon)",
  description:
    "Free finance calculators for mortgages, loans, compound interest, retirement, taxes, and salary conversions. Coming Q2 2026.",
  keywords: [
    "finance calculator",
    "mortgage calculator free",
    "loan calculator",
    "compound interest calculator",
    "retirement calculator",
    "tax bracket calculator",
    "salary calculator",
    "free finance tools",
  ],
  openGraph: {
    title: "Finance Tools — Free Calculators (Coming Soon)",
    description:
      "Free finance calculators for mortgages, loans, compound interest, retirement, and taxes.",
    type: "website",
    url: "https://aisocialtools.co/tools/finance",
    siteName: "Social Media Tools",
    images: [
      {
        url: getOGImageUrl("default"),
        width: 1200,
        height: 630,
        alt: "Finance Tools — Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance Tools — Free Calculators (Coming Soon)",
    description: "Free finance calculators — coming Q2 2026.",
    images: [getOGImageUrl("default")],
  },
  alternates: { canonical: "https://aisocialtools.co/tools/finance" },
  robots: { index: true, follow: true },
};

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
