
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Quote, Sparkles, Award, MapPin } from 'lucide-react';
import { Theme } from '../types';

interface AboutRoomProps {
  theme: Theme;
  onBack: () => void;
}

const AboutRoom: React.FC<AboutRoomProps> = ({ theme, onBack }) => {
  const textColor = theme === Theme.DARK ? 'text-slate-100' : 'text-slate-900';
  const subTextColor = theme === Theme.DARK ? 'text-slate-400' : 'text-slate-500';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen pt-32 pb-20 px-6 relative z-10 overflow-x-hidden`}
    >
      <div className="container mx-auto max-w-5xl">
        <motion.button
          onClick={onBack}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ x: -5 }}
          className="flex items-center gap-3 mb-16 group"
        >
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
            <ArrowLeft size={18} />
          </div>
          <span className="font-simple text-[10px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">Return Home</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className={`relative aspect-[3/4] rounded-[60px] overflow-hidden border border-blue-500/10 shadow-2xl ${theme === Theme.DARK ? 'bg-slate-900' : 'bg-blue-50/20'}`}
            >
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800" 
                alt="Portrait of Designer" 
                className="w-full h-full object-cover grayscale brightness-90 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent pointer-events-none" />
            </motion.div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <MapPin className="text-blue-600" size={20} />
                <span className={`font-simple text-xs font-bold ${textColor}`}>Erbil - Kurdistan Region, Iraq</span>
              </div>
              <div className={`p-6 rounded-[32px] border ${theme === Theme.DARK ? 'border-slate-800 bg-slate-900/40' : 'border-blue-100 bg-blue-50/30'}`}>
                <p className="font-simple text-[9px] font-black uppercase tracking-[0.3em] opacity-30 mb-4">Core Stack</p>
                <div className="flex flex-wrap gap-2">
                  {['Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro', 'Adobe Creative Cloud'].map(tool => (
                    <span key={tool} className="px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-600 text-[9px] font-bold uppercase tracking-wider">{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              <h1 className="font-simple text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-12">
                Visual <br /> <span className="text-blue-600 italic font-liana tracking-normal capitalize">Chronicle</span>
              </h1>

              <div className="relative mb-12">
                <Quote size={40} className="text-blue-600 opacity-10 absolute -top-8 -left-6" />
                <p className={`font-simple text-lg md:text-xl leading-relaxed font-medium italic ${textColor}`}>
                  "It doesn't matter where I work now or where I work in the future, but it is always important to be satisfied with others."
                </p>
              </div>

              <div className={`space-y-8 font-simple text-sm md:text-base leading-relaxed ${subTextColor}`}>
                <p>
                  I am Barakat Qartas, a visual architect based in Erbil. Life in Erbil and getting to know different cultures closely has a different enjoyment relationship. In the evening, the colorful view of magical evenings is our rest.
                </p>
                
                <div className="flex items-start gap-6 py-6">
                   <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center flex-shrink-0 text-blue-600">
                     <Sparkles size={24} />
                   </div>
                   <p>
                    Since childhood, I had a passion for graphic design and typography. I am 25 years old and do a good level graphic design and my work bears witness to my words.
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-blue-500/10">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-blue-600">
                      <Award size={18} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Education</span>
                    </div>
                    <p className={`text-sm font-bold ${textColor}`}>Law Graduate - Erbil Polytechnic University</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-blue-600">
                      <Sparkles size={18} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Ambition</span>
                    </div>
                    <p className={`text-sm font-bold ${textColor}`}>Owning a major advertising & publishing firm</p>
                  </div>
                </div>

                <div className="pt-10 flex flex-col gap-2">
                  <span className={`font-liana text-3xl text-blue-600`}>Barakat Qurtas</span>
                  <span className={`font-simple text-[10px] font-black uppercase tracking-[0.5em] opacity-40`}>Graphic Designer</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />
    </motion.div>
  );
};

export default AboutRoom;
