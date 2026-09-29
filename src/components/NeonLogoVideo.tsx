import React, { useEffect, useRef, useState } from 'react';
import neonSrc from '../../asset/neon-logo.mp4';

// Keep some Android browsers (e.g. Xiaomi's) from swapping in their own player,
// which shows a cached site icon as the thumbnail while the clip loads.
const inlinePlayerAttrs = { 'webkit-playsinline': 'true', 'x5-playsinline': 'true', 'x5-video-player-type': 'h5-page' };

/**
 * Looping neon-logo video for the empty right side of inner-page heroes.
 * Same technique as PlasmaVideo: mix-blend-mode: screen drops the dark
 * background and a soft elliptical mask hides the frame edges.
 */
export const NeonLogoVideo: React.FC<{ className?: string }> = ({ className = '' }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // The clip starts dark and lights up, so hold a frame where the logo is lit.
      video.pause();
      const holdLitFrame = () => {
        video.currentTime = video.duration * 0.7;
      };
      if (video.readyState >= 1) holdLitFrame();
      else video.addEventListener('loadedmetadata', holdLitFrame, { once: true });
      return;
    }
    video.play().catch(() => {
      /* autoplay blocked: the first frame still shows */
    });
  }, []);

  if (failed) return null;

  return (
    <div className={`orb neon-video ${className}`} aria-hidden>
      <video
        ref={ref}
        src={neonSrc}
        autoPlay
        muted
        loop
        playsInline
        poster="/intro-poster.png"
        {...inlinePlayerAttrs}
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        onContextMenu={(e) => e.preventDefault()}
        onError={() => setFailed(true)}
      />
    </div>
  );
};
