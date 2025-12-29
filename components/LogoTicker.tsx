
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

  // Using strict background colors to prevent "indigo" tint in the fade
  // Dark: #0a0f14 (App background)
  // Light: #f8fafc (App background)
  const fadeColor = theme === Theme.DARK ? 'from-[#0a0f14]' : 'from-[#f8fafc]';

  return (
    <section className="py-12 overflow-hidden relative">
      {/* Side Fades - Strictly matching the section background */}
      <div className={`absolute inset-y-0 left-0 w-32 md:w-64 z-10 pointer-events-none bg-gradient-to-r ${fadeColor} to-transparent`} />
      <div className={`absolute inset-y-0 right-0 w-32 md:w-64 z-10 pointer-events-none bg-gradient-to-l ${fadeColor} to-transparent`} />
      
      <div className="mb-14 text-center">
        <h3 className="font-arch text-[10px] md:text-[12px] font-black uppercase tracking-[0.8em] opacity-40">
          Identity Creations
        </h3>
      </div>

      <motion.div 
        className="flex gap-20 md:gap-40"
        animate={{ x: [0, -1500] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {duplicatedLogos.map((logo, idx) => (
          <div 
            key={idx} 
            className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer flex items-center justify-center opacity-20 hover:opacity-100"
          >
            <img src={logo} alt="Project Logo" className="max-w-full max-h-full object-contain" />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default LogoTicker;