/**
 * Performance Utilities
 * Helper functions for performance monitoring and optimization
 */

/**
 * Measure and log performance metrics
 */
export function measurePerformance() {
  if (typeof window === "undefined" || !window.performance) {
    return;
  }

  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
  
  if (!navigation) {
    return;
  }

  const metrics = {
    // DNS
    dnsTime: navigation.domainLookupEnd - navigation.domainLookupStart,
    // TCP
    tcpTime: navigation.connectEnd - navigation.connectStart,
    // Request
    requestTime: navigation.responseStart - navigation.requestStart,
    // Response
    responseTime: navigation.responseEnd - navigation.responseStart,
    // DOM Processing
    domProcessingTime: navigation.domComplete - navigation.domInteractive,
    // Load
    loadTime: navigation.loadEventEnd - navigation.loadEventStart,
    // Total
    totalTime: navigation.loadEventEnd - navigation.fetchStart,
  };

  return metrics;
}

/**
 * Get Core Web Vitals thresholds
 */
export const CORE_WEB_VITALS_THRESHOLDS = {
  LCP: {
    good: 2500,
    needsImprovement: 4000,
  },
  FID: {
    good: 100,
    needsImprovement: 300,
  },
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
  },
  FCP: {
    good: 1800,
    needsImprovement: 3000,
  },
  TTFB: {
    good: 800,
    needsImprovement: 1800,
  },
  INP: {
    good: 200,
    needsImprovement: 500,
  },
};

/**
 * Check if a metric is good, needs improvement, or poor
 */
export function getMetricRating(
  metricName: keyof typeof CORE_WEB_VITALS_THRESHOLDS,
  value: number
): "good" | "needs-improvement" | "poor" {
  const thresholds = CORE_WEB_VITALS_THRESHOLDS[metricName];
  
  if (value <= thresholds.good) {
    return "good";
  } else if (value <= thresholds.needsImprovement) {
    return "needs-improvement";
  } else {
    return "poor";
  }
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string) {
  if (typeof document === "undefined") {
    return;
  }

  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
}

/**
 * Prefetch resources for faster navigation
 */
export function prefetchResource(href: string) {
  if (typeof document === "undefined") {
    return;
  }

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  document.head.appendChild(link);
}

