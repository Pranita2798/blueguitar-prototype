'use client';

import { useId, useState } from 'react';
import { DisplayHeading } from './DisplayHeading';
import { Reveal } from './Reveal';

export interface EmailCaptureProps {
  heading: string;
  body: string;
  prototypeNotice: string;
}

/** Visual only: the form never submits or stores anything. */
export function EmailCapture({ heading, body, prototypeNotice }: EmailCaptureProps) {
  const id = useId();
  const [tried, setTried] = useState(false);
  return (
    <section aria-label={heading} className="grain relative border-t border-white/20 bg-linear-to-b from-midnight-deep via-midnight to-electric-deep">
      <div className="relative z-10 mx-auto grid max-w-page gap-10 px-(--spacing-gutter) py-16 md:grid-cols-2 md:items-center md:py-20">
        <Reveal variant="lines">
          <DisplayHeading lines={['GET ON', 'THE LIST']} size="compact" />
          <p className="mt-4 max-w-md text-white/70">{body}</p>
        </Reveal>
        <Reveal delay={150}>
        <form onSubmit={(e) => { e.preventDefault(); setTried(true); }} className="space-y-5">
          <div>
            <label htmlFor={`${id}-e`} className="block text-lg">Enter your email here</label>
            <input
              id={`${id}-e`}
              type="email"
              autoComplete="off"
              className="mt-2 w-full border-0 border-b border-white bg-transparent py-2 text-white outline-offset-4 focus:border-electric-bright focus:outline-none focus-visible:border-b-2"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <label className="flex items-center gap-3 text-base">
              <input type="checkbox" className="size-5 accent-electric" />
              Yes, subscribe me to your newsletter.
            </label>
            <button type="submit" className="bg-electric px-10 py-3 text-base text-white transition-colors hover:bg-electric-bright">
              Submit
            </button>
          </div>
          <p role="status" className="text-sm">
            <span className="mr-2 rounded-full border border-white px-2.5 py-0.5 text-xs uppercase tracking-widest">Prototype</span>
            {tried ? 'Nothing was sent. This form is a design mock-up.' : prototypeNotice}
          </p>
        </form>
        </Reveal>
      </div>
    </section>
  );
}
