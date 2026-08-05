import Link from 'next/link';

export const metadata = {
  title: "It's the money, silly — Gareth MacLeod",
};

export default function ItsTheMoneySillyPost() {
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
          It's the money, silly
        </h1>
        <p className="font-sans text-[0.82rem] text-[#888] mb-8">November 2025</p>

        <hr />

        <p>
          People have discussed the shortcomings of the Canadian tech startup world throughout my professional life, with Silicon Valley as the standard against which we measure ourselves. With renewed heat on this topic in the tariff era, two problems have received particular attention: our <em>unambitious</em> culture and our constant leakage of good talent <em>to</em> Silicon Valley. Both are worth discussing, but neither fully explains our differences with California. What is missing from this framework is money.
        </p>

        <p>
          The enormous concentration of investment capital and its side effects in Silicon Valley is difficult to appreciate until you see it in action. I often tell young founders that raising money in California is not 10 times easier; it is closer to 1,000 times easier. Back in my day, before things got <em>truly</em> crazy, I raised two million dollars in San Francisco in five hours of meetings. My startup at the time—a cryptocurrency market maker—was not difficult to fund in Canada; it was unfundable.
        </p>

        <p>
          In any given year, investors between San Jose and San Francisco have about two hundred billion dollars to put into startup rounds. That is enough to fund forty thousand five-million-dollar seed rounds every year. Like, jesus christ. Even after adjusting for population, this capital pool is four times the size of Canada's.
        </p>

        <p>
          The time it takes to raise a seed round is only a first-order effect. The density of capital affects what investment strategies are profitable, which affects what ideas are fundable, which affects what ideas founders choose. The black swan farming investment model supports the crazy bets that become Google, Reddit, and Airbnb. Pushing people to "be more ambitious" without the financial support for those ideas is a lost cause.
        </p>

        <p>
          Capital concentration also changes deal terms. More investment dollars means more supply on the buy side for startup equity, which means more founder-friendly terms for those transactions. This is not a moral argument that founders <em>deserve</em> more power; it is a material argument that outcomes improve when founders have more room to take risks. We all know a Canadian founder whom BDC has pressured for a personal guarantee. Founder-antagonistic deals suppress ambition.
        </p>

        <p>
          Those two hundred billion dollars did not appear overnight and then cause the other side of the market to adjust. Silicon Valley grew from WW2 research funding through integrated circuits and the internet to the present AI boom. Industry practices and culture changed alongside investment models and capital. Material conditions and culture shape each other. Trying to change one without changing the other is a fool's errand.
        </p>

        <p>
          It's remarkable that this argument is controversial. The idea that resource climates shape behaviour is as obvious in economics as it is in anthropology. Investors, in particular, often dismiss this argument. I have two theories about why: one pseudo-political, the other based on incentives. First, the investment industry's ethos is often individualistic, biasing investors toward explanations based on personal behaviour rather than structures. "They succeed because they are ambitious" is a more attractive conclusion than "They succeed because their environment has more resources". Second, although the industry as a whole has an incentive to grow its investment base, individual investors may resist the changes that growth would bring. More money means more funds; more funds mean more competition for deals and less investor-friendly terms. A successful investor in the current Canadian industry could see this change as a threat.
        </p>

        <p>
          The good news is that Silicon Valley has 50 times as much capital in absolute dollars but only four times as much per capita. If our industry grows by 14% annually, we can close half the gap in five years; at 30%, we can close it entirely. We should ask what conditions would produce that growth.
        </p>
      </main>
    </div>
  );
}
