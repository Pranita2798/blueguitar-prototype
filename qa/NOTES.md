# qa-agent working notes

Keep this updated as work happens. Not a deliverable itself; qa/report.md and docs/build-notes.md are.

## Status log

- 2026-09-18: Plan sent to main and approved, with additions (see below). Created qa/NOTES.md and qa/report.md skeleton. Project state at approval time: only package.json exists (design-dev just started). Waiting for design-dev's and page-dev's readiness messages before running checks that depend on their output.

- 2026-09-18 (restart): Team restarted after an earlier run died; this is a fresh qa-agent instance. Environment is WSL Ubuntu (/mnt/d/WebDev/BlueGuitar), Node v24.21.0, npm 11.19.0, clean Linux node_modules install by design-dev. Plan re-approved by lead with additions: Next is now 16 (16.3.5), record resolved versions (next, react, tailwindcss, typescript, sharp) in build-notes; check 2 also: no root app/page.tsx conflicting with app/(site)/page.tsx, track route sets dynamicParams=false, exactly 10 track folders; check 7 also: DUBi mix not in album trackIds, album releaseDate null and placeholder title; browser MCP tools presumed unavailable, do code inspection and send lead a live-check list.

## Additions from main's approval (fold into the check list)

- Check 18 (artist refs): also confirm exactly three artist records exist and each track's artistId resolves correctly — track 4 -> Robert Dempster, track 10 -> The Blue Guitar and DUBi, all others -> The Blue Guitar. Also confirm durationSeconds equals the brief's mm:ss for all 10 tracks.
- Check 22 (hardcoded colours): inline SVG `fill="currentColor"` is fine. Hex literals inside the palette-extraction script (e.g. styles/palette-extract.mjs) or in README/docs are NOT failures — only styling code (components/**, app/**) is in scope.
- New check: exported HTML/JS references no external origins at runtime. Grep out/ for `https://` in src/href attributes and for fonts.googleapis / fonts.gstatic. `#` placeholder streaming links and `mailto:` links are fine (not external fetches).
- New check: ownership wording check spans ALL page copy in app/(site)/** and content/**, not just the `ownershipNote` field on tracks.
- Sequencing: only run `npm run build` after page-dev confirms readiness, and confirm no one else is mid-build first (ask page-dev), since concurrent builds fight over .next/.
- Browser tools: if mcp__claude-in-chrome__* is not available/usable, don't sink time into it — do code inspection only, mark those checks accordingly, and send main the exact list for main to do the live pass.

## Pending inputs needed before full pass

- [ ] design-dev readiness message (design system, shared components, root layout, PlayerProvider/usePlayer contract documented in components/README.md)
- [ ] page-dev readiness message (all pages render, static export succeeds) — build/export checks wait for this
- [ ] page-dev's content/PLACEHOLDERS.md (for docs/build-notes.md placeholder list)
- [ ] design-dev's palette extraction record (components/README.md) (for docs/build-notes.md)

## Scratch / raw findings

(nothing yet)

- 2026-09-18: Full code/static pass done, all PASS, no failures to route. Report written. Live checks list in report. build-notes written.
- v2 pass done; FAIL stale tokens sent to page-dev; report + build-notes updated; awaiting fix.
- v2 fixes re-verified; all PASS.
- 2026-09-19 hero lights re-check PASS.
- 2026-09-21: real audio/covers arriving; wrote qa/check-audio.mjs; waiting for page-dev ready.
- 2026-09-21 audio/covers re-check PASS, build-notes updated.
- 2026-09-21 social icons check: rail overlap FAIL sent to design-dev; rest PASS.
- 2026-09-21 final verify on 14:09 build: all PASS. Work saved.
- 2026-09-21 v3 round: report+build-notes updated; #000 hex minor FAIL to design-dev; pending stronger photo fade re-check.
- 2026-09-21 (replacement qa-agent): 15:28 build verified (BlendedPhoto position/edges) PASS; 375 overflow render pending from lead. Report and build-notes updated.
- 2026-09-21 15:43 build (preview fades) verified by inspection, all PASS; low-risk stale AbortError catch reported to design-dev; 8 human live checks added.
- 2026-09-21 15:48 build: AbortError fix verified, finding closed; live check #8 remains for a human.
