import {
  Instagram,
  Twitter,
  Youtube,
  FileImage,
  Image as ImageIcon,
  Filter,
  Download,
  DollarSign,
  Share2,
  Hash,
  Type,
  Maximize2,
  Minimize2,
  Link as LinkIcon,
  Calendar,
  Palette,
  CaseSensitive,
  Smile,
  TrendingUp,
  Clock,
  FileText,
  Lightbulb,
  BarChart3,
  User,
  QrCode,
  Video,
  MessageCircle,
  Facebook,
  PenTool,
  Sparkles,
  File,
  FileType,
  Image as ImageLucide,
  FileCheck,
  Scissors,
  Pin,
  Replace,
  Bookmark,
  Linkedin,
  Ruler,
  Wand2
} from "lucide-react";

export interface SocialTool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  category: string;
  isNew?: boolean;
}

export const socialTools: SocialTool[] = [
  {
    id: "instagram-filters",
    name: "Instagram Filters",
    description: "Apply beautiful filters to your Instagram photos",
    icon: Filter,
    path: "/tools/instagram-filters",
    category: "Instagram"
  },
  {
    id: "instagram-post-generator",
    name: "Instagram Post Generator",
    description: "Generate engaging Instagram posts with templates",
    icon: Instagram,
    path: "/tools/instagram-post-generator",
    category: "Instagram"
  },
  {
    id: "instagram-photo-downloader",
    name: "Instagram Photo Downloader",
    description: "Download photos and videos from Instagram",
    icon: Download,
    path: "/tools/instagram-photo-downloader",
    category: "Instagram"
  },
  {
    id: "tweet-generator",
    name: "Tweet Generator",
    description: "Generate creative tweets with AI assistance",
    icon: Twitter,
    path: "/tools/tweet-generator",
    category: "Twitter"
  },
  {
    id: "tweet-to-image",
    name: "Tweet to Image Converter",
    description: "Convert your tweets into beautiful images",
    icon: FileImage,
    path: "/tools/tweet-to-image",
    category: "Twitter"
  },
  {
    id: "twitter-ad-revenue",
    name: "Twitter Ad Revenue Generator",
    description: "Calculate and generate Twitter ad revenue estimates",
    icon: DollarSign,
    path: "/tools/twitter-ad-revenue",
    category: "Twitter"
  },
  {
    id: "youtube-thumbnail",
    name: "YouTube Thumbnail Grabber",
    description: "Extract thumbnails from YouTube videos",
    icon: Youtube,
    path: "/tools/youtube-thumbnail",
    category: "YouTube"
  },
  {
    id: "vimeo-thumbnail",
    name: "Vimeo Thumbnail Grabber",
    description: "Extract thumbnails from Vimeo videos",
    icon: ImageIcon,
    path: "/tools/vimeo-thumbnail",
    category: "Vimeo"
  },
  {
    id: "open-graph-generator",
    name: "Open Graph Meta Generator",
    description: "Generate Open Graph meta tags for your website",
    icon: Share2,
    path: "/tools/open-graph-generator",
    category: "SEO"
  },
  {
    id: "hashtag-generator",
    name: "Hashtag Generator",
    description: "Generate relevant hashtags for your social media posts",
    icon: Hash,
    path: "/tools/hashtag-generator",
    category: "Content"
  },
  {
    id: "character-counter",
    name: "Character Counter",
    description: "Count characters for different social media platforms",
    icon: Type,
    path: "/tools/character-counter",
    category: "Content"
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize images for different social media platforms",
    icon: Maximize2,
    path: "/tools/image-resizer",
    category: "Design"
  },
  // Disabled: background-remover tool temporarily removed from listings while
  // remove.bg API key is rotated and a server-side proxy route is implemented.
  // Re-enable once /api/remove-bg is live and the new key is stored as a
  // server-only env var (REMOVE_BG_API_KEY, no NEXT_PUBLIC_ prefix).
  // {
  //   id: "background-remover",
  //   name: "Background Remover",
  //   description: "Remove backgrounds from images automatically using AI. Free background remover tool with instant results.",
  //   icon: Scissors,
  //   path: "/tools/background-remover",
  //   category: "Design",
  //   isNew: true
  // },
  {
    id: "video-to-gif",
    name: "Video to GIF Converter",
    description: "Convert video clips to animated GIFs. Free video to GIF converter with frame rate control, quality optimization, and size reduction.",
    icon: Video,
    path: "/tools/video-to-gif",
    category: "Converters",
    isNew: true
  },
  {
    id: "bio-link-generator",
    name: "Bio Link Generator",
    description: "Create a custom link in bio page",
    icon: LinkIcon,
    path: "/tools/bio-link-generator",
    category: "Links"
  },
  {
    id: "content-calendar",
    name: "Content Calendar",
    description: "Plan and schedule your social media content",
    icon: Calendar,
    path: "/tools/content-calendar",
    category: "Planning"
  },
  {
    id: "color-palette",
    name: "Color Palette Generator",
    description: "Extract color palettes from images for branding",
    icon: Palette,
    path: "/tools/color-palette",
    category: "Design"
  },
  {
    id: "text-case-converter",
    name: "Text Case Converter",
    description: "Convert text to different cases (uppercase, lowercase, etc.)",
    icon: CaseSensitive,
    path: "/tools/text-case-converter",
    category: "Content"
  },
  {
    id: "emoji-picker",
    name: "Emoji Picker & Generator",
    description: "Browse and copy emojis for your posts",
    icon: Smile,
    path: "/tools/emoji-picker",
    category: "Content"
  },
  {
    id: "engagement-calculator",
    name: "Engagement Calculator",
    description: "Calculate engagement rate and metrics",
    icon: TrendingUp,
    path: "/tools/engagement-calculator",
    category: "Analytics"
  },
  {
    id: "best-time-calculator",
    name: "Best Time to Post Calculator",
    description: "Find the optimal posting times for maximum engagement",
    icon: Clock,
    path: "/tools/best-time-calculator",
    category: "Analytics"
  },
  {
    id: "caption-templates",
    name: "Caption Templates",
    description: "Browse and use pre-made caption templates",
    icon: FileText,
    path: "/tools/caption-templates",
    category: "Content"
  },
  {
    id: "content-ideas",
    name: "Content Ideas Generator",
    description: "Generate creative content ideas for your posts",
    icon: Lightbulb,
    path: "/tools/content-ideas",
    category: "Content"
  },
  {
    id: "analytics-calculator",
    name: "Social Media Analytics Calculator",
    description: "Calculate various social media metrics and KPIs",
    icon: BarChart3,
    path: "/tools/analytics-calculator",
    category: "Analytics"
  },
  {
    id: "username-generator",
    name: "Username Generator",
    description: "Generate unique and available usernames for social media",
    icon: User,
    path: "/tools/username-generator",
    category: "Content"
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: "Generate QR codes for your social media profiles and links",
    icon: Share2,
    path: "/tools/qr-code-generator",
    category: "Links"
  },
  {
    id: "social-bio-generator",
    name: "Social Media Bio Generator",
    description: "Create compelling bios for Instagram, Twitter, and more",
    icon: FileText,
    path: "/tools/social-bio-generator",
    category: "Content"
  },
  {
    id: "tiktok-hook-generator",
    name: "TikTok Hook & Idea Generator",
    description: "Generate viral TikTok hooks and content ideas for short-form videos",
    icon: Video,
    path: "/tools/tiktok-hook-generator",
    category: "Content"
  },
  {
    id: "whatsapp-chat",
    name: "WhatsApp Chat Link Generator",
    description: "Generate WhatsApp direct chat links with pre-filled messages",
    icon: MessageCircle,
    path: "/tools/whatsapp-chat",
    category: "Links"
  },
  {
    id: "facebook-thumbnail",
    name: "Facebook Thumbnail Downloader",
    description: "Free online tool to download high-resolution thumbnails from Facebook videos, reels, stories, groups, images, and carousel posts. Extract thumbnail sprites and HD images instantly.",
    icon: Facebook,
    path: "/tools/facebook-thumbnail",
    category: "Facebook"
  },
  {
    id: "text-to-handwriting",
    name: "Text to Handwriting Converter",
    description: "Convert text into beautiful handwriting with custom fonts, colors, and backgrounds",
    icon: PenTool,
    path: "/tools/text-to-handwriting",
    category: "Content"
  },
  {
    id: "svg-pattern-generator",
    name: "SVG Pattern Generator",
    description: "Create beautiful SVG patterns including mandalas, dots, grids, waves, and hexagons",
    icon: Sparkles,
    path: "/tools/svg-pattern-generator",
    category: "Design"
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF Converter",
    description: "Convert images (JPG, PNG, GIF) to PDF files. Merge multiple images into one PDF document.",
    icon: ImageLucide,
    path: "/tools/image-to-pdf",
    category: "Converters"
  },
  {
    id: "word-to-pdf",
    name: "Word/Text to PDF Converter",
    description: "Convert text documents to PDF format. Create professional PDFs from your text content.",
    icon: FileType,
    path: "/tools/word-to-pdf",
    category: "Converters"
  },
  {
    id: "pdf-to-image",
    name: "PDF to Image Converter",
    description: "Extract images from PDF files or convert PDF pages to images (PNG, JPG).",
    icon: FileImage,
    path: "/tools/pdf-to-image",
    category: "Converters"
  },
  {
    id: "pdf-merger",
    name: "PDF Merger",
    description: "Merge multiple PDF files into one document. Combine PDFs easily and quickly.",
    icon: FileCheck,
    path: "/tools/pdf-merger",
    category: "Converters"
  },
  {
    id: "pdf-splitter",
    name: "PDF Splitter",
    description: "Split PDF files into multiple documents. Extract specific pages from PDF files.",
    icon: File,
    path: "/tools/pdf-splitter",
    category: "Converters"
  },
  {
    id: "image-upscaler",
    name: "AI Image Upscaler",
    description: "Upscale and enhance images using AI. Increase image resolution up to 8x with noise reduction and sharpness enhancement.",
    icon: Maximize2,
    path: "/tools/image-upscaler",
    category: "Design",
    isNew: true
  },
  {
    id: "pinterest-video-downloader",
    name: "Pinterest Video Downloader",
    description: "Download videos and images from Pinterest pins. Free Pinterest downloader tool. Save Pinterest content for offline viewing.",
    icon: Pin,
    path: "/tools/pinterest-video-downloader",
    category: "Pinterest",
    isNew: true
  },
  {
    id: "twitter-character-counter",
    name: "Twitter/X Character Counter",
    description: "Count characters for Twitter/X posts with correct URL weighting. Real-time counter with thread split preview.",
    icon: Twitter,
    path: "/tools/twitter-character-counter",
    category: "Twitter",
    isNew: true
  },
  {
    id: "tweet-thread-maker",
    name: "Tweet Thread Maker",
    description: "Split long text into a numbered Twitter/X thread. Free tweet thread generator with smart sentence breaks and 1/n numbering.",
    icon: MessageCircle,
    path: "/tools/tweet-thread-maker",
    category: "Twitter",
    isNew: true
  },
  {
    id: "instagram-engagement-calculator",
    name: "Instagram Engagement Calculator",
    description: "Calculate your Instagram engagement rate in seconds. Free calculator with benchmarks and per-post breakdown.",
    icon: TrendingUp,
    path: "/tools/instagram-engagement-calculator",
    category: "Instagram",
    isNew: true
  },
  {
    id: "tiktok-username-generator",
    name: "TikTok Username Generator",
    description: "Generate unique, catchy TikTok usernames. Free TikTok name generator with viral-inspired suffixes. Creator-friendly.",
    icon: User,
    path: "/tools/tiktok-username-generator",
    category: "Content",
    isNew: true
  },
  {
    id: "hashtag-counter",
    name: "Hashtag Counter",
    description: "Count hashtags in your caption. Free hashtag counter that warns you when you exceed Instagram, TikTok, or Twitter limits.",
    icon: Hash,
    path: "/tools/hashtag-counter",
    category: "Content",
    isNew: true
  },
  {
    id: "image-compressor",
    name: "Image Compressor",
    description: "Compress JPG, PNG, and WebP images in your browser. Free image compressor with quality control and instant before/after size comparison.",
    icon: Minimize2,
    path: "/tools/image-compressor",
    category: "Design",
    isNew: true
  },
  {
    id: "image-converter",
    name: "Image Format Converter",
    description: "Convert PNG to JPG, JPG to PNG, PNG to WebP, and more. Free browser-side image format converter with no file upload.",
    icon: Replace,
    path: "/tools/image-converter",
    category: "Converters",
    isNew: true
  },
  {
    id: "favicon-generator",
    name: "Favicon Generator",
    description: "Generate favicons in every size (16×16, 32×32, 180×180, 192×192, 512×512) from any image. Free favicon maker with ready-to-paste HTML snippet.",
    icon: Bookmark,
    path: "/tools/favicon-generator",
    category: "Design",
    isNew: true
  },
  {
    id: "instagram-fonts",
    name: "Instagram Font Generator",
    description: "Turn plain text into 20+ stylish Instagram fonts — bold, italic, cursive, bubble, retro. Free Unicode font generator for bios, captions, and stories.",
    icon: CaseSensitive,
    path: "/tools/instagram-fonts",
    category: "Instagram",
    isNew: true
  },
  {
    id: "youtube-tag-generator",
    name: "YouTube Tag Generator",
    description: "Generate SEO-optimised YouTube tags from any video topic. Free YouTube tag generator with 500-character counter and one-click copy. No signup.",
    icon: Youtube,
    path: "/tools/youtube-tag-generator",
    category: "Content",
    isNew: true
  },
  {
    id: "youtube-description-generator",
    name: "YouTube Description Generator",
    description: "Generate SEO-friendly YouTube video descriptions with timestamps, links, and hashtags. Free YouTube description template generator.",
    icon: FileText,
    path: "/tools/youtube-description-generator",
    category: "Content",
    isNew: true
  },
  {
    id: "youtube-money-calculator",
    name: "YouTube Money Calculator",
    description: "Estimate YouTube ad revenue from views, CPM, and CTR. Free YouTube earnings calculator with monthly and yearly projections.",
    icon: DollarSign,
    path: "/tools/youtube-money-calculator",
    category: "Analytics",
    isNew: true
  },
  {
    id: "linkedin-headline-generator",
    name: "LinkedIn Headline Generator",
    description: "Generate 15+ professional LinkedIn headline variations from your title and expertise. Free, 220-character compliant, one-click copy.",
    icon: Linkedin,
    path: "/tools/linkedin-headline-generator",
    category: "Content",
    isNew: true
  },
  {
    id: "social-media-image-sizes",
    name: "Social Media Image Sizes",
    description: "Complete 2026 reference of every social media image and video size — Instagram, TikTok, YouTube, LinkedIn, X, Facebook, Pinterest. Free, updated yearly.",
    icon: Ruler,
    path: "/tools/social-media-image-sizes",
    category: "Design",
    isNew: true
  },
  // Disabled: AI Image Generator temporarily hidden while we migrate off
  // Pollinations (anonymous 15-sec rate limit was too restrictive) to a more
  // reliable free model. Re-enable once the new backend is live.
  // {
  //   id: "ai-image-generator",
  //   name: "AI Image Generator",
  //   description: "Generate stunning AI images from text prompts — Flux, realism, anime, 3D, cinematic. Free AI art generator with no signup, no watermark, no limits.",
  //   icon: Wand2,
  //   path: "/tools/ai-image-generator",
  //   category: "Design",
  //   isNew: true
  // }
];

export const getToolById = (id: string): SocialTool | undefined => {
  return socialTools.find(tool => tool.id === id);
};

export const getToolsByCategory = (category: string): SocialTool[] => {
  return socialTools.filter(tool => tool.category === category);
};

