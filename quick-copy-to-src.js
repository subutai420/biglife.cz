const fs = require('fs');

// Quick copy missing admin components
const adminFiles = [
  'AboutEditor.tsx', 'ContactEditor.tsx', 'ContactSubmissionsViewer.tsx',
  'FAQEditor.tsx', 'HeroEditor.tsx', 'PropertiesEditor.tsx', 'TeamEditor.tsx'
];

// Create admin directory if it doesn't exist
if (!fs.existsSync('src/components/admin')) {
  fs.mkdirSync('src/components/admin', { recursive: true });
}

adminFiles.forEach(file => {
  if (fs.existsSync(`components/admin/${file}`)) {
    fs.copyFileSync(`components/admin/${file}`, `src/components/admin/${file}`);
    console.log(`✅ Copied admin/${file}`);
  }
});

// Copy missing UI components  
const uiFiles = [
  'alert.tsx', 'alert-dialog.tsx', 'avatar.tsx', 'badge.tsx', 'calendar.tsx',
  'carousel.tsx', 'chart.tsx', 'checkbox.tsx', 'collapsible.tsx', 'command.tsx',
  'context-menu.tsx', 'drawer.tsx', 'dropdown-menu.tsx', 'form.tsx',
  'hover-card.tsx', 'input-otp.tsx', 'menubar.tsx', 'navigation-menu.tsx',
  'pagination.tsx', 'popover.tsx', 'progress.tsx', 'radio-group.tsx',
  'resizable.tsx', 'scroll-area.tsx', 'separator.tsx', 'sheet.tsx',
  'sidebar.tsx', 'skeleton.tsx', 'switch.tsx', 'table.tsx', 'tabs.tsx',
  'toggle.tsx', 'toggle-group.tsx', 'tooltip.tsx', 'use-mobile.ts'
];

uiFiles.forEach(file => {
  if (fs.existsSync(`components/ui/${file}`)) {
    fs.copyFileSync(`components/ui/${file}`, `src/components/ui/${file}`);
    console.log(`✅ Copied ui/${file}`);
  }
});

// Copy AdminToggle if missing
if (fs.existsSync('components/AdminToggle.tsx') && !fs.existsSync('src/components/AdminToggle.tsx')) {
  fs.copyFileSync('components/AdminToggle.tsx', 'src/components/AdminToggle.tsx');
  console.log('✅ Copied AdminToggle.tsx');
}

console.log('🎉 Missing components copied to /src!');