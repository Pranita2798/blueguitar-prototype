// Throwaway working script: samples dominant + accent colours from client artwork.
// Run: node styles/palette-extract.mjs
import sharp from 'sharp';
import { readdirSync } from 'node:fs';

const dir = 'Client_Files/blue guitar';
const hex = (r, g, b) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
const sat = (r, g, b) => { const mx = Math.max(r, g, b), mn = Math.min(r, g, b); return mx === 0 ? 0 : (mx - mn) / mx; };

for (const f of readdirSync(dir).sort()) {
  const { data, info } = await sharp(`${dir}/${f}`).resize(96, 96, { fit: 'inside' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const bins = new Map();
  for (let i = 0; i < data.length; i += 3) {
    const k = [data[i], data[i + 1], data[i + 2]].map((v) => v >> 5).join(',');
    const b = bins.get(k) ?? { n: 0, r: 0, g: 0, b: 0 };
    b.n++; b.r += data[i]; b.g += data[i + 1]; b.b += data[i + 2];
    bins.set(k, b);
  }
  const all = [...bins.values()].map((b) => [Math.round(b.r / b.n), Math.round(b.g / b.n), Math.round(b.b / b.n), b.n]);
  const total = info.width * info.height;
  const dominant = all.sort((a, b) => b[3] - a[3]).slice(0, 4).map(([r, g, b, n]) => `${hex(r, g, b)} ${(100 * n / total).toFixed(0)}%`);
  const accent = all.filter(([r, g, b, n]) => n / total > 0.004 && sat(r, g, b) > 0.35)
    .sort((a, b) => b[3] * sat(b[0], b[1], b[2]) - a[3] * sat(a[0], a[1], a[2])).slice(0, 3).map(([r, g, b]) => hex(r, g, b));
  console.log(`${f}\n  dominant: ${dominant.join('  ')}\n  accent:   ${accent.join('  ')}`);
}
