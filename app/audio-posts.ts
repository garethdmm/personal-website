export type AudioPost = {
  title: string;
  src: string | null;
  fileName: string;
  duration: string | null;
};

export const audioPosts = {
  'its-the-money-silly': {
    title: "It's the money, silly",
    src: null,
    fileName: 'its-the-money-silly.mp3',
    duration: null,
  },
  'i-worked-with-a-man-who-faked-his-own-death': {
    title: 'I worked with a man who faked his own death',
    src: null,
    fileName: 'i-worked-with-a-man-who-faked-his-own-death.mp3',
    duration: null,
  },
  'how-to-feel-when-your-startup-feels-easy': {
    title: 'How to feel when your startup feels easy',
    src: null,
    fileName: 'how-to-feel-when-your-startup-feels-easy.mp3',
    duration: null,
  },
  'surviving-five-years-in-the-most-dangerous-market': {
    title: 'Thriving in the presence of risk — Crypto 2013–17',
    src: null,
    fileName: 'surviving-five-years-in-the-most-dangerous-market.mp3',
    duration: null,
  },
} satisfies Record<string, AudioPost>;

export type AudioPostSlug = keyof typeof audioPosts;

export const hasPublishedAudio = Object.values(audioPosts).some(
  (post) => post.src !== null,
);
