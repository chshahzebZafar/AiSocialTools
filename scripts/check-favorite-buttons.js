const fs = require('fs');
const path = require('path');

const tools = [
  'instagram-filters',
  'instagram-post-generator',
  'instagram-photo-downloader',
  'tweet-generator',
  'tweet-to-image',
  'twitter-ad-revenue',
  'youtube-thumbnail',
  'vimeo-thumbnail',
  'open-graph-generator',
  'hashtag-generator',
  'character-counter',
  'image-resizer',
  'bio-link-generator',
  'content-calendar',
  'color-palette',
  'text-case-converter',
  'emoji-picker',
  'engagement-calculator',
  'best-time-calculator',
  'caption-templates',
  'content-ideas',
  'analytics-calculator',
  'username-generator',
  'qr-code-generator',
  'social-bio-generator',
  'tiktok-hook-generator',
  'whatsapp-chat',
  'facebook-thumbnail',
  'text-to-handwriting',
  'svg-pattern-generator',
  'image-to-pdf',
  'word-to-pdf',
  'pdf-to-image',
  'pdf-merger',
  'pdf-splitter'
];

const missing = [];
const hasImport = [];
const hasUsage = [];

tools.forEach(toolId => {
  const filePath = path.join('app', 'tools', toolId, 'page.tsx');
  
  if (!fs.existsSync(filePath)) {
    missing.push(toolId);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const hasImportCheck = content.includes('import') && content.includes('FavoriteButton');
  const hasUsageCheck = content.includes('<FavoriteButton') || content.includes('FavoriteButton toolId');
  
  if (!hasImportCheck) {
    hasImport.push(toolId);
  }
  if (!hasUsageCheck) {
    hasUsage.push(toolId);
  }
});

console.log('\n=== FavoriteButton Check Results ===\n');
console.log(`Total tools: ${tools.length}`);
console.log(`Missing files: ${missing.length}${missing.length > 0 ? ' - ' + missing.join(', ') : ''}`);
console.log(`Missing import: ${hasImport.length}${hasImport.length > 0 ? ' - ' + hasImport.join(', ') : ''}`);
console.log(`Missing usage: ${hasUsage.length}${hasUsage.length > 0 ? ' - ' + hasUsage.join(', ') : ''}`);

if (missing.length === 0 && hasImport.length === 0 && hasUsage.length === 0) {
  console.log('\n✅ All tools have FavoriteButton properly implemented!');
} else {
  console.log('\n❌ Some tools are missing FavoriteButton');
}

