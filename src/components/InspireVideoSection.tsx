import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { VideoItem, Language } from '../types';

interface InspireVideoSectionProps {
  videos: VideoItem[];
  language: Language;
  onPlayVideo: (videoUrl: string, title: string) => void;
  mainVideo: {
    background: string;
    videoUrl: string;
    titleRu: string;
    titleEn: string;
  };
}

export const InspireVideoSection: React.FC<InspireVideoSectionProps> = ({
  videos,
  language,
  onPlayVideo,
  mainVideo,
}) => {
  return (
    <section
      id="video"
      className="relative w-full min-h-screen bg-transparent flex flex-col justify-between overflow-hidden py-24 sm:py-32 px-6 sm:px-8 lg:px-12 select-none border-t border-white/10"
    >
      {/* Main Content Container - text fonts and video cards only */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        {/* Top/Middle Area: Big Headline & Play Button */}
        <div className="max-w-2xl pt-12 sm:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Geometric index metadata */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#ff5500]"></span>
              <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-400 uppercase">
                ARCHIVE // 03 • CINEMATIC EXPERIENCE
              </span>
            </div>

            {/* Headline matching reference: TRAVEL AND INSPIRE YOUR LIFE */}
            <h2 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white leading-[0.92] mb-8 drop-shadow-2xl">
              TRAVEL AND
              <br />
              INSPIRE YOUR
              <br />
              LIFE
            </h2>

            {/* Play Button with sharp geometric accents & diagonal accent line */}
            <div className="relative inline-flex items-center gap-4 group cursor-pointer mb-12">
              <button
                id="main-play-video-btn"
                onClick={() =>
                  onPlayVideo(
                    mainVideo.videoUrl,
                    language === 'ru' ? mainVideo.titleRu : mainVideo.titleEn
                  )
                }
                className="flex items-center gap-3.5 focus:outline-none cursor-pointer"
              >
                <span className="w-11 h-11 rounded-none border border-white/60 flex items-center justify-center bg-black/60 backdrop-blur-sm group-hover:border-[#ff5500] group-hover:bg-[#ff5500] transition-all duration-300 shadow-lg">
                  <Play className="w-4 h-4 text-white fill-white ml-0.5 group-hover:scale-110 transition-transform" />
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-white uppercase group-hover:text-zinc-200 transition-colors font-mono">
                  {language === 'ru' ? 'Смотреть видео' : 'Watch video'}
                </span>
              </button>

              {/* Diagonal accent pointer line extending from the play button as seen in reference */}
              <div className="hidden sm:block absolute left-48 top-8 w-28 h-[1px] bg-white/40 rotate-[35deg] origin-left pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Area: Description on left, 2 Video Cards on right matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-16 sm:pt-24 border-t border-white/10 relative">
          <span className="absolute -top-2.5 left-0 font-mono text-[10px] text-white/30 select-none">+</span>
          <span className="absolute -top-2.5 right-0 font-mono text-[10px] text-white/30 select-none">+</span>

          {/* Left Description matching reference paragraph */}
          <div className="lg:col-span-5 max-w-sm">
            <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed font-normal">
              {language === 'ru'
                ? 'Погрузитесь в кинематографическое путешествие по древним храмам, заснеженным вершинам Гималаев и тропическим заводям Индии.'
                : 'Immerse yourself in breathtaking cinematic captures of ancient temples, celestial Himalayan starry skies, and serene Indian tropical backwaters.'}
            </p>
          </div>

          {/* Right Two Video Preview Cards with play buttons matching reference */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {videos.map((vid) => (
              <motion.div
                key={vid.id}
                id={`video-card-${vid.id}`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() =>
                  onPlayVideo(
                    vid.videoUrl,
                    language === 'ru' ? vid.titleRu : vid.titleEn
                  )
                }
                className="group relative h-40 sm:h-48 rounded-none overflow-hidden cursor-pointer border border-white/20 hover:border-white/50 bg-zinc-950 transition-all duration-300"
              >
                {/* Video thumbnail */}
                <img
                  src={vid.thumbnail}
                  alt={language === 'ru' ? vid.titleRu : vid.titleEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.78] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors" />

                {/* Centered Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="w-10 h-10 rounded-none border border-white/70 bg-black/60 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#ff5500] group-hover:border-[#ff5500] transition-all duration-300 shadow-xl">
                    <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                  </span>
                </div>

                {/* Subtle bottom tag in monospace */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-zinc-300 font-mono drop-shadow">
                  <span className="truncate max-w-[160px]">
                    {language === 'ru' ? vid.titleRu : vid.titleEn}
                  </span>
                  <span className="text-zinc-300 bg-black/80 px-1.5 py-0.5 border border-white/15">
                    {vid.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
