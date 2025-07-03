#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing build structure - removing root duplicates...\n');

// Remove problematic root files that conflict with src/
const rootFilesToRemove = [
  'App.tsx'
];

const rootDirsToRemove = [
  'components',
  'contexts'
];

let removed = 0;

// Remove root files
rootFilesToRemove.forEach(file => {
  if (fs.existsSync(file)) {
    try {
      fs.unlinkSync(file);
      console.log(`✅ Removed root file: ${file}`);
      removed++;
    } catch (error) {
      console.log(`❌ Failed to remove ${file}:`, error.message);
    }
  } else {
    console.log(`ℹ️  ${file} - already removed`);
  }
});

// Remove root directories
rootDirsToRemove.forEach(dir => {
  if (fs.existsSync(dir)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✅ Removed root directory: ${dir}/`);
      removed++;
    } catch (error) {
      console.log(`❌ Failed to remove ${dir}:`, error.message);
    }
  } else {
    console.log(`ℹ️  ${dir}/ - already removed`);
  }
});

// Verify src structure
console.log('\n📁 Verifying src structure:');
const srcFiles = [
  'src/App.tsx',
  'src/main.tsx',
  'src/styles/globals.css'
];

const srcDirs = [
  'src/components',
  'src/contexts'
];

let allSrcGood = true;
[...srcFiles, ...srcDirs].forEach(item => {
  const exists = fs.existsSync(item);
  console.log(`${exists ? '✅' : '❌'} ${item}`);
  if (!exists) allSrcGood = false;
});

// Check build configuration
console.log('\n⚙️  Build configuration:');
const configFiles = [
  'index.html',
  'vite.config.ts',
  'postcss.config.js',
  'tailwind.config.js'
];

configFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

console.log(`\n🎉 Structure fix complete! ${removed} items removed.`);
console.log(allSrcGood ? '✅ All src files intact' : '⚠️  Some src files missing');

console.log('\n🚀 Next steps:');
console.log('1. npm run build  # Should now work without warnings');
console.log('2. The build will only use src/ directory');
console.log('3. No more "deprecated root App.tsx" warnings');

// Final verification
if (!fs.existsSync('App.tsx') && !fs.existsSync('components') && !fs.existsSync('contexts')) {
  console.log('\n✅ SUCCESS: All root duplicates removed!');
  console.log('🎯 Build will now use only src/ directory structure');
} else {
  console.log('\n⚠️  Some root duplicates may still exist');
}