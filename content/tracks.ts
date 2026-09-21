import type { Track } from './types';

const SOLE_NOTE =
  'Robert Dempster is the writer, producer and rights holder of this recording. Ownership details are confirmed on enquiry.';
const COLLAB_NOTE =
  'This track is a collaboration. Rights details are confirmed on enquiry.';

// Titles, credits and durations are verbatim from the live site.
// Mood/genre tags, tempo, prices and descriptions are PLACEHOLDERS.
// Previews are the client's real 30 s mp3s. Full masters are deliberately NOT in public/.
export const tracks: Track[] = [
  {
    id: 'track-01', title: "It's a Good Day", slug: 'its-a-good-day', artistId: 'artist-the-blue-guitar',
    durationSeconds: 348, moodTags: ['uplifting', 'warm'], genreTags: ['blues', 'roots'], tempoBpm: 96,
    coverArt: '/images/covers/its-a-good-day.jpg', priceCents: 129, currency: 'USD',
    description: 'Placeholder description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    availableForLicensing: true, ownershipNote: SOLE_NOTE, audio: [{ variant: 'preview', format: 'mp3', src: '/audio/its-a-good-day-preview.mp3' }],
  },
  {
    id: 'track-02', title: 'Kimberly', slug: 'kimberly', artistId: 'artist-the-blue-guitar',
    durationSeconds: 178, moodTags: ['tender', 'nostalgic'], genreTags: ['blues', 'acoustic'], tempoBpm: 72,
    coverArt: '/images/covers/kimberly.jpg', priceCents: 129, currency: 'USD',
    description: 'Placeholder description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    availableForLicensing: true, ownershipNote: SOLE_NOTE, audio: [{ variant: 'preview', format: 'mp3', src: '/audio/kimberly-preview.mp3' }],
  },
  {
    id: 'track-03', title: 'Turn, Turn', slug: 'turn-turn', artistId: 'artist-the-blue-guitar',
    durationSeconds: 260, moodTags: ['reflective', 'steady'], genreTags: ['blues', 'roots'], tempoBpm: 84,
    coverArt: '/images/covers/turn-turn.jpg', priceCents: 129, currency: 'USD',
    description: 'Placeholder description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    availableForLicensing: true, ownershipNote: SOLE_NOTE, audio: [{ variant: 'preview', format: 'mp3', src: '/audio/turn-turn-preview.mp3' }],
  },
  {
    id: 'track-04', title: 'Blue Skies, Yellow Sun', slug: 'blue-skies-yellow-sun', artistId: 'artist-robert-dempster',
    durationSeconds: 240, moodTags: ['sunny', 'relaxed'], genreTags: ['blues', 'island'], tempoBpm: 100,
    coverArt: '/images/covers/blue-skies-yellow-sun.jpg', priceCents: 129, currency: 'USD',
    description: 'Placeholder description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    availableForLicensing: true, ownershipNote: SOLE_NOTE, audio: [{ variant: 'preview', format: 'mp3', src: '/audio/blue-skies-yellow-sun-preview.mp3' }],
  },
  {
    id: 'track-05', title: "Let's Go Back", slug: 'lets-go-back', artistId: 'artist-the-blue-guitar',
    durationSeconds: 237, moodTags: ['nostalgic', 'driving'], genreTags: ['blues rock'], tempoBpm: 118,
    coverArt: '/images/covers/lets-go-back.jpg', priceCents: 129, currency: 'USD',
    description: 'Placeholder description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    availableForLicensing: true, ownershipNote: SOLE_NOTE, audio: [{ variant: 'preview', format: 'mp3', src: '/audio/lets-go-back-preview.mp3' }],
  },
  {
    id: 'track-06', title: 'Harbour Town', slug: 'harbour-town', artistId: 'artist-the-blue-guitar',
    durationSeconds: 223, moodTags: ['breezy', 'relaxed'], genreTags: ['blues', 'acoustic'], tempoBpm: 88,
    coverArt: '/images/covers/harbour-town.jpg', priceCents: 129, currency: 'USD',
    description: 'Placeholder description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    availableForLicensing: true, ownershipNote: SOLE_NOTE, audio: [{ variant: 'preview', format: 'mp3', src: '/audio/harbour-town-preview.mp3' }],
  },
  {
    id: 'track-07', title: 'Always with You', slug: 'always-with-you', artistId: 'artist-the-blue-guitar',
    durationSeconds: 261, moodTags: ['tender', 'hopeful'], genreTags: ['blues', 'ballad'], tempoBpm: 66,
    coverArt: '/images/covers/always-with-you.jpg', priceCents: 129, currency: 'USD',
    description: 'Placeholder description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    availableForLicensing: true, ownershipNote: SOLE_NOTE, audio: [{ variant: 'preview', format: 'mp3', src: '/audio/always-with-you-preview.mp3' }],
  },
  {
    id: 'track-08', title: 'Living The Dream', slug: 'living-the-dream', artistId: 'artist-the-blue-guitar',
    durationSeconds: 240, moodTags: ['upbeat', 'confident'], genreTags: ['blues rock'], tempoBpm: 112,
    coverArt: '/images/covers/living-the-dream.jpg', priceCents: 129, currency: 'USD',
    description: 'Placeholder description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    availableForLicensing: true, ownershipNote: SOLE_NOTE, audio: [{ variant: 'preview', format: 'mp3', src: '/audio/living-the-dream-preview.mp3' }],
  },
  {
    id: 'track-09', title: 'Warm Breeze', slug: 'warm-breeze', artistId: 'artist-the-blue-guitar',
    durationSeconds: 221, moodTags: ['breezy', 'warm'], genreTags: ['blues', 'island'], tempoBpm: 92,
    coverArt: '/images/covers/warm-breeze.jpg', priceCents: 129, currency: 'USD',
    description: 'Placeholder description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    availableForLicensing: true, ownershipNote: SOLE_NOTE, audio: [{ variant: 'preview', format: 'mp3', src: '/audio/warm-breeze-preview.mp3' }],
  },
  {
    id: 'track-10', title: "It's a Good Day DUBi mix", slug: 'its-a-good-day-dubi-mix',
    artistId: 'artist-the-blue-guitar-and-dubi',
    durationSeconds: 153, moodTags: ['uplifting', 'groovy'], genreTags: ['blues', 'remix'], tempoBpm: 104,
    coverArt: '/images/covers/its-a-good-day-dubi-mix.jpg', priceCents: 129, currency: 'USD',
    description: 'Placeholder description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    availableForLicensing: true, ownershipNote: COLLAB_NOTE, audio: [{ variant: 'preview', format: 'mp3', src: '/audio/its-a-good-day-dubi-mix-preview.mp3' }],
  },
];
