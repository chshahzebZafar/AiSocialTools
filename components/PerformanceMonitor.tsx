"use client";

import { useEffect } from "react";
import { onCLS, onFCP, onLCP, onTTFB, onINP } from "web-vitals";
import type { Metric } from "web-vitals";

/**
 * Performance Monitoring Component
 * Tracks Core Web Vitals and sends to Google Analytics
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    // Helper function to send metric to Google Analytics
    const sendToGA = (metric: Metric) => {
      if (typeof window !== "undefined" && (window as any).gtag) {
        const { name, value, id, delta, rating } = metric;
        
        (window as any).gtag("event", name, {
          event_category: "Web Vitals",
          value: Math.round(name === "CLS" ? delta * 1000 : value),
          event_id: id,
          event_label: id,
          non_interaction: true,
          // Add rating for better analysis
          custom_map: {
            rating: rating || "unknown"
          }
        });

        // Log to console in development
        if (process.env.NODE_ENV === "development") {
          console.log(`[Performance] ${name}:`, {
            value: Math.round(name === "CLS" ? delta * 1000 : value),
            rating,
            id
          });
        }
      }
    };

    // Report Core Web Vitals to Google Analytics
    // Note: FID is deprecated, using INP instead
    onCLS(sendToGA);
    onFCP(sendToGA);
    onLCP(sendToGA);
    onTTFB(sendToGA);
    onINP(sendToGA);

    // Monitor page load performance
    if (typeof window !== "undefined") {
      window.addEventListener("load", () => {
        if ("performance" in window && "timing" in window.performance) {
          const perfData = window.performance.timing;
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
          const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;
          const firstByte = perfData.responseStart - perfData.navigationStart;

          if ((window as any).gtag) {
            (window as any).gtag("event", "page_load_time", {
              event_category: "Performance",
              value: Math.round(pageLoadTime),
              non_interaction: true,
            });

            (window as any).gtag("event", "dom_content_loaded", {
              event_category: "Performance",
              value: Math.round(domContentLoaded),
              non_interaction: true,
            });

            (window as any).gtag("event", "time_to_first_byte", {
              event_category: "Performance",
              value: Math.round(firstByte),
              non_interaction: true,
            });
          }
        }
      });
    }
  }, []);

  return null;
}

