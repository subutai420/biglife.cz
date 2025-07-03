import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/contexts': path.resolve(__dirname, './src/contexts'),
      '@/styles': path.resolve(__dirname, './src/styles'),
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
  },
  
  publicDir: 'public',
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg'],
})