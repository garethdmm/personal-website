# Adding an audio edition

Audio is deliberately a static-file feature. It needs no account, database, podcast
host, or subscription, and it continues to work with Next's static export.

## Publish an MP3

1. Record or generate a spoken version of the essay and export it as an MP3. Make
   sure you have the rights and consent required for any cloned or synthetic voice.
2. Keep the finished file reasonably small (64–96 kbps mono is usually sufficient
   for speech), create `public/audio/` if needed, and copy the MP3 into it.
3. Open `app/audio-posts.ts`, find the essay, and replace `src: null` with its public
   path—for example:

   ```ts
   src: '/audio/how-to-feel-when-your-startup-feels-easy.mp3',
   duration: '12 min',
   ```

4. Run `npm run build`. The post will now render an inline player plus Download,
   Send / share, Copy link, and Email actions. The homepage will also mark that
   essay as available in audio.
5. Open the exported site over HTTPS and test the native share action on at least
   one phone. Web Share support and available destinations vary by browser and
   operating system; Download, Copy link, and Email remain available regardless.

Do not configure `src` before the file exists. A `null` source intentionally renders
an honest "being recorded" state and makes no media request.

## About podcast apps

This implementation distributes ordinary MP3 files and links. It does not claim
that Apple Podcasts or Spotify can import arbitrary files. A future podcast-feed
variant would require an RSS feed, stable public audio URLs, podcast artwork and
metadata, plus separate submission and account setup with each directory.
