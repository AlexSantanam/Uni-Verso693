import React, { useEffect, useRef, useState } from 'react';
import plasmaSrc from '../../asset/plasma-sphere.mp4';
import { PlasmaGlobe } from './PlasmaGlobe';

/**
 * Looping plasma-sphere video. The black background is removed with
 * mix-blend-mode: screen and a soft circular mask hides any frame edge.
 * Falls back to the WebGL globe if the video cannot play.
 */
export const PlasmaVideo: React.FC<{ className?: string }> = ({ className = '' }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return;
    }
    video.play().catch(() => {
      /* autoplay blocked: the first frame still shows */
    });
  }, []);

  if (failed) return <PlasmaGlobe className={className} />;

  return (
    <div className={`orb plasma-video ${className}`} aria-hidden>
      <video
        ref={ref}
        src={plasmaSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        onContextMenu={(e) => e.preventDefault()}
        onError={() => setFailed(true)}
      />
    </div>
  );
};
