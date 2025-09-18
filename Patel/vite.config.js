import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Development server configuration
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    cors: true,
    // Add proxy configuration to handle CORS issues
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
    sourcemap: true, // Useful for debugging
    // Add rollup options for better chunking
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
    // Add PostCSS configuration if needed
    postcss: {}
  },
  
  // Environment variables configuration
  define: {
    // Only define if you need custom globals
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development')
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'axios' // Add axios since you're using it
    ],
    exclude: ['js-big-decimal']
  },
  
  // Preview server configuration (for production build preview)
  preview: {
    port: 4173,
    strictPort: true,
    host: true
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      // Add path aliases if needed
      // '@': path.resolve(__dirname, 'src')
    }
  }
})