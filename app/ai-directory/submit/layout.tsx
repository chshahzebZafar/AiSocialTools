import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Submit Your AI Tool — Free Listing in Our Directory",
  description:
    "Submit any AI tool for free listing in our directory. No fee, no backlink demand, no featured upsell. Reviewed within 7 days.",
  keywords: [
    "submit AI tool",
    "list AI tool free",
    "AI directory submission",
    "free AI tool listing",
    "promote AI tool",
    "AI tool submission form",
    "add tool to directory",
  ],
  openGraph: {
    title: "Submit Your AI Tool — Free Listing in Our Directory",
    description:
      "Submit any AI tool for free listing. No fee, no backlink demand. Reviewed within 7 days.",
    type: "website",
    url: "https://aisocialtools.co/ai-directory/submit",
    siteName: "AISocialTools",
    images: [
      {
        url: getOGImageUrl("default"),
        width: 1200,
        height: 630,
        alt: "Submit Your AI Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Submit Your AI Tool — Free Listing in Our Directory",
    description:
      "Submit any AI tool for free listing. No fee, no backlink demand.",
    images: [getOGImageUrl("default")],
  },
  alternates: { canonical: "https://aisocialtools.co/ai-directory/submit" },
  robots: { index: true, follow: true },
};

export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
