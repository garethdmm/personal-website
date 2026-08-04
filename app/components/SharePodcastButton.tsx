'use client';

import { useState } from 'react';

type SharePodcastButtonProps = {
  feedUrl: string;
};

export default function SharePodcastButton({
  feedUrl,
}: SharePodcastButtonProps) {
  const [label, setLabel] = useState('Send to phone');

  async function shareFeed() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Gareth MacLeod — Audio Essays',
          text: 'Save this podcast feed and listen to new audio essays away from the website.',
          url: feedUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(feedUrl);
      setLabel('Feed link copied');
      window.setTimeout(() => setLabel('Send to phone'), 2200);
    } catch (error) {
      // Closing the native share sheet is not an error the reader needs to see.
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }

      window.location.href = `mailto:?subject=${encodeURIComponent(
        'Gareth MacLeod — Audio Essays',
      )}&body=${encodeURIComponent(feedUrl)}`;
    }
  }

  return (
    <button type="button" className="listen-action" onClick={shareFeed}>
      {label}
    </button>
  );
}
