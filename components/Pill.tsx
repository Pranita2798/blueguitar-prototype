import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'outline' | 'solid';

const base =
  'inline-flex items-center justify-center rounded-full border border-white px-7 py-2.5 text-sm tracking-wide transition-colors';
const variants: Record<Variant, string> = {
  outline: 'bg-transparent text-white hover:bg-white hover:text-midnight-deep',
  solid: 'bg-white text-midnight-deep hover:bg-transparent hover:text-white',
};

export interface PillLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

/** Thin white-outline pill link. Internal routes use next/link; mailto:, http(s) and '#' use <a>. */
export function PillLink({ href, children, variant = 'outline', className = '' }: PillLinkProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href.startsWith('/')) return <Link href={href} className={cls}>{children}</Link>;
  return <a href={href} className={cls}>{children}</a>;
}

export interface PillButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: Variant;
  /** Toggle state; when set, renders aria-pressed and the filled style while true. */
  pressed?: boolean;
  className?: string;
  'aria-label'?: string;
}

export function PillButton({
  children, onClick, disabled, type = 'button', variant = 'outline', pressed, className = '', 'aria-label': ariaLabel,
}: PillButtonProps) {
  const filled = pressed === true || variant === 'solid';
  const cls = `${base} ${filled ? variants.solid : variants.outline} ${disabled ? 'cursor-not-allowed opacity-50 hover:bg-transparent hover:text-white' : 'cursor-pointer'} ${className}`;
  return (
    <button type={type} onClick={onClick} disabled={disabled} aria-pressed={pressed} aria-label={ariaLabel} className={cls}>
      {children}
    </button>
  );
}
