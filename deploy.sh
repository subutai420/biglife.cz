#!/bin/bash

echo "🚀 Preparing Biglife for Netlify deployment..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Type check
echo "🔍 Running type check..."
npm run type-check

# Build the project
echo "🏗️  Building project..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful! Ready for deployment."
    echo ""
    echo "📁 Build output in: ./dist"
    echo "🌐 Upload dist folder to Netlify or connect via Git"
    echo ""
    echo "🔗 Or deploy directly with: npx netlify deploy --prod --dir=dist"
else
    echo "❌ Build failed!"
    exit 1
fi