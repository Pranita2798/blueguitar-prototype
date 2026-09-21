import { PageHeader, TrackCard, stagger } from '@/components';
import { tracks, getArtist, formatDuration, formatPrice, toPlayerTrack } from '@/content';

export const metadata = { title: 'Music' };

export default function MusicPage() {
  return (
    <>
      <PageHeader lines={['THE', 'CATALOGUE']} variant="electric" />
      <div className="mx-auto max-w-page px-(--spacing-gutter) py-16">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((t, i) => (
            <li key={t.id}>
              <TrackCard
                track={toPlayerTrack(t)}
                coverAlt={`Cover art for ${t.title} by ${getArtist(t.artistId).name}`}
                durationLabel={formatDuration(t.durationSeconds)}
                priceLabel={formatPrice(t.priceCents, t.currency)}
                tags={t.moodTags}
                revealDelay={stagger(i % 6)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
