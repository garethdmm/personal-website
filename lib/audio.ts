import audioManifestData from '@/app/generated/audio-manifest.json';

export type AudioEntry = {
  src: string;
  bytes: number;
  durationSeconds: number;
  generatedAt: string;
  model: string;
  sha256: string;
};

const audioManifest = audioManifestData as Record<string, AudioEntry>;

export function getPostAudio(slug: string) {
  return audioManifest[slug];
}
