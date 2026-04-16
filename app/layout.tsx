import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
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
    default: "Best Free Social Media Tools Online - No Signup Required 2025",
    template: "%s | Best Free Social Media Tools"
  },
  description: "Discover the best free social media tools online for 2025. Generate tweets, create Instagram posts, download YouTube thumbnails, generate hashtags, and more. All tools are 100% free with no signup required - perfect for content creators and marketers.",
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
    "best free tools 2025"
  ],
  authors: [{ name: "Shahzeb Zafar" }],
  creator: "Shahzeb Zafar",
  publisher: "Shahzeb Zafar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://socialmediatools.netlify.app",
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
    canonical: "https://socialmediatools.netlify.app",
  },
  verification: {
    google: "rSzbil6iTeObZLttAxiRP7L7aYbEX8BtQEta8AzxfHk",
    // yandex: "your-yandex-verification-code",
    // Add Bing verification when available: bing: "your-bing-verification-code",
  },
  metadataBase: new URL("https://socialmediatools.netlify.app"),
  other: {
    "theme-color": "#3b82f6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resource hints for performance - Optimized for Core Web Vitals */}
        <link rel="manifest" href="/manifest.json" />
        {/* Font preloading - Critical for LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Analytics preconnect - Non-blocking */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        {/* Hreflang tags for international SEO (prepared for future expansion) */}
        <link rel="alternate" hrefLang="en" href="https://socialmediatools.netlify.app" />
        <link rel="alternate" hrefLang="x-default" href="https://socialmediatools.netlify.app" />
        <script  async   src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1544013803258168"   crossOrigin="anonymous" />
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1544013803258168" crossorigin="anonymous"></script> */}

        {/* Non-blocking theme initialization */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'system';
                  let resolvedTheme = theme;
                  if (theme === 'system') {
                    resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  const root = document.documentElement;
                  root.classList.remove('light', 'dark');
                  root.classList.add(resolvedTheme);
                  root.setAttribute('data-theme', resolvedTheme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-KPXLX0R9XK"} />
        <PerformanceMonitor />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
