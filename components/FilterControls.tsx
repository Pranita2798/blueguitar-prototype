'use client';

import { PillButton } from './Pill';

export interface FilterGroup {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  /** '' means "all" */
  value: string;
  onChange: (value: string) => void;
}

export interface FilterControlsProps {
  groups: FilterGroup[];
  onReset: () => void;
  resultCount?: number;
  className?: string;
}

/** Controlled pill-toggle filters (mood, genre, tempo). Filtering logic lives in the page. */
export function FilterControls({ groups, onReset, resultCount, className = '' }: FilterControlsProps) {
  return (
    <form role="search" aria-label="Filter catalogue" onSubmit={(e) => e.preventDefault()} className={`space-y-6 ${className}`}>
      {groups.map((g) => (
        <fieldset key={g.id}>
          <legend className="mb-2 text-xs uppercase tracking-[0.3em] text-white/70">{g.label}</legend>
          <div className="flex flex-wrap gap-2">
            <PillButton pressed={g.value === ''} onClick={() => g.onChange('')} className="!px-5 !py-1.5">All</PillButton>
            {g.options.map((o) => (
              <PillButton key={o.value} pressed={g.value === o.value} onClick={() => g.onChange(g.value === o.value ? '' : o.value)} className="!px-5 !py-1.5">
                {o.label}
              </PillButton>
            ))}
          </div>
        </fieldset>
      ))}
      <div className="flex flex-wrap items-center gap-4">
        <PillButton onClick={onReset} className="!px-5 !py-1.5">Reset filters</PillButton>
        {resultCount !== undefined ? (
          <p role="status" aria-live="polite" className="text-sm text-white/70">
            {resultCount} {resultCount === 1 ? 'track' : 'tracks'} shown
          </p>
        ) : null}
      </div>
    </form>
  );
}
