
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme, PortfolioItem } from '../types';

const PORTFOLIO_DATA: PortfolioItem[] = [
  { id: '1', category: 'General Design', title: 'Corporate Identity', image: 'https://picsum.photos/id/201/600/800' },
  { id: '2', category: 'Social Media', title: 'Viral Post Design', image: 'https://picsum.photos/id/202/600/600' },
  { id: '3', category: 'Book Covers', title: 'Novel Concept', image: 'https://picsum.photos/id/203/600/900' },
  { id: '4', category: 'Logo', title: 'Tech Startup', image: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png', isLogo: true },
  { id: '5', category: 'Events & Conference', title: 'Expo 2024', image: 'https://picsum.photos/id/204/800/600' },
  { id: '6', category: 'Video', title: 'Motion Graphics', image: 'https://picsum.photos/id/206/800/450' },
  { id: '7', category: 'Logo', title: 'Organic Brand', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968322.png', isLogo: true },
  { id: '8', category: 'Image', title: 'Portrait Retouch', image: 'https://picsum.photos/id/208/600/600' },
];

const CATEGORIES = [
  'General Design',
  'Social Media',
  'Book Covers',
  'Logo',
  'Events & Conference',
  'Video',
  'Image'
];

interface PortfolioProps {
  theme: Theme;
}

const Portfolio: React.FC<PortfolioProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState('General Design');
  const filteredItems = PORTFOLIO_DATA.filter(item => item.category === activeTab);

  const activeBtnStyle = theme === Theme.DARK 
    ? 'bg-blue-400 text-slate-900 shadow-[0_0_30px_rgba(147,197,253,0.3)]' 
    : 'bg-blue-600 text-white shadow-[0_15px_30px_rgba(37,99,235,0.25)]';

  return (
    <section id="design" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className={`font-simple text-[9px] tracking-[0.6em] uppercase font-black mb-3 ${theme === Theme.DARK ? 'text-blue-400/40' : 'text-blue-600/30'}`}>Portfolio</p>
          <h2 className="font-simple text-4xl md:text-5xl font-black uppercase tracking-tight opacity-90">Selected Works</h2>
          <div className="w-8 h-[1px] bg-blue-500/20 mx-auto mt-4" />
        </div>

        {/* Tabs - Wrapped Layout to Prevent Clipping & Ensure Balance */}
        <div className="flex justify-center mb-16">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl p-2">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveTab(cat)}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  boxShadow: theme === Theme.DARK 
                    ? "0 10px 25px rgba(59, 130, 246, 0.2)" 
                    : "0 15px 30px rgba(37, 99, 235, 0.15)"
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-7 py-3 rounded-2xl font-simple text-[9px] font-black tracking-[0.2em] uppercase transition-all duration-500 border ${
                  activeTab === cat 
                    ? activeBtnStyle + ' border-transparent' 
                    : `border-transparent ${theme === Theme.DARK ? 'text-slate-500 hover:text-blue-300' : 'text-slate-400 hover:text-blue-600'}`
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                // Fixed easing array type
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
                className={`relative group overflow-hidden rounded-[45px] transition-all duration-700 ${
                  item.isLogo 
                    ? `flex items-center justify-center p-16 h-[380px] ${theme === Theme.DARK ? 'bg-slate-900/30 border border-slate-800/40' : 'bg-white border border-blue-50 shadow-sm'}` 
                    : 'h-[480px]'
                }`}
              >
                {item.isLogo ? (
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className={`p-10 rounded-[35px] flex items-center justify-center transition-all duration-700 ${theme === Theme.DARK ? 'bg-slate-800/40' : 'bg-slate-50'}`}
                  >
                    <img src={item.image} alt={item.title} className="max-w-[110px] max-h-[110px] object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </motion.div>
                ) : (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-10 flex flex-col justify-end backdrop-blur-[2px]">
                  <p className="font-simple text-blue-400 text-[8px] font-black tracking-[0.4em] uppercase mb-2">{item.category}</p>
                  <h3 className="text-white text-2xl font-simple font-bold tracking-tighter leading-none">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
