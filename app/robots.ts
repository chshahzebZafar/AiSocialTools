import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://aisocialtools.co'
  
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
      // YandexBot - Russian/Eastern European traffic
      {
        userAgent: 'YandexBot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/profile/',
        ],
      },
      // DuckDuckGo bot
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      // Baidu bot (China traffic)
      {
        userAgent: 'baiduspider',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      // Block bad bots (competitor SEO crawlers)
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'MJ12bot',
          'Screaming Frog',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

