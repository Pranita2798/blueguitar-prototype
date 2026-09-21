import type { ReactNode } from 'react';
import { DisplayHeading } from './DisplayHeading';
import { LitRoom } from './LitRoom';

export interface PageHeaderProps {
  lines: string[];
  eyebrow?: string;
  children?: ReactNode;
  variant?: 'electric' | 'midnight';
}

/** Inner-page title band. First element on every inner page; pads itself below the transparent header. */
export function PageHeader({ lines, eyebrow, children, variant = 'electric' }: PageHeaderProps) {
  return (
    <section className="grain relative isolate overflow-hidden bg-midnight-deep">
      {variant === 'electric' ? <LitRoom top={10} bottom={88} dim={0.72} soft /> : null}
      <div className="mx-auto max-w-page px-(--spacing-gutter) pb-16 pt-40 text-center md:pb-24">
        {eyebrow ? <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/70">{eyebrow}</p> : null}
        <DisplayHeading lines={lines} as="h1" size="page" enter />
        {children ? <div className="mx-auto mt-6 max-w-2xl text-lg text-white/90">{children}</div> : null}
      </div>
      <div className="border-t border-white/20" />
    </section>
  );
}
