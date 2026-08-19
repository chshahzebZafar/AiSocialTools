import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/dashboard/',
          '/login',
          '/register',
          '/api/',
          '/private/',
          '/config/',
          '/includes/',
          '/tmp/',
          '/backup/',
          '/backups/',
          // Note: no '/*?*' rule. It blocked every URL carrying a query string,
          // which is heavier than intended — and blocking a URL stops Googlebot
          // reading its canonical tag, so param duplicates get stranded instead
          // of consolidated. Canonicals are set site-wide in lib/seo-metadata.ts
          // and handle this correctly on their own.
          //
          // Also note: /profile is NOT listed here. It is noindex via
          // app/profile/layout.tsx instead. A robots.txt disallow would prevent
          // Googlebot from crawling the page and therefore from ever seeing the
          // noindex, which can leave a bare URL in the index. Disallow hides a
          // page from crawling; noindex removes it from the index.
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
    ],
    sitemap: 'https://aisocialtools.co/sitemap.xml',
  }
}