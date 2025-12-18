"use client";

import { useEffect } from "react";
import type { Metric } from "web-vitals";

/**
 * Performance Monitoring Component
 * Tracks Core Web Vitals and sends to Google Analytics
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run on client side - check first
    if (typeof window === "undefined") {
      // Return a no-op cleanup function instead of undefined for React 19 compatibility
      return () => {
        // No cleanup needed on server
      };
    }

    // Helper function to send metric to Google Analytics
    const sendToGA = (metric: Metric) => {
      if (typeof window !== "undefined" && (window as any).gtag) {
        try {
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
        } catch (error) {
          // Silently fail in production, log in development
          if (process.env.NODE_ENV === "development") {
            console.error("Error sending performance metric:", error);
          }
        }
      }
    };

    // Monitor page load performance
    const handleLoad = () => {
      if (typeof window !== "undefined" && "performance" in window && "timing" in window.performance) {
        try {
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
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("Error tracking page load performance:", error);
          }
        }
      }
    };

    // Initialize web vitals tracking - dynamically import to avoid SSR issues
    import("web-vitals")
      .then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        // Initialize web vitals tracking
        try {
          // Report Core Web Vitals to Google Analytics
          // Note: FID is deprecated, using INP instead
          onCLS(sendToGA);
          onFCP(sendToGA);
          onLCP(sendToGA);
          onTTFB(sendToGA);
          onINP(sendToGA);
        } catch (error) {
          // Silently fail in production, log in development
          if (process.env.NODE_ENV === "development") {
            console.error("Error initializing web vitals:", error);
          }
        }
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.error("Error loading web-vitals:", error);
        }
      });

    // Add load event listener
    window.addEventListener("load", handleLoad);

    // Cleanup function - always return a function for consistency
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleLoad);
      }
    };
  }, []);

  return null;
}

