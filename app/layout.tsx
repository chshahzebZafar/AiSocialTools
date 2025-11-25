import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { getOGImageUrl } from "@/lib/og-image-generator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Social Media Tools - Free Online Tools for Social Media",
    template: "%s | Social Media Tools"
  },
  description: "Free online social media tools - Generate tweets, create Instagram posts, download thumbnails, and more. All tools are free to use.",
  keywords: ["social media tools", "social media management", "scheduling tools", "social media analytics", "content creation tools"],
  authors: [{ name: "Social Media Tools" }],
  creator: "Social Media Tools",
  publisher: "Social Media Tools",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://socialmediatools.com",
    siteName: "Social Media Tools",
    title: "Social Media Tools - Best Tools for Social Media Management",
    description: "Discover the best social media tools for scheduling, analytics, design, and management.",
    images: [
      {
        url: getOGImageUrl("home"),
        width: 1200,
        height: 630,
        alt: "Social Media Tools - Free Online Tools for Social Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Tools - Best Tools for Social Media Management",
    description: "Discover the best social media tools for scheduling, analytics, design, and management.",
    images: [getOGImageUrl("home")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://socialmediatools.com",
  },
  verification: {
    // Add your verification codes here when available
    // Google Search Console verification code
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  metadataBase: new URL("https://socialmediatools.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
