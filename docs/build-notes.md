# Build notes: blueguitar.art static prototype

> **NEEDS CLIENT SIGN-OFF BEFORE THE SITE GOES PUBLIC: ownership and licensing wording.** The licensing page states that Robert Dempster is "the sole writer, producer and rights holder on his own recordings" with per-track details confirmed on enquiry. Tracks 1 to 9 carry the note "Robert Dempster is the writer, producer and rights holder of this recording. Ownership details are confirmed on enquiry." Track 10 (DUBi mix) says only that it is a collaboration with rights confirmed on enquiry. Ownership is unconfirmed for at least one track. The client must approve every one of these sentences (files: `app/(site)/licensing/page.tsx`, `content/tracks.ts`). The hero tagline "Blues written, produced and mixed by Robert Dempster" (`content/site.ts`) should be confirmed at the same time. No blanket catalogue-wide claim is made anywhere.

## What was built

A fully static Next.js prototype of blueguitar.art for Robert Dempster (label: Dolphin Bay Records, Bloomfield Hills, Michigan), for stakeholder design review only. Pages: `/` (hero, who-he-is line, featured tracks, fan and licensing paths, email capture), `/music` (catalogue grid with inline preview), `/music/[slug]` (10 track pages: preview, price, disabled buy button, licensing note), `/licensing` (ownership statement, client-side filter by mood, genre and tempo, mailto enquiry), `/about`. A persistent audio player is docked in the root layout so playback survives navigation. Content lives in typed local modules under `content/`. No backend of any kind: no CMS, database, auth, payments, API routes, server actions, analytics, email sending or deployment.

## Exact versions installed

Environment: WSL Ubuntu, Node v24.21.0, npm 11.19.0. Read from `node_modules/*/package.json`:

| Package | Version |
| :-- | :-- |
| next | 16.3.5 |
| react, react-dom | 19.3.0 |
| tailwindcss, @tailwindcss/postcss | 4.3.3 |
| postcss | 8.5.28 |
| typescript | 5.9.3 |
| @types/node | 22.20.4 |
| @types/react, @types/react-dom | 19.3.0 |
| eslint | 9.39.5 |
| eslint-config-next | 16.3.5 |
| sharp (Next optional dependency) | 0.35.4 |

The brief said "current stable" Next; the lead moved the target from 15 to 16 (16.3.5). Tailwind v4 is CSS-first (tokens in `@theme` in `app/globals.css`, no `tailwind.config.ts`). Scaffolded by hand (not create-next-app). `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true`. Fonts: see the v2 section (next/font, self-hosted).

## Palette (sampled from client artwork, source: `components/README.md`)

Extracted with `node styles/palette-extract.mjs`; raw output in `components/palette-raw.txt`; the full per-image dominant/accent table is in `components/README.md`.

| Token | Hex | Source file |
| :-- | :-- | :-- |
| ink (page background) | #050d14 | IMG_8407.jpeg |
| ink-deep (footer, player) | #040817 | IMG_9507.jpeg |
| surface | #0d1a27 | IMG_8407.jpeg |
| surface-2 | #05112b | IMG_9507.jpeg |
| line | #30344b | IMG_3245.jpeg |
| cream (body text) | #ebd5b9 | IMG_8407.jpeg |
| cream-bright (headings) | #f4efce | IMG_7350.jpeg |
| muted | #cdb290 | IMG_2386.jpeg |
| blue (primary accent) | #318ecf | IMG_7314.jpeg |
| blue-deep | #19449a | IMG_5199.jpeg |
| brass | #dbb389 | 90A93E54-98EA-4798-9683-3C353EF98C7C.jpeg |
| teal | #0496a5 | IMG_8425.jpeg |
| amber (prototype notices) | #d26c06 | IMG_7350.jpeg |

## v2 design direction (current)

The v1 look was rejected. v2 follows `docs/design-v2.md` and the reference `docs/reference/wix-musician-template.pdf` (page images `docs/reference/template-page-*.jpg`): a lit-room hero with giant italic display type, a portrait album sleeve with a vinyl record, alternating full-width bands in one saturated electric blue plus a midnight family, thin white pill buttons, a social rail and a transparent header. Lead's visual review renders are in `docs/reference/v2-review/`.

**v2 palette** (all sampled from client artwork; the earlier cream/brass/amber/teal tokens were removed):

| Token | Hex | Source file |
| :-- | :-- | :-- |
| electric | #1148de | IMG_9507.jpeg (mean of saturated jacket-blue pixels) |
| electric-bright | #056fed | IMG_9507.jpeg |
| electric-deep | #19449a | IMG_5199.jpeg |
| midnight | #05112b | IMG_9507.jpeg |
| midnight-deep | #040817 | IMG_9507.jpeg |
| night | #09092e | result.jpeg |
| white | #ffffff | neutral |
| amber (hero bokeh only) | #f8b643 | public/images/hero/hero.jpg |

(The palette table in the section above is the v1 palette and is superseded by this one.)

**Fonts:** Bodoni Moda (italic, display) and Jost (body), loaded with `next/font/google` and self-hosted into `out/_next/static/media` (7 woff2 files). **The build needs network access** to fetch them from Google Fonts at build time; the exported site makes no runtime font requests.

**v3 colour direction** (`docs/design-v3-colour.md`): the user found v2 "too blue", so v3 keeps the saturated electric blue for the hero only. After the hero the page is near-black and photographs show in their own colours (`BlendedPhoto`: natural colour, edges faded into the band with an alpha mask over a soft electric glow) instead of the earlier blue duotone. `BlendedPhoto` also takes a `position` prop (object-position, used to keep the FILM & TV face in frame) and a third fade, `edges`, used for the wide group shot; its bottom 28% fades out. Bands are dark gradients separated by hairlines, the email capture and footer are no longer blue slabs, inner-page headers use a strongly dimmed, soft-edged lit-room (`LitRoom` `dim` 0.72 plus `soft`, a wash of deep blue with a glow behind the title; the home hero stays at full brightness), a faint film-grain overlay (inline SVG data URI) sits on dark bands, and the player bar is a translucent blurred dark strip. No layout or copy changed.

**Scroll reveal and vinyl spin:** sections and cards fade or rise in as they scroll into view (`components/Reveal.tsx`, one shared IntersectionObserver, `components/stagger.ts` for grid delays). Content is always in the server-rendered HTML and is only hidden by script after load, so pages are fully readable with JavaScript off, and with reduced motion nothing is hidden. The THE MUSIC vinyl spins (8 s per turn, inner layer only). Both use transform and opacity only, no added dependency, and both are disabled under `prefers-reduced-motion`.

**Hero animation:** the home hero has animated "stage lights" (`components/HeroLights.tsx`, keyframes prefixed `hl-` in `app/globals.css`): sweeping spotlight beams, drifting bokeh, a slow glint and faint streaks. It is CSS only (rotate/translate/scale/opacity), decorative (aria-hidden), clipped inside the hero panel and switched off under `prefers-reduced-motion`. It adds one palette token, `amber` #f8b643, sampled from `public/images/hero/hero.jpg` and used only for two bokeh dots. Motion cannot be confirmed from screenshots; check it by eye.

## Run and export locally

```bash
cd /mnt/d/WebDev/BlueGuitar
npm install            # only if node_modules is missing
npm run dev            # dev server, http://localhost:3000
npx tsc --noEmit       # typecheck
npm run build          # static export to out/ (output: 'export')
node qa/serve-out.mjs 4173   # optional: serve out/ with a zero-dependency static server, http://localhost:4173/
```

`out/` is plain files (`folder/index.html` per route) and needs no Node server.

## Upload to Cloudflare Pages (described only; nothing has been deployed)

1. Run `npm run build` so `out/` is current.
2. In the Cloudflare dashboard: Workers & Pages, Create, Pages, "Upload assets" (direct upload). Name the project and drag in the contents of the `out/` folder (or use `wrangler pages deploy out` if the client uses Wrangler).
3. In the project's Custom domains tab, add `preview.blueguitar.art` and add the CNAME record Cloudflare shows for it.
4. No build command, environment variables or server configuration are needed. No basePath is set, so it serves from the domain root.

## Placeholders awaiting real content

Source: `content/PLACEHOLDERS.md` (page-dev) plus QA findings.

**Data invented for structure (never a title, credit or duration):**
- Mood tags, genre tags and tempo (BPM) for all 10 tracks (`content/tracks.ts`).
- Prices: every track 129 cents USD.
- Track descriptions: lorem ipsum.
- Artist bios (3 artists), About page biography and studio process: lorem ipsum.
- Album: title "Untitled Album (placeholder)", `releaseDate: null`, contains tracks 1 to 9 only (DUBi mix excluded).
- Hero tagline, who-he-is line and fan/licensing path copy: generic wording, no invented biography.
- Streaming links (Spotify, Apple Music, SoundCloud, YouTube, Bandcamp, Amazon Music) and social links (Instagram, Facebook, Threads, TikTok, X): all 11 are `#`, awaiting the client's real profile URLs. The icons are simplified inline SVGs (currentColor), not official brand marks. The content contract gained `SocialPlatform`, `SocialLink` and `SiteConfig.socialLinks`.
- Licensing email `licensing@blueguitar.art`: awaiting the client's real address.
- Email capture is visual only (amber "Prototype" badge; submit shows "Nothing was sent").
- Buy button is disabled ("Purchasing coming soon"); no payments.

**Audio (real previews in place):** the client supplied audio in `Client_Files/music/`, one folder per track containing the full master mp3, a `30 Second Preview` mp3 and a cover. Each track's 30 second preview was copied unchanged to `public/audio/<slug>-preview.mp3` (10 files, 481 KB to 1.2 MB, each about 30 s; verified by header and byte-identity with the client files) and is that track's `preview` variant. **The full masters were deliberately withheld: they are not in `public/` or `out/`**, because they are sellable assets and this prototype is uploaded publicly (QA confirmed by hash and size). The earlier silent placeholder WAV and its generator script were removed. `durationSeconds` remains the full-track length from the brief; previews are shorter by design. Masters and stems belong behind a real delivery system later, not in a static upload.

**Cover art (real):** all 10 track covers are the client's own `cover.jpg`/`cover.jpeg` from `Client_Files/music/<track folder>/`, copied to `public/images/covers/<slug>.jpg` unchanged (each verified byte-identical to the client file), with one exception: Harbour Town's cover was a WebP file named `.jpg`, so it was re-encoded as a real JPEG (600x566) with sharp. Several covers are not square, so square crops may trim edges. The earlier v1 cover substitutions no longer exist.

**Remaining image substitutions** (non-track images from `Client_Files/blue guitar/`; no live-site name such as img-8159 exists there):

| Use | Client file | Public file | Note |
| :-- | :-- | :-- | :-- |
| Album artwork | IMG_8423.jpeg | images/covers/album-placeholder.jpg | placeholder (Dolphin Bay Records CD case); album title and date are also placeholders |
| Hero | result.jpeg | images/hero/hero.jpg | substitution |
| Artist: The Blue Guitar | IMG_8440.jpeg | images/artists/the-blue-guitar.jpg | substitution |
| Artist: Robert Dempster | 5AB36FB1-8B04-4628-AD93-19569D6229C9.jpeg | images/artists/robert-dempster.jpg | RESIZED 5.9 MB to 1600x2397, 604 KB (sharp, JPEG q82) |
| Artist: The Blue Guitar and DUBi | IMG_5199.jpeg | images/artists/the-blue-guitar-and-dubi.jpg | substitution |
| Section: stage | 30F08065-D445-41A2-B05D-0459D051EC7C.jpeg | images/sections/stage.jpg | |
| Section: label | IMG_8423.jpeg | images/sections/label.jpg | |
| Section: beach | IMG_7314.jpeg | images/sections/beach.jpg | RESIZED to 1600 px wide |
| Section: poses | Dempster Animated 2.webp | images/sections/poses.webp | unmodified |

Unused client images: `result.png`, `result 1.jpeg`.

## Correction to the live site

The live site spells track 4's credit "Roberrt Dempster" (double R). This prototype uses "Robert Dempster". The client's new delivery folder for the track is also named "Roberrt Dempster - Blue Skies Yellow Sun"; the folder name is not published. The typo should be fixed on the live site too.

## QA

See `qa/report.md`. Static checks pass; visual checks reference the renders in `docs/reference/v2-review/`; playback across navigation and filter interaction are verified by code inspection, with a short manual list in the report.
