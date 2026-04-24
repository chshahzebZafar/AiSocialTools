import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import { getOGImageUrl } from "@/lib/og-image-generator";

const URL = "https://aisocialtools.co/tools/image-tools";

export const metadata: Metadata = {
  title: "Free Image Tools 2026 — Compressor, Converter, Resizer, Favicon",
  description:
    "Complete free image toolkit — compressor, format converter (PNG, JPG, WebP), resizer for every social platform, favicon generator, color palette extractor, and more. Browser-side, no uploads.",
  keywords: [
    "free image tools",
    "online image tools",
    "image toolkit",
    "best free image tools 2026",
    "image compressor",
    "image converter",
    "image resizer",
    "favicon generator",
    "color palette generator",
    "image editing tools free",
    "browser image tools no upload",
  ],
  alternates: { canonical: URL },
  openGraph: {
    title: "Free Image Tools 2026 — Compress, Convert, Resize in Your Browser",
    description: "All the image tools a creator needs — compressor, converter, resizer, favicon generator. No signup, no upload.",
    type: "website",
    url: URL,
    siteName: "AI Social Tools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "Free Image Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Image Tools 2026 — Complete Browser-Side Toolkit",
    description: "Compressor, converter, resizer, favicon & more. All free.",
    images: [getOGImageUrl("default")],
  },
  robots: { index: true, follow: true },
};

export default function ImageToolsLayout({ children }: { children: React.ReactNode }) {
  return <ToolLayout>{children}</ToolLayout>;
}
