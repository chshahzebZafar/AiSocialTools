import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Blog - Social Media Tips, Strategies & Insights",
  description: "Discover expert tips, strategies, and insights to help you succeed on social media. Learn about content creation, engagement, and growth strategies.",
  keywords: [
    "social media blog",
    "content creation tips",
    "social media strategy",
    "marketing blog",
    "social media insights",
    "content marketing",
    "social media tips"
  ],
  openGraph: {
    title: "Blog - Social Media Tips, Strategies & Insights",
    description: "Discover expert tips, strategies, and insights to help you succeed on social media.",
    type: "website",
    url: "https://socialmediatools.netlify.app/blog",
    siteName: "Social Media Tools",
    images: [
      {
        url: getOGImageUrl("default"),
        width: 1200,
        height: 630,
        alt: "Social Media Tools Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Social Media Tips, Strategies & Insights",
    description: "Discover expert tips, strategies, and insights to help you succeed on social media.",
    images: [getOGImageUrl("default")],
  },
  alternates: {
    canonical: "https://socialmediatools.netlify.app/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

