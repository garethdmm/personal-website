export type PodcastDirectoryLinks = {
  apple: string | null;
  spotify: string | null;
};

export type PodcastAudio = {
  url: string;
  byteLength: number;
  mimeType: 'audio/mpeg' | 'audio/mp4';
  durationSeconds: number;
  publishedAt: string;
};

export type PodcastEpisode = {
  slug: EpisodeSlug;
  title: string;
  description: string;
  guid: string;
  audio: PodcastAudio | null;
};

export type EpisodeSlug =
  | 'its-the-money-silly'
  | 'i-worked-with-a-man-who-faked-his-own-death'
  | 'how-to-feel-when-your-startup-feels-easy'
  | 'surviving-five-years-in-the-most-dangerous-market';

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://garethdmm.com'
).replace(/\/$/, '');

export const podcastConfig = {
  title: 'Gareth MacLeod — Audio Essays',
  description:
    'Spoken editions of Gareth MacLeod’s writing on startups, technology, money, and risk.',
  author: 'Gareth MacLeod',
  ownerEmail: 'gareth.macleod@gmail.com',
  language: 'en-CA',
  category: 'Technology',
  explicit: false,
  siteUrl,
  feedPath: '/podcast.xml',
  feedUrl: `${siteUrl}/podcast.xml`,
  artworkUrl: null as string | null,
  directoryLinks: {
    apple: null,
    spotify: null,
  } satisfies PodcastDirectoryLinks,
  updatedAt: '2026-07-28T12:00:00-04:00',
} as const;

// An episode is added to the public feed only when all enclosure metadata is
// present. Until then, the matching article shows the honest pre-launch state.
export const podcastEpisodes: PodcastEpisode[] = [
  {
    slug: 'its-the-money-silly',
    title: "It's the money, silly",
    description:
      'Why capital density, not founder ambition, is the missing variable in conversations about Canadian startups.',
    guid: 'garethmacleod-audio-its-the-money-silly',
    audio: null,
  },
  {
    slug: 'i-worked-with-a-man-who-faked-his-own-death',
    title: 'I worked with a man who faked his own death',
    description:
      'A first-hand connection to the Quadriga collapse, and a story about risk, fraud, and repeatedly turning away from redemption.',
    guid: 'garethmacleod-audio-i-worked-with-a-man-who-faked-his-own-death',
    audio: null,
  },
  {
    slug: 'how-to-feel-when-your-startup-feels-easy',
    title: 'How to feel when your startup feels easy',
    description:
      'Why ease can be a signal that a startup has found something people want, rather than evidence that its founders are frauds.',
    guid: 'garethmacleod-audio-how-to-feel-when-your-startup-feels-easy',
    audio: null,
  },
  {
    slug: 'surviving-five-years-in-the-most-dangerous-market',
    title: 'Thriving in the presence of risk — Crypto 2013–17',
    description:
      'How a cryptocurrency trading company used threat modelling, limits, and an acceptance of uncertainty to survive a hostile market.',
    guid:
      'garethmacleod-audio-surviving-five-years-in-the-most-dangerous-market',
    audio: null,
  },
];

export function getPodcastEpisode(slug: EpisodeSlug): PodcastEpisode {
  const episode = podcastEpisodes.find((candidate) => candidate.slug === slug);

  if (!episode) {
    throw new Error(`No podcast episode configured for "${slug}".`);
  }

  return episode;
}

export function getPublishedPodcastEpisodes(): PodcastEpisode[] {
  return podcastEpisodes
    .filter(
      (
        episode,
      ): episode is PodcastEpisode & {
        audio: PodcastAudio;
      } => episode.audio !== null,
    )
    .sort(
      (left, right) =>
        new Date(right.audio.publishedAt).getTime() -
        new Date(left.audio.publishedAt).getTime(),
    );
}

export function articleUrl(slug: EpisodeSlug): string {
  return `${podcastConfig.siteUrl}/blog/${slug}`;
}
