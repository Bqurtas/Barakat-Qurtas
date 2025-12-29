
import React from 'react';
import { motion } from 'framer-motion';

const Splash: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      // Fixed easing array type
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070a]"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          // Fixed easing array type
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center"
        >
          {/* Logo font only, further reduced size for a more premium, minimal feel */}
          <h1 className="font-liana text-3xl md:text-5xl text-white tracking-[0.2em] italic select-none">
            Barakat Qurtas
          </h1>
        </motion.div>
        
        {/* Animated line removed as per "just the logo by itself" request */}
        
        {/* Very subtle background glow for depth, without distracting from the signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute -inset-40 bg-blue-500/10 blur-[120px] -z-10 rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default Splash;
