import Link from 'next/link';
import type { NavLink, StreamingLink } from '@/content/types';
import { SocialRail } from './SocialRail';

export interface SiteHeaderProps {
  name: string;
  nav: NavLink[];
  streamingLinks: StreamingLink[];
}

/** Transparent, absolutely positioned over the first band of every page. */
export function SiteHeader({ name, nav, streamingLinks }: SiteHeaderProps) {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto grid max-w-page items-center gap-y-2 px-(--spacing-gutter) py-6 md:grid-cols-3">
        <Link href="/" className="justify-self-center font-display text-lg italic uppercase tracking-wide text-white md:justify-self-start">
          {name}
        </Link>
        <nav aria-label="Main" className="justify-self-center">
          <ul className="flex gap-7 text-sm uppercase tracking-widest">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-white transition-opacity hover:opacity-70">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3 lg:col-span-1 min-[1300px]:hidden">
          <SocialRail links={streamingLinks} orientation="horizontal" />
        </div>
      </div>
    </header>
  );
}
