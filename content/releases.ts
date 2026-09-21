import type { Release } from './types';

// PLACEHOLDER: album title and release date are unknown. The DUBi mix (track-10) is not an album track.
export const releases: Release[] = [
  {
    id: 'release-album-01',
    title: 'Untitled Album (placeholder)',
    slug: 'untitled-album',
    type: 'album',
    releaseDate: null,
    artwork: '/images/covers/album-placeholder.jpg',
    trackIds: ['track-01', 'track-02', 'track-03', 'track-04', 'track-05', 'track-06', 'track-07', 'track-08', 'track-09'],
  },
];
