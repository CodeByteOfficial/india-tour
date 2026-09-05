import React, { useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="video-player-modal"
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#050505] border border-white/20 rounded-none overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar with Geometric Balance metadata */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/15 bg-black/80">
          <div className="flex items-center gap-2.5 truncate max-w-[80%]">
            <span className="w-1.5 h-1.5 bg-[#ff5500]"></span>
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:inline">
              CINEMATIC ARCHIVE //
            </span>
            <h3 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-white truncate">
              {title}
            </h3>
          </div>
          <button
            id="close-video-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-none border border-white/20 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-[#ff5500] hover:border-[#ff5500] transition-all cursor-pointer"
            aria-label="Close video player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            controls
            playsInline
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
