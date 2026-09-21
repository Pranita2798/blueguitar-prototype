import type { CSSProperties } from 'react';

export interface DisplayHeadingProps {
  /** One array item per visual line, e.g. ['VINYL', '& MERCH']. */
  lines: string[];
  as?: 'h1' | 'h2' | 'h3';
  size?: 'hero' | 'band' | 'page' | 'compact';
  /** CSS-only entrance on load for above-the-fold titles (no JS). */
  enter?: boolean;
  className?: string;
}

const sizes = {
  hero: 'text-display-hero',
  band: 'text-display-band',
  page: 'text-display-page',
  compact: 'text-display-compact',
} as const;

/** Giant light italic Didone caps, tight leading, lines stacked. */
export function DisplayHeading({ lines, as: Tag = 'h2', size = 'band', enter = false, className = '' }: DisplayHeadingProps) {
  return (
    <Tag className={`font-display font-normal italic uppercase tracking-tight text-white ${sizes[size]} ${className}`}>
      {lines.map((l, i) => (
        <span key={i} data-reveal-line style={{ '--i': i } as CSSProperties} className={`block ${enter ? 'enter-line' : ''}`}>{l}</span>
      ))}
    </Tag>
  );
}
