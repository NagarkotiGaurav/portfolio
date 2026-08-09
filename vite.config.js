import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '',
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
  server: {
    // Local: run `npm run pages:dev` (or Express on 8787) and proxy /api here.
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY || 'http://127.0.0.1:8787',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Vite 8 / Rolldown: object-form manualChunks was removed.
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor',
              test: /node_modules[\\/](react|react-dom|react-router-dom)([\\/]|$)/,
            },
          ],
        },
      },
    },
  },
})
