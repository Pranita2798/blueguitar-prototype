import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;
const base = { viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true, focusable: false } as const;

export const PlayIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M8 5.5v13a1 1 0 0 0 1.53.85l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5Z" /></svg>
);
export const PauseIcon = (p: IconProps) => (
  <svg {...base} {...p}><rect x="6" y="5" width="4.5" height="14" rx="1" /><rect x="13.5" y="5" width="4.5" height="14" rx="1" /></svg>
);

const SpotifyIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.75.75 0 0 1-1.03.25c-2.8-1.7-6.3-2.1-10.4-1.15a.75.75 0 1 1-.33-1.46c4.5-1.04 8.4-.6 11.5 1.33.35.22.46.68.26 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.2-1.97-8.08-2.54-11.87-1.39a.94.94 0 1 1-.55-1.8c4.33-1.31 9.7-.68 13.4 1.6.44.27.58.85.31 1.28Zm.13-3.4C14.35 7.45 8 7.24 4.33 8.36a1.12 1.12 0 1 1-.65-2.15c4.22-1.28 11.2-1.03 15.6 1.58a1.12 1.12 0 0 1-1.08 1.94Z" /></svg>
);
const AppleMusicIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M17 3.2 9.5 4.7A1 1 0 0 0 8.7 5.7v9.6a3.2 3.2 0 1 0 1.8 2.9V9.6l5-1v5.7a3.2 3.2 0 1 0 1.8 2.9V4.2a1 1 0 0 0-1.3-1Z" /></svg>
);
const YouTubeIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M21.6 7.2a2.5 2.5 0 0 0-1.75-1.77C18.3 5 12 5 12 5s-6.3 0-7.85.43A2.5 2.5 0 0 0 2.4 7.2C2 8.76 2 12 2 12s0 3.24.4 4.8a2.5 2.5 0 0 0 1.75 1.77C5.7 19 12 19 12 19s6.3 0 7.85-.43a2.5 2.5 0 0 0 1.75-1.77C22 15.24 22 12 22 12s0-3.24-.4-4.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" /></svg>
);
const AmazonMusicIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M4 8.5v7a1 1 0 0 0 1 1h1.5V7.5H5a1 1 0 0 0-1 1Zm4.5-3v13h1.7v-13H8.5Zm4 2.5v8h1.7V8h-1.7Zm4-1.5v11h1.7v-11h-1.7ZM20 9.5v5h1.5a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5H20Z" /></svg>
);
const BandcampIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M2 17.5 8.5 6.5H22l-6.5 11H2Z" /></svg>
);
const SoundCloudIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M3 14.5v3h1v-3H3Zm2.5-1.5v4.5h1V13h-1Zm2.5-1.5v6h1v-6H8Zm2.5-1v7h1v-7h-1Zm2.5-.5v7.5h7a3 3 0 0 0 .3-6 4.5 4.5 0 0 0-7.3-1.5Z" /></svg>
);

const InstagramIcon = (p: IconProps) => (
  <svg {...base} {...p}><path fillRule="evenodd" d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" /></svg>
);
const FacebookIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M13.5 22v-8.2h2.8l.5-3.4h-3.3V8.3c0-1 .3-1.6 1.7-1.6h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.6H7.4v3.4h2.8V22h3.3Z" /></svg>
);
const XIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M17.75 3h3.1l-6.77 7.74L22 21h-6.24l-4.89-6.39L5.28 21H2.17l7.24-8.28L1.9 3h6.4l4.42 5.84L17.75 3Zm-1.09 16.14h1.72L7.3 4.76H5.45l11.21 14.38Z" /></svg>
);
const TikTokIcon = (p: IconProps) => (
  <svg {...base} {...p}><path d="M16.6 2h-3.1v13.2a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .8.1V9.2a6 6 0 1 0 5.2 5.9V8.6a7.4 7.4 0 0 0 4.3 1.4V6.9a4.3 4.3 0 0 1-4.3-4.3V2Z" /></svg>
);
const ThreadsIcon = (p: IconProps) => (
  <svg {...base} {...p} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 11.2C17.4 7.9 15.4 6 12.3 6 9 6 6.5 8.4 6.5 12s2.4 6 5.7 6c2.6 0 4.4-1.4 4.4-3.5 0-2-1.6-3-3.7-3-1.6 0-2.7.8-2.7 2s1 1.9 2.2 1.9c2 0 2.8-1.7 2.6-4.4" />
  </svg>
);

export type IconPlatform =
  | 'spotify' | 'apple-music' | 'youtube' | 'amazon-music' | 'bandcamp' | 'soundcloud'
  | 'instagram' | 'facebook' | 'threads' | 'tiktok' | 'x';

const map: Record<IconPlatform, (p: IconProps) => React.JSX.Element> = {
  spotify: SpotifyIcon,
  'apple-music': AppleMusicIcon,
  youtube: YouTubeIcon,
  'amazon-music': AmazonMusicIcon,
  bandcamp: BandcampIcon,
  soundcloud: SoundCloudIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  threads: ThreadsIcon,
  tiktok: TikTokIcon,
  x: XIcon,
};

export function PlatformIcon({ platform, ...p }: { platform: IconPlatform } & IconProps) {
  const Icon = map[platform];
  return <Icon {...p} />;
}
