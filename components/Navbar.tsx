
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Instagram, Linkedin, Twitter, X, Menu, Facebook, Youtube, Music, Palette, Globe, Ghost, MessageCircle } from 'lucide-react';
import { Theme } from '../types';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  setActiveRoom: (room: 'home' | 'about' | 'contact') => void;
  activeRoom: string;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, setActiveRoom, activeRoom }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Design', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    { icon: <Instagram size={18} />, url: 'https://instagram.com/Bqurtas', label: 'Instagram' },
    { icon: <Linkedin size={18} />, url: 'https://linkedin.com/in/Bqurtas', label: 'LinkedIn' },
    { icon: <Twitter size={18} />, url: 'https://twitter.com/Bqurtas', label: 'X' },
    { icon: <Facebook size={18} />, url: 'https://facebook.com/Bqurtas', label: 'Facebook' },
    { icon: <Youtube size={18} />, url: 'https://youtube.com/@Bqurtas', label: 'YouTube' },
    { icon: <Palette size={18} />, url: 'https://behance.net/Bqurtas', label: 'Behance' },
    { icon: <Globe size={18} />, url: 'https://dribbble.com/Bqurtas', label: 'Dribbble' },
    { icon: <Music size={18} />, url: 'https://tiktok.com/@Bqurtas', label: 'TikTok' },
  ];

  const isDark = theme === Theme.DARK;

  const curtainVariants = {
    closed: { 
      y: '-100%',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
    open: { 
      y: '0%',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const handleLogoClick = () => {
    setActiveRoom('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProfileClick = () => {
    setActiveRoom('home');
    setTimeout(() => {
      const designSection = document.getElementById('design');
      if (designSection) {
        designSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <nav className="fixed top-8 left-0 w-full z-[80] flex justify-center pointer-events-none px-4 md:px-6">
        <motion.div
          layout
          initial={{ y: -50, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            maxWidth: scrolled ? '540px' : '980px',
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between rounded-full border border-white/10 backdrop-blur-3xl h-14 md:h-16 w-full relative px-3 md:px-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] ${
            isDark ? 'bg-slate-950/80' : 'bg-white/80'
          }`}
        >
          {/* LEFT: DYNAMIC LOGO */}
          <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
            <motion.div 
              layout
              onClick={handleProfileClick}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden border-2 transition-colors cursor-pointer ${
                isDark ? 'border-white/20' : 'border-slate-900/10'
              }`}
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" 
                alt="Barakat Profile" 
                className="w-full h-full object-cover grayscale brightness-110"
              />
            </motion.div>
            
            <motion.div layout onClick={handleLogoClick} className="flex flex-col -gap-1 min-w-0 cursor-pointer">
              <motion.span 
                layout
                className={`font-liana text-lg md:text-3xl leading-none transition-colors truncate ${isDark ? 'text-blue-500' : 'text-blue-600'}`}
              >
                {scrolled ? 'Bqurtas' : 'Barakat Qurtas'}
              </motion.span>
              <motion.span 
                layout
                className={`font-simple text-[6px] md:text-[8px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] opacity-40 ml-0.5 md:ml-1 ${isDark ? 'text-white' : 'text-slate-900'}`}
              >
                {scrolled ? 'Designer' : 'Graphic Designer'}
              </motion.span>
            </motion.div>
          </div>

          {/* RIGHT: TOOLS & SOCIALS */}
          <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-1">
              {socialLinks.slice(0, 5).map((link, idx) => (
                <motion.a 
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1, color: '#2563eb' }}
                  className={`p-2 transition-all opacity-40 ${isDark ? 'text-white' : 'text-slate-900'}`}
                  title={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
              <div className={`w-[1px] h-6 mx-1 ${isDark ? 'bg-white/10' : 'bg-slate-950/10'}`} />
            </div>

            <motion.button 
              layout
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
              className={`flex items-center justify-center w-9 h-9 md:w-11 md:h-11 transition-all rounded-xl border ${
                isDark ? 'border-white/5 text-white' : 'border-slate-950/5 text-slate-950'
              }`}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </motion.button>

            <motion.button
              layout
              onClick={() => setIsMenuOpen(true)}
              whileHover={{ scale: 1.05, backgroundColor: '#2563eb', color: '#fff' }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center w-9 h-9 md:w-11 md:h-11 transition-all rounded-xl shadow-lg ${
                isDark ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'
              }`}
            >
              <Menu size={16} md:size={18} strokeWidth={2.5} />
            </motion.button>
          </div>
        </motion.div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={curtainVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center backdrop-blur-3xl ${
              isDark ? 'bg-slate-950/98' : 'bg-white/98'
            }`}
          >
            <motion.button 
              onClick={() => setIsMenuOpen(false)}
              whileHover={{ rotate: 90, scale: 1.1, backgroundColor: '#ef4444', color: '#fff' }}
              className={`absolute top-10 right-10 w-12 h-12 md:w-14 md:h-14 border rounded-2xl flex items-center justify-center transition-all ${
                isDark ? 'border-white/10 text-white' : 'border-slate-900/10 text-slate-900'
              }`}
            >
              <X size={24} />
            </motion.button>

            <div className="flex flex-col gap-4 md:gap-8 items-center mb-12">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  onClick={() => {
                    setActiveRoom(item.id as any);
                    setIsMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group relative"
                >
                  <span className={`font-simple text-5xl md:text-8xl font-black uppercase tracking-tighter transition-all duration-500 inline-block group-hover:text-blue-600 group-hover:italic ${
                    (activeRoom === item.id || (activeRoom === 'home' && item.id === 'home')) ? 'text-blue-600' : (isDark ? 'text-white' : 'text-slate-900')
                  }`}>
                    {item.name === 'Design' ? 'Works' : item.name}
                  </span>
                </motion.button>
              ))}
            </div>

            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col items-center">
                <span className="font-liana text-3xl text-blue-600">Barakat Qurtas</span>
                <span className={`font-simple text-[8px] font-black uppercase tracking-[0.5em] opacity-30 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Graphic Designer
                </span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 max-w-sm px-6">
                {socialLinks.map((link, idx) => (
                  <motion.a 
                    key={idx} 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -8, scale: 1.2, color: '#2563eb', backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
                    className={`p-4 rounded-2xl transition-all opacity-50 hover:opacity-100 ${isDark ? 'text-white' : 'text-slate-900'}`}
                    title={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
