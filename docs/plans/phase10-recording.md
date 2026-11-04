# Plan — Phase 10b: Agentic-journey recording (automated + ElevenLabs voice)

Decision (Amar): **fully automated screen capture + ElevenLabs AI voice** (no human voice needed).
`ELEVENLABS_API_KEY` is already set in the shell env. Target length 15–20 min.

## Assets already in hand
- Live app: https://grooveshop-nextjs.vercel.app
- E2E video: `docs/reports/e2e-video/full-purchase-flow.webm`
- Prod screenshot: `docs/reports/screenshots/prod-products.png`
- Prompts/process log: `docs/04-prompts-log.md` (the spine of the narration)

## Build order (fresh session — needs ffmpeg + screen capture)
1. **Narration script** — write `docs/recording/narration.md` section by section from the
   prompts log: the problem + scope decision; the build loop (docs→research→spec→red test→
   code→gate); the model mix (Opus specs/reviews, Codex code) with a real phase example;
   tests + 89% coverage; the E2E + the 3 honest test-bug fixes; the security audit; the
   prod deploy + the next/image SVG bug found and fixed on prod. ~2,200–2,600 words ≈ 16–18 min.
2. **Voice** — ElevenLabs TTS per section → `docs/recording/audio/NN.mp3` (script in
   `scripts/tts.mjs`, reads `ELEVENLABS_API_KEY`, never prints it).
3. **Visuals** — screen captures to match each section: the repo tree, a spec+red-test→green
   cycle, a Codex lane running, the gate output, the live app walkthrough (reuse the E2E video),
   the coverage table, the security headers curl, the Vercel deploy + live site.
4. **Stitch** — ffmpeg: concat visuals, lay the per-section audio over them, export
   `docs/recording/agentic-journey.mp4` (1080p). Keep segments aligned to the narration.
5. Verify length 15–20 min, audio synced, then link it from the README and the final email.

## Who
Opus writes the narration script (it owns the story); a Codex/Sonnet lane can wire the
`tts.mjs` + ffmpeg stitching from this plan. Screen capture is driven on the dev machine.

## Note
This is a production task (ffmpeg, TTS, screen capture), best run in a FRESH session — this
one's transcript is large. The final email (below) can go out before the video is ready, with
the video link added as a follow-up, or held until the video is done.
