
import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface ClientsGridProps {
  theme: Theme;
}

const ClientsGrid: React.FC<ClientsGridProps> = ({ theme }) => {
  const logos = [
    'https://cdn-icons-png.flaticon.com/512/5968/5968204.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968218.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968313.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968322.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968213.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968242.png',
    'https://cdn-icons-png.flaticon.com/512/882/882731.png',
    'https://cdn-icons-png.flaticon.com/512/732/732221.png',
    'https://cdn-icons-png.flaticon.com/512/732/732190.png',
    'https://cdn-icons-png.flaticon.com/512/732/732229.png',
    'https://cdn-icons-png.flaticon.com/512/732/732205.png',
    'https://cdn-icons-png.flaticon.com/512/732/732228.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968263.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968252.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968334.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968235.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968249.png',
    'https://cdn-icons-png.flaticon.com/512/5968/5968222.png',
  ];

  const clients = logos.map((logo, i) => ({
    id: i,
    name: `Partner ${i + 1}`,
    logo: logo
  }));

  const isDark = theme === Theme.DARK;
  const sectionTitleColor = isDark ? 'text-blue-400/50' : 'text-blue-600/40';
  const headingColor = isDark ? 'text-slate-100' : 'text-slate-900';

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

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
          {clients.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 6) * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
              viewport={{ once: true }}
              className={`aspect-square rounded-[35px] md:rounded-[45px] flex items-center justify-center p-6 md:p-8 transition-all duration-700 relative group overflow-hidden border backdrop-blur-3xl ${
                isDark 
                  ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] shadow-2xl' 
                  : 'bg-slate-900/[0.02] border-slate-900/5 hover:bg-slate-900/[0.04] shadow-sm'
              }`}
            >
              {/* Soft Inner Glow on Hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none ${
                isDark ? 'bg-gradient-to-br from-blue-500/10 to-transparent' : 'bg-gradient-to-br from-blue-600/5 to-transparent'
              }`} />
              
              <img 
                src={client.logo} 
                alt={client.name}
                className={`w-full h-full object-contain grayscale transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 opacity-15 group-hover:opacity-100`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsGrid;
