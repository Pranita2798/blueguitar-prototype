import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Bodoni_Moda, Jost } from 'next/font/google';
import { site } from '@/content/site';
import { EmailCapture, PlayerBar, PlayerProvider, SiteFooter, SiteHeader, SocialRail } from '@/components';
import './globals.css';

// Self-hosted at build time by next/font (no runtime request).
const display = Bodoni_Moda({ subsets: ['latin'], style: ['italic'], axes: ['opsz'], variable: '--font-bodoni', display: 'swap' });
const sans = Jost({ subsets: ['latin'], variable: '--font-jost', display: 'swap' });

export const metadata: Metadata = {
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.tagline,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="relative">
        <PlayerProvider>
          <SiteHeader name={site.name} nav={site.nav} streamingLinks={site.streamingLinks} />
          <SocialRail links={site.streamingLinks} />
          <main>{children}</main>
          <EmailCapture {...site.emailCapture} />
          <SiteFooter name={site.name} label={site.label} location={site.location} nav={site.nav} footerNote={site.footerNote} socialLinks={site.socialLinks} />
          <PlayerBar />
        </PlayerProvider>
      </body>
    </html>
  );
}
