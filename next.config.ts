import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static optimization
  output: 'standalone',
  
  // Turbopack configuration (Next.js 16+)
  // Empty config to silence warning - webpack config is still needed for FFmpeg.wasm
  turbopack: {},
  
  // Webpack configuration for FFmpeg.wasm and pdfjs
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    // Ignore dynamic import warnings for FFmpeg and pdfjs
    config.module = {
      ...config.module,
      unknownContextCritical: false,
    };
    return config;
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  
  // Compression
  compress: true,
  
  // Redirects for URL canonicalization
  async redirects() {
    return [
      // Remove trailing slashes (except for root)
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
      // 301 redirect for removed blog post — avoids soft 404 in Search Console
      {
        source: '/blog/apple-new-ceo-john-ternus-tim-cook-stepping-down',
        destination: '/blog',
        permanent: true,
      },
      // /ai-tools was the old AI-tools listing; merged into /ai-directory
      {
        source: '/ai-tools',
        destination: '/ai-directory',
        permanent: true,
      },
      // Author page consolidated into /about.
      { source: '/author',   destination: '/about', permanent: true },
      // Removed the 15 SaaS-review pages (low-value templated content).
      // Redirect each to the closest live destination so any inbound links survive.
      { source: '/tools/buffer',         destination: '/tools/social-media', permanent: true },
      { source: '/tools/hootsuite',      destination: '/tools/social-media', permanent: true },
      { source: '/tools/canva',          destination: '/tools/social-media', permanent: true },
      { source: '/tools/later',          destination: '/tools/social-media', permanent: true },
      { source: '/tools/sprout-social',  destination: '/tools/social-media', permanent: true },
      { source: '/tools/adobe-express',  destination: '/tools/social-media', permanent: true },
      { source: '/tools/socialbakers',   destination: '/tools/social-media', permanent: true },
      { source: '/tools/brandwatch',     destination: '/tools/social-media', permanent: true },
      { source: '/tools/linktree',       destination: '/tools/social-media', permanent: true },
      { source: '/tools/grammarly',      destination: '/ai-directory/grammarly', permanent: true },
      { source: '/tools/capcut',         destination: '/tools/social-media', permanent: true },
      { source: '/tools/unsplash',       destination: '/tools/social-media', permanent: true },
      { source: '/tools/mention',        destination: '/tools/social-media', permanent: true },
      { source: '/tools/tailwind',       destination: '/tools/social-media', permanent: true },
      { source: '/tools/buzzsumo',       destination: '/tools/social-media', permanent: true },

      // Construction calculators moved to their own site (freeconstructiontools.com)
      // with FLAT URLs (e.g. /tools/construction/concrete-calculator -> /concrete-calculator).
      // The wildcard maps every old calculator path to its new flat equivalent.
      { source: '/tools/construction', destination: 'https://freeconstructiontools.com', permanent: true },
      { source: '/tools/construction/:slug*', destination: 'https://freeconstructiontools.com/:slug*', permanent: true },

      // Removed non-social categories — the site is now focused on social media + AI.
      // Finance/health/education calculators and the coming-soon placeholders all
      // 301-redirect to the /tools hub so any inbound links / bookmarks survive.
      { source: '/tools/:cat(finance|health-fitness|education|real-estate|developer|location|file-tools|math|cooking|everyday|science)', destination: '/tools', permanent: true },
      { source: '/tools/:cat(finance|health-fitness|education|real-estate|developer|location|file-tools|math|cooking|everyday|science)/:slug*', destination: '/tools', permanent: true },

      // Off-brand document/file utilities removed to keep the site focused on
      // social media + AI. PDF tools and the favicon generator 301 to /tools.
      { source: '/tools/:tool(pdf-merger|pdf-splitter|pdf-to-image|image-to-pdf|word-to-pdf|favicon-generator)', destination: '/tools', permanent: true },

      // Old curated hub pages were replaced by platform/function categories.
      { source: '/tools/instagram-tools', destination: '/tools/instagram', permanent: true },
      { source: '/tools/youtube-tools', destination: '/tools/youtube', permanent: true },
      { source: '/tools/image-tools', destination: '/tools/image-design', permanent: true },
    ];
  },

  // Headers for SEO, Security, and Performance
  async headers() {
    return [
      // Embeddable widgets — must be framable by third-party sites, so this
      // rule deliberately omits X-Frame-Options and sets frame-ancestors *.
      // It is listed FIRST and the rule below excludes /embed/, otherwise the
      // site-wide SAMEORIGIN would apply and every external embed would be
      // blocked with nothing but a console error to show for it.
      {
        source: '/embed/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          // frame-ancestors * is the modern replacement for X-Frame-Options
          // here. X-Frame-Options has no "allow any origin" value, so the only
          // way to permit third-party framing is to not send it at all.
          { key: 'Content-Security-Policy', value: "frame-ancestors *;" },
          // Widgets are static once built; let intermediaries cache them.
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
      // The bulk directory index is a large, rarely-changing data file fetched
      // on demand by /ai-directory. Under the site-wide must-revalidate rule it
      // costs a round-trip on every search session, so it is excluded below and
      // cached properly here instead.
      {
        source: '/ai-directory-index.json',
        headers: [
          { key: 'Content-Type', value: 'application/json; charset=utf-8' },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // Everything except /embed/ and the directory index — see rules above.
        source: '/((?!embed/|ai-directory-index\\.json).*)',
        headers: [
          // DNS and Performance - Critical for Core Web Vitals
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // Security Headers
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.jsdelivr.net https://unpkg.com https://pagead2.googlesyndication.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://challenges.cloudflare.com https://api.datamuse.com https://www.google-analytics.com https://www.googletagmanager.com https://cdn.jsdelivr.net https://unpkg.com https://*.googleapis.com https://*.firebaseio.com https://*.cloudfunctions.net https://firebase.googleapis.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://image.pollinations.ai https://api.remove.bg https://api.replicate.com https://replicate.delivery https://*.replicate.delivery https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net; frame-src 'self' https://googleads.g.doubleclick.net https://challenges.cloudflare.com; worker-src 'self' blob: https://cdn.jsdelivr.net https://unpkg.com; media-src 'self' blob: https:;"
          },
          // Cache Control for HTML pages — must-revalidate so content updates are picked up
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          }
        ],
      },
      // Immutable long-lived cache for Next.js hashed static assets only
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      // Cache headers for API routes
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
