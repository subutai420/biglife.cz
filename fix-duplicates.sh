#!/bin/bash

echo "🔧 Fixing duplicate file structure..."
echo "This script will remove root duplicates and keep only src/ files"
echo ""

# Remove problematic root files
echo "🗑️  Removing root duplicates..."

if [ -f "App.tsx" ]; then
    rm "App.tsx"
    echo "✅ Removed App.tsx"
else
    echo "ℹ️  App.tsx already removed"
fi

if [ -d "components" ]; then
    rm -rf "components"
    echo "✅ Removed components/"
else
    echo "ℹ️  components/ already removed"
fi

if [ -d "contexts" ]; then
    rm -rf "contexts"
    echo "✅ Removed contexts/"
else
    echo "ℹ️  contexts/ already removed"
fi

echo ""
echo "🔍 Verifying src structure..."

# Check essential src files
essential_files=("src/App.tsx" "src/main.tsx" "src/components" "src/contexts" "index.html")

all_good=true
for file in "${essential_files[@]}"; do
    if [ -e "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        all_good=false
    fi
done

echo ""
if [ "$all_good" = true ]; then
    echo "🎉 SUCCESS: File structure is now clean!"
    echo "✅ All root duplicates removed"
    echo "✅ All essential src files present"
    echo ""
    echo "🚀 Ready to build:"
    echo "npm run build"
else
    echo "⚠️  Some files are missing. Please check your src/ directory."
fi

echo ""
echo "📋 Next steps:"
echo "1. node verify-no-duplicates.js  # Verify everything is correct"
echo "2. npm run build  # Build the project"
echo "3. npm run preview  # Test the build"