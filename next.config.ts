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
    ];
  },

  // Headers for SEO, Security, and Performance
  async headers() {
    return [
      {
        source: '/:path*',
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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.jsdelivr.net https://unpkg.com https://pagead2.googlesyndication.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://cdn.jsdelivr.net https://unpkg.com https://*.googleapis.com https://*.firebaseio.com https://*.cloudfunctions.net https://firebase.googleapis.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://image.pollinations.ai https://api.remove.bg https://api.replicate.com https://replicate.delivery https://*.replicate.delivery https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net; frame-src 'self' https://googleads.g.doubleclick.net; worker-src 'self' blob: https://cdn.jsdelivr.net https://unpkg.com; media-src 'self' blob: https:;"
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
