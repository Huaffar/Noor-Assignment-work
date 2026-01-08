
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Smartphone, SmartphoneNfc } from 'lucide-react';
import { generateRandomPayout, PayoutProof } from '../utils/fakePayouts';
import { useAuth } from '../context/AuthContext';

const LivePayouts: React.FC = () => {
  const { user } = useAuth();
  const [payout, setPayout] = useState<PayoutProof | null>(null);

  useEffect(() => {
    // Only run ticker if user is not an admin
    if (user?.role === 'admin') return;

    setPayout(generateRandomPayout());
    const interval = setInterval(() => {
      setPayout(generateRandomPayout());
    }, 6000);

    return () => clearInterval(interval);
  }, [user]);

  // Restrict visibility: Only show to regular users, hide for admins
  if (!payout || user?.role === 'admin') return null;

  return (
    <div className="fixed bottom-4 right-4 z-[200] pointer-events-none md:bottom-6 md:right-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={payout.id}
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="bg-white/90 backdrop-blur-xl border border-rose-100 shadow-2xl shadow-rose-900/10 rounded-2xl p-2.5 flex items-center space-x-3 max-w-[260px] pointer-events-auto"
        >
          <div className={`w-8 h-8 rounded-xl ${payout.color} flex items-center justify-center text-white font-black text-[10px] shrink-0 shadow-sm`}>
            {payout.name.split(' ').map(n => n[0]).join('')}
          </div>
          
          <div className="min-w-0 flex-1">
            <p className="text-[7px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1 flex items-center">
              <CheckCircle2 className="w-2.5 h-2.5 mr-1 text-emerald-500" /> {payout.time}
            </p>
            <p className="text-[10px] font-bold text-gray-800 leading-tight">
              <span className="font-black text-gray-900">{payout.name}</span> withdrew <span className="text-rose-600 font-black">Rs. {payout.amount}</span>
            </p>
            <div className="flex items-center mt-0.5 space-x-1">
               {payout.method === 'EasyPaisa' ? <Smartphone className="w-2 h-2 text-emerald-500" /> : <SmartphoneNfc className="w-2 h-2 text-rose-500" />}
               <span className="text-[7px] font-black text-gray-400 uppercase tracking-tighter">via {payout.method}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LivePayouts;
