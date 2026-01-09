
import React from 'react';
import { motion } from 'framer-motion';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center">
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full border-2 border-rose-100 border-t-rose-600"
        />
        <div className="mt-4 text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading Noor...</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
