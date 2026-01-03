
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Theme } from '../types';

interface HeroProps {
  theme: Theme;
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  const [text, setText] = useState('');
  const fullText = "Graphic Design • Printing • Advertising";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 80 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgTextX = useTransform(smoothX, [-500, 500], [20, -20]);
  const bgTextY = useTransform(smoothY, [-500, 500], [10, -10]);

  const imageX = useTransform(smoothX, [-500, 500], [-12, 12]);
  const imageY = useTransform(smoothY, [-500, 500], [-12, 12]);

  useEffect(() => {
    let i = 0;
    let timer: number;
    const type = () => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
        timer = window.setTimeout(type, 100); 
      } else {
        timer = window.setTimeout(() => { i = 0; type(); }, 6000); 
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const moveX = e.clientX - window.innerWidth / 2;
      const moveY = e.clientY - window.innerHeight / 2;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const startTimeout = window.setTimeout(type, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.clearTimeout(startTimeout);
      window.clearTimeout(timer);
    };
  }, []);

  const isDark = theme === Theme.DARK;

  return (
    <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      
      {/* Background Large Outlined Text */}
      <motion.div 
        style={{ x: bgTextX, y: bgTextY }}
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 select-none overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center w-full gap-2 md:gap-4">
          <h1 className={`font-simple text-[12vw] font-[900] uppercase tracking-[0.6em] md:tracking-[0.9em] leading-[0.8] opacity-[0.04] blur-[4px] md:blur-[5px] text-center w-full whitespace-nowrap translate-x-[0.3em] ${isDark ? 'text-white' : 'text-slate-900'}`}>
            BARAKAT
          </h1>
          <h1 className={`font-simple text-[12vw] font-[900] uppercase tracking-[0.6em] md:tracking-[0.9em] leading-[0.8] opacity-[0.04] blur-[4px] md:blur-[5px] text-center w-full whitespace-nowrap translate-x-[0.3em] ${isDark ? 'text-white' : 'text-slate-900'}`}>
            QURTAS
          </h1>
        </div>
      </motion.div>

      <div className="container mx-auto flex flex-col items-center justify-center relative z-10">
        
        {/* Centered Image Container */}
        <motion.div
          style={{ x: imageX, y: imageY, rotate: 0 }}
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)', rotate: 0 }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02 }}
          className="relative z-10 mb-10 flex justify-center items-center"
        >
          <div className={`relative w-[210px] md:w-[280px] aspect-[3/4] rounded-full overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border transition-all duration-1000 ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-blue-100'}`}>
            <img 
              src="https://i.ibb.co/SwbjDRf7/095-A7561-2.png" 
              alt="Barakat Qurtas" 
              fetchpriority="high"
              className="w-full h-full object-cover block pointer-events-none select-none"
            />
          </div>
          
          <div className={`absolute -inset-10 blur-[120px] -z-10 rounded-full transition-colors duration-1000 ${isDark ? 'bg-blue-600/20' : 'bg-blue-400/25'}`} />
        </motion.div>

        <div className="text-center w-full relative z-20">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <div className={`h-[1px] w-10 ${isDark ? 'bg-blue-500/30' : 'bg-blue-600/20'}`} />
            <Sparkles size={12} className="text-blue-500/80 animate-pulse" />
            <div className={`h-[1px] w-10 ${isDark ? 'bg-blue-500/30' : 'bg-blue-600/20'}`} />
          </motion.div>
          
          <div className="flex flex-col items-center">
             <h2 className="font-simple text-[11px] md:text-[13px] font-black uppercase tracking-[0.2em] min-h-[1.5em] text-blue-500 text-glow">
              {text}
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[1.5px] h-[0.9em] ml-1 bg-blue-500/70 align-middle"
              />
            </h2>
          </div>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 8, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-12 text-blue-500 flex flex-col items-center gap-4"
      >
        <div className={`w-7 h-11 rounded-full border-2 ${isDark ? 'border-white/20' : 'border-slate-900/15'} flex justify-center p-1.5`}>
          <motion.div 
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-2.5 bg-blue-500/40 rounded-full"
          />
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
    </section>
  );
};

export default Hero;
