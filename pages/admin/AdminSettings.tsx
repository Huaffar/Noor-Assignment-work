import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  Loader2, 
  Globe, 
  Smartphone, 
  Activity, 
  ImageIcon,
  Cpu,
  Building,
  ShieldCheck,
  Zap,
  Banknote,
  Megaphone,
  Layout,
  Clock,
  ArrowUpRight,
  ShieldAlert,
  Sliders,
  Share2,
  Lock,
  ChevronRight,
  Building2,
  Wallet
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';

const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useSystem();
  const [activeTab, setActiveTab] = useState<'finance' | 'visuals' | 'modules' | 'identity'>('identity');
  const [isSaving, setIsSaving] = useState(false);
  const [localConfig, setLocalConfig] = useState(settings);

  useEffect(() => { setLocalConfig(settings); }, [settings]);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1500));
    updateSettings(localConfig);
    setIsSaving(false);
    alert("Platform Configuration Node Synchronized.");
  };

  const tabs = [
    { id: 'identity', label: 'Company Profile', icon: Building2 },
    { id: 'finance', label: 'Financial Vault', icon: Banknote },
    { id: 'visuals', label: 'Marketing Matrix', icon: Megaphone },
    { id: 'modules', label: 'Logic Modules', icon: Cpu },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-32 space-y-4 px-1 scale-[0.98] origin-top">
      {/* Header Controller */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 bg-slate-950 p-6 rounded-[2.5rem] border border-slate-800 shadow-2xl mx-1 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-600/10 rounded-full blur-[60px] -mr-16 -mt-16" />
        <div className="flex items-center space-x-5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-2xl">
            <Sliders className="w-7 h-7 text-rose-500" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white uppercase leading-none tracking-tight">Command Hub</h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-2">Protocol v4.5.0 • Live Config Sync</p>
          </div>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-10 py-4 bg-rose-600 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-rose-900/40 flex items-center active:scale-95 transition-all hover:bg-rose-700 relative z-10"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-3" /> : <Save className="w-4 h-4 mr-3" />}
          Apply Global Override
        </button>
      </div>

      {/* Navigation Matrix */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-[2rem] mx-2 border border-slate-200">
        {tabs.map(t => (
          <button 
            key={t.id} onClick={() => setActiveTab(t.id as any)} 
            className={`flex-1 flex items-center justify-center space-x-2.5 px-6 py-4 rounded-2xl text-[10px] font-black uppercase transition-all ${
              activeTab === t.id ? 'bg-white text-rose-600 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <t.icon className={`w-4.5 h-4.5 ${activeTab === t.id ? 'opacity-100' : 'opacity-40'}`} />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="px-2">
        <AnimatePresence mode="wait">
          {activeTab === 'identity' && (
            <motion.div key="i" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               {/* Site Metadata */}
               <div className="bg-white p-8 rounded-[3rem] border border-pink-50 shadow-sm space-y-8">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 flex items-center"><Building className="w-5 h-5 mr-3 text-rose-500" /> General Branding</h3>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Logo URL (CDN)</label>
                        <input value={localConfig.companyProfile.logoUrl} onChange={e=>setLocalConfig({...localConfig, companyProfile: {...localConfig.companyProfile, logoUrl: e.target.value}})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-xs outline-none focus:border-rose-400" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Header Announcement</label>
                        <input value={localConfig.companyProfile.headerText} onChange={e=>setLocalConfig({...localConfig, companyProfile: {...localConfig.companyProfile, headerText: e.target.value}})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-xs outline-none" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Footer Verification String</label>
                        <input value={localConfig.companyProfile.footerText} onChange={e=>setLocalConfig({...localConfig, companyProfile: {...localConfig.companyProfile, footerText: e.target.value}})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-xs outline-none" />
                     </div>
                  </div>
               </div>

               {/* Social Matrix */}
               <div className="bg-white p-8 rounded-[3rem] border border-pink-50 shadow-sm space-y-8">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 flex items-center"><Share2 className="w-5 h-5 mr-3 text-indigo-500" /> Social Integrations</h3>
                  <div className="grid grid-cols-2 gap-4">
                     {['whatsapp', 'telegram', 'facebook', 'instagram'].map(s => (
                       <div key={s} className="space-y-2">
                          <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">{s}</label>
                          <input value={(localConfig.companyProfile as any)[s]} onChange={e=>setLocalConfig({...localConfig, companyProfile: {...localConfig.companyProfile, [s]: e.target.value}})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-[10px] outline-none" />
                       </div>
                     ))}
                  </div>
               </div>

               {/* Bank Vault Node */}
               <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] border border-pink-50 shadow-sm space-y-8">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 flex items-center"><Wallet className="w-5 h-5 mr-3 text-emerald-500" /> Institutional Bank Hub</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-2">
                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Institution Name</label>
                        <input value={localConfig.companyProfile.bankName} onChange={e=>setLocalConfig({...localConfig, companyProfile: {...localConfig.companyProfile, bankName: e.target.value}})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-xs outline-none" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Account IBAN / ID</label>
                        <input value={localConfig.companyProfile.bankAccount} onChange={e=>setLocalConfig({...localConfig, companyProfile: {...localConfig.companyProfile, bankAccount: e.target.value}})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-xs outline-none" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Legal Account Title</label>
                        <input value={localConfig.companyProfile.bankTitle} onChange={e=>setLocalConfig({...localConfig, companyProfile: {...localConfig.companyProfile, bankTitle: e.target.value}})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-xs outline-none" />
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'finance' && (
            <motion.div key="f" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-pink-50 shadow-sm space-y-6">
                     <h3 className="text-[12px] font-black text-slate-900 uppercase flex items-center"><Clock className="w-4 h-4 mr-2 text-rose-500" /> Disbursal Strategy</h3>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-[8px] font-black text-slate-400 uppercase">Min Withdrawal</label>
                           <input type="number" value={localConfig.minWithdrawal} onChange={e=>setLocalConfig({...localConfig, minWithdrawal: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 font-black" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[8px] font-black text-slate-400 uppercase">Network Fee %</label>
                           <input type="number" value={localConfig.withdrawalFee} onChange={e=>setLocalConfig({...localConfig, withdrawalFee: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 font-black" />
                        </div>
                     </div>
                  </div>
                  <div className="bg-white p-8 rounded-[2.5rem] border border-pink-50 shadow-sm space-y-6">
                     <h3 className="text-[12px] font-black text-slate-900 uppercase flex items-center"><Zap className="w-4 h-4 mr-2 text-emerald-500" /> Yield Protocol</h3>
                     <div className="space-y-2">
                        <label className="text-[8px] font-black text-slate-400 uppercase">Yield Per Assignment Node (PKR)</label>
                        <input type="number" value={localConfig.ratePerPage} onChange={e=>setLocalConfig({...localConfig, ratePerPage: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 font-black text-2xl" />
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'modules' && (
            <motion.div key="m" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { id: 'referralSystem', label: 'Affiliate Graph', icon: Share2 },
                    { id: 'registration', label: 'Registration Hub', icon: Activity },
                    { id: 'kycRequired', label: 'Biometric Shield', icon: ShieldCheck },
                    { id: 'requireReferralForWithdraw', label: 'Withdrawal Unlock Strategy', icon: Lock },
                  ].map((mod) => (
                    <div key={mod.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-rose-300 transition-all">
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:scale-90 transition-transform">
                             <mod.icon className="w-5 h-5 text-rose-500" />
                          </div>
                          <p className="text-[10px] font-black text-slate-900 uppercase">{mod.label}</p>
                       </div>
                       <button 
                         onClick={() => setLocalConfig({...localConfig, modules: {...localConfig.modules, [mod.id]: !((localConfig.modules as any)[mod.id])}})}
                         className={`w-12 h-6 rounded-full p-1 transition-all ${ (localConfig.modules as any)[mod.id] ? 'bg-emerald-500' : 'bg-slate-200' }`}
                       >
                          <motion.div animate={{ x: (localConfig.modules as any)[mod.id] ? 24 : 0 }} className="w-4 h-4 bg-white rounded-full shadow-md" />
                       </button>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminSettings;