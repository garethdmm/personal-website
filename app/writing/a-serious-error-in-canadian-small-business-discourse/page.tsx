import Link from 'next/link';
import Blockquote from '@/app/components/Blockquote';
import Fleuron from '@/app/components/Fleuron';
import { postMetadata } from '@/lib/postMetadata';

export const metadata = postMetadata({
  slug: 'a-serious-error-in-canadian-small-business-discourse',
  title: 'A serious error in Canadian small business discourse',
  description:
    'A look at the employer and non-employer business counts behind the claimed small-business gap between Canada and the US.',
});

export default function CanadianSmallBusinessPost() {
  return (
    <div className="max-w-[34em] mx-auto px-6 pt-20">
      <header className="mb-14">
        <Link href="/" className="caps no-underline text-[0.85rem]">
          Gareth MacLeod
        </Link>
      </header>

      <main>
        <h1 className="mt-0 mb-1 text-[1.45rem] leading-[1.25] text-balance">
          A serious error in Canadian small business discourse
        </h1>
        <p className="m-0 italic">September 2026</p>

        <Fleuron />

        <p>
          For a while now, I’ve been hearing people say that Canada has an enormous small business gap with the US. Last week I had an occasion to check this and found it false, coming most likely from a disastrous misreading of the data. The truth is actually the opposite: Canada has <em>more</em> small businesses than the US.
        </p>

        <p>
          Patient zero for the claim seems to be this <a href="https://www.buildcanada.com/memos/reward-the-risk-takers?utm_source=chatgpt.com">Build Canada piece</a>, which uses it to argue for tax cuts.
        </p>

        <Blockquote cite="https://www.buildcanada.com/memos/reward-the-risk-takers">
          <p>We have just 33 small businesses per 1,000 people vs 124 in the US. Fixing our capital gains system could help us close this gap with the US and create hundreds of thousands of new jobs.</p>
        </Blockquote>

        <p>
          The source given for the Canadian side of this comparison is this 2023 ISDE report table which shows 33.6 businesses per 1000 adult population (18+). This report defines it’s subject as <strong>employer SMEs</strong>: a business with at least 1 and less than 500 employees.
        </p>

        <p>
          The US source given by the piece is a broken link, but the data can be found in the US census, or in annual summaries given out by the US Small Business Administration (SBA). The <a href="https://advocacy.sba.gov/wp-content/uploads/2025/06/United_States_2025-State-Profile.pdf#page=4">SBA’s 2025 report</a> separates counts for businesses with 0, 1-19, and 20-499 employees. Adding the latter two together gives 6,374,594 employer SMEs in the US. The underlying census year here is 2022, so we’ll take the number of US adults from the same source as 260 million. Dividing through gives us us 24 employer SMEs per 1000 adults in the USA.<sup className="ml-0.5 text-[0.7em]"><a id="census-note-ref" href="#census-note" role="doc-noteref" aria-label="Footnote 1: reconstruct the figures from Census data">1</a></sup>
        </p>

        <p>
          This is a radically different result than what Build Canada bases their argument on. The US does not have 4x more employer SMEs than Canada, Canada has 1.5x more than the US.
        </p>

        <p>
          I cannot say how Build Canada arrived at their number, but I can hazard a guess. In the SBA table given above, if one were to add together all three categories of SMEs, you would get a number that represents <strong>employer and non-employer SMEs</strong> in the US. This number is 36,186,089. Divide through by the number of adults in the same census year (2022, 260 million), and you get 138. This is close to, but slightly above the number than what was quoted in the piece. The difference could be accounted for by using a slightly different year for population and business stats.
        </p>

        <p>
          Regardless how the mistake was made, this is a major error which has driven significant discussion in some Canadian policy circles for the last year. I hope that Build Canada responds to my work here and rescinds or heavily revises the piece.
        </p>

        <aside
          id="census-note"
          role="doc-footnote"
          aria-labelledby="census-note-heading"
          tabIndex={-1}
          className="mt-12 border-t border-black/20 pt-6 text-[0.88rem] leading-[1.65] scroll-mt-6 [overflow-wrap:anywhere]"
        >
          <h2 id="census-note-heading" className="mt-0 mb-4 text-[1em]">
            1. Reconstructing the figures directly from Census data
          </h2>
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <strong>Download the employer workbook.</strong> Open the Census Bureau’s <a href="https://www.census.gov/data/tables/2022/econ/susb/2022-susb-annual.html">2022 SUSB annual tables</a>. Under “Data by Enterprise Employment Size” → “U.S. and States,” choose “U.S. and states, NAICS, detailed employment.” This downloads <a href="https://www2.census.gov/programs-surveys/susb/tables/2022/us_state_naics_detailedsizes_2022.xlsx"><code>us_state_naics_detailedsizes_2022.xlsx</code></a>. Open its first worksheet, <code>US &amp; states detailed sizes</code>.
            </li>
            <li>
              <strong>Read the employer count.</strong> Find the row with State <code>00</code>, State Name “United States,” NAICS <code>--</code>, NAICS Description “Total,” and Enterprise Size “19: &lt;500 employees.” Column F, “Firms,” is <strong>6,374,594</strong> (cell <code>F22</code>). The “06: &lt;20 employees” subtotal is <strong>5,720,093</strong> (<code>F9</code>); subtracting it from <code>F22</code> gives <strong>654,501</strong> for 20–499. Use the national, all-industry row; summing state or industry firm counts can count the same company more than once.
            </li>
            <li>
              <strong>Check the definitions.</strong> The <a href="https://www.census.gov/programs-surveys/susb/about/glossary.html">SUSB glossary</a> defines a firm as establishments under common ownership within the selected geography and industry. An establishment is a business location, so use “Firms,” not column G, “Establishments.” Enterprise size counts employees across the company’s locations; employment is paid full- and part-time staff during the pay period containing March 12. SUSB excludes nonemployer businesses. It does include employers with zero staff in that March snapshot if they paid employees elsewhere in the year: the “&lt;20” subtotal includes these firms.
            </li>
            <li>
              <strong>Get the adult population.</strong> Download Census’s <a href="https://www2.census.gov/programs-surveys/popest/tables/2020-2022/state/detail/SCPRC-EST2022-18+POP.xlsx"><code>SCPRC-EST2022-18+POP.xlsx</code></a> (Vintage 2022). In its sole worksheet, the “United States” row under “Resident Population Age 18 Years and Older” → “Number” is <strong>260,836,730</strong> (<code>C5</code>): residents aged 18+ on July 1, 2022, including noncitizens, in the 50 states and DC. Puerto Rico is listed separately.
            </li>
            <li>
              <strong>Reconstruct the total including nonemployers.</strong> On <a href="https://www.census.gov/data/datasets/2022/econ/nonemployer-statistics/2022-ns.html">Nonemployer Statistics: 2022</a>, select “U.S. File” (<a href="https://www2.census.gov/programs-surveys/nonemployer-statistics/datasets/2022/historical-datasets/nonemp22us.zip"><code>nonemp22us.zip</code></a>). Unzip <code>nonemp22us.txt</code> and import it into Excel as comma-delimited text. In the first data row, <code>ST=00</code> means United States, <code>NAICS=00</code> all covered industries, <code>LFO=-</code> all legal forms, and <code>RCPTOT_SIZE=001</code> all receipts sizes. <code>ESTAB</code> is the business count: <strong>29,811,495</strong>. These businesses have no paid employees, are subject to federal income tax, and have annual receipts of at least $1,000 ($1 in construction); see the <a href="https://www.census.gov/programs-surveys/nonemployer-statistics/technical-documentation/methodology.html">NES methodology</a>. Add the employer count: 29,811,495 + 6,374,594 = <strong>36,186,089</strong>.
            </li>
            <li>
              <strong>Calculate rates per 1,000 adults.</strong> Divide each business count by 260,836,730 and multiply by 1,000: <strong>24.44</strong> employer SMEs, or <strong>138.73</strong> including nonemployers. Using the rounded denominator of 260 million instead gives <strong>24.52</strong> and <strong>139.18</strong>, respectively.
            </li>
          </ol>
          <p className="mt-4 mb-0">
            <a href="#census-note-ref" role="doc-backlink" aria-label="Return to footnote 1 in the essay">↩ Back to text</a>
          </p>
        </aside>
      </main>
    </div>
  );
}
