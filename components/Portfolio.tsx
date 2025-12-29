
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, 
  Share2, 
  BookOpen, 
  Fingerprint, 
  Mic2, 
  Play, 
  Camera,
  X,
  Plus
} from 'lucide-react';
import { Theme, PortfolioItem } from '../types';

/**
 * ==========================================
 * HOW TO ADD NEW DESIGNS:
 * 1. Upload your image to ImgBB or any hosting service.
 * 2. Copy the "Direct Link" (ending in .jpg or .png).
 * 3. Add a new object to the list below:
 *    { id: 'unique-id', category: 'Category Name', title: 'Work Title', image: 'URL' }
 * ==========================================
 */
const MY_WORKS: PortfolioItem[] = [
  // --- GENERAL DESIGN ---
  { id: 'g1', category: 'General Design', title: 'Luxury Branding', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800' },
  { id: 'g2', category: 'General Design', title: 'Corporate Identity', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800' },
  
  // --- SOCIAL MEDIA ---
  { id: 's1', category: 'Social Media', title: 'Instagram Campaign', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800' },
  { id: 's2', category: 'Social Media', title: 'Facebook Ad series', image: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=800' },
  
  // --- BOOK COVERS ---
  { id: 'b1', category: 'Book Covers', title: 'The Modern Art', image: 'https://images.unsplash.com/photo-1543004629-ff569587282c?q=80&w=800' },
  { id: 'b2', category: 'Book Covers', title: 'Minimalist Poetry', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800' },
  
  // --- LOGOS ---
  { id: 'l1', category: 'Logo', title: 'Tech StartUp', image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde3?q=80&w=800' },
  { id: 'l2', category: 'Logo', title: 'Fashion House', image: 'https://images.unsplash.com/photo-1583315805160-50346c483a90?q=80&w=800' },
];

const TOP_CATEGORIES = [
  { name: 'General Design', icon: <Layout size={18} /> },
  { name: 'Social Media', icon: <Share2 size={18} /> },
  { name: 'Book Covers', icon: <BookOpen size={18} /> },
  { name: 'Logo', icon: <Fingerprint size={18} /> },
];

const BOTTOM_CATEGORIES = [
  { name: 'Events & Conference', icon: <Mic2 size={18} /> },
  { name: 'Video', icon: <Play size={18} /> },
  { name: 'Image', icon: <Camera size={18} /> },
];

interface PortfolioProps { theme: Theme; }

const Portfolio: React.FC<PortfolioProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState('General Design');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const isDark = theme === Theme.DARK;

  // Filter items based on the active category
  const filteredItems = useMemo(() => {
    return MY_WORKS.filter(item => item.category === activeTab);
  }, [activeTab]);

  const displayedItems = filteredItems.slice(0, visibleCount);
  const hasMore = filteredItems.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  const renderTab = (cat: { name: string, icon: React.ReactNode }) => {
    const isActive = activeTab === cat.name;
    const isHovered = hoveredTab === cat.name;

    return (
      <button
        key={cat.name}
        onClick={() => {
          setActiveTab(cat.name);
          setVisibleCount(12);
        }}
        onMouseEnter={() => setHoveredTab(cat.name)}
        onMouseLeave={() => setHoveredTab(null)}
        className="relative flex items-center gap-3 px-6 md:px-8 py-4 transition-all duration-500 group outline-none overflow-visible"
      >
        <AnimatePresence>
          {(isHovered && !isActive) && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 z-0 pointer-events-none"
            >
              <div className="absolute inset-1 rounded-[18px] shadow-[0_0_30px_rgba(37,99,235,0.12)]" />
            </motion.div>
          )}

          {isActive && (
            <motion.div 
              layoutId="activeTabPill"
              className="absolute inset-0 z-10 pointer-events-none"
            >
              <div className="absolute inset-0 bg-blue-600 rounded-[18px] shadow-lg shadow-blue-600/20" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`relative z-20 flex items-center gap-3 transition-all duration-500 ${isActive || isHovered ? 'scale-105' : 'scale-100'}`}>
          <div className={`transition-all duration-500 ${isActive ? 'text-white' : isHovered ? 'text-blue-500' : isDark ? 'text-slate-700' : 'text-slate-400'}`}>
            {cat.icon}
          </div>
          <span className={`font-simple text-[10px] md:text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-500 ${isActive ? 'text-white' : isHovered ? 'text-blue-200' : 'opacity-30 text-slate-500'}`}>
            {cat.name}
          </span>
        </div>
      </button>
    );
  };

  return (
    <section id="design" className="relative transition-all duration-1000 bg-transparent">
      <div className="container mx-auto max-w-7xl relative z-10 px-6 pt-24 pb-12">
        
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            className="font-simple text-[9px] tracking-[1.2em] uppercase font-black mb-4"
          >
            Showcase
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-arch text-5xl md:text-7xl font-black uppercase tracking-tight leading-none"
          >
            WORKS
          </motion.h2>
          <div className="w-12 h-[2px] bg-blue-600 mx-auto mt-8 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
        </div>

        {/* NAVIGATION TABS SPLIT INTO TWO ROWS */}
        <div className="flex flex-col items-center gap-4 mb-16">
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3">
            {TOP_CATEGORIES.map(renderTab)}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3">
            {BOTTOM_CATEGORIES.map(renderTab)}
          </div>
        </div>
      </div>

      <div className="w-full px-2 md:px-10 pb-1">
        {filteredItems.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {displayedItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedImage(item)}
                  className={`break-inside-avoid relative group overflow-hidden rounded-[24px] cursor-pointer transition-all duration-700 ${
                    isDark ? 'bg-slate-900' : 'bg-white shadow-lg shadow-blue-900/5'
                  }`}
                >
                  <img 
                    src={item.image} 
                    alt={item.title || item.category} 
                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                  />
                  
                  {/* Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                    <p className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-400 mb-1">{item.category}</p>
                    <h4 className="text-white font-simple text-sm font-bold tracking-wide">{item.title}</h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="font-simple text-[10px] uppercase tracking-[0.5em] opacity-20">No designs uploaded in this category yet</p>
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center mt-12 mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              className={`flex items-center gap-4 px-10 py-5 rounded-2xl border font-simple text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 ${
                isDark 
                ? 'border-white/10 text-white hover:bg-white hover:text-black' 
                : 'border-slate-900/10 text-slate-900 hover:bg-slate-900 hover:text-white'
              }`}
            >
              Load More Masterpieces <Plus size={14} />
            </motion.button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/98 backdrop-blur-3xl p-4 md:p-12"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 z-[1010] w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-blue-600 transition-all duration-500"
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative max-w-7xl w-full max-h-full flex flex-col items-center justify-center gap-6"
            >
              <img 
                src={selectedImage.image} 
                alt="Selected Design"
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="text-center">
                <p className="font-simple text-[10px] font-black uppercase tracking-[0.6em] text-blue-500 mb-2">{selectedImage.category}</p>
                <h3 className="text-white font-simple text-2xl font-black uppercase tracking-tight">{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
