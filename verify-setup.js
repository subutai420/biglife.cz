#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Biglife Build Setup Verification\n');

// Check essential files
const essentialFiles = [
  { path: 'index.html', check: content => content.includes('/src/main.tsx') },
  { path: 'src/main.tsx', check: content => content.includes('./App.tsx') },
  { path: 'src/App.tsx', check: content => content.includes('export default') },
  { path: 'src/styles/globals.css', check: content => content.includes('@import "tailwindcss"') },
  { path: 'postcss.config.js', check: content => content.includes('@tailwindcss/postcss') },
  { path: 'package.json', check: content => content.includes('@tailwindcss/postcss') }
];

console.log('📄 Essential Files Check:');
essentialFiles.forEach(({ path: filePath, check }) => {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const isValid = check(content);
      console.log(`${isValid ? '✅' : '⚠️ '} ${filePath} ${isValid ? '' : '- needs attention'}`);
    } else {
      console.log(`❌ ${filePath} - missing`);
    }
  } catch (error) {
    console.log(`❌ ${filePath} - error reading: ${error.message}`);
  }
});

// Check for problematic duplicates
console.log('\n🚫 Duplicate Files Check:');
const problematicPaths = ['components/', 'contexts/', 'styles/', 'App.tsx'];
let hasProblems = false;

problematicPaths.forEach(dupPath => {
  if (fs.existsSync(dupPath)) {
    console.log(`⚠️  Root ${dupPath} exists - may cause conflicts`);
    hasProblems = true;
  } else {
    console.log(`✅ Root ${dupPath} - clean`);
  }
});

// Check src structure
console.log('\n📁 Src Structure Check:');
const srcFiles = [
  'src/App.tsx',
  'src/main.tsx',
  'src/styles/globals.css',
  'src/components/',
  'src/contexts/'
];

srcFiles.forEach(srcPath => {
  const exists = fs.existsSync(srcPath);
  console.log(`${exists ? '✅' : '❌'} ${srcPath}`);
});

// Final recommendation
console.log('\n🎯 Build Readiness:');
if (hasProblems) {
  console.log('⚠️  Run cleanup before building: npm run cleanup');
} else {
  console.log('✅ Ready to build: npm run build');
}

console.log('\n💡 Troubleshooting:');
console.log('  - If build fails: npm run cleanup && npm run build');
console.log('  - Check logs: node verify-setup.js');
console.log('  - Debug Tailwind: node build-debug.js');