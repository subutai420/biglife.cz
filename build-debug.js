#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Build Debug Information\n');

// Check file structure
console.log('📁 Key files:');
const keyFiles = [
  'src/main.tsx',
  'src/App.tsx',
  'src/styles/globals.css',
  'package.json',
  'tsconfig.json',
  'vite.config.ts'
];

keyFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// Check src structure
console.log('\n📂 src/ directory:');
try {
  const srcFiles = fs.readdirSync('src', { withFileTypes: true });
  srcFiles.forEach(file => {
    const type = file.isDirectory() ? '📁' : '📄';
    console.log(`  ${type} ${file.name}`);
    
    if (file.isDirectory() && file.name === 'components') {
      const components = fs.readdirSync(path.join('src', file.name));
      components.forEach(comp => {
        console.log(`    📄 ${comp}`);
      });
    }
  });
} catch (error) {
  console.log('❌ Error reading src directory:', error.message);
}

// Check package.json scripts
console.log('\n📜 Package.json scripts:');
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  Object.entries(pkg.scripts || {}).forEach(([name, script]) => {
    console.log(`  ${name}: ${script}`);
  });
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
}

// Check tsconfig
console.log('\n⚙️  TypeScript config:');
try {
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  console.log(`  Include: ${JSON.stringify(tsconfig.include)}`);
  console.log(`  Exclude: ${JSON.stringify(tsconfig.exclude)}`);
  console.log(`  NoEmit: ${tsconfig.compilerOptions.noEmit}`);
} catch (error) {
  console.log('❌ Error reading tsconfig.json:', error.message);
}

console.log('\n🚀 To build: npm run build');
console.log('🔍 To debug: node build-debug.js');