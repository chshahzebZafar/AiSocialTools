import type { Metadata } from "next";
import { getOGImageUrl } from "@/lib/og-image-generator";

export const metadata: Metadata = {
  title: "File & PDF Tools — Convert, Compress & Merge",
  description:
    "Free browser-based file tools — PDF to Word, merge PDFs, compress images, QR code generator, file hasher, and 40+ more. Your files never leave your device. Coming 2026.",
  keywords: [
    "PDF to Word converter",
    "merge PDF",
    "compress PDF",
    "PDF editor",
    "image converter",
    "QR code generator",
    "file converter",
    "PDF tools",
    "image compressor",
    "split PDF",
    "sign PDF",
    "file hasher",
  ],
  openGraph: {
    title: "File & PDF Tools — Convert, Compress, Merge & More (Coming Soon)",
    description:
      "Free browser-based PDF and file tools. Your files never leave your device. Coming 2026.",
    type: "website",
    url: "https://aisocialtools.co/tools/file-tools",
    siteName: "AISocialTools",
    images: [{ url: getOGImageUrl("default"), width: 1200, height: 630, alt: "File & PDF Tools — Coming Soon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "File & PDF Tools — Coming Soon",
    description: "Free browser-based PDF and file tools. Your files stay private.",
    images: [getOGImageUrl("default")],
  },
  alternates: { canonical: "https://aisocialtools.co/tools/file-tools" },
  robots: { index: false, follow: true },
};

export default function FileToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
