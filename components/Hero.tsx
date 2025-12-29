
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mouse } from 'lucide-react';
import { Theme } from '../types';

interface HeroProps {
  theme: Theme;
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  const [text, setText] = useState('');
  const fullText = "Visual Architect & Identity Designer\nCrafting Premium Digital Experiences";

  // Mouse tracking setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothing the mouse values
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transformations
  // Background text moves opposite to mouse
  const bgTextX = useTransform(smoothX, [-500, 500], [20, -20]);
  const bgTextY = useTransform(smoothY, [-500, 500], [20, -20]);

  // Portrait tilts and shifts with mouse
  const portraitX = useTransform(smoothX, [-500, 500], [-15, 15]);
  const portraitY = useTransform(smoothY, [-500, 500], [-15, 15]);
  const rotateX = useTransform(smoothY, [-500, 500], [10, -10]);
  const rotateY = useTransform(smoothX, [-500, 500], [-10, 10]);

  // Bio text moves subtly
  const bioX = useTransform(smoothX, [-500, 500], [-5, 5]);

  useEffect(() => {
    let i = 0;
    let timer: number;

    const type = () => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
        timer = window.setTimeout(type, 50);
      } else {
        timer = window.setTimeout(() => {
          i = 0;
          type();
        }, 3000);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
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

  return (
    <section className="relative h-[100vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background soft glow - now tracks mouse too */}
      <motion.div 
        style={{ x: portraitX, y: portraitY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" 
      />

      <div className="container mx-auto flex flex-col items-center relative z-10 w-full h-full justify-center">
        
        {/* Composition Container */}
        <div className="relative w-full flex flex-col items-center justify-center min-h-[400px]">
          
          {/* Background Names Layer - Parallax Effect */}
          <motion.div 
            style={{ x: bgTextX, y: bgTextY }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0"
          >
            <h1 className={`font-arch text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-[1.2em] md:tracking-[1.6em] leading-none opacity-[0.05] ${theme === Theme.DARK ? 'text-white' : 'text-slate-900'}`}>
              Barakat
            </h1>

            <h1 className={`font-arch text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-[1.2em] md:tracking-[1.6em] leading-none opacity-[0.05] mt-2 md:mt-4 ${theme === Theme.DARK ? 'text-white' : 'text-slate-900'}`}>
              Qurtas
            </h1>
          </motion.div>

          {/* Central Portrait Image - Now with a perfect Oval shape */}
          <motion.div
            style={{ 
              x: portraitX, 
              y: portraitY,
              rotateX: rotateX,
              rotateY: rotateY,
              perspective: 1000 
            }}
            animate={{ 
              y: [0, -10, 0], // Autonomous floating/breathing
            }}
            transition={{
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative group block z-10 cursor-none"
          >
            <div className={`relative w-[150px] h-[220px] md:w-[200px] md:h-[280px] overflow-hidden rounded-full border transition-all duration-1000 ${
              theme === Theme.DARK ? 'border-slate-800/50 bg-slate-900 shadow-2xl shadow-black/60' : 'border-blue-100 bg-white shadow-2xl shadow-blue-900/10'
            }`}>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000" 
                alt="Barakat Qurtas"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-110"
              />
            </div>
            
            {/* Subtle glow behind the portrait */}
            <motion.div 
              style={{ scale: 1.2 }}
              className="absolute -inset-10 blur-[60px] bg-blue-500/10 opacity-30 group-hover:opacity-60 transition-opacity -z-10 rounded-full" 
            />
          </motion.div>
        </div>

        {/* Typed Bio with subtle parallax */}
        <motion.div 
          style={{ x: bioX }}
          className="text-center mt-12 w-full max-w-3xl relative z-20"
        >
          <p className="font-simple text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] opacity-30 leading-[2.2] mx-auto whitespace-pre-line min-h-[4em]">
            {text}
            <span className="inline-block w-[1px] h-[1em] ml-1 bg-sky-500 animate-pulse align-middle" />
          </p>
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 opacity-30 text-sky-500"
      >
        <Mouse size={32} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
};

export default Hero;
