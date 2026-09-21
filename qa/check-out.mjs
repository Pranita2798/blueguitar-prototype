// Fetches every route from qa/serve-out.mjs and verifies referenced assets resolve. Usage: node qa/check-out.mjs [port]
import fs from 'node:fs';
const port = process.argv[2] || 4173;
const base = `http://localhost:${port}`;
const slugs = fs.readdirSync('out/music', { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
const routes = ['/', '/music/', '/licensing/', '/about/', ...slugs.map(s => `/music/${s}/`)];
let fail = 0;
const seen = new Set();
const bad = (m) => { fail++; console.log('FAIL', m); };
console.log('track folders:', slugs.length);
for (const r of routes) {
  const res = await fetch(base + r);
  const html = await res.text();
  if (res.status !== 200 || !html.includes('<html')) { bad(`${r} status ${res.status}`); continue; }
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1]);
  for (let u of refs) {
    if (/^(mailto:|#|data:)/.test(u)) continue;
    if (/^https?:|^\/\//.test(u)) { bad(`${r} external ref ${u}`); continue; }
    u = u.split('#')[0].split('?')[0];
    if (!u.startsWith('/')) { bad(`${r} relative ref ${u}`); continue; }
    if (seen.has(u)) continue; seen.add(u);
    const rr = await fetch(base + u);
    if (rr.status !== 200) bad(`${r} -> ${u} ${rr.status}`);
    else if (u.endsWith('.css')) {
      const css = await rr.text();
      for (const m of css.matchAll(/url\(([^)]+)\)/g)) {
        const cu = m[1].replace(/['"]/g, '');
        if (/^(data:|#)/.test(cu)) continue;
        if (/^https?:|^\/\//.test(cu)) { bad(`css ${u} external ${cu}`); continue; }
        const rc = await fetch(base + (cu.startsWith('/') ? cu : new URL(cu, base + u).pathname));
        if (rc.status !== 200) bad(`css ${u} -> ${cu} ${rc.status}`);
      }
    }
  }
}
console.log('checked assets:', seen.size, 'failures:', fail);
process.exit(fail ? 1 : 0);
