# Design system and components

## Versions installed (WSL Ubuntu, Linux binaries)

Node v24.21.0, npm 11.19.0. next 16.3.5, react / react-dom 19.3.0, tailwindcss 4.3.3, @tailwindcss/postcss 4.3.3, postcss 8.5.28, typescript 5.9.3, eslint 9.39.5, eslint-config-next 16.3.5, sharp 0.35.4 (Next's optional dependency, used only by `styles/palette-extract.mjs`).

Tailwind v4 is CSS-first: tokens live in `@theme` in `app/globals.css`. No `tailwind.config.ts` exists because none is needed. There is no eslint config file and no lint script (`next lint` was removed in Next 16).

## Palette (sampled from client artwork, not invented)

Method: `node styles/palette-extract.mjs` downsamples each image in `Client_Files/blue guitar`, buckets pixels, and prints the dominant colours (with share of pixels) and most saturated accents. Full raw output: `components/palette-raw.txt`.

### Tokens (v2, electric blue) and their sources

v2 follows `docs/design-v2.md`: one saturated hue plus a midnight family, white type. The v1 cream/brass/teal tokens were removed; v1's amber was replaced by a new `amber` token (#f8b643, sampled from hero.jpg) used only for the hero lights' bokeh.

| Token | Hex | Source file |
| :-- | :-- | :-- |
| `electric` (saturated bands, rules, pills fill) | `#1148de` | IMG_9507.jpeg: mean of saturated jacket-blue pixels. Cross-check: the same mean over hero.jpg (= result.jpeg) is `#2550d0`, a slightly duller version of the same blue; the more saturated value is kept to match the template's punch |
| `electric-bright` (glow, hover highlights) | `#056fed` | IMG_9507.jpeg (dominant, 4%) |
| `electric-deep` (sleeve frame, gradient start) | `#19449a` | IMG_5199.jpeg (accent) |
| `midnight` (dark bands) | `#05112b` | IMG_9507.jpeg (dominant, 8%) |
| `midnight-deep` (page background, near-black) | `#040817` | IMG_9507.jpeg (dominant, 11%) |
| `night` (fade band middle, vinyl grooves) | `#09092e` | result.jpeg (dominant, 4%) |
| `amber` (hero bokeh only) | `#f8b643` | public/images/hero/hero.jpg: mean of the amber bokeh pixels |
| `white` | `#ffffff` | neutral; secondary text is `text-white/70`, rules `border-white/30` |

### Every extracted value (dominant / accent, per file)

Dominant shows share of pixels. See `palette-raw.txt` for the exact printed output.

| File | Dominant | Accent |
| :-- | :-- | :-- |
| 30F08065-D445-41A2-B05D-0459D051EC7C.jpeg | #fff9ec 42%, #ffecd1 33%, #fbd8b1 5%, #2a0c05 2% | #2a0c05, #0f2a35, #190505 |
| 5AB36FB1-8B04-4628-AD93-19569D6229C9.jpeg | #d9d8c9 18%, #e6e4d8 14%, #d5cab4 13%, #ebeced 10% | #2e58c5, #2752b9, #1c48b3 |
| 90A93E54-98EA-4798-9683-3C353EF98C7C.jpeg | #e6ceb1 31%, #e8dbca 11%, #dbb389 9%, #eee3d5 9% | #dbb389, #e2ba8f, #d5a87a |
| Dempster Animated 2.webp | #f8f9f6 59%, #0b0b0b 8%, #2e2b2b 3%, #0e102f 2% | #0e102f, #11164f, #272c73 |
| IMG_2386.jpeg | #141111 12%, #f7f5f6 7%, #cdb290 4%, #302819 3% | #302819, #8f6e33, #8b5412 |
| IMG_3245.jpeg | #2e2b31 14%, #30344b 7%, #4d566a 6%, #13121a 6% | #30344b, #181927, #576f8a |
| IMG_5199.jpeg | #fefefe 60%, #020203 14%, #19449a 7%, #133b8d 3% | #19449a, #133b8d, #133172 |
| IMG_7314.jpeg | #ebd5b3 6%, #70a7d1 5%, #704c2c 5%, #318ecf 4% | #014489, #318ecf, #704c2c |
| IMG_7350.jpeg | #f4efce 30%, #f8f9e9 16%, #f7d206 4%, #cfe7b3 4% | #f7d206, #d26c06, #f6e331 |
| IMG_8407.jpeg | #050d14 17%, #ebd5b9 10%, #0d1a27 8%, #494d51 6% | #050d14, #0d1a27, #08274b |
| IMG_8418.jpeg | #09cafe 24%, #f9f8fa 15%, #04b7fa 14%, #4dd8fb 4% | #09cafe, #04b7fa, #4dd8fb |
| IMG_8423.jpeg | #302617 5%, #906d4c 5%, #352d27 4%, #6f5237 4% | #302617, #906d4c, #271b10 |
| IMG_8425.jpeg | #03080f 15%, #77c7c4 13%, #0496a5 7%, #02346b 5% | #03080f, #0496a5, #77c7c4 |
| IMG_8440.jpeg | #edf3f7 18%, #cbd8e6 15%, #d8e5f0 12%, #0cc9fe 8% | #0cc9fe, #06b6fa, #2ccdfa |
| IMG_9507.jpeg | #040817 11%, #05112b 8%, #0108f2 5%, #056fed 4% | #040817, #05112b, #0108f2 |
| result 1.jpeg | #fefefe 59%, #f50b03 4%, #fd2e06 3%, #f9af8d 2% | #f50b03, #fd2e06, #025297 |
| result.jpeg | #05040a 41%, #09092e 4%, #070b4e 2%, #040e71 2% | #05040a, #09092e, #040e71 |
| result.png | #010101 55%, #498ef8 3%, #2f2b30 2%, #3174f4 2% | #498ef8, #3174f4, #358cf8 |

Deliberately not used: neon cyan (#09cafe, IMG_8418/8440), saturated red (#f50b03, result 1) and yellow (#f7d206, IMG_7350). The only warm colour is `amber` (#f8b643, from hero.jpg), used solely for two bokeh circles in the hero lights.

## Type and spacing

- Display: **Bodoni Moda italic** (`next/font/google`, self-hosted at build, variable `opsz` axis so large sizes get the thin hairlines), weight 400, ALL CAPS, leading 0.9. Chosen after comparing with the template; Playfair Display was not needed. Body/UI: **Jost** 300/400 (Futura-like). Both are exposed as `--font-bodoni` / `--font-jost` and mapped to `font-display` / `font-sans`.
- Display sizes: `text-display-hero` clamp(2.5rem, 14vw, 11rem), `text-display-band` clamp(3rem, 10vw, 9rem), `text-display-page` clamp(2.75rem, 8vw, 7rem), `text-display-compact` clamp(2.25rem, 5vw, 4.25rem). UI scale `text-xs` to `text-4xl` as before.
- Spacing: `--spacing-gutter` 1.25rem (`px-(--spacing-gutter)`), `--spacing-player` 5.5rem (body bottom padding for the docked player), `max-w-page` 76rem.
- Tailwind's default colours are disabled (`--color-*: initial`); only the tokens above exist.

## Components (`import { ... } from '@/components'`)

No content inside components; everything comes in as props. The root layout renders the transparent `SiteHeader` (absolute over the first band), `SocialRail`, `<main>`, `EmailCapture`, `SiteFooter` and `PlayerBar` inside `PlayerProvider`; pages must not. **The first element of every page must be `Hero` (home) or `PageHeader` (inner pages)**: both pad themselves to clear the header.

| Component | Props |
| :-- | :-- |
| `DisplayHeading` | `lines: string[], as?: 'h1'\|'h2'\|'h3', size?: 'hero'\|'band'\|'page'\|'compact', className?` |
| `PillLink` | `href, children, variant?: 'outline'\|'solid', className?` (next/link for `/` routes; `<a>` for mailto, http, `#`) |
| `PillButton` | `children, onClick?, disabled?, type?, variant?, pressed?, className?, aria-label?` |
| `Vinyl` | `labelSrc, labelAlt, size?: 'md'\|'lg'\|'xl', glow?, tilt?, spin?, className?` (`spin`: only the inner groove+label layer rotates, 8s linear, in the plane of the disc; tilt, glow rim, shadow and sheen stay fixed; off under reduced motion. Used on the THE MUSIC feature vinyl only) |
| `Sleeve` | `imageSrc, imageAlt, labelSrc, labelAlt, aspect?: 'portrait'\|'square', className?` (portrait = 4:5, `object-top`, full face visible) |
| `BlendedPhoto` | `imageSrc, imageAlt, aspect?: string, fade?: 'soft'\|'strong'\|'edges', position?: string, className?` (v3: natural-colour photo, light grade, edges masked into the dark band, soft electric glow behind. `fade`: `soft` = gentle radial fade (default); `strong` = hard radial fade, for photos with a white/flat background; `edges` = for wide group shots whose subjects reach the corners: feathers the sides and top tightly (about 7% and 5%) with a longer fade across the lower part of the frame (white to about 72% of the height), plus a wide, high-centred vignette. Every option fades to transparent on all four sides, so none leaves a hard rectangle. `position` = CSS object-position for the crop, e.g. `'50% 20%'` to keep faces in frame; unset leaves the default centre crop. Caveat: `edges` dims the lower part of the frame, so a photo with faces low in the frame needs `position` or a different fade. Current use in app/(site)/page.tsx: FILM & TV `aspect="3/4" position="50% 20%" fade="strong"`; THE STORY `fade="edges"`) |
| `Duotone` | `imageSrc, imageAlt, aspect?: string, className?` (decorative only; tint capped at 25%, no longer used for photographs) |
| `FeatureBand` | (v3: no full-bleed electric outside the hero; `electric` = deep gradient band with an electric glow, `midnight` = midnight, `fade` = near-black bleeding into midnight; hairline top border, film grain) `variant: 'electric'\|'midnight'\|'fade', lines, eyebrow?, children?, cta?, object: ReactNode, align?: 'left'\|'right', id?` |
| `Hero` | `lines, eyebrow?, tagline?, cta, sleeve: {imageSrc, imageAlt, labelSrc, labelAlt}` |
| `HeroLights` | none; used inside `Hero` only (animated CSS lights in the back panel; static under reduced motion) |
| `PageHeader` | `lines, eyebrow?, children?, variant?: 'electric'\|'midnight'` |
| `TrackCard` | `track: PlayerTrack, coverAlt, durationLabel, priceLabel?, tags?, revealDelay?: number` (pass `stagger(i)` in grids) |
| `PreviewButton` | `track, size?: 'icon'\|'large', className?` |
| `FilterControls` | `groups: FilterGroup[], onReset, resultCount?, className?` (pill toggles; controlled; `value ''` = all) |
| `tempoBand(bpm)`, `TEMPO_BANDS` | `'slow' (<80) \| 'mid' (80 to 110) \| 'up' (>110)` |
| `SocialIconLink` | `platform, label, href, prefix?, size?: 'rail'\|'footer'` (inline-SVG glyph, hover/focus scale + glow; drops the scale under reduced motion) |
| `SocialRail` | `links` (streaming: spotify, apple-music, youtube, soundcloud, bandcamp, amazon-music), `orientation?`; 26px glyph (24px mobile) in a 44px target, gap-3, hairline on the right edge; fixed rail only shown from 1300px (clears the 76rem content column), below that the same icons sit as a row in the header |
| `SiteFooter` | `name, label, location, nav, footerNote, socialLinks` (instagram, facebook, threads, tiktok, x; 24px glyph in a 44px target, gap-3, wraps on mobile) |
| `SiteHeader`, `EmailCapture`, `PlayerBar` | layout only |

Email capture: "GET ON THE LIST" layout, but visibly a prototype: a "Prototype" badge, the `prototypeNotice` text, a non-submitting form, and "Nothing was sent" on submit. No network call.

## Player contract

```ts
interface PlayerTrack { id: string; title: string; artistName: string; coverArt: string; previewSrc: string; href: string }

usePlayer(): {
  current: PlayerTrack | null; isPlaying: boolean; currentTime: number; duration: number;
  play(track); toggle(track?); pause(); seek(seconds);
  isCurrent(id): boolean; isPlayingId(id): boolean;
}
```

`PlayerProvider` (client) owns one `<audio>` element and sits in the root layout, so playback survives client-side navigation as long as every internal link uses `next/link`. Pages build a `PlayerTrack` from content (resolve the artist name and pick the `preview` variant in `content/`), then pass it to `TrackCard` / `PreviewButton`, or call `usePlayer().toggle(track)` from a client component. `PlayerBar` (midnight, white outline controls) shows title (linking to the track page), artist, cover, play/pause and a seek slider (hidden below `sm`), and is keyboard operable with aria-labels.

### Preview fades

`PlayerProvider` ramps `audio.volume` only (requestAnimationFrame, ease-out, no dependency, no Web Audio, `playbackRate` untouched). Fade in 600ms whenever playback starts or resumes; fade out 300ms on pause and then pause, resetting volume to 1; on a track switch the current track fades out over 200ms, then the new one loads and fades in; in the last 1.5s of a clip volume ramps to 0 so it lands silent. Exactly one ramp runs at a time (its rAF id is kept in a ref; starting a ramp cancels the running one and starts from the current volume; cancelled on unmount). Edge cases: a second click during a pause fade resumes; play on a track fading out ramps back up; the last of several quick switches wins; seeking back out of the end zone restores full volume (150ms); `ended` resets volume to 1 so a replay is never silent. The `usePlayer()` contract is unchanged. A rejected `play()` only resets state for a genuine, current failure (AbortError from a superseded request is ignored; `onPause` keeps state consistent). Limitation: iOS Safari ignores script control of `audio.volume` (it is always 1), so there the fades are inaudible; play/pause still work, with pause delayed by 300ms.

Track hrefs should include the trailing slash (`/music/slug/`) to match `trailingSlash: true`.

## v3 colour rebalance (docs/design-v3-colour.md)

The hero is the only saturated-blue moment. Bands are near-black (`midnight-deep`) alternating with `midnight`, separated by `border-white/20` hairlines; the footer and newsletter band are dark gradients (electric only on the Submit button and input focus); inner-page `LitRoom` is dimmed 72% (about 28% of hero brightness, with a soft glow concentrated behind the title, blurred panel edges and a side fade); photos use `BlendedPhoto`. A faint film grain (`.grain` in globals.css, SVG turbulence data URI at 4.5% opacity) sits over dark bands. The player bar uses a translucent `backdrop-blur-md` and an electric-bright seek slider. No new colour tokens.

## Scroll reveal (`Reveal`)

`<Reveal variant?: 'up'|'fade'|'zoom'|'lines' delay?: number (ms) as?: ElementType className?>` (client component, `stagger(i)` = 70ms per step capped at 6 steps, in plain `components/stagger.ts` so server components may call it). One shared IntersectionObserver (rootMargin `0px 0px -12% 0px`, threshold 0.15) reveals each element once and unobserves it. `up` = opacity + 24px rise, `zoom` = 1.04 to 1 scale, `fade` = opacity, `lines` = the `DisplayHeading` lines inside it rise in turn 90ms apart. 650 to 800ms, `cubic-bezier(0.22, 1, 0.36, 1)`, only `opacity`/`translate`/`scale`.

Fail-safe: content is server-rendered visible; after mount, only elements that start below the fold get `data-reveal="hidden"` (before paint), then `shown` when they enter. No JS, no IntersectionObserver, or `prefers-reduced-motion` means nothing is ever hidden. Already used inside `FeatureBand` (heading lines, object, body, CTA), `EmailCapture` and `TrackCard`. Above-the-fold page titles use a CSS-only entrance (`DisplayHeading enter`, used by `PageHeader`) that always ends visible. Pages may wrap their own sections in `Reveal`. The optional scroll-driven parallax was not added.
