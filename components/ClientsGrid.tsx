
import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface ClientsGridProps {
  theme: Theme;
}

const ClientsGrid: React.FC<ClientsGridProps> = ({ theme }) => {
  // 16 logos ordered precisely from 1 to 16
  const logos = [
    'https://i.ibb.co/xSZsMTSs/1.png',
    'https://i.ibb.co/gZnsqwCV/2.png',
    'https://i.ibb.co/4R9jnCkp/3.png',
    'https://i.ibb.co/pBWqZk2c/4.png',
    'https://i.ibb.co/sdMCCcnc/5.png',
    'https://i.ibb.co/Y4V13rZ6/6.png',
    'https://i.ibb.co/LXttjRQc/7.png',
    'https://i.ibb.co/HfDbJLpN/8.png',
    'https://i.ibb.co/x8dMRHtt/9.png',
    'https://i.ibb.co/YFf6s62p/10.png',
    'https://i.ibb.co/Lh2DvnRb/11.png',
    'https://i.ibb.co/rRxvvsW6/12.png',
    'https://i.ibb.co/1Y4Nm3n8/13.png',
    'https://i.ibb.co/chcM1hBn/14.png',
    'https://i.ibb.co/xqFtwZMN/15.png',
    'https://i.ibb.co/mCFpvpLv/16.png'
  ];

  const clients = logos.map((logo, i) => ({
    id: i,
    name: `Partner ${i + 1}`,
    logo: logo
  }));

  const isDark = theme === Theme.DARK;

  return (
    <section id="partners" className="py-24 px-4 relative flex flex-col justify-center overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 0.2, y: 0 }} 
            transition={{ duration: 1 }}
            className="font-simple tracking-[0.8em] uppercase text-[8px] font-black mb-3"
          >
            Trust
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-simple text-3xl md:text-5xl font-black uppercase tracking-tight"
          >
            Strategic Partners
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-[2px] bg-blue-600/30 mx-auto mt-6 rounded-full" 
          />
        </div>

        {/* 8 columns for exactly 2 rows of 16 logos */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
          {clients.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ 
                delay: (idx % 8) * 0.05, 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className={`aspect-square rounded-[20px] flex items-center justify-center p-3 border transition-all duration-700 group cursor-none ${
                isDark ? 'bg-white/[0.03] border-white/5 hover:bg-white/[0.08]' : 'bg-slate-900/[0.02] border-slate-900/5 hover:bg-slate-900/[0.04]'
              }`}
            >
              <motion.img 
                src={client.logo} 
                whileHover={{ scale: 1.1 }}
                className="w-full h-full object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-out"
                alt={client.name}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
    </section>
  );
};

export default ClientsGrid;
