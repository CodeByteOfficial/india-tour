import React, { useState } from 'react';
import { X, Send, MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dates: '',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      id="contact-modal"
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#050505] border border-white/20 p-6 sm:p-10 relative shadow-2xl rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="absolute -top-1.5 left-0 font-mono text-[10px] text-white/30 select-none">+</span>
        <span className="absolute -top-1.5 right-0 font-mono text-[10px] text-white/30 select-none">+</span>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-none bg-white/5 hover:bg-[#ff5500] hover:text-black border border-white/15 flex items-center justify-center text-zinc-400 hover:border-[#ff5500] transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Contact Details */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 bg-[#ff5500]"></span>
              <span className="font-heading font-black tracking-[0.2em] text-lg text-white">TRAVEL</span>
            </div>
            <h3 className="font-heading font-extrabold text-xl uppercase tracking-wider text-white">
              {language === 'ru' ? 'Свяжитесь с нами' : 'Get in Touch'}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              {language === 'ru'
                ? 'Индивидуальные маршруты по Индии, бронирование дворцов Махараджей и организация частных VIP-туров.'
                : 'Bespoke Indian journeys, royal palace hotel reservations, and elite concierge tour planning.'}
            </p>

            <div className="space-y-3.5 pt-2 text-xs text-zinc-300 font-mono">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#ff5500]" />
                <span>+91 (11) 4555-0198</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ff5500]" />
                <span>concierge@visitindia.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#ff5500]" />
                <span>Connaught Place, New Delhi, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#ff5500]" />
                <span>24/7 VIP Concierge Support</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-white/15 pt-6 md:pt-0 md:pl-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-[#ff5500] mb-4" />
                <h4 className="font-heading font-bold text-lg text-white uppercase mb-2">
                  {language === 'ru' ? 'Благодарим за обращение!' : 'Thank you for reaching out!'}
                </h4>
                <p className="text-xs text-zinc-400 max-w-xs font-mono">
                  {language === 'ru'
                    ? 'Ваш персональный консультант свяжется с вами в течение 30 минут.'
                    : 'Your personal India concierge will connect with you within 30 minutes.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                    {language === 'ru' ? 'Имя' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/60 border border-white/20 rounded-none px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff5500] font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/60 border border-white/20 rounded-none px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff5500] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                      {language === 'ru' ? 'Телефон' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-black/60 border border-white/20 rounded-none px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff5500] font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                    {language === 'ru' ? 'Пожелания к путешествию' : 'Travel preferences or dates'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      language === 'ru'
                        ? 'Например: Тадж-Махал + Джайпур в октябре, 2 взрослых...'
                        : 'e.g., Taj Mahal + Jaipur in October, 2 adults...'
                    }
                    className="w-full bg-black/60 border border-white/20 rounded-none px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff5500] font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#ff5500] hover:bg-white hover:text-black text-black font-mono font-bold text-xs uppercase tracking-widest transition-all rounded-none flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{language === 'ru' ? 'Отправить запрос' : 'Submit Request'}</span>
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
