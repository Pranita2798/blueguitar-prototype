'use client';

import { usePlayer } from './PlayerProvider';
import type { PlayerTrack } from './PlayerProvider';
import { PauseIcon, PlayIcon } from './icons';

export interface PreviewButtonProps {
  track: PlayerTrack;
  /** 'icon' = round outline button for cards, 'large' = labelled pill for detail pages */
  size?: 'icon' | 'large';
  className?: string;
}

export function PreviewButton({ track, size = 'icon', className = '' }: PreviewButtonProps) {
  const { toggle, isPlayingId } = usePlayer();
  const playing = isPlayingId(track.id);
  const label = `${playing ? 'Pause' : 'Play'} preview of ${track.title}`;
  const Icon = playing ? PauseIcon : PlayIcon;
  const state = playing ? 'bg-white text-midnight-deep' : 'bg-transparent text-white hover:bg-white hover:text-midnight-deep';
  if (size === 'large') {
    return (
      <button
        type="button"
        aria-label={label}
        aria-pressed={playing}
        onClick={() => toggle(track)}
        className={`inline-flex items-center gap-3 rounded-full border border-white px-7 py-2.5 text-sm tracking-wide transition-colors ${state} ${className}`}
      >
        <Icon className="size-4" />
        {playing ? 'Pause preview' : 'Play preview'}
      </button>
    );
  }
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={playing}
      onClick={() => toggle(track)}
      className={`flex size-11 items-center justify-center rounded-full border border-white transition-colors ${state} ${className}`}
    >
      <Icon className="size-5" />
    </button>
  );
}
