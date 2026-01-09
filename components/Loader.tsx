
import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-rose-50 rounded-full blur-[70px] opacity-60" />
      
      <div className="relative flex flex-col items-center">
        {/* Branding Hub */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-14 h-14 bg-rose-600 rounded-[1.2rem] flex items-center justify-center shadow-xl shadow-rose-200 relative z-10"
        >
          <span className="text-white font-black text-xl tracking-tighter">N</span>
          
          {/* Subtle Ring */}
          <motion.div 
            animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 bg-rose-500 rounded-[1.2rem] -z-10"
          />
        </motion.div>

        <div className="mt-6 text-center space-y-1.5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-1 justify-center"
          >
            <span className="text-sm font-black text-slate-900 tracking-tighter">Noor</span>
            <span className="text-sm font-black text-rose-600 tracking-tighter italic">Official</span>
          </motion.div>
          
          <div className="h-0.5 w-8 bg-rose-600/10 mx-auto rounded-full overflow-hidden">
            <motion.div 
              animate={{ x: [-32, 32] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-full bg-rose-600"
            />
          </div>
          <p className="text-[7px] font-black text-slate-400 uppercase tracking-[0.4em] pt-1">Connecting to Secure Server</p>
        </div>
      </div>
      
      <div className="absolute bottom-8 opacity-20">
         <p className="text-[6px] font-black text-slate-950 uppercase tracking-[0.6em]">Distributed Platform v2.5</p>
      </div>
    </div>
  );
};

export default Loader;
