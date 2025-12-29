
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
  // Default theme is strictly DARK
  const [theme, setTheme] = useState<Theme>(Theme.DARK); 
  const [activeRoom, setActiveRoom] = useState<'home' | 'about' | 'contact'>('home');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  return (
    <div className={`${theme === Theme.DARK ? 'bg-[#0a0f14] text-slate-100' : 'bg-[#f8fafc] text-slate-900'} transition-colors duration-1000 min-h-screen selection:bg-blue-600 selection:text-white flex flex-col font-simple`}>
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <main className="relative z-10">
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                >
                  <AboutRoom theme={theme} onBack={() => setActiveRoom('home')} />
                </motion.div>
              )}

              {activeRoom === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                >
                  <ContactRoom theme={theme} onBack={() => setActiveRoom('home')} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <Footer theme={theme} />
        </>
      )}
    </div>
  );
};

export default App;
