import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, GlassWater, Plane } from 'lucide-react';
import { Destination, Language } from '../types';

interface HeroSectionProps {
  destinations: Destination[];
  activeDestinationIndex: number;
  onSelectDestination: (index: number) => void;
  language: Language;
  onLearnMore: (featureIndex: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  destinations,
  activeDestinationIndex,
  onSelectDestination,
  language,
  onLearnMore,
}) => {
  const current = destinations[activeDestinationIndex] || destinations[2]; // Default to India (03)

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-transparent select-none"
    >
      {/* Main Content Area - Text fonts, typography and cards only */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-32 sm:pt-40 flex-1 flex flex-col justify-between pb-12 sm:pb-16">
        {/* Top/Middle row: Big Headline on left, Vertical Slider on right */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mt-6 sm:mt-12">
          {/* Main Huge Headline matching reference & Geometric Balance */}
          <div className="max-w-xl">
            {/* Geometric metadata badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#ff5500]"></span>
              <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-400 uppercase">
                EXPEDITION // DESTINATION {current.slideNumber}
              </span>
            </div>

            <motion.div
              key={current.id + '-title'}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-heading font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tight text-white leading-[0.88]">
                <span>{current.prefix}</span>
                <br />
                <span className="text-white">
                  {current.city}
                </span>
              </h1>
            </motion.div>
          </div>

          {/* Right Vertical Numeric Slider with Geometric Balance markers */}
          <div className="lg:self-center flex flex-row lg:flex-col items-center gap-4 sm:gap-6 lg:gap-4 self-end lg:pr-4">
            {destinations.map((dest, idx) => {
              const isActive = idx === activeDestinationIndex;
              return (
                <button
                  key={dest.id}
                  id={`hero-slide-btn-${dest.slideNumber}`}
                  onClick={() => onSelectDestination(idx)}
                  className="group flex items-center gap-3 cursor-pointer py-1.5 focus:outline-none text-left"
                >
                  <span
                    className={`font-mono text-xs sm:text-sm lg:text-base tracking-widest transition-all duration-300 ${
                      isActive
                        ? 'font-bold text-white scale-110'
                        : 'text-zinc-500 hover:text-zinc-300 font-normal'
                    }`}
                  >
                    {isActive ? `[ ${dest.slideNumber} ]` : dest.slideNumber}
                  </span>

                  {/* The active horizontal line extending to the right */}
                  {isActive && (
                    <motion.span
                      layoutId="activeSlideIndicator"
                      className="hidden sm:inline-block w-10 lg:w-16 h-[2px] bg-[#ff5500] shadow-[0_0_8px_rgba(255,85,0,0.8)]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Feature Cards: 3 cards with outline icons, text fonts & links */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-white/10 relative">
          {/* Subtle geometric crosshair mark */}
          <span className="absolute -top-2.5 left-0 font-mono text-[10px] text-white/30 select-none">+</span>
          <span className="absolute -top-2.5 right-0 font-mono text-[10px] text-white/30 select-none">+</span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {current.features.map((feature, index) => {
              const isActiveUnderline = feature.active || index === 0;
              return (
                <div
                  key={index}
                  id={`hero-feature-col-${index + 1}`}
                  className="relative flex flex-col justify-between group p-5 sm:p-6 border border-white/15 hover:border-white/35 bg-black/50 backdrop-blur-md transition-all rounded-none"
                >
                  {/* Geometric index & icon row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-zinc-300 group-hover:text-white transition-colors">
                      {feature.icon === 'mountain' && (
                        <Mountain className="w-5 h-5 stroke-[1.5] text-zinc-300 group-hover:text-[#ff5500] transition-colors" />
                      )}
                      {feature.icon === 'cocktail' && (
                        <GlassWater className="w-5 h-5 stroke-[1.5] text-zinc-300 group-hover:text-[#ff5500] transition-colors" />
                      )}
                      {feature.icon === 'plane' && (
                        <Plane className="w-5 h-5 stroke-[1.5] text-zinc-300 group-hover:text-[#ff5500] transition-colors" />
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500 tracking-wider">
                      [ 0{index + 1} ]
                    </span>
                  </div>

                  {/* Paragraph text matching reference */}
                  <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed mb-6 max-w-xs font-normal">
                    {language === 'ru' ? feature.textRu : feature.textEn}
                  </p>

                  {/* Link CTA matching reference: ПОДРОБНЕЕ → */}
                  <div className="pt-2 border-t border-white/5">
                    <button
                      onClick={() => onLearnMore(index)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] uppercase text-white hover:text-zinc-200 transition-colors cursor-pointer group/link font-mono"
                    >
                      <span>
                        {language === 'ru' ? feature.linkTextRu : feature.linkTextEn}
                      </span>
                    </button>
                    {/* Orange accent line indicator under the active/first column */}
                    {isActiveUnderline ? (
                      <div className="w-full sm:w-32 h-[2px] bg-[#ff5500] mt-2 shadow-[0_0_8px_rgba(255,85,0,0.8)]" />
                    ) : (
                      <div className="w-full sm:w-32 h-[1px] bg-white/10 mt-2 group-hover:bg-white/30 transition-colors" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
