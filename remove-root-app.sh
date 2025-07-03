#!/bin/bash

echo "🗑️  Removing problematic root App.tsx file..."

if [ -f "App.tsx" ]; then
    rm "App.tsx"
    echo "✅ Removed root App.tsx"
else
    echo "ℹ️  Root App.tsx already removed"
fi

if [ -d "components" ]; then
    rm -rf "components"
    echo "✅ Removed root components/"
else
    echo "ℹ️  Root components/ already removed"
fi

if [ -d "contexts" ]; then
    rm -rf "contexts"
    echo "✅ Removed root contexts/"
else
    echo "ℹ️  Root contexts/ already removed"
fi

echo "🎉 Cleanup complete! Build should now use only src/ directory."
echo "🚀 Ready to build: npm run build"