
import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface LogoTickerProps {
  theme: Theme;
}

const LogoTicker: React.FC<LogoTickerProps> = ({ theme }) => {
  const logos = [
    'https://cdn-icons-png.flaticon.com/512/5968/5968204.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968218.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968313.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968322.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968213.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968242.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968204.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968218.png',
  ];

  const duplicatedLogos = [...logos, ...logos, ...logos];

  const isDark = theme === Theme.DARK;
  const fadeColor = isDark ? 'from-[#0a0f14]' : 'from-[#f8fafc]';

  return (
    <section className="py-24 overflow-hidden relative">
      {/* Side Fades */}
      <div className={`absolute inset-y-0 left-0 w-32 md:w-80 z-20 pointer-events-none bg-gradient-to-r ${fadeColor} via-transparent to-transparent`} />
      <div className={`absolute inset-y-0 right-0 w-32 md:w-80 z-20 pointer-events-none bg-gradient-to-l ${fadeColor} via-transparent to-transparent`} />
      
      <div className="mb-20 text-center relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className={`h-[1px] w-8 ${isDark ? 'bg-blue-500/20' : 'bg-blue-600/10'}`} />
          <h3 className="font-simple text-[9px] md:text-[10px] font-black uppercase tracking-[1em] opacity-40">
            Identity Heritage
          </h3>
          <div className={`h-[1px] w-8 ${isDark ? 'bg-blue-500/20' : 'bg-blue-600/10'}`} />
        </div>
        <p className={`font-liana text-2xl ${isDark ? 'text-blue-500/40' : 'text-blue-600/30'}`}>World Class Collaborations</p>
      </div>

      <div className="relative group">
        {/* The Ticker with Reflection Effect */}
        <div className="relative">
          <motion.div 
            className="flex gap-24 md:gap-44 items-center"
            animate={{ x: [0, -1500] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {duplicatedLogos.map((logo, idx) => (
              <div key={idx} className="flex flex-col items-center gap-8">
                {/* Main Logo */}
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 grayscale hover:grayscale-0 transition-all duration-1000 cursor-pointer flex items-center justify-center opacity-20 hover:opacity-100">
                  <img src={logo} alt="Project Logo" className="max-w-full max-h-full object-contain" />
                </div>
                
                {/* Classy Reflection */}
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 grayscale opacity-[0.02] scale-y-[-1] pointer-events-none blur-[2px]">
                  <img src={logo} alt="Reflection" className="max-w-full max-h-full object-contain" />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Mask for reflection fading */}
          <div className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t ${isDark ? 'from-[#0a0f14]' : 'from-[#f8fafc]'} to-transparent z-10 pointer-events-none`} />
        </div>

        {/* Soft Footer Info (No hard lines) */}
        <div className="container mx-auto max-w-4xl px-6 mt-12">
          <div className="flex justify-between items-center opacity-20 font-simple text-[7px] uppercase tracking-[0.4em] font-black px-2">
            <span>Premium Output</span>
            <span>Est. 2012</span>
            <span>Global Standard</span>
          </div>
        </div>
      </div>

      {/* Ambient background glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/[0.02] blur-[150px] pointer-events-none -z-10`} />
    </section>
  );
};

export default LogoTicker;
