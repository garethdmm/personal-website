'use client';

import { useState } from 'react';
import type { AudioPost } from '../audio-posts';

type TakeWithYouProps = {
  audio: AudioPost;
};

function absoluteAudioUrl(src: string) {
  return new URL(src, window.location.origin).toString();
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = value;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  const copied = document.execCommand('copy');
  textArea.remove();

  if (!copied) {
    throw new Error('Copy failed');
  }
}

function wasCancelled(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError';
}

export default function TakeWithYou({ audio }: TakeWithYouProps) {
  const [status, setStatus] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const audioSrc = audio.src;

  if (!audioSrc) {
    return (
      <aside className="audio-takeaway audio-takeaway-unavailable" aria-label="Audio edition">
        <p className="audio-eyebrow">Take this essay with you</p>
        <p className="audio-description">
          The audio edition is being recorded. When it is ready, you will be able to
          listen here, download the MP3, or send it to another device—without making
          an account.
        </p>
      </aside>
    );
  }

  const handleCopy = async () => {
    try {
      await copyText(absoluteAudioUrl(audioSrc));
      setStatus('Audio link copied.');
    } catch {
      setStatus('Could not copy the link. Try Download or Email instead.');
    }
  };

  const handleEmail = () => {
    const url = absoluteAudioUrl(audioSrc);
    const subject = `Listen later: ${audio.title}`;
    const body = `Here is the audio edition of “${audio.title}”:\n\n${url}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleShare = async () => {
    const url = absoluteAudioUrl(audioSrc);
    setIsSharing(true);
    setStatus('');

    if (!navigator.share) {
      try {
        await copyText(url);
        setStatus('Your browser has no share menu, so the audio link was copied.');
      } catch {
        setStatus('Sharing is unavailable here. Try Download, Copy link, or Email.');
      } finally {
        setIsSharing(false);
      }
      return;
    }

    try {
      try {
        const response = await fetch(audioSrc);
        if (response.ok) {
          const blob = await response.blob();
          const file = new File([blob], audio.fileName, {
            type: blob.type || 'audio/mpeg',
          });

          if (navigator.canShare?.({ files: [file] })) {
            try {
              await navigator.share({
                title: audio.title,
                files: [file],
              });
              setStatus('Audio shared.');
              return;
            } catch (error) {
              if (wasCancelled(error)) {
                return;
              }
              // File sharing can fail even when URL sharing works; continue below.
            }
          }
        }
      } catch {
        // The direct file fetch is an enhancement. URL sharing still works.
      }

      await navigator.share({
        title: audio.title,
        text: `Listen to “${audio.title}”`,
        url,
      });
      setStatus('Audio link shared.');
    } catch (error) {
      if (wasCancelled(error)) {
        return;
      }

      try {
        await copyText(url);
        setStatus('The share menu did not open, so the audio link was copied.');
      } catch {
        setStatus('Sharing is unavailable here. Try Download, Copy link, or Email.');
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <aside className="audio-takeaway" aria-labelledby="audio-takeaway-title">
      <div className="audio-heading">
        <p className="audio-eyebrow" id="audio-takeaway-title">
          Take this essay with you
        </p>
        {audio.duration && <span className="audio-duration">{audio.duration}</span>}
      </div>

      <p className="audio-description">
        Listen here, or keep the MP3 for your commute, a walk, or later.
      </p>

      <audio className="audio-player" controls preload="metadata">
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support embedded audio. Download the MP3 instead.
      </audio>

      <div className="audio-actions" aria-label="Ways to take this essay with you">
        <a
          className="audio-action audio-action-primary"
          href={audioSrc}
          download={audio.fileName}
        >
          Download MP3
        </a>
        <button
          className="audio-action"
          type="button"
          onClick={handleShare}
          disabled={isSharing}
        >
          {isSharing ? 'Preparing…' : 'Send / share'}
        </button>
        <button className="audio-action" type="button" onClick={handleCopy}>
          Copy link
        </button>
        <button className="audio-action" type="button" onClick={handleEmail}>
          Email to myself
        </button>
      </div>

      <p className="audio-note">
        Downloads open in ordinary audio players. Send / share uses your device&apos;s
        share menu when available.
      </p>
      <p className="audio-status" role="status" aria-live="polite">
        {status}
      </p>
    </aside>
  );
}
