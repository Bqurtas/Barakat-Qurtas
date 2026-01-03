import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, 
  Share2, 
  BookOpen, 
  Fingerprint, 
  Mic2, 
  Play, 
  Camera,
  Plus,
  Minus,
  FileText,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Theme, PortfolioItem } from '../types';
import { MY_WORKS_DATA } from '../worksData';

const TOP_CATEGORIES = [
  { name: 'General Design', icon: <Layout size={18} /> },
  { name: 'Social Media', icon: <Share2 size={18} /> },
  { name: 'Book Covers', icon: <BookOpen size={18} /> },
  { name: 'Logo', icon: <Fingerprint size={18} /> },
  { name: 'Posters', icon: <FileText size={18} /> },
];

const BOTTOM_CATEGORIES = [
  { name: 'Events & Conference', icon: <Mic2 size={18} /> },
  { name: 'Video', icon: <Play size={18} /> },
  { name: 'Image', icon: <Camera size={18} /> },
];

const ALL_CAT_NAMES = [...TOP_CATEGORIES, ...BOTTOM_CATEGORIES].map(c => c.name);

interface PortfolioProps { theme: Theme; }

const Portfolio: React.FC<PortfolioProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState('General Design');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const isDark = theme === Theme.DARK;

  // Global cache of preloaded Image objects to keep them in browser memory
  const preloadCache = useRef<Record<string, HTMLImageElement[]>>({});

  // Rocket Speed: Aggressive Pre-warming on mount
  useEffect(() => {
    const warmup = () => {
      ALL_CAT_NAMES.forEach(cat => {
        if (!preloadCache.current[cat]) {
          const itemsToWarm = MY_WORKS_DATA.filter(item => item.category === cat).slice(0, 15);
          preloadCache.current[cat] = itemsToWarm.map(item => {
            const img = new Image();
            img.src = item.image;
            img.fetchPriority = 'high';
            if (img.decode) img.decode().catch(() => {}); 
            return img;
          });
        }
      });
    };
    
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(warmup);
    } else {
      setTimeout(warmup, 50);
    }
  }, []);

  const filteredItems = useMemo(() => {
    return MY_WORKS_DATA.filter(item => item.category === activeTab);
  }, [activeTab]);

  const displayedItems = filteredItems.slice(0, visibleCount);
  const hasMore = filteredItems.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const handleShowLess = () => {
    setVisibleCount(12);
    const element = document.getElementById('design');
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + (document.getElementById('root')?.scrollTop || 0) - headerOffset;
      
      document.getElementById('root')?.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
    const root = document.getElementById('root');
    if (root) {
      root.style.overflow = 'hidden';
      root.style.touchAction = 'none';
    }
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';
    const root = document.getElementById('root');
    if (root) {
      root.style.overflowY = 'scroll';
      root.style.touchAction = 'auto';
    }
  };

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(1);
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
    }
  }, [selectedIndex, filteredItems.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(-1);
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
    }
  }, [selectedIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, nextImage, prevImage]);

  const selectedWork = selectedIndex !== null ? filteredItems[selectedIndex] : null;

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
        className="relative flex items-center gap-3 px-6 py-3.5 transition-all duration-300 group outline-none overflow-visible rounded-full"
      >
        <AnimatePresence>
          {(isHovered && !isActive) && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="absolute inset-0 z-0 pointer-events-none rounded-full shadow-[0_0_30px_rgba(93,103,232,0.3)]"
            />
          )}

          {isActive && (
            <motion.div 
              layoutId="activeTabPill"
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="absolute inset-0 z-10 pointer-events-none"
            >
              <div className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_10px_25px_rgba(93,103,232,0.4)]" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`relative z-20 flex items-center gap-2.5 transition-transform duration-300 ${isActive || isHovered ? 'scale-105' : 'scale-100'}`}>
          <div className={`transition-colors duration-300 ${isActive ? 'text-white' : isHovered ? 'text-blue-500' : isDark ? 'text-slate-700' : 'text-slate-400'}`}>
            {React.cloneElement(cat.icon as React.ReactElement, { size: 16 })}
          </div>
          <span className={`font-simple text-[8px] md:text-[9px] font-black uppercase tracking-0.2em transition-colors duration-300 ${isActive ? 'text-white' : isHovered ? (isDark ? 'text-blue-100' : 'text-blue-600') : 'opacity-20 text-slate-500'}`}>
            {cat.name}
          </span>
        </div>
      </button>
    );
  };

  return (
    <section id="design" className="relative pt-32 pb-24">
      <AnimatePresence>
        {selectedWork && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[2000] bg-[#000000] flex flex-col items-center overflow-hidden"
            onClick={closeLightbox}
          >
            <div className="w-full h-32 md:h-40 flex items-center justify-between px-8 md:px-12 pointer-events-none z-[2050]">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-3xl border border-white/10 px-6 py-2 rounded-full pointer-events-auto flex items-center gap-4"
              >
                 <span className="font-simple text-[9px] font-black uppercase tracking-0.4em text-blue-500">{selectedWork.category}</span>
                 <div className="w-[1px] h-3 bg-white/10" />
                 <span className="font-simple text-[9px] font-black uppercase tracking-0.4em text-white/30">{(selectedIndex || 0) + 1} / {filteredItems.length}</span>
              </motion.div>

              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                className="w-12 h-12 rounded-full bg-white/5 text-white flex items-center justify-center transition-all pointer-events-auto border border-white/10 backdrop-blur-xl"
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              >
                <X size={22} />
              </motion.button>
            </div>

            <div className="absolute inset-x-6 md:inset-x-12 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-[2040]">
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 md:w-24 md:h-24 rounded-full text-white/20 hover:text-white flex items-center justify-center pointer-events-auto transition-all"
                onClick={prevImage}
              >
                <ChevronLeft size={48} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 md:w-24 md:h-24 rounded-full text-white/20 hover:text-white flex items-center justify-center pointer-events-auto transition-all"
                onClick={nextImage}
              >
                <ChevronRight size={48} />
              </motion.button>
            </div>
            
            <div className="flex-grow w-full flex items-center justify-center pointer-events-none p-6 md:p-12 pb-24">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div 
                  key={selectedWork.id}
                  custom={direction}
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                  className="relative flex flex-col items-center justify-center pointer-events-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img 
                    src={selectedWork.image} 
                    alt={selectedWork.title} 
                    className="max-w-[85vw] max-h-[75vh] object-contain rounded-sm shadow-[0_50px_100px_rgba(0,0,0,1)] select-none pointer-events-none rocket-img"
                    draggable="false"
                    decoding="sync"
                    fetchpriority="high"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto max-w-7xl relative z-10 px-6 pb-12">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 0.2, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="font-simple tracking-[0.8em] uppercase text-[8px] font-black mb-3"
          >
            Exhibition
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-simple text-3xl md:text-5xl font-black uppercase tracking-tight"
          >
            The Designs
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="h-[2px] bg-blue-600/30 mx-auto mt-6 rounded-full" 
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-3 mb-16"
        >
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">{TOP_CATEGORIES.map(renderTab)}</div>
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">{BOTTOM_CATEGORIES.map(renderTab)}</div>
        </motion.div>
      </div>

      <div className="w-full px-6 md:px-16 pb-12">
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className={`
              ${activeTab === 'Logo' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 justify-items-center' : 
                activeTab === 'Book Covers' ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-20 perspective-[2000px]' : 
                'columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4'}
            `}
            style={{ willChange: 'transform, opacity' }}
          >
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout="position"
                viewport={{ once: true }}
                onClick={() => openLightbox(index)}
                className={`
                  relative group cursor-pointer transition-all duration-300 will-change-transform w-full
                  ${activeTab === 'Logo' ? 'aspect-square flex items-center justify-center p-2 bg-transparent' : 
                    activeTab === 'Book Covers' ? 'flex flex-col items-center' :
                    (isDark ? 'bg-slate-900 border border-white/5 shadow-xl hover:shadow-blue-500/10 rounded-[12px] overflow-hidden' : 'bg-white shadow-lg shadow-blue-900/[0.03] hover:shadow-blue-500/15 rounded-[12px] overflow-hidden')}
                  `
                }
              >
                {activeTab === 'Book Covers' ? (
                  <div className="relative w-full flex flex-col items-center group/book">
                    <div className="relative preserve-3d transition-transform duration-500 rotate-y-[-25deg] group-hover/book:rotate-y-[-15deg] group-hover/book:scale-105">
                       <div className="absolute -bottom-6 left-[-10%] w-[120%] h-8 bg-black/40 blur-xl rounded-full transform rotate-x-[90deg] opacity-60 transition-opacity" />
                       <div className="relative z-10 w-full aspect-[2/3] overflow-hidden rounded-r-[4px] shadow-[20px_20px_40px_rgba(0,0,0,0.6)] bg-slate-800 border-l-[3px] border-black/40">
                         <img 
                          src={item.image} 
                          alt={item.title} 
                          fetchpriority={index < 8 ? "high" : "auto"}
                          decoding="sync"
                          className="w-full h-full object-cover rocket-img"
                         />
                         <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 opacity-40 pointer-events-none" />
                       </div>
                    </div>
                    <div className="absolute -bottom-10 w-[140%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent z-0" />
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 z-40 bg-transparent" onContextMenu={(e) => e.preventDefault()} />
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      draggable="false"
                      fetchpriority={index < 12 ? "high" : "auto"}
                      decoding="sync"
                      className={`${activeTab === 'Logo' ? 'w-full h-full object-contain p-2' : 'w-full h-auto object-cover'} transition-transform duration-500 group-hover:scale-105 pointer-events-none rocket-img`} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-50">
                       <div className="flex items-center justify-between gap-2">
                         <motion.h4 className="text-white font-simple text-[8px] font-black uppercase tracking-widest truncate">
                           {item.title || 'View Work'}
                         </motion.h4>
                         <Maximize2 size={10} className="text-white/60" />
                       </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-20">
          {hasMore ? (
            <motion.button
              onClick={handleLoadMore}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.05, backgroundColor: '#2563eb', color: '#fff' }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-4 px-10 py-5 rounded-[18px] border font-simple text-[10px] font-black uppercase tracking-0.4em transition-all duration-300 ${isDark ? 'border-white/10 text-white/40 hover:border-transparent' : 'border-slate-900/10 text-slate-900/40 hover:border-transparent'}`}
            >
              Load More <Plus size={16} />
            </motion.button>
          ) : filteredItems.length > 12 && (
            <motion.button
              onClick={handleShowLess}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05, backgroundColor: '#5D67E8', color: '#fff' }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-4 px-10 py-5 rounded-[18px] border font-simple text-[10px] font-black uppercase tracking-0.4em transition-all duration-300 ${isDark ? 'border-white/10 text-white/40 hover:border-transparent' : 'border-slate-900/10 text-slate-900/40 hover:border-transparent'}`}
            >
              Show Less <Minus size={16} />
            </motion.button>
          )}
        </div>
      </div>

      <style>{`
        .perspective-[2000px] { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .rotate-y-[-25deg] { transform: rotateY(-25deg); }
        .rotate-y-[-15deg] { transform: rotateY(-15deg); }
        .rotate-y-[-90deg] { transform: rotateY(-90deg); }
        .rotate-x-[90deg] { transform: rotateX(90deg); }
      `}</style>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
    </section>
  );
};

export default Portfolio;