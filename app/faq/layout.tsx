import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Social Media Tools",
  description: "Frequently asked questions about Social Media Tools. Learn about our free tools, privacy, usage, and more. Get answers to common questions.",
  keywords: ["FAQ", "frequently asked questions", "social media tools FAQ", "help", "support"],
  openGraph: {
    title: "FAQ - Frequently Asked Questions | Social Media Tools",
    description: "Frequently asked questions about Social Media Tools. Learn about our free tools, privacy, usage, and more.",
    type: "website",
    url: "https://aisocialtools.co/faq",
    siteName: "AISocialTools",
    images: [
      {
        url: getOGImageUrl("default"),
        width: 1200,
        height: 630,
        alt: "FAQ - Frequently Asked Questions | Social Media Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Frequently Asked Questions | Social Media Tools",
    description: "Frequently asked questions about Social Media Tools. Learn about our free tools, privacy, usage, and more.",
    images: [getOGImageUrl("default")],
  },
  alternates: {
    canonical: "https://aisocialtools.co/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

