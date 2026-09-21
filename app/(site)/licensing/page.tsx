import { PageHeader, PillLink, Reveal } from '@/components';
import { tracks, getArtist, formatDuration, allMoods, allGenres, toPlayerTrack } from '@/content';
import { site } from '@/content/site';
import CatalogueFilter from '../_components/CatalogueFilter';

export const metadata = { title: 'Licensing' };

export default function LicensingPage() {
  const rows = tracks
    .filter((t) => t.availableForLicensing)
    .map((t) => ({
      id: t.id, title: t.title, slug: t.slug,
      artistName: getArtist(t.artistId).name,
      durationLabel: formatDuration(t.durationSeconds),
      tempoBpm: t.tempoBpm, moodTags: t.moodTags, genreTags: t.genreTags,
      coverArt: t.coverArt, player: toPlayerTrack(t),
    }));
  return (
    <>
      <PageHeader lines={['FILM, TV', '& ADS']} variant="electric">
        <p className="max-w-prose text-white/70">
          Robert Dempster is the sole writer, producer and rights holder on his own recordings. Per-track ownership details are confirmed on enquiry.
        </p>
      </PageHeader>
      <div className="mx-auto max-w-page px-(--spacing-gutter) py-16">
        <Reveal variant="up">
          <h2 className="mb-6 font-display text-3xl italic">Find the right track</h2>
          <CatalogueFilter rows={rows} moods={allMoods} genres={allGenres} />
        </Reveal>
        <Reveal as="section" variant="up" className="mt-16 border-t border-white/30 pt-10">
          <h2 className="font-display text-3xl italic">Enquire</h2>
          <p className="mt-2 max-w-prose text-white/70">Tell us the project, territory and track(s) you have in mind.</p>
          <PillLink href={`mailto:${site.licensingEmail}?subject=${encodeURIComponent('Licensing enquiry')}`} className="mt-5">
            Email {site.licensingEmail}
          </PillLink>
        </Reveal>
      </div>
    </>
  );
}
