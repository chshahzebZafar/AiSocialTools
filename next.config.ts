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
            value: 'origin-when-cross-origin'
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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.jsdelivr.net https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://cdn.jsdelivr.net https://unpkg.com https://*.googleapis.com https://*.firebaseio.com https://*.cloudfunctions.net https://firebase.googleapis.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://image.pollinations.ai https://api.remove.bg https://api.replicate.com https://replicate.delivery https://*.replicate.delivery; frame-src 'self'; worker-src 'self' blob: https://cdn.jsdelivr.net https://unpkg.com; media-src 'self' blob: https:;"
          },
          // Cache Control for static assets - Optimized for performance
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      // Different cache headers for HTML pages
      {
        source: '/:path*.html',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate'
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
