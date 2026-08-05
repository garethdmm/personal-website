import Link from 'next/link';

export const metadata = {
  title: 'How to feel when your startup feels easy — Gareth MacLeod',
};

export default function HowToFeelPost() {
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
          How to feel when your startup feels easy
        </h1>
        <p className="font-sans text-[0.82rem] text-[#888] mb-8">March 2024</p>

        <hr />

        <p>
          I did something hard once: I took my startup from zero to $1m in daily volume in 4 months.
          Something has bothered me ever since: it felt easy.
        </p>

        <p>
          That summer, my team pivoted and set a new challenge for ourselves: start a crypto market-making
          business and grow it from zero to 10% of all trading volume in three months. We didn't know how,
          but we had an idea for a simple trading bot and strategy to get us started. The first time we
          turned on the bot, I watched it work for an hour. Then I turned to my cofounder and said, "We are
          2% of all trading in this market." Our first guess had gotten us 20% of the way there! With a few
          more straightforward improvements, we surpassed our goal with time to spare. With success came
          attention and chatter that we were one of the "hot" companies in our YC batch. When it came time
          for our seed round, we raised seven figures after only a few days of meetings.
        </p>

        <p>
          If you're a founder and feel your jaw tighten as I tell you how easy my startup was, don't worry.
          This "easy" period was a brief interlude in years of struggle. Hard was so familiar that ease felt
          distressing. Startups are hard, right? So why did this feel easy?
        </p>

        <p>
          Maybe we were frauds. We were doing something easy and letting people believe it was hard, or at
          least not correcting them when they were impressed. I worried that if people knew how easy it
          was, they'd laugh and lose interest in us.
        </p>

        <p>
          Today, it's obvious that this idea was wrong. I've come to believe that ease is a critical
          ingredient in startups.
        </p>

        <p>
          Let's deal first with imposter syndrome. Culture and personal experience had taught me that
          startups are hard. I mutated that belief into a rule: everything about startups should be hard
          all the time. This was a mistake.
        </p>

        <p>
          No one said every day of your startup has to be hard. The first phase of a startup is a search
          for something people want. The search is often hard. What you find may be easy to build or sell.
          Once you find something people want, that part of your project can suddenly become easier. Ease
          signals that you're doing something right!
        </p>

        <p>
          For some ideas, the perception that they are hard may make them easy. In hindsight, we — and many
          others — overestimated how sophisticated crypto markets were in that era. If more people had
          thought this was easy, we would have faced more competition and found it harder. Because it
          sounded hard, few people tried, and our simple approaches succeeded. The trick was to try
          something that sounded hard, then discover it was easy.
        </p>

        <p>
          The gap between a project's perceived and actual difficulty may be one reason startups exist at
          all. If everything were as easy or hard as it appeared, resources would already be perfectly
          allocated. There would be no edge for small teams to discover.
        </p>

        <p>
          It's worth considering this gap from the opposite direction. I've described the inside view:
          doing something hard that feels easy. But what does this look like to an outside observer? I
          think we all know. When you see someone achieve something hard, you may feel awe and a pang of
          insecurity: the fear that you'll never be as good as that person.
        </p>

        <p>
          I suspect ego drove some of my discomfort with ease. I wanted to feel the same way about myself
          that I felt about the people I admired. The people I admired did things that looked hard, so I
          perversely wanted my own work to feel hard. Doing something easy didn't give me the
          self-satisfaction I was searching for.
        </p>

        <p>
          We should all be happy to let go of this emotional logic. Finding something that feels easy amid
          a startup grind — even for a few months — is a gift. The people we admire were never afraid to
          take an easy win when it presented itself.
        </p>

        <p>
          So don't worry if your startup suddenly starts to feel easy. It probably means you're doing
          something right. When you see other people do hard things, don't take it as evidence that they
          are better than you. Take it as proof that hard things can be done.
        </p>

        <p>
          Most importantly, consider this: the hard thing you've been thinking of may be easier than you think.
        </p>
      </main>
    </div>
  );
}
