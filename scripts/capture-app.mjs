// capture-app.mjs — record smooth walkthrough clips of the DEPLOYED storefront.
//
// Uses Playwright's default headless chromium (the headless shell — compliant with
// the headless-browser rule; never the desktop browser app). Records two webm clips
// and a few full-page screenshots into docs/recording/visuals/. The stitch step trims
// or loops these to each narration section's audio length.
import { chromium } from 'playwright'
import { mkdir, rename } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'docs/recording/visuals')
const BASE = process.env.APP_URL || 'https://grooveshop-nextjs.vercel.app'
const W = 1920, H = 1080

async function smoothScroll(page, ms = 9000) {
  await page.evaluate(async (dur) => {
    const max = Math.max(0, document.body.scrollHeight - window.innerHeight)
    const start = performance.now()
    await new Promise((resolve) => {
      function frame(now) {
        const t = Math.min(1, (now - start) / dur)
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
        window.scrollTo(0, max * eased)
        if (t < 1) requestAnimationFrame(frame)
        else resolve()
      }
      requestAnimationFrame(frame)
    })
  }, ms)
  await page.waitForTimeout(600)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)
}

async function record(browser, name, steps) {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, recordVideo: { dir: OUT, size: { width: W, height: H } } })
  const page = await ctx.newPage()
  await steps(page)
  const vid = page.video()
  await ctx.close() // flushes the video file
  if (vid) { await rename(await vid.path(), join(OUT, `${name}.webm`)); console.log(`  ✓ ${name}.webm`) }
}

async function run() {
  await mkdir(OUT, { recursive: true })
  const browser = await chromium.launch()

  // Clip 1 — the core flow on the live site.
  await record(browser, 'app-main', async (page) => {
    await page.goto(`${BASE}/`, { waitUntil: 'load' })
    await page.waitForTimeout(1500)
    await page.screenshot({ path: join(OUT, 'shot-home.png') })
    await smoothScroll(page, 9000)
    await page.goto(`${BASE}/products`, { waitUntil: 'load' })
    await page.waitForTimeout(1200)
    await page.screenshot({ path: join(OUT, 'shot-products.png') })
    await smoothScroll(page, 8000)
    // open the first product
    const first = page.locator('a[href*="/products/"]').first()
    if (await first.count()) { await first.click().catch(() => {}); await page.waitForTimeout(1500) }
    await page.screenshot({ path: join(OUT, 'shot-detail.png') })
    await smoothScroll(page, 6000)
    await page.goto(`${BASE}/cart`, { waitUntil: 'load' })
    await page.waitForTimeout(1500)
    await page.screenshot({ path: join(OUT, 'shot-cart.png') })
    await page.waitForTimeout(800)
  })

  // Clip 2 — the demo-match surfaces: hero, dark toggle, extra pages.
  await record(browser, 'app-tour', async (page) => {
    await page.goto(`${BASE}/`, { waitUntil: 'load' })
    await page.waitForTimeout(2000)
    // try a theme toggle if present
    const toggle = page.locator('button[aria-label*="theme" i], button[aria-label*="dark" i], button[title*="theme" i]').first()
    if (await toggle.count()) { await toggle.click().catch(() => {}); await page.waitForTimeout(1500); await page.screenshot({ path: join(OUT, 'shot-dark.png') }); await toggle.click().catch(() => {}); await page.waitForTimeout(1000) }
    await page.goto(`${BASE}/offers`, { waitUntil: 'load' })
    await page.waitForTimeout(1200); await smoothScroll(page, 6000)
    await page.goto(`${BASE}/about`, { waitUntil: 'load' })
    await page.waitForTimeout(1200); await smoothScroll(page, 6000)
    await page.goto(`${BASE}/rewards`, { waitUntil: 'load' })
    await page.waitForTimeout(1200); await smoothScroll(page, 5000)
  })

  await browser.close()
  console.log('\nDone: app clips + screenshots →', OUT)
}

run().catch((err) => { console.error(err.message || err); process.exit(1) })
