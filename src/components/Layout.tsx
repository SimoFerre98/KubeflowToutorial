import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ProgressBar } from './ProgressBar';
import { useTutorialStore } from '../hooks/useTutorialStore';
import { chapters } from '../data/chapters';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { completedChapters } = useTutorialStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const progress = Math.round((completedChapters.length / chapters.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900 sticky top-0 z-40">
        <h1 className="font-bold text-lg">KFP Tutorial</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed inset-0 z-50 md:hidden bg-slate-900/95 backdrop-blur-sm"
          >
             <div className="p-4 flex justify-end">
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-slate-400" />
                </button>
             </div>
             <div className="pointer-events-auto w-64 h-full" onClick={(e) => e.stopPropagation()}>
               <Sidebar className="w-full h-full border-r-0" onClose={() => setIsMobileMenuOpen(false)} /> 
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar className="hidden md:block fixed left-0 top-0" /> 

      <div className="md:pl-64 flex flex-col min-h-screen transition-all duration-300">
        <ProgressBar progress={progress} />
        <main className="flex-1 p-6 md:p-10 pt-8 md:pt-10 max-w-5xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
