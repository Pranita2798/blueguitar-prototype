export interface DuotoneProps {
  imageSrc: string;
  imageAlt: string;
  /** CSS aspect-ratio value, e.g. '4 / 3'. */
  aspect?: string;
  className?: string;
}

/** Decorative blue-tinted image (tint capped at ~25% so it still reads as a photograph). Prefer BlendedPhoto for photos. */
export function Duotone({ imageSrc, imageAlt, aspect = '4 / 3', className = '' }: DuotoneProps) {
  return (
    <div className={`relative isolate w-full overflow-hidden bg-midnight-deep ${className}`} style={{ aspectRatio: aspect }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt={imageAlt} loading="lazy" className="size-full object-cover saturate-90" />
      <div aria-hidden className="absolute inset-0 bg-electric opacity-25 mix-blend-multiply" />
    </div>
  );
}
