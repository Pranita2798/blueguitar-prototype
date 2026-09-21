import { notFound } from 'next/navigation';
import { DisplayHeading, PillButton, PillLink, PreviewButton, Reveal, Sleeve } from '@/components';
import { tracks, getTrackBySlug, getArtist, formatDuration, formatPrice, toPlayerTrack } from '@/content';
import { site } from '@/content/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return tracks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTrackBySlug(slug);
  return { title: t ? t.title : 'Track' };
}

export default async function TrackPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const track = getTrackBySlug(slug);
  if (!track) notFound();
  const artist = getArtist(track.artistId);
  return (
    <section className="overflow-hidden bg-midnight pt-36 pb-20 md:pt-44">
      <div className="mx-auto grid max-w-page items-center gap-12 px-(--spacing-gutter) md:grid-cols-2">
        <Reveal variant="fade">
        <Sleeve
          aspect="square"
          imageSrc={track.coverArt}
          imageAlt={`Cover art for ${track.title} by ${artist.name}`}
          labelSrc={track.coverArt}
          labelAlt=""
        />
        </Reveal>
        <Reveal variant="fade" delay={100}>
        <div>
          <DisplayHeading as="h1" size="page" lines={[track.title.toUpperCase()]} />
          <p className="mt-4 text-white/70">{artist.name} · {formatDuration(track.durationSeconds)} · {track.tempoBpm} BPM</p>
          <p className="mt-4 max-w-prose text-white/70">{track.description}</p>
          <p className="mt-2 text-sm text-white/70">Mood: {track.moodTags.join(', ')}. Genre: {track.genreTags.join(', ')}.</p>
          <div className="mt-6">
            <PreviewButton track={toPlayerTrack(track)} size="large" />
          </div>
          <p className="mt-8 text-2xl">{formatPrice(track.priceCents, track.currency)}</p>
          <PillButton disabled aria-label="Purchasing coming soon" className="mt-3">Purchasing coming soon</PillButton>
          <div className="mt-10 border-t border-white/30 pt-4 text-sm">
            <h2 className="font-semibold">Licensing</h2>
            <p className="mt-1 text-white/70">{track.ownershipNote}</p>
            {track.availableForLicensing && (
              <PillLink
                href={`mailto:${site.licensingEmail}?subject=${encodeURIComponent(`Licensing enquiry: ${track.title}`)}`}
                className="mt-3"
              >
                Enquire about licensing
              </PillLink>
            )}
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
