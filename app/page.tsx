import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Gareth MacLeod</h1>
      <p>Founder • Engineer • Waterloo, ON</p>

      <p>
        I've been building startups since 2010—my own and others—to varying degrees of success. Presently I'm head of engineering at <a href='https://invertbio.com/' target='_blank'>Invert</a>, where we're building AI that can solve bioprocess development.
      </p>
      <p>
        My career motto is <i>do what others are not</i>.
      </p>
      <p>
        <a href="https://github.com/garethdmm" target="_blank">github</a>
        {' · '}
        <a href="https://www.linkedin.com/in/garethmacleod/" target="_blank">linkedin</a>
        {' · '}
        <a href="mailto:gareth.macleod@gmail.com">email</a>
      </p>

      <p className="asterism">⁂</p>

      <h2>Writing</h2>
      <ul>
        <li>
          <Link href="/blog/its-the-money-silly">It's the money, silly</Link> (Nov 2025)
        </li>
        <li>
          <Link href="/blog/i-worked-with-a-man-who-faked-his-own-death">I worked with a man who faked his own death</Link> (Jun 2024)
        </li>
        <li>
          <Link href="/blog/how-to-feel-when-your-startup-feels-easy">How to feel when your startup feels easy</Link> (Mar 2024)
        </li>
        <li>
          <Link href="/blog/surviving-five-years-in-the-most-dangerous-market">Thriving in the presence of risk — Crypto 2013–17</Link> (Aug 2019)
        </li>
      </ul>
    </main>
  );
}
