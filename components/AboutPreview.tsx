
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ArrowRight, Minus } from 'lucide-react';
import { Theme } from '../types';

interface AboutPreviewProps {
  theme: Theme;
  onExplore?: () => void;
}

const AboutPreview: React.FC<AboutPreviewProps> = ({ theme, onExplore }) => {
  const isDark = theme === Theme.DARK;

  return (
    <section id="about" className="py-32 overflow-hidden relative">
      {/* Ambient background decorative elements */}
      <div className={`absolute top-1/4 left-10 w-64 h-64 blur-[120px] rounded-full opacity-20 pointer-events-none ${isDark ? 'bg-blue-600/20' : 'bg-blue-400/10'}`} />
      
      <div className="container mx-auto px-6 max-w-6xl relative">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* IMAGE SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="relative lg:w-[42%]"
          >
            <div className="relative z-10">
              {/* OVAL (EGG-SHAPED) IMAGE CONTAINER */}
              <div className={`relative aspect-[4/5] w-full rounded-full overflow-hidden border-[1px] p-2 transition-all duration-1000 ${
                isDark ? 'border-white/5 bg-slate-900 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)]' : 'border-blue-100 bg-white shadow-[0_40px_80px_-15px_rgba(37,99,235,0.1)]'
              }`}>
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800" 
                  alt="Barakat Qurtas" 
                  className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100" 
                />
              </div>

              {/* CIRCULAR EXPERIENCE BADGE */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -right-2 md:-right-6 bg-blue-600 text-white w-24 h-24 md:w-32 md:h-32 rounded-full shadow-2xl z-20 flex flex-col items-center justify-center border-4 border-[#0a0f14]"
                style={{ borderColor: isDark ? '#0a0f14' : '#f8fafc' }}
              >
                <span className="font-arch text-2xl md:text-3xl font-black leading-none">12+</span>
                <span className="font-simple text-[6px] md:text-[7px] uppercase tracking-[0.3em] font-black mt-1 opacity-60 text-center px-2">Years Exp</span>
              </motion.div>
            </div>
            
            {/* Decorative Frame behind image - also oval */}
            <div className={`absolute -inset-4 border rounded-full -z-10 opacity-30 ${isDark ? 'border-white/5' : 'border-blue-200'}`} />
          </motion.div>

          {/* TEXT SECTION */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:w-[58%] relative"
          >
            {/* The Classy Shape/Card */}
            <div className={`p-10 md:p-16 rounded-[50px] md:rounded-[70px] relative transition-all duration-1000 overflow-hidden group ${
              isDark 
                ? 'bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 backdrop-blur-3xl' 
                : 'bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 shadow-xl shadow-blue-900/5'
            }`}>
              
              {/* Subtle architectural grid pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{ backgroundImage: `radial-gradient(${isDark ? 'white' : 'black'} 1px, transparent 0)`, backgroundSize: '30px 30px' }} 
              />

              <div className="relative z-10 flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <span className="font-simple text-[9px] font-black uppercase tracking-[0.6em] text-blue-600">The Vision</span>
                  <div className={`h-[1px] w-12 ${isDark ? 'bg-white/10' : 'bg-blue-600/10'}`} />
                </div>
                
                <h3 className="font-simple text-3xl md:text-5xl leading-[1.1] font-black uppercase tracking-tight">
                  Design is the silent <br />
                  <span className="font-liana text-blue-600 capitalize italic tracking-normal text-4xl md:text-6xl inline-block mt-2">ambassador</span> <br />
                  of your brand.
                </h3>
                
                <div className="space-y-6">
                  <p className={`font-simple text-sm md:text-base leading-relaxed font-medium tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Based in Erbil, Barakat Qurtas transforms complex ideas into precise visual artifacts. His architectural approach to design ensures every pixel serves a purpose, creating timeless identities for high-profile clients across the region.
                  </p>
                  
                  <div className={`flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-white/20' : 'text-black/10'}`}>
                    <Minus size={14} />
                    <span>Est. 2012 / Erbil, Kurdistan</span>
                  </div>
                </div>

                <div className="flex items-center pt-4">
                  <motion.button 
                    onClick={onExplore}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-6 px-8 py-4 rounded-2xl border transition-all duration-500 group ${
                      isDark 
                        ? 'border-white/10 hover:border-blue-600 hover:bg-blue-600 text-white' 
                        : 'border-slate-900/10 hover:border-blue-600 hover:bg-blue-600 hover:text-white text-slate-900'
                    }`}
                  >
                    <span className="font-simple font-black tracking-[0.4em] text-[10px] uppercase">Explore Biography</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Quote decoration */}
            <Quote size={80} className={`absolute -top-10 -right-4 opacity-[0.03] rotate-12 ${isDark ? 'text-white' : 'text-blue-900'}`} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
