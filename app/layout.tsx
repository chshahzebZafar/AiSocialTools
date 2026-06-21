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
    default: "Best Free Online Tools — No Signup Required 2026",
    // No template suffix — each page title stands alone. Adding "| AISocialTools"
    // (15 chars) pushed 40+ pages over Google's 60-char SERP truncation limit.
    template: "%s",
  },
  description: "70+ free social media tools — content, image, video, and growth utilities, plus a curated AI directory. Browser-based, no signup, no tracking.",
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
    siteName: "AISocialTools",
    title: "Best Free Social Media Tools Online - No Signup Required 2026",
    description: "70+ free social media tools — content, image, video, and growth utilities, plus a curated AI directory. Browser-based, no signup required.",
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
    description: "70+ free social media tools — content, image, video, and growth utilities, plus a curated AI directory. Browser-based, no signup required.",
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
    google: "1MXsxJbLVHs_-NmpBgvIbP63OboURvFjZwN7Rjf6aVU",
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
        {/* No hreflang — English-only site. Adding hreflang requires
            reciprocal annotations on every page, which we don't need until
            we localize. Re-introducing these two tags caused Ahrefs to flag
            280+ pages for "missing self-reference" — don't put them back. */}

        {/* Bing Verification TAG */}
        <meta name="msvalidate.01" content="B5DB751F43595825223C49E26E43F282" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
        <LeadCapturePopup />
        {/* Analytics + performance monitoring — must be in <body>, not <head>.
            Client components in <head> break hydration and block LCP. */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-KPXLX0R9XK"} />
        <PerformanceMonitor />
        {/* AdSense — lazyOnload defers until browser idle, protects LCP/INP */}
        <Script
          id="adsense"
          strategy="lazyOnload"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1544013803258168"
          crossOrigin="anonymous"
        />
        {/* Trustpilot TrustBox widget script */}
        <Script
          id="trustpilot"
          strategy="lazyOnload"
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        />
      </body>
    </html>
  );
}
