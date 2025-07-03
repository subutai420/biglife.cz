#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning up duplicate files that cause build conflicts...\n');

// Files/directories to remove from root (keeping only src versions)
const toCleanup = [
  'components',
  'contexts', 
  'styles'
];

let cleaned = 0;

toCleanup.forEach(item => {
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

// Verify src structure
console.log('\n📁 Verifying src/ structure:');
const srcStructure = [
  'src/App.tsx',
  'src/main.tsx', 
  'src/styles/globals.css',
  'src/components',
  'src/contexts'
];

srcStructure.forEach(item => {
  const exists = fs.existsSync(item);
  console.log(`${exists ? '✅' : '❌'} ${item}`);
});

console.log(`\n🎉 Cleanup complete! ${cleaned} items processed.`);
console.log('📦 Only src/ structure remains - ready for clean build!');