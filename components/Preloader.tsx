import React from 'react';
import { motion } from 'framer-motion';
import { CloudLightning, ShieldCheck, Globe } from 'lucide-react';

const Preloader: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "circOut" }}
      className="fixed inset-0 z-[3000] bg-white flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-theme-primary/5 rounded-full blur-[160px]" 
        />
      </div>

      <div className="relative flex flex-col items-center max-w-sm w-full px-8">
        <div className="relative mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-[2rem] border-[3px] border-gray-50 border-t-theme-primary shadow-2xl"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <CloudLightning className="w-8 h-8 text-theme-primary animate-pulse" />
          </div>
        </div>
        
        <div className="text-center space-y-6 w-full">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
              Noor<span className="text-theme-primary italic">Official</span>
            </h2>
            <div className="h-0.5 w-12 bg-theme-primary mx-auto rounded-full overflow-hidden">
               <motion.div 
                animate={{ x: [-48, 48] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="h-full w-full bg-white/50"
               />
            </div>
          </div>
          
          <div className="space-y-3">
             <div className="flex items-center justify-center space-x-3 text-slate-400">
                <Globe className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Connecting to Server</span>
             </div>
             
             {/* Tech Progress Bar */}
             <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-full themed-gradient"
                />
             </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center space-y-3 opacity-40">
         <div className="flex items-center space-x-2 text-emerald-600">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[9px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
         </div>
         <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.5em]">System Version 4.5.8</p>
      </div>
    </motion.div>
  );
};

export default Preloader;