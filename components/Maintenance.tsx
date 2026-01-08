
import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Wrench, MessageCircle, ArrowRight } from 'lucide-react';
import { useSystem } from '../context/SystemContext';

const Maintenance: React.FC = () => {
  const { settings } = useSystem();

  return (
    <div className="fixed inset-0 z-[999] bg-white flex items-center justify-center p-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-rose-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-rose-600 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-xl w-full text-center relative z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 bg-rose-50 text-rose-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-xl shadow-rose-100"
        >
          <Settings className="w-12 h-12" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Upgrading <span className="text-rose-600 italic">Noor Official</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg mb-10 leading-relaxed">
            Assalam-o-Alaikum! We are currently refining our platform to bring you a faster and more secure earning experience. We'll be back shortly.
          </p>
        </motion.div>

        <div className="grid gap-4">
          <a 
            href={`https://wa.me/${settings.supportWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 bg-rose-600 text-white py-5 rounded-[2rem] font-black text-lg hover:bg-rose-700 transition-all shadow-2xl shadow-rose-200 group"
          >
            <MessageCircle className="w-6 h-6" />
            <span>Contact WhatsApp Support</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <div className="flex items-center justify-center space-x-2 text-rose-600 font-bold uppercase tracking-widest text-[10px] mt-4">
            <Wrench className="w-3 h-3 animate-bounce" />
            <span>System Maintenance in Progress</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">Noor Official v2.0</p>
      </div>
    </div>
  );
};

export default Maintenance;
