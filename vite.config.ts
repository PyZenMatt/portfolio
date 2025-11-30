import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Bundle analyzer - generates stats.html when ANALYZE=true
    mode === 'analyze' && visualizer({
      filename: 'stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  // Performance optimizations - Issue 13.3.10
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
  build: {
    // Disable sourcemaps in production/test to reduce memory usage
    sourcemap: false,
    // Modern target for smaller bundle
    target: 'es2020',
    // Enable CSS minification
    cssMinify: true,
    // Warn if chunk exceeds 600KB
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'motion': ['framer-motion'],
          'query': ['@tanstack/react-query'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    // Performance optimizations - Issue 13.3.9
    // Limit workers to prevent CPU saturation
    maxWorkers: 2,
    // JSDOM lightweight configuration
    environmentOptions: {
      jsdom: {
        pretendToBeVisual: true,
        resources: 'usable',
      },
    },
  },
}))
