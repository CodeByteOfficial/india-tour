import React, { useEffect, useRef, useState } from 'react';

interface ScrollCanvasBackgroundProps {
  totalFrames?: number;
  framePrefix?: string;
  frameExtension?: string;
}

export const ScrollCanvasBackground: React.FC<ScrollCanvasBackgroundProps> = ({
  totalFrames = 260,
  framePrefix = '/frames/',
  frameExtension = '.jpg',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef<number>(0);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Animation frame state for smooth lerping
  const targetFrameRef = useRef<number>(1);
  const currentFrameRef = useRef<number>(1);
  const lastRenderedFrameRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);

  // Get frame file path helper
  const getFramePath = (index: number) => {
    const padded = String(index).padStart(4, '0');
    return `${framePrefix}${padded}${frameExtension}`;
  };

  // Preload frames logic
  useEffect(() => {
    imagesRef.current = new Array(totalFrames + 1);
    let isMounted = true;
    let count = 0;

    // Load first frame urgently for initial draw
    const img1 = new Image();
    img1.src = getFramePath(1);
    img1.onload = () => {
      if (!isMounted) return;
      imagesRef.current[1] = img1;
      count++;
      loadedCountRef.current = count;
      drawFrame(1);
    };

    // Load remaining frames
    for (let i = 1; i <= totalFrames; i++) {
      if (i === 1 && img1.complete) continue;
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (!isMounted) return;
        imagesRef.current[i] = img;
        count++;
        loadedCountRef.current = count;
        const progress = Math.floor((count / totalFrames) * 100);
        setLoadProgress(progress);
        if (count >= totalFrames) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        if (!isMounted) return;
        count++;
        loadedCountRef.current = count;
      };
    }

    return () => {
      isMounted = false;
    };
  }, [totalFrames]);

  // Helper to draw a frame onto canvas with object-fit: cover logic
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find requested frame or fallback to nearest loaded frame
    let imgToDraw = imagesRef.current[frameIndex];
    if (!imgToDraw || !imgToDraw.complete) {
      // Search backwards first
      for (let i = frameIndex - 1; i >= 1; i--) {
        if (imagesRef.current[i] && imagesRef.current[i].complete) {
          imgToDraw = imagesRef.current[i];
          break;
        }
      }
      // If still null, search forwards
      if (!imgToDraw || !imgToDraw.complete) {
        for (let i = frameIndex + 1; i <= totalFrames; i++) {
          if (imagesRef.current[i] && imagesRef.current[i].complete) {
            imgToDraw = imagesRef.current[i];
            break;
          }
        }
      }
    }

    if (!imgToDraw || !imgToDraw.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Ensure canvas dimensions match screen
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Cover math
    const imgW = imgToDraw.naturalWidth || imgToDraw.width || 1920;
    const imgH = imgToDraw.naturalHeight || imgToDraw.height || 1080;
    const imgRatio = imgW / imgH;
    const canvasRatio = width / height;

    let drawW: number, drawH: number, offsetX: number, offsetY: number;

    if (canvasRatio > imgRatio) {
      drawW = width;
      drawH = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawH) / 2;
    } else {
      drawW = height * imgRatio;
      drawH = height;
      offsetX = (width - drawW) / 2;
      offsetY = 0;
    }

    ctx.drawImage(imgToDraw, offsetX, offsetY, drawW, drawH);
    ctx.restore();

    lastRenderedFrameRef.current = frameIndex;
  };

  // Scroll event handler to update target frame
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
      const targetFrame = Math.max(
        1,
        Math.min(totalFrames, Math.round(progress * (totalFrames - 1)) + 1)
      );
      targetFrameRef.current = targetFrame;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [totalFrames]);

  // Smooth RAF animation loop for frame lerp & canvas redraw on window resize
  useEffect(() => {
    const animate = () => {
      // Lerp frame calculation for silky smooth scrolling
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.2;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameToDraw = Math.max(
        1,
        Math.min(totalFrames, Math.round(currentFrameRef.current))
      );

      if (frameToDraw !== lastRenderedFrameRef.current) {
        drawFrame(frameToDraw);
      }

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      drawFrame(Math.round(currentFrameRef.current));
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [totalFrames]);

  return (
    <>
      {/* Sticky Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0"
        style={{ width: '100vw', height: '100vh' }}
      />

      {/* Cinematic Gradient Overlays to preserve ultra-high text readability across all frames */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-gradient-to-b from-black/70 via-black/40 to-black/85" />
      <div className="fixed inset-0 pointer-events-none z-[1] bg-radial from-transparent via-black/20 to-black/60" />

      {/* Subtle Frame Loading Progress Indicator */}
      {!isLoaded && loadProgress < 100 && (
        <div className="fixed top-20 right-6 z-40 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10 rounded-none shadow-2xl transition-opacity duration-500">
          <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
          <span className="font-mono text-[10px] text-zinc-300 tracking-widest uppercase">
            LOADING ANIMATION // {loadProgress}%
          </span>
        </div>
      )}
    </>
  );
};
