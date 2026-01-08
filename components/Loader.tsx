
import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-white flex flex-col items-center justify-center">
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 border-4 border-rose-100 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 border-t-4 border-rose-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-rose-600 rounded-full" />
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-rose-600 font-bold tracking-widest text-xs uppercase"
      >
        Noor Official
      </motion.p>
    </div>
  );
};

export default Loader;
