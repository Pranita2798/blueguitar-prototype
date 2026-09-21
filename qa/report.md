# QA report: blueguitar.art static prototype (v2 redesign)

Status: ALL CHECKS PASS (final v3 state, latest verified build: 2026-09-21 15:48). Manual live checks listed below remain for a human.
Run environment: WSL Ubuntu, Node v24.21.0, npm 11.19.0, Next 16.3.5. Scripts: `qa/serve-out.mjs`, `qa/check-out.mjs`.

| # | Check | Result | Evidence |
| :-- | :-- | :-- | :-- |
| 1 | `tsc --noEmit`, `npm run build` (16 pages), out/ served by plain Node server, 14 routes 200 | PASS | 40 unique assets incl. fonts, 0 failures |
| 2 | Routes + 10 track folders; no root `app/page.tsx`; `dynamicParams=false` (`app/(site)/music/[slug]/page.tsx:6`) | PASS | |
| 3 | Assets/CSS/audio resolve; preview WAV valid (unchanged, mono 8 kHz 16-bit, 3 s) | PASS | lazy image srcs all resolve |
| 4 | Player in root layout inside `PlayerProvider`; internal links use next/link (`components/Pill.tsx:23` routes `/` hrefs through Link; the `<a>` branch is only mailto/http/#) | PASS | |
| 5 | Licensing filter logic mood/genre/tempo (`CatalogueFilter.tsx:30-40`) | PASS (code) | |
| 5 | Buy button `disabled`, reads "Purchasing coming soon" (`music/[slug]/page.tsx:42`), 10/10 pages | PASS | wording is "Purchasing coming soon", not "is coming soon"; same meaning |
| 5 | Enquiry is mailto; neither `<form>` posts (`EmailCapture.tsx:23`, `FilterControls.tsx:24` preventDefault, no action) | PASS | |
| 5 (d) | Email capture: "Prototype" badge (`EmailCapture.tsx:43`) and "Nothing was sent" on submit (`:44`) | PASS | |
| 6 | Scope: no app/api, route.ts, 'use server', DB/auth/Stripe/analytics, `.env*`, `fetch(`; no external src/href in out/ | PASS | |
| 7 | Content model unchanged and re-verified: 3 artists, 10 tracks, durations, artist mapping, album 1-9 only, releaseDate null, no "Roberrt" | PASS | |
| 8 | Ownership wording: only "sole writer, producer and rights holder on his own recordings" with per-track details on enquiry (`licensing/page.tsx:22`, `page.tsx:56`); no blanket claims; track 10 note collaboration only | PASS | client sign-off still required |
| 9 | Design tokens: no hex in tsx; `rgb(0 0 0 / a)` and `rgb(255 255 255 / a)` neutral shading in `components/Vinyl.tsx:28,39` (black/white alpha, not palette colours) | PASS with note | |
| 9 | Stale v1 tokens with no v2 definition, silently emit no CSS: `licensing/page.tsx:28` `border-line`, `music/[slug]/page.tsx:24` `bg-ink`, `:43` `border-line`, `_components/CatalogueFilter.tsx:50` `divide-line` | FAIL, now FIXED and re-verified (`border-white/30`, `divide-white/30`, `bg-midnight`) | grep shows no v1 tokens left |
| 9 | `components/README.md:57` hero clamp differs from `app/globals.css` | minor, FIXED and re-verified | |
| 9 | Player keyboard operable and aria-labelled; all images have alt (only decorative `alt=""` is the player thumbnail `PlayerBar.tsx:26`) | PASS | |
| v2a | Hero sleeve: `hero.jpg` in a `aspect-[4/5]` container with `object-cover object-top` (`components/Sleeve.tsx:23-26`), so the face is not cropped | PASS (code) | renders confirm full face at 375/768/1280/1920: `v2-review/r4-home-375.png`, `r3-home-768.png`, `r4-home-1280.png`, `r3-home-1920.png` |
| v2b | Fonts only via next/font (`app/layout.tsx:3` Bodoni Moda + Jost), 7 woff2 in `out/_next/static/media`, no fonts.googleapis/gstatic in out/ | PASS | |
| v2c | No horizontal overflow risk at 375: bands, hero, page header, feature band, sleeve and vinyl containers use `overflow-hidden`; sleeve+vinyl group is percent-sized within its container; display sizes are `clamp()` with vw | PASS (code) | `r4-home-375.png` shows no overflow |
| v2e | Every v2 token hex has a source file in `components/README.md` and matches `app/globals.css` | PASS | electric #1148de, electric-bright #056fed, electric-deep #19449a, midnight #05112b, midnight-deep #040817, night #09092e |
| - | Test harness moved out of components/ | PASS | deleted by design-dev; `styles/` holds only palette-extract.mjs |

## Live checks still needing a human (code inspection only)
1. Start a preview on /music, then navigate to /licensing, a track page and /about: the bar and playback state must persist.
2. /licensing filters: each mood, genre, tempo band, combinations, Reset; "N tracks shown" updates; empty state text.
3. Keyboard-only tab through header, preview buttons, player, filters and email form; focus visible.
4. Email form submit shows "Nothing was sent".
5. Mailto links open a mail client.

Capture artifact, not a defect: in a JS-enabled headless-Chrome still at 375 (`w5-375-news.png`) the newsletter heading looks half-faded and the form is missing, but the same crop with JavaScript disabled (`w5-375-news-nojs.png`) renders the band completely (both heading lines, input, checkbox, Submit, prototype badge). Headless Chrome's virtual time does not advance CSS transitions, so Reveal elements are frozen in their start state in stills; the vinyl spin cannot be seen in stills for the same reason. A human in a real browser should see the reveal complete on scroll.

## Hero lights re-check (2026-09-19, out/ built 00:22:41)

| Check | Result | Evidence |
| :-- | :-- | :-- |
| tsc clean; all 14 routes and 40 assets serve, no server needed | PASS | exit 0, 0 failures |
| HeroLights is hero-only | PASS | rendered only from `components/Hero.tsx:20`; present in out/index.html only |
| aria-hidden, pointer-events-none, overflow clipped | PASS | `components/HeroLights.tsx` wrapper has `aria-hidden`, `pointer-events-none`, `overflow-hidden`, inset 8% inside a hero section that is itself `overflow-hidden` (`Hero.tsx:18`); 375px renders show no overflow |
| Animation is transform/opacity only, no JS loop, no new dependency | PASS | keyframes in `app/globals.css:96-152` animate `rotate`, `translate`, `scale`, `opacity` only; no setInterval/requestAnimationFrame anywhere; `package.json` unchanged (last modified 2026-09-18 20:47) |
| prefers-reduced-motion disables every hl-* animation | PASS | `globals.css:154-156` sets `animation: none !important` on `.hl-beam, .hl-bokeh, .hl-glint, .hl-streaks` |
| Global reduced-motion rule (`animation-iteration-count: 1`, near-zero durations, `globals.css:71-73`) breaks nothing else | PASS | no other CSS animations exist (no vinyl spin; `Vinyl.tsx` has none); other motion is hover transitions, which just become instant |
| New `amber` token #f8b643 sourced | PASS | `components/README.md:25` (hero.jpg, mean of amber bokeh pixels); matches `globals.css:20`; used only for two bokeh dots |
| No hardcoded hex in tsx | PASS | none; colours via CSS variables and color-mix |
| Minor: README line 15 amber wording | FIXED and re-verified | `components/README.md:15` now consistent with lines 25 and 53 |

Human live check to add: watch the hero at 375 and 1280 for smooth motion (beams sweep, bokeh drifts, glint passes), no jank or text legibility loss; then enable "reduce motion" in the OS and confirm the hero is static.

## Real audio and covers re-check (2026-09-21)

Scripts: `qa/check-audio.mjs` (mp3 header probe, duration estimate, master detection by hash and size), `qa/check-out.mjs`.

| Check | Result | Evidence |
| :-- | :-- | :-- |
| 10 preview mp3s in `out/audio/`, valid, about 30 s | PASS | all parse as valid mp3 (128 to 320 kbps, 44.1/48 kHz), duration 30.0 to 30.1 s; each is byte-identical to the client's `30 Second Preview` file |
| Every track's preview src resolves | PASS | `content/tracks.ts` points each track at `/audio/<slug>-preview.mp3`; 25 audio/image refs in the exported HTML/RSC all exist in out/ |
| No master mp3 in public/ or out/ | PASS | no file byte-identical or same-size to any of the 10 client masters (5.4 to 10.5 MB); no audio file over 2 MB; largest preview 1.2 MB |
| Silent WAV gone from public/, out/ and content | PASS | no .wav anywhere; no reference to silence in app/content |
| 10 real covers match their tracks | PASS | 9 byte-identical to the client's per-track cover; Harbour Town re-encoded from a WebP-named-.jpg to real JPEG (documented); `coverArt` per track in `content/tracks.ts` |
| No stale substituted cover referenced | PASS | v1 covers overwritten; only `album-placeholder.jpg` remains (album placeholder, documented) |
| Published names are clean slugs | PASS | only `[a-z0-9-]`, no spaces or apostrophes in any published audio or cover name |
| PLACEHOLDERS.md and build-notes updated | PASS | silent audio and cover substitutions removed; masters-withheld statement present in both |
| Route/asset pass | PASS | tsc clean; 14 routes, 40 assets, 0 failures |
| Live | pending | real previews now play audible audio: confirm playback persists across navigation with actual sound (manual) |

## Social icons, rail and footer row (2026-09-21, build 13:59)

| Check | Result | Evidence |
| :-- | :-- | :-- |
| Every rail and footer link has an accessible name and a 44px hit area | PASS | `components/SocialIconLink.tsx`: `aria-label` ("Listen on X" / "Follow on X") plus `title`, `size-11` (44px) target; verified in out/index.html (6 streaming, 5 social) |
| Hover/focus animation CSS only, no dependency | PASS | scale, colour, background and drop-shadow via Tailwind transitions; `package.json` unchanged |
| prefers-reduced-motion drops scale, keeps colour | PASS | `motion-reduce:hover:scale-100` and `motion-reduce:focus-visible:scale-100` come after the scale rules in the built CSS (offsets 32287 > 31085, 32423 > 31791); colour classes are not overridden; global rule makes transitions near-instant |
| No horizontal overflow at 375 from footer and mobile header rows | PASS (code) | both rows `flex-wrap`; widths about 304px and 268px |
| Fixed rail does not cover content or the player | FAIL, now FIXED and re-verified on the 14:05 build: rail is `hidden` below 1300px, `right-1`, and the header icon row shows below 1300px (`SiteHeader.tsx:28`). At 1300px content text edge is 62px from the viewport edge, rail occupies 48px. Original finding: `components/SocialRail.tsx:16`: `fixed right-3`, 44px wide, shown from `md`; page gutter is 20px, so it overlaps content between 768 px and about 1330 px width. The player sits above it (z-50 vs z-40). Fix: hide until `xl` or reserve right padding |
| All 11 hrefs are `#`, recorded in PLACEHOLDERS.md and build-notes | PASS | `content/site.ts`; `content/PLACEHOLDERS.md:18`; build-notes updated |
| Icons inline SVG with currentColor, no hardcoded hex | PASS | no hex or non-currentColor fill/stroke in `components/icons.tsx`, Social*.tsx or SiteFooter.tsx |
| Route/asset pass | PASS | tsc clean, 14 routes, 40 assets, 0 failures; audio check 0 failures |

## Header icon-row layout change (2026-09-21, build 14:09)

| Check | Result | Evidence |
| :-- | :-- | :-- |
| tsc, 14 routes, 40 assets, audio check | PASS | 0 failures; package.json unchanged; no hex in tsx |
| Layout by inspection (`components/SiteHeader.tsx:28`) | PASS | 768 to 1023: icon row `col-span-3` on its own centred line (6 x 44px + gaps about 304px, wraps only if narrower); 1024 to 1299: `lg:col-span-1`, third column of the 3-column grid (column about 328px at 1024, fits 304px); 1300 and up: row hidden (`min-[1300px]:hidden`), fixed rail shown. Icon links keep their aria-labels and 44px targets |
| `md:col-span-3` and `lg:col-span-1` present in built CSS; no `w-screen`/`100vw`/fixed min-widths in app/components (375 overflow risk none by inspection) | PASS | |
| Header height vs first-band top padding at 768/900/1024 | PASS by lead render: hero eyebrow and title clear the taller header at 768, /music PageHeader title clear at 900, icons legible on the blue panel (`v9-home-768.png`, `v9-music-900.png`); also (lead renders `v2-review/v9-768.png`, `v9-900.png`, `v9-1024.png`; I viewed v9-768: icons on one centred line, title clear of header) | header is absolute; the extra icon line at 768 to 1023 adds about 52px, so confirm the hero/page-header title is not crowded in a render at 768 and 900 |

## v3 round: colour rebalance, scroll reveal, vinyl spin (2026-09-21, build 14:40)

| Check | Result | Evidence |
| :-- | :-- | :-- |
| (a) No-JS safety | PASS | `components/Reveal.tsx`: content is server-rendered visible; `data-reveal="hidden"` is set only after mount, only for elements below the fold, and never with reduced motion or without IntersectionObserver. Exported HTML checked for `/`, `/music`, a track page, `/licensing`, `/about`: 0 `data-reveal="hidden"` and no inline opacity:0 on any content (the only match is an SVG gradient stop). Page-title `.enter-line` is CSS-only and ends visible (`both`) |
| (b) Reveal and spin transform/opacity only; no new dependency; package.json unchanged | PASS | `globals.css:75-100`: `rotate` for the spin (`.vinyl-spin`, 8s, inner layer only, `Vinyl.tsx`), `opacity`, `translate`, `scale` for reveal; one shared IntersectionObserver, no timers or rAF; package.json last modified 2026-09-18 |
| (b) Reduced motion disables reveal motion and vinyl rotation | PASS | `.vinyl-spin, .enter-line { animation: none !important }`, `.reveal, .reveal * { transition: none !important }`, and `Reveal` never hides under reduced motion |
| (b) `staggerMs` duplicate gone | PASS | no `staggerMs` in app, components or content; single `components/stagger.ts` |
| (c) No horizontal overflow at 375 from reveal transforms or the spinning disc | PASS (code) | reveal translate is vertical only; the only scale (`zoom`, 1.04) is used in `FeatureBand.tsx:45`, inside an `overflow-hidden` band; a rotating circle stays within its own bounding box, and the largest disc at 375 is 18rem wide |
| (d) Contrast after the colour change | PASS | computed WCAG ratios: white/70 on midnight about 9.5:1; white/70 on electric-deep (#19449a, the darkest-to-lightest end of the EmailCapture gradient) about 5.2:1; white on electric-deep about 9:1; Submit white on electric #1148de about 7.0:1 (hover electric-bright about 4.7:1); the translucent player bar over a white backdrop still gives about 11:1 |
| (e) Grain decorative, no network | PASS | `.grain::after` is a pseudo-element (not in the accessibility tree), `pointer-events: none`, 4.5% opacity, background is an inline SVG data URI |
| v3 structure | PASS | `BlendedPhoto` replaces Duotone for photographs; FeatureBand variants dark; EmailCapture and SiteFooter dark; `PageHeader` passes `dim={0.45}` to `LitRoom` |
| (f) Route/asset/audio pass | PASS | tsc clean; 14 routes and 40 assets, 0 failures; audio check 0 failures; no stale v1 tokens; no fonts.googleapis/gstatic |
| (f) No hardcoded hex in new components | FAIL, minor, now FIXED and re-verified on the 14:45 build | `BlendedPhoto.tsx` masks now use `var(--color-white)`; grep finds no hex in app/ or components/ |
| Dimmer inner-page header (14:50 build, `PageHeader.tsx:16` `dim={0.72}`) | PASS | tsc clean, 14 routes and 40 assets 0 failures, audio check clean, no hex, package.json unchanged, 0 hidden reveal elements; darker ground only improves title contrast |
| Stronger photo fade (`fade="strong"` on stage.jpg) | PASS | 14:45 build: tsc clean, 14 routes and 40 assets 0 failures, audio check clean, 0 hidden reveal elements in exported HTML, package.json unchanged, no stale tokens or font URLs |

## Final v3 pass (build 14:50, `LitRoom` `dim`/`soft`)

| Check | Result | Evidence |
| :-- | :-- | :-- |
| Routes/assets/audio | PASS | tsc clean; 14 routes, 40 assets, 0 failures; audio check 0 failures |
| No hex, no new dependency, no overflow from `soft`/`dim` | PASS | `components/LitRoom.tsx` uses only CSS variables (`var(--color-*)`); the `soft` mask is on a container that is `overflow-hidden`; package.json unchanged (md5 7a9f7929...) |
| Contrast over the dimmed header | PASS (borderline note resolved) | title (large white text) over the brightest point of the header, the centre of the glow ellipse (luminance about 0.09): about 7.4:1. Secondary `text-white/70` text over the same centre point: about 4.5:1 (4.48 computed), i.e. right at the 4.5:1 line, and only at the exact peak of the glow; away from the centre it is well above. RESOLVED on the 14:55 build: `PageHeader.tsx:20` paragraph is now `text-white/90`, about 6.1:1 at the glow peak (computed); tsc clean, 14 routes and 40 assets 0 failures, audio check clean, no hex, package.json unchanged |

## BlendedPhoto `position` prop and `edges` fade (build 15:28:43)

| Check | Result | Evidence |
| :-- | :-- | :-- |
| tsc, routes, assets, audio | PASS | tsc exit 0; 14 routes, 10 track folders, 40 assets, 0 failures; audio check 0 failures, no masters |
| No hex, no new dependency | PASS | no hex in app/ or components/ (masks use `var(--color-white)`); package.json unchanged (md5 7a9f7929...); no 100vw/w-screen, stale v1 tokens or Google font URLs |
| No-JS safety unchanged | PASS | 0 `data-reveal="hidden"` in exported HTML; remaining opacity styles are SVG stops, decorative rects and vignette overlays, not content |
| Exported markup | PASS | FILM & TV: `aspect-ratio:3/4`, `object-position:50% 20%`, strong fade; STORY: `aspect-ratio:16/9`, `edges` two-gradient mask with intersect compositing |
| `edges` scope | NOTE | horizontal fade 7% per side, but the vertical fade starts at 72% of the height, so the bottom 28% fades out (documented in components/README.md) |; STORY bottom fade PASS by lead render at 1280 and 375 (`w5-bands-crop.png`, `w5-home-375.png`): all three figures' lower bodies and both guitars stay readable, the fade only takes empty studio floor; no change requested
| No horizontal overflow at 375 | PASS (code); render OPEN | mask paints only and `object-position` cannot change layout; FILM & TV is `max-w-sm`; glow is clipped by the band's `overflow-hidden`. True-375 render pending from lead |
| Contrast | PASS | no text over the photos; the `edges` vignette is decorative |
| 375 overflow render (lead, `docs/reference/v2-review/w5-home-375.png`) | PASS | every band, both photos, track grid and footer inside the 375 viewport |
| Reveal end state does not depend on the transition | PASS (code) | `globals.css:80-92`: opacity/translate/scale are set only by the `[data-reveal='hidden']` rules; `shown` sets only `transition`. Once state is `shown` the hidden rules stop matching, so the element resolves to its natural visible values even if a browser skips transitions. Reduced motion never hides at all (`Reveal.tsx`) |
| FILM & TV face fully in frame; STORY poses complete with intentional feather | PASS by lead render | `docs/reference/v2-review/w5-home-bands.png`, `w5-bands-crop.png` |

## Preview fades (build 15:43, `components/PlayerProvider.tsx`)

| Check | Result | Evidence |
| :-- | :-- | :-- |
| tsc, routes, assets, audio | PASS | tsc exit 0; 10 track folders, 40 assets, 0 failures; audio check 0 failures |
| No new dependency, no Web Audio, no interval | PASS | package.json md5 7a9f7929... unchanged; no `setInterval`, `AudioContext` or `createMediaElementSource` in app/components/content or in out/_next/static; the only `requestAnimationFrame` in code is the ramp in PlayerProvider; no hex |
| `usePlayer()` contract unchanged | PASS | `PlayerState` fields and methods identical |
| Ramp cancelled on unmount; one ramp at a time | PASS (code) | `useEffect(() => cancelRamp, ...)` (line 100); `ramp()` cancels any running ramp first |
| Volume never stuck below 1 | PASS (code) | pause completes with `a.pause(); a.volume = 1`; `ended` resets to 1 (`onEnded`); track load without autoplay sets 1; play-rejection catch sets 1; every start path (`startWithFadeIn`) ramps to 1; a switch ramp to 0 always ends in swap, which fades the new track in |
| Pause-then-play, double-click, click during pause fade | PASS (code) | `toggle` treats a fading pause as playing, so a second click resumes via `play` and ramps 1 from the current volume; a repeated `pause()` during a pause fade is ignored |
| Track switch | PASS (code) | old track fades 200 ms, then `pause()`, then swap; a later call cancels the ramp so the last request wins |
| Replay after end is not silent | PASS (code) | `onEnded` resets volume to 1; `play()` sets `currentTime = 0` when ended; `paused` is true after ended, so `startWithFadeIn` starts from 0 and ramps up |
| Seek back out of end zone restores volume | PASS (code) | `onTimeUpdate`: when `fadeKind` is `end` and remaining is 1.5 s or more, ramp to 1 over 150 ms; seeking while a fade is running with kind `end` is covered. Note it fires on timeupdate (about 4 Hz), so restore may lag up to ~250 ms |
| Stale play() rejection can desync state | FIXED and re-verified on the 15:48 build | `startWithFadeIn` catch now returns early on `err?.name === 'AbortError'`; genuine failures (e.g. NotAllowedError) still reset ramp, volume and state; generation-id guard dropped by the lead's decision. tsc clean, 10 folders and 40 assets 0 failures, audio check clean, package.json unchanged, no setInterval/AudioContext, no hex, 0 hidden reveal elements. Race itself remains a human live check (#8) |
| iOS Safari | KNOWN LIMIT | ignores `audio.volume`; fades inaudible there, pause delayed 300 ms (documented in components/README.md) |

Human live checks for fades (audio cannot be judged from static analysis):
1. A preview fades in (about 600 ms) rather than starting abruptly.
2. It fades out over the last 1.5 s instead of cutting, and lands silent.
3. Pause fades out (about 300 ms) rather than clicking off; then Play returns at full volume.
4. Switching tracks mid-playback crossfades cleanly (old fades 200 ms, new fades in), including rapid A to B to C clicks (last wins).
5. Replay the same track right after it has faded out at the end: it must come back at full volume, not silent.
6. Seek backwards out of the end fade with the slider: volume returns to full.
7. Rapid play/pause double-clicks never leave the volume stuck at 0.
8. On a slow first load (preload none), click play then switch tracks quickly: the bar must show the true state and the new track must sound.

---
# Previous run (v1), superseded


Status: ALL CHECKS PASS (final v3 state, latest verified build: 2026-09-21 14:50). Manual live checks listed below remain for a human.
Run: 2026-09-18, WSL Ubuntu, Node v24.21.0, npm 11.19.0, Next 16.3.5. Scripts: `qa/serve-out.mjs` (static server, port 4173), `qa/check-out.mjs` (fetches every route and every referenced asset).

| # | Check | Result | Evidence |
| :-- | :-- | :-- | :-- |
| 1 | `npx tsc --noEmit` | PASS | exit 0 |
| 1 | `npm run build` produces out/ | PASS | 16 static pages, exit 0 |
| 1 | out/ served by plain Node static server, no Next running | PASS | 14 routes fetched, all 200; server stopped |
| 2 | Routes `/`, `/music`, `/licensing`, `/about`, 10 x `/music/[slug]` exist | PASS | out/**/index.html; exactly 10 track folders |
| 2 | No root `app/page.tsx`; `dynamicParams = false` on track route | PASS | `app/(site)/music/[slug]/page.tsx:7` |
| 3 | Every src/href/CSS url() in exported HTML resolves | PASS | 37 unique assets, 0 failures |
| 3 | Preview audio valid | PASS | `public/audio/preview-silence.wav`: RIFF/WAVE, PCM mono 8 kHz 16-bit, data 48000 bytes = 3 s, header sizes consistent; served as audio/wav |
| 4 | Player in root layout via context provider | PASS | `app/layout.tsx` wraps everything incl. `PlayerBar` in `PlayerProvider`; single `<audio>` in `components/PlayerProvider.tsx` |
| 4 | Internal links use next/link (no plain `<a href="/...">`) | PASS | only `<a>` in source are `mailto:` (`app/(site)/licensing/page.tsx:30`, `app/(site)/music/[slug]/page.tsx:42`) |
| 5 | Licensing filters mood/genre/tempo | PASS (code) | `app/(site)/_components/CatalogueFilter.tsx:30-40`, tempo bands `components/tempo.ts`; live check pending |
| 5 | Buy button disabled + "coming soon" | PASS | `disabled="" aria-disabled="true"` "Purchasing is coming soon" in all 10 track pages |
| 5 | Enquiry is mailto; no form posts | PASS | both `<form>`s (`components/FilterControls.tsx:25`, `components/EmailCapture.tsx:23`) have no action and call `preventDefault` |
| 5 | Email capture marked prototype-only, not silent | PASS | amber "Prototype" badge, notice text, "Sign up (demo)", on submit "Nothing was sent" |
| 6 | No app/api, route.ts, 'use server', DB/auth/Stripe/analytics deps, `.env*`, `fetch(` | PASS | greps empty; package.json deps are only next/react/tailwind/ts/eslint |
| 6 | No external origins at runtime in out/ | PASS | no external src/href/CSS url() in any page. Remaining `https://` strings in framework JS are Next/React error-message doc links and XML namespaces, never fetched. No fonts.googleapis (system font stacks) |
| 7 | 3 artists, 10 tracks, 1 release (tracks 1-9 only) | PASS | `content/artists.ts`, `tracks.ts`, `releases.ts` |
| 7 | artistId mapping (4 -> Robert Dempster, 10 -> The Blue Guitar and DUBi, rest -> The Blue Guitar) | PASS | |
| 7 | Titles/credits verbatim; durationSeconds = brief mm:ss | PASS | 348,178,260,240,237,223,261,240,221,153 |
| 7 | Prices integer cents + currency; audio is variant array | PASS | 129 / 'USD'; `audio: [{variant:'preview',...}]` |
| 7 | DUBi mix not in album; album releaseDate null, placeholder title | PASS | "Untitled Album (placeholder)" |
| 7 | No "Roberrt" in .ts/.tsx or out/ | PASS | (documented only in PLACEHOLDERS.md, by design) |
| 8 | Ownership wording | PASS | no "100%"/"entire catalogue"/blanket claims in app/(site)/**, content/**; track 10 note is collaboration-only; `licensing/page.tsx:21` sole writer/producer/rights holder on his own recordings, per-track confirmed on enquiry. Sign-off still required (build-notes) |
| 9 | Design tokens, no hardcoded colours in components/** and app/** | PASS | hex only inside `@theme` in `app/globals.css` (token definitions); none in tsx |
| 9 | Player keyboard operable, aria-labelled | PASS (code) | native `<button>`s with aria-labels, `aria-pressed`, seek `<input type=range aria-label="Seek">`, region label |
| 9 | Every image has alt | PASS | all `<img>` have alt; only decorative one is the player thumbnail `alt=""` (`components/PlayerBar.tsx:26`) |
| 9 | Mobile width usable | PASS (code), live pending | responsive grid classes, `--spacing-player` bottom padding; player seek slider hidden below `sm` by design |

## Advisory (not failures)
- Site tagline "Blues written, produced and mixed by Robert Dempster" (`content/site.ts:6`, shown in hero and meta description) is site-wide and sits next to track 10, a collaboration. It is not an ownership claim but the client should confirm it along with the licensing wording.
- Tracks use plain `<img>` (fine with unoptimized export).

## Live checks for main (browser tools unavailable)
1. Start playback on /music, navigate to /licensing, a track page, /about: audio/bar state must persist (silent 3 s clip: watch the bar's time and play/pause state).
2. /licensing: choose each mood, genre and tempo band, combinations, Reset; count line ("N tracks shown") updates; "No tracks match" appears for an empty combination.
3. Resize to ~375 px: no horizontal scroll, header nav usable, player bar not covering footer, filters wrap.
4. Tab through header, preview buttons, player, filters, email form with keyboard only; focus visible.
5. Email form: type an address, submit: the "Nothing was sent" message shows.
6. Click Buy on a track page (disabled) and the mailto links (mail client opens).


Note (2026-09-21): `qa/serve-out.mjs` originally lacked MIME types for .mp3 and .m4a, so previews were served as application/octet-stream by the local harness. Fixed (`audio/mpeg`, `audio/mp4`), and the harness now also honours HTTP Range requests so the seek slider works in the browser. This is a local-harness issue only; Cloudflare Pages sets audio/mpeg itself.
