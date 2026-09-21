# Placeholders and substitutions (page-dev)

Everything below is invented, substituted or unconfirmed. Replace before launch.

## Needs client sign-off (legal)
- Ownership wording. Tracks 1-9 `ownershipNote`: "Robert Dempster is the writer, producer and rights holder of this recording. Ownership details are confirmed on enquiry." Track 10: "This track is a collaboration. Rights details are confirmed on enquiry." (no sole-ownership claim). The /licensing statement says Robert is sole writer, producer and rights holder on his own recordings, with per-track details confirmed on enquiry. No blanket catalogue-wide claim anywhere. Client must approve all of this wording before the site goes public.

## Corrections
- Track 4 credit: the live site shows "Roberrt Dempster" (typo). Site uses "Robert Dempster".

## Invented placeholder data
- Mood tags, genre tags, tempo (BPM) for all 10 tracks (content/tracks.ts).
- Prices: every track $1.29 (129 cents, USD).
- Track descriptions: lorem ipsum.
- Artist bios (3 artists), About page biography and studio process: lorem ipsum.
- Album: title "Untitled Album (placeholder)", `releaseDate: null`, contains tracks 1-9 (not the DUBi mix).
- Hero tagline / short who-he-is line / fan and licensing path copy (generic, no biographical facts).
- Streaming links: Spotify, Apple Music, SoundCloud, YouTube, Bandcamp, Amazon Music, all `#`. Social links: Instagram, Facebook, Threads, TikTok, X, all `#`. Every URL awaits the client's real profile links.
- Type contract amended (extends Lead Decision 7): `content/types.ts` gained `SocialPlatform`, `SocialLink` and `SiteConfig.socialLinks`.
- Licensing email: `licensing@blueguitar.art` (awaiting real address).
- Email capture is visual only; prototype notice shown in UI.
- Buy button is disabled ("coming soon"); no payments.

## Audio (REAL previews in place)
- The client's real 30 s preview mp3s are in `public/audio/<slug>-preview.mp3` (10 files, taken from each track's `30 Second Preview/` folder in `Client_Files/music/`). Each track's `preview` variant points at its own file. The earlier silent placeholder WAV and its generator script were removed.
- The full masters were deliberately NOT copied into `public/` and are not published: they are sellable assets and this prototype is uploaded publicly. `audio` arrays contain the preview variant only.
- The Blue Skies folder is spelled "Roberrt Dempster" (client typo); the site keeps "Robert Dempster".
- `durationSeconds` stays at the full-track lengths from the brief; previews are shorter by design.

## Cover art (REAL covers in place for all 10 tracks)
Each track's cover is the client's own `cover.jpg`/`cover.jpeg` from `Client_Files/music/<track folder>/`, copied unchanged (all under 1 MB, no resizing) to `public/images/covers/<slug>.jpg`, except: `harbour-town.jpg` was actually a WebP file named .jpg (600x566), so it was re-encoded as a real JPEG (quality 90) with sharp. Verified visually that each cover matches its track. Several covers are not square (it's-a-good-day 1439x1691, lets-go-back 1284x1263, harbour-town 600x566, living-the-dream 1600x1404, its-a-good-day-dubi-mix 1284x1611), so square crops may trim edges.

Remaining substitutions (non-track images, from `Client_Files/blue guitar/`):
| Use | Client file | Public file | Note |
|---|---|---|---|
| Album artwork | IMG_8423.jpeg | images/covers/album-placeholder.jpg | placeholder (Dolphin Bay Records CD case); left as is |
| Hero | result.jpeg | images/hero/hero.jpg | substitution |
| Artist: The Blue Guitar | IMG_8440.jpeg | images/artists/the-blue-guitar.jpg | substitution |
| Artist: Robert Dempster | 5AB36FB1-8B04-4628-AD93-19569D6229C9.jpeg | images/artists/robert-dempster.jpg | RESIZED 5.9 MB -> 1600x2397, 604 KB (sharp, JPEG q82) |
| Artist: The Blue Guitar and DUBi | IMG_5199.jpeg | images/artists/the-blue-guitar-and-dubi.jpg | substitution |
| Section: stage | 30F08065-D445-41A2-B05D-0459D051EC7C.jpeg | images/sections/stage.jpg | |
| Section: label | IMG_8423.jpeg | images/sections/label.jpg | |
| Section: beach | IMG_7314.jpeg | images/sections/beach.jpg | RESIZED to 1600 px wide (sharp, q82) |
| Section: poses | Dempster Animated 2.webp | images/sections/poses.webp | unmodified |

Unused client images: result.png, result 1.jpeg. Note: `images/covers/*` from v1 substitutions (IMG_3245 etc.) were all overwritten by the real covers.

## v2 redesign copy and image roles (all placeholders / substitutions)
- Home hero: title "THE BLUE GUITAR", eyebrow "DOLPHIN BAY RECORDS", tagline "Robert Dempster writes, produces, mixes and masters his own music in Bloomfield Hills, Michigan." CTA "Listen Now". Sleeve = images/hero/hero.jpg (result.jpeg, full face, top-aligned); vinyl label = real Blue Skies, Yellow Sun cover.
- THE MUSIC band: vinyl label = its-a-good-day cover; featured tracks 1 (It's a Good Day), 4 (Blue Skies, Yellow Sun), 6 (Harbour Town), 9 (Warm Breeze); CTA "Hear the Catalogue".
- FILM & TV band: natural-colour BlendedPhoto images/sections/stage.jpg; copy "Robert is the sole writer, producer and rights holder on his own recordings... per-track ownership details are confirmed on enquiry." (needs client sign-off, see above); CTA "License a Track".
- THE STORY band: images/sections/poses.webp (Dempster Animated 2.webp); lorem copy; CTA "About Robert".
- Newsletter heading "Get on the list" (site.ts); form is visual only.
- Inner page headers: THE CATALOGUE, FILM, TV & ADS, THE STORY (headings, not facts). /about: BlendedPhoto artists/robert-dempster.jpg and sections/beach.jpg; lorem copy under "THE MAN" and "IN THE STUDIO".
- Track page: sleeve uses the track's cover art (also as vinyl label), disabled pill "Purchasing coming soon".
