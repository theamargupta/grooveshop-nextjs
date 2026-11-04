import { defineConfig } from '@playwright/test'

// E2E config. Uses Playwright's bundled headless chromium shell (no `channel` set).
// Video is always recorded — the recording is a deliverable (docs/reports/e2e-artifacts).
export default defineConfig({
  testDir: './e2e',
  outputDir: './docs/reports/e2e-artifacts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [
    ['html', { outputFolder: 'docs/reports/playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost:3100',
    video: 'on',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: { width: 1280, height: 800 },
  },
  webServer: {
    command: 'npm run build && npx next start -p 3100',
    url: 'http://localhost:3100',
    reuseExistingServer: false,
    timeout: 180_000,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
})
