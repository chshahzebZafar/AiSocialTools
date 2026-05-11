import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { AuthProvider } from "@/components/AuthProvider";
import LeadCapturePopup from "@/components/LeadCapturePopup";
// Auth diagnostics removed - auth is temporarily disabled
import { getOGImageUrl } from "@/lib/og-image-generator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Best Free Social Media Tools Online - No Signup Required 2026",
    template: "%s | Best Free Social Media Tools"
  },
  description: "40+ free social media tools — tweets, Instagram posts, YouTube thumbnails, hashtags, and more. Browser-based, no signup, no tracking.",
  keywords: [
    "free social media tools",
    "best social media tools",
    "social media tools online",
    "free online tools",
    "social media management tools",
    "content creation tools",
    "free tools no signup",
    "online social media tools",
    "social media toolkit",
    "free tools for creators",
    "social media marketing tools",
    "best free tools 2026"
  ],
  authors: [{ name: "Shahzeb Zafar" }],
  creator: "Shahzeb Zafar",
  publisher: "Shahzeb Zafar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aisocialtools.co",
    siteName: "Social Media Tools",
    title: "Best Free Social Media Tools Online - No Signup Required 2026",
    description: "40+ free social media tools for tweets, Instagram posts, YouTube thumbnails, hashtags, and more. Browser-based, no signup required.",
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
    title: "Best Free Social Media Tools Online - No Signup Required 2026",
    description: "40+ free social media tools for tweets, Instagram posts, YouTube thumbnails, hashtags, and more. Browser-based, no signup required.",
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
    canonical: "https://aisocialtools.co",
  },
  verification: {
    google: "rSzbil6iTeObZLttAxiRP7L7aYbEX8BtQEta8AzxfHk",
    yandex: "4937df008dc17e31",
  },
  metadataBase: new URL("https://aisocialtools.co"),
  other: {
    "theme-color": "#09090b",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon - PNG format */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        
        {/* Resource hints for performance - Optimized for Core Web Vitals */}
        <link rel="manifest" href="/manifest.json" />
        {/* Font preloading - Critical for LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Analytics preconnect - Non-blocking */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        {/* AdSense — dns-prefetch only; the script itself loads lazily via next/script below for CWV */}
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        {/* Hreflang tags for international SEO (prepared for future expansion) */}
        <link rel="alternate" hrefLang="en" href="https://aisocialtools.co" />
        <link rel="alternate" hrefLang="x-default" href="https://aisocialtools.co" />

        {/* Google Verification TAG */}
        <meta name="google-site-verification" content="1MXsxJbLVHs_-NmpBgvIbP63OboURvFjZwN7Rjf6aVU" />

        {/* Bing Verification TAG */}
        <meta name="msvalidate.01" content="B5DB751F43595825223C49E26E43F282" />

        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-KPXLX0R9XK"} />
        <PerformanceMonitor />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <LeadCapturePopup />
        {/* AdSense — lazyOnload defers until browser idle, protects LCP/INP */}
        <Script
          id="adsense"
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1544013803258168"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
