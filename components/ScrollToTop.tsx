
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { Theme } from '../types';

interface ScrollToTopProps {
  theme: Theme;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const isDark = theme === Theme.DARK;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="fixed bottom-10 right-6 md:right-10 z-[70] flex flex-col items-center gap-4"
        >
          {/* Vertical indicator line */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 60 }}
            className={`w-[1px] ${isDark ? 'bg-white/10' : 'bg-slate-900/10'} mb-2`}
          />
          
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1, backgroundColor: '#2563eb', color: '#fff' }}
            whileTap={{ scale: 0.9 }}
            className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-500 shadow-2xl backdrop-blur-xl ${
              isDark 
                ? 'bg-slate-950/80 border-white/10 text-white' 
                : 'bg-white/80 border-slate-950/5 text-slate-950'
            }`}
          >
            <ChevronUp size={20} strokeWidth={2.5} />
          </motion.button>
          
          <span className={`font-simple text-[7px] font-black uppercase tracking-[0.4em] origin-right rotate-90 translate-x-1/2 -mt-4 opacity-30 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Go Up
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
