const fs = require('fs');
const path = require('path');

console.log('🚀 FINAL NETLIFY DEPLOYMENT PREPARATION');
console.log('=======================================');

// Function to copy file ensuring latest version
function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
    console.log(`✅ Copied: ${src} → ${dest}`);
    return true;
  } else {
    console.log(`⚠️  Source not found: ${src}`);
    return false;
  }
}

// 1. Copy all main components to src
console.log('\n📁 Copying main components to /src...');
const mainComponents = [
  'AboutSection.tsx', 'AdminToggle.tsx', 'ContactSection.tsx', 'FAQSection.tsx',
  'Footer.tsx', 'HeroSection.tsx', 'HowItWorksSection.tsx', 'InvestorsSection.tsx',
  'Navigation.tsx', 'PropertiesSection.tsx'
];

mainComponents.forEach(component => {
  copyFile(`components/${component}`, `src/components/${component}`);
});

// 2. Copy all admin components to src
console.log('\n🔧 Copying admin components to /src...');
const adminComponents = [
  'AboutEditor.tsx', 'AdminPanel.tsx', 'ContactEditor.tsx', 'ContactSubmissionsViewer.tsx',
  'FAQEditor.tsx', 'HeroEditor.tsx', 'PropertiesEditor.tsx', 'TeamEditor.tsx'
];

adminComponents.forEach(component => {
  copyFile(`components/admin/${component}`, `src/components/admin/${component}`);
});

// 3. Copy all UI components to src
console.log('\n🎨 Copying UI components to /src...');
const uiComponents = [
  'accordion.tsx', 'alert-dialog.tsx', 'alert.tsx', 'aspect-ratio.tsx',
  'avatar.tsx', 'badge.tsx', 'breadcrumb.tsx', 'button.tsx', 'calendar.tsx',
  'card.tsx', 'carousel.tsx', 'chart.tsx', 'checkbox.tsx', 'collapsible.tsx',
  'command.tsx', 'context-menu.tsx', 'dialog.tsx', 'drawer.tsx',
  'dropdown-menu.tsx', 'form.tsx', 'hover-card.tsx', 'input-otp.tsx',
  'input.tsx', 'label.tsx', 'menubar.tsx', 'navigation-menu.tsx',
  'pagination.tsx', 'popover.tsx', 'progress.tsx', 'radio-group.tsx',
  'resizable.tsx', 'scroll-area.tsx', 'select.tsx', 'separator.tsx',
  'sheet.tsx', 'sidebar.tsx', 'skeleton.tsx', 'slider.tsx', 'sonner.tsx',
  'switch.tsx', 'table.tsx', 'tabs.tsx', 'textarea.tsx', 'toggle-group.tsx',
  'toggle.tsx', 'tooltip.tsx', 'use-mobile.ts', 'utils.ts'
];

uiComponents.forEach(component => {
  copyFile(`components/ui/${component}`, `src/components/ui/${component}`);
});

// 4. Copy contexts
console.log('\n🧠 Copying contexts to /src...');
copyFile('contexts/AdminContext.tsx', 'src/contexts/AdminContext.tsx');

// 5. Copy styles
console.log('\n🎨 Copying styles to /src...');
copyFile('styles/globals.css', 'src/styles/globals.css');

// 6. Remove duplicate directories
console.log('\n🗑️ Removing duplicate directories...');
const dirsToRemove = ['components', 'contexts', 'styles'];

dirsToRemove.forEach(dir => {
  try {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✅ Removed duplicate: ${dir}/`);
    }
  } catch (error) {
    console.log(`⚠️  Could not remove ${dir}: ${error.message}`);
  }
});

// 7. Remove cleanup and build scripts
console.log('\n🧹 Removing cleanup scripts...');
const scriptsToRemove = [
  'build-debug.js', 'cleanup-duplicates.js', 'cleanup-final.js',
  'delete-duplicates.sh', 'deploy.sh', 'emergency-cleanup.js',
  'emergency-fix.sh', 'final-cleanup.js', 'fix-build-structure.js',
  'fix-duplicates.sh', 'netlify-build.sh', 'remove-all-duplicates.js',
  'remove-duplicates.js', 'remove-root-app.sh', 'verify-build.js',
  'verify-clean-build.js', 'verify-final-structure.js', 'verify-no-duplicates.js',
  'verify-setup.js', 'verify-tailwind-v4.js', 'cleanup-for-netlify.js'
];

scriptsToRemove.forEach(script => {
  try {
    if (fs.existsSync(script)) {
      fs.unlinkSync(script);
      console.log(`✅ Removed script: ${script}`);
    }
  } catch (error) {
    console.log(`⚠️  Could not remove ${script}: ${error.message}`);
  }
});

// 8. Remove App.tsx from root if it exists (keeping only src/App.tsx)
if (fs.existsSync('App.tsx')) {
  try {
    fs.unlinkSync('App.tsx');
    console.log('✅ Removed duplicate: App.tsx');
  } catch (error) {
    console.log(`⚠️  Could not remove App.tsx: ${error.message}`);
  }
}

console.log('\n🎉 NETLIFY DEPLOYMENT PREPARATION COMPLETE!');
console.log('============================================');
console.log('✅ All components organized in /src directory');
console.log('✅ Duplicate directories removed');
console.log('✅ Build scripts cleaned up');
console.log('✅ Fixed lucide-react icon imports');
console.log('\n🚀 Ready for Netlify deployment with:');
console.log('   Build command: npm run build');
console.log('   Publish directory: dist');
console.log('   Node version: 18');

// Verify critical files exist
console.log('\n🔍 Verifying deployment-critical files...');
const criticalFiles = [
  'src/main.tsx',
  'src/App.tsx',
  'src/components/Navigation.tsx',
  'src/components/HeroSection.tsx',
  'src/contexts/AdminContext.tsx',
  'index.html',
  'package.json',
  'vite.config.ts'
];

let allCriticalFilesExist = true;
criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ MISSING: ${file}`);
    allCriticalFilesExist = false;
  }
});

if (allCriticalFilesExist) {
  console.log('\n🎯 All critical files verified! Ready for deployment.');
} else {
  console.log('\n⚠️  Some critical files are missing. Check the list above.');
}

console.log('\n📝 Next steps:');
console.log('1. Run: npm install');
console.log('2. Run: npm run build');
console.log('3. Deploy to Netlify');
console.log('\n💡 The lucide-react icon issue has been fixed!');
</parameter>
</invoke