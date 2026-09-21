# Design v3: colour rebalance

Lead, 2026-09-21. Supersedes the colour/treatment parts of docs/design-v2.md. Layout, typography and structure stay exactly as they are.

## The problem (user: "looks too blue, make it more modern and better")

See `docs/reference/v3-too-blue-1.png` (FILM & TV) and `v3-too-blue-2.png` (THE STORY).

1. **Duotone kills the photos.** Real photographs are forced to two tones of #1148de, so faces, skin, the guitar and the stage all collapse into flat blue. It reads as a dated filter, not as art direction.
2. **Too much full-saturation blue.** Whole full-bleed bands are #1148de, so there is no rest between sections and the eye has no focal point.
3. **Flat fills.** Big areas of one flat colour with hard edges look cheap next to the hero, which has depth from its gradients and lights.

## The direction

**One bold blue moment, everything else deep and photographic.** The hero's lit room keeps its saturated electric blue. After the hero, the page goes near-black, photos appear in their own colours, and blue survives only as accent: CTAs, hairlines, glows and small eyebrow text.

### 1. Kill the duotone

- Remove `Duotone` from FILM & TV, THE STORY and the About page photos. Keep the component, but stop using it for photographs; if any decorative use remains, cap the blue at roughly 25 percent so the image still reads as a photograph.
- Show the photos in natural colour with a light grade: about 5 percent desaturation, a touch more contrast, and slightly lifted blacks so they sit on a dark ground.
- Blend each photo into the band rather than sitting it in a hard rectangle. Use a soft alpha mask that fades the edges to transparent (radial or linear `mask-image`), so the subject emerges from the dark. Where a photo has its own flat background (e.g. the white-ground studio shot), fade it more aggressively so it reads as a vignette.
- Behind each photo, add a soft electric glow at low alpha for depth.

### 2. Rebalance the bands

- FILM & TV: `electric` becomes a dark band. Deep midnight with a subtle top-to-bottom gradient and an electric-tinted glow behind the photo.
- THE STORY: stays dark; drop the blue image box.
- Give the dark bands variation so they don't read as one slab: alternate `#05070f`-ish near-black with the slightly warmer midnight, and separate them with hairlines at about 20 percent white, not the 4px electric rule everywhere. Keep the electric rule only where it frames the hero.
- GET ON THE LIST: no longer a flat electric slab. Use a deep gradient (near-black into electric-deep) with the electric reserved for the Submit button and the input's focus state.
- Inner page headers (`/music`, `/licensing`, `/about`): tone the LitRoom panel down to roughly 45 to 60 percent of the hero's brightness, so arriving on a page is calmer than the homepage hero.

### 3. Keep the blue meaningful

Electric blue remains for: the hero room and its lights, primary CTAs and pill hovers, focus rings, the player's progress bar, the glow behind objects, small uppercase eyebrow text, and the vinyl rim. It should never again be a full-bleed background outside the hero.

### 4. Modern finish

- Add a very faint film grain or noise overlay (SVG turbulence or a tiny tiled PNG data URI) at about 3 to 5 percent opacity over dark bands, which kills banding in the gradients and makes flat areas feel intentional.
- Soften the section transitions: let one band's gradient bleed into the next rather than a hard colour switch.
- Give the player bar a subtle translucent backdrop blur over the dark ground.
- Keep type white; secondary text at 60 to 70 percent white. No colour-on-colour text.

## Constraints

- No layout, type-scale or copy changes. This is colour, treatment and depth only.
- No new dependencies. Tokens stay in `@theme`; document any added token with its source.
- Contrast: body text on any band stays at least 4.5:1, and large display text at least 3:1.
- Keep `prefers-reduced-motion` behaviour and the hero's full-face rule unchanged.

## Done when

Side by side with the current build, the page reads as dark and photographic with blue accents, the photographs look like photographs, and the hero is clearly the most saturated thing on the site.
