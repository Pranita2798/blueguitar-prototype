# page-dev working notes
- Content shape follows content/types.ts (Lead Decision 7). Track/artist relations by id.
- Internal hrefs use trailing slashes (trailingSlash: true) and next/link.
- `toPlayerTrack()` in content/index.ts builds the serialisable player object.
- Status: content + assets done; pages pending design-dev component signatures.
- Homepage photo crops tuned by an outside session to keep faces in frame: FILM & TV stage.jpg uses aspect 3/4, position 50% 20%, fade strong, max-w-sm lg:max-w-md; THE STORY poses.webp uses aspect 16/9, fade edges. Lead confirmed both renders (docs/reference/v2-review/w5-*.png).
