# Spec — Agentic-journey recording

## What it is
A 15–18 minute narrated video that tells the honest story of how this GrooveShop
Next.js take-home was built with an agentic workflow (Opus leader + Codex lanes),
with an ElevenLabs AI voice and screen visuals. Output: `docs/recording/agentic-journey.mp4`
(1080p, H.264 + AAC).

## What it does
- Narrates the real build arc in ~2,300–2,600 words across numbered sections:
  problem/scope, the build loop, the model mix, tests + coverage, honest debugging
  beats, security audit, prod deploy + step-8 proof, the demo-match iteration.
- One voice track per section (`docs/recording/audio/NN.mp3`), synced to a visual
  per section (a live-app scroll clip, a styled process card, or the real E2E webm).
- Every number and bug it names is pulled from the repo's own reports — no invented
  metrics, no invented bugs.

## What it refuses to do
- **No invented facts.** Counts (42 products, 64 tests/16 files, 89% coverage,
  0 prod vulns, 5 headers) come from `docs/reports/**` and `vitest list`, verified
  before narration is written. A claim that cannot be verified is cut, not softened.
- **No secret leakage.** `scripts/tts.mjs` reads `ELEVENLABS_API_KEY` from the env
  and never prints, logs, or echoes it. A test asserts the source contains no
  `console.log` of the key and no key literal.
- **No overclaiming the license.** The reference is PolyForm Strict, so the video
  states this is an honest *recreation* with our own code + royalty-free images.
- **No real-Chrome automation.** Live-app visuals use Playwright's bundled headless
  chromium shell (the repo's E2E convention), never Google Chrome.app.

## Sections (the spine)
`00` intro · `01` problem+scope · `02` build loop · `03` model mix · `04` tests+coverage
· `05` honest debugging beats · `06` security · `07` prod deploy + step-8 · `08`
demo-match iteration · `09` close. Headings in `narration.md` are `## NN — Title`;
the body under each is the exact spoken text (plain prose, no markdown read aloud).

## Pipeline (reproducible)
1. `narration.md` — the script (this phase; written by the leader).
2. `scripts/tts.mjs` — per-section ElevenLabs TTS → `audio/NN.mp3`. Picks a narration
   voice from `/v1/voices`, model `eleven_multilingual_v2`, chunks any section over
   the per-request char limit, retries on transient failure (no silent swallow).
3. `scripts/capture-visuals.mjs` — Playwright scroll clips of the deployed pages +
   `scripts/make-cards.mjs` renders styled HTML process cards to PNG. Reuses
   `docs/reports/e2e-video/full-purchase-flow.webm` for the purchase section.
4. `scripts/stitch.mjs` — per section, build a clip the length of its `NN.mp3`
   (Ken Burns on a still, or the scroll clip / webm trimmed), mux the audio, then
   concat all sections → `agentic-journey.mp4` at 1920×1080.
5. Verify total duration is 15–18 min; link from `README.md` + the submission email.

## Failure handling (Rule 5)
- Missing `ELEVENLABS_API_KEY` → exit 1 with a clear message, before any HTTP call.
- A non-2xx TTS response → print status + body (never the key), retry up to 3×, then
  fail that section loudly; the run reports which sections are missing audio.
- A missing audio file at stitch time → that section fails the stitch with its number
  named, not a silent gap.
- Deployed page unreachable during capture → fail that capture with the URL named.

## Artifacts not committed
`docs/recording/audio/*.mp3`, `docs/recording/visuals/*`, and `agentic-journey.mp4`
are build outputs (large/binary); they are git-ignored. Committed: `narration.md`,
the `scripts/*.mjs`, this spec, and the README link.
