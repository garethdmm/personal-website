import Fleuron from '@/app/components/Fleuron';
import Writing from '@/app/components/Writing';

export default function Home() {
  return (
    <div className="max-w-[34em] mx-auto px-6 pt-20 pb-24">

      <main>
        {/* Masthead */}
        <div className="mb-10">
          <h1 className="caps mt-0 mb-1 text-[1.05rem]">Gareth MacLeod</h1>
          <p className="italic m-0">Founder · Engineer · Waterloo, Ontario</p>
        </div>

        {/* Bio */}
        <div>
          <p className="mt-0">
            I've been building startups since 2010—my own and others—to varying degrees of success. Presently I'm head of engineering at <a href='https://invertbio.com/' target='_blank'>Invert</a>, where we're building AI that can solve bioprocess development.
          </p>
          <p>
            I try to spend my time on the most important thing that might not get done unless I do it.
          </p>
          <p>
            <a href="https://github.com/garethdmm" target="_blank">github</a>
            {' · '}
            <a href="https://www.linkedin.com/in/garethmacleod/" target="_blank">linkedin</a>
            {' · '}
            <a href="mailto:gareth.macleod@gmail.com">email</a>
          </p>
        </div>

        <Fleuron />

        {/* Writing */}
        <Writing />

        <footer className="mt-16">
          <p className="m-0"><small>Last updated September 2026</small></p>
        </footer>
      </main>
    </div>
  );
}
