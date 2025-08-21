import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // Development server configuration
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      // Proxy API requests to your Node.js backend
      '/api': {
        target: 'http://localhost:5000', // Your Node.js backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
      '/health': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    },
    cors: true
  },

  // Build configuration
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true, // Useful for debugging
  },

  // Global CSS/SCSS configuration
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  },

  // Environment variables
  define: {
    'process.env': process.env
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['js-big-decimal']
  }
});