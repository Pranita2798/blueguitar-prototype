# The Blue Guitar — Static Prototype

A fully static prototype of **blueguitar.art**, the catalogue site for **Robert Dempster** (recording as *The Blue Guitar*, label: *Dolphin Bay Records*, Bloomfield Hills, Michigan).

Its single purpose is to let stakeholders react to the **look, feel and structure** of the site before any platform work begins. It ships as a folder of plain static files that can be hosted anywhere — no server, database or backend of any kind.

> [!IMPORTANT]
> **This is a design-review prototype, not a production site.** Content is placeholder where real data has not been supplied, forms are visual-only, and the ownership/licensing wording **requires client sign-off before going public**. See [Status & known limitations](#status--known-limitations).

---

## Table of contents

- [What this is](#what-this-is)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick start (local development)](#quick-start-local-development)
- [Available scripts](#available-scripts)
- [Building the static site](#building-the-static-site)
- [Deployment / hosting](#deployment--hosting)
- [Project structure](#project-structure)
- [Content model](#content-model)
- [Design system](#design-system)
- [Status & known limitations](#status--known-limitations)
- [Documentation](#documentation)

---

## What this is

A statically-exported [Next.js](https://nextjs.org) App Router site. Every route is generated at build time; **nothing performs a network request at runtime**. The catalogue, artists and site configuration all live in typed TypeScript modules under [`content/`](content/), shaped so a real CMS can replace them later without changing the components.

### Features

- **Design system** derived from the client's own artwork (dark, restrained, artwork-led — see [Design system](#design-system)).
- **Catalogue browsing** — a grid of 10 tracks with cover art and inline preview playback.
- **30-second preview playback** with a **persistent audio player** docked to the bottom of the layout, so playback survives navigation between pages.
- **Client-side filtering** on the licensing page by mood, genre and tempo.
- **Fully static export** (`output: 'export'`) — deployable to any static host.

### Pages

| Route | Description |
| :-- | :-- |
| `/` | Home — hero, intro line, featured tracks, split into fan and licensing paths, email capture |
| `/music` | Catalogue grid with artwork and inline preview playback |
| `/music/[slug]` | Track detail — preview player, price, a disabled "purchasing coming soon" button, licensing note (10 pages) |
| `/licensing` | Ownership statement, catalogue filtered client-side by mood / genre / tempo, `mailto:` enquiry |
| `/about` | Biography and studio process |

---

## Tech stack

| Layer | Choice |
| :-- | :-- |
| Framework | **Next.js 16** (App Router, static export) |
| Language | **TypeScript 5** (strict mode) |
| UI | **React 19** |
| Styling | **Tailwind CSS v4** (CSS-first — tokens live in an `@theme` block in [`app/globals.css`](app/globals.css); no `tailwind.config.ts`) |
| Fonts | Bodoni Moda + Jost, self-hosted at build via `next/font/google` |
| Content | Typed TypeScript modules under [`content/`](content/) — no CMS, no fetch calls |

There is **no** database, authentication, payments, API routes, server actions, analytics or email sending. If a feature seems to need a backend, it is deliberately out of scope for this prototype.

---

## Prerequisites

- **Node.js 22 or newer** (the project has been built on Node 22–24; the Netlify config pins Node 22).
- **npm** (ships with Node). Yarn/pnpm work too, but the lockfile is `package-lock.json`.

Check your version:

```bash
node --version   # v22.x or newer
npm --version
```

---

## Quick start (local development)

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open **http://localhost:3000** in your browser.

The dev server supports hot reload — edits to pages, components or content refresh automatically.

---

## Available scripts

| Script | What it does |
| :-- | :-- |
| `npm run dev` | Start the local development server on port 3000 |
| `npm run build` | Produce the static site in `out/` |
| `npm run start` | Serve a production build (not needed for static hosting) |
| `npm run typecheck` | Run `tsc --noEmit` to type-check without emitting |

---

## Building the static site

```bash
npm run build
```

With `output: 'export'` set in [`next.config.ts`](next.config.ts), this writes a complete static site to the **`out/`** directory. Every route is exported as `folder/index.html` (`trailingSlash: true`), and images are served unoptimized so the output works on any plain file server with no runtime.

### Preview the exported build locally

Serve the `out/` folder with any static file server, for example:

```bash
npx serve out
# or
python3 -m http.server --directory out 8080
```

A helper server used during QA is also available:

```bash
node qa/serve-out.mjs
```

---

## Deployment / hosting

Because the build is a folder of static files, it can be hosted on **any static host** — Cloudflare Pages, Netlify, Vercel, GitHub Pages, S3 + CloudFront, or a plain web server.

**Build settings for any platform:**

| Setting | Value |
| :-- | :-- |
| Build command | `npm run build` |
| Publish / output directory | `out` |
| Node version | `22` |

### Netlify

A ready-to-use [`netlify.toml`](netlify.toml) is included. Connect the repository and Netlify picks up the build command and publish directory automatically.

> [!NOTE]
> The Netlify config adds an `X-Robots-Tag: noindex, nofollow` header so the client preview stays out of search engines. **Remove that `[[headers]]` block before pointing the real domain at the site.**

### Cloudflare Pages

Set the build command to `npm run build` and the output directory to `out`. No further configuration is required — the export is designed to work as plain uploaded files.

### Any other static host

Run `npm run build` and upload the contents of `out/` to your host's document root.

---

## Project structure

```
blueguitar-prototype/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Root layout + persistent audio player
│   ├── globals.css          # Tailwind v4 theme tokens (@theme block)
│   └── (site)/              # Site route group
│       ├── page.tsx         # Home
│       ├── music/           # Catalogue + [slug] track detail pages
│       ├── licensing/       # Ownership + client-side filter
│       ├── about/           # Biography
│       └── _components/     # Route-scoped components (e.g. CatalogueFilter)
├── components/              # Shared UI + design-system components, PlayerProvider
│   └── README.md            # Design system & palette documentation
├── content/                 # Typed content modules (the "CMS" for now)
│   ├── types.ts             # Shared content types (source of truth)
│   ├── site.ts              # Site config: nav, streaming links, email capture
│   ├── artists.ts           # 3 artists
│   ├── tracks.ts            # 10 tracks
│   ├── releases.ts          # Album release
│   └── index.ts             # Helpers: getArtist, getTrackBySlug, getPreviewSrc, …
├── public/                  # Static assets served as-is
│   ├── audio/               # 30s preview clips (placeholders — see build notes)
│   └── images/              # artists / covers / hero / sections
├── styles/                  # Palette-extraction tooling
├── docs/                    # Project brief, build notes, design docs
├── qa/                      # QA scripts and report
├── out/                     # Static export output (generated by `npm run build`)
├── next.config.ts           # output:'export', unoptimized images, trailingSlash
└── netlify.toml             # Netlify build + noindex preview header
```

---

## Content model

Content is intentionally modelled as if a CMS will replace it later, so the shape must survive that swap. Types are defined once in [`content/types.ts`](content/types.ts):

- **Artist** — `id`, `name`, `slug`, `bio`, `photo`
- **Release** — `id`, `title`, `slug`, `type` (single / EP / album / compilation), `releaseDate`, `artwork`, `trackIds[]`
- **Track** — `id`, `title`, `slug`, `artistId`, `durationSeconds`, `moodTags[]`, `genreTags[]`, `tempoBpm`, `coverArt`, `priceCents`, `currency`, `description`, `availableForLicensing`, `ownershipNote`, and an `audio[]` array of `{ variant, format, src }` variants.

Conventions: a track references an artist by **id**, never by name string. Prices are **integer cents**, never floats. Audio is an **array of variants**, never fixed fields.

The seeded catalogue is **10 real tracks** across **3 artists** (The Blue Guitar, Robert Dempster, and the collaboration The Blue Guitar and DUBi), plus one album containing tracks 1–9. Titles, credits and durations are taken verbatim from the live site; mood/genre/tempo/price/description are placeholders (see below).

---

## Design system

The palette is **sampled from the client's own artwork**, not invented — a dark, restrained, midnight-and-electric-blue scheme with self-hosted Bodoni Moda (display) and Jost (body) type. Tailwind v4 tokens live in an `@theme` block in [`app/globals.css`](app/globals.css).

Full details — every extracted hex value with its source image, the type scale, spacing tokens, and the `PlayerProvider` / `usePlayer()` contract — are documented in [`components/README.md`](components/README.md).

---

## Status & known limitations

This is a **prototype for design review**. Be aware:

- **Ownership & licensing wording requires client sign-off** before the site goes public. The relevant sentences (in [`app/(site)/licensing/page.tsx`](app/(site)/licensing/page.tsx) and [`content/tracks.ts`](content/tracks.ts)) are flagged at the top of [`docs/build-notes.md`](docs/build-notes.md).
- **Forms are visual-only.** The email capture block and licensing filters do not send or store anything; the UI says so explicitly.
- **The Buy button is deliberately disabled** and reads "purchasing coming soon".
- **Placeholder data** stands in for anything the client has not supplied: mood/genre/tempo tags, prices, descriptions, the album title and release date, streaming/social URLs (`#`), the licensing email, and the cover-art images. Every placeholder is listed in [`docs/build-notes.md`](docs/build-notes.md).
- **Audio previews are silent placeholder clips.** Real 30-second previews are cut from the masters later.
- The Netlify `noindex` header must be removed before launch (see [Deployment](#deployment--hosting)).

---

## Documentation

| Document | Contents |
| :-- | :-- |
| [`docs/project-brief.md`](docs/project-brief.md) | The source-of-truth brief: goal, scope, content model, rules |
| [`docs/build-notes.md`](docs/build-notes.md) | Exact versions installed, every placeholder, sign-off items |
| [`components/README.md`](components/README.md) | Design system: palette sources, type, spacing, player contract |
| [`qa/report.md`](qa/report.md) | QA checks with pass/fail and evidence |

---

*Prototype built for stakeholder design review. Not for public release in its current state.*
