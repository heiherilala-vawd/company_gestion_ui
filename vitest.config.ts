import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/unit/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/gen-ts/**',
        'src/__tests__/**',
        'node_modules/**',
        '**/*.d.ts',
        '**/coverage/**',
        '**/dist/**',
        'scripts/**',
        '**/*.test.{ts,tsx}',
      ],
    },
  },
})
