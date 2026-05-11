import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Mortgage Calculator — Free, with Tax, Insurance & HOA",
  description:
    "Free mortgage calculator. Get your full monthly payment — principal, interest, property tax, home insurance, HOA — plus total interest paid.",
  keywords: [
    "mortgage calculator",
    "free mortgage calculator",
    "home loan calculator",
    "monthly payment calculator",
    "mortgage payment calculator",
    "amortization calculator",
    "mortgage with tax and insurance",
    "PITI calculator",
  ],
  openGraph: {
    title: "Mortgage Calculator — Free with Tax, Insurance & HOA",
    description: "Free mortgage calculator with full monthly payment breakdown.",
    type: "website",
    url: "https://aisocialtools.co/tools/finance/mortgage-calculator",
    siteName: "Social Media Tools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "Mortgage Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mortgage Calculator — Free, with Tax, Insurance & HOA",
    description: "Free mortgage calculator with full monthly payment breakdown.",
    images: [getOGImageUrl("default")],
  },
  alternates: { canonical: "https://aisocialtools.co/tools/finance/mortgage-calculator" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
