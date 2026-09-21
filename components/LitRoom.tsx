export interface LitRoomProps {
  /** Back panel top / bottom edge as % of the band height. */
  top?: number;
  bottom?: number;
  /** 0 = full brightness (hero); 0.45 tones the room to ~55% for inner pages. */
  dim?: number;
  /** Soften the panel edges and fade the room out toward the sides (inner pages). */
  soft?: boolean;
  className?: string;
}

/**
 * Gradient/polygon "room" seen in perspective: bright back panel, darker side walls,
 * ceiling and floor converging on it, fading to near-black at the bottom.
 */
export function LitRoom({ top = 9, bottom = 68, dim = 0, soft = false, className = '' }: LitRoomProps) {
  const l = 8;
  const r = 92;
  return (
    <div
      aria-hidden
      className={`absolute inset-0 -z-10 overflow-hidden ${className}`}
      style={soft ? { maskImage: 'linear-gradient(to right, transparent, var(--color-white) 22%, var(--color-white) 78%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, var(--color-white) 22%, var(--color-white) 78%, transparent)' } : undefined}
    >
      <svg className="size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lr-ceiling" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--color-midnight-deep)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-electric-deep)' }} />
          </linearGradient>
          <linearGradient id="lr-wall-l" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: 'var(--color-midnight-deep)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-electric-deep)' }} />
          </linearGradient>
          <linearGradient id="lr-wall-r" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" style={{ stopColor: 'var(--color-midnight-deep)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-electric-deep)' }} />
          </linearGradient>
          <linearGradient id="lr-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: 'var(--color-electric)' }} />
            <stop offset="0.5" style={{ stopColor: 'var(--color-electric-deep)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-midnight-deep)' }} />
          </linearGradient>
          <radialGradient id="lr-panel" cx="0.5" cy="0.5" r="0.75">
            <stop offset="0" style={{ stopColor: 'var(--color-electric-bright)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-electric)' }} />
          </radialGradient>
          <radialGradient id="lr-spot" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" style={{ stopColor: 'var(--color-electric-bright)', stopOpacity: 0.6 }} />
            <stop offset="1" style={{ stopColor: 'var(--color-electric-bright)', stopOpacity: 0 }} />
          </radialGradient>
          <filter id="lr-soft" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
          <filter id="lr-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
        <rect width="100" height="100" style={{ fill: 'var(--color-midnight-deep)' }} />
        <polygon points={`0,0 100,0 ${r},${top} ${l},${top}`} fill="url(#lr-ceiling)" />
        <polygon points={`0,0 ${l},${top} ${l},${bottom} 0,100`} fill="url(#lr-wall-l)" />
        <polygon points={`100,0 ${r},${top} ${r},${bottom} 100,100`} fill="url(#lr-wall-r)" />
        <polygon points={`0,100 ${l},${bottom} ${r},${bottom} 100,100`} fill="url(#lr-floor)" />
        <rect x={l} y={top} width={r - l} height={bottom - top} filter="url(#lr-glow)" style={{ fill: 'var(--color-electric-bright)', opacity: 0.7 }} />
        <rect x={l} y={top} width={r - l} height={bottom - top} fill="url(#lr-panel)" filter={soft ? 'url(#lr-soft)' : undefined} />
        {dim > 0 ? <rect width="100" height="100" style={{ fill: 'var(--color-midnight-deep)', opacity: dim }} /> : null}
        {dim > 0 ? <ellipse cx="50" cy={(top + bottom) / 2} rx="34" ry="36" fill="url(#lr-spot)" /> : null}
        <rect y="72" width="100" height="28" fill="url(#lr-fade)" />
        <linearGradient id="lr-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--color-midnight-deep)', stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: 'var(--color-midnight-deep)' }} />
        </linearGradient>
      </svg>
    </div>
  );
}
