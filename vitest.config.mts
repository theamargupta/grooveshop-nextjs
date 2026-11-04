// Vitest config for Next.js 16 App Router + React 19.
// Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/testing/vitest.mdx
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    // setupFiles added in the phase that introduces the first component test (needs jest-dom).
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      reportsDirectory: './docs/reports/coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.{test,spec}.{ts,tsx}', 'src/**/*.d.ts', 'src/app/layout.tsx'],
    },
  },
})
