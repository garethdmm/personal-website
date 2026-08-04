import {
  EpisodeSlug,
  getPodcastEpisode,
  podcastConfig,
} from '@/app/lib/podcast';
import SharePodcastButton from './SharePodcastButton';

type ListenLaterProps = {
  slug: EpisodeSlug;
};

function formatDuration(totalSeconds: number): string {
  const minutes = Math.max(1, Math.round(totalSeconds / 60));
  return `${minutes} min`;
}

export default function ListenLater({ slug }: ListenLaterProps) {
  const episode = getPodcastEpisode(slug);
  const audio = episode.audio;
  const isAvailable = audio !== null;

  return (
    <aside className="listen-later" aria-labelledby={`listen-${slug}`}>
      <p className="listen-eyebrow">
        {isAvailable ? 'Audio edition' : 'Listen later · audio edition planned'}
      </p>
      <h2 id={`listen-${slug}`} className="listen-title">
        Take this essay with you
      </h2>
      <p className="listen-copy">
        {isAvailable
          ? `Listen here or follow the feed in your usual podcast app. ${formatDuration(
              audio.durationSeconds,
            )}.`
          : 'Follow the RSS feed now and the spoken edition will arrive in your podcast app when it is published.'}
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
        {audio && (
          <a className="listen-action" href={audio.url}>
            Play MP3
          </a>
        )}
        <a
          className="listen-action listen-action-primary"
          href={podcastConfig.feedPath}
        >
          Podcast RSS
        </a>
        <SharePodcastButton feedUrl={podcastConfig.feedUrl} />
      </div>
      {!isAvailable && (
        <p className="listen-note">
          Apple Podcasts and Spotify links will appear after the first episode
          is live.
        </p>
      )}
    </aside>
  );
}
