#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Biglife build configuration...\n');

const checks = [];

// Check if required files exist
const requiredFiles = [
  'src/main.tsx',
  'src/App.tsx', 
  'src/styles/globals.css',
  'index.html',
  'package.json',
  'vite.config.ts',
  'netlify.toml',
  'public/_redirects'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    checks.push(`✅ ${file} exists`);
  } else {
    checks.push(`❌ ${file} missing`);
  }
});

// Check package.json dependencies
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredDeps = [
    'react',
    'react-dom', 
    'framer-motion',
    'lucide-react',
    'tailwindcss'
  ];
  
  requiredDeps.forEach(dep => {
    if (pkg.dependencies[dep] || pkg.devDependencies[dep]) {
      checks.push(`✅ ${dep} dependency found`);
    } else {
      checks.push(`❌ ${dep} dependency missing`);
    }
  });
  
  // Check scripts
  if (pkg.scripts.build) {
    checks.push('✅ Build script configured');
  } else {
    checks.push('❌ Build script missing');
  }
} catch (err) {
  checks.push('❌ package.json invalid');
}

// Check src structure
const srcDirs = [
  'src/components',
  'src/components/ui',
  'src/components/admin',
  'src/contexts'
];

srcDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    checks.push(`✅ ${dir} directory exists`);
  } else {
    checks.push(`❌ ${dir} directory missing`);
  }
});

// Print results
console.log(checks.join('\n'));

const errors = checks.filter(check => check.startsWith('❌'));
const warnings = checks.filter(check => check.startsWith('⚠️'));

console.log('\n📊 Summary:');
console.log(`✅ Passed: ${checks.length - errors.length - warnings.length}`);
console.log(`❌ Failed: ${errors.length}`);
console.log(`⚠️  Warnings: ${warnings.length}`);

if (errors.length === 0) {
  console.log('\n🎉 Build configuration verified! Ready for deployment.');
  console.log('\n🚀 Next steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: npm run build');
  console.log('3. Deploy dist/ folder to Netlify');
} else {
  console.log('\n❌ Please fix the errors above before deploying.');
  process.exit(1);
}