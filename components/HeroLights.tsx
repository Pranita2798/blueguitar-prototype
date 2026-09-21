import type { CSSProperties } from 'react';

type Tone = 'white' | 'pale' | 'amber';
const colour: Record<Tone, string> = {
  white: 'var(--color-white)',
  pale: 'color-mix(in srgb, var(--color-electric-bright) 45%, var(--color-white))',
  amber: 'var(--color-amber)',
};

// x/y in % of the panel, size in rem (scaled down on mobile in CSS), alpha, cycle seconds, delay seconds.
const bokeh: { x: number; y: number; s: number; tone: Tone; o: number; d: number; delay: number; alt?: boolean; desktopOnly?: boolean }[] = [
  { x: 6, y: 10, s: 12, tone: 'white', o: 0.16, d: 32, delay: -4 },
  { x: 76, y: 6, s: 9, tone: 'pale', o: 0.2, d: 26, delay: -10, alt: true },
  { x: 60, y: 52, s: 14, tone: 'pale', o: 0.12, d: 38, delay: -18 },
  { x: 16, y: 58, s: 7, tone: 'white', o: 0.14, d: 30, delay: -7, alt: true },
  { x: 86, y: 44, s: 5, tone: 'amber', o: 0.22, d: 24, delay: -3 },
  { x: 40, y: 16, s: 4, tone: 'white', o: 0.2, d: 21, delay: -12, alt: true, desktopOnly: true },
  { x: 28, y: 36, s: 10, tone: 'pale', o: 0.1, d: 36, delay: -20, desktopOnly: true },
  { x: 68, y: 26, s: 3, tone: 'white', o: 0.25, d: 19, delay: -5, alt: true, desktopOnly: true },
  { x: 12, y: 44, s: 2.5, tone: 'amber', o: 0.2, d: 28, delay: -9, desktopOnly: true },
  { x: 50, y: 72, s: 8, tone: 'pale', o: 0.12, d: 34, delay: -15, alt: true },
  { x: 88, y: 68, s: 6, tone: 'white', o: 0.1, d: 40, delay: -25, desktopOnly: true },
];

const beams: { x: number; w: number; r: number; d: number; delay: number; pale?: boolean; desktopOnly?: boolean }[] = [
  { x: 22, w: 30, r: 10, d: 18, delay: -3 },
  { x: 52, w: 38, r: 8, d: 22, delay: -11, pale: true },
  { x: 80, w: 26, r: 12, d: 15, delay: -7, desktopOnly: true },
];

/**
 * Animated stage lights for the hero's bright back panel: sweeping spotlights, drifting bokeh,
 * a slow glint and faint streaks. CSS-only (transform/opacity keyframes in globals.css),
 * decorative, static under prefers-reduced-motion. Sits over the LitRoom fill, under the text.
 */
export function HeroLights() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-[8%] top-[9%] -z-[5] h-[59%] overflow-hidden"
    >
      <div className="hl-streaks" />
      {beams.map((b, i) => (
        <div
          key={i}
          className={`hl-beam ${b.pale ? 'pale' : ''} ${b.desktopOnly ? 'max-md:hidden' : ''}`}
          style={{ '--x': `${b.x}%`, '--w': `${b.w}rem`, '--r': `${b.r}deg`, '--d': `${b.d}s`, '--delay': `${b.delay}s` } as CSSProperties}
        />
      ))}
      {bokeh.map((b, i) => (
        <div
          key={i}
          className={`hl-bokeh ${b.alt ? 'b' : ''} ${b.desktopOnly ? 'max-md:hidden' : ''}`}
          style={{ '--x': `${b.x}%`, '--y': `${b.y}%`, '--s': `${b.s}rem`, '--c': colour[b.tone], '--o': b.o, '--d': `${b.d}s`, '--delay': `${b.delay}s` } as CSSProperties}
        />
      ))}
      <div className="hl-glint" />
      {/* very soft darkening behind the text block keeps the heading crisp */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 45% 40% at 50% 38%, color-mix(in srgb, var(--color-midnight-deep) 30%, transparent), transparent 100%)' }}
      />
    </div>
  );
}
