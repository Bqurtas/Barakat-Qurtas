
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Copy, Check, X, Code, ExternalLink } from 'lucide-react';
import { Theme } from '../types';

interface AdminToolProps {
  theme: Theme;
}

const AdminTool: React.FC<AdminToolProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General Design');
  const [imageUrl, setImageUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const isDark = theme === Theme.DARK;

  // Generate the code snippet for the user to copy
  const generatedCode = `{ 
    id: 'work-${Date.now()}', 
    category: '${category}', 
    title: '${title}', 
    image: '${imageUrl}' 
  },`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Hidden/Subtle trigger button in bottom left */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[60] w-10 h-10 rounded-full bg-blue-600/10 hover:bg-blue-600 text-blue-600 hover:text-white flex items-center justify-center transition-all duration-500 opacity-20 hover:opacity-100"
        title="Admin Tool - Add Works"
      >
        <Plus size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className={`w-full max-w-lg rounded-[40px] p-8 md:p-12 border shadow-2xl ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-blue-100'
              }`}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className={`font-simple text-xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Add New Masterpiece
                  </h3>
                  <p className="font-simple text-[10px] uppercase tracking-[0.2em] opacity-40 mt-1">Design Manager</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Step 1: Image Link */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">1. Image Direct Link (URL)</label>
                    <a href="https://imgbb.com" target="_blank" className="text-[10px] text-blue-500 hover:underline flex items-center gap-1">
                      Upload to ImgBB <ExternalLink size={10} />
                    </a>
                  </div>
                  <input 
                    type="text" 
                    placeholder="https://i.ibb.co/..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className={`w-full px-5 py-4 rounded-2xl text-xs outline-none border ${isDark ? 'bg-slate-800 border-white/5' : 'bg-slate-50 border-blue-50'}`}
                  />
                </div>

                {/* Step 2: Title */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">2. Design Title</label>
                  <input 
                    type="text" 
                    placeholder="Luxury Branding..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full px-5 py-4 rounded-2xl text-xs outline-none border ${isDark ? 'bg-slate-800 border-white/5' : 'bg-slate-50 border-blue-50'}`}
                  />
                </div>

                {/* Step 3: Category */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">3. Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full px-5 py-4 rounded-2xl text-xs outline-none border appearance-none ${isDark ? 'bg-slate-800 border-white/5' : 'bg-slate-50 border-blue-50'}`}
                  >
                    <option>General Design</option>
                    <option>Social Media</option>
                    <option>Book Covers</option>
                    <option>Logo</option>
                    <option>Posters</option>
                    <option>Events & Conference</option>
                    <option>Video</option>
                    <option>Image</option>
                  </select>
                </div>

                {/* Step 4: Output Code */}
                <div className="pt-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2 block">4. Copy & Paste into worksData.ts</label>
                  <div className={`p-5 rounded-2xl border font-mono text-[10px] relative overflow-hidden ${isDark ? 'bg-black/40 border-white/5 text-blue-300' : 'bg-slate-900 text-blue-400'}`}>
                    <code>{generatedCode}</code>
                    <button 
                      onClick={handleCopy}
                      className="absolute top-3 right-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl text-[10px] leading-relaxed italic ${isDark ? 'bg-blue-500/5 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                  Instruction: Upload your work to ImgBB, then paste the "Direct Link" here. Copy the resulting code and add it to the MY_WORKS_DATA list in worksData.ts.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminTool;
