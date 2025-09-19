import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Development server configuration
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'https://patelcropproducts-backend.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  
  // CSS configuration
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    // ✅ FIXED: load postcss.config.js instead of {}
    postcss: './postcss.config.js'
  },
  
  // Environment variables configuration
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'axios'
    ],
    exclude: ['js-big-decimal']
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: true,
    host: true
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, 'src')
    }
  }
})
