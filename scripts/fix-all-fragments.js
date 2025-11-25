// Fix all closing fragments
const fs = require('fs');
const path = require('path');

const toolPages = [
  'analytics-calculator',
  'best-time-calculator',
  'bio-link-generator',
  'caption-templates',
  'color-palette',
  'content-calendar',
  'content-ideas',
  'emoji-picker',
  'engagement-calculator',
  'image-resizer',
  'instagram-filters',
  'instagram-photo-downloader',
  'open-graph-generator',
  'qr-code-generator',
  'social-bio-generator',
  'text-case-converter',
  'twitter-ad-revenue',
  'username-generator',
  'vimeo-thumbnail'
];

toolPages.forEach(toolId => {
  const pagePath = path.join(__dirname, '..', 'app', 'tools', toolId, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    return;
  }
  
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // Check if has opening fragment but missing closing
  if (content.includes('return (\n    <>') || content.includes('return (\n    <>')) {
    // Check if already has FAQ
    if (content.includes('{tool && <ToolFAQ tool={tool} />}')) {
      console.log(`Already has FAQ: ${toolId}`);
      return;
    }
    
    // Find pattern: </div>\n  );\n}
    const pattern = /(\s+<\/div>\s+)(\}\);)/;
    if (pattern.test(content)) {
      content = content.replace(
        pattern,
        `      {tool && <ToolFAQ tool={tool} />}
    </div>
    </>
  );
}`
      );
      fs.writeFileSync(pagePath, content);
      console.log(`Fixed: ${toolId}`);
    }
  }
});

console.log('Done!');

