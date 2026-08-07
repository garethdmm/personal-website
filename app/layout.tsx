import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://garethdmm.com'),
  title: 'Gareth MacLeod',
  description: 'Startup founder and engineer in Waterloo, Ontario. Essays on startups, engineering, and risk.',
  openGraph: {
    type: 'website',
    title: 'Gareth MacLeod',
    description: 'Startup founder and engineer in Waterloo, Ontario. Essays on startups, engineering, and risk.',
    siteName: 'Gareth MacLeod',
    url: '/',
    images: [{ url: '/og/home.png', width: 2400, height: 1260, alt: 'Gareth MacLeod' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gareth MacLeod',
    description: 'Startup founder and engineer in Waterloo, Ontario. Essays on startups, engineering, and risk.',
    images: ['/og/home.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "7b0927d506dc414eab84439edc8a3c29"}'
        />
      </body>
    </html>
  );
}
