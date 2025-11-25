// Fix closing fragments and add FAQ components
const fs = require('fs');
const path = require('path');

const toolPages = [
  'analytics-calculator',
  'best-time-calculator',
  'bio-link-generator',
  'caption-templates',
  'character-counter',
  'color-palette',
  'content-calendar',
  'content-ideas',
  'emoji-picker',
  'engagement-calculator',
  'image-resizer',
  'instagram-filters',
  'instagram-photo-downloader',
  'instagram-post-generator',
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
    console.log(`Page doesn't exist: ${toolId}`);
    return;
  }
  
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // Check if it has opening fragment but missing closing
  if (content.includes('return (\n    <>') && !content.includes('{tool && <ToolFAQ tool={tool} />}')) {
    // Find the last </div> before the closing );
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
      fs.writeFileSync(pagePath, content);
      console.log(`Fixed: ${toolId}`);
    } else {
      // Try alternative pattern
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
        console.log(`Fixed (alt): ${toolId}`);
      }
    }
  } else if (content.includes('ToolSEO') && !content.includes('ToolFAQ')) {
    // Has SEO but missing FAQ
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
      fs.writeFileSync(pagePath, content);
      console.log(`Added FAQ: ${toolId}`);
    }
  } else {
    console.log(`Already fixed or no changes needed: ${toolId}`);
  }
});

console.log('Done fixing fragments!');

