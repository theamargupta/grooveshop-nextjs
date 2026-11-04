// make-cards.mjs — render one styled 1920×1080 PNG per narration section.
//
// These are the "process" visuals (intro, build loop, model mix, coverage,
// debugging, security, close). Live-app sections are captured separately by
// capture-app.mjs. The content here is data, not decoration: every number is the
// real one from the repo's reports. Visual output is verified by eye (Rule 6: a
// rendered card has no meaningful unit assertion — the check is looking at it).
import { chromium } from 'playwright'
import { writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'docs/recording/visuals')
const W = 1920, H = 1080

const CARDS = [
  { id: '00', eyebrow: 'An honest field recording', title: 'The Agentic Journey',
    lead: 'Rebuilding a slice of the GrooveShop storefront in Next.js — the process, not just the product.',
    rows: [['Workflow', 'Opus leader + Codex lanes'], ['Discipline', 'docs → test → measure → prove'], ['Honesty', 'real numbers, real bugs']] },
  { id: '01', eyebrow: 'Decision 1 — scope', title: 'A focused, tested slice',
    lead: 'The Nuxt reference is huge. A 1:1 clone proves nothing about judgment.',
    rows: [['Reference', '613 components · 82 pages · 881 tests'], ['Built', 'core commerce flow, fully tested'], ['Data', 'mock layer from the OpenAPI schema'], ['License', 'PolyForm Strict → honest recreation, own code']] },
  { id: '02', eyebrow: 'Decision 2 — the build loop', title: 'The order is the point',
    pipeline: ['docs', 'research', 'spec', 'red test', 'code', 'gate', 'merge', 'deploy', 'verify'],
    lead: 'Enforced by hooks: no code edit until a spec and a red test exist.' },
  { id: '03', eyebrow: 'The model mix', title: 'Each model in its role',
    columns: [['Opus — leader', ['writes specs + red tests', 'reviews every change', 'merges + deploys']], ['Codex — lanes', ['write the feature code', 'file-disjoint worktrees', 'A: catalog · B: home · C: dark+wishlist']]],
    lead: 'Lanes never merge their own work. That is what makes the review real.' },
  { id: '04', eyebrow: 'Tests + coverage', title: '81 tests · 22 files',
    table: [['Statements', '87.46%', '≥ 80'], ['Branches', '88.98%', '≥ 75'], ['Functions', '80.27%', '≥ 80'], ['Lines', '87.33%', '≥ 80']],
    lead: 'Thresholds enforced in the Vitest config. Routes covered by Playwright E2E.' },
  { id: '05', eyebrow: 'Honest debugging — 1', title: 'The "OP / SM" image bug',
    rows: [['Symptom', 'blank boxes, stray letters on prod'], ['Lazy fix', 'retry / re-upload (rejected)'], ['Measured', 'curl vs browser Accept header'], ['Root cause', 'stale next/image optimizer cache'], ['Fix', 'serve own SVGs unoptimized + sandboxed CSP']],
    lead: 'The shape of a failure is not evidence of its cause. Measure first.' },
  { id: '06', eyebrow: 'Honest debugging — 2', title: 'Three test bugs, zero app bugs',
    rows: [['Lint noise', 'exclude + git-ignore the vendored reference'], ['Cart heading', 'eyebrow label, not an <h1>'], ['Address field', 'also matched "Email address" → exact'], ['Success text', 'appeared 3× → assert .first()']],
    lead: 'The tempting lie is "the app was broken and I fixed it". It was not.' },
  { id: '07', eyebrow: 'Security audit', title: '0 shipped vulnerabilities',
    table: [['X-Content-Type-Options', 'nosniff', ''], ['X-Frame-Options', 'DENY', ''], ['Referrer-Policy', 'strict-origin-when-cross-origin', ''], ['Permissions-Policy', 'camera=() mic=() geo=()', ''], ['Strict-Transport-Security', 'max-age=63072000; preload', '']],
    lead: '0 prod vulns · 16 dev-only (not shipped) · headers verified live with curl.' },
  { id: '08', eyebrow: 'Deploy + step 8', title: 'Proven on production',
    rows: [['Deploy', 'Vercel prod, confirmed by commit SHA'], ['Walk', 'home · listing · detail · cart · checkout'], ['Check', 'the effect, signed in as a user'], ['Public', 'deployment protection turned off via API']],
    lead: '"Done" means watched working in production — not "it compiled".' },
  { id: '09', eyebrow: 'The close', title: 'Trust comes from the unglamorous steps',
    rows: [['Iterated', 'dark hero → light hero matching the demo'], ['Default', 'light theme, dark on toggle'], ['Added', '7 pages: wishlist, offers, blog, rewards, about, contact, legal'], ['Evidence', 'coverage · E2E video · audit · prompts log']],
    lead: 'An AI workflow earns trust exactly when it refuses to skip docs, tests, and the production check.' },
]

const css = `
  :root { --ink:#17171A; --ink2:#1f1f24; --lime:#D6F94A; --muted:#9a9aa3; --line:#2c2c33; --text:#f4f4f6; }
  * { margin:0; box-sizing:border-box; font-family:"Manrope",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif; }
  html,body { width:${W}px; height:${H}px; }
  body { background:radial-gradient(1200px 700px at 78% -10%, #23231f 0%, var(--ink) 55%); color:var(--text);
    padding:110px 130px; display:flex; flex-direction:column; justify-content:center; overflow:hidden; }
  .eyebrow { color:var(--lime); font-weight:700; letter-spacing:.22em; text-transform:uppercase; font-size:26px; margin-bottom:26px; }
  h1 { font-size:92px; line-height:1.02; font-weight:800; letter-spacing:-.02em; max-width:1500px; }
  .lead { color:#d7d7dc; font-size:34px; line-height:1.4; margin-top:34px; max-width:1420px; font-weight:500; }
  .rows { margin-top:54px; display:flex; flex-direction:column; gap:20px; max-width:1560px; }
  .row { display:flex; gap:34px; align-items:baseline; border-top:1px solid var(--line); padding-top:20px; }
  .k { color:var(--lime); font-weight:700; font-size:30px; min-width:300px; }
  .v { color:#e7e7ec; font-size:32px; font-weight:500; }
  .pipe { margin-top:64px; display:flex; flex-wrap:wrap; gap:18px; align-items:center; }
  .step { background:var(--ink2); border:1px solid var(--line); color:var(--text); font-weight:700; font-size:34px;
    padding:20px 32px; border-radius:16px; }
  .step.hot { background:var(--lime); color:var(--ink); border-color:var(--lime); }
  .arrow { color:var(--muted); font-size:40px; }
  .cols { margin-top:56px; display:grid; grid-template-columns:1fr 1fr; gap:40px; max-width:1620px; }
  .col { background:var(--ink2); border:1px solid var(--line); border-radius:22px; padding:44px 48px; }
  .col h2 { color:var(--lime); font-size:40px; margin-bottom:28px; }
  .col li { font-size:32px; line-height:1.7; list-style:none; color:#e7e7ec; }
  .col li::before { content:"▸ "; color:var(--lime); }
  table { margin-top:52px; border-collapse:collapse; width:100%; max-width:1560px; }
  td { font-size:34px; padding:22px 10px; border-bottom:1px solid var(--line); color:#e7e7ec; }
  td.k { color:var(--lime); font-weight:700; }
  td.n { font-weight:800; color:#fff; }
  .foot { position:absolute; left:130px; bottom:70px; color:var(--muted); font-size:26px; letter-spacing:.04em; }
  .dot { color:var(--lime); }
`

function render(c) {
  let mid = ''
  if (c.pipeline) {
    const steps = c.pipeline.map((s, i) => `<span class="step${i === 3 ? ' hot' : ''}">${s}</span>`).join('<span class="arrow">→</span>')
    mid = `<div class="pipe">${steps}</div>`
  } else if (c.columns) {
    mid = `<div class="cols">${c.columns.map(([h, items]) => `<div class="col"><h2>${h}</h2><ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul></div>`).join('')}</div>`
  } else if (c.table) {
    mid = `<table>${c.table.map((r) => `<tr><td class="k">${r[0]}</td><td class="n">${r[1]}</td><td>${r[2] || ''}</td></tr>`).join('')}</table>`
  } else if (c.rows) {
    mid = `<div class="rows">${c.rows.map(([k, v]) => `<div class="row"><div class="k">${k}</div><div class="v">${v}</div></div>`).join('')}</div>`
  }
  const lead = c.lead ? `<p class="lead">${c.lead}</p>` : ''
  // lead goes above rows/table, below headline
  const body = (c.pipeline || c.columns || c.table) ? `${lead}${mid}` : `${lead}${mid}`
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head>
    <body><div class="eyebrow">${c.eyebrow}</div><h1>${c.title}</h1>${body}
    <div class="foot">GrooveShop <span class="dot">·</span> The Agentic Journey <span class="dot">·</span> ${c.id}</div></body></html>`
}

async function run() {
  await mkdir(join(OUT, 'cards'), { recursive: true })
  const browser = await chromium.launch() // default headless = headless shell (compliant)
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })
  for (const c of CARDS) {
    const html = render(c)
    const htmlPath = join(OUT, 'cards', `${c.id}.html`)
    await writeFile(htmlPath, html)
    await page.goto('file://' + htmlPath)
    await page.screenshot({ path: join(OUT, `card-${c.id}.png`) })
    console.log(`  ✓ card-${c.id}.png`)
  }
  await browser.close()
  console.log(`\nDone: ${CARDS.length} cards → ${OUT}`)
}

run().catch((err) => { console.error(err.message || err); process.exit(1) })
