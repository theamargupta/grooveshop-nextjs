// stitch.mjs — assemble the narrated video from per-section audio + visuals.
//
// For each narration section NN: build a video track the exact length of audio/NN.mp3
// from one or more visuals (a styled card PNG held static, or an app/E2E clip scaled
// and trimmed/looped), mux NN.mp3 over it, then concat every section into
// docs/recording/agentic-journey.mp4 (1920×1080, H.264 + AAC).
//
// All inputs are normalized to the same codec/params so the concat demuxer is safe.
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const REC = join(ROOT, 'docs/recording')
const AUDIO = join(REC, 'audio')
const VIS = join(REC, 'visuals')
const TMP = join(REC, 'visuals', '_segments')
const OUT = join(REC, 'agentic-journey.mp4')
const W = 1920, H = 1080, FPS = 25

// Each section → ordered list of visuals, so no single card sits on screen too
// long (a cut every ~15-20s keeps it moving). Cards are stills with a slow Ken
// Burns zoom; .webm are live-app / E2E motion. Crisp cut: 6 sections, ~4 min.
const E2E = join(ROOT, 'docs/reports/e2e-video/full-purchase-flow.webm')
const appMain = { video: join(VIS, 'app-main.webm') }
const appTour = { video: join(VIS, 'app-tour.webm') }
const SECTIONS = {
  '00': [card('00'), appMain],                       // pitch: title → live app b-roll
  '01': [card('01'), card('02')],                    // scope card → the build-loop pipeline
  '02': [card('03'), appMain],                       // model mix → merged app b-roll
  '03': [card('04'), { video: E2E }, card('05')],    // coverage → E2E flow → the image bug
  '04': [card('07'), appMain],                        // security → driving the live app
  '05': [appTour, card('09')],                        // demo-match tour → closing card
}
function card(id) { return { image: join(VIS, `card-${id}.png`) } }

function ff(args) { execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: 'inherit' }) }
function probeDur(file) {
  const out = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString().trim()
  return parseFloat(out)
}

const SCALE = `scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:color=0x17171A,setsar=1,format=yuv420p`

function buildStill(img, dur, out) {
  // Static card, encoded fast. Engagement comes from short narration + frequent cuts
  // (2-3 visuals per section) + live-app b-roll, not per-frame zoom (zoompan was too slow).
  ff(['-loop', '1', '-t', dur.toFixed(3), '-i', img, '-r', String(FPS),
    '-vf', `scale=${W}:${H},format=yuv420p`, '-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', out])
}
function buildClip(video, dur, out) {
  // loop the source if shorter than dur, then trim to exactly dur
  ff(['-stream_loop', '-1', '-i', video, '-t', dur.toFixed(3), '-an', '-r', String(FPS),
    '-vf', SCALE, '-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', out])
}

function concatList(files, out, copy = true) {
  const list = join(TMP, `list-${Math.random().toString(36).slice(2)}.txt`)
  writeFileSync(list, files.map((f) => `file '${f.replace(/'/g, "'\\''")}'`).join('\n'))
  const codec = copy ? ['-c', 'copy'] : ['-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-ar', '44100']
  ff(['-f', 'concat', '-safe', '0', '-i', list, ...codec, out])
}

function run() {
  if (!existsSync(E2E)) throw new Error(`missing E2E video: ${E2E}`)
  rmSync(TMP, { recursive: true, force: true })
  mkdirSync(TMP, { recursive: true })
  const ids = Object.keys(SECTIONS).sort()
  const sectionFiles = []

  for (const id of ids) {
    const audio = join(AUDIO, `${id}.mp3`)
    if (!existsSync(audio)) throw new Error(`missing audio for section ${id}: ${audio}`)
    const dur = probeDur(audio)
    const visuals = SECTIONS[id]
    const per = dur / visuals.length
    // build each visual segment
    const segs = []
    visuals.forEach((v, i) => {
      const seg = join(TMP, `seg-${id}-${i}.mp4`)
      if (v.image) {
        if (!existsSync(v.image)) throw new Error(`missing card: ${v.image}`)
        buildStill(v.image, per, seg)
      } else {
        if (!existsSync(v.video)) throw new Error(`missing clip: ${v.video}`)
        buildClip(v.video, per, seg)
      }
      segs.push(seg)
    })
    // concat segments (video only), then mux the section audio
    const vtrack = join(TMP, `vtrack-${id}.mp4`)
    if (segs.length === 1) execFileSync('cp', [segs[0], vtrack])
    else concatList(segs, vtrack, true)
    const sect = join(TMP, `section-${id}.mp4`)
    ff(['-i', vtrack, '-i', audio, '-map', '0:v:0', '-map', '1:a:0',
      '-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p',
      '-c:a', 'aac', '-b:a', '192k', '-ar', '44100', '-shortest', sect])
    sectionFiles.push(sect)
    console.log(`  ✓ section ${id} — ${dur.toFixed(1)}s, ${visuals.length} visual(s)`)
  }

  // final concat (re-encode once for uniform timebase safety)
  concatList(sectionFiles, OUT, false)
  const total = probeDur(OUT)
  console.log(`\nDone: ${OUT}`)
  console.log(`Total: ${total.toFixed(1)}s = ${(total / 60).toFixed(1)} min`)
  rmSync(TMP, { recursive: true, force: true })
}

run()
