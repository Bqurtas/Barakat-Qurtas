
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, MapPin, Phone, Mail, Instagram, Linkedin, Twitter, Facebook, Youtube } from 'lucide-react';
import { Theme } from '../types';

interface ContactRoomProps {
  theme: Theme;
  onBack: () => void;
}

const ContactRoom: React.FC<ContactRoomProps> = ({ theme, onBack }) => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });

  const textColor = theme === Theme.DARK ? 'text-slate-100' : 'text-slate-900';
  const subTextColor = theme === Theme.DARK ? 'text-slate-500' : 'text-slate-400';
  const inputBg = theme === Theme.DARK ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-blue-50';

  const socialLinks = [
    { icon: <Instagram size={18} />, url: 'https://instagram.com/Bqurtas' },
    { icon: <Linkedin size={18} />, url: 'https://linkedin.com/in/Bqurtas' },
    { icon: <Twitter size={18} />, url: 'https://twitter.com/Bqurtas' },
    { icon: <Facebook size={18} />, url: 'https://facebook.com/Bqurtas' },
    { icon: <Youtube size={18} />, url: 'https://youtube.com/@Bqurtas' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen pt-32 pb-20 px-6 relative z-10`}
    >
      <div className="container mx-auto max-w-6xl">
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
          <span className="font-simple text-[10px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">Back to Work</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* LEFT: Information */}
          <div className="space-y-12">
            <div>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-simple text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8"
              >
                Let's Build <br /> <span className="text-blue-600 italic font-liana tracking-normal capitalize">Legacy</span>
              </h1>
              <p className={`font-simple text-base md:text-lg ${subTextColor} max-w-md`}>
                Whether it's a presidential brand or a startup identity, every project is a masterpiece waiting to happen.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-simple text-[8px] font-black uppercase tracking-[0.4em] opacity-30">Location</p>
                  <p className={`font-simple text-sm font-bold ${textColor}`}>Erbil, Kurdistan Region - Iraq</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="font-simple text-[8px] font-black uppercase tracking-[0.4em] opacity-30">Inquiry</p>
                  <p className={`font-simple text-sm font-bold ${textColor}`}>contact@bqurtas.com</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <p className="font-simple text-[9px] font-black uppercase tracking-[0.6em] opacity-20 mb-6">Social Landscape</p>
              <div className="flex gap-4">
                {socialLinks.map((link, idx) => (
                  <motion.a 
                    key={idx}
                    href={link.url}
                    whileHover={{ y: -5, scale: 1.1, backgroundColor: '#2563eb', color: '#fff' }}
                    className={`w-12 h-12 rounded-2xl border ${theme === Theme.DARK ? 'border-slate-800 text-slate-400' : 'border-blue-50 text-blue-900'} flex items-center justify-center transition-all`}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: High-End Form */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={`p-10 md:p-14 rounded-[50px] border shadow-2xl relative overflow-hidden ${
              theme === Theme.DARK ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-blue-50 shadow-blue-900/5'
            }`}
          >
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-simple text-[9px] font-black uppercase tracking-[0.3em] opacity-40 ml-2">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className={`w-full px-6 py-4 rounded-2xl font-simple text-xs outline-none transition-all focus:ring-2 focus:ring-blue-600/20 border ${inputBg}`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-simple text-[9px] font-black uppercase tracking-[0.3em] opacity-40 ml-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className={`w-full px-6 py-4 rounded-2xl font-simple text-xs outline-none transition-all focus:ring-2 focus:ring-blue-600/20 border ${inputBg}`}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-simple text-[9px] font-black uppercase tracking-[0.3em] opacity-40 ml-2">Subject</label>
                <input 
                  type="text" 
                  placeholder="Brand Identity Project"
                  className={`w-full px-6 py-4 rounded-2xl font-simple text-xs outline-none transition-all focus:ring-2 focus:ring-blue-600/20 border ${inputBg}`}
                />
              </div>
              <div className="space-y-2">
                <label className="font-simple text-[9px] font-black uppercase tracking-[0.3em] opacity-40 ml-2">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell me about your vision..."
                  className={`w-full px-6 py-4 rounded-2xl font-simple text-xs outline-none transition-all focus:ring-2 focus:ring-blue-600/20 border resize-none ${inputBg}`}
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.2)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-simple text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3"
              >
                Send Message <Send size={14} />
              </motion.button>
            </form>

            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactRoom;
