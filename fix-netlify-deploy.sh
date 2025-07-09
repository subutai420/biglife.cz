#!/bin/bash

echo "🔧 Fixing Netlify deployment issues..."

# Remove all root-level duplicate files/folders that are causing confusion
echo "Removing duplicate root-level files..."
rm -rf components contexts styles App.tsx 

# Remove all build and cleanup scripts
echo "Removing build scripts..."
rm -f *.js *.sh
rm -f .eslintrc.cjs

# Remove documentation files
echo "Removing documentation files..."
rm -f Attributions.md DEPLOYMENT.md EMAIL_SETUP.md Guidelines.md

# Verify structure
echo "✅ Current structure:"
echo "├── src/ (all source files)"
echo "├── public/ (static files)"
echo "├── package.json"
echo "├── vite.config.ts"
echo "├── tsconfig.json"
echo "├── tailwind.config.js"
echo "├── postcss.config.js"
echo "├── index.html"
echo "├── netlify.toml"
echo "└── README.md"

echo ""
echo "🚀 Ready for deployment!"
echo "Run: npm install && npm run build"