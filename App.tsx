
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
import { Theme } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>(Theme.DARK); // Set initial theme to DARK
  const [activeRoom, setActiveRoom] = useState<'home' | 'about' | 'contact'>('home');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  const colors = {
    dark: 'bg-[#0a0f14] text-[#e2e8f0]', 
    light: 'bg-[#f8fafc] text-[#1e293b]', 
  };

  return (
    <div className={`${theme === Theme.DARK ? colors.dark : colors.light} transition-colors duration-1000 min-h-screen selection:bg-blue-600 selection:text-white flex flex-col`}>
      <AnimatePresence>
        {loading && <Splash />}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor theme={theme} />
          <Navbar theme={theme} toggleTheme={toggleTheme} setActiveRoom={setActiveRoom} activeRoom={activeRoom} />
          
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              {activeRoom === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <main className="relative z-10 flex flex-col gap-0">
                    <Hero theme={theme} />
                    <Portfolio theme={theme} />
                    <ClientsGrid theme={theme} />
                    <AboutPreview theme={theme} onExplore={() => setActiveRoom('about')} />
                    <div className="py-20">
                      <LogoTicker theme={theme} />
                    </div>
                  </main>
                </motion.div>
              )}

              {activeRoom === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AboutRoom theme={theme} onBack={() => setActiveRoom('home')} />
                </motion.div>
              )}

              {activeRoom === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ContactRoom theme={theme} onBack={() => setActiveRoom('home')} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Global Footer reachable from all views */}
          <Footer theme={theme} />
        </>
      )}
    </div>
  );
};

export default App;
