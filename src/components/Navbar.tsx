import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Globe } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenSearch: () => void;
  onOpenContact: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  onOpenSearch,
  onOpenContact,
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', labelRu: 'ГЛАВНАЯ', labelEn: 'HOME' },
    { id: 'about', labelRu: 'О НАС', labelEn: 'ABOUT US' },
    { id: 'tours', labelRu: 'ТУРЫ', labelEn: 'TOURS' },
    { id: 'video', labelRu: 'ГАЛЕРЕЯ', labelEn: 'GALLERY' },
    { id: 'reviews', labelRu: 'ОТЗЫВЫ', labelEn: 'REVIEWS' },
    { id: 'contact', labelRu: 'КОНТАКТЫ', labelEn: 'CONTACTS' },
  ];

  const handleItemClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'contact') {
      onOpenContact();
    } else {
      onNavigate(id);
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-black/95 backdrop-blur-md py-3.5 border-b border-white/10'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Brand Logo with geometric badge: square orange accent + bold TRAVEL */}
          <button
            id="nav-logo"
            onClick={() => handleItemClick('hero')}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          >
            <span className="w-2.5 h-2.5 bg-[#ff5500] shadow-[0_0_8px_rgba(255,85,0,0.8)] transition-transform duration-300 group-hover:scale-125"></span>
            <span className="font-heading font-extrabold text-lg sm:text-xl tracking-[0.2em] text-white uppercase group-hover:text-zinc-200 transition-colors">
              HK TOURS
            </span>
            <span className="hidden sm:inline-block font-mono text-[9px] text-zinc-500 tracking-widest pl-1 border-l border-white/10">
              SYS.IND
            </span>
          </button>

          {/* Desktop Navigation Links matching reference & Geometric Balance */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-7 lg:space-x-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative text-[11px] lg:text-xs font-semibold tracking-[0.2em] transition-colors py-1 uppercase cursor-pointer ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                >
                  {language === 'ru' ? item.labelRu : item.labelEn}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#ff5500] shadow-[0_0_8px_rgba(255,85,0,0.6)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons: Language Toggle + Search Icon */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Switcher - Sharp Geometric Card */}
            <button
              id="lang-toggle-btn"
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-none border border-white/15 bg-black/60 hover:border-white/40 text-xs tracking-wider text-zinc-300 hover:text-white transition-all cursor-pointer"
              title="Переключить язык / Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#ff5500]" />
              <span className="font-mono text-[11px] font-semibold tracking-wider">{language.toUpperCase()}</span>
            </button>

            {/* Search Icon with crisp border */}
            <button
              id="nav-search-btn"
              onClick={onOpenSearch}
              aria-label="Search destinations"
              className="w-8 h-8 rounded-none border border-white/10 hover:border-white/30 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-none border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Hairline Divider under header with geometric accent indicator */}
      <div className="w-full h-[1px] bg-white/10 mt-3.5 relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-transparent via-[#ff5500] to-transparent w-40 transition-all duration-700 ease-out"
          style={{
            transform: activeSection === 'tours' ? 'translateX(250%)' : activeSection === 'video' ? 'translateX(450%)' : 'translateX(100%)',
          }}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden bg-[#050505] border-b border-white/15 px-6 py-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="block w-full text-left py-2 text-sm font-semibold tracking-widest text-zinc-300 hover:text-[#ff5500] uppercase transition-colors"
            >
              {language === 'ru' ? item.labelRu : item.labelEn}
            </button>
          ))}
          <div className="pt-4 border-t border-white/10 flex justify-between items-center">
            <span className="text-xs text-zinc-400">
              {language === 'ru' ? 'Язык интерфейса' : 'Interface language'}:
            </span>
            <button
              onClick={onToggleLanguage}
              className="px-3 py-1 bg-white/10 rounded text-xs font-semibold text-white uppercase"
            >
              {language === 'ru' ? 'Русский (RU)' : 'English (EN)'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
