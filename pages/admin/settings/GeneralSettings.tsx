import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe, Smartphone, Palette, UploadCloud, Loader2, Building } from 'lucide-react';
import { useSystem } from '../../../context/SystemContext';

const GeneralSettings: React.FC = () => {
  const { settings, updateSettings } = useSystem();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    siteName: settings.siteName,
    currencySymbol: 'PKR',
    primaryColor: settings.themes.find(t => t.id === settings.activeThemeId)?.primary || '#E11D48',
    supportWhatsApp: settings.supportWhatsApp
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    updateSettings(formData);
    setIsSaving(false);
    // @ts-ignore
    Swal.fire({ icon: 'success', title: 'Brand State Synchronized', background: '#fff', confirmButtonColor: '#E11D48' });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-[1.8rem] flex items-center justify-center shadow-inner border border-rose-100">
           <Building className="w-7 h-7" />
        </div>
        <div>
           <h2 className="text-2xl font-black uppercase text-slate-900 leading-none tracking-tight">General Portal</h2>
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Brand Identity & Core UI Logic</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
           <div className="space-y-1.5">
              <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Platform Identity Name</label>
              <input 
                required 
                value={formData.siteName} 
                onChange={e => setFormData({...formData, siteName: e.target.value})} 
                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 font-black text-xs outline-none focus:border-rose-400 transition-all shadow-inner" 
              />
           </div>

           <div className="space-y-1.5">
              <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Official Support WhatsApp</label>
              <div className="relative">
                 <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                 <input 
                   required 
                   value={formData.supportWhatsApp} 
                   onChange={e => setFormData({...formData, supportWhatsApp: e.target.value})} 
                   className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3.5 pl-11 pr-4 font-black text-xs outline-none focus:border-rose-400 transition-all shadow-inner" 
                 />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                 <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Currency Code</label>
                 <input 
                   required 
                   value={formData.currencySymbol} 
                   onChange={e => setFormData({...formData, currencySymbol: e.target.value})} 
                   className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 font-black text-xs outline-none focus:border-rose-400 shadow-inner" 
                 />
              </div>
              <div className="space-y-1.5">
                 <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Theme Primary</label>
                 <div className="flex bg-gray-50 border border-gray-100 rounded-xl p-1.5 items-center justify-between">
                    <input type="color" value={formData.primaryColor} onChange={e => setFormData({...formData, primaryColor: e.target.value})} className="w-10 h-8 rounded-lg cursor-pointer bg-transparent border-none" />
                    <span className="text-[10px] font-mono font-bold text-slate-500 mr-2 uppercase">{formData.primaryColor}</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-slate-950 p-8 rounded-[2.5rem] flex flex-col items-center justify-center space-y-6 shadow-2xl relative overflow-hidden border border-white/5">
           <div className="absolute top-0 right-0 w-32 h-32 bg-theme-primary/10 rounded-full blur-3xl opacity-20 -mr-16 -mt-16" />
           <div className="w-24 h-24 bg-white/5 border-2 border-dashed border-white/20 rounded-[2.5rem] flex flex-col items-center justify-center text-white/40 cursor-pointer group hover:border-theme-primary/50 hover:bg-white/10 transition-all">
              <UploadCloud className="w-8 h-8 mb-2 group-hover:text-theme-primary" />
              <span className="text-[8px] font-black uppercase">Upload SVG</span>
           </div>
           <div className="text-center">
              <h4 className="text-white text-xs font-black uppercase tracking-[0.2em]">Platform Brand Mark</h4>
              <p className="text-slate-500 text-[8px] font-bold uppercase mt-2 tracking-widest leading-relaxed">Recommended: 256x256 WebP or SVG format for high resolution screens.</p>
           </div>
        </div>

        <div className="lg:col-span-2 pt-4">
           <button 
             disabled={isSaving}
             className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl flex items-center justify-center active:scale-95 transition-all hover:bg-rose-600"
           >
             {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : <Save className="w-5 h-5 mr-3 text-rose-500" />}
             Deploy System State
           </button>
        </div>
      </form>
    </motion.div>
  );
};

export default GeneralSettings;