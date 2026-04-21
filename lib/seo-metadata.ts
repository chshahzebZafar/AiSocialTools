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
      description: "Generate creative and engaging tweets instantly with the best free AI-powered tweet generator online. Create viral Twitter content, optimize character count, and boost engagement. No signup required - perfect for content creators and marketers.",
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
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "1250"
        }
      }
    },
    "tweet-to-image": {
      title: "Tweet to Image Converter - Convert Tweets to Images",
      description: "Convert your Twitter posts into beautiful shareable images. Free tweet to image converter with customizable themes, download as PNG. Perfect for social media marketing.",
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
        "applicationCategory": "ImageEditingApplication"
      }
    },
    "hashtag-generator": {
      title: "Best Free Hashtag Generator Online - Trending Hashtags 2026",
      description: "Generate relevant and trending hashtags for Instagram, Twitter, TikTok, and LinkedIn with the best free hashtag generator online. Platform-specific suggestions to boost your social media reach. No signup required.",
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
        "description": "Generate relevant hashtags for social media platforms"
      }
    },
    "instagram-post-generator": {
      title: "Best Free Instagram Post Generator Online - Create Engaging Captions 2026",
      description: "Generate engaging Instagram captions and posts with the best free Instagram post generator online. Create viral content with templates, hashtags, and emoji suggestions. Boost your Instagram engagement - no signup required.",
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
        "description": "Generate engaging Instagram posts and captions"
      }
    },
    "youtube-thumbnail": {
      title: "Best Free YouTube Thumbnail Downloader Online - Download HD Thumbnails 2026",
      description: "Extract and download YouTube video thumbnails in high quality with the best free YouTube thumbnail downloader online. Download thumbnails in max resolution, HQ, MQ, or SD quality instantly. No signup required.",
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
        "description": "Download YouTube video thumbnails in high quality"
      }
    },
    "open-graph-generator": {
      title: "Open Graph Generator - Free OG Tags for SEO",
      description: "Generate Open Graph meta tags for Facebook, Twitter, and LinkedIn. Free OG tags generator with preview. Improve social media sharing and SEO. Create perfect social media cards.",
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
        "description": "Generate Open Graph and Twitter Card meta tags"
      }
    },
    "character-counter": {
      title: "Character Counter - Count Text for All Platforms",
      description: "Count characters for Twitter, Instagram, Facebook, LinkedIn, and more. Free social media character counter with platform limits. Track character count in real-time.",
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
        "description": "Count characters for different social media platforms"
      }
    },
    "image-resizer": {
      title: "Image Resizer - Resize for Instagram & Facebook",
      description: "Resize images for Instagram, Facebook, Twitter, LinkedIn, and more. Free social media image resizer with platform-specific dimensions. Optimize images for social media instantly.",
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
        "description": "Resize images for different social media platforms"
      }
    },
    "qr-code-generator": {
      title: "Free QR Code Generator - Create QR Codes for Links",
      description: "Generate QR codes for Instagram, Twitter, Facebook, and any URL. Free QR code generator with customizable colors and sizes. Download QR codes as PNG. Perfect for social media marketing.",
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
        "description": "Generate QR codes for social media profiles and links"
      }
    },
    "username-generator": {
      title: "Username Generator - Generate Unique Usernames Free",
      description: "Generate unique and available usernames for Instagram, Twitter, TikTok, and more. Free username generator with variations. Find the perfect username for your social media accounts.",
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
        "description": "Generate unique usernames for social media"
      }
    },
    "social-bio-generator": {
      title: "Bio Generator - Create Instagram & Twitter Bios",
      description: "Generate compelling bios for Instagram, Twitter, LinkedIn, and TikTok. Free social media bio generator with templates. Create professional bios that attract followers.",
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
        "description": "Generate compelling bios for social media platforms"
      }
    },
    "engagement-calculator": {
      title: "Engagement Calculator - Calculate Engagement Rate",
      description: "Calculate engagement rate, reach rate, and social media metrics. Free engagement calculator for Instagram, Twitter, Facebook. Analyze your social media performance instantly.",
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
        "description": "Calculate social media engagement rates and metrics"
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
        "description": "Calculate potential Twitter ad revenue"
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
        "description": "Apply Instagram-style filters to photos"
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
        "description": "Download Vimeo video thumbnails"
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
        "description": "Create custom link in bio pages"
      }
    },
    "content-calendar": {
      title: "Content Calendar - Plan & Schedule Posts",
      description: "Plan and schedule your social media content with our free content calendar. Organize posts, track publishing dates, and manage multiple platforms. Boost your social media strategy.",
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
        "description": "Plan and schedule social media content"
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
        "description": "Extract color palettes from images"
      }
    },
    "text-case-converter": {
      title: "Text Case Converter - Uppercase, Lowercase & More",
      description: "Convert text to uppercase, lowercase, title case, camelCase, snake_case, and more. Free text case converter tool. Transform text formatting instantly for social media posts.",
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
        "description": "Convert text to different cases"
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
        "description": "Browse and copy emojis for social media"
      }
    },
    "best-time-calculator": {
      title: "Best Time to Post Calculator - Find Optimal Times",
      description: "Find the best times to post on Instagram, Twitter, Facebook, LinkedIn, and TikTok. Free posting time calculator with platform-specific recommendations. Maximize engagement.",
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
        "description": "Find optimal posting times for social media"
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
        "description": "Browse and use pre-made caption templates"
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
        "description": "Generate creative content ideas for social media"
      }
    },
    "analytics-calculator": {
      title: "Analytics Calculator - Calculate KPIs & Metrics",
      description: "Calculate social media KPIs including CTR, conversion rate, CPC, CPA, and ROAS. Free analytics calculator for Instagram, Twitter, Facebook. Analyze your social media performance.",
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
        "description": "Calculate social media metrics and KPIs"
      }
    },
    "instagram-photo-downloader": {
      title: "Instagram Photo Downloader - Download Photos & Videos",
      description: "Download photos and videos from Instagram posts. Free Instagram downloader tool. Save Instagram content for offline viewing. Note: Requires backend implementation.",
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
        "description": "Download photos and videos from Instagram"
      }
    },
    "svg-pattern-generator": {
      title: "SVG Pattern Generator - Create Beautiful Patterns",
      description: "Generate stunning SVG patterns including mandalas, dots, grids, waves, and hexagons. Customize colors, size, spacing, rotation, and export for social media. Free pattern generator tool.",
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
    "pinterest-video-downloader": {
      title: "Best Free Pinterest Video Downloader Online - Download Pins 2026",
      description: "Download videos and images from Pinterest pins with the best free Pinterest video downloader online. Save Pinterest content in HD quality for offline viewing. No signup required - fast and easy Pinterest downloader.",
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
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "ratingCount": "850"
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
      siteName: "Social Media Tools",
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

