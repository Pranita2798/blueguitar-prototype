import Link from 'next/link';
import type { NavLink } from '@/content/types';
import type { IconPlatform } from './icons';
import { SocialIconLink } from './SocialIconLink';

export interface SiteFooterProps {
  name: string;
  label: string;
  location: string;
  nav: NavLink[];
  footerNote: string;
  socialLinks: { platform: IconPlatform; label: string; href: string }[];
}

export function SiteFooter({ name, label, location, nav, footerNote, socialLinks }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/20 bg-midnight-deep px-(--spacing-gutter) py-6 text-center text-xs text-white/70">
      {socialLinks.length > 0 ? (
        <ul aria-label="Follow" className="mb-4 flex flex-wrap items-center justify-center gap-3">
          {socialLinks.map((l) => (
            <li key={l.platform}>
              <SocialIconLink platform={l.platform} label={l.label} href={l.href} size="footer" prefix="Follow on " />
            </li>
          ))}
        </ul>
      ) : null}
      <nav aria-label="Footer" className="mb-2">
        <ul className="flex justify-center gap-5 uppercase tracking-widest">
          {nav.map((n) => (
            <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>
          ))}
        </ul>
      </nav>
      <p>{name} · {label} · {location}</p>
      <p className="mt-1">{footerNote}</p>
    </footer>
  );
}
