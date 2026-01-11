import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  Loader2, 
  Building, 
  ShieldCheck, 
  Banknote, 
  Palette, 
  UploadCloud, 
  Cpu,
  Zap,
  Globe,
  Database,
  Terminal,
  Activity,
  Server,
  DownloadCloud,
  FileUp,
  FileDown,
  RefreshCcw,
  ShieldAlert,
  Layers,
  Key,
  Lock,
  Smartphone
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';

const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useSystem();
  const [activeTab, setActiveTab] = useState<'identity' | 'finance' | 'access' | 'appearance' | 'data_ops'>('identity');
  const [isSaving, setIsSaving] = useState(false);
  const [opState, setOpState] = useState<{ type: string; progress: number } | null>(null);
  const [localConfig, setLocalConfig] = useState(settings);

  const tabs = [
    { id: 'identity', label: 'Brand', icon: Building },
    { id: 'finance', label: 'Financials', icon: Banknote },
    { id: 'access', label: 'Access', icon: Key },
    { id: 'data_ops', label: 'Storage', icon: Database },
    { id: 'appearance', label: 'Visuals', icon: Palette },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    updateSettings(localConfig);
    setIsSaving(false);
    
    // @ts-ignore
    const Toast = (window as any).Swal?.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
    Toast?.fire({ icon: 'success', title: 'System Synchronized' });
  };

  const simulateDataOp = async (type: string, direction: 'export' | 'import') => {
    setOpState({ type: `${direction === 'export' ? 'Compressing' : 'Merging'} ${type}...`, progress: 0 });
    
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 200));
      setOpState(prev => prev ? { ...prev, progress: i } : null);
    }
    
    await new Promise(r => setTimeout(r, 500));
    setOpState(null);
    
    // @ts-ignore
    (window as any).Swal?.fire({
      icon: 'success',
      title: 'Database Synchronized',
      text: direction === 'export' ? 'System snapshot downloaded.' : 'Cloud cluster updated.',
      background: '#fff',
      confirmButtonColor: '#0ea5e9'
    });
  };

  const Toggle = ({ value, onChange, label, sub }: any) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[1.5rem] border border-gray-100 group hover:border-theme-primary/20 transition-all">
      <div className="min-w-0">
        <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight leading-none">{label}</p>
        <p className="text-[7px] text-gray-400 font-bold uppercase mt-1.5 tracking-widest">{sub}</p>
      </div>
      <button onClick={() => onChange(!value)} className={`w-10 h-6 rounded-full p-1 transition-all ${value ? 'bg-theme-primary' : 'bg-gray-200'}`}>
         <div className={`w-4 h-4 bg-white rounded-full transition-transform ${value ? 'translate-x-4' : ''}`} />
      </button>
    </div>
  );

  const Input = ({ label, value, onChange, type = "text", placeholder = "" }: any) => (
    <div className="space-y-1.5">
       <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
       <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-xs outline-none focus:border-theme-primary transition-colors shadow-inner" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-32 space-y-4 px-1 scale-[0.98] origin-top">
      {/* SYSTEM CONTROL STATUS BAR */}
      <div className="bg-slate-950 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 mx-1 relative overflow-hidden">
        <div className="bg-data-grid absolute inset-0 opacity-10" />
        <div className="flex items-center space-x-5 relative z-10">
           <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
              <Terminal className="w-7 h-7 text-theme-primary animate-pulse" />
           </div>
           <div>
              <h1 className="text-lg font-black text-white uppercase leading-none tracking-tight">Mainframe Controller</h1>
              <p className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-2.5">Global Protocol Cluster • Stable Build</p>
           </div>
        </div>
        <div className="flex items-center space-x-3 relative z-10">
          <button 
            onClick={handleSave} disabled={isSaving}
            className={`px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl flex items-center transition-all ${isSaving ? 'bg-slate-800 text-slate-500' : 'bg-theme-primary text-white hover:brightness-110 active:scale-95'}`}
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2 text-rose-500" />}
            Sync Global State
          </button>
        </div>
      </div>

      {/* TABS NAV */}
      <div className="flex overflow-x-auto no-scrollbar gap-1 p-1 bg-gray-100 rounded-2xl mx-1 border border-gray-200">
        {tabs.map(t => (
          <button 
            key={t.id} onClick={() => setActiveTab(t.id as any)} 
            className={`flex-1 min-w-[100px] flex items-center justify-center space-x-2.5 px-4 py-3 rounded-xl text-[9px] font-black uppercase transition-all ${
              activeTab === t.id ? 'bg-white text-theme-primary shadow-sm border border-gray-200' : 'text-gray-400 hover:text-slate-600'
            }`}
          >
            <t.icon className={`w-4 h-4 ${activeTab === t.id ? 'opacity-100' : 'opacity-40'}`} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="px-1 min-h-[450px]">
        <AnimatePresence mode="wait">
          {activeTab === 'identity' && (
            <motion.div key="id" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-4">
               <div className="lg:col-span-8 bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 space-y-8">
                  <div className="flex items-center space-x-3 border-b border-gray-50 pb-4">
                     <Globe className="w-5 h-5 text-theme-primary" />
                     <h3 className="text-[11px] font-black uppercase text-slate-900 tracking-widest">Brand Parameters</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                     <Input label="System Descriptor" value={localConfig.siteName} onChange={(v:any)=>setLocalConfig({...localConfig, siteName: v})} />
                     <Input label="Help Node (WhatsApp)" value={localConfig.supportWhatsApp} onChange={(v:any)=>setLocalConfig({...localConfig, supportWhatsApp: v})} />
                  </div>
                  <Input label="Global Notice Text" placeholder="Terms summary for footer..." />
               </div>
               <div className="lg:col-span-4 bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-6">
                  <div className="w-32 h-32 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200 flex items-center justify-center group cursor-pointer overflow-hidden shadow-inner">
                     {localConfig.siteLogo ? <img src={localConfig.siteLogo} className="w-full h-full object-contain" /> : <UploadCloud className="w-12 h-12 text-gray-300 group-hover:text-theme-primary transition-colors" />}
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mark Identity</span>
                    <p className="text-[8px] text-gray-300 uppercase mt-2">Resolution: 512px Optimized</p>
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'finance' && (
            <motion.div key="fin" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-white p-8 rounded-[3rem] border border-gray-100 space-y-6">
                  <div className="flex items-center space-x-3 border-b border-gray-50 pb-4">
                     <Zap className="w-5 h-5 text-theme-primary" />
                     <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Monetization Constant</h3>
                  </div>
                  <Input label="Rate Per Submission (PKR)" type="number" value={localConfig.ratePerPage} onChange={(v:any)=>setLocalConfig({...localConfig, ratePerPage: Number(v)})} />
                  <Input label="Min Disbursement Limit" type="number" value={localConfig.minWithdrawal} onChange={(v:any)=>setLocalConfig({...localConfig, minWithdrawal: Number(v)})} />
               </div>
               <div className="bg-white p-8 rounded-[3rem] border border-gray-100 space-y-6">
                  <div className="flex items-center space-x-3 border-b border-gray-50 pb-4">
                     <Database className="w-5 h-5 text-theme-primary" />
                     <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Gateway Configuration</h3>
                  </div>
                  <Input label="EasyPaisa Primary Hub" value={localConfig.payoutMethods.easyPaisa.number} onChange={(v:any)=>setLocalConfig({...localConfig, payoutMethods: {...localConfig.payoutMethods, easyPaisa: {...localConfig.payoutMethods.easyPaisa, number: v}}})} />
                  <Input label="JazzCash Primary Hub" value={localConfig.payoutMethods.jazzCash.number} onChange={(v:any)=>setLocalConfig({...localConfig, payoutMethods: {...localConfig.payoutMethods, jazzCash: {...localConfig.payoutMethods.jazzCash, number: v}}})} />
               </div>
            </motion.div>
          )}

          {activeTab === 'access' && (
            <motion.div key="acc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
               <div className="bg-white p-8 rounded-[3rem] border border-gray-100 space-y-8">
                  <div className="flex items-center space-x-3 border-b border-gray-50 pb-4">
                     <Lock className="w-5 h-5 text-theme-primary" />
                     <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Global Access Logic</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     <Toggle label="Node Registry" sub="New Registrations" value={localConfig.modules.registration} onChange={(v:any)=>setLocalConfig({...localConfig, modules: {...localConfig.modules, registration: v}})} />
                     <Toggle label="Identity Auth" sub="Mandatory Biometric KYC" value={localConfig.modules.kycRequired} onChange={(v:any)=>setLocalConfig({...localConfig, modules: {...localConfig.modules, kycRequired: v}})} />
                     <Toggle label="Withdraw Limit" sub="Referral Needed for Payout" value={localConfig.modules.requireReferralForWithdraw} onChange={(v:any)=>setLocalConfig({...localConfig, modules: {...localConfig.modules, requireReferralForWithdraw: v}})} />
                     <Toggle label="Bonus Node" sub="Daily Attendance Rewards" value={localConfig.modules.dailyCheckIn} onChange={(v:any)=>setLocalConfig({...localConfig, modules: {...localConfig.modules, dailyCheckIn: v}})} />
                     <Toggle label="Global Freeze" sub="System Maintenance Mode" value={localConfig.maintenanceMode} onChange={(v:any)=>setLocalConfig({...localConfig, maintenanceMode: v})} />
                  </div>
               </div>
               <div className="bg-rose-50 border border-rose-100 p-6 rounded-[2.5rem] flex items-center space-x-4 mx-1">
                  <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0" />
                  <p className="text-[10px] font-black text-rose-950 uppercase tracking-tight">Warning: "Global Freeze" will terminate all active worker sessions instantly.</p>
               </div>
            </motion.div>
          )}

          {activeTab === 'data_ops' && (
            <motion.div key="data" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8 relative overflow-hidden">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-slate-950 text-theme-primary rounded-2xl flex items-center justify-center shadow-lg"><FileDown className="w-6 h-6" /></div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 uppercase tracking-tighter">Export Archive</h3>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Platform Snapshot</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => simulateDataOp('System DB', 'export')}
                    className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[2rem] flex items-center justify-between group hover:bg-theme-secondary/20 hover:border-theme-primary/30 transition-all active:scale-95"
                  >
                    <div className="flex items-center space-x-5">
                      <Layers className="w-6 h-6 text-gray-400 group-hover:text-theme-primary transition-colors" />
                      <div className="text-left">
                        <p className="text-[11px] font-black text-slate-900 uppercase">Export Personnel DB</p>
                        <p className="text-[8px] font-bold text-gray-400 uppercase mt-1">Users & Configuration</p>
                      </div>
                    </div>
                    <DownloadCloud className="w-5 h-5 text-gray-300 group-hover:text-theme-primary" />
                  </button>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8 relative overflow-hidden">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-rose-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><FileUp className="w-6 h-6" /></div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 uppercase tracking-tighter">Restore Cloud</h3>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Inject State Data</p>
                    </div>
                  </div>
                  <div className="p-6 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50 flex flex-col items-center justify-center text-center group hover:border-rose-300 transition-all cursor-pointer" onClick={() => simulateDataOp('Ledger', 'import')}>
                    <RefreshCcw className="w-8 h-8 text-gray-200 group-hover:text-rose-500 mb-3" />
                    <p className="text-[11px] font-black text-slate-900 uppercase">Synchronize Ledger</p>
                    <p className="text-[8px] font-bold text-gray-400 uppercase mt-1">Update Financial Nodes</p>
                  </div>
                </div>
            </motion.div>
          )}

          {activeTab === 'appearance' && (
            <motion.div key="app" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
               <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                  <div className="flex items-center space-x-3 border-b border-gray-50 pb-4">
                     <Palette className="w-5 h-5 text-theme-primary" />
                     <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Interface Skinning</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {localConfig.themes.map(t => (
                      <button 
                        key={t.id} onClick={() => setLocalConfig({...localConfig, activeThemeId: t.id})}
                        className={`p-6 rounded-[2rem] border flex flex-col items-center gap-4 transition-all ${localConfig.activeThemeId === t.id ? 'border-theme-primary bg-theme-secondary/20 shadow-md ring-4 ring-theme-primary/5' : 'bg-gray-50 grayscale opacity-40'}`}
                      >
                         <div className="w-10 h-10 rounded-full shadow-lg border-2 border-white" style={{ background: t.primary }} />
                         <span className="text-[10px] font-black uppercase text-slate-900 tracking-widest">{t.name}</span>
                      </button>
                    ))}
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-[2rem] flex items-center space-x-4 mx-1 opacity-90 shadow-sm">
         <div className="w-10 h-10 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5 text-emerald-500" />
         </div>
         <p className="text-[9px] font-bold text-emerald-800 leading-relaxed uppercase tracking-tight">
           Operational Trace: Every parameter override is logged to the immutable System Audit Ledger. Node security is managed by the Admin Logic Layer.
         </p>
      </div>
    </div>
  );
};

export default AdminSettings;