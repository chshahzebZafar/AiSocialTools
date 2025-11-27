import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { ThemeProvider } from "@/components/ThemeProvider";
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
    default: "Social Media Tools - Free Online Tools for Social Media",
    template: "%s | Social Media Tools"
  },
  description: "Free online social media tools - Generate tweets, create Instagram posts, download thumbnails, and more. All tools are free to use.",
  keywords: ["social media tools", "social media management", "scheduling tools", "social media analytics", "content creation tools"],
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
    // bing: "your-bing-verification-code",
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
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
