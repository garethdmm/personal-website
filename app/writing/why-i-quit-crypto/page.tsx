import type { Metadata } from 'next';
import Link from 'next/link';
import Fleuron from '@/app/components/Fleuron';

export const metadata: Metadata = {
  title: 'Why I quit Crypto — Gareth MacLeod',
  description: 'Draft in progress.',
  robots: { index: false, follow: false },
  openGraph: {
    type: 'article',
    title: 'Why I quit Crypto',
    description: 'Draft in progress.',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'Why I quit Crypto',
    description: 'Draft in progress.',
    images: [],
  },
};

export default function WhyIQuitCryptoPost() {
  return (
    <div className="max-w-[34em] mx-auto px-6 pt-20">
      <header className="mb-14">
        <Link href="/" className="caps no-underline text-[0.85rem]">
          Gareth MacLeod
        </Link>
      </header>

      <main>
        <h1 className="mt-0 mb-1 text-[1.45rem] leading-[1.25] text-balance">
          Why I quit Crypto
        </h1>
        <p className="m-0 italic">November 2026 · Draft</p>

        <Fleuron />

        {/* Replace this placeholder with the essay as it takes shape. */}
        <p className="italic">Draft in progress.</p>
      </main>
    </div>
  );
}
