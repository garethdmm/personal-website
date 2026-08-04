import postData from '@/content/posts.json';

export type Post = {
  slug: string;
  title: string;
  homeTitle: string;
  published: string;
  dateLabel: string;
  homeDateLabel: string;
};

export const posts = postData satisfies Post[];

export function getPost(slug: string): Post {
  const post = posts.find((candidate) => candidate.slug === slug);

  if (!post) {
    throw new Error(`Unknown post slug: ${slug}`);
  }

  return post;
}
