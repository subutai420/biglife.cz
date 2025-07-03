#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Tailwind CSS v4 Build Debug\n');

// Check critical files
console.log('📁 Critical files:');
const criticalFiles = [
  'src/main.tsx',
  'src/App.tsx', 
  'src/styles/globals.css',
  'postcss.config.js',
  'tailwind.config.js',
  'package.json',
  'vite.config.ts'
];

criticalFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Check PostCSS config
console.log('\n⚙️  PostCSS Configuration:');
try {
  const postCSSContent = fs.readFileSync('postcss.config.js', 'utf8');
  const hasTailwindPlugin = postCSSContent.includes('@tailwindcss/postcss');
  console.log(`${hasTailwindPlugin ? '✅' : '❌'} Uses @tailwindcss/postcss plugin`);
  console.log(`${postCSSContent.includes('autoprefixer') ? '✅' : '❌'} Has autoprefixer`);
} catch (error) {
  console.log('❌ Error reading postcss.config.js:', error.message);
}

// Check package.json dependencies
console.log('\n📦 Dependencies:');
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  
  console.log(`${deps['tailwindcss'] ? '✅' : '❌'} tailwindcss: ${deps['tailwindcss'] || 'missing'}`);
  console.log(`${deps['@tailwindcss/postcss'] ? '✅' : '❌'} @tailwindcss/postcss: ${deps['@tailwindcss/postcss'] || 'missing'}`);
  console.log(`${deps['autoprefixer'] ? '✅' : '❌'} autoprefixer: ${deps['autoprefixer'] || 'missing'}`);
  console.log(`${deps['postcss'] ? '✅' : '❌'} postcss: ${deps['postcss'] || 'missing'}`);
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
}

// Check CSS file
console.log('\n🎨 CSS Configuration:');
try {
  const cssContent = fs.readFileSync('src/styles/globals.css', 'utf8');
  const hasTailwindImport = cssContent.includes('@import "tailwindcss"');
  console.log(`${hasTailwindImport ? '✅' : '❌'} Has Tailwind CSS import`);
  console.log(`${cssContent.includes('IBM Plex Sans') ? '✅' : '❌'} Has IBM Plex Sans font`);
  console.log(`${cssContent.includes('bg-aurora') ? '✅' : '❌'} Has custom aurora background`);
} catch (error) {
  console.log('❌ Error reading CSS file:', error.message);
}

console.log('\n🚀 Ready to build!');
console.log('💡 To build: npm run build');
console.log('🔧 To debug: node build-debug.js');