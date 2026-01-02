
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Quote, MapPin, Download, GraduationCap, Heart, Award, ShieldCheck, Star, Rocket, Sparkles, CheckCircle } from 'lucide-react';
import { Theme } from '../types';
import Footer from './Footer';

interface AboutRoomProps {
  theme: Theme;
  onBack: () => void;
}

const AboutRoom: React.FC<AboutRoomProps> = ({ theme, onBack }) => {
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  const isDark = theme === Theme.DARK;
  const textColor = isDark ? 'text-slate-100' : 'text-slate-900';
  const subTextColor = isDark ? 'text-slate-400' : 'text-slate-500';

  const tools = [
    'Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro', 'InDesign', 'Lightroom', 'MS Word'
  ];

  const hobbies = [
    'Traveling', 'Reading', 'Design', 'Law', 'Sports', 'Cleanliness', 'Respect'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 w-full"
    >
      <div className="container mx-auto max-w-6xl px-6 pt-24 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDE: STICKY SIDEBAR */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
            <motion.button
              onClick={onBack}
              whileHover={{ x: -5 }}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                <ArrowLeft size={18} />
              </div>
              <span className="font-simple text-[10px] font-black uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">Return</span>
            </motion.button>

            {/* Colored Portrait */}
            <div className={`relative aspect-[3/4] rounded-[45px] overflow-hidden border transition-all duration-1000 ${
              isDark ? 'border-white/10 bg-slate-900 shadow-2xl' : 'border-blue-100 bg-white shadow-xl shadow-blue-900/5'
            }`}>
              <img 
                src="https://i.ibb.co/LdXvxY3b/B0006.png" 
                alt="Barakat Qurtas" 
                className="w-full h-full object-cover scale-105"
              />
            </div>

            {/* Software Proficiency */}
            <div className={`p-6 rounded-[35px] border ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-blue-50 bg-white'}`}>
              <p className="font-simple text-[8px] font-black uppercase tracking-[0.3em] opacity-30 mb-4 text-center">Software Arsenal</p>
              <div className="flex flex-wrap justify-center gap-2">
                {tools.map(tool => (
                  <span key={tool} className={`px-3 py-1.5 rounded-xl border text-[8px] font-bold uppercase tracking-widest ${isDark ? 'border-white/5 bg-white/5 text-slate-300' : 'border-blue-50 bg-blue-50/50 text-blue-600'}`}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Download Button */}
            <motion.a
              href="#" 
              whileHover={{ scale: 1.02, y: -2 }}
              className={`flex items-center justify-center gap-3 w-full py-5 rounded-3xl font-simple text-[9px] font-black uppercase tracking-[0.4em] transition-all shadow-xl ${
                isDark ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'
              }`}
            >
              Download Portfolio <Download size={14} />
            </motion.a>

            {/* Hobbies & Values */}
            <div className={`p-7 rounded-[40px] border transition-all duration-500 ${isDark ? 'border-white/5 bg-blue-600/[0.03]' : 'border-blue-50 bg-blue-50/20'}`}>
              <div className="flex items-center justify-center gap-2 mb-5">
                <Heart size={14} className="text-blue-600" />
                <span className="font-simple text-[8px] font-black uppercase tracking-[0.4em] opacity-40">Identity & Ethics</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {hobbies.map(hobby => (
                  <span key={hobby} className={`px-4 py-2 rounded-2xl border text-[9px] font-bold tracking-wider ${isDark ? 'border-white/5 bg-white/5 text-slate-400' : 'border-blue-50 bg-white text-blue-800'}`}>
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: CONTENT */}
          <div className="lg:col-span-8 space-y-12 pb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-simple text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">About me</span>
                <div className="h-[1px] flex-grow bg-blue-600/10" />
              </div>
              <h1 className="font-simple text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8]">
                Visual <br /> <span className="text-blue-600 italic font-liana tracking-normal capitalize">Architecture</span>
              </h1>
            </div>

            <div className="space-y-14">
              <div className="space-y-6">
                <p className={`font-simple text-xl md:text-2xl font-bold leading-tight ${textColor}`}>
                  I am <span className="text-blue-600">Barakat Qurtas</span>. Born in 1997 in Soran, my life is a journey of transforming early curiosity into digital excellence.
                </p>
                
                <p className={`font-simple text-base md:text-lg leading-relaxed ${subTextColor}`}>
                  I spent my childhood and completed my high school in the serene mountains of Soran. For many years now, Erbil has been my home. While the mountains were once our place of rest, today, the colorful and magical evenings of Erbil provide the sanctuary for my creative spirit. Getting to know Erbil’s diverse cultures has added a unique enjoyment and depth to my relationship with design.
                </p>
              </div>

              {/* Early Roots Block */}
              <div className={`p-8 md:p-12 rounded-[50px] border relative overflow-hidden ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-blue-50 bg-blue-50/10'}`}>
                <div className="flex items-start gap-6 relative z-10">
                   <Quote className="text-blue-600 shrink-0" size={40} />
                   <div className="space-y-4">
                     <p className={`font-simple text-lg md:text-xl italic font-semibold leading-relaxed ${textColor}`}>
                       "My passion for graphic design and typography was born in childhood. I began experimenting with Microsoft Word as a design tool at the age of 12. By 17, I found myself completely immersed in the profound profession of visual creation."
                     </p>
                   </div>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Sparkles size={120} />
                </div>
              </div>

              {/* Work & Testimony */}
              <div className="space-y-6">
                <p className={`font-simple text-base md:text-lg leading-relaxed ${subTextColor}`}>
                  At 25, I deliver high-level graphic design solutions where <span className="text-blue-600 font-bold">my work bears witness to my words</span>. My technical expertise spans the entire Adobe Creative Cloud—Photoshop for intricate design, Illustrator for vector mastery, and After Effects & Premiere Pro for dynamic video storytelling.
                </p>
              </div>

              {/* Education & Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-8 rounded-[40px] border ${isDark ? 'border-white/5 bg-white/[0.03]' : 'border-blue-50 bg-white shadow-sm'}`}>
                  <GraduationCap className="text-blue-600 mb-4" size={24} />
                  <h4 className={`font-simple text-xs font-black uppercase tracking-widest mb-2 ${textColor}`}>Legal Foundations</h4>
                  <p className={`font-simple text-sm leading-relaxed ${subTextColor}`}>
                    A Law Graduate from Erbil Polytechnic University. This academic depth gives my design work a unique sense of structure, order, and ethical precision.
                  </p>
                </div>
                <div className={`p-8 rounded-[40px] border ${isDark ? 'border-white/5 bg-white/[0.03]' : 'border-blue-50 bg-white shadow-sm'}`}>
                  <Award className="text-blue-600 mb-4" size={24} />
                  <h4 className={`font-simple text-xs font-black uppercase tracking-widest mb-2 ${textColor}`}>Mastery Certified</h4>
                  <p className={`font-simple text-sm leading-relaxed ${subTextColor}`}>
                    Holder of multiple separate, intermediate, and Graphic Design Masterclass certificates, dedicated to the philosophy of "Learn GREAT Design."
                  </p>
                </div>
              </div>

              {/* Career Highlights */}
              <div className={`p-10 rounded-[45px] border ${isDark ? 'border-white/5 bg-slate-900/40' : 'border-blue-50 bg-white'}`}>
                <div className="flex items-center gap-3 mb-10">
                  <ShieldCheck className="text-blue-600" size={20} />
                  <span className="font-simple text-[9px] font-black uppercase tracking-[0.3em] opacity-40">Institutional Excellence</span>
                </div>
                <div className="space-y-8">
                  <div className="group flex justify-between items-center py-4 border-b border-blue-600/5 hover:border-blue-600/20 transition-colors">
                    <div className="flex flex-col">
                      <span className={`font-simple text-lg font-bold ${textColor}`}>Kurdistan Region Presidency</span>
                      <span className={`text-xs ${subTextColor}`}>Senior Visual Design</span>
                    </div>
                    <Star className="text-blue-600 opacity-20 group-hover:opacity-100 transition-opacity" size={16} />
                  </div>
                  <div className="group flex justify-between items-center py-4">
                    <div className="flex flex-col">
                      <span className={`font-simple text-lg font-bold ${textColor}`}>KRG - Protocol Department</span>
                      <span className={`text-xs ${subTextColor}`}>Governmental Branding & Visuals</span>
                    </div>
                    <Star className="text-blue-600 opacity-20 group-hover:opacity-100 transition-opacity" size={16} />
                  </div>
                </div>
              </div>

              {/* The DREAM Section - Stylized Visual Block */}
              <motion.div 
                whileHover={{ y: -5 }}
                className={`p-10 md:p-14 rounded-[55px] border-2 border-blue-600/20 bg-gradient-to-br ${isDark ? 'from-blue-600/10 to-transparent' : 'from-blue-50 to-white'} relative overflow-hidden`}
              >
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <Rocket className="text-blue-600" size={20} />
                    <span className="font-simple text-[9px] font-black uppercase tracking-[0.5em] text-blue-600">The Vision</span>
                  </div>
                  <h3 className={`font-simple text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight ${textColor}`}>
                    "I would like to be able to use my work more and dream of owning a <span className="text-blue-600">big advertising and publishing company</span> in the future."
                  </h3>
                  <div className="h-[2px] w-24 bg-blue-600 rounded-full" />
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
                   <Rocket size={240} />
                </div>
              </motion.div>

              {/* The Satisfaction / Philosophy Section - Stylized Philosophy Block */}
              <div className="py-16 border-t border-blue-600/10 flex flex-col items-center text-center">
                 <CheckCircle className="text-blue-600 mb-8 opacity-30" size={36} />
                 <p className={`font-simple text-xl md:text-2xl font-bold leading-relaxed max-w-3xl italic ${textColor}`}>
                   "It doesn't matter where I work now or where I work in the future, but it is always important to be satisfied with others."
                 </p>
                 <div className="flex items-center gap-5 mt-10">
                   <div className="w-10 h-[1px] bg-blue-600/20" />
                   <span className="font-simple text-[10px] font-black uppercase tracking-[0.6em] opacity-40">Core Philosophy</span>
                   <div className="w-10 h-[1px] bg-blue-600/20" />
                 </div>
              </div>

              {/* FINAL SIGNATURE LOGO - Smaller and balanced capitalization */}
              <div className="pt-20 pb-16">
                <div className="flex flex-col items-center justify-center gap-6">
                  <div className="flex flex-col items-center text-center">
                    {/* Updated to Barakat Qurtas with capitalized B and Q as requested */}
                    <span className="font-liana text-5xl md:text-6xl text-blue-600 leading-none tracking-tight">Barakat Qurtas</span>
                    <div className="h-[1px] w-12 bg-blue-600/30 mt-4 rounded-full" />
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <p className={`font-simple text-[10px] md:text-[11px] font-black uppercase tracking-[0.6em] ${textColor}`}>Graphic Designer</p>
                    <div className="flex items-center gap-2 text-blue-600/50">
                      <MapPin size={12} />
                      <span className="font-simple text-[8px] font-bold uppercase tracking-[0.3em]">Erbil - Kurdistan Region, Iraq</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer theme={theme} setActiveRoom={(room) => {
         const root = document.getElementById('root');
         if (root) root.scrollTo({ top: 0, behavior: 'smooth' });
         onBack();
      }} />
    </motion.div>
  );
};

export default AboutRoom;
