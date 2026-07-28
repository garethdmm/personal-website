# Podcast setup

The site now exports a well-formed, public RSS document at `/podcast.xml`.
It is deliberately a **pre-launch feed**, not yet a submission-ready podcast:
there is no artwork and there are no audio enclosures until real assets are
configured.

The website is useful before launch:

- every essay advertises the planned audio edition;
- readers can follow or share the RSS URL now;
- Apple Podcasts and Spotify are shown as “after launch,” not as broken links;
- feed discovery metadata is present in every page `<head>`.

## 1. Produce and host the first recording

Create a final MP3, then upload it to durable public object storage or a
podcast host. Do not commit large recordings to this repository. The final URL
must:

- use HTTPS and remain stable;
- return the exact `Content-Length` for a `HEAD` request;
- support byte-range requests (`206 Partial Content`);
- use a unique URL for each episode;
- return an audio MIME type such as `audio/mpeg`.

Verify the host before editing the feed:

```sh
curl -I https://audio.example.com/episode.mp3
curl -sS -D - -o /dev/null -H 'Range: bytes=0-1023' https://audio.example.com/episode.mp3
wc -c episode.mp3
ffprobe -v error -show_entries format=duration -of csv=p=0 episode.mp3
```

The first request should report `200`, `Content-Length`, and `audio/mpeg`. The
range request should report `206`. `wc -c` supplies `byteLength`; round the
`ffprobe` result to a whole number for `durationSeconds`.

## 2. Complete the central configuration

All editable podcast data is in `app/lib/podcast.ts`.

1. Confirm `podcastConfig.siteUrl`. The default is the production site,
   `https://garethdmm.com`. Set `NEXT_PUBLIC_SITE_URL` at build time for a
   preview or a future domain change; omit the trailing slash.
2. Upload square JPEG or PNG show artwork. A 3000 × 3000 image is a safe shared
   target for Apple and Spotify. Set its permanent HTTPS URL as `artworkUrl`.
3. Confirm the show title, description, author, owner email, language,
   `category`, and explicit-content setting.
4. Replace the relevant episode’s `audio: null` with:

```ts
audio: {
  url: 'https://audio.example.com/episode.mp3',
  byteLength: 12345678,
  mimeType: 'audio/mpeg',
  durationSeconds: 742,
  publishedAt: '2026-08-01T09:00:00-04:00',
},
```

Keep each existing `guid` unchanged after publication. A stable, unique GUID is
how podcast apps recognize an episode across feed refreshes.

Then run `npm run build` and inspect `out/podcast.xml`. A submission-ready feed
needs, at minimum:

- public artwork;
- at least one `<item>`;
- a stable GUID for every item;
- a unique enclosure URL, exact byte length, and correct MIME type;
- an audio host that passes the `HEAD` and byte-range checks above.

## 3. Submit the same feed to directories

After the first episode and artwork are live, submit the public feed URL:

`https://garethdmm.com/podcast.xml`

- Apple Podcasts Connect: <https://podcastsconnect.apple.com/>
- Spotify for Creators: <https://creators.spotify.com/>

If `NEXT_PUBLIC_SITE_URL` changes, submit the resulting
`{NEXT_PUBLIC_SITE_URL}/podcast.xml` instead. Complete ownership verification
using the email in `ownerEmail`. After approval, paste the public show URLs into
`directoryLinks.apple` and `directoryLinks.spotify`; the site will then render
real directory buttons everywhere.

## 4. Voice options

The simplest, highest-trust version is Gareth reading each essay and exporting
an edited MP3. A voice clone can be a later production step: train only on
Gareth’s recordings with his explicit consent, review the entire render, and
export the final MP3 before deploying. Keep provider credentials and synthesis
outside this static site—the website needs only the finished audio URL and
metadata above.
