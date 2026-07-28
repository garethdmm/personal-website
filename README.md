Gareth's personal website circa 2026. Intended to be a small collection of works and offramps to other sources like GitHub.

## Synthetic narration (manual setup)

This branch contains the plumbing for an optional audio version of each post. No
voice or audio is included by default. The site renders a player and a
download-to-listen-later link only when an entry exists in
`app/generated/audio-manifest.json`; the generation workflow updates that
manifest and the matching `public/audio/*.mp3` together.

The implementation uses ElevenLabs' current text-to-speech endpoint:

```text
POST /v1/text-to-speech/:voice_id?output_format=mp3_44100_128
xi-api-key: ...
```

It defaults to `eleven_multilingual_v2`, extracts the marked article body from
each TSX page, and divides it at paragraph/sentence boundaries into conservative
3,800-character requests. Requests run sequentially with limited retry handling.
The script supplies up to 500 characters of `previous_text`/`next_text` for
cross-chunk context, then ffmpeg decodes and re-encodes the chunks into one
44.1 kHz, 128 kbps MP3. This assumes those context fields and the output format
remain supported by ElevenLabs' v1 API; verify the API reference when upgrading.

### Voice consent and account setup

1. Only create or use a clone of a voice you own, or a voice for which the
   speaker has given explicit, informed permission for cloning and public
   distribution. Do not upload recordings containing other speakers.
2. In ElevenLabs, create a Professional Voice Clone for Gareth and complete
   ElevenLabs' voice-verification/consent flow. For best narrative output, record
   clean, single-speaker, narrative-style material in a quiet room. ElevenLabs
   recommends roughly 1–3 hours of consistent training audio for a professional
   clone.
3. Copy the clone's **Voice ID** from **My Voices**. The ID is configuration,
   not a password; the API key is a secret.
4. In this GitHub repository, open **Settings → Secrets and variables → Actions**:
   - Add repository secret `ELEVENLABS_API_KEY`.
   - Add repository variable `ELEVENLABS_VOICE_ID`.
   - Optionally add `ELEVENLABS_MODEL_ID`; when absent, the workflow uses
     `eleven_multilingual_v2`.
5. Under **Settings → Actions → General → Workflow permissions**, allow read and
   write access and allow GitHub Actions to create pull requests. Organization
   policy can override these settings.

### Running it

Before spending credits, run the local checks:

```bash
npm ci
npm test
npm run narrate:dry-run
npm run build
```

After this feature is on the default branch, first generate and listen to enough
samples in ElevenLabs to be comfortable publishing the clone's output. Then open
**Actions → Generate narrated posts → Run workflow**. Choose one post first,
check both the cost/data-sharing and public-voice confirmations, and run it from
the branch that should be the PR base. The workflow sends that post's text to
ElevenLabs, creates a new `audio/narration-*` branch, validates the static
export, and opens a draft PR. Listen through the entire MP3—including every
chunk boundary—before merging it into the live site.

### Cost, privacy, and storage tradeoffs

- Generation is manual and billable. ElevenLabs plans and character prices
  change; use the dry run's character totals with the current ElevenLabs pricing
  page before running. Selecting `all` re-generates and re-bills all four posts.
- The API key is read only from GitHub Actions secrets and is never written to
  files or logs. Article text is sent to ElevenLabs for processing.
- A cloned voice and its output are sensitive likeness assets. The review PR is
  a gate before the live site links the audio, but it is not a confidentiality
  gate: this repository is public, so the raw MP3 becomes public as soon as the
  workflow pushes its branch. The second workflow confirmation is therefore
  explicit publication consent. For private quality control, generate locally
  or move previews to authenticated private storage before running this workflow.
- A failed run can still consume credits for chunks ElevenLabs completed.
  Re-running starts fresh and can bill those characters again.
- MP3s live in Git so the static export has no runtime service dependency. This
  is simple for four posts but grows repository history. If the catalogue grows,
  move audio to durable object storage/CDN and store only public URLs in the
  manifest.
- GitHub's token may be prevented from opening PRs by repository or organization
  policy. If so, the pushed `audio/narration-*` branch can be opened as a draft
  PR manually; no re-generation is required.

The script intentionally does not call ElevenLabs in tests or dry-run mode.
