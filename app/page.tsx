import Link from 'next/link';
import { getPostAudio } from '@/lib/audio';
import { posts } from '@/lib/posts';

export default function Home() {
  return (
    <div className="max-w-[680px] mx-auto px-6 pt-12 pb-16">

      {/* Profile */}
      <main>
        {/* Masthead */}
        <div className="mb-8">
          <h1 className="mt-0 mb-1 text-[1.4rem]">Gareth MacLeod</h1>
          <p className="font-sans text-[0.88rem] text-[#555] m-0">Founder • Engineer • Waterloo, ON</p>
        </div>

        {/* Bio */}
        <div className="mb-10">
          <p className="mt-0">
            I've been building startups since 2010—my own and others—to varying degrees of success. Presently I'm head of engineering at <a href='https://invertbio.com/' target='_blank'>Invert</a>, where we're building AI that can solve bioprocess development.
          </p>
          <p>
            My career motto is <i>do what others are not</i>.
          </p>
          <p className="text-[0.88rem] font-sans text-[#555]">
            <a href="https://github.com/garethdmm" target="_blank">github</a>
            {' · '}
            <a href="https://www.linkedin.com/in/garethmacleod/" target="_blank">linkedin</a>
            {' · '}
            <a href="mailto:gareth.macleod@gmail.com">email</a>
          </p>
        </div>

        <hr />

        {/* Writing */}
        <section>
          <h2 className="text-base font-sans font-semibold uppercase tracking-[0.06em] text-[#888] mt-0">
            Writing
          </h2>
          <ul className="list-none p-0 m-0">
            {posts.map((post) => {
              const audio = getPostAudio(post.slug);

              return (
                <li
                  className="mb-3 flex items-baseline justify-between gap-4"
                  key={post.slug}
                >
                  <Link href={`/blog/${post.slug}`} className="flex-1">
                    {post.homeTitle}
                    {audio ? (
                      <span className="ml-2 whitespace-nowrap font-sans text-[0.7rem] uppercase tracking-[0.08em] text-[#6b7f9c]">
                        Audio · listen later
                      </span>
                    ) : null}
                  </Link>
                  <time
                    className="shrink-0 font-sans text-[0.82rem] text-[#888]"
                    dateTime={post.published}
                  >
                    {post.homeDateLabel}
                  </time>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}
