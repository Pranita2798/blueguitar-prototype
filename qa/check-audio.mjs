// Validates published audio: mp3 header sanity, approx duration, and that no client master was published.
// Usage: node qa/check-audio.mjs   (run from project root, after build)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const BR = { 3: [0,32,40,48,56,64,80,96,112,128,160,192,224,256,320], 2: [0,8,16,24,32,40,48,56,64,80,96,112,128,144,160] };
const SR = { 3: [44100,48000,32000], 2: [22050,24000,16000] };
let fail = 0;
const bad = (m) => { fail++; console.log('FAIL', m); };
const walk = (d) => fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]) : [];
const hash = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');

function probe(f) {
  const b = fs.readFileSync(f);
  let o = 0;
  if (b.toString('latin1', 0, 3) === 'ID3') o = 10 + ((b[6] << 21) | (b[7] << 14) | (b[8] << 7) | b[9]);
  while (o < b.length - 4 && !(b[o] === 0xff && (b[o + 1] & 0xe0) === 0xe0 && (b[o + 1] & 0x06) === 0x02)) o++;
  if (o >= b.length - 4) return null;
  const ver = (b[o + 1] >> 3) & 3, bi = b[o + 2] >> 4, si = (b[o + 2] >> 2) & 3;
  const mpeg = ver === 3 ? 3 : 2;
  const kbps = BR[mpeg][bi];
  if (!kbps || si > 2) return null;
  const xing = b.indexOf('Xing', o) > 0 && b.indexOf('Xing', o) < o + 60 ? 'VBR(Xing)' : b.indexOf('Info', o) > 0 && b.indexOf('Info', o) < o + 60 ? 'CBR(Info)' : 'CBR?';
  return { kbps, hz: SR[mpeg][si], secs: ((b.length - o) * 8) / (kbps * 1000), tag: xing, size: b.length };
}

const pubs = [...walk('public/audio'), ...walk('out/audio')];
console.log('audio files:', pubs.length);
for (const f of pubs) {
  const ext = path.extname(f).toLowerCase();
  if (ext === '.wav') { bad(`${f} silent placeholder / wav still present`); continue; }
  if (!/^[a-z0-9._\/-]+$/.test(f)) bad(`${f} not a clean slug name`);
  const p = probe(f);
  if (!p) { bad(`${f} no valid mp3 frame header`); continue; }
  const ok = p.secs >= 25 && p.secs <= 35;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${f} ${p.kbps}kbps ${p.hz}Hz ~${p.secs.toFixed(1)}s ${p.tag} ${p.size}B`);
  if (!ok) bad(`${f} duration ~${p.secs.toFixed(1)}s not ~30s`);
}
const masters = walk('Client_Files/music').filter(f => f.endsWith('.mp3') && !f.includes('30 Second Preview'));
const mh = new Set(masters.map(hash));
const msz = new Set(masters.map(f => fs.statSync(f).size));
for (const f of [...walk('public'), ...walk('out')]) {
  if (mh.has(hash(f))) bad(`${f} is byte-identical to a client MASTER`);
  else if (f.endsWith('.mp3') && msz.has(fs.statSync(f).size)) bad(`${f} same size as a master`);
  if (/\.(mp3|wav|flac|aac|ogg|m4a)$/i.test(f) && fs.statSync(f).size > 2_000_000) bad(`${f} larger than 2 MB`);
}
console.log('masters checked against:', masters.length, 'failures:', fail);
process.exit(fail ? 1 : 0);
