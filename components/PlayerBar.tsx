'use client';

import Link from 'next/link';
import { usePlayer } from './PlayerProvider';
import { PauseIcon, PlayIcon } from './icons';

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

/** Docked persistent player. Render once, inside <PlayerProvider>, in the root layout. */
export function PlayerBar() {
  const { current, isPlaying, currentTime, duration, toggle, seek } = usePlayer();
  const max = Number.isFinite(duration) && duration > 0 ? duration : 0;
  return (
    <div
      role="region"
      aria-label="Audio player"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/30 bg-midnight-deep/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-page items-center gap-3 px-(--spacing-gutter) py-3 sm:gap-5">
        {current ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.coverArt} alt="" className="size-12 shrink-0 bg-midnight object-contain" />
            <div className="min-w-0 flex-1 sm:w-56 sm:flex-none">
              <Link href={current.href} className="block truncate text-sm font-semibold text-white hover:opacity-70">
                {current.title}
              </Link>
              <p className="truncate text-xs text-white/70">{current.artistName}</p>
            </div>
            <button
              type="button"
              aria-label={isPlaying ? `Pause ${current.title}` : `Play ${current.title}`}
              onClick={() => toggle()}
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-midnight-deep"
            >
              {isPlaying ? <PauseIcon className="size-5" /> : <PlayIcon className="size-5" />}
            </button>
            <div className="hidden flex-1 items-center gap-3 sm:flex">
              <span className="w-10 text-right text-xs tabular-nums text-white/70">{fmt(currentTime)}</span>
              <input
                type="range"
                aria-label="Seek"
                aria-valuetext={`${fmt(currentTime)} of ${fmt(max)}`}
                min={0}
                max={max || 1}
                step={0.1}
                value={Math.min(currentTime, max || 1)}
                disabled={!max}
                onChange={(e) => seek(Number(e.target.value))}
                className="h-1 flex-1 accent-electric-bright"
              />
              <span className="w-10 text-xs tabular-nums text-white/70">{fmt(max)}</span>
            </div>
          </>
        ) : (
          <p className="text-sm text-white/70">Choose a track to hear a preview.</p>
        )}
      </div>
    </div>
  );
}
