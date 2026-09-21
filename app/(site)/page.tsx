import { BlendedPhoto, FeatureBand, Hero, TrackCard, Vinyl, stagger } from '@/components';
import { getArtist, formatDuration, formatPrice, toPlayerTrack, tracks } from '@/content';
import { site } from '@/content/site';

const FEATURED_SLUGS = ['its-a-good-day', 'blue-skies-yellow-sun', 'harbour-town', 'warm-breeze'];

export default function HomePage() {
  const featured = FEATURED_SLUGS.map((s) => tracks.find((t) => t.slug === s)!);
  return (
    <>
      <Hero
        lines={['THE BLUE', 'GUITAR']}
        eyebrow={site.label}
        tagline={`Robert Dempster writes, produces, mixes and masters his own music in ${site.location}.`}
        cta={{ label: 'Listen Now', href: '/music/' }}
        sleeve={{
          imageSrc: '/images/hero/hero.jpg',
          imageAlt: 'Robert Dempster smiling in a blue embroidered jacket, playing a pale blue guitar',
          labelSrc: '/images/covers/blue-skies-yellow-sun.jpg',
          labelAlt: 'Blue Skies, Yellow Sun cover art on the vinyl label',
        }}
      />

      <FeatureBand
        variant="midnight"
        id="music"
        lines={['THE', 'MUSIC']}
        cta={{ label: 'Hear the Catalogue', href: '/music/' }}
        object={<Vinyl size="xl" glow tilt spin labelSrc="/images/covers/its-a-good-day.jpg" labelAlt="It's a Good Day cover art on the vinyl label" />}
      />

      <section className="bg-midnight pb-20" aria-label="Featured tracks">
        <ul className="mx-auto grid max-w-page gap-6 px-(--spacing-gutter) sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((t, i) => (
            <li key={t.id}>
              <TrackCard
                track={toPlayerTrack(t)}
                coverAlt={`Cover art for ${t.title} by ${getArtist(t.artistId).name}`}
                durationLabel={formatDuration(t.durationSeconds)}
                priceLabel={formatPrice(t.priceCents, t.currency)}
                revealDelay={stagger(i)}
              />
            </li>
          ))}
        </ul>
      </section>

      <FeatureBand
        variant="electric"
        id="film-tv"
        lines={['FILM &', 'TV']}
        eyebrow="For music supervisors"
        cta={{ label: 'License a Track', href: '/licensing/' }}
        object={<BlendedPhoto imageSrc="/images/sections/stage.jpg" imageAlt="Robert Dempster on stage with a fist raised, holding a white guitar" aspect="3/4" position="50% 20%" fade="strong" className="max-w-sm lg:max-w-md" />}
      >
        <p className="max-w-prose text-white/70">
          Robert is the sole writer, producer and rights holder on his own recordings. Filter by mood, genre and tempo; per-track ownership details are confirmed on enquiry.
        </p>
      </FeatureBand>

      <FeatureBand
        variant="fade"
        id="story"
        lines={['THE', 'STORY']}
        cta={{ label: 'About Robert', href: '/about/' }}
        object={<BlendedPhoto imageSrc="/images/sections/poses.webp" imageAlt="Three poses of Robert Dempster in a blue jacket with a blue guitar" aspect="16/9" fade="edges" />}
      >
        <p className="max-w-prose text-white/70">Placeholder copy about the studio and the songs. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </FeatureBand>
    </>
  );
}
