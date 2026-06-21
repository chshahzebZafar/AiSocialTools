/**
 * Tool categories shown on /tools. Each tool belongs to exactly one category
 * (a platform like Instagram/YouTube, or a function like Image & Design).
 *
 * Adding a tool: add it to lib/social-tools.ts, then add `"<id>": "<category-slug>"`
 * to `toolCategoryMap` below so it shows up under the right category.
 */

import type { LucideIcon } from "lucide-react";
import {
  Instagram,
  Twitter,
  Youtube,
  Music2,
  Facebook,
  Pin,
  Linkedin,
  MessageCircle,
  PenTool,
  Image as ImageIcon,
  BarChart3,
  Wrench,
  Ghost,
  MessagesSquare,
  Send,
  MessageSquare,
  Twitch,
  AtSign,
  Camera,
} from "lucide-react";
import { socialTools, type SocialTool } from "@/lib/social-tools";

export interface ToolCategory {
  slug: string;
  name: string;
  /** Short label used in cards / badges */
  shortName: string;
  description: string;
  icon: LucideIcon;
}

export const toolCategories: ToolCategory[] = [
  { slug: "instagram", name: "Instagram Tools", shortName: "Instagram", description: "Filters, post mockups, downloaders, fonts, and engagement calculators for Instagram.", icon: Instagram },
  { slug: "twitter", name: "Twitter / X Tools", shortName: "Twitter / X", description: "Tweet generators, tweet-to-image, thread maker, character counter, and revenue estimators.", icon: Twitter },
  { slug: "youtube", name: "YouTube Tools", shortName: "YouTube", description: "Thumbnail downloader, tag and description generators, and an earnings calculator.", icon: Youtube },
  { slug: "tiktok", name: "TikTok Tools", shortName: "TikTok", description: "Hook and idea generators plus username ideas for TikTok creators.", icon: Music2 },
  { slug: "facebook", name: "Facebook Tools", shortName: "Facebook", description: "Thumbnail downloader and helpers for Facebook content.", icon: Facebook },
  { slug: "pinterest", name: "Pinterest Tools", shortName: "Pinterest", description: "Download videos and images from Pinterest pins.", icon: Pin },
  { slug: "linkedin", name: "LinkedIn Tools", shortName: "LinkedIn", description: "Headline generators and profile helpers for LinkedIn.", icon: Linkedin },
  { slug: "whatsapp", name: "WhatsApp Tools", shortName: "WhatsApp", description: "Click-to-chat link generators and messaging utilities.", icon: MessageCircle },
  { slug: "snapchat", name: "Snapchat Tools", shortName: "Snapchat", description: "Username and bio generators, emoji meanings, streak and score calculators for Snapchat.", icon: Ghost },
  { slug: "discord", name: "Discord Tools", shortName: "Discord", description: "Username, server name, and bio generators plus a fancy font maker for Discord.", icon: MessagesSquare },
  { slug: "telegram", name: "Telegram Tools", shortName: "Telegram", description: "Username, group, channel, and bio generators plus t.me link builders for Telegram.", icon: Send },
  { slug: "reddit", name: "Reddit Tools", shortName: "Reddit", description: "Username and post-title generators plus a karma reference for Reddit.", icon: MessageSquare },
  { slug: "twitch", name: "Twitch Tools", shortName: "Twitch", description: "Username, bio, and stream-title generators plus an earnings estimator for Twitch.", icon: Twitch },
  { slug: "threads", name: "Threads Tools", shortName: "Threads", description: "Username, bio, caption, and hashtag generators for Threads.", icon: AtSign },
  { slug: "bereal", name: "BeReal Tools", shortName: "BeReal", description: "Caption and username generators for BeReal.", icon: Camera },
  { slug: "content-writing", name: "Content & Writing", shortName: "Content", description: "Hashtags, captions, bios, usernames, emojis, and content ideas for any platform.", icon: PenTool },
  { slug: "image-design", name: "Image & Design", shortName: "Image & Design", description: "Resize, compress, convert, and enhance images, plus palettes, patterns, and size references.", icon: ImageIcon },
  { slug: "analytics", name: "Analytics & Calculators", shortName: "Analytics", description: "Engagement, best-time-to-post, and social media metric calculators.", icon: BarChart3 },
  { slug: "links-utilities", name: "Links & Utilities", shortName: "Links & Utilities", description: "Bio links, QR codes, and Open Graph meta — handy utilities for creators.", icon: Wrench },
];

/** tool id -> category slug */
export const toolCategoryMap: Record<string, string> = {
  // Instagram
  "instagram-filters": "instagram",
  "instagram-post-generator": "instagram",
  "instagram-photo-downloader": "instagram",
  "instagram-engagement-calculator": "instagram",
  "instagram-fonts": "instagram",
  // Twitter / X
  "tweet-generator": "twitter",
  "tweet-to-image": "twitter",
  "twitter-ad-revenue": "twitter",
  "twitter-character-counter": "twitter",
  "tweet-thread-maker": "twitter",
  // YouTube
  "youtube-thumbnail": "youtube",
  "youtube-tag-generator": "youtube",
  "youtube-description-generator": "youtube",
  "youtube-money-calculator": "youtube",
  // TikTok
  "tiktok-hook-generator": "tiktok",
  "tiktok-username-generator": "tiktok",
  // Facebook
  "facebook-thumbnail": "facebook",
  // Pinterest
  "pinterest-video-downloader": "pinterest",
  // LinkedIn
  "linkedin-headline-generator": "linkedin",
  // WhatsApp
  "whatsapp-chat": "whatsapp",
  // Snapchat
  "snapchat-username-generator": "snapchat",
  "snapchat-bio-generator": "snapchat",
  "snapchat-emoji-meaning": "snapchat",
  "funny-snapchat-username-generator": "snapchat",
  "cool-snapchat-username-generator": "snapchat",
  "aesthetic-snapchat-username-generator": "snapchat",
  "gaming-snapchat-username-generator": "snapchat",
  "girl-snapchat-username-generator": "snapchat",
  "boy-snapchat-username-generator": "snapchat",
  "business-snapchat-username-generator": "snapchat",
  // Content & Writing
  "hashtag-generator": "content-writing",
  "hashtag-counter": "content-writing",
  "character-counter": "content-writing",
  "username-generator": "content-writing",
  "social-bio-generator": "content-writing",
  "caption-templates": "content-writing",
  "content-ideas": "content-writing",
  "emoji-picker": "content-writing",
  "text-case-converter": "content-writing",
  "content-calendar": "content-writing",
  // Image & Design
  "image-resizer": "image-design",
  "image-compressor": "image-design",
  "image-converter": "image-design",
  "color-palette": "image-design",
  "svg-pattern-generator": "image-design",
  "image-upscaler": "image-design",
  "video-to-gif": "image-design",
  "text-to-handwriting": "image-design",
  "social-media-image-sizes": "image-design",
  "vimeo-thumbnail": "image-design",
  // Analytics & Calculators
  "engagement-calculator": "analytics",
  "best-time-calculator": "analytics",
  "analytics-calculator": "analytics",
  // Links & Utilities
  "bio-link-generator": "links-utilities",
  "qr-code-generator": "links-utilities",
  "open-graph-generator": "links-utilities",
};

export function getCategoryBySlug(slug: string): ToolCategory | undefined {
  return toolCategories.find((c) => c.slug === slug);
}

export function getToolsInCategory(slug: string): SocialTool[] {
  return socialTools.filter((t) => toolCategoryMap[t.id] === slug);
}

/** Count helper for cards */
export function categoryToolCount(slug: string): number {
  return socialTools.filter((t) => toolCategoryMap[t.id] === slug).length;
}
