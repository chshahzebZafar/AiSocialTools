// Script to update H1 tags and descriptions with SEO content
const fs = require('fs');
const path = require('path');

const seoData = {
  'youtube-thumbnail': {
    h1: 'YouTube Thumbnail Grabber - Download YouTube Thumbnails Free',
    desc: 'Extract and download YouTube video thumbnails in high quality. Free YouTube thumbnail grabber tool. Download thumbnails in max resolution, HQ, MQ, or SD quality instantly.'
  },
  'instagram-post-generator': {
    h1: 'Instagram Post Generator - Create Engaging Instagram Captions Free',
    desc: 'Generate engaging Instagram captions and posts with our free Instagram post generator. Create viral content with templates, hashtags, and emoji suggestions. Boost your Instagram engagement.'
  },
  'open-graph-generator': {
    h1: 'Open Graph Meta Tags Generator - Free OG Tags Generator for SEO',
    desc: 'Generate Open Graph meta tags for Facebook, Twitter, and LinkedIn. Free OG tags generator with preview. Improve social media sharing and SEO. Create perfect social media cards.'
  },
  'character-counter': {
    h1: 'Social Media Character Counter - Count Characters for All Platforms Free',
    desc: 'Count characters for Twitter, Instagram, Facebook, LinkedIn, and more. Free social media character counter with platform limits. Track character count in real-time.'
  },
  'image-resizer': {
    h1: 'Social Media Image Resizer - Resize Images for Instagram, Facebook Free',
    desc: 'Resize images for Instagram, Facebook, Twitter, LinkedIn, and more. Free social media image resizer with platform-specific dimensions. Optimize images for social media instantly.'
  },
  'qr-code-generator': {
    h1: 'Free QR Code Generator - Create QR Codes for Social Media Links',
    desc: 'Generate QR codes for Instagram, Twitter, Facebook, and any URL. Free QR code generator with customizable colors and sizes. Download QR codes as PNG. Perfect for social media marketing.'
  },
  'username-generator': {
    h1: 'Username Generator - Generate Unique Social Media Usernames Free',
    desc: 'Generate unique and available usernames for Instagram, Twitter, TikTok, and more. Free username generator with variations. Find the perfect username for your social media accounts.'
  },
  'social-bio-generator': {
    h1: 'Social Media Bio Generator - Create Instagram, Twitter Bios Free',
    desc: 'Generate compelling bios for Instagram, Twitter, LinkedIn, and TikTok. Free social media bio generator with templates. Create professional bios that attract followers.'
  },
  'engagement-calculator': {
    h1: 'Social Media Engagement Calculator - Calculate Engagement Rate Free',
    desc: 'Calculate engagement rate, reach rate, and social media metrics. Free engagement calculator for Instagram, Twitter, Facebook. Analyze your social media performance instantly.'
  },
  'twitter-ad-revenue': {
    h1: 'Twitter Ad Revenue Calculator - Calculate Twitter/X Ad Revenue Free',
    desc: 'Calculate potential Twitter ad revenue based on followers, engagement, and CPM. Free Twitter ad revenue calculator. Estimate earnings from Twitter monetization.'
  },
  'instagram-filters': {
    h1: 'Instagram Filters - Apply Photo Filters Online Free',
    desc: 'Apply beautiful Instagram-style filters to your photos. Free Instagram filter tool with multiple filter options. Edit photos online, no app required.'
  },
  'vimeo-thumbnail': {
    h1: 'Vimeo Thumbnail Grabber - Download Vimeo Thumbnails Free',
    desc: 'Extract and download Vimeo video thumbnails in high quality. Free Vimeo thumbnail grabber. Download thumbnails from any Vimeo video instantly.'
  },
  'bio-link-generator': {
    h1: 'Bio Link Generator - Create Link in Bio Page Free',
    desc: 'Create a custom link in bio page for Instagram, TikTok, and Twitter. Free bio link generator with multiple links. Build your own linktree-style page instantly.'
  },
  'content-calendar': {
    h1: 'Social Media Content Calendar - Plan & Schedule Posts Free',
    desc: 'Plan and schedule your social media content with our free content calendar. Organize posts, track publishing dates, and manage multiple platforms. Boost your social media strategy.'
  },
  'color-palette': {
    h1: 'Color Palette Generator - Extract Colors from Images Free',
    desc: 'Extract color palettes from images for branding and design. Free color palette generator. Get dominant colors from photos. Perfect for social media branding.'
  },
  'text-case-converter': {
    h1: 'Text Case Converter - Convert Text to Uppercase, Lowercase, Title Case Free',
    desc: 'Convert text to uppercase, lowercase, title case, camelCase, snake_case, and more. Free text case converter tool. Transform text formatting instantly for social media posts.'
  },
  'emoji-picker': {
    h1: 'Emoji Picker & Generator - Copy Emojis for Social Media Free',
    desc: 'Browse and copy emojis for Instagram, Twitter, Facebook posts. Free emoji picker with categories. Find the perfect emoji for your social media content.'
  },
  'best-time-calculator': {
    h1: 'Best Time to Post Calculator - Find Optimal Posting Times Free',
    desc: 'Find the best times to post on Instagram, Twitter, Facebook, LinkedIn, and TikTok. Free posting time calculator with platform-specific recommendations. Maximize engagement.'
  },
  'caption-templates': {
    h1: 'Instagram Caption Templates - Free Social Media Caption Templates',
    desc: 'Browse and use pre-made Instagram caption templates. Free social media caption templates for posts, stories, and reels. Copy, customize, and use instantly.'
  },
  'content-ideas': {
    h1: 'Content Ideas Generator - Generate Social Media Content Ideas Free',
    desc: 'Generate creative content ideas for Instagram, Twitter, LinkedIn, and TikTok. Free content ideas generator. Get inspiration for your next viral post.'
  },
  'analytics-calculator': {
    h1: 'Social Media Analytics Calculator - Calculate KPIs & Metrics Free',
    desc: 'Calculate social media KPIs including CTR, conversion rate, CPC, CPA, and ROAS. Free analytics calculator for Instagram, Twitter, Facebook. Analyze your social media performance.'
  },
  'instagram-photo-downloader': {
    h1: 'Instagram Photo Downloader - Download Instagram Photos & Videos Free',
    desc: 'Download photos and videos from Instagram posts. Free Instagram downloader tool. Save Instagram content for offline viewing. Note: Requires backend implementation.'
  }
};

Object.keys(seoData).forEach(toolId => {
  const pagePath = path.join(__dirname, '..', 'app', 'tools', toolId, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    console.log(`Page doesn't exist: ${toolId}`);
    return;
  }
  
  let content = fs.readFileSync(pagePath, 'utf8');
  const seo = seoData[toolId];
  
  // Update H1
  const h1Pattern = /<h1 className="text-3xl font-bold text-slate-900">[^<]+<\/h1>/;
  if (h1Pattern.test(content)) {
    content = content.replace(
      h1Pattern,
      `<h1 className="text-3xl font-bold text-slate-900">${seo.h1}</h1>`
    );
  }
  
  // Update description
  const descPattern = /<p className="text-slate-600">[^<]+<\/p>/;
  const descMatches = content.match(descPattern);
  if (descMatches && descMatches[0].includes('description')) {
    // Find the description paragraph after H1
    const h1Index = content.indexOf('<h1');
    const afterH1 = content.substring(h1Index);
    const descMatch = afterH1.match(/<p className="text-slate-600">[^<]+<\/p>/);
    if (descMatch) {
      content = content.replace(descMatch[0], `<p className="text-slate-600">${seo.desc}</p>`);
    }
  }
  
  fs.writeFileSync(pagePath, content);
  console.log(`Updated H1/desc for: ${toolId}`);
});

console.log('Done!');

