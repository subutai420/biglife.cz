#!/bin/bash

echo "🧹 Cleaning up duplicate files to fix build..."

# Remove root-level duplicates that conflict with src structure
rm -f App.tsx
rm -rf contexts/
rm -rf styles/
rm -rf components/

echo "✅ Duplicate files removed!"
echo "📁 Only src/ structure remains"