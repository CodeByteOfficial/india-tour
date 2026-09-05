import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Check, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { Tour, Language } from '../types';

interface TourModalProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const TourModal: React.FC<TourModalProps> = ({
  tour,
  isOpen,
  onClose,
  language,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: '2',
    date: '2025-05-15',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !tour) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // simulate inquiry sent
    }, 1500);
  };

  return (
    <div
      id="tour-detail-modal"
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#050505] border border-white/20 my-auto max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button with sharp geometric corners */}
        <button
          id="close-tour-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-none bg-black/80 border border-white/25 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-[#ff5500] hover:border-[#ff5500] hover:text-black transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Tour Visual & Details */}
        <div className="w-full md:w-1/2 relative min-h-[280px] md:min-h-full">
          <img
            src={tour.image}
            alt={language === 'ru' ? tour.titleRu : tour.titleEn}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-2.5 py-1 bg-[#ff5500] text-black font-mono font-bold text-[10px] uppercase tracking-wider mb-2 rounded-none">
              {language === 'ru' ? tour.tourNumberRu : tour.tourNumberEn}
            </span>
            <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-white mb-2">
              {language === 'ru' ? tour.titleRu : tour.titleEn}
            </h3>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-300">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#ff5500]" />
                {tour.duration}
              </span>
              <span className="text-white font-bold text-sm font-mono">{tour.price}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Highlights & Booking Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-[#080808] border-t md:border-t-0 md:border-l border-white/15">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#ff5500]"></span>
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                {language === 'ru' ? 'О программе тура' : 'Tour Program Highlights'}
              </h4>
            </div>
            <p className="text-zinc-300 text-xs sm:text-[13px] leading-relaxed mb-6 font-normal">
              {language === 'ru' ? tour.descriptionRu : tour.descriptionEn}
            </p>

            <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">
              {language === 'ru' ? 'Ключевые впечатления' : 'Key Inclusions'}
            </h4>
            <ul className="space-y-2.5 mb-8">
              {(language === 'ru' ? tour.highlightsRu : tour.highlightsEn).map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-normal font-normal">
                  <Check className="w-3.5 h-3.5 text-[#ff5500] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Inquiry Form */}
          <div className="pt-6 border-t border-white/10">
            {submitted ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 text-center rounded-none font-mono">
                <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-1.5" />
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  {language === 'ru' ? 'Заявка успешно отправлена!' : 'Inquiry Sent Successfully!'}
                </p>
                <p className="text-[11px] text-zinc-400 mt-1">
                  {language === 'ru'
                    ? 'Наш специалист свяжется с вами в течение 15 минут.'
                    : 'Our tour concierge will reach out within 15 minutes.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-white mb-2">
                  {language === 'ru' ? 'Забронировать или задать вопрос' : 'Inquire or Reserve Tour'}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder={language === 'ru' ? 'Ваше имя' : 'Your name'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/60 border border-white/20 rounded-none px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5500] font-mono"
                  />
                  <input
                    type="email"
                    required
                    placeholder={language === 'ru' ? 'Email / Телефон' : 'Email / Phone'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/60 border border-white/20 rounded-none px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5500] font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#ff5500] hover:bg-white hover:text-black text-black font-mono font-bold text-xs uppercase tracking-widest transition-all rounded-none flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{language === 'ru' ? 'Оставить заявку' : 'Send Inquiry'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
