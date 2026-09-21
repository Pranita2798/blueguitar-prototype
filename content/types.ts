export type AudioVariant = 'preview' | 'master' | 'instrumental' | 'stem';
export type AudioFormat = 'mp3' | 'wav' | 'flac' | 'aac' | 'ogg';
export interface AudioFile { variant: AudioVariant; format: AudioFormat; src: string; }
export type ReleaseType = 'single' | 'EP' | 'album' | 'compilation';
export type CurrencyCode = 'USD';

export interface Artist { id: string; name: string; slug: string; bio: string; photo: string; }
export interface Release {
  id: string; title: string; slug: string; type: ReleaseType;
  releaseDate: string | null; // ISO date; null = not yet confirmed (never invent one)
  artwork: string; trackIds: string[];
}
export interface Track {
  id: string; title: string; slug: string; artistId: string; durationSeconds: number;
  moodTags: string[]; genreTags: string[]; tempoBpm: number; coverArt: string;
  priceCents: number; currency: CurrencyCode; description: string;
  availableForLicensing: boolean; ownershipNote: string; audio: AudioFile[];
}

export type StreamingPlatform = 'spotify' | 'apple-music' | 'youtube' | 'amazon-music' | 'bandcamp' | 'soundcloud';
export type SocialPlatform = 'instagram' | 'facebook' | 'threads' | 'tiktok' | 'x';
export interface NavLink { label: string; href: string; }
export interface StreamingLink { platform: StreamingPlatform; label: string; href: string; }
export interface SocialLink { platform: SocialPlatform; label: string; href: string; }
export interface SiteConfig {
  name: string; tagline: string; label: string; location: string;
  nav: NavLink[]; streamingLinks: StreamingLink[]; socialLinks: SocialLink[];
  licensingEmail: string; footerNote: string;
  emailCapture: { heading: string; body: string; prototypeNotice: string };
}
