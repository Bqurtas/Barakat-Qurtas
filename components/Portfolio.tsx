
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme, PortfolioItem } from '../types';

const PORTFOLIO_DATA: PortfolioItem[] = [
  // General Design
  { id: 'g1', category: 'General Design', title: 'Luxury Branding', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800' },
  { id: 'g2', category: 'General Design', title: 'Corporate Identity', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800' },
  { id: 'g3', category: 'General Design', title: 'Minimalist Layout', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800' },
  // Social Media
  { id: 's1', category: 'Social Media', title: 'Campaign Visuals', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800' },
  { id: 's2', category: 'Social Media', title: 'Instagram Layout', image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=800' },
  { id: 's3', category: 'Social Media', title: 'Digital Ad Kit', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800' },
  // Book Covers
  { id: 'b1', category: 'Book Covers', title: 'Midnight Sun', image: 'https://images.unsplash.com/photo-1543004629-ff569587282c?q=80&w=800' },
  { id: 'b2', category: 'Book Covers', title: 'The Architect', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800' },
  { id: 'b3', category: 'Book Covers', title: 'Design Theory', image: 'https://images.unsplash.com/photo-1532012197367-e3d8c1c5e407?q=80&w=800' },
  // Logo
  { id: 'l1', category: 'Logo', title: 'Minimalist Tech', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968218.png', isLogo: true },
  { id: 'l2', category: 'Logo', title: 'Creative Studio', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968204.png', isLogo: true },
  { id: 'l3', category: 'Logo', title: 'Brand Mark', image: 'https://cdn-icons-png.flaticon.com/512/5968/5968313.png', isLogo: true },
  // Events
  { id: 'e1', category: 'Events & Conference', title: 'Digital Summit', image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=800' },
  { id: 'e2', category: 'Events & Conference', title: 'Tech Expo', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800' },
  // Video
  { id: 'v1', category: 'Video', title: 'Motion Opening', image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=800' },
  { id: 'v2', category: 'Video', title: 'Product Teaser', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800' },
  // Image
  { id: 'i1', category: 'Image', title: 'Studio Portrait', image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800' },
  { id: 'i2', category: 'Image', title: 'Street Photography', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800' },
];

const CATEGORIES = ['General Design', 'Social Media', 'Book Covers', 'Logo', 'Events & Conference', 'Video', 'Image'];

interface PortfolioProps { theme: Theme; }

const Portfolio: React.FC<PortfolioProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState('General Design');
  const filteredItems = PORTFOLIO_DATA.filter(item => item.category === activeTab);

  return (
    <section id="design" className="py-40 px-6 relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        
        <div className="text-center mb-32">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            className="font-simple text-[10px] tracking-[1.5em] uppercase font-black mb-6"
          >
            Portfolio
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-arch text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-none"
          >
            WORKS
          </motion.h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-10 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.6)]" />
        </div>

        <div className="flex justify-center mb-28">
          <div className={`flex flex-wrap justify-center items-center gap-2 p-2 rounded-full border transition-all duration-700 ${
            theme === Theme.DARK ? 'bg-slate-900/60 border-slate-800 shadow-2xl shadow-black/50' : 'bg-white border-blue-50 shadow-xl shadow-blue-900/5'
          }`}>
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveTab(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-8 py-3.5 rounded-full font-simple text-[9px] font-black tracking-[0.2em] uppercase transition-all duration-500 group ${
                  activeTab === cat 
                    ? 'text-white' 
                    : theme === Theme.DARK ? 'text-slate-500 hover:text-blue-300' : 'text-slate-400 hover:text-blue-600'
                }`}
              >
                <span className="relative z-10">{cat}</span>
                {activeTab === cat && (
                  <motion.div 
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-blue-600 rounded-full z-0 shadow-[0_5px_25px_rgba(37,99,235,0.5)]"
                    transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className={`relative group overflow-hidden rounded-[70px] border h-[540px] transition-all duration-1000 ${
                  theme === Theme.DARK ? 'border-slate-800 bg-slate-900/40' : 'border-blue-50 bg-white shadow-2xl'
                }`}
              >
                {item.isLogo ? (
                  <div className="w-full h-full flex items-center justify-center p-20">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className={`w-56 h-56 rounded-[80px] flex items-center justify-center transition-all duration-700 relative shadow-2xl ${
                        theme === Theme.DARK ? 'bg-slate-800' : 'bg-slate-50'
                      }`}
                    >
                      <img src={item.image} alt={item.title} className="w-32 h-32 object-contain grayscale group-hover:grayscale-0 transition-all duration-700 opacity-30 group-hover:opacity-100" />
                    </motion.div>
                  </div>
                ) : (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 p-14 flex flex-col justify-end backdrop-blur-[2px]">
                  <p className="font-simple text-blue-400 text-[9px] font-black tracking-[0.5em] uppercase mb-3">{item.category}</p>
                  <h3 className="text-white text-4xl font-simple font-bold tracking-tighter italic">{item.title}</h3>
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
