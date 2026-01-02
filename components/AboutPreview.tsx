
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Theme } from '../types';

interface AboutPreviewProps {
  theme: Theme;
  onExplore?: () => void;
}

const AboutPreview: React.FC<AboutPreviewProps> = ({ theme, onExplore }) => {
  const isDark = theme === Theme.DARK;

  return (
    <section id="about-preview" className="py-32 overflow-hidden relative flex flex-col justify-center">
      <div className="container mx-auto px-6 max-w-6xl relative">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:w-[40%]"
          >
            <div className="relative group cursor-none" onClick={onExplore}>
              <div 
                className={`relative aspect-[3.5/4.5] w-full max-w-[340px] mx-auto rounded-[110px] md:rounded-[140px] overflow-hidden border p-2.5 transition-all duration-1000 ${
                  isDark ? 'border-white/10 bg-slate-900 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]' : 'border-blue-50 bg-white shadow-[0_40px_100px_-20px_rgba(93,103,232,0.15)]'
                }`}
              >
                <img 
                  src="https://i.ibb.co/LdXvxY3b/B0006.png" 
                  className="w-full h-full object-cover rounded-[105px] md:rounded-[135px] transition-transform duration-1000 group-hover:scale-105" 
                  alt="Barakat Qurtas Biography"
                />
              </div>

              {/* Refined & Perfectly Centered Badge */}
              <div 
                className={`absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 md:translate-x-0 md:translate-y-0 md:-bottom-2 md:-right-2 bg-blue-600 text-white w-28 h-28 md:w-32 md:h-32 rounded-full z-20 flex flex-col items-center justify-center border-[6px] ${isDark ? 'border-[#0a0f14]' : 'border-white'} shadow-2xl shadow-blue-600/40`}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <Sparkles size={12} className="mb-1 opacity-80" />
                  <span className="font-arch text-2xl md:text-3xl font-black tracking-tighter leading-none">12+</span>
                  <div className="flex flex-col items-center justify-center mt-0.5">
                    <span className="font-simple text-[7px] md:text-[8px] uppercase tracking-[0.2em] font-black opacity-90 leading-none">Years</span>
                    <span className="font-simple text-[7px] md:text-[8px] uppercase tracking-[0.2em] font-black opacity-90 leading-none mt-1">Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:w-[60%] space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <span className="font-simple text-[10px] font-black uppercase tracking-[0.6em] text-blue-500">The Architect</span>
              <div className="h-[1px] w-24 bg-gradient-to-r from-blue-600/30 to-transparent" />
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className={`font-simple text-5xl md:text-7xl leading-[0.9] font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-950'}`}
            >
              Master of <br />
              <span className="text-blue-600">Visual</span> Logic
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className={`font-simple text-base md:text-lg leading-relaxed max-w-xl ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
            >
              Based in the heart of Erbil, Barakat Qurtas transforms complex ideas into timeless visual languages. With a deep respect for precision, his work bridges the gap between art and functionality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              <motion.button 
                onClick={onExplore}
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-6 px-10 py-5 rounded-[22px] bg-blue-600 text-white shadow-2xl shadow-blue-600/30 group transition-all cursor-none"
              >
                <span className="font-simple font-black tracking-[0.4em] text-[11px] uppercase">Explore Biography</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
    </section>
  );
};

export default AboutPreview;
