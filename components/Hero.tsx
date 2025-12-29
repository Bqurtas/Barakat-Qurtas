
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Mouse } from 'lucide-react';
import { Theme } from '../types';

interface HeroProps {
  theme: Theme;
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  const [text, setText] = useState('');
  const fullText = "One of Kurdistan's premier graphic designers, specializing in high-end visual architecture and premium identity.";

  useEffect(() => {
    let i = 0;
    const type = () => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
        setTimeout(type, 40);
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

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative h-[95vh] flex flex-col items-center justify-center overflow-hidden px-6"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto flex flex-col items-center relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
          <motion.a 
            href="https://instagram.com/Bqurtas"
            target="_blank"
            rel="noopener noreferrer"
            style={{ x: useTransform(x, v => v * 1.5), y: useTransform(y, v => v * 0.8) }}
            className="font-liana text-7xl md:text-9xl text-blue-600 tracking-tighter hover:scale-105 transition-transform"
          >
            Barakat
          </motion.a>

          <motion.a
            href="https://instagram.com/Bqurtas"
            target="_blank"
            rel="noopener noreferrer"
            style={{ x, y }}
            className="relative group block"
          >
            <div className={`relative w-[200px] h-[280px] md:w-[300px] md:h-[420px] overflow-hidden rounded-[150px_150px_100px_100px] border transition-all duration-700 ${
              theme === Theme.DARK ? 'border-slate-800 bg-slate-900 shadow-2xl' : 'border-blue-100 bg-white shadow-xl'
            }`}>
              <motion.img 
                src="https://uvpdlkyfzvbwvkvm.public.blob.vercel-storage.com/image-766t5fclS8rG6n67oR0o4I74zBvA3w.png" 
                alt="Barakat Portrait"
                className="w-full h-full object-cover object-top scale-105 transition-transform duration-[2s] group-hover:scale-110"
              />
            </div>
            <div className="absolute -inset-4 blur-[40px] bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10 rounded-full" />
          </motion.a>

          <motion.a 
            href="https://instagram.com/Bqurtas"
            target="_blank"
            rel="noopener noreferrer"
            style={{ x: useTransform(x, v => -v * 1.5), y: useTransform(y, v => -v * 0.8) }}
            className={`font-arch text-5xl md:text-8xl font-black uppercase tracking-tight transition-colors hover:text-blue-600 ${theme === Theme.DARK ? 'text-white/10' : 'text-slate-900/10'}`}
          >
            Qurtas
          </motion.a>
        </div>

        <div className="text-center mt-16 max-w-lg">
          <p className="font-simple text-[11px] md:text-xs font-bold uppercase tracking-[0.3em] opacity-50 leading-relaxed">
            {text}
            <span className="inline-block w-1.5 h-3 ml-1 bg-blue-600 animate-pulse" />
          </p>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 opacity-30 text-blue-600"
      >
        <Mouse size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;
