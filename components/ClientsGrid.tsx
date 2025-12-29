
import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface ClientsGridProps {
  theme: Theme;
}

const ClientsGrid: React.FC<ClientsGridProps> = ({ theme }) => {
  // 18 distinct high-quality placeholder logos
  const clients = Array.from({ length: 18 }).map((_, i) => {
    const iconIds = [204, 218, 313, 322, 213, 242, 215, 230, 245, 250, 260, 270, 280, 290, 300, 310, 320, 330];
    return {
      id: i,
      name: `Partner ${i + 1}`,
      logo: `https://cdn-icons-png.flaticon.com/512/5968/5968${iconIds[i] || 204}.png`
    };
  });

  const sectionTitleColor = theme === Theme.DARK ? 'text-blue-400/50' : 'text-blue-600/40';
  const headingColor = theme === Theme.DARK ? 'text-slate-100' : 'text-slate-900';

  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-simple tracking-[1em] uppercase text-[9px] font-black mb-4 ${sectionTitleColor}`}
          >
            Trust
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`font-simple text-4xl md:text-5xl font-black uppercase tracking-tight ${headingColor}`}
          >
            Strategic Partners
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true }}
            className="h-[2px] bg-blue-600/30 mx-auto mt-6 rounded-full" 
          />
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {clients.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 6) * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
              viewport={{ once: true }}
              className={`aspect-square rounded-[40px] flex items-center justify-center p-8 transition-all duration-700 border group relative overflow-hidden ${
                theme === Theme.DARK 
                  ? 'bg-slate-900/40 border-slate-800/60 hover:border-blue-500/30' 
                  : 'bg-white border-blue-100/60 hover:border-blue-200 shadow-sm hover:shadow-xl'
              }`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${
                theme === Theme.DARK ? 'bg-gradient-to-br from-blue-500/5 to-transparent' : 'bg-gradient-to-br from-blue-600/5 to-transparent'
              }`} />
              
              <img 
                src={client.logo} 
                alt={client.name}
                className={`w-full h-full object-contain grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 opacity-20 group-hover:opacity-100`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsGrid;
