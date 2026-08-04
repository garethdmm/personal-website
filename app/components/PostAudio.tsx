import { getPostAudio } from '@/lib/audio';

function formatDuration(durationSeconds: number) {
  const minutes = Math.max(1, Math.round(durationSeconds / 60));
  return `${minutes} min`;
}

export function PostAudio({ slug }: { slug: string }) {
  const audio = getPostAudio(slug);

  if (!audio) {
    return null;
  }

  const descriptionId = `audio-description-${slug}`;

  return (
    <aside
      aria-label="Audio version"
      className="my-7 border-y border-[#e0e0e0] py-4 font-sans text-[0.85rem]"
    >
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <p className="m-0 font-semibold text-[#333]">Listen to this post</p>
        <p id={descriptionId} className="m-0 shrink-0 text-[0.78rem] text-[#777]">
          Synthetic narration · {formatDuration(audio.durationSeconds)}
        </p>
      </div>
      <audio
        aria-describedby={descriptionId}
        className="block h-10 w-full"
        controls
        preload="metadata"
        src={audio.src}
      >
        Your browser does not support audio playback.{' '}
        <a href={audio.src}>Open the MP3 instead.</a>
      </audio>
      <p className="mb-0 mt-3">
        <a href={audio.src} download>
          Download MP3 to listen later
        </a>
      </p>
    </aside>
  );
}
