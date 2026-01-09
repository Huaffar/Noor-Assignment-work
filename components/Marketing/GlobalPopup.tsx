
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PopupProps {
  isActive: boolean;
  imageUrl: string;
  link: string;
  title: string;
}

const GlobalPopup: React.FC<PopupProps> = ({ isActive, imageUrl, link, title }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('noor_marketing_popup');
    if (isActive && !hasSeen) {
      setTimeout(() => setShow(true), 2000);
    }
  }, [isActive]);

  const close = () => {
    sessionStorage.setItem('noor_marketing_popup', 'true');
    setShow(false);
  };

  const handleAction = () => {
    close();
    navigate(link);
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={close}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ scale: 0.9, y: 20 }} 
            animate={{ scale: 1, y: 0 }} 
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <button onClick={close} className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md rounded-full text-white z-20 hover:bg-black/40">
              <X className="w-4 h-4" />
            </button>
            <div className="aspect-[4/5] relative">
               <img src={imageUrl} className="w-full h-full object-cover" alt="Announcement" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
               <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                  <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tight">{title}</h3>
                  <button 
                    onClick={handleAction}
                    className="w-full py-3.5 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl flex items-center justify-center group"
                  >
                    Take Action <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GlobalPopup;
