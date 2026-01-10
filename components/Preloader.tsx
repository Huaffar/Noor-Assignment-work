import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudLightning } from 'lucide-react';

const Preloader: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-[2000] bg-white flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Immersive Background Nodes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-theme-primary/5 rounded-full blur-[140px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      </div>

      <div className="relative flex flex-col items-center">
        <div className="relative mb-12">
          {/* Main Kinetic Spinner */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-20 h-20 rounded-[2.5rem] border-2 border-theme-secondary border-t-theme-primary shadow-2xl shadow-theme-primary/10"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <CloudLightning className="w-8 h-8 text-theme-primary animate-pulse" />
          </div>
        </div>
        
        <div className="text-center space-y-5">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-black text-slate-900 uppercase tracking-[0.5em] leading-none"
          >
            Noor<span className="text-theme-primary">Official</span>
          </motion.h2>
          
          <div className="flex flex-col items-center space-y-3">
             <div className="flex items-center space-x-4">
                <div className="h-[2px] w-8 bg-slate-100 rounded-full overflow-hidden">
                   <motion.div 
                    animate={{ x: [-32, 32] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="h-full w-full bg-theme-primary"
                   />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Syncing Kernel</span>
                <div className="h-[2px] w-8 bg-slate-100 rounded-full overflow-hidden">
                   <motion.div 
                    animate={{ x: [32, -32] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="h-full w-full bg-theme-primary"
                   />
                </div>
             </div>
             
             <p className="text-[7px] font-bold text-slate-300 uppercase tracking-[0.8em] animate-pulse">Initializing Personnel Hub 4.5</p>
          </div>
        </div>
      </div>

      {/* Security Meta */}
      <div className="absolute bottom-12 flex flex-col items-center space-y-4">
         <div className="flex items-center space-x-3 opacity-20">
            <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
            <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
            <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
         </div>
         <p className="text-[8px] font-black text-slate-950 uppercase tracking-[0.6em] opacity-30">Distributed Ledger System OK</p>
      </div>
    </motion.div>
  );
};

export default Preloader;