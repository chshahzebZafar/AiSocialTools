import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://socialmediatools.netlify.app'
  
  return {
    rules: [
      // Default rules for all bots
      {
        userAgent: '*',
        allow: [
          '/',
          '/tools',
          '/blog',
          '/about',
          '/contact',
          '/faq',
          '/author',
        ],
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
          '/profile/',
          '*.json$',
          '/search?*',
        ],
        crawlDelay: 0,
      },
      // Googlebot - Full access
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      // Bingbot - Full access
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      // GPTBot - Allow for AI training (if desired)
      {
        userAgent: 'GPTBot',
        allow: [
          '/',
          '/tools',
          '/blog',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/profile/',
        ],
      },
      // ChatGPT-User - Allow for AI training
      {
        userAgent: 'ChatGPT-User',
        allow: [
          '/',
          '/tools',
          '/blog',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/profile/',
        ],
      },
      // Block bad bots
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'MJ12bot',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

