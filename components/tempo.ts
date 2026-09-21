export type TempoBand = 'slow' | 'mid' | 'up';

export const TEMPO_BANDS: { value: TempoBand; label: string }[] = [
  { value: 'slow', label: 'Slow (under 80 BPM)' },
  { value: 'mid', label: 'Mid (80 to 110 BPM)' },
  { value: 'up', label: 'Up-tempo (over 110 BPM)' },
];

export function tempoBand(bpm: number): TempoBand {
  if (bpm < 80) return 'slow';
  if (bpm <= 110) return 'mid';
  return 'up';
}
