/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PopularToursSection } from './components/PopularToursSection';
import { InspireVideoSection } from './components/InspireVideoSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { ScrollCanvasBackground } from './components/ScrollCanvasBackground';
import { VideoModal } from './components/VideoModal';
import { TourModal } from './components/TourModal';
import { SearchModal } from './components/SearchModal';
import { ContactModal } from './components/ContactModal';
import {
  DESTINATIONS,
  POPULAR_TOURS,
  INSPIRING_VIDEOS,
  MAIN_FEATURE_VIDEO,
  REVIEWS,
} from './data/mockData';
import { Tour, Language } from './types';

export default function App() {
  // Russian by default to match the exact Russian typography from the reference image, with 1-click EN switch
  const [language, setLanguage] = useState<Language>('ru');
  
  // Destination 03 (Tokyo with Torii Gate) is selected by default as in the screenshot
  const [activeDestinationIndex, setActiveDestinationIndex] = useState(2);
  const [activeSection, setActiveSection] = useState('hero');

  // Modal States
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [tourModalOpen, setTourModalOpen] = useState(false);

  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Track scroll position to update active navbar section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['hero', 'tours', 'video', 'reviews'];
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'ru' ? 'en' : 'ru'));
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'about') {
      // Smooth scroll to tours/about section
      const el = document.getElementById('tours');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenTour = (tour: Tour) => {
    setSelectedTour(tour);
    setTourModalOpen(true);
  };

  const handleLearnMoreHero = (featureIndex: number) => {
    // Open corresponding tour or contact modal
    if (POPULAR_TOURS[featureIndex]) {
      handleOpenTour(POPULAR_TOURS[featureIndex]);
    } else {
      setContactModalOpen(true);
    }
  };

  const handlePlayVideo = (videoUrl: string, title: string) => {
    setActiveVideo({ url: videoUrl, title });
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col selection:bg-[#ff5500] selection:text-black overflow-x-hidden">
      {/* Dynamic 260-Frame Canvas Scroll Background */}
      <ScrollCanvasBackground />

      {/* Fixed Top Header / Navigation */}
      <Navbar
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex-1">
        {/* Section 1: Hero ("VISIT TOKYO" + Floating Torii Gate) */}
        <HeroSection
          destinations={DESTINATIONS}
          activeDestinationIndex={activeDestinationIndex}
          onSelectDestination={setActiveDestinationIndex}
          language={language}
          onLearnMore={handleLearnMoreHero}
        />

        {/* Section 2: Popular Tours ("ПОПУЛЯРНЫЕ ТУРЫ" + 4 Cards) */}
        <PopularToursSection
          tours={POPULAR_TOURS}
          language={language}
          onSelectTour={handleOpenTour}
        />

        {/* Section 3: Inspire Video Section ("TRAVEL AND INSPIRE YOUR LIFE") */}
        <InspireVideoSection
          videos={INSPIRING_VIDEOS}
          language={language}
          onPlayVideo={handlePlayVideo}
          mainVideo={MAIN_FEATURE_VIDEO}
        />

        {/* Section 4: Customer Testimonials & Ratings */}
        <ReviewsSection reviews={REVIEWS} language={language} />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onNavigate={handleNavigate}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Interactive Modals */}
      <VideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        videoUrl={activeVideo?.url || ''}
        title={activeVideo?.title || ''}
      />

      <TourModal
        tour={selectedTour}
        isOpen={tourModalOpen}
        onClose={() => setTourModalOpen(false)}
        language={language}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        destinations={DESTINATIONS}
        tours={POPULAR_TOURS}
        language={language}
        onSelectDestination={setActiveDestinationIndex}
        onSelectTour={handleOpenTour}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        language={language}
      />
    </div>
  );
}
