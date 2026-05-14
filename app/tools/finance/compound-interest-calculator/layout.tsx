import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Compound Interest Calculator — Free with Monthly Contributions",
  description:
    "Free compound interest calculator with monthly contributions, any compounding frequency, and a year-by-year growth table.",
  keywords: [
    "compound interest calculator",
    "free compound interest calculator",
    "compound interest with contributions",
    "investment growth calculator",
    "savings calculator",
    "compound interest formula",
  ],
  openGraph: {
    title: "Compound Interest Calculator — Free",
    description: "See how your money grows with compound interest and monthly contributions.",
    type: "website",
    url: "https://aisocialtools.co/tools/finance/compound-interest-calculator",
    siteName: "AISocialTools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "Compound Interest Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compound Interest Calculator — Free",
    description: "See how your money grows with compound interest and monthly contributions.",
    images: [getOGImageUrl("default")],
  },
  alternates: { canonical: "https://aisocialtools.co/tools/finance/compound-interest-calculator" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
