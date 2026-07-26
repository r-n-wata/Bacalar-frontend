/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined
          }

          if (
            id.includes('react-dom') ||
            id.includes('/react/') ||
            id.includes('scheduler')
          ) {
            return 'react-vendor'
          }

          if (id.includes('react-router')) {
            return 'router-vendor'
          }

          if (id.includes('@tanstack/react-query')) {
            return 'query-vendor'
          }

          if (
            id.includes('i18next') ||
            id.includes('react-i18next')
          ) {
            return 'i18n-vendor'
          }

          if (id.includes('@supabase/supabase-js')) {
            return 'supabase-vendor'
          }

          if (id.includes('posthog-js')) {
            return 'posthog-vendor'
          }

          return 'vendor'
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
