import Link from 'next/link';

export const metadata = {
  title: 'I worked with a man who faked his own death — Gareth MacLeod',
};

export default function FakedDeathPost() {
  return (
    <div className="max-w-[680px] mx-auto px-6 pt-12 pb-16">

      {/* Header */}
      <header className="flex items-baseline justify-between mb-14">
        <Link href="/" className="font-sans font-semibold text-base text-[#1a1a1a] no-underline">
          Gareth MacLeod
        </Link>
        <nav className="font-sans text-[0.85rem]">
          <Link href="/" className="text-[#555] ml-5 hover:text-accent hover:no-underline">Writing</Link>
        </nav>
      </header>

      <main>
        <Link href="/" className="font-sans text-[0.85rem] text-[#888] inline-block mb-8">
          ← Back
        </Link>

        <h1 className="mt-0 text-[1.75rem] leading-tight mb-[0.4rem]">
          I worked with a man who faked his own death
        </h1>
        <p className="font-sans text-[0.82rem] text-[#888] mb-8">June 2024</p>

        <hr />

        <p>
          I only spoke with Gerald Cotten on the phone, but we had substantial business dealings with him for a time. He ran a Canadian exchange with low volume but highly arbitrageable orders. We made a tidy profit trading there and added substantial liquidity to its books, so the relationship benefited both parties.
        </p>

        <p>
          Late in the Tinker years, Gerald's exchange stopped processing our withdrawals. I emailed our customer service rep and cc'd Gerald, who had always made sure our requests were fulfilled on time, but got no reply. A few weeks later, the company went bankrupt, starting a small media circus. Our exchange balance was a small portion of our assets, but large enough to upset us.
        </p>

        <p>
          It soon emerged that Gerald had disappeared and that the company lacked the assets to redeem its customer deposits.
        </p>

        <p>
          It took a few months for the story to become comprehensible. Here is the abridged version, as best I understand it.
        </p>

        <ol className="pl-6 leading-[1.7] list-decimal mb-[1.1rem]">
          <li className="mb-4">Gerald was the only person at Quadriga who kept track of deposits, and he did not do so with any rigour. Other employees reported seeing stacks of cash labelled with post-it notes in his kitchen.</li>
          <li className="mb-4">Gerald had taken some of these deposits and spent them on himself, buying cars and planes and living a lifestyle far above his means.</li>
          <li className="mb-4">Gerald partly financed this by taking customer <em>bitcoin</em> deposits, transferring them to his personal accounts, and selling them.</li>
          <li className="mb-4">This put Quadriga in a net-short position against bitcoin: it had bitcoin-denominated debts but lacked the bitcoin to repay them. It would have to buy bitcoin at the current market price with its fiat cash.</li>
          <li className="mb-4">The price of bitcoin over these years went way up. Eventually, Quadriga was sitting on an unrealized loss of hundreds of millions of dollars.</li>
          <li className="mb-4">In the fall of 2018, Gerald married his fiancé in Canada, wrote and signed a will, and then took a trip to India.</li>
          <li className="mb-4">Weeks after signing this will, a death certificate for Gerald was issued in Jaipur, a city in north-west India near the border with Pakistan.</li>
          <li>Quadriga's other employees realized the severity of their situation and that they had no access to customer deposits, even those that remained. They declared bankruptcy and contacted the authorities.</li>
        </ol>

        <p>
          Much has been said about this story by others. What I'd like to add starts with a simple statement: I think it probable that Gerald is still alive, living somewhere in Southeast Asia. The presence of motive, the timing of the will, and the bizarreness of his reported death are too much to overlook. It is easy to imagine that, once he realized the mess he was in, he decided he would rather live in exile from western civilization than face the consequences of his actions. With millions of dollars at his disposal, he might have found a local official willing to issue a death certificate for a bribe. He could live off cash for years or decades.
        </p>

        <p>
          Some investigative reporting suggests that Gerald may have been an online con artist before he started Quadriga. A CBC podcast describes a pre-crypto online community centered on creating and selling Ponzi schemes to seemingly self-aware buyers. The reporters believe Gerald participated under a pseudonym, buying and selling scam assets in a bizarre contest to reach the top of the Ponzi pyramid. I don't know what is true here.
        </p>

        <p>
          Gerald is the only person who ever successfully scammed Tinker. The early 2010s crypto world was the wild west. We put an enormous amount of energy into vetting our partners and considering how to avoid being hacked or defrauded. We followed strict criteria for choosing trading venues and rejected many that we accurately judged untrustworthy. As I've written elsewhere, the critical element of our approach was that it did not require us to be right every time. While we did choose to trust Gerald, trust isn't binary. We kept our exposure to Quadriga limited to a level I could describe as upsetting, but not disturbing. We lost much less than we could have. Regardless, as the only man who "got us", I must tip my hat to him.
        </p>

        <p>
          Gerald stole money from many other people who felt the loss much more than we did. It is too bad that he likely will never answer for that in a formal way.
        </p>

        <p>
          Despite all this, my feelings about the story have settled into bemusement with a touch of sorrow. If the reporting about his early years is true, Gerald was a small-time con man who tripped into an incredible, legitimate business opportunity but binned it — either because he lacked the skill to manage it or because he couldn't stop thinking of it as a score.
        </p>

        <p>
          The crime he committed was embezzlement, but this wasn't his mistake. His mistake was to put his company in an enormous short position in bitcoin. This was an act of simple financial inexperience. He likely spent single-digit millions of customer deposits on cars and airplanes, an amount the business might have covered with future revenue. He may even have thought that the company was solvent and he was just spending revenue which was legally his. But he was responsible for repaying those bitcoin-denominated deposits. As Bitcoin rose tenfold in the run-up to 2018, the hole in his balance sheet grew to hundreds of millions of dollars. This is how his shot at going legit went awry.
        </p>

        <p>
          But even then, it wasn't over for him. Had he come clean to Canadian financial authorities, he likely would have received a prison sentence of around a decade. He might have been eligible for parole within a few years. His life after this difficult period may have been humble, but he would have kept his life in Canada, his relationship with his fiancé, and potentially other friends and family. He might even have been able to swing his story into a book deal and then a form of micro-celebrity, like Jordan Belfort or Martin Shkreli. Facing this publicly would have been humiliating and scary. People close to him and the wider public would have been angry. But ultimately, he could have rebuilt his life.
        </p>

        <p>
          So it's hard for me to see this as other than a story of a man who repeatedly turned away from redemption, and that makes me sad.
        </p>

        <p>
          I wonder what it feels like. Whatever our judgement of him, if he did fake his own death, that seems to imply that he considered his crimes extreme. Does that feel like Edgar Allan Poe's <em>The Tell-Tale Heart</em>, with guilt ever-present? Or like Lynch's <em>Lost Highway</em>, where the memory of your crime becomes a spot in the corner of your vision that you can never blink away? Maybe he feels fine about it. That's possible too.
        </p>

        <p>
          I wonder what would happen if Gerald suddenly emerged from rural Asia, ready to face the music. Whether that would be worth something to him, spiritually. Maybe, maybe not.
        </p>
      </main>
    </div>
  );
}
