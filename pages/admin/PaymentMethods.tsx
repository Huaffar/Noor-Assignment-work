
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Save, 
  CheckCircle2, 
  Info,
  SmartphoneNfc
} from 'lucide-react';

const PaymentMethods: React.FC = () => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="bg-pink-50 border border-pink-100 p-3 rounded-xl flex items-start space-x-2">
        <Info className="w-3.5 h-3.5 text-pink-600 shrink-0 mt-0.5" />
        <p className="text-[8px] font-bold text-pink-700 leading-tight uppercase tracking-tight">Updating these reflects instantly on all user upgrade pages. Ensure numbers are valid.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-2.5">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-2 mb-4"><div className="w-7 h-7 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center"><Smartphone className="w-4 h-4" /></div><h3 className="text-[11px] font-black text-gray-900 uppercase tracking-widest">EasyPaisa Hub</h3></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Number</label><input defaultValue="03001234567" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-2.5 font-bold outline-none focus:border-pink-400 text-[11px]" /></div>
            <div><label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Title</label><input defaultValue="HQ Finance" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-2.5 font-bold outline-none focus:border-pink-400 text-[11px]" /></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-2 mb-4"><div className="w-7 h-7 bg-pink-50 text-pink-600 rounded-lg flex items-center justify-center"><SmartphoneNfc className="w-4 h-4" /></div><h3 className="text-[11px] font-black text-gray-900 uppercase tracking-widest">JazzCash Node</h3></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Number</label><input defaultValue="03017654321" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-2.5 font-bold outline-none focus:border-pink-400 text-[11px]" /></div>
            <div><label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Title</label><input defaultValue="Branch Core" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-2.5 font-bold outline-none focus:border-pink-400 text-[11px]" /></div>
          </div>
        </div>

        <button type="submit" className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center shadow-lg transition-all ${isSaved ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-pink-600'}`}>
          {isSaved ? <CheckCircle2 className="w-4 h-4 mr-1.5" /> : <Save className="w-4 h-4 mr-1.5" />}
          {isSaved ? "Saved" : "Apply Channels"}
        </button>
      </form>
    </div>
  );
};

export default PaymentMethods;
