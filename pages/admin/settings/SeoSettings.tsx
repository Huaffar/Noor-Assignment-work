import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Zap, Search, Activity, Loader2, Code, ShieldCheck, Globe } from 'lucide-react';

const SeoSettings: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    metaTitle: "Noor Official | Pakistan's Trusted Earning Hub",
    metaDesc: "Earn daily rewards by completing handwriting and digital assignments. Secure EasyPaisa payouts.",
    gaId: "G-XXXXXXXXXX",
    pixelId: "1234567890123"
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    // @ts-ignore
    Swal.fire({ icon: 'success', title: 'SEO Parameters Sync OK', background: '#fff' });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-[1.8rem] flex items-center justify-center shadow-inner border border-indigo-100">
           <Zap className="w-7 h-7" />
        </div>
        <div>
           <h2 className="text-2xl font-black uppercase text-slate-900 leading-none tracking-tight">SEO Portal</h2>
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Search Optimization & Tracker Integration</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
           <div className="space-y-1.5">
              <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Global Meta Title (Browser Tab)</label>
              <div className="relative">
                 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                 <input 
                   required
                   value={formData.metaTitle} 
                   onChange={e => setFormData({...formData, metaTitle: e.target.value})} 
                   className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 pl-11 pr-4 font-bold text-xs outline-none focus:border-indigo-400 shadow-inner" 
                 />
              </div>
           </div>

           <div className="space-y-1.5">
              <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Search Engine Description</label>
              <textarea 
                required
                value={formData.metaDesc} 
                onChange={e => setFormData({...formData, metaDesc: e.target.value})} 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 font-bold text-xs outline-none h-28 resize-none focus:border-indigo-400 shadow-inner" 
              />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center space-x-2 text-indigo-600 border-b border-gray-50 pb-3">
                 <Activity className="w-4 h-4" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Google Analytics Pulse</h4>
              </div>
              <input 
                value={formData.gaId} 
                onChange={e => setFormData({...formData, gaId: e.target.value})} 
                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 font-mono text-[11px] outline-none focus:border-indigo-400" 
                placeholder="G-XXXXXXXXXX" 
              />
           </div>
           <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center space-x-2 text-rose-600 border-b border-gray-50 pb-3">
                 <Code className="w-4 h-4" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">FB Pixel Logic</h4>
              </div>
              <input 
                value={formData.pixelId} 
                onChange={e => setFormData({...formData, pixelId: e.target.value})} 
                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 font-mono text-[11px] outline-none focus:border-indigo-400" 
                placeholder="1234567890123" 
              />
           </div>
        </div>

        <button 
          disabled={isSaving}
          className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl flex items-center justify-center active:scale-95 transition-all hover:bg-indigo-600"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : <ShieldCheck className="w-5 h-5 mr-3 text-theme-primary" />}
          Commit SEO Synapse
        </button>
      </form>
    </motion.div>
  );
};

export default SeoSettings;