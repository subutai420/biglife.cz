#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚨 EMERGENCY CLEANUP: Removing all root duplicates...\n');

// Critical files to remove from root
const criticalFiles = [
  'App.tsx',
];

// Critical directories to remove from root
const criticalDirs = [
  'components',
  'contexts',
];

let removedCount = 0;

// Remove critical files
console.log('🗑️  Removing critical files:');
criticalFiles.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`✅ Removed: ${file}`);
      removedCount++;
    } else {
      console.log(`ℹ️  ${file} - not found`);
    }
  } catch (error) {
    console.log(`❌ Error removing ${file}:`, error.message);
  }
});

// Remove critical directories
console.log('\n🗑️  Removing critical directories:');
criticalDirs.forEach(dir => {
  try {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✅ Removed: ${dir}/`);
      removedCount++;
    } else {
      console.log(`ℹ️  ${dir}/ - not found`);
    }
  } catch (error) {
    console.log(`❌ Error removing ${dir}:`, error.message);
  }
});

// Verify src structure is intact
console.log('\n🔍 Verifying src structure:');
const srcRequired = [
  'src/App.tsx',
  'src/main.tsx',
  'src/components/',
  'src/contexts/',
  'src/styles/globals.css'
];

let srcIntact = true;
srcRequired.forEach(item => {
  const exists = fs.existsSync(item);
  const status = exists ? '✅' : '❌';
  console.log(`${status} ${item}`);
  if (!exists) {
    srcIntact = false;
    console.log(`   ⚠️  MISSING: ${item} is required!`);
  }
});

// Check for remaining problematic files
console.log('\n🔍 Checking for remaining problems:');
const stillProblematic = [];

criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    stillProblematic.push(file);
  }
});

criticalDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    stillProblematic.push(dir + '/');
  }
});

if (stillProblematic.length > 0) {
  console.log('❌ Still problematic:');
  stillProblematic.forEach(item => {
    console.log(`   - ${item}`);
  });
} else {
  console.log('✅ All problematic files removed');
}

// Summary
console.log('\n' + '='.repeat(50));
console.log(`🎉 Emergency cleanup complete! ${removedCount} items removed.`);

if (srcIntact && stillProblematic.length === 0) {
  console.log('✅ SUCCESS: Clean build structure achieved!');
  console.log('✅ All src/ files intact');
  console.log('✅ All root duplicates removed');
  console.log('\n🚀 Ready for build: npm run build');
} else {
  console.log('⚠️  Issues remain:');
  if (!srcIntact) {
    console.log('   - Some src/ files are missing');
  }
  if (stillProblematic.length > 0) {
    console.log('   - Some root duplicates still exist');
  }
}

console.log('\n📋 Manual cleanup (if needed):');
console.log('rm -f App.tsx');
console.log('rm -rf components/');
console.log('rm -rf contexts/');
console.log('npm run build');