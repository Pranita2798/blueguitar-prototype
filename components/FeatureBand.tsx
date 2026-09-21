import type { ReactNode } from 'react';
import { DisplayHeading } from './DisplayHeading';
import { PillLink } from './Pill';
import { Reveal } from './Reveal';

export interface FeatureBandProps {
  variant: 'electric' | 'midnight' | 'fade';
  lines: string[];
  eyebrow?: string;
  /** Body copy shown under the heading (plain <p> elements). */
  children?: ReactNode;
  cta?: { label: string; href: string };
  /** The big object the heading overlaps: <Vinyl/>, <Duotone/>, an image, etc. */
  object: ReactNode;
  /** Side the heading sits on; the object takes the other side. */
  align?: 'left' | 'right';
  id?: string;
}

// v3: no full-bleed electric outside the hero. 'electric' is a deep band with an electric-tinted glow.
const bg = {
  electric: 'bg-linear-to-b from-midnight-deep via-midnight to-midnight-deep',
  midnight: 'bg-midnight',
  fade: 'bg-linear-to-b from-midnight-deep via-midnight-deep to-midnight',
} as const;

const glow = {
  electric: 'radial-gradient(ellipse 60% 55% at 72% 50%, color-mix(in srgb, var(--color-electric) 30%, transparent), transparent 70%)',
  midnight: 'radial-gradient(ellipse 50% 50% at 75% 50%, color-mix(in srgb, var(--color-electric) 14%, transparent), transparent 70%)',
  fade: 'radial-gradient(ellipse 60% 45% at 50% 100%, color-mix(in srgb, var(--color-electric-deep) 40%, transparent), transparent 75%)',
} as const;

export function FeatureBand({ variant, lines, eyebrow, children, cta, object, align = 'left', id }: FeatureBandProps) {
  const left = align === 'left';
  return (
    <section id={id} className={`grain relative overflow-hidden border-t border-white/20 ${bg[variant]}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow[variant] }} />
      <div className="relative mx-auto max-w-page px-(--spacing-gutter) py-20 md:py-28">
        <div className="relative flex flex-col md:min-h-[30rem] md:flex-row md:items-center">
          <Reveal variant="lines" className={`relative z-10 ${left ? '' : 'md:ml-auto md:text-right'}`}>
            {eyebrow ? <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/70">{eyebrow}</p> : null}
            <DisplayHeading lines={lines} size="band" />
          </Reveal>
          <Reveal
            variant="zoom"
            delay={150}
            className={`-mt-2 flex w-full justify-center md:absolute md:inset-y-0 md:mt-0 md:w-3/5 md:items-center ${left ? 'md:right-0 md:justify-end' : 'md:left-0 md:justify-start'}`}
          >
            <div className={`flex w-full justify-center ${left ? 'md:justify-end' : 'md:justify-start'}`}>{object}</div>
          </Reveal>
        </div>
        {children ? <Reveal delay={200} className="relative z-10 mx-auto mt-10 max-w-prose space-y-4 text-center text-white/70">{children}</Reveal> : null}
        {cta ? (
          <Reveal delay={300} className="relative z-10 mt-10 text-center">
            <PillLink href={cta.href}>{cta.label}</PillLink>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
