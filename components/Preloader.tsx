import React from 'react';
import { motion } from 'framer-motion';
import { CloudLightning } from 'lucide-react';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-600 rounded-full blur-[140px]" />
      </div>

      <div className="relative flex flex-col items-center">
        <div className="relative mb-10">
           <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-[2rem] border-4 border-sky-50 border-t-sky-600 shadow-2xl shadow-sky-100"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <CloudLightning className="w-6 h-6 text-sky-600" />
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-[0.4em]">Noor Official</h2>
          <div className="flex items-center space-x-3 justify-center">
             <div className="h-1 w-6 bg-sky-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Synchronizing</span>
             <div className="h-1 w-6 bg-sky-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center space-y-3 opacity-30">
         <p className="text-[8px] font-black text-slate-950 uppercase tracking-[0.6em]">Mainframe Core 4.5.1</p>
         <div className="flex items-center space-x-2">
            <div className="w-1 h-1 bg-sky-600 rounded-full animate-ping" />
            <div className="w-1 h-1 bg-sky-600 rounded-full animate-ping [animation-delay:0.2s]" />
            <div className="w-1 h-1 bg-sky-600 rounded-full animate-ping [animation-delay:0.4s]" />
         </div>
      </div>
    </div>
  );
};

export default Preloader;