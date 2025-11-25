# Codebase Index

## Project Overview

**Project Name:** fakes-social-reviews  
**Type:** Next.js 16 Application  
**Purpose:** Social Media Tools Website - A collection of free online tools for social media management, content creation, and optimization  
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4

---

## Directory Structure

```
fakes-social-reviews/
├── app/                          # Next.js App Router directory
│   ├── about/                    # About page
│   ├── author/                   # Author page
│   ├── contact/                  # Contact page
│   ├── faq/                      # FAQ page with layout
│   ├── privacy/                  # Privacy policy page
│   ├── terms/                    # Terms of service page
│   ├── tools/                    # Tools directory
│   │   ├── [id]/                 # Dynamic tool detail pages
│   │   ├── analytics-calculator/ # Analytics calculator tool
│   │   ├── best-time-calculator/ # Best time to post calculator
│   │   ├── bio-link-generator/   # Bio link generator
│   │   ├── caption-templates/    # Caption templates tool
│   │   ├── character-counter/    # Character counter tool
│   │   ├── color-palette/        # Color palette generator
│   │   ├── content-calendar/     # Content calendar tool
│   │   ├── content-ideas/        # Content ideas generator
│   │   ├── emoji-picker/         # Emoji picker tool
│   │   ├── engagement-calculator/# Engagement calculator
│   │   ├── facebook-thumbnail/   # Facebook thumbnail grabber
│   │   ├── hashtag-generator/    # Hashtag generator
│   │   ├── image-resizer/        # Image resizer tool
│   │   ├── instagram-filters/    # Instagram filters tool
│   │   ├── instagram-photo-downloader/ # Instagram downloader
│   │   ├── instagram-post-generator/   # Instagram post generator
│   │   ├── open-graph-generator/ # Open Graph meta generator
│   │   ├── qr-code-generator/    # QR code generator
│   │   ├── social-bio-generator/ # Social bio generator
│   │   ├── text-case-converter/  # Text case converter
│   │   ├── text-to-handwriting/  # Text to handwriting converter
│   │   ├── tiktok-hook-generator/# TikTok hook generator
│   │   ├── tweet-generator/      # Tweet generator
│   │   ├── tweet-to-image/       # Tweet to image converter
│   │   ├── twitter-ad-revenue/   # Twitter ad revenue calculator
│   │   ├── username-generator/   # Username generator
│   │   ├── vimeo-thumbnail/      # Vimeo thumbnail grabber
│   │   ├── whatsapp-chat/        # WhatsApp chat link generator
│   │   ├── youtube-thumbnail/    # YouTube thumbnail grabber
│   │   ├── layout.tsx            # Tools section layout
│   │   └── page.tsx              # Tools listing page
│   ├── favicon.ico               # Site favicon
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with SEO metadata
│   ├── manifest.ts               # Web app manifest
│   ├── not-found.tsx             # 404 error page
│   ├── page.tsx                  # Homepage
│   ├── robots.ts                 # Robots.txt generator
│   └── sitemap.ts                # Sitemap.xml generator
├── components/                   # React components
│   ├── Breadcrumbs.tsx           # Breadcrumb navigation component
│   ├── Footer.tsx                # Site footer component
│   ├── GoogleAnalytics.tsx       # Google Analytics integration
│   ├── Header.tsx                # Site header/navigation
│   ├── Sidebar.tsx               # Sidebar navigation component
│   ├── ToolFAQ.tsx               # FAQ component for tools
│   ├── ToolLayout.tsx            # Layout wrapper for tool pages
│   └── ToolSEO.tsx               # SEO component for tool pages
├── lib/                          # Utility libraries
│   ├── og-image-generator.ts     # Open Graph image URL generator
│   ├── seo-metadata.ts           # SEO metadata utilities
│   ├── social-tools.ts           # Social tools data and definitions
│   └── tools.ts                  # Social media tools data (reviews/recommendations)
├── public/                       # Static assets
│   ├── file.svg                  # SVG icons
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   ├── window.svg
│   ├── og-default.png            # Default OG image
│   ├── og-image.png              # OG image
│   ├── og-tools.png              # Tools OG image
│   ├── OG_IMAGE_GUIDE.md         # OG image documentation
│   └── OG_IMAGE_PROMPTS.md       # OG image prompts
├── scripts/                      # Utility scripts
│   ├── fix-all-fragments.js      # Fragment fixer script
│   ├── fix-closing-tags.js       # Closing tags fixer
│   ├── fix-fragments.js          # Fragment fixer
│   ├── update-h1-seo.js          # H1 SEO updater
│   └── update-tool-seo.js        # Tool SEO updater
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── next-env.d.ts                 # Next.js TypeScript definitions
├── package.json                  # Project dependencies and scripts
├── package-lock.json             # Dependency lock file
├── postcss.config.mjs            # PostCSS configuration
├── tsconfig.json                 # TypeScript configuration
├── README.md                     # Project README
├── TOOLS_LIST.md                 # Tools documentation
├── PRODUCTION_CHECKLIST.md       # Production deployment checklist
├── PRODUCTION_READINESS_REPORT.md # Production readiness report
├── SEO_AUDIT_REPORT.md           # SEO audit report
├── SEO_IMPLEMENTATION_SUMMARY.md # SEO implementation summary
└── OG_IMAGE_SEO_IMPLEMENTATION.md # OG image SEO implementation guide
```

---

## Key Files

### Configuration Files

- **`package.json`**: Project dependencies and npm scripts
  - Dependencies: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Firebase, html2canvas, jspdf, lucide-react, etc.
  - Scripts: `dev`, `build`, `start`, `lint`

- **`tsconfig.json`**: TypeScript compiler configuration

- **`next.config.ts`**: Next.js framework configuration

- **`eslint.config.mjs`**: ESLint linting rules

- **`postcss.config.mjs`**: PostCSS configuration for Tailwind CSS

### Core Application Files

#### App Router (`app/`)

- **`app/layout.tsx`**: Root layout component
  - Sets up global metadata, Open Graph tags, Twitter cards
  - Includes Google Analytics
  - Configures fonts (Geist Sans, Geist Mono)

- **`app/page.tsx`**: Homepage
  - Hero section with CTA
  - Stats section
  - Features section
  - Featured tools grid
  - Call-to-action section

- **`app/tools/page.tsx`**: Tools listing page
  - Displays all available social media tools
  - Category filtering
  - Search functionality

- **`app/tools/[id]/page.tsx`**: Dynamic tool detail pages
  - Individual tool pages with full functionality

- **`app/sitemap.ts`**: Dynamic sitemap generation

- **`app/robots.ts`**: Robots.txt generation

- **`app/not-found.tsx`**: 404 error page

- **`app/manifest.ts`**: Web app manifest for PWA support

#### Tool Pages (30+ tools)

Each tool has its own directory under `app/tools/` with:
- `page.tsx`: Main tool implementation
- `layout.tsx`: Tool-specific layout and SEO

**Tool Categories:**
- **Instagram Tools**: Filters, Post Generator, Photo Downloader
- **Twitter Tools**: Tweet Generator, Tweet to Image, Ad Revenue Calculator
- **YouTube Tools**: Thumbnail Grabber
- **Vimeo Tools**: Thumbnail Grabber
- **Facebook Tools**: Thumbnail Grabber
- **Content Tools**: Hashtag Generator, Character Counter, Caption Templates, Content Ideas, Username Generator, Social Bio Generator, TikTok Hook Generator, Text Case Converter, Text to Handwriting
- **Design Tools**: Image Resizer, Color Palette Generator, Instagram Filters
- **Analytics Tools**: Engagement Calculator, Best Time Calculator, Analytics Calculator
- **Link Tools**: Bio Link Generator, QR Code Generator, WhatsApp Chat Link Generator
- **SEO Tools**: Open Graph Generator
- **Planning Tools**: Content Calendar
- **Other**: Emoji Picker

### Component Library (`components/`)

- **`Header.tsx`**: Main site navigation header
- **`Footer.tsx`**: Site footer with links and information
- **`Sidebar.tsx`**: Sidebar navigation for tools
- **`Breadcrumbs.tsx`**: Breadcrumb navigation component
- **`ToolLayout.tsx`**: Layout wrapper for individual tool pages
- **`ToolSEO.tsx`**: SEO metadata component for tools
- **`ToolFAQ.tsx`**: FAQ component for tool pages
- **`GoogleAnalytics.tsx`**: Google Analytics integration component

### Library Files (`lib/`)

- **`social-tools.ts`**: 
  - Defines all 30+ social media tools
  - Tool interface: `SocialTool` with id, name, description, icon, path, category
  - Utility functions: `getToolById()`, `getToolsByCategory()`
  - Categories: Instagram, Twitter, YouTube, Vimeo, Facebook, Content, Design, Analytics, Links, SEO, Planning

- **`tools.ts`**: 
  - Social media tool reviews/recommendations data
  - Interface: `SocialMediaTool` with id, name, description, category, website, pricing, features, rating, isRecommended
  - 15+ reviewed tools including Buffer, Hootsuite, Canva, Later, Linktree, Grammarly, CapCut, Unsplash, etc.
  - Utility functions: `getToolById()`, `getRecommendedTools()`, `getToolsByCategory()`, `getAllCategories()`

- **`og-image-generator.ts`**: 
  - Generates Open Graph image URLs
  - Function: `getOGImageUrl(type: string)`

- **`seo-metadata.ts`**: 
  - SEO metadata utilities and helpers

### Static Assets (`public/`)

- SVG icons: file, globe, next, vercel, window
- OG Images: og-default.png, og-image.png, og-tools.png
- Documentation: OG_IMAGE_GUIDE.md, OG_IMAGE_PROMPTS.md

### Scripts (`scripts/`)

Utility scripts for code maintenance:
- `fix-all-fragments.js`: Fixes React fragments
- `fix-closing-tags.js`: Fixes HTML closing tags
- `fix-fragments.js`: Fragment fixer
- `update-h1-seo.js`: Updates H1 tags for SEO
- `update-tool-seo.js`: Updates tool page SEO

### Documentation Files

- **`README.md`**: Main project documentation
- **`TOOLS_LIST.md`**: Complete list of tools with descriptions
- **`PRODUCTION_CHECKLIST.md`**: Production deployment checklist
- **`PRODUCTION_READINESS_REPORT.md`**: Production readiness assessment
- **`SEO_AUDIT_REPORT.md`**: SEO audit findings
- **`SEO_IMPLEMENTATION_SUMMARY.md`**: SEO implementation details
- **`OG_IMAGE_SEO_IMPLEMENTATION.md`**: OG image SEO guide

---

## Tools Inventory

### Total Tools: 30+

#### By Category

**Instagram (3 tools)**
1. Instagram Filters
2. Instagram Post Generator
3. Instagram Photo Downloader

**Twitter (3 tools)**
4. Tweet Generator
5. Tweet to Image Converter
6. Twitter Ad Revenue Generator

**YouTube (1 tool)**
7. YouTube Thumbnail Grabber

**Vimeo (1 tool)**
8. Vimeo Thumbnail Grabber

**Facebook (1 tool)**
9. Facebook Thumbnail Grabber

**Content Creation (9 tools)**
10. Hashtag Generator
11. Character Counter
12. Caption Templates
13. Content Ideas Generator
14. Username Generator
15. Social Media Bio Generator
16. TikTok Hook & Idea Generator
17. Text Case Converter
18. Text to Handwriting Converter

**Design (3 tools)**
19. Image Resizer
20. Color Palette Generator
21. Instagram Filters (also in Instagram category)

**Analytics (3 tools)**
22. Engagement Calculator
23. Best Time to Post Calculator
24. Social Media Analytics Calculator

**Link Management (3 tools)**
25. Bio Link Generator
26. QR Code Generator
27. WhatsApp Chat Link Generator

**SEO (1 tool)**
28. Open Graph Meta Generator

**Planning (1 tool)**
29. Content Calendar

**Other (1 tool)**
30. Emoji Picker & Generator

---

## Data Structures

### SocialTool Interface
```typescript
interface SocialTool {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  category: string;
}
```

### SocialMediaTool Interface
```typescript
interface SocialMediaTool {
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
```

---

## Key Features

### SEO Features
- ✅ Server-Side Rendering (SSR)
- ✅ Dynamic sitemap generation
- ✅ Robots.txt configuration
- ✅ Open Graph meta tags
- ✅ Twitter Card support
- ✅ Structured data (JSON-LD)
- ✅ Canonical URLs
- ✅ Meta descriptions and keywords
- ✅ Dynamic OG image generation

### Performance
- ✅ Static Site Generation (SSG)
- ✅ Image optimization
- ✅ Code splitting
- ✅ Tailwind CSS for optimized styles

### User Experience
- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS
- ✅ Breadcrumb navigation
- ✅ Category filtering
- ✅ Search functionality
- ✅ No signup required
- ✅ 100% free tools

### Analytics
- ✅ Google Analytics integration
- ✅ Environment variable configuration

---

## Dependencies

### Production Dependencies
- `next`: 16.0.3 - React framework
- `react`: 19.2.0 - UI library
- `react-dom`: 19.2.0 - React DOM renderer
- `typescript`: ^5 - Type safety
- `tailwindcss`: ^4 - CSS framework
- `lucide-react`: ^0.554.0 - Icon library
- `browser-image-compression`: ^2.0.2 - Image compression
- `firebase`: ^12.6.0 - Firebase integration
- `html2canvas`: ^1.4.1 - HTML to canvas conversion
- `jspdf`: ^3.0.4 - PDF generation
- `qrcode.react`: ^4.2.0 - QR code generation
- `react-colorful`: ^5.6.1 - Color picker

### Development Dependencies
- `@tailwindcss/postcss`: ^4 - PostCSS for Tailwind
- `@types/node`: ^20 - Node.js types
- `@types/react`: ^19 - React types
- `@types/react-dom`: ^19 - React DOM types
- `eslint`: ^9 - Linting
- `eslint-config-next`: 16.0.3 - Next.js ESLint config

---

## Environment Variables

Required environment variables (configured in `.env.local` or deployment):
- `NEXT_PUBLIC_GA_ID`: Google Analytics tracking ID
- `NEXT_PUBLIC_GOOGLE_VERIFICATION`: Google Search Console verification code

---

## Build & Deployment

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

---

## Routes

### Public Pages
- `/` - Homepage
- `/about` - About page
- `/contact` - Contact page
- `/faq` - FAQ page
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/author` - Author page

### Tools Pages
- `/tools` - Tools listing page
- `/tools/[id]` - Dynamic tool detail pages
- `/tools/analytics-calculator` - Analytics calculator
- `/tools/best-time-calculator` - Best time calculator
- `/tools/bio-link-generator` - Bio link generator
- `/tools/caption-templates` - Caption templates
- `/tools/character-counter` - Character counter
- `/tools/color-palette` - Color palette generator
- `/tools/content-calendar` - Content calendar
- `/tools/content-ideas` - Content ideas generator
- `/tools/emoji-picker` - Emoji picker
- `/tools/engagement-calculator` - Engagement calculator
- `/tools/facebook-thumbnail` - Facebook thumbnail
- `/tools/hashtag-generator` - Hashtag generator
- `/tools/image-resizer` - Image resizer
- `/tools/instagram-filters` - Instagram filters
- `/tools/instagram-photo-downloader` - Instagram downloader
- `/tools/instagram-post-generator` - Instagram post generator
- `/tools/open-graph-generator` - Open Graph generator
- `/tools/qr-code-generator` - QR code generator
- `/tools/social-bio-generator` - Social bio generator
- `/tools/text-case-converter` - Text case converter
- `/tools/text-to-handwriting` - Text to handwriting
- `/tools/tiktok-hook-generator` - TikTok hook generator
- `/tools/tweet-generator` - Tweet generator
- `/tools/tweet-to-image` - Tweet to image
- `/tools/twitter-ad-revenue` - Twitter ad revenue
- `/tools/username-generator` - Username generator
- `/tools/vimeo-thumbnail` - Vimeo thumbnail
- `/tools/whatsapp-chat` - WhatsApp chat link
- `/tools/youtube-thumbnail` - YouTube thumbnail

### System Routes
- `/sitemap.xml` - Generated sitemap
- `/robots.txt` - Generated robots.txt
- `/manifest.json` - Web app manifest

---

## Code Organization Principles

1. **App Router Structure**: Uses Next.js 16 App Router with route-based file system
2. **Component-Based**: Reusable React components in `components/` directory
3. **Type Safety**: Full TypeScript implementation
4. **SEO-First**: Every page includes comprehensive SEO metadata
5. **Modular Tools**: Each tool is self-contained in its own directory
6. **Shared Utilities**: Common functions in `lib/` directory
7. **Static Assets**: Public assets in `public/` directory

---

## Notes

- All tools are free to use, no signup required
- SEO-optimized for search engine visibility
- Responsive design for all device sizes
- Modern UI with Tailwind CSS
- TypeScript for type safety
- Next.js 16 with App Router for optimal performance

---

*Last Updated: Generated automatically from codebase analysis*

