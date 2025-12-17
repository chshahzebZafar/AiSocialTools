/**
 * Lighthouse CI Configuration
 * For performance monitoring and SEO audits
 */
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'ready on',
      startServerReadyTimeout: 10000,
      url: [
        'http://localhost:3000',
        'http://localhost:3000/tools',
        'http://localhost:3000/blog',
        'http://localhost:3000/tools/tweet-generator',
      ],
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.90 }],
        'categories:best-practices': ['error', { minScore: 0.90 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],
        // SEO checks
        'meta-description': 'error',
        'document-title': 'error',
        'link-text': 'error',
        'is-crawlable': 'error',
        'robots-txt': 'error',
        'hreflang': 'warn',
        'canonical': 'error',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

