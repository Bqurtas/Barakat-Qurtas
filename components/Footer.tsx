import React from 'react';
import { motion } from 'framer-motion';
import { 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  ArrowUpRight, 
  Youtube, 
  Facebook, 
  Twitter, 
  Palette, 
  Globe, 
  MessageCircle
} from 'lucide-react';
import { Theme } from '../types';

interface FooterProps {
  theme: Theme;
  setActiveRoom: (room: 'home' | 'about' | 'contact') => void;
}

const Footer: React.FC<FooterProps> = ({ theme, setActiveRoom }) => {
  const isDark = theme === Theme.DARK;
  const bgColor = isDark ? 'bg-[#0a0f14]' : 'bg-[#F0EFEB]';
  const borderColor = isDark ? 'border-slate-800/60' : 'border-blue-100/80';
  const textColor = isDark ? 'text-slate-100' : 'text-slate-900';
  const subTextColor = isDark ? 'text-slate-500' : 'text-slate-400';

  const socialLinks = [
    { icon: <Instagram size={18} />, url: 'https://instagram.com/Bqurtas' },
    { icon: <Linkedin size={18} />, url: 'https://linkedin.com/in/Bqurtas' },
    { icon: <Twitter size={18} />, url: 'https://twitter.com/Bqurtas' },
    { icon: <Facebook size={18} />, url: 'https://facebook.com/Bqurtas' },
    { icon: <Youtube size={18} />, url: 'https://youtube.com/@Bqurtas' },
    { icon: <Palette size={18} />, url: 'https://behance.net/Bqurtas' },
    { icon: <Globe size={18} />, url: 'https://dribbble.com/Bqurtas' },
    { icon: <MessageCircle size={18} />, url: 'https://wa.me/9647517884985' },
  ];

  const skills = [
    { name: 'Photoshop', percentage: 90, iconUrl: 'https://i.ibb.co/fzJpJPTP/5968572.png', color: 'bg-blue-500' },
    { name: 'InDesign', percentage: 80, iconUrl: 'https://i.ibb.co/zWYzBKqz/5968535.png', color: 'bg-blue-600' },
    { name: 'Illustrator', percentage: 75, iconUrl: 'https://i.ibb.co/HTzQFMSN/5968522.png', color: 'bg-blue-400' },
    { name: 'After Effects', percentage: 65, iconUrl: 'https://i.ibb.co/DD2sF81B/5968474.png', color: 'bg-indigo-500' },
  ];

  const navigateTo = (room: 'home' | 'about' | 'contact') => {
    setActiveRoom(room);
  };

  // Brand color filter (#5D67E8)
  const brandFilter = "brightness(0) saturate(100%) invert(43%) sepia(56%) saturate(3015%) hue-rotate(224deg) brightness(91%) contrast(100%)";

  return (
    <footer id="footer" className={`relative pt-32 pb-12 overflow-hidden transition-colors duration-1000 ${bgColor}`}>
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col gap-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column: Contact Inquiries */}
            <div>
              <p className="font-simple text-[9px] font-black tracking-[0.6em] uppercase text-blue-500 mb-6">Inquiries</p>
              <h2 className={`font-simple text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-10 ${textColor}`}>
                Connection
              </h2>
              
              <div className="space-y-6 pt-4">
                <a href="mailto:Bqurtas@gmail.com" className="group flex items-center gap-6 w-fit cursor-none">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border ${borderColor} group-hover:bg-blue-500 group-hover:text-white group-hover:border-transparent`}>
                    <Mail size={18} />
                  </div>
                  <p className={`font-simple text-sm font-bold tracking-wider ${textColor}`}>Bqurtas@gmail.com</p>
                </a>
                <a href="tel:009647517884985" className="group flex items-center gap-6 w-fit cursor-none">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border ${borderColor} group-hover:bg-blue-500 group-hover:text-white group-hover:border-transparent`}>
                    <Phone size={18} />
                  </div>
                  <p className={`font-simple text-sm font-bold tracking-wider ${textColor}`}>00964 751 788 49 85</p>
                </a>
              </div>
            </div>

            {/* Right Column: Combined Social, Nav, and Skills */}
            <div className="flex flex-col gap-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                {/* Social Landscape */}
                <div className="space-y-8">
                  <h4 className="font-simple text-[9px] font-black uppercase tracking-[0.5em] opacity-30">Social Landscape</h4>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {socialLinks.map((link, idx) => (
                      <motion.a 
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.1 }}
                        className={`w-10 h-10 rounded-xl border ${borderColor} flex items-center justify-center transition-all hover:bg-blue-500 hover:text-white hover:border-transparent cursor-none ${subTextColor}`}
                      >
                        {link.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Navigate */}
                <div className="space-y-8">
                  <h4 className="font-simple text-[9px] font-black uppercase tracking-[0.5em] opacity-30">Navigate</h4>
                  <ul className="flex flex-col gap-y-4">
                    {[
                      { name: 'Works', id: 'home' },
                      { name: 'About', id: 'about' },
                      { name: 'Contact', id: 'contact' }
                    ].map((item) => (
                      <li key={item.id}>
                        <button 
                          onClick={() => navigateTo(item.id as any)} 
                          className={`font-simple text-xs font-bold hover:text-blue-500 transition-colors flex items-center gap-2 group text-left cursor-none ${textColor}`}
                        >
                          {item.name} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical Mastery */}
              <div className="space-y-8">
                <h4 className="font-simple text-[9px] font-black uppercase tracking-[0.5em] opacity-30">Technical Mastery</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                  {skills.map((skill) => (
                    <div key={skill.name} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <img 
                            src={skill.iconUrl} 
                            alt={skill.name} 
                            style={{ filter: brandFilter, width: '16px', height: '16px' }} 
                            className="object-contain"
                          />
                          <span className={`font-simple text-[10px] font-bold tracking-wider uppercase ${textColor}`}>{skill.name}</span>
                        </div>
                        <span className="font-simple text-[9px] font-black text-blue-500/60">{skill.percentage}%</span>
                      </div>
                      <div className={`h-[2px] w-full rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-blue-900/5'}`}>
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                          className={`h-full ${skill.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Copyright and Logo Area */}
          <div className={`pt-12 border-t ${borderColor} flex flex-col md:flex-row items-center justify-between gap-10`}>
            <div className="flex items-center gap-6">
               <h3 className="font-liana text-5xl text-blue-500 cursor-pointer hover:scale-105 transition-transform" onClick={() => navigateTo('home')}>Bqurtas</h3>
               <div className={`h-8 w-[1px] ${borderColor}`} />
               <p className="font-simple text-[8px] font-black tracking-[0.3em] uppercase opacity-30">Graphic Designer</p>
            </div>
            <p className="font-simple text-[9px] font-black tracking-[0.2em] uppercase opacity-20">
              2026©Bqurtas. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;