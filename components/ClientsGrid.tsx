
import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface ClientsGridProps {
  theme: Theme;
}

const ClientsGrid: React.FC<ClientsGridProps> = ({ theme }) => {
  // Mock data for 18 partners as per request (6 per row, 3 rows)
  const clients = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    name: `Partner ${i + 1}`,
    logo: `https://cdn-icons-png.flaticon.com/512/5968/5968${200 + i > 300 ? 204 : 200 + i}.png` // Using placeholder icons for clean look
  }));

  const sectionTitleColor = theme === Theme.DARK ? 'text-blue-400/50' : 'text-blue-600/40';
  const headingColor = theme === Theme.DARK ? 'text-slate-100' : 'text-slate-900';

  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-simple tracking-[0.7em] uppercase text-[9px] font-black mb-4 ${sectionTitleColor}`}
          >
            Network
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
            whileInView={{ width: 32 }}
            viewport={{ once: true }}
            className="h-[1px] bg-blue-500/30 mx-auto mt-6" 
          />
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-5">
          {clients.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              // Fixed easing array type
              transition={{ delay: (idx % 6) * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              viewport={{ once: true }}
              className={`aspect-square rounded-[32px] flex items-center justify-center p-7 transition-all duration-700 border group relative overflow-hidden ${
                theme === Theme.DARK 
                  ? 'bg-slate-900/20 border-slate-800/40 hover:bg-slate-800/60 hover:border-blue-500/30' 
                  : 'bg-slate-100/30 border-blue-100/40 hover:bg-white hover:border-blue-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] hover:shadow-[0_20px_40px_rgba(30,64,175,0.06)]'
              }`}
            >
              {/* Subtle radial glow on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${
                theme === Theme.DARK ? 'bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]' : 'bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.04),transparent_70%)]'
              }`} />
              
              <img 
                src={client.logo} 
                alt={client.name}
                className={`w-full h-full object-contain grayscale transition-all duration-1000 scale-[0.75] group-hover:scale-[0.9] group-hover:grayscale-0 ${
                  theme === Theme.DARK ? 'opacity-20 group-hover:opacity-100' : 'opacity-30 group-hover:opacity-100'
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsGrid;
