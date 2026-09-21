import { PlatformIcon } from './icons';
import type { IconPlatform } from './icons';

export interface SocialIconLinkProps {
  platform: IconPlatform;
  /** Accessible name; "Listen on X" style text is added by the caller via `prefix`. */
  label: string;
  href: string;
  prefix?: string;
  /** 'rail' = 26px glyph (24px on mobile); 'footer' = 24px glyph; both in a 44px target. */
  size?: 'rail' | 'footer';
}

/** Icon link with hover / keyboard-focus animation (scale, brighten, soft glow). */
export function SocialIconLink({ platform, label, href, prefix = '', size = 'rail' }: SocialIconLinkProps) {
  const box = 'size-11';
  const glyph = size === 'rail' ? 'size-6 md:size-[26px]' : 'size-6';
  return (
    <a
      href={href}
      aria-label={`${prefix}${label}`}
      title={label}
      className={`group flex ${box} items-center justify-center rounded-full text-white/70 transition-[color,scale,background-color] duration-200 ease-out hover:scale-115 hover:bg-white/10 hover:text-white focus-visible:scale-115 focus-visible:bg-white/10 focus-visible:text-white motion-reduce:hover:scale-100 motion-reduce:focus-visible:scale-100`}
    >
      <PlatformIcon
        platform={platform}
        className={`${glyph} transition-[filter] duration-200 ease-out group-hover:drop-shadow-[0_0_8px_var(--color-electric-bright)] group-focus-visible:drop-shadow-[0_0_8px_var(--color-electric-bright)]`}
      />
    </a>
  );
}
