import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Theme } from '../types';

interface LogoTickerProps {
  theme: Theme;
}

interface CounterProps {
  value: string;
  label: string;
  theme: Theme;
}

const Counter: React.FC<CounterProps> = ({ value, label, theme }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isDark = theme === Theme.DARK;

  const numericTarget = parseInt(value.replace(/[^0-9]/g, ''));
  const prefix = value.startsWith('+') ? '+' : '';
  const suffix = value.endsWith('+') ? '+' : '';

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, numericTarget, {
        duration: 3,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, numericTarget]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center cursor-default group"
    >
      <div className="relative mb-2">
        <motion.span 
          className={`font-simple text-4xl md:text-7xl font-[900] transition-all duration-700 block ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {prefix}{displayValue}{suffix}
        </motion.span>
        <div className={`h-[2px] w-12 mx-auto mt-2 rounded-full transition-all duration-700 group-hover:w-20 ${isDark ? 'bg-blue-500/40' : 'bg-blue-600/30'}`} />
      </div>
      
      <span className={`font-simple text-[10px] font-black uppercase tracking-0.6em ${
        isDark ? 'text-white/20 group-hover:text-blue-400' : 'text-slate-900/20 group-hover:text-blue-600'
      } transition-colors duration-500`}>
        {label}
      </span>
    </motion.div>
  );
};

const LogoTicker: React.FC<LogoTickerProps> = ({ theme }) => {
  const logos = [
    'https://i.ibb.co/bMjvRWP4/765431.png',
    'https://i.ibb.co/1V97hVS/765433.png',
    'https://i.ibb.co/cS9JXPWr/765436.png',
    'https://i.ibb.co/KpwP3FC2/7654310.png',
    'https://i.ibb.co/7JzrSsQm/7654312.png',
    'https://i.ibb.co/B2LNWnvD/7654314.png',
    'https://i.ibb.co/Y4YB3bdy/7654315.png',
    'https://i.ibb.co/fBghbQg/7654318.png',
    'https://i.ibb.co/cXv1Fj0r/7654320.png',
    'https://i.ibb.co/TMb4hQXX/7654322.png',
    'https://i.ibb.co/HL5D6Q1n/7654324.png',
    'https://i.ibb.co/wZptbMz2/7654328.png',
    'https://i.ibb.co/S7xzQWKZ/7654330.png',
    'https://i.ibb.co/vxRjG5tm/7654332.png',
    'https://i.ibb.co/fzgq1D3L/7654336.png',
    'https://i.ibb.co/v9TBBww/7654340.png',
    'https://i.ibb.co/1JpBrFML/7654342.png',
    'https://i.ibb.co/cX3bz9Mq/31414135458.png',
    'https://i.ibb.co/8t7qd19/314141354512.png',
    'https://i.ibb.co/DHNw6pQK/342653454368.png'
  ];

  const duplicatedLogos = [...logos, ...logos, ...logos];

  const statsData = [
    { label: 'Designs', value: '+1000' },
    { label: 'Clients', value: '25+' },
    { label: 'Logos', value: '20+' },
    { label: 'Books', value: '100+' },
  ];

  const isDark = theme === Theme.DARK;
  const fadeColor = isDark ? 'from-[#0a0f14]' : 'from-[#F0EFEB]';

  return (
    <section id="collaborations" className="py-32 overflow-hidden relative flex flex-col justify-center min-h-screen">
      <div className={`absolute inset-y-0 left-0 w-48 z-20 pointer-events-none bg-gradient-to-r ${fadeColor} via-transparent to-transparent`} />
      <div className={`absolute inset-y-0 right-0 w-48 z-20 pointer-events-none bg-gradient-to-l ${fadeColor} via-transparent to-transparent`} />
      
      <div className="mb-24 text-center px-6">
        <motion.p 
          initial={{ opacity: 0, tracking: '0.2em' }} 
          whileInView={{ opacity: 0.3, tracking: '0.8em' }} 
          transition={{ duration: 1.5 }}
          className="font-simple uppercase text-[9px] font-black mb-4"
        >
          Milestones
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }} 
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} 
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-simple text-4xl md:text-6xl font-[900] uppercase tracking-tight leading-none"
        >
          Statistics
        </motion.h2>
      </div>

      <div id="statistics" className="container mx-auto max-w-6xl px-6 mb-40">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-24">
          {statsData.map((stat, idx) => (
            <Counter key={idx} value={stat.value} label={stat.label} theme={theme} />
          ))}
        </div>
      </div>

      <div className="mb-12 text-center">
         <motion.h3 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 0.25, scale: 1 }}
            className={`font-simple text-[10px] md:text-[12px] font-black uppercase tracking-[0.8em] ${isDark ? 'text-white' : 'text-slate-900'}`}
         >
           Logo Design
         </motion.h3>
      </div>

      <div className="relative w-full overflow-hidden flex items-center h-40 md:h-56">
        <div className="flex w-max items-center">
          <motion.div 
            animate={{ x: [0, -2000] }}
            transition={{ 
              duration: 45, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ willChange: 'transform' }}
            className="flex items-center gap-24 md:gap-40 pr-24 md:pr-40"
          >
            {duplicatedLogos.map((logo, idx) => (
              <div key={idx} className="flex-shrink-0 flex items-center justify-center">
                <motion.img 
                  src={logo} 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  loading="lazy"
                  decoding="async"
                  className="h-24 md:h-36 w-auto grayscale opacity-25 transition-all duration-700 cursor-none" 
                  alt="Partner logo"
                  style={{ maxWidth: 'none', objectFit: 'contain' }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
    </section>
  );
};

export default LogoTicker;