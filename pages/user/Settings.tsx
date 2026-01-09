import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Lock, 
  Save, 
  Camera, 
  Loader2, 
  ShieldCheck, 
  Settings as GearIcon,
  CreditCard,
  Fingerprint,
  Bell,
  Moon,
  Smartphone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSystem } from '../../context/SystemContext';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const { setTheme } = useSystem();
  const [activeTab, setActiveTab] = useState<'profile' | 'wallet' | 'security' | 'prefs'>('profile');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Identity', icon: User },
    { id: 'wallet', label: 'Payout Hub', icon: CreditCard },
    { id: 'security', label: 'Shield', icon: Fingerprint },
    { id: 'prefs', label: 'Platform', icon: GearIcon },
  ];

  return (
    <div className="max-w-xl mx-auto pb-24 space-y-4 px-1 scale-[0.98] origin-top">
      <div className="px-3 py-2 flex items-center space-x-3">
         <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center shadow-lg border border-slate-800">
            <GearIcon className="w-5 h-5 text-rose-500" />
         </div>
         <div>
            <h1 className="text-sm font-black text-slate-900 uppercase tracking-tight">Node Configuration</h1>
            <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Personnel Infrastructure Sync</p>
         </div>
      </div>

      {/* Compact Sub-Navigation */}
      <div className="flex bg-gray-100 p-1 rounded-2xl mx-1 border border-gray-200">
         {tabs.map(item => (
           <button
             key={item.id}
             onClick={() => setActiveTab(item.id as any)}
             className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl transition-all ${
               activeTab === item.id ? 'bg-white text-rose-600 shadow-sm border border-gray-200' : 'text-slate-400 hover:text-slate-600'
             }`}
           >
             <item.icon className={`w-4 h-4 mb-1 ${activeTab === item.id ? 'opacity-100' : 'opacity-40'}`} />
             <span className="text-[7px] font-black uppercase tracking-tighter">{item.label}</span>
           </button>
         ))}
      </div>

      <div className="px-1">
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div key="p" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-3">
               <div className="bg-white p-5 rounded-[2rem] border border-pink-50 shadow-sm space-y-4">
                  <div className="flex items-center space-x-4">
                     <div className="relative group cursor-pointer">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-rose-50 border-2 border-white shadow-md">
                           <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=fff1f2&color=e11d48&bold=true`} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 rounded-2xl"><Camera className="w-4 h-4 text-white" /></div>
                     </div>
                     <div>
                        <h3 className="text-[11px] font-black text-slate-900 uppercase">{user?.name}</h3>
                        <p className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{user?.email}</p>
                     </div>
                  </div>
                  <div className="space-y-3">
                     <div className="space-y-1">
                        <label className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Legal Identity</label>
                        <input defaultValue={user?.name} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-xs outline-none focus:border-rose-400" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp Primary Hub</label>
                        <input defaultValue={user?.whatsapp} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-xs outline-none focus:border-rose-400" />
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'wallet' && (
             <motion.div key="w" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-3">
                <div className="bg-white p-6 rounded-[2rem] border border-pink-50 shadow-sm space-y-4">
                   <div className="flex items-center space-x-2 mb-2">
                      <CreditCard className="w-4 h-4 text-emerald-500" />
                      <h3 className="text-[10px] font-black text-slate-900 uppercase">Financial Disbursal Nodes</h3>
                   </div>
                   <div className="space-y-3">
                      <div className="space-y-1">
                         <label className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-1">EasyPaisa Account</label>
                         <input placeholder="03XXXXXXXXX" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-xs outline-none focus:border-emerald-400 shadow-inner" />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-1">JazzCash Account</label>
                         <input placeholder="03XXXXXXXXX" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-xs outline-none focus:border-rose-400 shadow-inner" />
                      </div>
                   </div>
                </div>
             </motion.div>
          )}

          {activeTab === 'security' && (
             <motion.div key="s" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-3">
                <div className="bg-white p-6 rounded-[2rem] border border-pink-50 shadow-sm space-y-4">
                   <div className="flex items-center space-x-2 mb-2 text-rose-600">
                      <Lock className="w-4 h-4" />
                      <h3 className="text-[10px] font-black text-slate-900 uppercase">Shield Protocol</h3>
                   </div>
                   <div className="space-y-3">
                      <input type="password" placeholder="Current Access Key" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-xs outline-none focus:border-rose-400" />
                      <input type="password" placeholder="New Secret Node" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-xs outline-none focus:border-rose-400" />
                   </div>
                </div>
             </motion.div>
          )}

          {activeTab === 'prefs' && (
             <motion.div key="pr" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-3">
                <div className="bg-white p-6 rounded-[2rem] border border-pink-50 shadow-sm space-y-4">
                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                     <div className="flex items-center space-x-3">
                       <Moon className="w-4 h-4 text-slate-950" />
                       <p className="text-[10px] font-black text-slate-900 uppercase">Slate Noir UI</p>
                     </div>
                     <button className="w-10 h-6 bg-slate-200 rounded-full p-1"><div className="w-4 h-4 bg-white rounded-full shadow-md" /></button>
                   </div>
                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                     <div className="flex items-center space-x-3">
                       <Bell className="w-4 h-4 text-rose-600" />
                       <p className="text-[10px] font-black text-slate-900 uppercase">Alert Ticker</p>
                     </div>
                     <button className="w-10 h-6 bg-rose-500 rounded-full p-1 flex justify-end"><div className="w-4 h-4 bg-white rounded-full shadow-md" /></button>
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-3">
         <button 
           onClick={() => { setIsSaving(true); setTimeout(() => setIsSaving(false), 1200); }}
           disabled={isSaving}
           className="w-full py-4 bg-slate-950 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center shadow-xl transition-all hover:bg-rose-600"
         >
           {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2 text-rose-500" />}
           Commit State Sync
         </button>
      </div>
    </div>
  );
};

export default Settings;