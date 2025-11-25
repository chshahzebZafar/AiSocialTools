// Script to add SEO components to all tool pages
const fs = require('fs');
const path = require('path');

const toolPages = [
  'instagram-filters',
  'instagram-post-generator',
  'instagram-photo-downloader',
  'twitter-ad-revenue',
  'youtube-thumbnail',
  'vimeo-thumbnail',
  'open-graph-generator',
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
  'social-bio-generator'
];

toolPages.forEach(toolId => {
  const pagePath = path.join(__dirname, '..', 'app', 'tools', toolId, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    console.log(`Page doesn't exist: ${pagePath}`);
    return;
  }
  
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // Check if already updated
  if (content.includes('ToolSEO')) {
    console.log(`Already updated: ${toolId}`);
    return;
  }
  
  // Add imports
  if (content.includes('from "@/lib/social-tools"')) {
    content = content.replace(
      'import { getToolById } from "@/lib/social-tools";',
      `import { getToolById } from "@/lib/social-tools";
import ToolSEO from "@/components/ToolSEO";
import ToolFAQ from "@/components/ToolFAQ";
import { getSEOMetadata } from "@/lib/seo-metadata";`
    );
  }
  
  // Add seo variable
  if (content.includes('const tool = getToolById')) {
    content = content.replace(
      'const tool = getToolById',
      `const tool = getToolById`
    );
    // Add after tool declaration
    const toolMatch = content.match(/const tool = getToolById\([^)]+\);/);
    if (toolMatch) {
      content = content.replace(
        toolMatch[0],
        `${toolMatch[0]}
  const seo = tool ? getSEOMetadata(tool) : null;`
      );
    }
  }
  
  // Add ToolSEO and ToolFAQ to return
  if (content.includes('return (')) {
    content = content.replace(
      /return \(\s*<div className="p-8/,
      `return (
    <>
      {tool && <ToolSEO tool={tool} />}
      <div className="p-8`
    );
    
    // Add FAQ before closing div
    const lastDivMatch = content.match(/(\s+<\/div>\s+)(\}\);)/);
    if (lastDivMatch) {
      content = content.replace(
        lastDivMatch[0],
        `      {tool && <ToolFAQ tool={tool} />}
    </div>
    </>
  );
}`
      );
    }
  }
  
  fs.writeFileSync(pagePath, content);
  console.log(`Updated: ${toolId}`);
});

console.log('Done updating tool pages!');

