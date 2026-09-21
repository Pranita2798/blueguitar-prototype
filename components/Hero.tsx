import { DisplayHeading } from './DisplayHeading';
import { HeroLights } from './HeroLights';
import { LitRoom } from './LitRoom';
import { PillLink } from './Pill';
import { Sleeve } from './Sleeve';

export interface HeroProps {
  lines: string[];
  eyebrow?: string;
  tagline?: string;
  cta: { label: string; href: string };
  sleeve: { imageSrc: string; imageAlt: string; labelSrc: string; labelAlt: string };
}

/** Lit-room hero: centred name, pill CTA, portrait sleeve with vinyl. First element on the home page. */
export function Hero({ lines, eyebrow, tagline, cta, sleeve }: HeroProps) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-midnight-deep">
      <LitRoom />
      <HeroLights />
      <div className="relative z-10 mx-auto flex w-full max-w-page flex-col items-center px-(--spacing-gutter) pb-28 pt-40 text-center md:pt-44">
        {eyebrow ? <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/70">{eyebrow}</p> : null}
        <DisplayHeading lines={lines} as="h1" size="hero" />
        {tagline ? <p className="mt-6 max-w-xl text-base sm:text-lg text-white/70">{tagline}</p> : null}
        <PillLink href={cta.href} className="mt-8">{cta.label}</PillLink>
        <div className="mt-14 flex w-full justify-center">
          <Sleeve {...sleeve} />
        </div>
      </div>
    </section>
  );
}
