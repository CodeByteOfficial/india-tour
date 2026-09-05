import React, { useState } from 'react';
import { X, Search, MapPin, ArrowRight } from 'lucide-react';
import { Tour, Destination, Language } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinations: Destination[];
  tours: Tour[];
  language: Language;
  onSelectDestination: (index: number) => void;
  onSelectTour: (tour: Tour) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  destinations,
  tours,
  language,
  onSelectDestination,
  onSelectTour,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredDestinations = destinations.filter((d) =>
    d.city.toLowerCase().includes(query.toLowerCase()) ||
    d.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTours = tours.filter((t) =>
    t.titleRu.toLowerCase().includes(query.toLowerCase()) ||
    t.titleEn.toLowerCase().includes(query.toLowerCase()) ||
    t.tourNumberRu.toLowerCase().includes(query.toLowerCase()) ||
    t.tourNumberEn.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      id="search-modal"
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-start justify-center pt-24 px-4 sm:px-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#050505] border border-white/20 p-6 shadow-2xl rounded-none relative"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="absolute -top-1.5 left-0 font-mono text-[10px] text-white/30 select-none">+</span>
        <span className="absolute -top-1.5 right-0 font-mono text-[10px] text-white/30 select-none">+</span>

        <div className="relative flex items-center border-b border-white/20 pb-3">
          <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'ru'
                ? 'Поиск направлений (Агра, Джайпур, Варанаси, Керала, Тадж-Махал...)'
                : 'Search destinations (Agra, Jaipur, Varanasi, Kerala, Taj Mahal...)'
            }
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 ml-2 rounded-none border border-white/10 hover:border-white/30 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="mt-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Destinations */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff5500] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#ff5500]"></span>
              <span>{language === 'ru' ? 'Направления' : 'Destinations'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredDestinations.map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    onSelectDestination(destinations.findIndex((item) => item.id === d.id));
                    onClose();
                  }}
                  className="p-3 text-left bg-zinc-950 hover:bg-zinc-900 border border-white/10 hover:border-white/30 flex items-center justify-between group transition-all rounded-none cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs text-zinc-500">[{d.slideNumber}]</span>
                    <span className="text-xs font-bold text-white uppercase font-mono">{d.city}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Tours */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff5500] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#ff5500]"></span>
              <span>{language === 'ru' ? 'Туры' : 'Tours'}</span>
            </div>
            <div className="space-y-2">
              {filteredTours.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    onSelectTour(t);
                    onClose();
                  }}
                  className="w-full p-3 text-left bg-zinc-950 hover:bg-zinc-900 border border-white/10 hover:border-white/30 flex items-center justify-between group transition-all rounded-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#ff5500]">
                      {language === 'ru' ? t.tourNumberRu : t.tourNumberEn}
                    </span>
                    <span className="text-xs text-zinc-200">
                      {language === 'ru' ? t.titleRu : t.titleEn}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 group-hover:text-white">
                    {t.price}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
