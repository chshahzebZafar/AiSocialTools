import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "Developer Tools — Free Utilities (Coming Soon)",
  description:
    "Free developer utilities — JSON formatter, base64, URL encoder, UUID, hash generator, regex tester. All client-side. Coming Q2 2026.",
  keywords: [
    "developer tools online",
    "JSON formatter",
    "base64 encoder",
    "url encoder",
    "uuid generator",
    "hash generator",
    "regex tester",
    "free developer utilities",
    "online dev tools",
  ],
  openGraph: {
    title: "Developer Tools — Free Utilities (Coming Soon)",
    description:
      "Free developer utilities — formatters, encoders, generators, regex tester.",
    type: "website",
    url: "https://aisocialtools.co/tools/developer",
    siteName: "AISocialTools",
    images: [
      {
        url: getOGImageUrl("default"),
        width: 1200,
        height: 630,
        alt: "Developer Tools — Coming Soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Tools — Free Utilities (Coming Soon)",
    description: "Free developer utilities — coming Q2 2026.",
    images: [getOGImageUrl("default")],
  },
  alternates: { canonical: "https://aisocialtools.co/tools/developer" },
  robots: { index: false, follow: true },
};

export default function DeveloperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
