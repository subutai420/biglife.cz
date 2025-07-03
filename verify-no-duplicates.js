#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying no duplicate files exist...\n');

// Check for problematic files that should NOT exist
const shouldNotExist = [
  { path: 'App.tsx', description: 'Root App.tsx (conflicts with src/App.tsx)' },
  { path: 'components/', description: 'Root components/ (conflicts with src/components/)' },
  { path: 'contexts/', description: 'Root contexts/ (conflicts with src/contexts/)' }
];

// Check for essential files that SHOULD exist
const shouldExist = [
  { path: 'src/App.tsx', description: 'Source App.tsx (main application)' },
  { path: 'src/main.tsx', description: 'Source main.tsx (entry point)' },
  { path: 'src/components/', description: 'Source components directory' },
  { path: 'src/contexts/', description: 'Source contexts directory' },
  { path: 'index.html', description: 'HTML entry point' }
];

let issues = 0;

// Check files that should NOT exist
console.log('❌ Checking for problematic files (should NOT exist):');
shouldNotExist.forEach(({ path: filePath, description }) => {
  const exists = fs.existsSync(filePath);
  if (exists) {
    console.log(`❌ PROBLEM: ${description} - EXISTS (should be removed)`);
    issues++;
  } else {
    console.log(`✅ GOOD: ${description} - not found`);
  }
});

// Check files that SHOULD exist
console.log('\n✅ Checking for essential files (should exist):');
shouldExist.forEach(({ path: filePath, description }) => {
  const exists = fs.existsSync(filePath);
  if (!exists) {
    console.log(`❌ PROBLEM: ${description} - MISSING`);
    issues++;
  } else {
    console.log(`✅ GOOD: ${description} - exists`);
  }
});

// Check index.html entry point
console.log('\n🔍 Checking index.html entry point:');
if (fs.existsSync('index.html')) {
  const content = fs.readFileSync('index.html', 'utf8');
  if (content.includes('/src/main.tsx')) {
    console.log('✅ GOOD: index.html points to /src/main.tsx');
  } else {
    console.log('❌ PROBLEM: index.html does not point to /src/main.tsx');
    issues++;
  }
} else {
  console.log('❌ PROBLEM: index.html is missing');
  issues++;
}

// Final assessment
console.log('\n' + '='.repeat(50));
if (issues === 0) {
  console.log('🎉 SUCCESS: No duplicate files found!');
  console.log('✅ All problematic files removed');
  console.log('✅ All essential files present');
  console.log('✅ Correct entry point configured');
  console.log('\n🚀 Build should work perfectly now!');
  console.log('🔧 Run: npm run build');
} else {
  console.log(`⚠️  WARNING: ${issues} issues found`);
  console.log('\n🛠️  Fix issues with:');
  console.log('node emergency-cleanup.js  # Remove problematic files');
  console.log('node verify-no-duplicates.js  # Verify fixes');
  console.log('npm run build  # Build the project');
}

console.log('\n📋 Manual commands (if needed):');
console.log('rm -f App.tsx  # Remove root App.tsx');
console.log('rm -rf components/  # Remove root components/');
console.log('rm -rf contexts/  # Remove root contexts/');