
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Sun, Moon, Instagram, Linkedin, Twitter, Facebook, Menu, X, Youtube } from 'lucide-react';
import { Theme } from '../types';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  setActiveRoom: (room: 'home' | 'about' | 'contact') => void;
  activeRoom: string;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, setActiveRoom, activeRoom }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Design', id: 'home', subtitle: 'Visual Works' },
    { name: 'About', id: 'about', subtitle: 'Biography' },
    { name: 'Contact', id: 'contact', subtitle: 'Get In Touch' }
  ];

  const socialLinks = [
    { icon: <Instagram size={20} />, url: 'https://instagram.com/Bqurtas' },
    { icon: <Linkedin size={20} />, url: 'https://linkedin.com/in/Bqurtas' },
    { icon: <Twitter size={20} />, url: 'https://twitter.com/Bqurtas' },
    { icon: <Facebook size={20} />, url: 'https://facebook.com/Bqurtas' },
    { icon: <Youtube size={20} />, url: 'https://youtube.com/@Bqurtas' },
  ];

  const accentColor = theme === Theme.DARK ? 'text-blue-300' : 'text-blue-600';
  const bgColor = theme === Theme.DARK ? 'bg-slate-900/90 border-slate-700/50 shadow-black/40' : 'bg-white/90 border-blue-100/50 shadow-blue-900/5';
  const dividerColor = theme === Theme.DARK ? 'bg-slate-700' : 'bg-blue-100';

  const menuVariants: Variants = {
    closed: { 
      opacity: 0,
      clipPath: "circle(0% at 90% 10%)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
    },
    open: { 
      opacity: 1,
      clipPath: "circle(150% at 90% 10%)",
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] as const }
    }
  };

  const containerVariants: Variants = {
    open: {
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    closed: { y: 50, opacity: 0, rotate: 2 },
    open: { 
      y: 0, 
      opacity: 1, 
      rotate: 0,
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as const }
    }
  };

  const handleNavClick = (id: string) => {
    setActiveRoom(id as any);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-8 left-0 w-full z-[80] flex justify-center pointer-events-none px-4">
        <motion.div
          layout
          initial={false}
          animate={{
            padding: scrolled ? '10px 18px' : '10px 24px',
            gap: scrolled ? '18px' : '28px',
            maxWidth: scrolled ? '340px' : '1100px',
            scale: scrolled ? 1.05 : 1,
          }}
          whileHover={{ 
            y: -4,
            scale: scrolled ? 1.08 : 1.02,
            boxShadow: theme === Theme.DARK ? "0 20px 40px rgba(0,0,0,0.6)" : "0 20px 40px rgba(30,64,175,0.08)",
            transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] as const }
          }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          className={`pointer-events-auto flex items-center justify-between rounded-full border shadow-2xl backdrop-blur-3xl transition-colors duration-700 ${bgColor} group overflow-hidden`}
        >
          {/* LEFT: Profile + Logo */}
          <motion.div layout className="flex items-center gap-4 flex-shrink-0 h-full">
            <motion.div 
              layout
              className={`p-0.5 rounded-full border flex items-center justify-center transition-colors overflow-hidden ${theme === Theme.DARK ? 'border-slate-700' : 'border-blue-100'}`}
            >
              <motion.img 
                layout
                src="https://uvpdlkyfzvbwvkvm.public.blob.vercel-storage.com/image-766t5fclS8rG6n67oR0o4I74zBvA3w.png" 
                alt="Barakat Profile" 
                className={`rounded-full object-cover transition-all duration-500 ${scrolled ? 'w-10 h-10' : 'w-11 h-11'}`}
              />
            </motion.div>
            <motion.span 
              layout
              className={`font-liana whitespace-nowrap tracking-wide leading-none transition-all duration-500 pt-1 ${accentColor} ${scrolled ? 'text-xl' : 'text-2xl'}`}
            >
              {scrolled ? 'Bqurtas' : 'Barakat Qurtas'}
            </motion.span>
          </motion.div>

          {/* RIGHT: Socials + Toggle */}
          {!scrolled && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-5 h-full"
            >
              <div className="flex items-center gap-4">
                {socialLinks.map((link, idx) => (
                  <motion.a 
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3, y: -3, rotate: 8 }}
                    className={`transition-colors ${theme === Theme.DARK ? 'text-slate-400 hover:text-blue-300' : 'text-slate-500 hover:text-blue-600'}`}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>

              <motion.div layout className={`h-8 w-[1px] ${dividerColor}`} />

              <motion.button 
                onClick={toggleTheme}
                whileHover={{ scale: 1.2, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`p-2 rounded-full transition-all flex items-center justify-center hover:bg-blue-500/10 ${accentColor}`}
              >
                {theme === Theme.DARK ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              
              <motion.div layout className={`h-8 w-[1px] ${dividerColor}`} />
            </motion.div>
          )}

          <motion.button 
            layout
            onClick={() => setIsOpen(true)}
            whileHover={{ 
              scale: 1.1,
              borderRadius: "14px",
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.9 }}
            className={`flex items-center justify-center rounded-[18px] transition-all flex-shrink-0 relative overflow-hidden ${
              scrolled ? 'w-11 h-11' : 'w-12 h-12'
            } ${
              theme === Theme.DARK ? 'bg-slate-800 text-blue-300' : 'bg-blue-50 text-blue-600 border border-blue-100 shadow-sm'
            }`}
          >
            <Menu size={scrolled ? 22 : 24} />
          </motion.button>
        </motion.div>
      </nav>

      {/* Full Screen Menu Overlay - Classy Styling */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center backdrop-blur-3xl overflow-hidden ${
              theme === Theme.DARK ? 'bg-slate-900/60' : 'bg-blue-50/60'
            }`}
          >
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
            
            <motion.button 
              onClick={() => setIsOpen(false)}
              whileHover={{ rotate: 90, scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
              whileTap={{ scale: 0.9 }}
              className={`absolute top-10 right-10 p-6 rounded-full border opacity-20 hover:opacity-100 transition-all z-[110] ${theme === Theme.DARK ? 'border-white text-white' : 'border-blue-900 text-blue-900'}`}
            >
              <X size={32} strokeWidth={1.5} />
            </motion.button>

            <div className="container mx-auto px-6 h-full flex flex-col justify-between py-24 relative z-10">
              <div className="flex-grow flex flex-col items-center justify-center">
                <motion.div 
                  variants={containerVariants}
                  className="flex flex-col gap-8 md:gap-12 items-center"
                >
                  {navItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className="group relative"
                    >
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className="relative block"
                      >
                        <div className="flex flex-col items-center px-10">
                          <span className={`font-simple text-[10px] font-black tracking-[0.6em] uppercase mb-2 opacity-0 group-hover:opacity-60 transition-all duration-500 translate-y-3 group-hover:translate-y-0 ${theme === Theme.DARK ? 'text-blue-300' : 'text-blue-600'}`}>
                            {item.subtitle}
                          </span>
                          <span className={`font-simple text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter transition-all duration-700 group-hover:italic group-hover:text-blue-600 group-hover:scale-105 inline-block origin-center ${theme === Theme.DARK ? 'text-white' : 'text-blue-900'}`}>
                            {item.name}
                          </span>
                        </div>
                        <motion.div 
                          className="h-[2px] bg-blue-600 absolute bottom-0 left-1/2 -translate-x-1/2"
                          initial={{ width: 0 }}
                          whileHover={{ width: '80%' }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                        />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Bottom Socials in Overlay */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center gap-10"
              >
                <div className={`h-[1px] w-24 ${theme === Theme.DARK ? 'bg-white/10' : 'bg-blue-900/10'}`} />
                
                <div className="flex items-center gap-8 md:gap-12">
                  {socialLinks.map((link, idx) => (
                    <motion.a 
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -8, scale: 1.2, color: '#2563eb' }}
                      className={`transition-all duration-500 ${theme === Theme.DARK ? 'text-slate-500' : 'text-slate-400'}`}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <span className={`font-liana text-2xl ${accentColor}`}>Barakat Qurtas</span>
                </div>
              </motion.div>
            </div>

            {/* Decorative Background Glows */}
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/15 blur-[120px] pointer-events-none" 
            />
            <motion.div 
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.05, 0.15, 0.05]
              }}
              transition={{ duration: 15, repeat: Infinity, delay: 2 }}
              className="absolute -bottom-[5%] -right-[5%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
