import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '',
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
  build: {
    // Vite 8 / Rolldown: object-form manualChunks was removed.
    // Keep React vendor code in a dedicated chunk via codeSplitting groups.
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
