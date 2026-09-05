import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { Tour, Language } from '../types';

interface PopularToursSectionProps {
  tours: Tour[];
  language: Language;
  onSelectTour: (tour: Tour) => void;
}

export const PopularToursSection: React.FC<PopularToursSectionProps> = ({
  tours,
  language,
  onSelectTour,
}) => {
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  return (
    <section
      id="tours"
      className="relative w-full bg-transparent py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Geometric Balance metadata */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#ff5500]"></span>
            <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-400 uppercase">
              INDEX // 02 • CURATED TOURS
            </span>
          </div>
          <p className="text-zinc-500 text-xs sm:text-[13px] tracking-wide mb-3 lowercase font-normal">
            {language === 'ru' ? 'и получите незабываемые эмоции' : 'and get unforgettable emotions'}
          </p>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.15em] text-white">
            {language === 'ru' ? 'ПОПУЛЯРНЫЕ ТУРЫ' : 'POPULAR TOURS'}
          </h2>
        </div>

        {/* 4 Cards Grid with Geometric Balance sharp edges & hairline borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {tours.map((tour) => {
            const isHovered = hoveredCardId === tour.id;
            return (
              <motion.div
                key={tour.id}
                id={`tour-card-${tour.id}`}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onMouseEnter={() => setHoveredCardId(tour.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => onSelectTour(tour)}
                className="group relative rounded-none overflow-hidden cursor-pointer bg-zinc-950 border border-white/15 hover:border-white/40 transition-all duration-300 flex flex-col justify-end min-h-[440px] sm:min-h-[480px]"
              >
                {/* Image background with subtle zoom */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={language === 'ru' ? tour.titleRu : tour.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter brightness-[0.8] contrast-[1.08] group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle dark gradient overlay towards bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Subtle top pill on hover with sharp corners */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-2.5 py-1 rounded-none bg-black/85 backdrop-blur-md text-[10px] font-mono tracking-wider text-zinc-200 border border-white/20 flex items-center gap-1.5">
                    <Eye className="w-3 h-3 text-[#ff5500]" />
                    {language === 'ru' ? 'Подробнее' : 'Details'}
                  </span>
                </div>

                {/* Bottom Content: ТУР №1 / и получите незабываемые */}
                <div className="relative z-10 p-6 sm:p-7 text-center">
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl uppercase tracking-wider text-white mb-1.5 group-hover:text-zinc-100 transition-colors">
                    {language === 'ru' ? tour.tourNumberRu : tour.tourNumberEn}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-[13px] font-normal leading-relaxed">
                    {language === 'ru' ? tour.subtitleRu : tour.subtitleEn}
                  </p>

                  {/* Metadata revealed smoothly on hover in crisp monospace */}
                  <div className="max-h-0 group-hover:max-h-20 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden pt-0 group-hover:pt-3 flex items-center justify-center gap-3 text-[11px] font-mono text-zinc-300">
                    <span className="text-[#ff5500] font-semibold">{tour.price}</span>
                    <span className="text-white/30">//</span>
                    <span>{tour.duration}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Geometric Balance hairline divider and accent indicator */}
        <div className="mt-14 flex items-center justify-center gap-4">
          <div className="w-16 h-[1px] bg-white/20" />
          <div className="w-24 h-[2px] bg-[#ff5500] shadow-[0_0_8px_rgba(255,85,0,0.8)]" />
          <div className="w-16 h-[1px] bg-white/20" />
        </div>
      </div>
    </section>
  );
};
