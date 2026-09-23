import Link from 'next/link';
import Fleuron from '@/app/components/Fleuron';
import { postMetadata } from '@/lib/postMetadata';

export const metadata = postMetadata({
  slug: 'the-claimed-small-business-gap-is-not-established',
  title: 'The claimed small-business gap is not established',
  description:
    'A Canada–US small-business comparison needs consistent definitions, especially the treatment of businesses without paid employees.',
});

export default function SmallBusinessGapPost() {
  return (
    <div className="max-w-[34em] mx-auto px-6 pt-20">
      <header className="mb-14">
        <Link href="/" className="caps no-underline text-[0.85rem]">
          Gareth MacLeod
        </Link>
      </header>

      <main>
        <h1 className="mt-0 mb-1 text-[1.45rem] leading-[1.25] text-balance">
          The claimed small-business gap is not established
        </h1>
        <p className="m-0 italic">
          <time dateTime="2026-09">September 2026</time>
        </p>

        <Fleuron />

        <p>
          <a href="https://www.buildcanada.com/memos/reward-the-risk-takers">
            Build Canada’s essay on capital-gains reform
          </a>{' '}
          says Canada has 33 small businesses per 1,000 adults, compared with 124 in the US.
          That is a striking gap. But before explaining it, we need to establish that the
          two figures count the same thing.
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-4">
          <li>
            <strong>Canada’s figure excludes businesses without paid employees.</strong>{' '}
            The essay’s{' '}
            <a href="https://ised-isde.canada.ca/site/sme-research-statistics/en/key-small-business-statistics/key-small-business-statistics-2024">
              Canadian source, ISED’s <em>Key Small Business Statistics 2024</em>
            </a>, defines small and medium-sized enterprises as businesses with 1–499 paid
            employees. A self-employed consultant with no payroll is outside that count.
          </li>
          <li>
            <strong>The usual US headline includes them.</strong>{' '}
            The Small Business Administration’s{' '}
            <a href="https://advocacy.sba.gov/wp-content/uploads/2026/02/FINAL_FAQsAboutSmallBusiness_2026_012826.pdf">
              2026 FAQ
            </a>{' '}
            reports that 82.3% of American small businesses have no paid employees.
            The essay’s US business-count citation leads to an unavailable Notion draft,
            so I cannot verify whether its figure uses this broader definition.
          </li>
          <li>
            <strong>That distinction is large enough to reverse the comparison.</strong>{' '}
            If the US figure of 124 includes a similar share of businesses without
            employees, removing them leaves about 22 per 1,000 adults, below Canada’s 33.
            This is an illustration of the effect of the definition, not a corrected
            estimate: the original US input remains unverified, and a proper comparison
            would also need consistent years, industry coverage and counting rules.
          </li>
        </ul>

        <p>
          This does not establish that Canada has more small businesses per person, or
          settle whether capital-gains reform would help entrepreneurs. It establishes
          a narrower problem with the argument: the comparison has not demonstrated a
          Canadian small-business shortage. Before using that shortage to explain what
          is wrong with our economy, we should check that it exists.
        </p>
      </main>
    </div>
  );
}
