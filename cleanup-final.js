#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧹 Final cleanup - removing ALL duplicate root files...\n');

// Files and directories to remove from root (keeping only src versions)
const duplicatesToRemove = [
  'App.tsx',
  'components',
  'contexts'
];

let cleaned = 0;

duplicatesToRemove.forEach(item => {
  const itemPath = path.join(process.cwd(), item);
  
  if (fs.existsSync(itemPath)) {
    try {
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        fs.rmSync(itemPath, { recursive: true, force: true });
        console.log(`✅ Removed duplicate directory: ${item}/`);
      } else {
        fs.unlinkSync(itemPath);
        console.log(`✅ Removed duplicate file: ${item}`);
      }
      cleaned++;
    } catch (error) {
      console.log(`❌ Error removing ${item}:`, error.message);
    }
  } else {
    console.log(`ℹ️  ${item} - already clean`);
  }
});

// Fix root styles/globals.css to have proper Tailwind import
const rootGlobalsCss = 'styles/globals.css';
if (fs.existsSync(rootGlobalsCss)) {
  try {
    const content = fs.readFileSync(rootGlobalsCss, 'utf8');
    if (!content.startsWith('@import "tailwindcss"')) {
      const fixedContent = '@import "tailwindcss";\n' + content;
      fs.writeFileSync(rootGlobalsCss, fixedContent);
      console.log('✅ Added missing Tailwind import to root styles/globals.css');
    } else {
      console.log('✅ Root styles/globals.css already has Tailwind import');
    }
  } catch (error) {
    console.log('❌ Error fixing root globals.css:', error.message);
  }
} else {
  console.log('ℹ️  Root styles/globals.css not found');
}

// Verify src structure is intact
console.log('\n📁 Verifying src/ structure:');
const srcStructure = [
  'src/App.tsx',
  'src/main.tsx', 
  'src/styles/globals.css',
  'src/components/',
  'src/contexts/'
];

let allGood = true;
srcStructure.forEach(item => {
  const exists = fs.existsSync(item);
  console.log(`${exists ? '✅' : '❌'} ${item}`);
  if (!exists) allGood = false;
});

console.log(`\n🎉 Cleanup complete! ${cleaned} duplicates removed.`);
console.log(allGood ? '✅ All src/ files intact - ready for clean build!' : '⚠️  Some src/ files missing - check structure');

console.log('\n🚀 Next steps:');
console.log('  npm run build  # Should now use only src/ directory');
console.log('  node verify-setup.js  # Verify everything is correct');