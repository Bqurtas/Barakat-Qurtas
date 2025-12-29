
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Mail, Phone, ArrowUpRight, Youtube, Facebook, Twitter } from 'lucide-react';
import { Theme } from '../types';

interface FooterProps {
  theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const socialLinks = [
    { icon: <Instagram size={18} />, url: 'https://instagram.com/Bqurtas' },
    { icon: <Linkedin size={18} />, url: 'https://linkedin.com/in/Bqurtas' },
    { icon: <Twitter size={18} />, url: 'https://twitter.com/Bqurtas' },
    { icon: <Facebook size={18} />, url: 'https://facebook.com/Bqurtas' },
    { icon: <Youtube size={18} />, url: 'https://youtube.com/@Bqurtas' },
  ];

  const bgColor = theme === Theme.DARK ? 'bg-[#0a0f14]' : 'bg-[#f8fafc]';
  const borderColor = theme === Theme.DARK ? 'border-slate-800/60' : 'border-blue-100/80';

  return (
    <footer id="contact" className={`relative pt-32 pb-12 overflow-hidden transition-colors duration-1000 ${bgColor}`}>
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col gap-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="font-simple text-[9px] font-black tracking-[0.6em] uppercase text-blue-500 mb-6">Inquiries</p>
              <h2 className="font-simple text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-10">
                Crafting <span className="italic font-liana text-blue-600 capitalize tracking-normal">Extraordinary</span> <br /> Identities
              </h2>
              
              <div className="space-y-6 pt-4">
                <a href="mailto:contact@bqurtas.com" className="group flex items-center gap-6 w-fit">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border ${borderColor} group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent`}>
                    <Mail size={18} />
                  </div>
                  <p className="font-simple text-sm font-bold tracking-wider">contact@bqurtas.com</p>
                </a>
                <a href="tel:+964700000000" className="group flex items-center gap-6 w-fit">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border ${borderColor} group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent`}>
                    <Phone size={18} />
                  </div>
                  <p className="font-simple text-sm font-bold tracking-wider">+964 7XX XXX XXXX</p>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-8">
                <h4 className="font-simple text-[9px] font-black uppercase tracking-[0.5em] opacity-30">Navigate</h4>
                <ul className="space-y-4">
                  {['Design', 'About', 'Contact'].map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase()}`} className="font-simple text-xs font-bold hover:text-blue-600 transition-colors flex items-center gap-2 group">
                        {item} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-8">
                <h4 className="font-simple text-[9px] font-black uppercase tracking-[0.5em] opacity-30">Socials</h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link, idx) => (
                    <motion.a 
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className={`w-10 h-10 rounded-xl border ${borderColor} flex items-center justify-center transition-all hover:bg-blue-600 hover:text-white hover:border-transparent`}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`pt-12 border-t ${borderColor} flex flex-col md:flex-row items-center justify-between gap-10`}>
            <div className="flex items-center gap-6">
               <h3 className="font-liana text-4xl text-blue-600">Barakat Qurtas</h3>
               <div className={`h-8 w-[1px] ${borderColor}`} />
               <p className="font-simple text-[8px] font-black tracking-[0.3em] uppercase opacity-30">Visual Architect</p>
            </div>
            <p className="font-simple text-[9px] font-black tracking-[0.2em] uppercase opacity-20">
              &copy; {new Date().getFullYear()} @Bqurtas. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
