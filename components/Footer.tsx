
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

  // Changed from #05070a to a more polished, deep charcoal-navy
  const bgColor = theme === Theme.DARK ? 'bg-[#0b0e14]' : 'bg-[#f8fafc]';
  const textColor = theme === Theme.DARK ? 'text-slate-200' : 'text-slate-800';
  const subTextColor = theme === Theme.DARK ? 'text-slate-500' : 'text-slate-400';
  const borderColor = theme === Theme.DARK ? 'border-slate-800/40' : 'border-blue-100/60';

  return (
    <footer id="contact" className={`relative pt-32 pb-12 overflow-hidden transition-colors duration-1000 ${bgColor}`}>
      {/* Background Glow - More subtle and refined */}
      <div className={`absolute -top-64 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 blur-[180px] opacity-10 pointer-events-none rounded-full ${
        theme === Theme.DARK ? 'bg-blue-400/30' : 'bg-blue-600/10'
      }`} />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col gap-24">
          
          {/* Top Section: High-End Contact Call */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <p className="font-simple text-[9px] font-black tracking-[0.6em] uppercase text-blue-500 mb-6">Let's Connect</p>
                <h2 className="font-simple text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-10">
                  Designing the <br /> <span className="italic font-liana text-blue-600 capitalize tracking-normal">Extraordinary</span>
                </h2>
                <div className="w-12 h-[1px] bg-blue-600/40 rounded-full" />
              </motion.div>

              <div className="flex flex-col gap-8 pt-4">
                <a href="mailto:contact@bqurtas.com" className="group flex items-center gap-5 w-fit">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 border ${borderColor} group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_10px_30px_rgba(37,99,235,0.2)]`}>
                    <Mail size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className={`text-[8px] font-black uppercase tracking-[0.3em] opacity-30 mb-1 ${subTextColor}`}>Inquiry</p>
                    <p className="font-simple text-sm font-bold tracking-wider group-hover:text-blue-500 transition-colors">contact@bqurtas.com</p>
                  </div>
                </a>

                <a href="tel:+964700000000" className="group flex items-center gap-5 w-fit">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 border ${borderColor} group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_10px_30px_rgba(37,99,235,0.2)]`}>
                    <Phone size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className={`text-[8px] font-black uppercase tracking-[0.3em] opacity-30 mb-1 ${subTextColor}`}>Direct</p>
                    <p className="font-simple text-sm font-bold tracking-wider group-hover:text-blue-500 transition-colors">+964 7XX XXX XXXX</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Side: Quick Navigation & Socials */}
            <div className="grid grid-cols-2 gap-10 lg:pt-16">
              <div className="space-y-8">
                <h4 className="font-simple text-[9px] font-black uppercase tracking-[0.5em] opacity-40">Navigate</h4>
                <ul className="space-y-4">
                  {['Design', 'About', 'Contact'].map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase()}`} className="font-simple text-xs font-bold hover:text-blue-500 transition-colors tracking-[0.1em] flex items-center gap-2 group">
                        {item}
                        <ArrowUpRight size={12} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-blue-500" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-8">
                <h4 className="font-simple text-[9px] font-black uppercase tracking-[0.5em] opacity-40">Social Architecture</h4>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((link, idx) => (
                    <motion.a 
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -4, scale: 1.1 }}
                      className={`w-11 h-11 rounded-2xl border ${borderColor} flex items-center justify-center transition-all hover:bg-white hover:text-blue-600 hover:shadow-2xl hover:shadow-blue-600/15`}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Branding Section */}
          <div className={`pt-12 border-t ${borderColor} flex flex-col md:flex-row items-center justify-between gap-12`}>
            <div className="flex items-center gap-8">
               <h3 className={`font-liana text-3xl md:text-4xl text-blue-600 opacity-90`}>Bqurtas</h3>
               <div className={`h-8 w-[1px] ${borderColor} opacity-50`} />
               <p className={`text-[8px] font-black tracking-[0.4em] uppercase opacity-30 ${subTextColor}`}>
                 Visual Architect & Designer
               </p>
            </div>

            <div className="flex flex-col md:items-end gap-3">
              <p className={`text-[8px] font-black tracking-[0.25em] uppercase opacity-25 ${subTextColor}`}>
                &copy; {new Date().getFullYear()} Barakat Qurtas. Architectural Design.
              </p>
              <div className="flex gap-8">
                <a href="#" className="text-[7px] font-black tracking-[0.4em] uppercase opacity-20 hover:opacity-100 transition-opacity">Privacy Policy</a>
                <a href="#" className="text-[7px] font-black tracking-[0.4em] uppercase opacity-20 hover:opacity-100 transition-opacity">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
