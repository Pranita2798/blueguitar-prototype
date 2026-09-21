import Link from 'next/link';
import type { PlayerTrack } from './PlayerProvider';
import { PreviewButton } from './PreviewButton';
import { Reveal } from './Reveal';

export interface TrackCardProps {
  /** Object handed to the player; also supplies title, artist, cover and page link. */
  track: PlayerTrack;
  coverAlt: string;
  durationLabel: string;
  priceLabel?: string;
  tags?: string[];
  /** Reveal delay in ms; in a grid pass `stagger(i)`. */
  revealDelay?: number;
}

export function TrackCard({ track, coverAlt, durationLabel, priceLabel, tags, revealDelay = 0 }: TrackCardProps) {
  return (
    <Reveal as="article" delay={revealDelay} className="group">
      <div className="relative">
        <Link href={track.href} className="block aspect-square overflow-hidden bg-midnight ring-1 ring-electric-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={track.coverArt}
            alt={coverAlt}
            loading="lazy"
            className="size-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <PreviewButton track={track} className="absolute bottom-3 right-3 bg-midnight-deep/70 backdrop-blur-sm" />
      </div>
      <div className="mt-4 min-w-0">
        <h3 className="font-display text-2xl italic leading-tight text-white">
          <Link href={track.href} className="hover:opacity-70">{track.title}</Link>
        </h3>
        <p className="text-sm text-white/70">{track.artistName}</p>
        <p className="mt-1 flex gap-3 text-xs text-white/70">
          <span>{durationLabel}</span>
          {priceLabel ? <span>{priceLabel}</span> : null}
        </p>
      </div>
      {tags && tags.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <li key={t} className="rounded-full border border-white/30 px-2.5 py-0.5 text-xs text-white/70">{t}</li>
          ))}
        </ul>
      ) : null}
    </Reveal>
  );
}
