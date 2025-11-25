// Fix all closing fragments - add FAQ and close fragment properly
const fs = require('fs');
const path = require('path');

const files = [
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

files.forEach(file => {
  const filePath = path.join(__dirname, '..', 'app', 'tools', file, 'page.tsx');
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if it has opening fragment
  if (content.includes('return (\n    <>')) {
    // Check if already fixed
    if (content.includes('{tool && <ToolFAQ tool={tool} />}') && content.includes('</>')) {
      console.log(`Already fixed: ${file}`);
      return;
    }
    
    // Find the pattern: </div>\n  );\n}
    // Replace with: </div>\n      {tool && <ToolFAQ tool={tool} />}\n    </div>\n    </>\n  );\n}
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
      fs.writeFileSync(filePath, content);
      console.log(`Fixed: ${file}`);
    } else {
      console.log(`Pattern not found in: ${file}`);
    }
  } else {
    console.log(`No opening fragment in: ${file}`);
  }
});

console.log('Done fixing closing tags!');

