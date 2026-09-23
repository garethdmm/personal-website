import Link from 'next/link';
import { posts, type Post } from '@/lib/posts';

const dateFormat = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

function PostList({ entries }: { entries: Post[] }) {
  return (
    <ul className="list-none p-0 m-0">
      {entries.map((post) => (
        <li
          key={post.slug}
          className="mb-5 flex flex-col gap-1 min-[541px]:mb-3 min-[541px]:flex-row min-[541px]:items-baseline min-[541px]:justify-between min-[541px]:gap-6"
        >
          <Link href={`/writing/${post.slug}`} className="min-w-0 flex-1">
            {post.title}
          </Link>
          <time
            dateTime={post.published}
            className="shrink-0 text-[0.8rem] text-[#595650] min-[541px]:text-[0.89rem]"
          >
            {dateFormat.format(new Date(`${post.published}-01T00:00:00Z`))}
          </time>
        </li>
      ))}
    </ul>
  );
}

export default function Writing() {
  const essays = posts.filter((post) => post.kind === 'essay');
  const notes = posts.filter((post) => post.kind === 'note');

  return (
    <section aria-labelledby="writing-heading">
      <h2 id="writing-heading" className="caps mt-0 mb-6 text-[0.85rem]">
        Writing
      </h2>

      <PostList entries={essays} />

      {notes.length > 0 && (
        <section aria-labelledby="note-heading" className="mt-10">
          <h3 id="note-heading" className="caps mt-0 mb-4 text-[0.78rem]">
            Notes
          </h3>
          <PostList entries={notes} />
        </section>
      )}
    </section>
  );
}
