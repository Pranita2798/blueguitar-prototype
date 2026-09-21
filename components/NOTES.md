# Working notes (design-dev)

## HeroLights (v3)
- components/HeroLights.tsx + `.hl-*` keyframes at the end of app/globals.css. Rendered by Hero above LitRoom (-z-5), under content (z-10). Not used in PageHeader.
- Layer: 3 spotlight beams (rotate, 15/18/22s alternate, staggered negative delays), 11 bokeh (translate/scale/opacity drift, 19 to 40s; 2 amber), a glint sweep every 11s, faint vertical streaks (opacity), soft radial darkening behind the text.
- Only `rotate`, `translate`, `scale`, `opacity` are animated. Reduced motion: `animation: none` on all layers (static composition).
- Mobile: 1 beam hidden, 5 bokeh hidden, remaining bokeh at 60% size.
- Amber #f8b643 sampled from public/images/hero/hero.jpg (mean of amber bokeh pixels).
- STATUS: tsc clean. NOT visually verified: the dev server on :3000 was serving stale output (no hl-* markup in the DOM after touching files), and starting a second dev server was denied.

## BlendedPhoto: outside edit reviewed (2026-09-21)
- While design-dev was down, another Claude session added the `position` prop (object-position passthrough) and `fade="edges"` at 15:04. Reviewed by the replacement design-dev: tokens only (no hex), soft/strong unchanged, `edges` fades to transparent on all four sides (no hard rectangle).
- `edges` mask: sides 7%, top 5%, bottom fades from 72% of the height. The lead kept the long bottom fade on purpose (it melts THE STORY into the band; the faces sit high in the frame, see docs/reference/v2-review/w5-bands-crop.png). Not a thin border: README documents it accurately. Faces low in frame would need `position` or another fade.
- The current out/ (rebuilt by the lead at 15:28) DOES include these edits.
- README.md BlendedPhoto row updated to document `position` and `edges`.

## Preview fades (PlayerProvider)
- Implemented rAF volume ramps (see README "Preview fades"). tsc clean, `npm run build` succeeded. NOT listened to or browser-tested; verify by ear: fade in, pause fade, switch, end fade, seek back out of end zone.
- iOS Safari ignores audio.volume; no workaround wanted (lead's decision).
