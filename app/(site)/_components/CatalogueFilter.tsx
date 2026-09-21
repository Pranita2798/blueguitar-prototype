'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FilterControls, PreviewButton, TEMPO_BANDS, tempoBand } from '@/components';
import type { PlayerTrack } from '@/components';

export interface CatalogueRow {
  id: string;
  title: string;
  slug: string;
  artistName: string;
  durationLabel: string;
  tempoBpm: number;
  moodTags: string[];
  genreTags: string[];
  coverArt: string;
  player: PlayerTrack;
}

const toOptions = (xs: string[]) => xs.map((x) => ({ value: x, label: x }));

export default function CatalogueFilter({ rows, moods, genres }: { rows: CatalogueRow[]; moods: string[]; genres: string[] }) {
  const [mood, setMood] = useState('');
  const [genre, setGenre] = useState('');
  const [tempo, setTempo] = useState('');

  const shown = useMemo(
    () =>
      rows.filter(
        (r) =>
          (!mood || r.moodTags.includes(mood)) &&
          (!genre || r.genreTags.includes(genre)) &&
          (!tempo || tempoBand(r.tempoBpm) === tempo),
      ),
    [rows, mood, genre, tempo],
  );

  return (
    <div>
      <FilterControls
        resultCount={shown.length}
        onReset={() => { setMood(''); setGenre(''); setTempo(''); }}
        groups={[
          { id: 'mood', label: 'Mood', options: toOptions(moods), value: mood, onChange: setMood },
          { id: 'genre', label: 'Genre', options: toOptions(genres), value: genre, onChange: setGenre },
          { id: 'tempo', label: 'Tempo', options: TEMPO_BANDS, value: tempo, onChange: setTempo },
        ]}
      />
      <ul className="mt-6 divide-y divide-white/30">
        {shown.map((r) => (
          <li key={r.id} className="flex items-center gap-4 py-3">
            <img src={r.coverArt} alt={`Cover art for ${r.title}`} className="h-14 w-14 shrink-0 rounded-card object-cover" />
            <div className="min-w-0 flex-1">
              <Link href={`/music/${r.slug}/`} className="font-display text-xl font-normal italic hover:underline">{r.title}</Link>
              <p className="text-sm text-white/70">{r.artistName} · {r.durationLabel} · {r.tempoBpm} BPM</p>
              <p className="text-xs text-white/70">{r.moodTags.join(', ')} / {r.genreTags.join(', ')}</p>
            </div>
            <PreviewButton track={r.player} />
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p className="mt-4 text-white/70">No tracks match these filters.</p>}
    </div>
  );
}
