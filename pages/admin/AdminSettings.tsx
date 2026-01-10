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
  UploadCloud, 
  Cpu,
  X,
  Zap,
  Globe,
  Lock,
  Database
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';

const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useSystem();
  const [activeTab, setActiveTab] = useState<'finance' | 'identity' | 'appearance' | 'logic'>('identity');
  const [isSaving, setIsSaving] = useState(false);
  const [localConfig, setLocalConfig] = useState(settings);

  const tabs = [
    { id: 'identity', label: 'Identity', icon: Building },
    { id: 'finance', label: 'Financials', icon: Banknote },
    { id: 'logic', label: 'Logic', icon: Cpu },
    { id: 'appearance', label: 'UI Mode', icon: Palette },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    updateSettings(localConfig);
    setIsSaving(false);
    alert("Core Configuration Updated.");
  };

  const Toggle = ({ value, onChange, label }: any) => (
    <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
      <span className="text-[9px] font-black text-slate-900 uppercase tracking-tight">{label}</span>
      <button onClick={() => onChange(!value)} className={`w-9 h-5 rounded-full p-1 transition-all ${value ? 'bg-theme-primary' : 'bg-gray-200'}`}>
         <div className={`w-3 h-3 bg-white rounded-full transition-transform ${value ? 'translate-x-4' : ''}`} />
      </button>
    </div>
  );

  const Input = ({ label, value, onChange, type = "text", placeholder = "" }: any) => (
    <div className="space-y-1.5">
       <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
       <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2.5 font-bold text-xs outline-none focus:border-theme-primary transition-colors shadow-inner" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-32 space-y-4 px-1 scale-[0.98] origin-top">
      <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 mx-1 relative overflow-hidden">
        <div className="flex items-center space-x-3 relative z-10">
           <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Sliders className="w-5 h-5 text-theme-primary" />
           </div>
           <div>
              <h1 className="text-sm font-black text-white uppercase leading-none">System Control</h1>
              <p className="text-[7px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-1.5">Platform Kernel: v4.5.1</p>
           </div>
        </div>
        <button 
          onClick={handleSave} disabled={isSaving}
          className={`px-8 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-2xl flex items-center transition-all ${isSaving ? 'bg-slate-800 text-slate-500' : 'bg-theme-primary text-white hover:brightness-110'}`}
        >
          {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" /> : <Save className="w-3.5 h-3.5 mr-2" />}
          Commit Config
        </button>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-1.5 p-1 bg-gray-100 rounded-xl mx-1 border border-gray-200">
        {tabs.map(t => (
          <button 
            key={t.id} onClick={() => setActiveTab(t.id as any)} 
            className={`flex-1 min-w-[80px] flex items-center justify-center space-x-2 px-3 py-2.5 rounded-lg text-[8px] font-black uppercase transition-all ${
              activeTab === t.id ? 'bg-white text-theme-primary shadow-sm' : 'text-gray-400'
            }`}
          >
            <t.icon className="w-3.5 h-3.5" />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="px-1 min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'identity' && (
            <motion.div key="id" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-3">
               <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                  <h3 className="text-[10px] font-black uppercase text-slate-900 border-b pb-2">Brand Node</h3>
                  <Input label="Site Display Name" value={localConfig.siteName} onChange={(v:any)=>setLocalConfig({...localConfig, siteName: v})} />
                  <Input label="Help WhatsApp" value={localConfig.supportWhatsApp} onChange={(v:any)=>setLocalConfig({...localConfig, supportWhatsApp: v})} />
               </div>
               <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl border-2 border-dashed flex items-center justify-center group cursor-pointer overflow-hidden">
                     {localConfig.siteLogo ? <img src={localConfig.siteLogo} className="w-full h-full object-contain" /> : <UploadCloud className="w-8 h-8 text-gray-300 group-hover:text-theme-primary transition-colors" />}
                  </div>
                  <span className="text-[8px] font-black text-gray-400 uppercase">Click to Deploy Logo Node</span>
               </div>
            </motion.div>
          )}

          {activeTab === 'finance' && (
            <motion.div key="fin" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-3">
               <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-4">
                  <h3 className="text-[10px] font-black text-slate-900 uppercase border-b pb-2">Yield Overrides</h3>
                  <Input label="Rate Per Work Page (PKR)" type="number" value={localConfig.ratePerPage} onChange={(v:any)=>setLocalConfig({...localConfig, ratePerPage: Number(v)})} />
                  <Input label="Minimum Withdrawal Threshold" type="number" value={localConfig.minWithdrawal} onChange={(v:any)=>setLocalConfig({...localConfig, minWithdrawal: Number(v)})} />
               </div>
               <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-4">
                  <h3 className="text-[10px] font-black text-slate-900 uppercase border-b pb-2">Disbursal Nodes</h3>
                  <Input label="EasyPaisa Account Node" value={localConfig.payoutMethods.easyPaisa.number} onChange={(v:any)=>setLocalConfig({...localConfig, payoutMethods: {...localConfig.payoutMethods, easyPaisa: {...localConfig.payoutMethods.easyPaisa, number: v}}})} />
                  <Input label="JazzCash Account Node" value={localConfig.payoutMethods.jazzCash.number} onChange={(v:any)=>setLocalConfig({...localConfig, payoutMethods: {...localConfig.payoutMethods, jazzCash: {...localConfig.payoutMethods.jazzCash, number: v}}})} />
               </div>
            </motion.div>
          )}

          {activeTab === 'logic' && (
            <motion.div key="log" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
               <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-4">
                  <h3 className="text-[10px] font-black text-slate-900 uppercase border-b pb-2">Gate Protocols</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     <Toggle label="Enable New Node Entry" value={localConfig.modules.registration} onChange={(v:any)=>setLocalConfig({...localConfig, modules: {...localConfig.modules, registration: v}})} />
                     <Toggle label="Mandatory Identity (KYC)" value={localConfig.modules.kycRequired} onChange={(v:any)=>setLocalConfig({...localConfig, modules: {...localConfig.modules, kycRequired: v}})} />
                     <Toggle label="Require Affiliate Activity" value={localConfig.modules.requireReferralForWithdraw} onChange={(v:any)=>setLocalConfig({...localConfig, modules: {...localConfig.modules, requireReferralForWithdraw: v}})} />
                     <Toggle label="Mainframe Maintenance Mode" value={localConfig.maintenanceMode} onChange={(v:any)=>setLocalConfig({...localConfig, maintenanceMode: v})} />
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'appearance' && (
            <motion.div key="app" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
               <div className="bg-white p-5 rounded-2xl border border-gray-100 space-y-4">
                  <h3 className="text-[10px] font-black text-slate-900 uppercase border-b pb-2">Active Skin Node</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {localConfig.themes.map(t => (
                      <button 
                        key={t.id} onClick={() => setLocalConfig({...localConfig, activeThemeId: t.id})}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${localConfig.activeThemeId === t.id ? 'border-theme-primary bg-theme-secondary/20 shadow-md ring-2 ring-theme-primary/20' : 'bg-gray-50 opacity-50 grayscale'}`}
                      >
                         <div className="w-6 h-6 rounded-full shadow-lg" style={{ background: t.primary }} />
                         <span className="text-[8px] font-black uppercase text-slate-900">{t.name}</span>
                      </button>
                    ))}
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center space-x-3 mx-1 opacity-80">
         <ShieldCheck className="w-5 h-5 text-rose-600 shrink-0" />
         <p className="text-[8px] font-bold text-rose-700 leading-relaxed uppercase tracking-tight">
           Security protocol active. All overrides are logged in the immutable Audit Ledger.
         </p>
      </div>
    </div>
  );
};

export default AdminSettings;
