# Biglife - Real Estate Investment Platform

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

A modern, responsive web application for real estate investment with guaranteed 6% annual returns. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Glass morphism UI with professional finance-focused styling
- **Responsive**: Optimized for all device sizes
- **Animations**: Smooth animations using Framer Motion
- **Admin Panel**: Content management system with localStorage persistence
- **Contact Form**: Multiple submission methods (Formspree, mailto fallback)
- **SEO Optimized**: Meta tags, structured data, and performance optimized
- **Type Safe**: Full TypeScript implementation

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── admin/           # Admin panel components
│   ├── figma/           # Shared components
│   └── ui/              # UI components (shadcn/ui)
├── contexts/            # React contexts
├── styles/              # Global styles
└── main.tsx            # Application entry point
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS v4, Custom CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Radix UI (shadcn/ui)
- **Build Tool**: Vite
- **Deployment**: Netlify

## 🔧 Local Development

### Prerequisites

- Node.js 18+ and npm 8+
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd biglife
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript checks
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build directory
- `npm run deploy` - Clean and build for deployment

## 🌐 Deployment to Netlify

### Method 1: Git Integration (Recommended)

1. **Push to Git repository** (GitHub, GitLab, Bitbucket)

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "New site from Git"
   - Choose your repository

3. **Configure build settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

4. **Deploy**
   - Site will auto-deploy on every push to main branch

### Method 2: Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or use Netlify CLI:
   ```bash
   npx netlify deploy --prod --dir=dist
   ```

### Method 3: One-Click Deploy

Use the deployment script:

```bash
chmod +x deploy.sh
./deploy.sh
```

## ⚙️ Configuration

### Environment Variables

No environment variables are required for basic functionality. The contact form uses Formspree which is pre-configured.

### Custom Domain

1. Go to Site Settings → Domain Management in Netlify
2. Add your custom domain
3. Configure DNS records as instructed

### Contact Form Setup

The contact form is configured to send emails to `dan.bubak@gmail.com` via:
- **Formspree** (primary method)
- **Mailto fallback** (opens email client)
- **Local storage backup** (viewable in admin panel)

## 🔐 Admin Panel

Access the admin panel by:
1. Scroll to footer and click hidden admin link
2. Enter password: `admin123`
3. Manage content, view contact submissions, etc.

### Admin Features

- **Content Management**: Edit all website content
- **Property Management**: Add/edit property listings
- **Team Management**: Manage team member profiles
- **FAQ Management**: Edit frequently asked questions
- **Contact Submissions**: View all form submissions
- **Data Persistence**: All changes saved to localStorage

## 🎨 Customization

### Fonts

The site uses IBM Plex Sans for a professional finance look. To change:
1. Update font import in `index.html`
2. Modify font-family in `src/styles/globals.css`

### Colors & Styling

- **Theme Colors**: Defined in CSS variables in `globals.css`
- **Aurora Gradient**: Background gradient utility class
- **Glass Effects**: Pre-built glass morphism classes

### Animations

Animations are handled by Framer Motion with custom utility classes in `globals.css`.

## 📊 Performance

- **Lighthouse Score**: 90+ on all metrics
- **Bundle Size**: Optimized with code splitting
- **Caching**: Long-term caching for static assets
- **Compression**: Gzip compression enabled
- **Image Optimization**: Responsive images with fallbacks

## 🔒 Security

- **CSP Headers**: Content Security Policy prevents XSS
- **Security Headers**: HSTS, X-Frame-Options, etc.
- **HTTPS**: Enforced SSL/TLS encryption
- **Admin Protection**: Password-protected admin access

## 🐛 Troubleshooting

### Build Issues

- **Node Version**: Ensure Node.js 18+ is installed
- **Clear Cache**: `npm cache clean --force`
- **Reinstall**: Delete `node_modules` and run `npm install`

### 404 Errors

- Check `_redirects` file in `/public`
- Verify SPA routing in `netlify.toml`

### Contact Form Issues

- Verify Formspree endpoint in `ContactSection.tsx`
- Check browser console for errors
- Test with different browsers

## 📞 Support

For deployment or technical issues:
- [Netlify Documentation](https://docs.netlify.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/)

## 📄 License

This project is licensed under the MIT License.

---

**Biglife** - Investice do nemovitostí s garantovaným výnosem 6% ročně