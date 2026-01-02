
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Splash from './components/Splash';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import ClientsGrid from './components/ClientsGrid';
import AboutPreview from './components/AboutPreview';
import LogoTicker from './components/LogoTicker';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import AboutRoom from './components/AboutRoom';
import ContactRoom from './components/ContactRoom';
import ScrollToTop from './components/ScrollToTop';
import AdminTool from './components/AdminTool';
import { Theme } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>(Theme.DARK); 
  const [activeRoom, setActiveRoom] = useState<'home' | 'about' | 'contact'>('home');
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4200);
    return () => clearTimeout(timer);
  }, []);

  // Fix for scrolling in "Rooms"
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (!rootElement) return;

    if (activeRoom === 'home') {
      rootElement.style.scrollSnapType = 'y mandatory';
    } else {
      rootElement.style.scrollSnapType = 'none';
    }
  }, [activeRoom]);

  const sectionIds = ['hero', 'design', 'partners', 'about-preview', 'collaborations', 'statistics', 'footer'];

  useEffect(() => {
    if (loading || activeRoom !== 'home') return;

    const rootElement = document.getElementById('root');
    if (!rootElement) return;

    const observerOptions = {
      root: rootElement,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionIds.indexOf(entry.target.id);
          if (index !== -1) {
            setActiveSection(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading, activeRoom]);

  const handleSetActiveRoom = (room: 'home' | 'about' | 'contact') => {
    if (room === activeRoom) return;
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.scrollTo({ top: 0, behavior: 'auto' });
    }
    setActiveRoom(room);
  };

  const isDark = theme === Theme.DARK;

  return (
    <div className={`${isDark ? 'bg-[#0a0f14] text-slate-100' : 'bg-[#f8fafc] text-slate-900'} transition-colors duration-1000 min-h-screen selection:bg-blue-600 selection:text-white flex flex-col font-simple`}>
      <AnimatePresence>
        {loading && <Splash />}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor theme={theme} />
          <ScrollToTop theme={theme} />
          <AdminTool theme={theme} />
          
          <Navbar 
            theme={theme} 
            toggleTheme={() => setTheme(prev => prev === Theme.DARK ? Theme.LIGHT : Theme.DARK)} 
            setActiveRoom={handleSetActiveRoom} 
            activeRoom={activeRoom} 
          />
          
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              {activeRoom === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <main className="relative z-10">
                    <section id="hero"><Hero theme={theme} /></section>
                    <section id="design"><Portfolio theme={theme} /></section>
                    <section id="partners"><ClientsGrid theme={theme} /></section>
                    <section id="about-preview"><AboutPreview theme={theme} onExplore={() => handleSetActiveRoom('about')} /></section>
                    <section id="collaborations"><LogoTicker theme={theme} /></section>
                    <section id="footer"><Footer theme={theme} setActiveRoom={handleSetActiveRoom} /></section>
                  </main>
                </motion.div>
              )}

              {activeRoom === 'about' && (
                <AboutRoom theme={theme} onBack={() => handleSetActiveRoom('home')} />
              )}

              {activeRoom === 'contact' && (
                <ContactRoom theme={theme} onBack={() => handleSetActiveRoom('home')} />
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
