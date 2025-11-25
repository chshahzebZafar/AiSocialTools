export interface SocialMediaTool {
  id: string;
  name: string;
  description: string;
  category: string;
  website: string;
  pricing: string;
  features: string[];
  rating: number;
  isRecommended: boolean;
  logo?: string;
}

export const socialMediaTools: SocialMediaTool[] = [
  {
    id: "buffer",
    name: "Buffer",
    description: "Social media management platform for scheduling posts, analyzing performance, and managing multiple accounts.",
    category: "Scheduling & Management",
    website: "https://buffer.com",
    pricing: "Free plan available, paid plans from $6/month",
    features: [
      "Post scheduling across multiple platforms",
      "Analytics and performance tracking",
      "Team collaboration",
      "Content calendar",
      "Browser extension"
    ],
    rating: 4.5,
    isRecommended: true
  },
  {
    id: "hootsuite",
    name: "Hootsuite",
    description: "Comprehensive social media management tool with scheduling, monitoring, and analytics capabilities.",
    category: "Scheduling & Management",
    website: "https://hootsuite.com",
    pricing: "Free plan available, paid plans from $99/month",
    features: [
      "Multi-platform scheduling",
      "Social listening and monitoring",
      "Team management",
      "Advanced analytics",
      "Content library"
    ],
    rating: 4.4,
    isRecommended: true
  },
  {
    id: "canva",
    name: "Canva",
    description: "Graphic design tool with templates for social media posts, stories, and marketing materials.",
    category: "Design & Graphics",
    website: "https://canva.com",
    pricing: "Free plan available, paid plans from $12.99/month",
    features: [
      "Thousands of templates",
      "Drag-and-drop editor",
      "Brand kit",
      "Photo editor",
      "Video editing"
    ],
    rating: 4.8,
    isRecommended: true
  },
  {
    id: "later",
    name: "Later",
    description: "Visual social media scheduler with Instagram-first features and content calendar.",
    category: "Scheduling & Management",
    website: "https://later.com",
    pricing: "Free plan available, paid plans from $25/month",
    features: [
      "Visual content calendar",
      "Instagram scheduling",
      "Link in bio tool",
      "Analytics dashboard",
      "User-generated content"
    ],
    rating: 4.6,
    isRecommended: true
  },
  {
    id: "sprout-social",
    name: "Sprout Social",
    description: "Enterprise social media management platform with advanced analytics and customer engagement tools.",
    category: "Scheduling & Management",
    website: "https://sproutsocial.com",
    pricing: "Paid plans from $249/month",
    features: [
      "Social listening",
      "Customer relationship management",
      "Advanced reporting",
      "Team collaboration",
      "Competitor analysis"
    ],
    rating: 4.5,
    isRecommended: false
  },
  {
    id: "adobe-express",
    name: "Adobe Express",
    description: "Quick and easy design tool for creating social media graphics, videos, and animations.",
    category: "Design & Graphics",
    website: "https://express.adobe.com",
    pricing: "Free plan available, paid plans from $9.99/month",
    features: [
      "Quick templates",
      "AI-powered design",
      "Video creation",
      "Photo editing",
      "Brand assets"
    ],
    rating: 4.4,
    isRecommended: false
  },
  {
    id: "socialbakers",
    name: "Socialbakers",
    description: "AI-powered social media marketing suite with analytics, content creation, and influencer marketing.",
    category: "Analytics & Insights",
    website: "https://socialbakers.com",
    pricing: "Contact for pricing",
    features: [
      "AI content recommendations",
      "Influencer discovery",
      "Competitive analysis",
      "Advanced analytics",
      "Content performance tracking"
    ],
    rating: 4.3,
    isRecommended: false
  },
  {
    id: "brandwatch",
    name: "Brandwatch",
    description: "Social listening and analytics platform for understanding brand sentiment and market trends.",
    category: "Analytics & Insights",
    website: "https://brandwatch.com",
    pricing: "Contact for pricing",
    features: [
      "Social listening",
      "Sentiment analysis",
      "Trend detection",
      "Influencer identification",
      "Crisis management"
    ],
    rating: 4.2,
    isRecommended: false
  },
  {
    id: "linktree",
    name: "Linktree",
    description: "Link in bio tool that allows you to share multiple links from your social media profile.",
    category: "Link Management",
    website: "https://linktr.ee",
    pricing: "Free plan available, paid plans from $6/month",
    features: [
      "Multiple links in bio",
      "Customizable themes",
      "Analytics",
      "Email collection",
      "Social media integration"
    ],
    rating: 4.5,
    isRecommended: true
  },
  {
    id: "grammarly",
    name: "Grammarly",
    description: "Writing assistant that helps improve grammar, tone, and clarity in social media posts.",
    category: "Content Creation",
    website: "https://grammarly.com",
    pricing: "Free plan available, paid plans from $12/month",
    features: [
      "Grammar checking",
      "Tone detection",
      "Plagiarism checker",
      "Writing suggestions",
      "Browser extension"
    ],
    rating: 4.7,
    isRecommended: true
  },
  {
    id: "capcut",
    name: "CapCut",
    description: "Free video editing app perfect for creating engaging social media content with templates and effects.",
    category: "Video Editing",
    website: "https://capcut.com",
    pricing: "Free",
    features: [
      "Video editing",
      "Templates and effects",
      "Text animations",
      "Music library",
      "Auto-captions"
    ],
    rating: 4.6,
    isRecommended: true
  },
  {
    id: "unsplash",
    name: "Unsplash",
    description: "High-quality free stock photos perfect for social media posts and marketing materials.",
    category: "Stock Media",
    website: "https://unsplash.com",
    pricing: "Free",
    features: [
      "High-resolution photos",
      "Free to use",
      "Curated collections",
      "Search functionality",
      "API access"
    ],
    rating: 4.8,
    isRecommended: true
  },
  {
    id: "mention",
    name: "Mention",
    description: "Social media monitoring tool that tracks brand mentions across the web and social platforms.",
    category: "Monitoring & Listening",
    website: "https://mention.com",
    pricing: "Free plan available, paid plans from $41/month",
    features: [
      "Brand monitoring",
      "Mention tracking",
      "Sentiment analysis",
      "Competitor tracking",
      "Crisis alerts"
    ],
    rating: 4.3,
    isRecommended: false
  },
  {
    id: "tailwind",
    name: "Tailwind",
    description: "Visual marketing calendar and Instagram scheduler with hashtag suggestions and analytics.",
    category: "Scheduling & Management",
    website: "https://www.tailwindapp.com",
    pricing: "Free plan available, paid plans from $9.99/month",
    features: [
      "Instagram scheduling",
      "Pinterest scheduling",
      "Hashtag suggestions",
      "Best time to post",
      "Analytics"
    ],
    rating: 4.4,
    isRecommended: false
  },
  {
    id: "buzzsumo",
    name: "BuzzSumo",
    description: "Content research tool that helps you find trending topics and analyze content performance.",
    category: "Content Research",
    website: "https://buzzsumo.com",
    pricing: "Paid plans from $99/month",
    features: [
      "Content discovery",
      "Trending topics",
      "Influencer research",
      "Content analysis",
      "Backlink checker"
    ],
    rating: 4.5,
    isRecommended: false
  }
];

export const getToolById = (id: string): SocialMediaTool | undefined => {
  return socialMediaTools.find(tool => tool.id === id);
};

export const getRecommendedTools = (): SocialMediaTool[] => {
  return socialMediaTools.filter(tool => tool.isRecommended);
};

export const getToolsByCategory = (category: string): SocialMediaTool[] => {
  return socialMediaTools.filter(tool => tool.category === category);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(socialMediaTools.map(tool => tool.category)));
};

