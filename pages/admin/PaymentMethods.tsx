
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  CheckCircle2, 
  SmartphoneNfc,
  Building,
  ShieldCheck,
  Zap,
  Loader2,
  Banknote
} from 'lucide-react';

const PaymentMethods: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto pb-32 space-y-6 px-1 scale-[0.98] origin-top">
      <div className="flex items-center justify-between px-2 py-4">
         <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 flex items-center justify-center border border-slate-800 shadow-xl">
               <Building className="w-5 h-5 text-pink-400" />
            </div>
            <div>
               <h1 className="text-lg font-black text-slate-900 uppercase">Finance Hub</h1>
               <p className="text-[7px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-1.5">Asset Withdrawal Node</p>
            </div>
         </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-8 rounded-[2.5rem] border border-pink-50 shadow-sm space-y-6 relative overflow-hidden group">
            <div className="flex items-center space-x-3">
               <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <Smartphone className="w-5 h-5" />
               </div>
               <div>
                 <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">EasyPaisa Hub</h3>
                 <p className="text-[7px] font-bold text-emerald-500 uppercase">Mobile Node</p>
               </div>
            </div>
            <div className="space-y-3">
              <input defaultValue="03001234567" className="w-full bg-pink-50/50 border border-pink-100 rounded-xl p-3 font-black text-[12px] outline-none" placeholder="Account Number" />
              <input defaultValue="Noor Official HQ" className="w-full bg-pink-50/50 border border-pink-100 rounded-xl p-3 font-black text-[12px] outline-none" placeholder="Account Title" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-pink-50 shadow-sm space-y-6 relative overflow-hidden group">
            <div className="flex items-center space-x-3">
               <div className="w-10 h-10 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center shadow-inner">
                  <SmartphoneNfc className="w-5 h-5" />
               </div>
               <div>
                 <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">JazzCash Hub</h3>
                 <p className="text-[7px] font-bold text-pink-400 uppercase">Mobile Node</p>
               </div>
            </div>
            <div className="space-y-3">
              <input defaultValue="03017654321" className="w-full bg-pink-50/50 border border-pink-100 rounded-xl p-3 font-black text-[12px] outline-none" placeholder="Account Number" />
              <input defaultValue="Noor Official Finance" className="w-full bg-pink-50/50 border border-pink-100 rounded-xl p-3 font-black text-[12px] outline-none" placeholder="Account Title" />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSaving || isSaved}
          className={`w-full py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center shadow-xl transition-all ${
            isSaved ? 'bg-emerald-500 text-white' : 'bg-slate-950 text-white hover:bg-pink-500'
          }`}
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : isSaved ? <CheckCircle2 className="w-5 h-5 mr-3" /> : <ShieldCheck className="w-5 h-5 mr-3 text-pink-400" />}
          {isSaving ? "Syncing Logic Nodes..." : isSaved ? "Core Financials Locked" : "Commit Financial Sync"}
        </button>
      </form>
    </div>
  );
};

export default PaymentMethods;
