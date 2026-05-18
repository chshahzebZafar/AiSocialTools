import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "All Tools — Browse by Category",
  description:
    "Free, browser-based tools organized by what you're trying to do. Social media tools, construction tools (coming soon), and more.",
  keywords: [
    "all tools",
    "free tools",
    "tool categories",
    "social media tools",
    "construction tools",
    "free online tools",
    "tools by category",
    "free tools for creators",
  ],
  openGraph: {
    title: "All Tools — Browse by Category",
    description:
      "Free, browser-based tools organized by category. Pick a category and dive in.",
    type: "website",
    url: "https://aisocialtools.co/tools",
    siteName: "AISocialTools",
    images: [
      {
        url: getOGImageUrl("tools"),
        width: 1200,
        height: 630,
        alt: "All Tools — Browse by Category",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Tools — Browse by Category",
    description:
      "Free, browser-based tools organized by category. Pick a category and dive in.",
    images: [getOGImageUrl("tools")],
  },
  alternates: {
    canonical: "https://aisocialtools.co/tools",
    languages: {
      "en": "https://aisocialtools.co/tools",
      "x-default": "https://aisocialtools.co/tools",
    },
  },
  robots: { index: true, follow: true },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
