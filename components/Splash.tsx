import React from 'react';
import { motion } from 'framer-motion';

const Splash: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        filter: "blur(60px)",
        scale: 1.1,
        transition: { duration: 2, ease: [0.22, 1, 0.36, 1] } 
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070a]"
    >
      <div className="relative flex flex-col items-center gap-10">
        {/* Main Title Container */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ 
            duration: 2.5, 
            ease: [0.16, 1, 0.3, 1],
            delay: 0.5
          }}
          className="text-center"
        >
          <h1 className="font-liana text-[32px] md:text-7xl text-white tracking-tight italic select-none drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Barakat Qurtas
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 1.5, duration: 2 }}
            className="font-simple text-[11px] md:text-[13px] uppercase tracking-[0.8em] text-white mt-3 ml-2 font-light"
          >
            Graphic Designer
          </motion.p>
        </motion.div>
        
        {/* The Two-Cycle Loading Bar - Reduced margin top */}
        <div className="relative w-72 h-[1px] bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              repeat: 1,
              duration: 1.8,
              ease: [0.65, 0, 0.35, 1],
              repeatDelay: 0.2
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
            duration: 6,
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