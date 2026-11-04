// tts.mjs — ElevenLabs text-to-speech for the agentic-journey narration.
//
// Reads docs/recording/narration.md, synthesizes one MP3 per `## NN — Title`
// section into docs/recording/audio/NN.mp3, and writes a manifest.json.
//
// SECURITY: ELEVENLABS_API_KEY is read from the env and is NEVER printed, logged,
// or interpolated into any message. Errors print the HTTP status + body only.
//
// Docs (verified 2026-11-04): POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}
// with header `xi-api-key`, body { text, model_id, voice_settings }. Model
// eleven_multilingual_v2 is the high-quality long-form model. Per-request text over
// ~5000 chars fails with text_too_long, so sections are chunked below that.
// Voices: GET /v1/voices.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const API = 'https://api.elevenlabs.io/v1'
const MODEL = 'eleven_multilingual_v2'
const MAX_CHARS = 4500 // under the ~5000 text_too_long limit, with headroom
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const NARRATION = join(ROOT, 'docs/recording/narration.md')
const OUT_DIR = join(ROOT, 'docs/recording/audio')

/** Keep only the sections whose id is in `only` (empty => all). */
export function filterSections(sections, only) {
  if (!only || !only.length) return sections
  const want = new Set(only.map((x) => String(x).padStart(2, '0')))
  return sections.filter((s) => want.has(s.id))
}

/** Parse narration.md into [{ id, title, text }], ignoring the preamble. */
export function parseSections(md) {
  const lines = md.split('\n')
  const sections = []
  let cur = null
  for (const line of lines) {
    const m = line.match(/^##\s+(\d{2})\s+[—-]\s+(.+?)\s*$/)
    if (m) {
      if (cur) sections.push(cur)
      cur = { id: m[1], title: m[2].trim(), text: '' }
    } else if (cur) {
      cur.text += line + '\n'
    }
  }
  if (cur) sections.push(cur)
  return sections.map((s) => ({ ...s, text: s.text.trim() }))
}

/** Split text into chunks <= max chars, preferring sentence boundaries. */
export function chunkText(text, max) {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return [clean]
  const sentences = clean.match(/[^.!?]+[.!?]+|\S+$/g) || [clean]
  const chunks = []
  let buf = ''
  for (const s of sentences) {
    const piece = s.trim()
    if (!piece) continue
    if (piece.length > max) {
      // Hard-split an over-long sentence on spaces.
      if (buf) { chunks.push(buf.trim()); buf = '' }
      const words = piece.split(' ')
      for (const w of words) {
        if ((buf + ' ' + w).trim().length > max) { chunks.push(buf.trim()); buf = w }
        else buf = (buf + ' ' + w).trim()
      }
      continue
    }
    if ((buf + ' ' + piece).trim().length > max) { chunks.push(buf.trim()); buf = piece }
    else buf = (buf + ' ' + piece).trim()
  }
  if (buf.trim()) chunks.push(buf.trim())
  return chunks
}

/** Throw a clear error when the API key is absent. */
export function assertApiKey(env) {
  const key = env.ELEVENLABS_API_KEY
  if (!key || key.length < 20) {
    throw new Error('ELEVENLABS_API_KEY is missing from the environment (set it, then re-run).')
  }
  return key
}

async function pickVoiceId(key) {
  if (process.env.ELEVENLABS_VOICE_ID) return process.env.ELEVENLABS_VOICE_ID
  const res = await fetch(`${API}/voices`, { headers: { 'xi-api-key': key } })
  if (!res.ok) throw new Error(`GET /voices failed: ${res.status} ${await res.text()}`)
  const { voices = [] } = await res.json()
  // Prefer a clear professional narration voice if the account has one.
  const preferred = ['Brian', 'Adam', 'Daniel', 'Rachel', 'Sarah', 'Charlotte', 'George']
  for (const name of preferred) {
    const hit = voices.find((v) => (v.name || '').toLowerCase() === name.toLowerCase())
    if (hit) return hit.voice_id
  }
  if (!voices.length) throw new Error('No voices available on this ElevenLabs account.')
  return voices[0].voice_id
}

async function synthChunk(key, voiceId, text, attempt = 1) {
  const res = await fetch(`${API}/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: { 'xi-api-key': key, 'content-type': 'application/json' },
    body: JSON.stringify({
      text,
      model_id: MODEL,
      voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.0, use_speaker_boost: true },
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    if (attempt < 3 && (res.status >= 500 || res.status === 429)) {
      await new Promise((r) => setTimeout(r, 1500 * attempt))
      return synthChunk(key, voiceId, text, attempt + 1)
    }
    throw new Error(`TTS failed (${res.status}) after ${attempt} attempt(s): ${body}`)
  }
  return Buffer.from(await res.arrayBuffer())
}

async function main() {
  const key = assertApiKey(process.env)
  const md = await readFile(NARRATION, 'utf8')
  const only = process.argv.slice(2).filter((a) => /^\d{1,2}$/.test(a))
  const sections = filterSections(parseSections(md), only)
  if (!sections.length) throw new Error(`No sections parsed from ${NARRATION}`)
  if (only.length) console.log(`(regenerating only: ${only.join(', ')})`)
  await mkdir(OUT_DIR, { recursive: true })
  const voiceId = await pickVoiceId(key)
  console.log(`voice: ${voiceId} · model: ${MODEL} · sections: ${sections.length}`)

  const manifest = []
  const failures = []
  for (const s of sections) {
    const chunks = chunkText(s.text, MAX_CHARS)
    try {
      const buffers = []
      for (const c of chunks) buffers.push(await synthChunk(key, voiceId, c))
      const mp3 = Buffer.concat(buffers)
      const file = join(OUT_DIR, `${s.id}.mp3`)
      await writeFile(file, mp3)
      manifest.push({ id: s.id, title: s.title, chars: s.text.length, chunks: chunks.length, bytes: mp3.length })
      console.log(`  ✓ ${s.id} ${s.title} — ${s.text.length} chars, ${mp3.length} bytes`)
    } catch (err) {
      failures.push({ id: s.id, error: String(err.message || err) })
      console.error(`  ✗ ${s.id} ${s.title} — ${err.message || err}`)
    }
  }
  await writeFile(join(OUT_DIR, 'manifest.json'), JSON.stringify({ voiceId, model: MODEL, manifest, failures }, null, 2))
  if (failures.length) {
    console.error(`\n${failures.length} section(s) failed. Audio for them is missing.`)
    process.exit(1)
  }
  console.log(`\nDone: ${manifest.length} section(s) → ${OUT_DIR}`)
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  main().catch((err) => { console.error(err.message || err); process.exit(1) })
}
