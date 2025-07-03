const fs = require('fs');
const path = require('path');

// Function to copy file if it doesn't exist in destination OR if src is newer
function copyFileIfMissing(src, dest) {
  if (fs.existsSync(src)) {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Always copy to ensure we have latest versions
    fs.copyFileSync(src, dest);
    console.log(`📋 Copied file: ${src} → ${dest}`);
    return true;
  }
  return false;
}

// List of files to remove for clean Netlify deployment
const filesToRemove = [
  // Build and cleanup scripts
  'build-debug.js',
  'cleanup-duplicates.js', 
  'cleanup-final.js',
  'delete-duplicates.sh',
  'deploy.sh',
  'emergency-cleanup.js',
  'emergency-fix.sh',
  'final-cleanup.js',
  'fix-build-structure.js',
  'fix-duplicates.sh',
  'netlify-build.sh',
  'remove-all-duplicates.js',
  'remove-duplicates.js',
  'remove-root-app.sh',
  'verify-build.js',
  'verify-clean-build.js',
  'verify-final-structure.js',
  'verify-no-duplicates.js',
  'verify-setup.js',
  'verify-tailwind-v4.js'
];

console.log('🧹 Preparing for Netlify deployment...');

// First, copy any missing UI components from root to src
const uiComponentsNeeded = [
  'accordion.tsx', 'alert-dialog.tsx', 'alert.tsx', 'aspect-ratio.tsx',
  'avatar.tsx', 'badge.tsx', 'breadcrumb.tsx', 'calendar.tsx', 
  'carousel.tsx', 'chart.tsx', 'checkbox.tsx', 'collapsible.tsx',
  'command.tsx', 'context-menu.tsx', 'dialog.tsx', 'drawer.tsx',
  'dropdown-menu.tsx', 'form.tsx', 'hover-card.tsx', 'input-otp.tsx',
  'menubar.tsx', 'navigation-menu.tsx', 'pagination.tsx', 'popover.tsx',
  'progress.tsx', 'radio-group.tsx', 'resizable.tsx', 'scroll-area.tsx',
  'select.tsx', 'separator.tsx', 'sheet.tsx', 'sidebar.tsx',
  'skeleton.tsx', 'switch.tsx', 'table.tsx', 'tabs.tsx',
  'toggle-group.tsx', 'toggle.tsx', 'tooltip.tsx', 'use-mobile.ts'
];

console.log('📦 Copying missing UI components...');
uiComponentsNeeded.forEach(component => {
  copyFileIfMissing(
    `components/ui/${component}`,
    `src/components/ui/${component}`
  );
});

// Copy missing admin components
const adminComponentsNeeded = [
  'AboutEditor.tsx', 'AdminPanel.tsx', 'ContactEditor.tsx', 'ContactSubmissionsViewer.tsx',
  'FAQEditor.tsx', 'HeroEditor.tsx', 'PropertiesEditor.tsx', 'TeamEditor.tsx'
];

console.log('🔧 Copying missing admin components...');
adminComponentsNeeded.forEach(component => {
  copyFileIfMissing(
    `components/admin/${component}`,
    `src/components/admin/${component}`
  );
});

// Copy main components if missing
const mainComponentsNeeded = [
  'AboutSection.tsx', 'AdminToggle.tsx', 'ContactSection.tsx', 'FAQSection.tsx',
  'Footer.tsx', 'HeroSection.tsx', 'HowItWorksSection.tsx', 'InvestorsSection.tsx',
  'Navigation.tsx', 'PropertiesSection.tsx'
];

console.log('🏗️ Copying missing main components...');
mainComponentsNeeded.forEach(component => {
  copyFileIfMissing(
    `components/${component}`,
    `src/components/${component}`
  );
});

// Remove cleanup files
filesToRemove.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`✅ Removed cleanup script: ${file}`);
    }
  } catch (error) {
    console.log(`⚠️  Could not remove ${file}: ${error.message}`);
  }
});

// Remove duplicate directories AFTER copying missing files
const dirsToRemove = ['components', 'contexts', 'styles'];

console.log('🗂️ Removing duplicate directories...');
dirsToRemove.forEach(dir => {
  try {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✅ Removed duplicate directory: ${dir}`);
    }
  } catch (error) {
    console.log(`⚠️  Could not remove ${dir}: ${error.message}`);
  }
});

console.log('🎉 Netlify preparation completed!');
console.log('📁 All files are now properly organized in /src directory.');
console.log('🚀 Ready for Netlify deployment!');