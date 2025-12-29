
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Mouse } from 'lucide-react';
import { Theme } from '../types';

interface HeroProps {
  theme: Theme;
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  const [text, setText] = useState('');
  const fullText = "One of Kurdistan's premier graphic designers, specializing in high-end visual architecture and premium print identity.";

  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    const typingSpeed = 45;
    const pauseDuration = 4000;

    const type = () => {
      const current = fullText.slice(0, i);
      setText(current);

      if (!isDeleting && i < fullText.length) {
        i++;
        setTimeout(type, typingSpeed);
      } else if (isDeleting && i > 0) {
        i--;
        setTimeout(type, typingSpeed / 2);
      } else {
        isDeleting = !isDeleting;
        setTimeout(type, pauseDuration);
      }
    };

    const timeout = setTimeout(type, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const x = useSpring(0, { stiffness: 60, damping: 20 });
  const y = useSpring(0, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / 45);
    y.set((e.clientY - centerY) / 45);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useTransform(y, [-20, 20], [6, -6]);
  const rotateY = useTransform(x, [-20, 20], [-6, 6]);

  const subTextColor = theme === Theme.DARK ? 'text-slate-500' : 'text-slate-400';
  const accentColor = theme === Theme.DARK ? 'text-blue-300' : 'text-blue-600';

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen flex flex-col items-center justify-between overflow-hidden pt-28 pb-10"
    >
      <motion.div
        style={{ x: useTransform(x, (v) => v * -0.7), y: useTransform(y, (v) => v * -0.7) }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <h2 className="font-simple text-[11vw] font-black opacity-[0.012] tracking-[0.35em] uppercase whitespace-nowrap select-none">
          Visual Architect
        </h2>
      </motion.div>

      <div className="container mx-auto px-4 flex flex-col items-center justify-center flex-grow z-10">
        
        {/* Perfect Egg Shape Portrait with Loading Robustness */}
        <motion.div
          style={{ x, y, rotateX, rotateY, perspective: 1400 }}
          className="relative group mb-8"
        >
          <div className={`relative w-[150px] h-[220px] md:w-[220px] md:h-[310px] overflow-hidden rounded-[120px_120px_90px_90px] border-[1px] transition-all duration-1000 ${
            theme === Theme.DARK 
              ? 'border-slate-800/50 shadow-[0_40px_80px_rgba(0,0,0,0.6)] bg-slate-900' 
              : 'border-blue-100/50 shadow-[0_40px_80px_rgba(30,64,175,0.06)] bg-blue-50/30'
          }`}>
            <motion.img 
              src="https://uvpdlkyfzvbwvkvm.public.blob.vercel-storage.com/image-766t5fclS8rG6n67oR0o4I74zBvA3w.png" 
              alt="Barakat Portrait"
              crossOrigin="anonymous"
              className="w-full h-full object-cover object-top scale-105 saturate-[0.8] opacity-0 transition-opacity duration-1000"
              onLoad={(e) => (e.currentTarget.style.opacity = '1')}
              whileHover={{ scale: 1.1, filter: 'saturate(1)' }}
              transition={{ duration: 1 }}
            />
          </div>
          <div className={`absolute -inset-10 blur-[90px] -z-10 rounded-full transition-opacity opacity-0 group-hover:opacity-30 ${
            theme === Theme.DARK ? 'bg-blue-400/15' : 'bg-blue-600/10'
          }`} />
        </motion.div>

        {/* Minimalist Description */}
        <div className="text-center w-full max-w-[280px] md:max-w-[320px] flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="h-[2.8rem] flex items-center justify-center"
          >
             <p className={`font-simple text-[10px] md:text-[11px] font-bold leading-[1.5] ${subTextColor} tracking-[0.2em] uppercase line-clamp-2`}>
                {text}
                <motion.span 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className={`inline-block w-[1.5px] h-2.5 ml-1 align-middle ${theme === Theme.DARK ? 'bg-blue-400/40' : 'bg-blue-600/40'}`} 
                />
             </p>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="flex flex-col items-center gap-4 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className={`opacity-40 ${accentColor}`}
        >
          <Mouse size={28} strokeWidth={1.5} />
        </motion.div>
        <span className={`font-simple text-[10px] uppercase tracking-[0.8em] font-black opacity-30 ${theme === Theme.DARK ? 'text-blue-100' : 'text-blue-900'}`}>
          Keep Exploring
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
