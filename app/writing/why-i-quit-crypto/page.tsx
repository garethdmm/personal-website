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

        {/* Working summary to expand into the essay. */}
        <ul className="list-disc pl-6 space-y-4">
          <li>
            I entered bitcoin in 2013 hoping to build a more accountable financial system, and six months after focusing on algorithmic trading in March 2014, Tinker was trading about $5 million a day and handling 15% of daily volume on regulated USD exchanges.
          </li>
          <li>
            After my cofounders left in 2016, I stayed for the trading research and financial opportunity, but my search for useful applications increasingly turned up speculation and hype.
          </li>
          <li>
            I came to see crypto as a political project that would put property and commerce beyond democratic control, and realized I did not want to build that future.
          </li>
          <li>
            With $1 million in Tinker’s bank account and what I believed was a solid shot at life-changing wealth, I chose in early 2018 to wind it down and release its trading code as Gryphon.
          </li>
          <li>
            I still wonder whether I should have made the money and used it for good, but the experience taught me to trust my own judgment about what is worth building.
          </li>
        </ul>
      </main>
    </div>
  );
}
