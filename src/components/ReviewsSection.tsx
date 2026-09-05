import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Review, Language } from '../types';

interface ReviewsSectionProps {
  reviews: Review[];
  language: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  language,
}) => {
  return (
    <section
      id="reviews"
      className="relative w-full bg-transparent py-24 sm:py-32 px-6 sm:px-8 lg:px-12 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 relative">
          <span className="absolute -bottom-1.5 left-0 font-mono text-[10px] text-white/30 select-none">+</span>
          <span className="absolute -bottom-1.5 right-0 font-mono text-[10px] text-white/30 select-none">+</span>

          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#ff5500]"></span>
              <span className="font-mono text-[10px] tracking-[0.25em] text-zinc-400 uppercase">
                INDEX // 04 • TRAVELER REVIEWS
              </span>
            </div>
            <p className="text-zinc-500 text-xs sm:text-[13px] tracking-wide mb-2 font-normal">
              {language === 'ru' ? 'впечатления наших гостей' : 'impressions from our travelers'}
            </p>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl uppercase tracking-[0.15em] text-white">
              {language === 'ru' ? 'ОТЗЫВЫ ПУТЕШЕСТВЕННИКОВ' : 'TRAVELER REVIEWS'}
            </h2>
          </div>

          {/* Quick Stats with Geometric Balance monospace structure */}
          <div className="mt-6 md:mt-0 flex items-center gap-8 text-left">
            <div>
              <div className="font-heading font-black text-2xl text-white">4.98 / 5.0</div>
              <div className="text-[11px] text-zinc-400 font-mono tracking-wider">
                {language === 'ru' ? 'Рейтинг туров' : 'Tour rating'}
              </div>
            </div>
            <div className="w-[1px] h-8 bg-white/15" />
            <div>
              <div className="font-heading font-black text-2xl text-white">12,400+</div>
              <div className="text-[11px] text-zinc-400 font-mono tracking-wider">
                {language === 'ru' ? 'Счастливых гостей' : 'Happy travelers'}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid with Geometric Balance sharp boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-zinc-950/80 border border-white/15 p-6 sm:p-8 flex flex-col justify-between hover:border-white/35 transition-all duration-300 rounded-none relative group"
            >
              <span className="absolute top-2 right-2 font-mono text-[9px] text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">
                REF #{rev.id}
              </span>

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#ff5500]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                {/* Tour Name Badge */}
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-1.5 border-b border-white/5 pb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ff5500]" />
                  <span className="truncate">{language === 'ru' ? rev.tourNameRu : rev.tourNameEn}</span>
                </div>

                {/* Review Text with Serif accent font */}
                <p className="font-serif-accent text-sm sm:text-[15px] text-zinc-300 leading-relaxed italic mb-6">
                  "{language === 'ru' ? rev.textRu : rev.textEn}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-none object-cover border border-white/20"
                />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">{rev.author}</h4>
                  <p className="text-[10px] text-zinc-500 font-mono">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
