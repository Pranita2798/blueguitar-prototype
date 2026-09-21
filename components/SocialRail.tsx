import type { IconPlatform } from './icons';
import { SocialIconLink } from './SocialIconLink';

export interface SocialRailProps {
  links: { platform: IconPlatform; label: string; href: string }[];
  /** 'vertical' = fixed to the right edge (only from 1300px, where it clears the 76rem content column); 'horizontal' = inline row (mobile header). */
  orientation?: 'vertical' | 'horizontal';
}

export function SocialRail({ links, orientation = 'vertical' }: SocialRailProps) {
  const vertical = orientation === 'vertical';
  return (
    <ul
      aria-label="Listen on streaming platforms"
      className={
        vertical
          ? 'fixed right-1 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 py-3 min-[1300px]:flex before:pointer-events-none before:absolute before:-inset-y-10 before:right-0 before:w-px before:bg-linear-to-b before:from-transparent before:via-white/30 before:to-transparent'
          : 'flex flex-wrap items-center justify-center gap-2'
      }
    >
      {links.map((l) => (
        <li key={l.platform}>
          <SocialIconLink platform={l.platform} label={l.label} href={l.href} prefix="Listen on " />
        </li>
      ))}
    </ul>
  );
}
