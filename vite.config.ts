import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Explicitly set the root to ensure proper resolution
  root: '.',
  
  resolve: {
    alias: {
      // Force all imports to use src directory
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/contexts': path.resolve(__dirname, './src/contexts'),
    },
  },
  
  css: {
    postcss: './postcss.config.js',
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
    
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      
      // Explicitly exclude problematic root files
      external: (id) => {
        // Exclude root App.tsx and root component directories
        if (id.endsWith('/App.tsx') && !id.includes('/src/')) {
          return true;
        }
        if (id.includes('/components/') && !id.includes('/src/')) {
          return true;
        }
        if (id.includes('/contexts/') && !id.includes('/src/')) {
          return true;
        }
        return false;
      },
      
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
          motion: ['framer-motion'],
        },
      },
    },
    
    chunkSizeWarningLimit: 1000,
  },
  
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  
  preview: {
    port: 4173,
    host: true,
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
    // Force exclusion of root duplicates
    exclude: ['./App.tsx', './components/*', './contexts/*'],
  },
  
  // Additional configuration to force src usage
  publicDir: 'public',
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg'],
})