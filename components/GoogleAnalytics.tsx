"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface GoogleAnalyticsProps {
  gaId?: string;
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  // Use provided ID or fallback to environment variable or default
  const trackingId = gaId || process.env.NEXT_PUBLIC_GA_ID || "G-KPXLX0R9XK";
  const pathname = usePathname();
  
  if (!trackingId || trackingId === "G-XXXXXXXXXX") {
    return null;
  }

  // Track page views and Core Web Vitals
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", trackingId, {
        page_path: pathname,
        send_page_view: true,
      });

      // Track Core Web Vitals for SEO performance monitoring
      import("web-vitals").then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        onCLS((metric: any) => {
          (window as any).gtag("event", "web_vitals", {
            event_category: "Web Vitals",
            event_label: "CLS",
            value: Math.round(metric.value * 1000),
            non_interaction: true,
          });
        });

        onFCP((metric: any) => {
          (window as any).gtag("event", "web_vitals", {
            event_category: "Web Vitals",
            event_label: "FCP",
            value: Math.round(metric.value),
            non_interaction: true,
          });
        });

        onLCP((metric: any) => {
          (window as any).gtag("event", "web_vitals", {
            event_category: "Web Vitals",
            event_label: "LCP",
            value: Math.round(metric.value),
            non_interaction: true,
          });
        });

        onTTFB((metric: any) => {
          (window as any).gtag("event", "web_vitals", {
            event_category: "Web Vitals",
            event_label: "TTFB",
            value: Math.round(metric.value),
            non_interaction: true,
          });
        });

        onINP((metric: any) => {
          (window as any).gtag("event", "web_vitals", {
            event_category: "Web Vitals",
            event_label: "INP",
            value: Math.round(metric.value),
            non_interaction: true,
          });
        });
        }).catch(() => {
          // web-vitals not available, skip
        });

      // Track tool usage events
      if (pathname?.startsWith("/tools/")) {
        const toolName = pathname.split("/").pop() || "unknown";
        (window as any).gtag("event", "tool_view", {
          event_category: "Tool Usage",
          event_label: toolName,
          value: 1,
        });
      }

      // Track scroll depth for engagement
      let maxScroll = 0;
      const trackScroll = () => {
        const scrollPercent = Math.round(
          ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
        );
        if (scrollPercent > maxScroll && scrollPercent >= 25) {
          maxScroll = scrollPercent;
          if (scrollPercent === 25 || scrollPercent === 50 || scrollPercent === 75 || scrollPercent === 100) {
            (window as any).gtag("event", "scroll", {
              event_category: "Engagement",
              event_label: `${scrollPercent}%`,
              value: scrollPercent,
              non_interaction: true,
            });
          }
        }
      };

      window.addEventListener("scroll", trackScroll, { passive: true });
      return () => window.removeEventListener("scroll", trackScroll);
    }
  }, [pathname, trackingId]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}', {
              page_path: window.location.pathname,
              send_page_view: true,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
              allow_google_signals: true,
              allow_ad_personalization_signals: true
            });
          `,
        }}
      />
    </>
  );
}

