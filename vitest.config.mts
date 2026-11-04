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
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      reportsDirectory: './docs/reports/coverage',
      // Unit coverage targets the unit-testable surface: pure logic + presentational/client
      // components. Route files under src/app/** are Server/Client *pages* exercised by the
      // Playwright E2E suite (Phase 7), not by unit tests, so they are excluded here to keep
      // this number honest rather than inflated/deflated by integration-only code.
      include: ['src/lib/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}'],
      exclude: ['src/**/*.{test,spec}.{ts,tsx}', 'src/**/*.d.ts'],
      thresholds: { statements: 80, branches: 75, functions: 80, lines: 80 },
    },
  },
})
