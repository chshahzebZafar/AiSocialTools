# Social Media Tools Website

A modern, SEO-optimized Next.js application showcasing the best social media management tools. Built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- ✅ **SEO Optimized**: Server-side rendering, meta tags, structured data (JSON-LD), sitemap, and robots.txt
- ✅ **Modern UI**: Beautiful, responsive design with Tailwind CSS
- ✅ **Performance**: Static site generation for fast page loads
- ✅ **Tool Listings**: Comprehensive list of social media tools with ratings and features
- ✅ **Dynamic Pages**: Individual pages for each tool with detailed information
- ✅ **Recommended Tools**: Highlighted recommended tools section
- ✅ **Category Filtering**: Browse tools by category

## Recommended Tools Included

The application includes 8 recommended tools to get started:

1. **Buffer** - Social media scheduling and management
2. **Hootsuite** - Comprehensive social media management
3. **Canva** - Graphic design for social media
4. **Later** - Visual social media scheduler
5. **Linktree** - Link in bio tool
6. **Grammarly** - Writing assistant
7. **CapCut** - Video editing for social media
8. **Unsplash** - Free stock photos

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## SEO Features

- **Server-Side Rendering (SSR)**: All pages are pre-rendered for optimal SEO
- **Meta Tags**: Comprehensive Open Graph and Twitter Card support
- **Structured Data**: JSON-LD schema markup for better search engine understanding
- **Sitemap**: Automatically generated sitemap.xml
- **Robots.txt**: Properly configured robots.txt
- **Semantic HTML**: Clean, semantic markup
- **Performance**: Optimized images and code splitting

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Homepage with tools listing
│   ├── tools/
│   │   └── [id]/
│   │       └── page.tsx    # Dynamic tool detail pages
│   ├── sitemap.ts          # Sitemap generation
│   ├── robots.ts           # Robots.txt generation
│   └── not-found.tsx       # 404 page
├── lib/
│   └── tools.ts            # Tools data and utilities
└── public/                 # Static assets
```

## Adding New Tools

Edit `lib/tools.ts` to add new social media tools. Each tool should include:

- Name and description
- Category
- Website URL
- Pricing information
- Features list
- Rating
- Recommended flag

## Customization

### Update Site Metadata

Edit `app/layout.tsx` to update:
- Site title and description
- Open Graph images
- Twitter card settings
- Verification codes

### Update Domain

Replace `https://socialmediatools.com` with your actual domain in:
- `app/layout.tsx` (metadata)
- `app/sitemap.ts` (sitemap URL)
- `app/robots.ts` (sitemap URL)

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## License

MIT
