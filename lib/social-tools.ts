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
  FileCheck
} from "lucide-react";

export interface SocialTool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  category: string;
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
    name: "Facebook Thumbnail Grabber",
    description: "Download and save any Facebook video thumbnail of the highest possible quality",
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
  }
];

export const getToolById = (id: string): SocialTool | undefined => {
  return socialTools.find(tool => tool.id === id);
};

export const getToolsByCategory = (category: string): SocialTool[] => {
  return socialTools.filter(tool => tool.category === category);
};

