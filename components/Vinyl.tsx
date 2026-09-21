export interface VinylProps {
  /** Image shown on the record's centre label (circular crop). */
  labelSrc: string;
  labelAlt: string;
  size?: 'md' | 'lg' | 'xl';
  /** Electric glow rim, as in the template's feature vinyl. */
  glow?: boolean;
  /** Tilt the disc into perspective. */
  tilt?: boolean;
  /** Spin the record (grooves + label) in its own plane, ~8s per turn. Glow, shadow and sheen stay fixed. */
  spin?: boolean;
  className?: string;
}

const sizes = {
  md: 'w-44 sm:w-56',
  lg: 'w-60 sm:w-80',
  xl: 'w-72 sm:w-[30rem] lg:w-[36rem]',
} as const;

/**
 * CSS-only vinyl disc. The outer element carries the tilt, glow rim and shadow; an inner layer carries
 * the grooves and label and is the only thing that rotates, so a tilted disc spins like a record (in the
 * plane of the disc) instead of wobbling like a coin. The light sheen is a fixed overlay.
 */
export function Vinyl({ labelSrc, labelAlt, size = 'lg', glow = false, tilt = false, spin = false, className = '' }: VinylProps) {
  return (
    <div
      className={`relative aspect-square rounded-full ${sizes[size]} ${className}`}
      style={{
        transform: tilt ? 'perspective(1400px) rotate(-22deg) rotateX(52deg)' : undefined,
        boxShadow: glow
          ? '0 0 0 2px var(--color-electric-bright), 0 0 60px 12px var(--color-electric-bright)'
          : '0 10px 40px rgb(0 0 0 / 0.5)',
      }}
    >
      {/* rotating layer: grooves (with faint uneven bands so rotation is visible) + label */}
      <div
        className={`absolute inset-0 rounded-full ${spin ? 'vinyl-spin' : ''}`}
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0 9%, rgb(255 255 255 / 0.05) 11%, transparent 14% 52%, rgb(255 255 255 / 0.04) 55%, transparent 58%), repeating-radial-gradient(circle at center, var(--color-midnight-deep) 0 2px, var(--color-night) 2px 3px)',
        }}
      >
        <div className="absolute left-1/2 top-1/2 aspect-square w-[36%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-midnight-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={labelSrc} alt={labelAlt} className="size-full object-cover" />
          <span aria-hidden className="absolute left-1/2 top-1/2 size-[7%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-midnight-deep" />
        </div>
      </div>
      {/* fixed sheen: light falling on the record, does not rotate */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            'conic-gradient(from 20deg, transparent 0 20%, rgb(255 255 255 / 0.16) 25%, transparent 32% 70%, rgb(255 255 255 / 0.12) 76%, transparent 84%)',
        }}
      />
    </div>
  );
}
