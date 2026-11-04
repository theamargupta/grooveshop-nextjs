// Build-tool tests for tts.mjs pure helpers. Run: node --test scripts/tts.test.mjs
// Kept out of the app's vitest/coverage surface on purpose — these cover a build
// script, not shipped app code.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseSections, chunkText, assertApiKey, filterSections } from './tts.mjs'

const SAMPLE = `# Narration

Top note that must be ignored (before the first section).

## 00 — Intro

First section body. It has two sentences.

## 01 — The build loop

Second section body here.
`

test('parseSections ignores the preamble and returns one entry per section', () => {
  const s = parseSections(SAMPLE)
  assert.equal(s.length, 2)
  assert.equal(s[0].id, '00')
  assert.equal(s[1].id, '01')
})

test('parseSections keeps the title and strips the heading from the text', () => {
  const s = parseSections(SAMPLE)
  assert.equal(s[0].title, 'Intro')
  assert.ok(s[0].text.includes('First section body'))
  assert.ok(!s[0].text.includes('## 00'))
  assert.ok(!s[0].text.includes('Top note'))
})

test('chunkText returns a single chunk when under the limit', () => {
  const chunks = chunkText('Short sentence one. Short sentence two.', 1000)
  assert.equal(chunks.length, 1)
})

test('chunkText splits on sentence boundaries and preserves every word', () => {
  const text = 'Alpha bravo charlie. Delta echo foxtrot. Golf hotel india.'
  const chunks = chunkText(text, 25)
  assert.ok(chunks.length >= 2)
  for (const c of chunks) assert.ok(c.length <= 25, `chunk too long: "${c}"`)
  const rejoinedWords = chunks.join(' ').split(/\s+/).sort().join(' ')
  const originalWords = text.split(/\s+/).sort().join(' ')
  assert.equal(rejoinedWords, originalWords)
})

test('filterSections keeps only requested ids and zero-pads numeric input', () => {
  const s = parseSections(SAMPLE)
  assert.equal(filterSections(s, []).length, 2) // empty => all
  const one = filterSections(s, [1])
  assert.equal(one.length, 1)
  assert.equal(one[0].id, '01')
})

test('assertApiKey throws a clear error when the key is missing', () => {
  assert.throws(() => assertApiKey({}), /ELEVENLABS_API_KEY/)
  assert.doesNotThrow(() => assertApiKey({ ELEVENLABS_API_KEY: 'x'.repeat(40) }))
})
