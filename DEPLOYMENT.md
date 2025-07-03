# Biglife - Netlify Deployment Guide

This guide explains how to deploy the Biglife real estate investment platform to Netlify.

## Prerequisites

- Node.js 18+ and npm 8+
- Netlify account
- Git repository (GitHub, GitLab, or Bitbucket)

## Quick Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/biglife)

## Manual Deployment

### 1. Clean Project Structure (Required)

**IMPORTANT**: Before deploying, run the cleanup script to prepare the project:

```bash
node cleanup-for-netlify.js
```

This script will:
- ✅ Copy missing UI components to `/src/components/ui/`
- ✅ Copy missing admin components to `/src/components/admin/`
- ✅ Remove duplicate root directories (`components/`, `contexts/`, `styles/`)
- ✅ Clean up unnecessary build and cleanup scripts
- ✅ Ensure all code is properly organized in `/src/`

### 2. Build the Project

```bash
npm install
npm run build
```

### 2. Deploy to Netlify

#### Option A: Drag & Drop
1. Go to [Netlify](https://app.netlify.com/)
2. Drag the `dist` folder to the deploy area
3. Your site will be live at a random URL

#### Option B: Git Integration
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository in Netlify
3. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

### 3. Environment Variables

No environment variables are required for basic functionality. The contact form uses Formspree which is already configured.

### 4. Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Add your custom domain
3. Configure DNS records as instructed

## Migration Status ✅

The Biglife platform has been **successfully prepared for Netlify deployment**:

✅ **Complete `/src` Structure**: All components moved to src directory  
✅ **New Biglife Logo**: Implemented across Navigation and Footer  
✅ **Admin Panel**: Fixed and functional with proper context integration  
✅ **Footer Admin Access**: Hidden admin toggle with password protection  
✅ **Build Configuration**: Optimized vite.config.ts and netlify.toml  
✅ **Cleanup Script**: Ready to remove duplicates and prepare for deployment  

## Features Included

✅ **Single Page Application routing**
✅ **Contact form with Formspree integration**  
✅ **Admin panel with localStorage persistence**
✅ **Interactive profit calculator with sliders**
✅ **Responsive design with Tailwind CSS v4**
✅ **Glass morphism UI with aurora gradient background**
✅ **Framer Motion animations**
✅ **SEO optimization**
✅ **Security headers**
✅ **Asset caching**

## File Structure

```
dist/
├── index.html          # Main HTML file
├── assets/
│   ├── css/           # Compiled CSS
│   └── js/            # Compiled JavaScript
└── _redirects         # Netlify routing rules
```

## Build Process

1. **TypeScript Compilation**: TSC compiles TypeScript to JavaScript
2. **Vite Build**: Bundles and optimizes for production
3. **Tailwind CSS**: Processes and purges unused styles
4. **Asset Optimization**: Minifies and compresses assets

## Performance Optimizations

- **Code Splitting**: Vendor and UI libraries are split into separate chunks
- **Tree Shaking**: Unused code is eliminated
- **Asset Compression**: Gzip compression enabled
- **Caching**: Long-term caching for static assets
- **Font Optimization**: Google Fonts with display=swap

## Security Features

- **CSP Headers**: Content Security Policy prevents XSS attacks
- **Security Headers**: HSTS, X-Frame-Options, etc.
- **HTTPS**: Enforced SSL/TLS encryption
- **Admin Protection**: Admin routes require authentication

## Monitoring & Analytics

To add analytics:

1. **Google Analytics**: Add tracking ID to index.html
2. **Netlify Analytics**: Enable in site settings
3. **Performance Monitoring**: Use Lighthouse CI

## Troubleshooting

### Build Fails
- Check Node.js version (requires 18+)
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall

### 404 Errors
- Ensure `_redirects` file is in `/public`
- Check netlify.toml configuration
- Verify SPA routing is enabled

### Contact Form Issues
- Verify Formspree endpoint in ContactSection.tsx
- Check network requests in browser dev tools
- Ensure CORS is properly configured

### Admin Panel Access
- Admin panel uses localStorage for persistence
- Clear browser storage if issues occur
- Check browser console for errors

## Support

For deployment issues:
- [Netlify Documentation](https://docs.netlify.com/)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [React Production Build](https://reactjs.org/docs/optimizing-performance.html)

## Production Checklist

- [ ] Contact form is working
- [ ] Admin panel is accessible
- [ ] All images load correctly
- [ ] Navigation works properly
- [ ] Mobile responsiveness tested
- [ ] Performance score > 90
- [ ] SEO metadata is complete
- [ ] Security headers are active
- [ ] Custom domain configured (if needed)
- [ ] SSL certificate is active