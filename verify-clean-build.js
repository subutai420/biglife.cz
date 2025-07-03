#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying clean build structure...\n');

// Check that problematic root files are gone
const problematicFiles = [
  { path: 'App.tsx', shouldExist: false, description: 'Root App.tsx (should be deleted)' },
  { path: 'components/', shouldExist: false, description: 'Root components/ (should be deleted)' },
  { path: 'contexts/', shouldExist: false, description: 'Root contexts/ (should be deleted)' }
];

// Check that essential src files exist
const essentialFiles = [
  { path: 'src/App.tsx', shouldExist: true, description: 'Source App.tsx (main app)' },
  { path: 'src/main.tsx', shouldExist: true, description: 'Source main.tsx (entry point)' },
  { path: 'src/components/', shouldExist: true, description: 'Source components/' },
  { path: 'src/contexts/', shouldExist: true, description: 'Source contexts/' },
  { path: 'src/styles/globals.css', shouldExist: true, description: 'Source styles' }
];

// Check build configuration files
const configFiles = [
  { path: 'index.html', shouldExist: true, description: 'HTML entry point' },
  { path: 'vite.config.ts', shouldExist: true, description: 'Vite configuration' },
  { path: 'package.json', shouldExist: true, description: 'Package configuration' }
];

let allGood = true;

console.log('❌ Checking problematic files (should NOT exist):');
problematicFiles.forEach(({ path: filePath, shouldExist, description }) => {
  const exists = fs.existsSync(filePath);
  const status = exists === shouldExist ? '✅' : '❌';
  console.log(`${status} ${description} - ${exists ? 'EXISTS' : 'MISSING'}`);
  if (exists !== shouldExist) {
    allGood = false;
    if (exists && !shouldExist) {
      console.log(`   ⚠️  ${filePath} should be deleted!`);
    }
  }
});

console.log('\n✅ Checking essential files (should exist):');
essentialFiles.forEach(({ path: filePath, shouldExist, description }) => {
  const exists = fs.existsSync(filePath);
  const status = exists === shouldExist ? '✅' : '❌';
  console.log(`${status} ${description} - ${exists ? 'EXISTS' : 'MISSING'}`);
  if (exists !== shouldExist) {
    allGood = false;
    if (!exists && shouldExist) {
      console.log(`   ⚠️  ${filePath} is required!`);
    }
  }
});

console.log('\n⚙️  Checking configuration files:');
configFiles.forEach(({ path: filePath, shouldExist, description }) => {
  const exists = fs.existsSync(filePath);
  const status = exists === shouldExist ? '✅' : '❌';
  console.log(`${status} ${description} - ${exists ? 'EXISTS' : 'MISSING'}`);
  if (exists !== shouldExist) allGood = false;
});

// Check index.html points to correct entry
if (fs.existsSync('index.html')) {
  const indexContent = fs.readFileSync('index.html', 'utf8');
  const hasCorrectEntry = indexContent.includes('/src/main.tsx');
  console.log(`${hasCorrectEntry ? '✅' : '❌'} index.html entry point - ${hasCorrectEntry ? 'CORRECT' : 'INCORRECT'}`);
  if (!hasCorrectEntry) allGood = false;
}

console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('🎉 SUCCESS: Build structure is clean and ready!');
  console.log('✅ All problematic root files removed');
  console.log('✅ All essential src files present'); 
  console.log('✅ Configuration files correct');
  console.log('\n🚀 Ready to build: npm run build');
} else {
  console.log('⚠️  WARNING: Build structure has issues');
  console.log('🛠️  Run: node remove-duplicates.js');
  console.log('🔧 Then: npm run build');
}

console.log('\n📋 Quick fix commands:');
console.log('node remove-duplicates.js  # Clean up duplicates');
console.log('npm run build             # Build the project');
console.log('node verify-clean-build.js # Verify structure');