import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Instagram, Linkedin, Twitter, X, Menu, Facebook, Youtube, Music, MessageCircle } from 'lucide-react';
import { Theme } from '../types.ts';

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
    const root = document.getElementById('root');
    const handleScroll = () => {
      if (root) setScrolled(root.scrollTop > 50);
    };
    if (root) root.addEventListener('scroll', handleScroll);
    return () => {
      if (root) root.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Design', id: 'design', type: 'anchor' },
    { name: 'Biography', id: 'about', type: 'room' },
    { name: 'Contact', id: 'contact', type: 'room' }
  ];

  const stripSocialLinks = [
    { icon: <Instagram size={16} />, url: 'https://instagram.com/Bqurtas', label: 'Instagram' },
    { icon: <Facebook size={16} />, url: 'https://facebook.com/Bqurtas', label: 'Facebook' },
    { icon: <MessageCircle size={16} />, url: 'https://wa.me/9647517884985', label: 'WhatsApp' },
    { icon: <Youtube size={16} />, url: 'https://youtube.com/@Bqurtas', label: 'YouTube' },
    { icon: <Twitter size={16} />, url: 'https://twitter.com/Bqurtas', label: 'X' },
  ];

  const fullSocialLinks = [
    ...stripSocialLinks,
    { icon: <Linkedin size={20} />, url: 'https://linkedin.com/in/Bqurtas', label: 'LinkedIn' },
    { icon: <Music size={20} />, url: 'https://tiktok.com/@Bqurtas', label: 'TikTok' },
  ];

  const isDark = theme === Theme.DARK;

  const handleNavClick = (item: { name: string, id: string, type: string }) => {
    setIsMenuOpen(false);
    if (item.type === 'room') {
      setActiveRoom(item.id as any);
    } else if (item.type === 'anchor') {
      if (activeRoom !== 'home') {
        setActiveRoom('home');
        setTimeout(() => {
          const element = document.getElementById(item.id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const element = document.getElementById(item.id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const menuVariants = {
    closed: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.6 } },
    open: { 
      opacity: 1, 
      backdropFilter: "blur(50px)", 
      transition: { duration: 0.8, staggerChildren: 0.1, delayChildren: 0.2 } 
    },
    exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.6 } }
  };

  const itemVariants = {
    closed: { y: 30, opacity: 0, filter: "blur(10px)" },
    open: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.6 } }
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
            maxWidth: scrolled ? '550px' : '920px',
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between rounded-full border border-white/10 backdrop-blur-3xl h-14 md:h-16 w-full relative px-3 md:px-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] ${
            isDark ? 'bg-slate-950/80' : 'bg-white/80'
          }`}
        >
          <div className="flex items-center gap-2 md:gap-3 overflow-visible h-full">
            <motion.div 
              layout
              onClick={() => setActiveRoom('home')}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`flex-shrink-0 w-9 h-9 md:w-11 md:h-11 rounded-full overflow-hidden border-2 transition-colors cursor-pointer ${
                isDark ? 'border-white/20' : 'border-slate-900/10'
              }`}
            >
              <img 
                src="https://i.ibb.co/D3h6b89/Barakat-Qurtas.png" 
                alt="Barakat Qurtas" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div 
              layout 
              onClick={() => setActiveRoom('home')} 
              className="flex flex-col min-w-0 cursor-pointer justify-center pt-8 md:pt-1 overflow-visible"
            >
              <motion.span 
                layout
                className={`font-liana text-[32px] md:text-3xl leading-none transition-colors overflow-visible block ${isDark ? 'text-blue-500' : 'text-blue-600'}`}
              >
                {scrolled ? 'Bqurtas' : 'Barakat Qurtas'}
              </motion.span>
              <motion.span 
                layout
                className={`font-simple text-[5px] md:text-[8px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] leading-none mt-0.5 md:mt-1 ${isDark ? 'text-white/40' : 'text-slate-400'}`}
              >
                {scrolled ? 'Designer' : 'Graphic Designer'}
              </motion.span>
            </motion.div>
          </div>

          <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-1 mr-2 border-r border-white/10 pr-3">
              {stripSocialLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.25, color: '#5D67E8' }}
                  className={`p-2 transition-colors ${isDark ? 'text-white/40' : 'text-slate-400'}`}
                  title={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <motion.button 
                layout
                onClick={toggleTheme}
                whileHover={{ scale: 1.2, rotate: 180 }}
                className={`flex items-center justify-center w-9 h-9 md:w-11 md:h-11 transition-colors ${
                  isDark ? 'text-white' : 'text-slate-400'
                }`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>

              <motion.button
                layout
                onClick={() => setIsMenuOpen(true)}
                whileHover={{ scale: 1.05, backgroundColor: '#5D67E8', color: '#fff' }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center w-9 h-9 md:w-11 md:h-11 transition-all rounded-full shadow-lg ${
                  isDark ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'
                }`}
              >
                <Menu size={16} md:size={18} strokeWidth={2.5} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden ${
              isDark ? 'bg-slate-950/90 text-white' : 'bg-white/90 text-slate-900'
            }`}
          >
            <motion.button 
              onClick={() => setIsMenuOpen(false)}
              whileHover={{ rotate: 90, scale: 1.1 }}
              className={`absolute top-10 right-10 w-12 h-12 md:w-14 md:h-14 border rounded-full flex items-center justify-center transition-all z-20 ${
                isDark ? 'border-white/10 text-white' : 'border-slate-900/10 text-slate-900'
              }`}
            >
              <X size={24} />
            </motion.button>

            <div className="flex flex-col gap-6 md:gap-10 items-center mb-16 relative z-10 w-full px-6">
              <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-4">
                <div className={`w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 ${isDark ? 'border-blue-500/20' : 'border-blue-500/10'} shadow-2xl`}>
                  <img src="https://i.ibb.co/D3h6b89/Barakat-Qurtas.png" className="w-full h-full object-cover" alt="Portrait" />
                </div>
                <div className="text-center flex flex-col items-center pt-8 overflow-visible">
                  <h2 className="font-liana text-[32px] md:text-5xl text-blue-500 leading-none overflow-visible">Barakat Qurtas</h2>
                  <p className={`font-simple text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mt-2 ${isDark ? 'opacity-40' : 'opacity-30'}`}>Graphic Designer</p>
                </div>
              </motion.div>

              <div className="flex flex-col gap-3 items-center">
                {navItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="relative px-12 py-1 cursor-pointer group"
                    onClick={() => handleNavClick(item)}
                  >
                    <motion.span
                      className={`font-simple text-3xl md:text-6xl font-black uppercase tracking-tight transition-all duration-500 inline-block ${
                        isDark ? 'text-white/40' : 'text-slate-900/40'
                      } group-hover:text-blue-500 group-hover:scale-105`}
                    >
                      {item.name}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 md:gap-8 px-6 relative z-10">
              {fullSocialLinks.map((link, idx) => (
                <motion.a 
                  key={idx} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.2, color: '#5D67E8' }}
                  className={`transition-all ${isDark ? 'text-white/30' : 'text-slate-400'}`}
                >
                  {React.cloneElement(link.icon as React.ReactElement, { size: 22 })}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;