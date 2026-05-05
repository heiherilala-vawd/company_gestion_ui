import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 60,
        statements: 60,
      },
      exclude: [
        'node_modules/**',
        'src/gen-ts/**',
        'src/__tests__/**',
        '**/*.d.ts',
        '**/coverage/**',
        '**/dist/**',
        '**/build/**',
        'cypress/**',
        'scripts/**',
      ],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    },
  },
})
