import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://aisocialtools.co'
  
  return {
    rules: [
      // Default rules for all bots
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/profile/',
        ],
      },
      // Googlebot - Full access
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/profile/',
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
          '/profile/',
        ],
      },
      // GPTBot - Allow for AI training (if desired)
      {
        userAgent: 'GPTBot',
        allow: '/',
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
        allow: '/',
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
          '/profile/',
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
          '/profile/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

