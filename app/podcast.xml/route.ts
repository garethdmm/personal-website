import {
  articleUrl,
  getPublishedPodcastEpisodes,
  podcastConfig,
} from '@/app/lib/podcast';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const padded = (value: number) => value.toString().padStart(2, '0');

  return hours > 0
    ? `${hours}:${padded(minutes)}:${padded(seconds)}`
    : `${minutes}:${padded(seconds)}`;
}

export function GET() {
  const episodes = getPublishedPodcastEpisodes();
  const latestUpdate =
    episodes[0]?.audio?.publishedAt ?? podcastConfig.updatedAt;
  const artwork = podcastConfig.artworkUrl
    ? `\n    <itunes:image href="${escapeXml(podcastConfig.artworkUrl)}" />`
    : '';
  const items = episodes
    .map((episode) => {
      const audio = episode.audio;

      if (!audio) {
        return '';
      }

      return `
    <item>
      <title>${escapeXml(episode.title)}</title>
      <link>${escapeXml(articleUrl(episode.slug))}</link>
      <guid isPermaLink="false">${escapeXml(episode.guid)}</guid>
      <description>${escapeXml(episode.description)}</description>
      <pubDate>${new Date(audio.publishedAt).toUTCString()}</pubDate>
      <enclosure url="${escapeXml(audio.url)}" length="${audio.byteLength}" type="${audio.mimeType}" />
      <itunes:author>${escapeXml(podcastConfig.author)}</itunes:author>
      <itunes:explicit>${podcastConfig.explicit}</itunes:explicit>
      <itunes:duration>${formatDuration(audio.durationSeconds)}</itunes:duration>
      <itunes:episodeType>full</itunes:episodeType>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>${escapeXml(podcastConfig.title)}</title>
    <link>${escapeXml(podcastConfig.siteUrl)}</link>
    <description>${escapeXml(podcastConfig.description)}</description>
    <language>${podcastConfig.language}</language>
    <lastBuildDate>${new Date(latestUpdate).toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(podcastConfig.feedUrl)}" rel="self" type="application/rss+xml" />
    <itunes:author>${escapeXml(podcastConfig.author)}</itunes:author>
    <itunes:summary>${escapeXml(podcastConfig.description)}</itunes:summary>
    <itunes:explicit>${podcastConfig.explicit}</itunes:explicit>
    <itunes:type>episodic</itunes:type>
    <itunes:category text="${escapeXml(podcastConfig.category)}" />
    <itunes:owner>
      <itunes:name>${escapeXml(podcastConfig.author)}</itunes:name>
      <itunes:email>${escapeXml(podcastConfig.ownerEmail)}</itunes:email>
    </itunes:owner>${artwork}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
