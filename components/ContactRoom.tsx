
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, MapPin, Phone, Mail, Instagram, Linkedin, Twitter, Facebook, Youtube, Music, Palette, Globe, Ghost, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Theme } from '../types';
import Footer from './Footer';

interface ContactRoomProps {
  theme: Theme;
  onBack: () => void;
}

const ContactRoom: React.FC<ContactRoomProps> = ({ theme, onBack }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const textColor = theme === Theme.DARK ? 'text-slate-100' : 'text-slate-900';
  const subTextColor = theme === Theme.DARK ? 'text-slate-500' : 'text-slate-400';
  const inputBg = theme === Theme.DARK ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-blue-50';

  const socialLinks = [
    { icon: <Instagram size={18} />, url: 'https://instagram.com/Bqurtas' },
    { icon: <Linkedin size={18} />, url: 'https://linkedin.com/in/Bqurtas' },
    { icon: <Twitter size={18} />, url: 'https://twitter.com/Bqurtas' },
    { icon: <Facebook size={18} />, url: 'https://facebook.com/Bqurtas' },
    { icon: <Youtube size={18} />, url: 'https://youtube.com/@Bqurtas' },
    { icon: <Palette size={18} />, url: 'https://behance.net/Bqurtas' },
    { icon: <Globe size={18} />, url: 'https://dribbble.com/Bqurtas' },
    { icon: <Music size={18} />, url: 'https://tiktok.com/@Bqurtas' },
    { icon: <Ghost size={18} />, url: 'https://snapchat.com/add/Bqurtas' },
    { icon: <MessageCircle size={18} />, url: 'https://wa.me/9647517884985' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/mqkurqnz', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen relative z-10`}
    >
      <div className="container mx-auto max-w-6xl px-6 pt-32 pb-20">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-20">
          {/* LEFT: Information */}
          <div className="space-y-12">
            <div>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-simple text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8"
              >
                Let's Build <br /> <span className="text-blue-600 italic font-liana tracking-normal capitalize">Legacy</span>
              </motion.h1>
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
                  <p className={`font-simple text-sm font-bold ${textColor}`}>Erbil - Kurdistan Region, Iraq</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="font-simple text-[8px] font-black uppercase tracking-[0.4em] opacity-30">Inquiry</p>
                  <p className={`font-simple text-sm font-bold ${textColor}`}>Bqurtas@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="font-simple text-[8px] font-black uppercase tracking-[0.4em] opacity-30">Call Direct</p>
                  <p className={`font-simple text-sm font-bold ${textColor}`}>00964 751 788 49 85</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <p className="font-simple text-[9px] font-black uppercase tracking-[0.6em] opacity-20 mb-6">Full Social Landscape</p>
              <div className="flex flex-wrap gap-3 md:gap-4 max-w-md">
                {socialLinks.map((link, idx) => (
                  <motion.a 
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1, backgroundColor: '#2563eb', color: '#fff' }}
                    className={`w-12 h-12 rounded-2xl border ${theme === Theme.DARK ? 'border-slate-800 text-slate-400' : 'border-blue-50 text-blue-900'} flex items-center justify-center transition-all`}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: High-End Form / Success Message */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={`p-10 md:p-14 rounded-[50px] border shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-center ${
              theme === Theme.DARK ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-blue-50 shadow-blue-900/5'
            }`}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="w-24 h-24 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white shadow-[0_0_40px_rgba(37,99,235,0.4)]"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                  <div className="space-y-2">
                    <h2 className={`font-simple text-3xl font-black uppercase tracking-tight ${textColor}`}>Message Sent</h2>
                    <p className={`font-simple text-sm ${subTextColor}`}>
                      Thank you, Barakat. Your vision has been received. <br /> I will get back to you shortly.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStatus('idle')}
                    className="px-8 py-3 rounded-xl border border-blue-600/20 font-simple text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    Send Another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6 relative z-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-simple text-[9px] font-black uppercase tracking-[0.3em] opacity-40 ml-2">Your Name</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="John Doe"
                        className={`w-full px-6 py-4 rounded-2xl font-simple text-xs outline-none transition-all focus:ring-2 focus:ring-blue-600/20 border ${inputBg}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-simple text-[9px] font-black uppercase tracking-[0.3em] opacity-40 ml-2">Email Address</label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="john@example.com"
                        className={`w-full px-6 py-4 rounded-2xl font-simple text-xs outline-none transition-all focus:ring-2 focus:ring-blue-600/20 border ${inputBg}`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-simple text-[9px] font-black uppercase tracking-[0.3em] opacity-40 ml-2">Subject</label>
                    <input 
                      required
                      name="subject"
                      type="text" 
                      placeholder="Brand Identity Project"
                      className={`w-full px-6 py-4 rounded-2xl font-simple text-xs outline-none transition-all focus:ring-2 focus:ring-blue-600/20 border ${inputBg}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-simple text-[9px] font-black uppercase tracking-[0.3em] opacity-40 ml-2">Message</label>
                    <textarea 
                      required
                      name="message"
                      rows={4}
                      placeholder="Tell me about your vision..."
                      className={`w-full px-6 py-4 rounded-2xl font-simple text-xs outline-none transition-all focus:ring-2 focus:ring-blue-600/20 border resize-none ${inputBg}`}
                    />
                  </div>
                  
                  <motion.button
                    disabled={status === 'submitting'}
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(37, 99, 235, 0.2)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-blue-600 text-white rounded-2xl font-simple text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>Processing <Loader2 size={14} className="animate-spin" /></>
                    ) : (
                      <>Send Message <Send size={14} /></>
                    )}
                  </motion.button>

                  {status === 'error' && (
                    <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest mt-4">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>

      <Footer theme={theme} setActiveRoom={onBack} />
    </motion.div>
  );
};

export default ContactRoom;
