import React, { useState } from 'react';
import { ArrowUp, ArrowRight, Check } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigate,
  onOpenContact,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="relative w-full bg-transparent border-t border-white/10 text-white pt-20 pb-12 px-6 sm:px-8 lg:px-12">
      {/* Corner crosshairs for Geometric Balance */}
      <div className="max-w-7xl mx-auto relative">
        <span className="absolute -top-20 left-0 font-mono text-[10px] text-white/30 select-none">+</span>
        <span className="absolute -top-20 right-0 font-mono text-[10px] text-white/30 select-none">+</span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 bg-[#ff5500] shadow-[0_0_8px_rgba(255,85,0,0.8)]"></span>
              <span className="font-heading font-black text-xl tracking-[0.2em] uppercase">
                VISIT INDIA
              </span>
              <span className="font-mono text-[10px] text-zinc-500 tracking-widest pl-2 border-l border-white/10">
                SYS.REF // IND
              </span>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
              {language === 'ru'
                ? 'Премиальные экспедиции и авторские маршруты по Индии. Откройте для себя сокровенные уголки древней культуры, Тадж-Махал и королевские форты Раджастхана.'
                : 'Bespoke luxury expeditions and curated itineraries across India. Discover sacred heritage shrines, the Taj Mahal, royal desert fortresses, and serene backwaters.'}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#ff5500] mb-4">
              {language === 'ru' ? 'Навигация' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-mono">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'ru' ? 'Главная' : 'Home'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tours')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'ru' ? 'Популярные туры' : 'Popular Tours'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('video')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'ru' ? 'Видеофильм' : 'Cinematic Video'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'ru' ? 'Отзывы гостей' : 'Reviews'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {language === 'ru' ? 'Контакты' : 'Contacts'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Top Destinations */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#ff5500] mb-4">
              {language === 'ru' ? 'Локации' : 'Destinations'}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-mono">
              <li className="hover:text-white transition-colors cursor-pointer">Agra & Taj Mahal</li>
              <li className="hover:text-white transition-colors cursor-pointer">Jaipur & Amber Fort</li>
              <li className="hover:text-white transition-colors cursor-pointer">Varanasi & Sacred Ganges</li>
              <li className="hover:text-white transition-colors cursor-pointer">Kerala Backwaters</li>
              <li className="hover:text-white transition-colors cursor-pointer">Ladakh & Himalayas</li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#ff5500] mb-4">
              {language === 'ru' ? 'Рассылка' : 'Newsletter'}
            </h4>
            <p className="text-zinc-400 text-xs mb-3 font-normal leading-relaxed">
              {language === 'ru'
                ? 'Эксклюзивные предложения и анонсы закрытых туров.'
                : 'Exclusive bespoke offers and private seasonal tour drops.'}
            </p>
            {subscribed ? (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <Check className="w-4 h-4" />
                <span>{language === 'ru' ? 'Вы подписаны!' : 'Subscribed!'}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black border border-white/20 rounded-none px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#ff5500] font-mono"
                />
                <button
                  type="submit"
                  className="py-2 bg-white/10 hover:bg-[#ff5500] hover:text-black text-white font-mono text-[11px] uppercase tracking-wider font-semibold transition-all rounded-none flex items-center justify-center gap-1.5 cursor-pointer border border-white/15 hover:border-[#ff5500]"
                >
                  <span>{language === 'ru' ? 'Подписаться' : 'Join'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div>
            © {new Date().getFullYear()} TRAVEL Inc. Pure geometric balance & minimal aesthetic.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-zinc-400 font-mono"
          >
            <span>{language === 'ru' ? 'Наверх' : 'Back to top'}</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#ff5500]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
