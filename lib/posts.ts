export type Post = {
  slug: string;
  title: string;
  /** Publication month, preserving the precision of the existing archive. */
  published: string;
  kind: 'essay' | 'note';
};

/** Newest first within each kind. Existing writing URLs remain unchanged. */
export const posts: Post[] = [
  {
    slug: 'its-the-money-silly',
    title: "It's the money, silly",
    published: '2025-11',
    kind: 'essay',
  },
  {
    slug: 'i-worked-with-a-man-who-faked-his-own-death',
    title: 'I worked with a man who faked his death',
    published: '2024-06',
    kind: 'essay',
  },
  {
    slug: 'how-to-feel-when-your-startup-feels-easy',
    title: 'How to feel when your startup feels easy',
    published: '2024-03',
    kind: 'essay',
  },
  {
    slug: 'surviving-five-years-in-the-most-dangerous-market',
    title: 'Thriving in the presence of risk: Crypto 2013–17',
    published: '2019-08',
    kind: 'essay',
  },
];
