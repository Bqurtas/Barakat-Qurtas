import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MY_WORKS_DATA } from '../worksData';

const Splash: React.FC = () => {
  useEffect(() => {
    // Rocket Speed: Global Pre-warming of all categories
    const categories = [
      'General Design', 'Social Media', 'Book Covers', 
      'Logo', 'Posters', 'Events & Conference', 'Video', 'Image'
    ];
    
    const warmupAll = async () => {
      // Prioritize the first 8 items of EVERY category for instant switching
      const allPrioritizedImages = categories.flatMap(cat => 
        MY_WORKS_DATA.filter(item => item.category === cat).slice(0, 8).map(item => item.image)
      );

      // Unique set to avoid double loading
      const uniqueImages = Array.from(new Set(allPrioritizedImages));

      uniqueImages.forEach(src => {
        const img = new Image();
        img.src = src;
        // Use the browser's decode API to ensure it's in GPU memory before splash ends
        if (img.decode) {
          img.decode().catch(err => console.debug('Pre-decode skipped for:', src));
        }
      });
    };

    warmupAll();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        filter: "blur(60px)",
        scale: 1.1,
        transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } 
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070a]"
    >
      <div className="relative flex flex-col items-center gap-10">
        {/* Main Title Container */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ 
            duration: 2, 
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2
          }}
          className="text-center"
        >
          <h1 className="font-liana text-4xl md:text-7xl text-white tracking-tight italic select-none drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Barakat Qurtas
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="font-simple text-[11px] md:text-[13px] uppercase tracking-[0.8em] text-white mt-3 ml-2 font-light"
          >
            Graphic Designer
          </motion.p>
        </motion.div>
        
        {/* The Two-Cycle Loading Bar */}
        <div className="relative w-72 h-[1px] bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              repeat: 1,
              duration: 1.2,
              ease: [0.65, 0, 0.35, 1],
              repeatDelay: 0.1
            }}
            className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          />
        </div>
        
        {/* Deep Ambient Glow */}
        <motion.div
          animate={{ 
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -inset-96 bg-blue-600/10 blur-[220px] -z-10 rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default Splash;