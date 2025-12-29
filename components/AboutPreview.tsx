
import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ArrowRight } from 'lucide-react';
import { Theme } from '../types';

interface AboutPreviewProps {
  theme: Theme;
  onExplore?: () => void;
}

const AboutPreview: React.FC<AboutPreviewProps> = ({ theme, onExplore }) => {
  return (
    <section id="about" className="py-20 overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          
          {/* Portrait Layer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            // Fixed easing array type
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] as const }}
            className="relative lg:w-[45%] flex justify-center"
          >
            <div className={`w-64 h-64 md:w-[380px] md:h-[380px] rounded-[85px] overflow-hidden border-[1px] p-3 transition-colors duration-1000 ${
              theme === Theme.DARK ? 'border-slate-800 shadow-[0_40px_100px_rgba(0,0,0,0.5)]' : 'border-blue-100 shadow-[0_40px_100px_rgba(30,64,175,0.02)]'
            }`}>
              <img 
                src="https://uvpdlkyfzvbwvkvm.public.blob.vercel-storage.com/image-766t5fclS8rG6n67oR0o4I74zBvA3w.png" 
                alt="Barakat Portrait" 
                className="w-full h-full object-cover rounded-[70px] grayscale hover:grayscale-0 transition-all duration-1000 opacity-90 hover:opacity-100" 
              />
            </div>
            
            <motion.div 
              initial={{ rotate: 10, scale: 0.7, opacity: 0 }}
              whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1, ease: "backOut" }}
              className="absolute -bottom-5 -right-1 w-28 h-28 bg-blue-600 flex items-center justify-center rounded-full text-white shadow-2xl z-10"
            >
              <div className="text-center p-3 border border-white/20 rounded-full w-[90%] h-[90%] flex flex-col justify-center">
                <p className="font-simple text-xl font-black italic leading-none">12+</p>
                <p className="font-simple text-[6px] uppercase tracking-[0.3em] font-black mt-1 opacity-70">Years</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Narrative Layer */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:w-[55%]"
          >
            <div className={`p-8 md:p-12 rounded-[45px] relative transition-all duration-1000 ${
              theme === Theme.DARK ? 'glass-card' : 'glass-card-light'
            }`}>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-5">
                  <Quote size={24} className="text-blue-500 opacity-20" />
                  <div className={`h-[1px] flex-1 ${theme === Theme.DARK ? 'bg-blue-400/10' : 'bg-blue-600/5'}`} />
                </div>
                
                <h3 className="font-simple text-3xl md:text-4xl leading-[1.2] font-black uppercase tracking-tight">
                  Design is the silent <span className="text-blue-600">ambassador</span> of your brand.
                </h3>
                
                <p className={`font-simple text-[13px] md:text-[14px] leading-relaxed font-medium tracking-wide ${theme === Theme.DARK ? 'text-slate-500' : 'text-slate-500'}`}>
                  Based in Erbil, Barakat Qurtas transforms complex ideas into precise visual artifacts. His architectural approach to design ensures every pixel serves a purpose.
                </p>

                <div className="flex items-center pt-2">
                  <motion.button 
                    onClick={onExplore}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-4 group"
                  >
                    <span className="font-simple font-black tracking-[0.3em] text-[9px] uppercase opacity-40 group-hover:opacity-100 transition-opacity">Full Biography</span>
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                      <ArrowRight size={14} />
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
