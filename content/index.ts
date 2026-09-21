import { artists } from './artists';
import { releases } from './releases';
import { tracks } from './tracks';
import type { Artist, Release, Track } from './types';

export { artists, releases, tracks };

export function getArtist(id: string): Artist {
  const a = artists.find((x) => x.id === id);
  if (!a) throw new Error(`Unknown artist id: ${id}`);
  return a;
}
export function getTrackBySlug(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug);
}
export function getPreviewSrc(track: Track): string {
  const p = track.audio.find((a) => a.variant === 'preview');
  if (!p) throw new Error(`Track ${track.id} has no preview variant`);
  return p.src;
}
export function formatPrice(cents: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(cents / 100);
}
export function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
export function getRelease(slug: string): Release | undefined {
  return releases.find((r) => r.slug === slug);
}
export function getTracksForRelease(release: Release): Track[] {
  return release.trackIds.map((id) => tracks.find((t) => t.id === id)).filter((t): t is Track => !!t);
}

/** Serialisable object handed to the audio player (see components/README.md). */
export interface PlayerTrack {
  id: string; title: string; artistName: string; coverArt: string; previewSrc: string; href: string;
}
export function toPlayerTrack(track: Track): PlayerTrack {
  return {
    id: track.id,
    title: track.title,
    artistName: getArtist(track.artistId).name,
    coverArt: track.coverArt,
    previewSrc: getPreviewSrc(track),
    href: `/music/${track.slug}/`,
  };
}

export const allMoods = [...new Set(tracks.flatMap((t) => t.moodTags))].sort();
export const allGenres = [...new Set(tracks.flatMap((t) => t.genreTags))].sort();
