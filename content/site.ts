import type { SiteConfig } from './types';

export const site: SiteConfig = {
  name: 'The Blue Guitar',
  tagline: 'Blues written, produced and mixed by Robert Dempster',
  label: 'Dolphin Bay Records',
  location: 'Bloomfield Hills, Michigan',
  nav: [
    { label: 'Music', href: '/music/' },
    { label: 'Licensing', href: '/licensing/' },
    { label: 'About', href: '/about/' },
  ],
  // PLACEHOLDER: real streaming and social URLs not yet supplied (all '#').
  streamingLinks: [
    { platform: 'spotify', label: 'Spotify', href: '#' },
    { platform: 'apple-music', label: 'Apple Music', href: '#' },
    { platform: 'soundcloud', label: 'SoundCloud', href: '#' },
    { platform: 'youtube', label: 'YouTube', href: '#' },
    { platform: 'bandcamp', label: 'Bandcamp', href: '#' },
    { platform: 'amazon-music', label: 'Amazon Music', href: '#' },
  ],
  socialLinks: [
    { platform: 'instagram', label: 'Instagram', href: '#' },
    { platform: 'facebook', label: 'Facebook', href: '#' },
    { platform: 'threads', label: 'Threads', href: '#' },
    { platform: 'tiktok', label: 'TikTok', href: '#' },
    { platform: 'x', label: 'X', href: '#' },
  ],
  // PLACEHOLDER: awaiting the client's real licensing address.
  licensingEmail: 'licensing@blueguitar.art',
  footerNote: 'Prototype for design review. Placeholder content throughout.',
  emailCapture: {
    heading: 'Get on the list',
    body: 'New releases and news from Robert, straight to your inbox.',
    prototypeNotice: 'Prototype only: this form does not send or store anything.',
  },
};
