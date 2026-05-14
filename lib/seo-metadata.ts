import { Metadata } from "next";
import { SocialTool } from "./social-tools";
import { getOGImageUrl } from "./og-image-generator";

interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  longTailKeywords: string[];
  structuredData: object;
}

export const getSEOMetadata = (tool: SocialTool): SEOConfig => {
  const seoConfigs: Record<string, SEOConfig> = {
    "tweet-generator": {
      title: "Best Free AI Tweet Generator Online - Create Engaging Tweets 2026",
      description: "Generate creative tweets instantly with our free AI tweet generator. Create viral Twitter content and optimize character count. No signup required.",
      keywords: [
        "tweet generator",
        "twitter post generator",
        "AI tweet generator",
        "free tweet generator",
        "best tweet generator",
        "twitter content generator",
        "generate tweets online",
        "tweet ideas generator",
        "social media tweet generator",
        "free twitter post generator",
        "online tweet generator",
        "tweet generator tool",
        "create tweets online",
        "twitter content creator",
        "free AI tweet maker"
      ],
      longTailKeywords: [
        "how to generate engaging tweets",
        "best free AI tweet generator online",
        "best tweet generator tool free",
        "create viral tweets automatically",
        "twitter post generator free online",
        "generate tweet ideas for business",
        "AI powered tweet creator free",
        "how to create engaging twitter posts",
        "free tweet generator no signup",
        "best twitter content generator",
        "online tweet generator free",
        "what is the best tweet generator"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Tweet Generator",
        "description": "Free AI-powered tweet generator to create engaging Twitter posts",
        "url": "https://aisocialtools.co/tools/tweet-generator",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    },
    "tweet-to-image": {
      title: "Tweet to Image Converter - Convert Tweets to Images",
      description: "Convert Twitter posts into shareable images. Free tweet to image converter with custom themes. Download as PNG. No signup required.",
      keywords: [
        "tweet to image",
        "twitter to image converter",
        "convert tweet to image",
        "tweet image generator",
        "twitter screenshot generator",
        "tweet image maker",
        "social media image creator"
      ],
      longTailKeywords: [
        "how to convert tweet to image",
        "free tweet to image converter online",
        "create image from twitter post",
        "download tweet as image",
        "tweet screenshot generator free",
        "convert twitter post to PNG"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Tweet to Image Converter",
        "description": "Convert Twitter posts into shareable images",
        "applicationCategory": "ImageEditingApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "hashtag-generator": {
      title: "Best Free Hashtag Generator Online - Trending Hashtags 2026",
      description: "Generate trending hashtags for Instagram, Twitter, TikTok, and LinkedIn. Free hashtag generator with platform-specific suggestions. No signup required.",
      keywords: [
        "hashtag generator",
        "instagram hashtag generator",
        "twitter hashtag generator",
        "free hashtag generator",
        "best hashtag generator",
        "hashtag finder",
        "trending hashtags generator",
        "social media hashtags",
        "hashtag generator online",
        "free hashtag tool",
        "instagram hashtags generator",
        "tiktok hashtag generator",
        "hashtag generator free online"
      ],
      longTailKeywords: [
        "how to generate hashtags for instagram",
        "best free hashtag generator online",
        "generate trending hashtags for twitter",
        "instagram hashtag generator tool free",
        "find relevant hashtags for social media",
        "hashtag generator for business",
        "how to find best hashtags for instagram",
        "free hashtag generator no signup",
        "best hashtag generator 2026",
        "online hashtag generator free",
        "what are the best hashtags for instagram"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Hashtag Generator",
        "description": "Generate relevant hashtags for social media platforms",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "instagram-post-generator": {
      title: "Best Free Instagram Post Generator Online - Create Engaging Captions 2026",
      description: "Generate engaging Instagram captions with our free post generator. Templates, hashtags, and emoji suggestions. No signup required.",
      keywords: [
        "instagram post generator",
        "instagram caption generator",
        "instagram content generator",
        "free instagram post generator",
        "best instagram post generator",
        "instagram caption maker",
        "instagram post ideas",
        "social media caption generator",
        "instagram caption generator free",
        "online instagram post generator",
        "free instagram caption tool",
        "instagram content creator"
      ],
      longTailKeywords: [
        "how to generate instagram posts",
        "best free instagram caption generator online",
        "create engaging instagram captions",
        "instagram post generator with hashtags",
        "generate instagram content ideas",
        "best instagram caption generator free",
        "how to create instagram captions",
        "free instagram post generator no signup",
        "best instagram post generator 2026",
        "online instagram caption generator",
        "what is the best instagram caption generator"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Instagram Post Generator",
        "description": "Generate engaging Instagram posts and captions",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "youtube-thumbnail": {
      title: "Best Free YouTube Thumbnail Downloader Online - Download HD Thumbnails 2026",
      description: "Download YouTube video thumbnails in HD quality. Free YouTube thumbnail downloader with max resolution, HQ, MQ, SD options. No signup.",
      keywords: [
        "youtube thumbnail downloader",
        "youtube thumbnail grabber",
        "download youtube thumbnail",
        "youtube thumbnail extractor",
        "get youtube thumbnail",
        "youtube thumbnail download",
        "free youtube thumbnail grabber",
        "best youtube thumbnail downloader",
        "youtube thumbnail downloader free",
        "online youtube thumbnail downloader",
        "free youtube thumbnail tool",
        "download youtube thumbnail hd"
      ],
      longTailKeywords: [
        "how to download youtube thumbnail",
        "best free youtube thumbnail downloader online",
        "extract youtube video thumbnail",
        "download youtube thumbnail in high quality",
        "youtube thumbnail grabber tool free",
        "get youtube thumbnail image",
        "how to get youtube thumbnail url",
        "free youtube thumbnail downloader no signup",
        "best youtube thumbnail downloader 2026",
        "online youtube thumbnail extractor free",
        "download youtube thumbnail hd quality"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "YouTube Thumbnail Grabber",
        "description": "Download YouTube video thumbnails in high quality",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "open-graph-generator": {
      title: "Open Graph Generator - Free OG Tags for SEO",
      description: "Generate Open Graph meta tags for Facebook, Twitter, and LinkedIn. Free OG tag generator with live preview. Improves social sharing.",
      keywords: [
        "open graph generator",
        "og tags generator",
        "meta tags generator",
        "social media meta tags",
        "facebook og tags",
        "twitter card generator",
        "open graph meta tags"
      ],
      longTailKeywords: [
        "how to generate open graph tags",
        "free og tags generator online",
        "create open graph meta tags",
        "facebook open graph generator",
        "twitter card meta tags generator",
        "social media sharing tags generator"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Open Graph Meta Tags Generator",
        "description": "Generate Open Graph and Twitter Card meta tags",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "character-counter": {
      title: "Character Counter - Count Text for All Platforms",
      description: "Count characters for Twitter, Instagram, Facebook, LinkedIn, and more. Free character counter with platform limits in real time.",
      keywords: [
        "character counter",
        "twitter character counter",
        "instagram character counter",
        "social media character counter",
        "character count tool",
        "text counter",
        "character limit checker"
      ],
      longTailKeywords: [
        "how to count characters for twitter",
        "free character counter for social media",
        "check character limit instagram",
        "twitter character count tool",
        "social media character limit checker",
        "count characters for all platforms"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Character Counter",
        "description": "Count characters for different social media platforms",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "image-resizer": {
      title: "Image Resizer - Resize for Instagram & Facebook",
      description: "Resize images for Instagram, Facebook, Twitter, LinkedIn, and more. Free image resizer with platform-specific dimensions. No signup.",
      keywords: [
        "image resizer",
        "social media image resizer",
        "instagram image resizer",
        "resize image for social media",
        "image size optimizer",
        "social media image dimensions",
        "free image resizer"
      ],
      longTailKeywords: [
        "how to resize image for instagram",
        "free social media image resizer online",
        "resize image for facebook post",
        "instagram post size resizer",
        "social media image size converter",
        "optimize images for social media"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Image Resizer",
        "description": "Resize images for different social media platforms",
        "applicationCategory": "ImageEditingApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "qr-code-generator": {
      title: "Free QR Code Generator - Create QR Codes for Links",
      description: "Generate QR codes for Instagram, Twitter, Facebook, or any URL. Free QR generator with custom colors and sizes. Download as PNG.",
      keywords: [
        "qr code generator",
        "free qr code generator",
        "qr code maker",
        "create qr code",
        "qr code generator online",
        "social media qr code",
        "instagram qr code generator"
      ],
      longTailKeywords: [
        "how to generate qr code for instagram",
        "free qr code generator online",
        "create qr code for social media",
        "qr code generator for links",
        "custom qr code generator free",
        "download qr code as image"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "QR Code Generator",
        "description": "Generate QR codes for social media profiles and links",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "username-generator": {
      title: "Username Generator - Generate Unique Usernames Free",
      description: "Generate unique, available usernames for Instagram, Twitter, TikTok, and more. Free username generator with variations. No signup.",
      keywords: [
        "username generator",
        "instagram username generator",
        "social media username generator",
        "generate username",
        "username ideas",
        "available username generator",
        "unique username generator"
      ],
      longTailKeywords: [
        "how to generate username for instagram",
        "free username generator online",
        "create unique social media username",
        "instagram username ideas generator",
        "find available username",
        "username generator for business"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Username Generator",
        "description": "Generate unique usernames for social media",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "social-bio-generator": {
      title: "Bio Generator - Create Instagram & Twitter Bios",
      description: "Generate compelling bios for Instagram, Twitter, LinkedIn, and TikTok. Free bio generator with templates. Create bios that convert.",
      keywords: [
        "bio generator",
        "instagram bio generator",
        "twitter bio generator",
        "social media bio generator",
        "bio maker",
        "instagram bio ideas",
        "create social media bio"
      ],
      longTailKeywords: [
        "how to create instagram bio",
        "free bio generator for social media",
        "generate professional social media bio",
        "instagram bio generator with emojis",
        "create engaging twitter bio",
        "social media bio template generator"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Social Media Bio Generator",
        "description": "Generate compelling bios for social media platforms",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "engagement-calculator": {
      title: "Engagement Calculator - Calculate Engagement Rate",
      description: "Calculate engagement rate, reach rate, and metrics. Free engagement calculator for Instagram, Twitter, Facebook. Instant results.",
      keywords: [
        "engagement calculator",
        "engagement rate calculator",
        "social media engagement calculator",
        "calculate engagement rate",
        "instagram engagement calculator",
        "social media metrics calculator",
        "engagement rate tool"
      ],
      longTailKeywords: [
        "how to calculate engagement rate",
        "free engagement rate calculator online",
        "calculate instagram engagement rate",
        "social media engagement rate formula",
        "engagement calculator for instagram",
        "measure social media engagement"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Engagement Calculator",
        "description": "Calculate social media engagement rates and metrics",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "twitter-ad-revenue": {
      title: "Twitter Ad Revenue Calculator - Calculate Revenue",
      description: "Calculate potential Twitter ad revenue based on followers, engagement, and CPM. Free Twitter ad revenue calculator. Estimate earnings from Twitter monetization.",
      keywords: [
        "twitter ad revenue calculator",
        "twitter revenue calculator",
        "calculate twitter ad revenue",
        "twitter monetization calculator",
        "twitter earnings calculator",
        "x ad revenue calculator",
        "twitter revenue estimator"
      ],
      longTailKeywords: [
        "how to calculate twitter ad revenue",
        "free twitter revenue calculator online",
        "estimate twitter ad revenue",
        "calculate twitter monetization",
        "twitter ad revenue estimator tool",
        "how much can you earn from twitter ads"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Twitter Ad Revenue Calculator",
        "description": "Calculate potential Twitter ad revenue",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "instagram-filters": {
      title: "Instagram Filters - Apply Photo Filters Online",
      description: "Apply beautiful Instagram-style filters to your photos. Free Instagram filter tool with multiple filter options. Edit photos online, no app required.",
      keywords: [
        "instagram filters",
        "photo filters",
        "instagram filter app",
        "apply instagram filters",
        "photo filter tool",
        "instagram style filters",
        "free photo filters"
      ],
      longTailKeywords: [
        "how to apply instagram filters online",
        "free instagram filter tool",
        "apply filters to photos",
        "instagram photo filter generator",
        "photo editing with instagram filters",
        "online instagram filter app"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Instagram Filters",
        "description": "Apply Instagram-style filters to photos",
        "applicationCategory": "ImageEditingApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "vimeo-thumbnail": {
      title: "Vimeo Thumbnail Grabber - Download Thumbnails Free",
      description: "Extract and download Vimeo video thumbnails in high quality. Free Vimeo thumbnail grabber. Download thumbnails from any Vimeo video instantly.",
      keywords: [
        "vimeo thumbnail downloader",
        "vimeo thumbnail grabber",
        "download vimeo thumbnail",
        "vimeo thumbnail extractor",
        "get vimeo thumbnail",
        "vimeo thumbnail download"
      ],
      longTailKeywords: [
        "how to download vimeo thumbnail",
        "free vimeo thumbnail downloader",
        "extract vimeo video thumbnail",
        "download vimeo thumbnail image",
        "vimeo thumbnail grabber tool"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Vimeo Thumbnail Grabber",
        "description": "Download Vimeo video thumbnails",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "bio-link-generator": {
      title: "Bio Link Generator - Create Link in Bio Page",
      description: "Create a custom link in bio page for Instagram, TikTok, and Twitter. Free bio link generator with multiple links. Build your own linktree-style page instantly.",
      keywords: [
        "bio link generator",
        "link in bio generator",
        "instagram bio link",
        "linktree generator",
        "bio link page",
        "social media link page",
        "free bio link generator"
      ],
      longTailKeywords: [
        "how to create link in bio page",
        "free bio link generator online",
        "create instagram bio link page",
        "linktree alternative free",
        "custom bio link page generator",
        "social media link aggregator"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Bio Link Generator",
        "description": "Create custom link in bio pages",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "content-calendar": {
      title: "Content Calendar - Plan & Schedule Posts",
      description: "Plan and schedule social media content with our free calendar. Organize posts, track dates, manage platforms. Boost your strategy.",
      keywords: [
        "content calendar",
        "social media calendar",
        "content planning tool",
        "social media scheduler",
        "content calendar template",
        "social media planner",
        "content scheduling tool"
      ],
      longTailKeywords: [
        "how to create social media content calendar",
        "free content calendar tool online",
        "plan social media posts",
        "social media content planning tool",
        "content calendar for instagram",
        "schedule social media content free"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Content Calendar",
        "description": "Plan and schedule social media content",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "color-palette": {
      title: "Color Palette Generator - Extract Colors from Images",
      description: "Extract color palettes from images for branding and design. Free color palette generator. Get dominant colors from photos. Perfect for social media branding.",
      keywords: [
        "color palette generator",
        "extract colors from image",
        "color picker from image",
        "palette generator",
        "image color extractor",
        "brand color generator",
        "color scheme generator"
      ],
      longTailKeywords: [
        "how to extract colors from image",
        "free color palette generator online",
        "get colors from photo",
        "image color palette extractor",
        "brand color palette generator",
        "extract dominant colors from image"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Color Palette Generator",
        "description": "Extract color palettes from images",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "text-case-converter": {
      title: "Text Case Converter - Uppercase, Lowercase & More",
      description: "Convert text to uppercase, lowercase, title case, camelCase, snake_case, and more. Free text case converter. Instant transformation.",
      keywords: [
        "text case converter",
        "case converter",
        "uppercase converter",
        "lowercase converter",
        "title case converter",
        "text formatter",
        "case changer"
      ],
      longTailKeywords: [
        "how to convert text case",
        "free text case converter online",
        "convert to title case",
        "text case converter tool",
        "uppercase lowercase converter",
        "camelCase converter free"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Text Case Converter",
        "description": "Convert text to different cases",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "emoji-picker": {
      title: "Emoji Picker - Copy Emojis for Social Media",
      description: "Browse and copy emojis for Instagram, Twitter, Facebook posts. Free emoji picker with categories. Find the perfect emoji for your social media content.",
      keywords: [
        "emoji picker",
        "emoji generator",
        "copy emojis",
        "emoji keyboard",
        "emoji selector",
        "social media emojis",
        "emoji tool"
      ],
      longTailKeywords: [
        "how to copy emojis for instagram",
        "free emoji picker online",
        "emoji generator for social media",
        "copy paste emojis",
        "emoji picker tool free",
        "find emojis for posts"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Emoji Picker",
        "description": "Browse and copy emojis for social media",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "best-time-calculator": {
      title: "Best Time to Post Calculator - Find Optimal Times",
      description: "Find the best times to post on Instagram, Twitter, Facebook, LinkedIn, and TikTok. Free posting time calculator. Maximize engagement.",
      keywords: [
        "best time to post",
        "posting time calculator",
        "optimal posting times",
        "when to post on instagram",
        "best time to post calculator",
        "social media posting times",
        "engagement time calculator"
      ],
      longTailKeywords: [
        "when is the best time to post on instagram",
        "free posting time calculator online",
        "best time to post on twitter",
        "optimal posting times for social media",
        "calculate best posting time",
        "social media posting schedule calculator"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Best Time to Post Calculator",
        "description": "Find optimal posting times for social media",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "caption-templates": {
      title: "Instagram Caption Templates - Free Templates",
      description: "Browse and use pre-made Instagram caption templates. Free social media caption templates for posts, stories, and reels. Copy, customize, and use instantly.",
      keywords: [
        "caption templates",
        "instagram caption templates",
        "social media captions",
        "caption ideas",
        "instagram caption ideas",
        "post caption templates",
        "free caption templates"
      ],
      longTailKeywords: [
        "how to write instagram captions",
        "free instagram caption templates",
        "social media caption templates",
        "instagram post caption ideas",
        "caption templates for business",
        "engaging caption templates"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Caption Templates",
        "description": "Browse and use pre-made caption templates",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "content-ideas": {
      title: "Content Ideas Generator - Generate Content Ideas",
      description: "Generate creative content ideas for Instagram, Twitter, LinkedIn, and TikTok. Free content ideas generator. Get inspiration for your next viral post.",
      keywords: [
        "content ideas generator",
        "social media content ideas",
        "instagram content ideas",
        "content inspiration",
        "post ideas generator",
        "social media ideas",
        "content creator ideas"
      ],
      longTailKeywords: [
        "how to generate content ideas",
        "free content ideas generator online",
        "instagram post ideas generator",
        "social media content inspiration",
        "generate content ideas for business",
        "viral content ideas generator"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Content Ideas Generator",
        "description": "Generate creative content ideas for social media",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "analytics-calculator": {
      title: "Analytics Calculator - Calculate KPIs & Metrics",
      description: "Calculate social media KPIs — CTR, conversion rate, CPC, CPA, and ROAS. Free analytics calculator for all major platforms.",
      keywords: [
        "social media analytics calculator",
        "analytics calculator",
        "social media metrics calculator",
        "kpi calculator",
        "ctr calculator",
        "conversion rate calculator",
        "social media analytics tool"
      ],
      longTailKeywords: [
        "how to calculate social media metrics",
        "free analytics calculator online",
        "calculate social media kpis",
        "social media performance calculator",
        "ctr conversion rate calculator",
        "social media roi calculator"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Social Media Analytics Calculator",
        "description": "Calculate social media metrics and KPIs",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "instagram-photo-downloader": {
      title: "Instagram Photo Downloader - Download Photos & Videos",
      description: "Download photos and videos from Instagram posts. Free Instagram downloader tool. Save Instagram content for offline viewing. No signup required.",
      keywords: [
        "instagram downloader",
        "instagram photo downloader",
        "download instagram photos",
        "instagram video downloader",
        "save instagram photos",
        "instagram content downloader",
        "free instagram downloader"
      ],
      longTailKeywords: [
        "how to download instagram photos",
        "free instagram photo downloader online",
        "download instagram images",
        "save instagram photos to computer",
        "instagram content downloader tool",
        "download instagram posts free"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Instagram Photo Downloader",
        "description": "Download photos and videos from Instagram",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "svg-pattern-generator": {
      title: "SVG Pattern Generator - Create Beautiful Patterns",
      description: "Generate stunning SVG patterns — mandalas, dots, grids, waves, hexagons. Customize colors, size, spacing. Free pattern generator.",
      keywords: [
        "svg pattern generator",
        "mandala generator",
        "pattern generator",
        "svg patterns",
        "geometric patterns",
        "pattern maker",
        "free pattern generator"
      ],
      longTailKeywords: [
        "how to create svg patterns",
        "free svg pattern generator online",
        "generate mandala patterns",
        "create geometric patterns",
        "svg pattern maker tool",
        "pattern generator for social media"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "SVG Pattern Generator",
        "description": "Generate beautiful SVG patterns for social media",
        "url": "https://aisocialtools.co/tools/svg-pattern-generator",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    },
    "image-to-pdf": {
      title: "Image to PDF Converter - Convert Images to PDF Free",
      description: "Convert JPG, PNG, GIF images to PDF format. Merge multiple images into one PDF document. Free image to PDF converter. No signup required.",
      keywords: [
        "image to pdf",
        "jpg to pdf",
        "png to pdf",
        "convert image to pdf",
        "image pdf converter",
        "merge images to pdf",
        "free image to pdf converter"
      ],
      longTailKeywords: [
        "how to convert image to pdf",
        "free image to pdf converter online",
        "convert jpg to pdf",
        "merge multiple images into pdf",
        "image to pdf converter tool",
        "convert png to pdf free"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Image to PDF Converter",
        "description": "Convert images to PDF format and merge multiple images into one PDF",
        "url": "https://aisocialtools.co/tools/image-to-pdf",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    },
    "word-to-pdf": {
      title: "Word/Text to PDF Converter - Create PDF from Text",
      description: "Convert text documents to PDF format. Create professional PDFs from your text content. Free word to PDF converter. No signup required.",
      keywords: [
        "word to pdf",
        "text to pdf",
        "convert word to pdf",
        "word pdf converter",
        "text pdf converter",
        "document to pdf",
        "free word to pdf converter"
      ],
      longTailKeywords: [
        "how to convert word to pdf",
        "free word to pdf converter online",
        "convert text document to pdf",
        "word document to pdf converter",
        "text to pdf converter tool",
        "create pdf from text free"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Word/Text to PDF Converter",
        "description": "Convert text documents and Word content to PDF format",
        "url": "https://aisocialtools.co/tools/word-to-pdf",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    },
    "pdf-to-image": {
      title: "PDF to Image Converter - Extract Images from PDF",
      description: "Extract images from PDF files or convert PDF pages to images (PNG, JPG). Free PDF to image converter. Download PDF pages as images.",
      keywords: [
        "pdf to image",
        "pdf to png",
        "pdf to jpg",
        "extract images from pdf",
        "pdf image converter",
        "convert pdf to image",
        "free pdf to image converter"
      ],
      longTailKeywords: [
        "how to convert pdf to image",
        "free pdf to image converter online",
        "extract images from pdf file",
        "pdf to png converter",
        "convert pdf pages to images",
        "pdf image extractor tool"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "PDF to Image Converter",
        "description": "Extract images from PDF files or convert PDF pages to images",
        "url": "https://aisocialtools.co/tools/pdf-to-image",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    },
    "pdf-merger": {
      title: "PDF Merger - Merge Multiple PDFs into One",
      description: "Merge multiple PDF files into one document. Combine PDFs easily and quickly. Free PDF merger tool. No signup required.",
      keywords: [
        "pdf merger",
        "merge pdf",
        "combine pdf files",
        "pdf combiner",
        "merge multiple pdfs",
        "pdf merge tool",
        "free pdf merger"
      ],
      longTailKeywords: [
        "how to merge pdf files",
        "free pdf merger online",
        "combine multiple pdf files",
        "merge pdf documents",
        "pdf merger tool free",
        "combine pdfs into one file"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "PDF Merger",
        "description": "Merge multiple PDF files into one document",
        "url": "https://aisocialtools.co/tools/pdf-merger",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    },
    "pdf-splitter": {
      title: "PDF Splitter - Split PDF Files into Multiple Documents",
      description: "Split PDF files into multiple documents. Extract specific pages from PDF files. Free PDF splitter tool. No signup required.",
      keywords: [
        "pdf splitter",
        "split pdf",
        "extract pages from pdf",
        "pdf page extractor",
        "split pdf file",
        "pdf split tool",
        "free pdf splitter"
      ],
      longTailKeywords: [
        "how to split pdf file",
        "free pdf splitter online",
        "extract pages from pdf",
        "split pdf into multiple files",
        "pdf page extractor tool",
        "divide pdf file into pages"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "PDF Splitter",
        "description": "Split PDF files into multiple documents or extract specific pages",
        "url": "https://aisocialtools.co/tools/pdf-splitter",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    },
    "twitter-character-counter": {
      title: "Twitter / X Character Counter - Free, Accurate URL Weighting",
      description: "Count characters for Twitter / X with the URL-weighting rule (every link = 23 chars). Free counter with thread-split preview.",
      keywords: [
        "twitter character counter",
        "x character counter",
        "tweet character counter",
        "twitter char count",
        "x character count",
        "twitter 280 character counter",
        "tweet length checker",
        "twitter post counter",
        "x post character count",
        "free twitter character counter"
      ],
      longTailKeywords: [
        "how many characters can a tweet have",
        "free twitter character counter online",
        "twitter character counter with url",
        "does twitter count urls as 23 characters",
        "tweet character limit tool",
        "x character limit checker",
        "count characters for a tweet",
        "twitter post character counter free",
        "best tweet character counter 2026"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Twitter / X Character Counter",
        "description": "Count characters for Twitter / X posts with accurate URL weighting.",
        "url": "https://aisocialtools.co/tools/twitter-character-counter",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "tweet-thread-maker": {
      title: "Tweet Thread Maker - Free Twitter / X Thread Generator",
      description: "Turn long text into a numbered Twitter / X thread automatically. Free tweet thread maker with 280-character smart splits and 1/n numbering. No signup required.",
      keywords: [
        "tweet thread maker",
        "tweet thread generator",
        "twitter thread maker",
        "x thread maker",
        "twitter thread generator",
        "thread splitter twitter",
        "tweet splitter",
        "twitter long post splitter",
        "thread maker free",
        "tweet thread creator"
      ],
      longTailKeywords: [
        "how to make a twitter thread from text",
        "free tweet thread generator online",
        "split long text into tweets",
        "twitter thread maker no signup",
        "best tweet thread generator 2026",
        "how to create numbered twitter threads",
        "long text to twitter thread converter"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Tweet Thread Maker",
        "description": "Split long text into a numbered Twitter thread.",
        "url": "https://aisocialtools.co/tools/tweet-thread-maker",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "instagram-engagement-calculator": {
      title: "Instagram Engagement Rate Calculator - Free & Instant",
      description: "Calculate Instagram engagement rate instantly. Free calculator with 2026 benchmarks, per-post breakdown, and saved-post tracking.",
      keywords: [
        "instagram engagement rate calculator",
        "instagram engagement calculator",
        "engagement rate calculator instagram",
        "ig engagement rate calculator",
        "instagram er calculator",
        "calculate instagram engagement",
        "instagram performance calculator",
        "instagram engagement tool",
        "free instagram engagement calculator"
      ],
      longTailKeywords: [
        "how to calculate instagram engagement rate",
        "what is a good engagement rate on instagram",
        "instagram engagement rate formula 2026",
        "free instagram engagement calculator online",
        "calculate engagement rate per post instagram",
        "instagram engagement benchmarks by follower count",
        "instagram reels engagement rate calculator"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Instagram Engagement Rate Calculator",
        "description": "Calculate Instagram engagement rate with 2026 benchmarks.",
        "url": "https://aisocialtools.co/tools/instagram-engagement-calculator",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "tiktok-username-generator": {
      title: "TikTok Username Generator - Free Unique TikTok Name Ideas",
      description: "Generate catchy, TikTok-compliant usernames in seconds. Free TikTok username generator with viral suffixes and niche themes.",
      keywords: [
        "tiktok username generator",
        "tiktok name generator",
        "tiktok handle generator",
        "tiktok username ideas",
        "tiktok creator username generator",
        "free tiktok username generator",
        "tiktok username maker",
        "unique tiktok username generator",
        "catchy tiktok username generator"
      ],
      longTailKeywords: [
        "how to pick a tiktok username",
        "tiktok username ideas for girls",
        "tiktok username ideas for boys",
        "tiktok username generator for creators",
        "aesthetic tiktok username generator",
        "best tiktok username generator 2026",
        "generate available tiktok usernames"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "TikTok Username Generator",
        "description": "Generate unique, TikTok-compliant usernames.",
        "url": "https://aisocialtools.co/tools/tiktok-username-generator",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "hashtag-counter": {
      title: "Hashtag Counter - Free Caption Hashtag Counter for Instagram",
      description: "Count hashtags in your caption and check Instagram, TikTok, and Twitter limits instantly. Free hashtag counter with duplicate detection. No signup required.",
      keywords: [
        "hashtag counter",
        "hashtag counter instagram",
        "instagram hashtag counter",
        "tiktok hashtag counter",
        "twitter hashtag counter",
        "count hashtags",
        "hashtag limit checker",
        "caption hashtag counter",
        "hashtag count tool",
        "free hashtag counter"
      ],
      longTailKeywords: [
        "how many hashtags can you use on instagram",
        "instagram hashtag limit 2026",
        "tiktok hashtag character limit",
        "count hashtags in caption",
        "free hashtag counter online",
        "hashtag limit checker for instagram",
        "best hashtag counter tool 2026"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Hashtag Counter",
        "description": "Count hashtags in captions against platform limits.",
        "url": "https://aisocialtools.co/tools/hashtag-counter",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "image-compressor": {
      title: "Image Compressor — Free Browser-Side JPG, PNG & WebP Compression",
      description: "Compress images without losing quality, in your browser. Free image compressor with quality slider and before/after preview.",
      keywords: [
        "image compressor",
        "compress image",
        "compress jpg",
        "compress png",
        "compress webp",
        "online image compressor",
        "image size reducer",
        "reduce image size",
        "free image compressor",
        "image compressor online",
        "compress photos",
        "image optimizer",
        "best image compressor 2026",
        "image compressor no upload"
      ],
      longTailKeywords: [
        "how to compress image without losing quality",
        "free online image compressor no signup",
        "compress jpg file size online free",
        "compress png file size without losing quality",
        "browser based image compressor",
        "image compressor that doesn't upload files",
        "reduce photo size for instagram upload",
        "best free image compressor for web"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Image Compressor",
        "description": "Browser-side image compression with live quality control.",
        "url": "https://aisocialtools.co/tools/image-compressor",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "image-converter": {
      title: "Image Format Converter — Free PNG, JPG, WebP Converter",
      description: "Convert images between PNG, JPG, and WebP formats in your browser. Free image format converter with quality control. No file uploads, no watermark, no signup.",
      keywords: [
        "image converter",
        "image format converter",
        "png to jpg",
        "jpg to png",
        "png to webp",
        "webp to png",
        "jpg to webp",
        "webp to jpg",
        "convert image format",
        "free image converter",
        "online image converter",
        "image format changer",
        "convert png to jpg free",
        "convert webp to png"
      ],
      longTailKeywords: [
        "how to convert png to jpg online free",
        "convert webp to png in browser",
        "free image format converter no signup",
        "convert jpg to webp for website",
        "png to jpg converter without losing quality",
        "bulk image format converter online",
        "best image converter 2026",
        "how to change image format to webp"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Image Format Converter",
        "description": "Convert between PNG, JPG, and WebP formats in the browser.",
        "url": "https://aisocialtools.co/tools/image-converter",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "favicon-generator": {
      title: "Favicon Generator — Free Multi-Size Favicon Maker",
      description: "Turn any image into a full favicon pack (16, 32, 180, 192, 512 px) plus the HTML snippet to paste in your head. Browser-side, no signup.",
      keywords: [
        "favicon generator",
        "favicon maker",
        "favicon creator",
        "free favicon generator",
        "online favicon generator",
        "png to favicon",
        "favicon size generator",
        "apple touch icon generator",
        "favicon io alternative",
        "generate favicon from image",
        "favicon generator for website"
      ],
      longTailKeywords: [
        "how to generate a favicon for my website",
        "free favicon generator from png",
        "apple touch icon generator online free",
        "favicon generator all sizes 2026",
        "convert image to favicon multiple sizes",
        "favicon html snippet generator",
        "best favicon generator no signup",
        "how to create favicon 180x180 apple touch icon"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Favicon Generator",
        "description": "Generate full favicon packs from any image in every standard size.",
        "url": "https://aisocialtools.co/tools/favicon-generator",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "instagram-fonts": {
      title: "Instagram Font Generator — 20+ Free Stylish Fonts for Bio & Captions",
      description: "Generate 20+ stylish Instagram fonts — bold, italic, script, bubble, retro, small caps. Free Unicode font generator. One-click copy.",
      keywords: [
        "instagram fonts",
        "instagram font generator",
        "fonts for instagram",
        "ig fonts",
        "bio fonts generator",
        "cool fonts for instagram",
        "instagram bio fonts",
        "stylish fonts for instagram",
        "unicode font generator",
        "fancy text generator instagram",
        "instagram caption fonts",
        "instagram story fonts",
        "aesthetic fonts for instagram"
      ],
      longTailKeywords: [
        "how to change font on instagram bio",
        "free instagram font generator no app",
        "copy paste instagram fonts online",
        "cursive fonts for instagram bio",
        "small caps instagram font generator",
        "bold italic instagram font generator",
        "best fonts for instagram 2026",
        "aesthetic instagram font copy paste"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Instagram Font Generator",
        "description": "Generate 20+ Unicode font styles for Instagram bio, captions, and stories.",
        "url": "https://aisocialtools.co/tools/instagram-fonts",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "youtube-tag-generator": {
      title: "YouTube Tag Generator — Free SEO Tag Generator for Videos",
      description: "Generate 30+ SEO-optimised YouTube tags from any topic. Free tag generator with 500-char counter and one-click copy. No signup.",
      keywords: [
        "youtube tag generator",
        "youtube tags generator",
        "youtube seo tag generator",
        "free youtube tag generator",
        "youtube keyword generator",
        "youtube video tag generator",
        "best youtube tag generator",
        "youtube tag finder",
        "youtube tag extractor alternative",
        "tag generator for youtube",
        "youtube metadata generator"
      ],
      longTailKeywords: [
        "how to generate youtube tags for seo",
        "best free youtube tag generator 2026",
        "youtube tag generator from topic",
        "youtube seo tag generator free online",
        "how many tags can a youtube video have",
        "youtube tag character limit 500",
        "youtube tags for small channels",
        "youtube tag generator no signup"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "YouTube Tag Generator",
        "description": "Generate SEO-optimised YouTube tags from any topic.",
        "url": "https://aisocialtools.co/tools/youtube-tag-generator",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "youtube-description-generator": {
      title: "YouTube Description Generator — Free SEO Description Template",
      description: "Generate SEO-friendly YouTube descriptions with timestamps, links, CTAs, and hashtags. Free template generator with 5000-char counter.",
      keywords: [
        "youtube description generator",
        "youtube description template",
        "youtube video description generator",
        "free youtube description generator",
        "youtube seo description generator",
        "youtube description maker",
        "youtube description template generator",
        "best youtube description generator",
        "youtube description writer",
        "youtube description builder"
      ],
      longTailKeywords: [
        "how to write a good youtube description",
        "youtube description template with timestamps",
        "best free youtube description generator 2026",
        "youtube description seo best practices",
        "youtube description character limit 5000",
        "youtube description for small channels",
        "youtube description generator no signup",
        "how to add timestamps to youtube description"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "YouTube Description Generator",
        "description": "Generate SEO-friendly YouTube descriptions with timestamps and CTAs.",
        "url": "https://aisocialtools.co/tools/youtube-description-generator",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "youtube-money-calculator": {
      title: "YouTube Money Calculator — Free YouTube Earnings Estimator",
      description: "Estimate YouTube ad revenue from views, CPM, and engagement. Free YouTube money calculator with monthly, yearly, and niche-based projections. No signup.",
      keywords: [
        "youtube money calculator",
        "youtube earnings calculator",
        "youtube revenue calculator",
        "youtube ad revenue calculator",
        "youtube income calculator",
        "youtube cpm calculator",
        "youtube monetization calculator",
        "free youtube money calculator",
        "youtube channel earnings estimator",
        "youtube salary calculator",
        "how much youtube pays calculator"
      ],
      longTailKeywords: [
        "how much money does youtube pay per 1000 views",
        "free youtube money calculator by niche",
        "how to calculate youtube ad revenue",
        "youtube earnings calculator 2026",
        "youtube cpm by country calculator",
        "estimate youtube income from views",
        "youtube money calculator no signup",
        "how much can i earn on youtube calculator"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "YouTube Money Calculator",
        "description": "Estimate YouTube ad revenue from views, CPM, and engagement.",
        "url": "https://aisocialtools.co/tools/youtube-money-calculator",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "linkedin-headline-generator": {
      title: "LinkedIn Headline Generator — 15+ Free Professional Headlines",
      description: "Generate 15+ professional LinkedIn headline variations. Free generator with 220-char counter, role-based templates, one-click copy.",
      keywords: [
        "linkedin headline generator",
        "linkedin title generator",
        "linkedin headline maker",
        "linkedin headline ideas",
        "free linkedin headline generator",
        "linkedin profile headline generator",
        "linkedin headline template generator",
        "linkedin bio generator",
        "best linkedin headline generator",
        "linkedin headline writer",
        "linkedin job seeker headline generator"
      ],
      longTailKeywords: [
        "how to write a linkedin headline 2026",
        "linkedin headline examples for job seekers",
        "linkedin headline for students free generator",
        "linkedin headline 220 character limit",
        "best linkedin headline generator no signup",
        "linkedin headline generator for sales reps",
        "linkedin headline generator by industry",
        "linkedin headline that gets recruiter attention"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "LinkedIn Headline Generator",
        "description": "Generate professional LinkedIn headline variations.",
        "url": "https://aisocialtools.co/tools/linkedin-headline-generator",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "social-media-image-sizes": {
      title: "Social Media Image Sizes 2026 — Complete Size Guide (Every Platform)",
      description: "2026 social media image and video size guide for Instagram, TikTok, YouTube, LinkedIn, X, Facebook, Pinterest, and Threads.",
      keywords: [
        "social media image sizes",
        "social media image sizes 2026",
        "social media size guide",
        "instagram image sizes",
        "tiktok video sizes",
        "youtube thumbnail size",
        "linkedin post size",
        "twitter image size",
        "facebook image size",
        "pinterest image size",
        "social media dimensions",
        "social media image size cheat sheet"
      ],
      longTailKeywords: [
        "social media image sizes cheat sheet 2026",
        "complete social media size guide 2026",
        "best image dimensions for every social platform",
        "instagram reels and story size guide",
        "youtube thumbnail size 2026",
        "linkedin banner size guide",
        "tiktok video aspect ratio 2026",
        "facebook cover photo size 2026"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Social Media Image Sizes 2026 — Complete Size Guide (Every Platform)",
        "description": "2026 reference of every social media image and video size for Instagram, TikTok, YouTube, LinkedIn, X, Facebook, and Pinterest.",
        "url": "https://aisocialtools.co/tools/social-media-image-sizes",
        "author": { "@type": "Organization", "name": "AI Social Tools" },
        "datePublished": "2026-04-24"
      }
    },
    "ai-image-generator": {
      title: "AI Image Generator — Free Text-to-Image, No Signup, No Watermark",
      description: "Generate AI images from text using Flux and Stable Diffusion. Free AI art generator with realistic, anime, 3D, cinematic styles. No watermark.",
      keywords: [
        "ai image generator",
        "free ai image generator",
        "ai art generator",
        "text to image ai",
        "ai image generator free no signup",
        "free ai art generator",
        "flux image generator",
        "stable diffusion online free",
        "ai image generator no watermark",
        "free text to image generator",
        "ai picture generator",
        "online ai image generator",
        "best free ai image generator",
        "ai image generator unlimited",
        "ai image generator 2026"
      ],
      longTailKeywords: [
        "free ai image generator no signup no watermark",
        "best free ai image generator 2026",
        "flux ai image generator free online",
        "text to image generator free unlimited",
        "ai art generator from text prompt",
        "stable diffusion free online generator",
        "ai image generator for instagram posts",
        "how to generate ai images from text free",
        "anime ai image generator free",
        "3d ai image generator online"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "AI Image Generator",
        "description": "Generate AI images from text prompts using Flux and Stable Diffusion.",
        "url": "https://aisocialtools.co/tools/ai-image-generator",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      }
    },
    "pinterest-video-downloader": {
      title: "Best Free Pinterest Video Downloader Online - Download Pins 2026",
      description: "Download videos and images from Pinterest pins. Free Pinterest downloader — save content in HD for offline viewing. No signup.",
      keywords: [
        "pinterest video download",
        "pinterest video downloader",
        "pinterest download",
        "download pinterest video",
        "pinterest download video",
        "pinterest downloader",
        "download pinterest videos",
        "pinterest pin downloader",
        "pinterest image downloader",
        "free pinterest downloader",
        "best pinterest video downloader",
        "pinterest video saver",
        "download pinterest pins",
        "pinterest content downloader",
        "pinterest reel downloader",
        "pinterest story downloader",
        "pinterest video download india",
        "pinterest video downloader india",
        "download pinterest video online",
        "pinterest video downloader usa",
        "pinterest video downloader uk",
        "pinterest video downloader free",
        "free pinterest video download",
        "online pinterest video downloader",
        "pinterest video download mp4",
        "pinterest video download hd",
        "pinterest downloader online",
        "pinterest video downloader app",
        "pinterest video downloader website",
        "pinterest video downloader 2026",
        "pinterest video download without watermark",
        "pinterest video downloader no watermark",
        "pinterest video saver online",
        "download pinterest reels",
        "pinterest reels downloader",
        "pinterest story download",
        "pinterest igtv downloader",
        "pinterest video converter",
        "pinterest mp4 downloader",
        "pinterest video grabber",
        "pinterest video extractor",
        "save pinterest video",
        "pinterest video download chrome",
        "pinterest video downloader extension",
        "pinterest video download android",
        "pinterest video download ios",
        "pinterest video downloader apk",
        "pinterest video download pc",
        "pinterest video download mac",
        "pinterest video downloader windows"
      ],
      longTailKeywords: [
        "pinterest video download",
        "pinterest video downloader",
        "pinterest download",
        "download pinterest video",
        "pinterest download video",
        "how to download pinterest videos",
        "best free pinterest video downloader online",
        "download pinterest videos without watermark",
        "save pinterest videos to device",
        "pinterest downloader free online",
        "how to download pinterest pins",
        "pinterest video downloader no signup",
        "download pinterest images and videos",
        "best pinterest downloader 2026",
        "pinterest content saver free",
        "how to download pinterest videos on iphone",
        "how to download pinterest videos on android",
        "how to save pinterest videos to camera roll",
        "download pinterest videos in hd quality",
        "best pinterest video downloader for pc",
        "pinterest video downloader chrome extension",
        "how to download pinterest story video",
        "save pinterest reels to gallery",
        "download pinterest videos without app",
        "pinterest video download online free",
        "how to download pinterest videos on mac",
        "pinterest video downloader for windows 10",
        "download pinterest videos in high resolution",
        "best online pinterest video downloader 2026",
        "how to save pinterest videos offline"
      ],
      structuredData: {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Pinterest Video Downloader",
        "description": "Download videos and images from Pinterest pins",
        "url": "https://aisocialtools.co/tools/pinterest-video-downloader",
        "applicationCategory": "SocialMediaApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    }
  };

  return seoConfigs[tool.id] || {
    title: `${tool.name} - Free Social Media Tool`,
    description: tool.description,
    keywords: [tool.name.toLowerCase(), "social media tool", "free tool"],
    longTailKeywords: [`free ${tool.name.toLowerCase()}`, `online ${tool.name.toLowerCase()}`],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": tool.name,
      "description": tool.description,
      "url": `https://aisocialtools.co${tool.path}`,
      "applicationCategory": "SocialMediaApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  };
};

export const generateMetadataForTool = (tool: SocialTool): Metadata => {
  const seo = getSEOMetadata(tool);
  const ogImageUrl = getOGImageUrl("default");
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: [...seo.keywords, ...seo.longTailKeywords],
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      url: `https://aisocialtools.co${tool.path}`,
      siteName: "AISocialTools",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${tool.name} - ${seo.description}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `https://aisocialtools.co${tool.path}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

