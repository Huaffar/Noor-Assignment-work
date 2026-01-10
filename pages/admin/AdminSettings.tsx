import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  Loader2, 
  Building, 
  ShieldCheck, 
  Banknote, 
  Sliders, 
  Palette, 
  Layout, 
  Layers, 
  UploadCloud, 
  ImageIcon, 
  RefreshCw, 
  Signal, 
  Trash2, 
  MonitorSmartphone,
  Cpu,
  // Added missing X icon import to fix 'Cannot find name X' error
  X
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';

const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useSystem();
  const [activeTab, setActiveTab] = useState<'finance' | 'identity' | 'appearance' | 'logic'>('identity');
  const [isSaving, setIsSaving] = useState(false);
  const [localConfig, setLocalConfig] = useState(settings);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { 
    setLocalConfig(settings);
  }, [settings]);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    updateSettings(localConfig);
    setIsSaving(false);
    alert("Settings Saved Successfully");
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (file) {
        const reader = new FileReader();
        reader.onload = () => setLocalConfig({...localConfig, siteLogo: reader.result as string});
        reader.readAsDataURL(file);
     }
  };

  const tabs = [
    { id: 'identity', label: 'Branding', icon: Building },
    { id: 'finance', label: 'Payments', icon: Banknote },
    { id: 'appearance', label: 'UI Design', icon: Palette },
    { id: 'logic', label: 'Rules', icon: Cpu },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-32 space-y-4 px-1 scale-[0.98] origin-top">
      {/* Small Header */}
      <div className="bg-slate-950 p-4 rounded-xl border border-white/5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 mx-1">
        <div className="flex items-center space-x-3">
           <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Sliders className="w-5 h-5 text-theme-primary" />
           </div>
           <div>
              <h1 className="text-sm font-black text-white uppercase">Platform Control</h1>
              <p className="text-[7px] text-slate-500 font-bold uppercase tracking-widest mt-1">Manage Website Rules</p>
           </div>
        </div>
        <button 
          onClick={handleSave} disabled={isSaving}
          className="px-6 py-2.5 themed-gradient text-white rounded-lg font-black text-[9px] uppercase tracking-widest shadow-lg flex items-center active:scale-95 transition-all"
        >
          {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" /> : <Save className="w-3.5 h-3.5 mr-2" />}
          SAVE ALL CHANGES
        </button>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-1.5 p-1 bg-gray-100 rounded-xl mx-1">
        {tabs.map(t => (
          <button 
            key={t.id} onClick={() => setActiveTab(t.id as any)} 
            className={`flex-1 min-w-[80px] flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-lg text-[8px] font-black uppercase transition-all ${
              activeTab === t.id ? 'bg-white text-theme-primary shadow-sm' : 'text-gray-400'
            }`}
          >
            <t.icon className="w-3.5 h-3.5" />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="px-1">
        <AnimatePresence mode="wait">
          {activeTab === 'identity' && (
            <motion.div key="id" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
               <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm space-y-4 border border-gray-100">
                  <h3 className="text-[10px] font-black uppercase text-slate-900 border-b border-gray-50 pb-2">Website Info</h3>
                  <div className="space-y-3">
                     <div className="space-y-1">
                        <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Platform Name</label>
                        <input value={localConfig.siteName} onChange={e=>setLocalConfig({...localConfig, siteName: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2.5 font-bold text-xs outline-none focus:border-theme-primary" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Main Header Text</label>
                        <input value={localConfig.companyProfile.headerText} onChange={e=>setLocalConfig({...localConfig, companyProfile: {...localConfig.companyProfile, headerText: e.target.value}})} className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2.5 font-bold text-xs outline-none focus:border-theme-primary" />
                     </div>
                  </div>
               </div>

               <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <h3 className="text-[10px] font-black uppercase text-slate-900 w-full mb-4 border-b border-gray-50 pb-2 text-center">Brand Logo</h3>
                  <div className="flex flex-col items-center justify-center w-full p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                     {localConfig.siteLogo ? (
                        <div className="relative group mb-3">
                           <img src={localConfig.siteLogo} className="h-12 w-auto object-contain" alt="Logo" />
                           <button onClick={() => setLocalConfig({...localConfig, siteLogo: ''})} className="absolute -top-2 -right-2 p-1 bg-rose-500 text-white rounded-full"><X className="w-3 h-3" /></button>
                        </div>
                     ) : (
                        <UploadCloud className="w-6 h-6 text-gray-300 mb-2" />
                     )}
                     <input type="file" ref={logoInputRef} hidden onChange={handleLogoUpload} accept="image/*" />
                     <button onClick={() => logoInputRef.current?.click()} className="text-[8px] font-black text-theme-primary uppercase">Change Logo</button>
                  </div>
               </div>
            </motion.div>
          )}
          
          {/* Default view for other tabs */}
          {activeTab !== 'identity' && (
            <motion.div key="other" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-20 text-center bg-white rounded-2xl border border-dashed border-gray-100 mx-1">
               <Cpu className="w-8 h-8 text-gray-100 mx-auto mb-3" />
               <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em]">Section loading...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminSettings;