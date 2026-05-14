import { MetadataRoute } from 'next'
import { socialTools } from '@/lib/social-tools'
import { socialMediaTools } from '@/lib/tools'
import { blogPosts } from '@/lib/blog-posts'
import { aiDirectoryTools } from '@/lib/ai-directory'
import { categoryTools } from '@/lib/category-tools'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aisocialtools.co'

  // Static date groups — avoids every page appearing "modified today" on every deploy.
  // Update CONTENT_REFRESHED when you do a meaningful content pass.
  const CONTENT_REFRESHED = new Date('2026-05-14')  // last major content / tools update
  const STATIC_PAGE_DATE  = new Date('2026-01-01')  // structural pages that rarely change
  const LEGAL_PAGE_DATE   = new Date('2025-06-01')  // privacy / terms — changes rarely

  // Homepage - Highest priority
  const homepage: MetadataRoute.Sitemap[0] = {
    url: baseUrl,
    lastModified: CONTENT_REFRESHED,
    changeFrequency: 'daily',
    priority: 1.0
  }

  // Tool pages - High priority, updated weekly
  const toolPages: MetadataRoute.Sitemap = socialTools.map((tool) => ({
    url: `${baseUrl}${tool.path}`,
    lastModified: CONTENT_REFRESHED,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // Tool review pages - Medium priority
  const toolReviewPages: MetadataRoute.Sitemap = socialMediaTools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.id}`,
    lastModified: STATIC_PAGE_DATE,
    changeFrequency: 'monthly',
    priority: 0.7
  }))

  // Blog pages - Higher priority for featured posts
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
    changeFrequency: 'weekly',
    priority: post.featured ? 0.9 : 0.8,
  }))

  // Hub pages - cluster SEO plays, high priority
  const hubPages: MetadataRoute.Sitemap = [
    '/tools/instagram-tools',
    '/tools/youtube-tools',
    '/tools/image-tools'
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: CONTENT_REFRESHED,
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }))

  // Static pages with optimized priorities and frequencies
  const staticPages: MetadataRoute.Sitemap = [
    // High priority pages
    {
      url: `${baseUrl}/tools`,
      lastModified: CONTENT_REFRESHED,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/social-media`,
      lastModified: CONTENT_REFRESHED,
      changeFrequency: 'daily',
      priority: 0.93
    },
    {
      url: `${baseUrl}/tools/construction`,
      lastModified: CONTENT_REFRESHED,
      changeFrequency: 'weekly',
      priority: 0.88
    },
    {
      url: `${baseUrl}/tools/finance`,
      lastModified: CONTENT_REFRESHED,
      changeFrequency: 'weekly',
      priority: 0.88
    },
    {
      url: `${baseUrl}/tools/health-fitness`,
      lastModified: CONTENT_REFRESHED,
      changeFrequency: 'weekly',
      priority: 0.85
    },
    {
      url: `${baseUrl}/tools/education`,
      lastModified: CONTENT_REFRESHED,
      changeFrequency: 'weekly',
      priority: 0.82
    },
    // noindex pages excluded from sitemap — no live tools yet
    // /tools/real-estate, /tools/developer, /tools/everyday, /tools/cooking, /tools/location, /tools/math, /tools/science
    {
      url: `${baseUrl}/ai-directory`,
      lastModified: CONTENT_REFRESHED,
      changeFrequency: 'daily',
      priority: 0.92
    },
    {
      url: `${baseUrl}/ai-directory/submit`,
      lastModified: STATIC_PAGE_DATE,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: CONTENT_REFRESHED,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // Medium priority pages
    {
      url: `${baseUrl}/projects`,
      lastModified: STATIC_PAGE_DATE,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/about`,
      lastModified: STATIC_PAGE_DATE,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: STATIC_PAGE_DATE,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: CONTENT_REFRESHED,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/author`,
      lastModified: STATIC_PAGE_DATE,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    // Low priority legal pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: LEGAL_PAGE_DATE,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: LEGAL_PAGE_DATE,
      changeFrequency: 'yearly',
      priority: 0.3
    }
  ]

  // AI Directory tool detail pages
  const aiDirectoryPages: MetadataRoute.Sitemap = aiDirectoryTools
    .filter((t) => t.approved)
    .map((tool) => ({
      url: `${baseUrl}/ai-directory/${tool.slug}`,
      lastModified: CONTENT_REFRESHED,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))

  // Live tools under category hubs (BMI, mortgage, etc.) — high priority
  const liveCategoryToolPages: MetadataRoute.Sitemap = categoryTools.map((tool) => ({
    url: `${baseUrl}${tool.path}`,
    lastModified: CONTENT_REFRESHED,
    changeFrequency: 'weekly' as const,
    priority: 0.88
  }))

  // Sort by priority (highest first) for better SEO
  const allPages: MetadataRoute.Sitemap = [
    homepage,
    ...staticPages,
    ...hubPages,
    ...liveCategoryToolPages,
    ...toolPages,
    ...aiDirectoryPages,
    ...blogPages.sort((a, b) => (b.priority || 0) - (a.priority || 0)), // Featured posts first
    ...toolReviewPages
  ]

  return allPages
}

