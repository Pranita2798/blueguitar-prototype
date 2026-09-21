export interface BlendedPhotoProps {
  imageSrc: string;
  imageAlt: string;
  /** CSS aspect-ratio value, e.g. '4 / 3'. */
  aspect?: string;
  /**
   * 'soft' fades the edges gently; 'strong' fades hard (use for photos with their own flat/white background);
   * 'edges' feathers the sides and top tightly (about 7% and 5%) with a longer fade across the lower part of the frame
   * (use for wide group shots whose subjects reach the corners; faces low in the frame need `position` or another fade).
   */
  fade?: 'soft' | 'strong' | 'edges';
  /** CSS object-position for the crop, e.g. '50% 20%' to keep a face near the top in frame. */
  position?: string;
  className?: string;
}

// Mask colour is an opacity carrier only (any opaque colour works), not a palette choice.
const masks = {
  soft: 'radial-gradient(ellipse 78% 78% at 50% 50%, var(--color-white) 52%, transparent 100%)',
  strong: 'radial-gradient(ellipse 58% 62% at 50% 50%, var(--color-white) 22%, transparent 92%)',
  edges:
    'linear-gradient(to right, transparent, var(--color-white) 7%, var(--color-white) 93%, transparent), ' +
    'linear-gradient(to bottom, transparent, var(--color-white) 5%, var(--color-white) 72%, transparent)',
} as const;

const vignettes = {
  soft: { background: 'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 35%, var(--color-midnight-deep) 100%)', opacity: 0.4 },
  strong: { background: 'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 35%, var(--color-midnight-deep) 100%)', opacity: 0.75 },
  // centred high and wide so faces near the top corners stay lit
  edges: { background: 'radial-gradient(ellipse 80% 70% at 50% 40%, transparent 50%, var(--color-midnight-deep) 100%)', opacity: 0.6 },
} as const;

/**
 * Photograph in natural colour (light grade, lifted blacks) whose edges fade into the dark band via
 * an alpha mask, over a soft electric glow. Replaces the old duotone treatment for photos.
 */
export function BlendedPhoto({ imageSrc, imageAlt, aspect = '4 / 3', fade = 'soft', position, className = '' }: BlendedPhotoProps) {
  return (
    <div className={`relative isolate w-full ${className}`} style={{ aspectRatio: aspect }}>
      <div
        aria-hidden
        className="absolute -inset-[12%] -z-10"
        style={{ background: 'radial-gradient(ellipse at 50% 55%, color-mix(in srgb, var(--color-electric) 38%, transparent), transparent 68%)', filter: 'blur(24px)' }}
      />
      <div
        className="absolute inset-0"
        style={{
          maskImage: masks[fade],
          WebkitMaskImage: masks[fade],
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          style={position ? { objectPosition: position } : undefined}
          className={`size-full object-cover saturate-[0.95] contrast-[1.06] ${fade === 'soft' ? '' : 'brightness-90'}`}
        />
        {/* lifted blacks so the photo sits on the dark ground */}
        <div aria-hidden className="absolute inset-0 bg-midnight mix-blend-lighten opacity-70" />
        {/* dark vignette so a bright studio ground falls off into the band; the centre (subject) stays clear */}
        <div aria-hidden className="absolute inset-0" style={vignettes[fade]} />
      </div>
    </div>
  );
}
