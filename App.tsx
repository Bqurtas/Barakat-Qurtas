
import React, { useState, useEffect, useMemo } from 'react';
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

  useEffect(() => {
    // Set to 2000ms (2s) for a premium yet fast introduction
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (!rootElement) return;
    rootElement.style.scrollSnapType = activeRoom === 'home' ? 'y mandatory' : 'none';
  }, [activeRoom]);

  const handleSetActiveRoom = (room: 'home' | 'about' | 'contact') => {
    if (room === activeRoom) return;
    const rootElement = document.getElementById('root');
    if (rootElement) rootElement.scrollTo({ top: 0, behavior: 'auto' });
    setActiveRoom(room);
  };

  const isDark = theme === Theme.DARK;

  return (
    <div className={`${isDark ? 'bg-[#0a0f14] text-slate-100' : 'bg-[#f8fafc] text-slate-900'} transition-colors duration-700 min-h-screen selection:bg-blue-600 selection:text-white flex flex-col font-simple`}>
      <AnimatePresence mode="wait">
        {loading && <Splash key="splash" />}
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
                <AboutRoom key="about" theme={theme} onBack={() => handleSetActiveRoom('home')} />
              )}

              {activeRoom === 'contact' && (
                <ContactRoom key="contact" theme={theme} onBack={() => handleSetActiveRoom('home')} />
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
