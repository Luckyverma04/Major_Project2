import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Development server configuration
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    cors: true
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true, // Useful for debugging
  },
  
  // CSS configuration (only if you actually use SCSS)
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
    // Remove SCSS config if you don't have SCSS files
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: `@import "./src/styles/variables.scss";`
    //   }
    // }
  },
  
  // REMOVED: The problematic define section that was causing security warnings
  // Vite automatically handles VITE_ prefixed environment variables
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['js-big-decimal']
  }
})