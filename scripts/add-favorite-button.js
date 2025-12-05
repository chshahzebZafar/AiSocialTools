/**
 * Script to add FavoriteButton to all tool pages
 * Run with: node scripts/add-favorite-button.js
 * 
 * This script:
 * 1. Adds FavoriteButton import
 * 2. Adds FavoriteButton component near ShareButtons
 */

const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../app/tools');
const files = fs.readdirSync(toolsDir, { recursive: true })
  .filter(file => file.endsWith('page.tsx') && file !== 'page.tsx')
  .map(file => path.join(toolsDir, file));

console.log(`Found ${files.length} tool pages to update`);

files.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const toolId = path.basename(path.dirname(filePath));
    
    // Skip if already has FavoriteButton
    if (content.includes('FavoriteButton')) {
      console.log(`✓ ${toolId} - Already has FavoriteButton`);
      return;
    }
    
    // Add import
    if (content.includes('import ShareButtons')) {
      content = content.replace(
        /import ShareButtons from ["']@\/components\/ShareButtons["'];?/,
        `import ShareButtons from "@/components/ShareButtons";\nimport { FavoriteButton } from "@/components/FavoriteButton";`
      );
    }
    
    // Add FavoriteButton near first ShareButtons usage
    // Pattern 1: <div className="mt-4"> with ShareButtons
    if (content.includes('<div className="mt-4">') && content.includes('<ShareButtons')) {
      content = content.replace(
        /(<div className="mt-4">\s*)(<ShareButtons)/,
        `$1{tool && <FavoriteButton toolId={tool.id} />}\n          $2`
      );
      content = content.replace(
        /(<div className="mt-4">)/,
        `$1 flex items-center gap-3 flex-wrap`
      );
    }
    
    // Pattern 2: <div className="mt-4 flex"> (already has flex)
    if (content.includes('<div className="mt-4 flex') && content.includes('<ShareButtons')) {
      content = content.replace(
        /(<div className="mt-4 flex[^>]*>\s*)(<ShareButtons)/,
        `$1{tool && <FavoriteButton toolId={tool.id} />}\n          $2`
      );
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ ${toolId} - Updated`);
  } catch (error) {
    console.error(`✗ ${filePath} - Error:`, error.message);
  }
});

console.log('\nDone! Please review the changes.');

