import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Free Finance Calculators 2026 | Mortgage, Compound Interest & More",
  description:
    "Free finance calculators for mortgages, compound interest, loans, retirement, taxes, and salary. No signup required. Includes PDF export and detailed.",
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
    title: "Free Finance Calculators 2026 | Mortgage, Compound Interest & More",
    description:
      "Free finance calculators for mortgages, compound interest, loans, retirement, and taxes. No signup required.",
    type: "website",
    url: "https://aisocialtools.co/tools/finance",
    siteName: "AISocialTools",
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
    title: "Free Finance Calculators 2026 | Mortgage & Compound Interest",
    description: "Free mortgage, compound interest, and loan calculators. No signup required.",
    images: [getOGImageUrl("default")],
  },
  alternates: {
    canonical: "https://aisocialtools.co/tools/finance",
    languages: {
      "en": "https://aisocialtools.co/tools/finance",
      "x-default": "https://aisocialtools.co/tools/finance",
    },
  },
  robots: { index: true, follow: true },
};

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
