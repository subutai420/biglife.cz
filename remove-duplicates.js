#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🗑️ Removing duplicate root files that conflict with src/...\n');

// Files to remove from root
const filesToRemove = ['App.tsx'];

// Directories to remove from root
const dirsToRemove = ['components', 'contexts'];

let totalRemoved = 0;

// Remove files
filesToRemove.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`✅ Removed: ${file}`);
      totalRemoved++;
    } catch (error) {
      console.log(`❌ Failed to remove ${file}:`, error.message);
    }
  } else {
    console.log(`ℹ️  ${file} - not found`);
  }
});

// Remove directories
dirsToRemove.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (fs.existsSync(dirPath)) {
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✅ Removed directory: ${dir}/`);
      totalRemoved++;
    } catch (error) {
      console.log(`❌ Failed to remove ${dir}/:`, error.message);
    }
  } else {
    console.log(`ℹ️  ${dir}/ - not found`);
  }
});

// Verify src structure is intact
console.log('\n📁 Verifying src/ structure:');
const srcItems = [
  'src/App.tsx',
  'src/main.tsx',
  'src/components/',
  'src/contexts/',
  'src/styles/globals.css'
];

let srcIntact = true;
srcItems.forEach(item => {
  const exists = fs.existsSync(item);
  console.log(`${exists ? '✅' : '❌'} ${item}`);
  if (!exists) srcIntact = false;
});

console.log(`\n🎉 Cleanup complete! ${totalRemoved} items removed.`);
if (srcIntact) {
  console.log('✅ All src/ files are intact and ready for build');
  console.log('🚀 The build will now use only src/App.tsx');
} else {
  console.log('⚠️  Some src/ files may be missing - please verify');
}

console.log('\n📝 Next steps:');
console.log('npm run build  # Should work without errors now');