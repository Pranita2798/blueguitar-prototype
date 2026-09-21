'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';

export type RevealVariant = 'up' | 'fade' | 'zoom' | 'lines';

export interface RevealProps {
  variant?: RevealVariant;
  /** Extra delay in ms (see `stagger`). */
  delay?: number;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

// One shared observer; each element is revealed once, then unobserved.
type Callback = () => void;
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, Callback>();

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          callbacks.get(e.target)?.();
          callbacks.delete(e.target);
          observer?.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
    );
  }
  return observer;
}

/**
 * Gentle scroll reveal. Fail-safe by construction: content is server-rendered visible, and is only hidden
 * (data-reveal="hidden") after mount, and only for elements that start below the fold. Without JS, without
 * IntersectionObserver, or with prefers-reduced-motion, nothing is ever hidden. Transform/opacity only.
 */
export function Reveal({ variant = 'up', delay = 0, as: Tag = 'div', className = '', children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<'visible' | 'hidden' | 'shown'>('visible');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // already on screen at load: leave visible (no flash)
    if (el.getBoundingClientRect().top < window.innerHeight * 0.88) return;
    setState('hidden');
    callbacks.set(el, () => setState('shown'));
    getObserver().observe(el);
    return () => {
      callbacks.delete(el);
      observer?.unobserve(el);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-reveal={state === 'visible' ? undefined : state}
      data-reveal-variant={variant}
      style={{ '--rd': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
