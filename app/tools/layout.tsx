import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "All Social Media Tools - Free Online Tools Collection",
  description: "Browse our complete collection of free social media tools. Generate content, download thumbnails, create captions, and more. All tools are 100% free with no signup required.",
  keywords: [
    "social media tools",
    "free tools",
    "all tools",
    "tool collection",
    "social media management tools",
    "content creation tools"
  ],
  openGraph: {
    title: "All Social Media Tools - Free Online Tools Collection",
    description: "Browse our complete collection of free social media tools. All tools are 100% free with no signup required.",
    type: "website",
    url: "https://socialmediatools.netlify.app/tools",
    siteName: "Social Media Tools",
    images: [
      {
        url: getOGImageUrl("tools"),
        width: 1200,
        height: 630,
        alt: "All Social Media Tools - Free Online Tools Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Social Media Tools - Free Online Tools Collection",
    description: "Browse our complete collection of free social media tools. All tools are 100% free with no signup required.",
    images: [getOGImageUrl("tools")],
  },
  alternates: {
    canonical: "https://socialmediatools.netlify.app/tools",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
