# Design v2: rebuild to the Wix Musician template

Written by the main session (team lead) on 2026-09-18 after the user rejected v1. Nobody but the lead edits this file.

**This supersedes the brief's VISUAL DIRECTION section.** Everything else in docs/project-brief.md still applies: scope, stack, content model, catalogue, routes, ownership wording, placeholders, file ownership, plan approval.

## Why v1 was rejected (user's words: "looks so AI generated", "no creative touch", hero "looks so stupid")

- The hero cropped Robert's face off entirely (see `docs/reference/v1-hero-rejected.png`). A 1453×1775 portrait was forced into a wide 80vh `object-cover` box.
- It took only a loose "visual language" from the template and ignored its actual look. The result was a generic dark site: small serif, brown/cream text, stock rectangular buttons and plain stacked rows.

## The reference: study it before planning

`docs/reference/wix-musician-template.pdf` is the Wix "Musician" template, id 1988. The PDF can't be rendered in the teammates' environment (no pdftoppm), so its three pages are extracted as images: **`docs/reference/template-page-1.jpg`** (hero + VINYL & MERCH), **`template-page-2.jpg`** (VIDEOS + GIGS & SHOWS) and **`template-page-3.jpg`** (GET ON THE LIST + footer). View them with the Read tool. Match its composition, typography and rhythm closely. Where this doc and the PDF disagree, the PDF wins on look, and this doc wins on content and colour.

What defines it:

1. **Display type**: very large, high-contrast Didone serif, *italic*, ALL CAPS, tight leading (~0.9), stacked onto two lines ("PATRICK / THOMAS", "VINYL / & MERCH", "GIGS / & SHOWS", "GET ON / THE LIST"). It uses a decorative italic ampersand and fills roughly 40 to 60 percent of the viewport width on desktop.
2. **Body/UI type**: a small, clean geometric sans (Futura/Avenir feel). Nav items are small caps-style uppercase.
3. **Colour**: ONE saturated hue plus a near-black of the same family, and white type. Sections alternate between a saturated band and a dark band. Thin 4px rules in the saturated hue separate sections, and dark sections fade to the saturated hue at the bottom.
4. **Buttons**: thin 1px white outline, fully rounded pill, small text ("Listen to My New Album", "Shop Now", "Watch Now", "Tour Dates"). The one exception is the newsletter Submit, a solid black rectangle.
5. **Hero**: a saturated "lit room" backdrop (a glowing central panel with darker walls and floor, done with gradients). The name is centred and huge, with a pill CTA under it. Below that sits an album sleeve (square artwork) with a vinyl record sliding out to the right.
6. **Header**: a centred, small uppercase nav that is transparent over the hero, plus a vertical column of small white streaming icons fixed to the right edge of the viewport.
7. **Feature sections**: each is a full-bleed band. A giant italic heading, left-of-centre, overlaps a large glowing object (the vinyl in VINYL & MERCH, the pads in GIGS & SHOWS), with a centred pill CTA below.
8. **Newsletter footer band**: saturated gradient. The "GET ON THE LIST" heading sits left; on the right are an underlined email input with a label above, a checkbox line, and a black Submit button. A tiny centred copyright line sits below.

## Colour decision (lead)

Swap the template's hot pink for **Robert's signature electric blue** (his jacket), and its plum-black for **midnight navy**. Everything else follows the template: white type, a single hue, saturated and dark bands alternating. The colour is only a token swap, so it can change later without touching layout.

- design-dev samples both colours from the client artwork with the existing sharp script and records the source files, as before. Suggested sources: the jacket in `IMG_9507.jpeg` / `result.jpeg` (hero.jpg) for the electric blue; `result.jpeg` night background for midnight (#09092e/#070b4e were already sampled). The electric blue must stay a rich royal/electric blue, not cyan and not a dull navy.
- Drop the v1 cream/brass/amber/teal text palette. The type is white (and white at reduced opacity for secondary text). If one warm accent is needed, use the amber bokeh from hero.jpg and use it sparingly; the template itself has none.

## Fonts

Use `next/font/google`, which self-hosts at build time, so there is no runtime request:
- Display: **Bodoni Moda**, italic, with the display weights you need. If it doesn't read as close to the PDF, try Playfair Display italic and pick whichever is closer; note the choice in components/README.md.
- Body/UI: **Jost** (Futura-like).

## Page-by-page

### Home `/`, following the template's order

1. **Hero** (electric lit-room backdrop):
   - Centred "THE BLUE GUITAR" in giant italic Didone caps on two lines, with a pill CTA "Listen Now" to /music.
   - Below that, the album-sleeve-with-vinyl object. The sleeve shows **Robert's portrait (hero.jpg) uncropped, or cropped from the top only, so his whole face and head are always visible**. The image is 1453×1775, so a 4:5 sleeve with `object-position: top` works. The vinyl slides out to the right. Its label is a circular crop of a cover.
   - The small eyebrow "DOLPHIN BAY RECORDS" and the one-line who-he-is sit near the name.
2. 4px electric rule.
3. **THE / MUSIC** (midnight band, like VINYL & MERCH): the giant heading overlaps a large glowing vinyl disc whose label is a track cover. Under it goes a featured-tracks row: 3 or 4 tracks as square covers with italic titles and inline preview buttons, which meets the brief's featured-tracks requirement. Pill "Hear the Catalogue" goes to /music.
4. **FILM & / TV** (electric band, like VIDEOS): this is the licensing path. The giant heading sits over a large photo treated as a blue duotone, so the client photos match the palette. It carries a short line for music supervisors and a pill "License a Track" to /licensing.
5. **THE / STORY** (midnight band fading to electric, like GIGS & SHOWS): the About path. Use `Dempster Animated 2.webp` or a stage photo as the glowing object, with a pill "About Robert" to /about.
6. **GET ON / THE LIST** newsletter band, then the tiny footer line.

That is the fan path (music), the licensing path (Film & TV) and the About path, each as its own full band, which meets the brief's "clear split" requirement.

### Inner pages (`/music`, `/music/[slug]`, `/licensing`, `/about`)

Same language throughout:
- A short page-header band (electric lit-room or midnight) with a giant italic two-line title, e.g. "THE / CATALOGUE", "FILM, TV / & ADS", "THE / STORY".
- Content on midnight with white type, thin rules and pill buttons.
- `/music`: grid of square covers with italic titles and pill preview buttons.
- `/music/[slug]`: a big sleeve-plus-vinyl object for the track, a giant italic title, price, the disabled pill "Purchasing coming soon", and the licensing note.
- `/licensing`: filters restyled as pill toggles, and a mailto link styled as a pill.
- `/about`: large duotone photos with giant italic headings.

## Components (design-dev)

Restyle or replace:
- globals.css tokens and fonts
- `Hero` (lit room, name, pill, sleeve+vinyl)
- `Vinyl` (CSS/SVG disc: grooves, glow, label = image prop)
- `Sleeve` (square art + vinyl slide-out, used in hero and track page)
- `FeatureBand` (heading lines, variant electric|midnight|fade, object slot, CTA)
- `PillLink`/`PillButton`
- `DisplayHeading` (italic caps, `lines: string[]`)
- `SocialRail` (vertical fixed right icons; horizontal row on mobile)
- `SiteHeader` (transparent over hero, centred nav, small wordmark left)
- `EmailCapture` ("GET ON THE LIST" layout; keep the visible prototype notice and the non-submitting form with its "Nothing was sent" message)
- `SiteFooter` (tiny line)
- `TrackCard`, `FilterControls` and `PlayerBar` restyled to midnight, white and electric pills
- `PageHeader` for inner pages
- a duotone image treatment (CSS: grayscale image + electric overlay with a blend mode, or similar)

Keep the player contract, the next/link rule, alt-text props and the design-token rule unchanged.

## Mobile

- Display type scales down, but stays the dominant element.
- The social rail becomes a horizontal row.
- The sleeve+vinyl stacks and stays uncropped at the top.
- No horizontal scroll: the vinyl must not overflow the viewport; clip it inside its band.

## Definition of done for v2

- The hero shows Robert's full face at 375px, 768px, 1280px and 1920px widths.
- Side by side with the PDF, a reviewer would say it is the same template in blue.
- All v1 QA checks still pass.
