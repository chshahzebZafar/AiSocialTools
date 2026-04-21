import { MetadataRoute } from 'next'
import { socialTools } from '@/lib/social-tools'
import { socialMediaTools } from '@/lib/tools'
import { blogPosts } from '@/lib/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aisocialtools.co'
  const currentDate = new Date()
  
  // Homepage - Highest priority
  const homepage: MetadataRoute.Sitemap[0] = {
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
    alternates: {
      languages: {
        en: baseUrl,
      },
    },
  }

  // Tool pages - High priority, updated weekly
  const toolPages: MetadataRoute.Sitemap = socialTools.map((tool) => ({
    url: `${baseUrl}${tool.path}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9, // Increased priority for tools
    alternates: {
      languages: {
        en: `${baseUrl}${tool.path}`,
      },
    },
  }))

  // Tool review pages - Medium priority
  const toolReviewPages: MetadataRoute.Sitemap = socialMediaTools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
    alternates: {
      languages: {
        en: `${baseUrl}/tools/${tool.id}`,
      },
    },
  }))

  // Blog pages - Higher priority for featured posts
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
    changeFrequency: 'weekly',
    priority: post.featured ? 0.9 : 0.8, // Featured posts get higher priority
    alternates: {
      languages: {
        en: `${baseUrl}/blog/${post.slug}`,
      },
    },
  }))

  // Static pages with optimized priorities and frequencies
  const staticPages: MetadataRoute.Sitemap = [
    // High priority pages
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95, // Very high priority - main tools listing
      alternates: {
        languages: {
          en: `${baseUrl}/tools`,
        },
      },
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85, // High priority - blog listing
      alternates: {
        languages: {
          en: `${baseUrl}/blog`,
        },
      },
    },
    // Medium priority pages
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/about`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75, // Slightly higher - FAQ is important for SEO
      alternates: {
        languages: {
          en: `${baseUrl}/faq`,
        },
      },
    },
    {
      url: `${baseUrl}/author`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          en: `${baseUrl}/author`,
        },
      },
    },
    // Low priority legal pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/privacy`,
        },
      },
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/terms`,
        },
      },
    },
  ]

  // Sort by priority (highest first) for better SEO
  const allPages: MetadataRoute.Sitemap = [
    homepage,
    ...staticPages,
    ...toolPages,
    ...blogPages.sort((a, b) => (b.priority || 0) - (a.priority || 0)), // Featured posts first
    ...toolReviewPages,
  ]

  return allPages
}

