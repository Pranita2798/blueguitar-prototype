import { Vinyl } from './Vinyl';

export interface SleeveProps {
  imageSrc: string;
  imageAlt: string;
  /** Image for the vinyl's centre label. */
  labelSrc: string;
  labelAlt: string;
  /** 'portrait' is 4:5 with the top kept (full face); 'square' suits cover art. */
  aspect?: 'portrait' | 'square';
  className?: string;
}

/** Album sleeve with a record peeking out of its right edge. Clipped by its parent band on mobile. */
export function Sleeve({ imageSrc, imageAlt, labelSrc, labelAlt, aspect = 'portrait', className = '' }: SleeveProps) {
  return (
    <div className={`group relative w-full max-w-[26rem] ${className}`}>
      {/* Group width = sleeve (70.4%) + vinyl overhang (29.6%), so it never leaves its container. */}
      <div className="absolute left-[35.2%] top-1/2 z-0 w-[64.8%] -translate-y-1/2 transition-transform duration-500 group-hover:translate-x-[4%]">
        <Vinyl labelSrc={labelSrc} labelAlt={labelAlt} size="md" glow className="!w-full" />
      </div>
      <div className="relative z-10 w-[70.4%] bg-midnight-deep p-2.5 shadow-2xl ring-1 ring-electric-deep sm:p-3.5">
        <div className={`overflow-hidden bg-midnight ${aspect === 'portrait' ? 'aspect-[4/5]' : 'aspect-square'}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc} alt={imageAlt} className={`size-full ${aspect === 'portrait' ? 'object-cover object-top' : 'object-contain'}`} />
        </div>
      </div>
    </div>
  );
}
