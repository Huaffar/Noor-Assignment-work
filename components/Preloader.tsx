import React from 'react';
import { motion } from 'framer-motion';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-600 rounded-full blur-[120px]" />
      </div>

      <div className="relative flex flex-col items-center">
        <div className="relative mb-8">
           <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="w-14 h-14 rounded-[1.5rem] border-2 border-rose-50 border-t-rose-500 shadow-2xl shadow-rose-100"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-[10px] font-black text-rose-600">N</span>
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Noor Official</h2>
          <div className="flex items-center space-x-2">
             <div className="h-0.5 w-4 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em]">Synchronizing Nodes</span>
             <div className="h-0.5 w-4 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 flex items-center space-x-2 opacity-20">
         <div className="w-1 h-1 bg-slate-950 rounded-full" />
         <p className="text-[6px] font-black text-slate-950 uppercase tracking-[0.5em]">Protocol 4.5.1 Alpha</p>
         <div className="w-1 h-1 bg-slate-950 rounded-full" />
      </div>
    </div>
  );
};

export default Preloader;
