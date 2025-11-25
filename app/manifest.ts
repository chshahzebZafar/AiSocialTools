import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Social Media Tools - Free Online Tools',
    short_name: 'Social Tools',
    description: 'Free online social media tools for content creation, management, and optimization',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3B82F6',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}

