import { podcastConfig } from '@/app/lib/podcast';
import SharePodcastButton from './SharePodcastButton';

export default function PodcastPromo() {
  const hasDirectoryLink =
    podcastConfig.directoryLinks.apple ||
    podcastConfig.directoryLinks.spotify;

  return (
    <section className="podcast-promo" aria-labelledby="audio-essays">
      <p className="listen-eyebrow">Listen later</p>
      <h2 id="audio-essays" className="podcast-promo-title">
        Writing, away from the screen
      </h2>
      <p className="podcast-promo-copy">
        Spoken editions of these essays are coming to a public podcast feed.
        Follow once, then listen on a walk, in the car, or wherever you already
        keep your podcasts.
      </p>
      <div className="listen-actions">
        {podcastConfig.directoryLinks.apple && (
          <a
            className="listen-action"
            href={podcastConfig.directoryLinks.apple}
            rel="noreferrer"
          >
            Apple Podcasts
          </a>
        )}
        {podcastConfig.directoryLinks.spotify && (
          <a
            className="listen-action"
            href={podcastConfig.directoryLinks.spotify}
            rel="noreferrer"
          >
            Spotify
          </a>
        )}
        <a
          className="listen-action listen-action-primary"
          href={podcastConfig.feedPath}
        >
          Follow via RSS
        </a>
        <SharePodcastButton feedUrl={podcastConfig.feedUrl} />
      </div>
      {!hasDirectoryLink && (
        <p className="listen-note">
          Podcast-app links will be added after the first recording is
          published.
        </p>
      )}
    </section>
  );
}
