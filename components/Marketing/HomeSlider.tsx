
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeSliderProps {
  banners: string[];
}

const HomeSlider: React.FC<HomeSliderProps> = ({ banners }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="relative h-36 sm:h-44 rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 mx-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10" />
          <img 
            src={banners[current]} 
            className="w-full h-full object-cover" 
            alt="Slider" 
          />
        </motion.div>
      </AnimatePresence>

      {/* Pagination Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-1.5 z-20">
        {banners.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-300 ${current === i ? 'w-4 bg-rose-500' : 'w-1.5 bg-white/40'}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
