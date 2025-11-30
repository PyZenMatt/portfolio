import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Disable sourcemaps in production/test to reduce memory usage
    sourcemap: false,
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
})
