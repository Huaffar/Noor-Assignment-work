import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, LayoutGrid, Banknote, ShieldAlert, Loader2, Bell, Smartphone, ShieldCheck, Zap } from 'lucide-react';
import { useSystem } from '../../../context/SystemContext';

const ConfigSettings: React.FC = () => {
  const { settings, updateSettings } = useSystem();
  const [isSaving, setIsSaving] = useState(false);
  const [config, setConfig] = useState({
    minWithdrawal: settings.minWithdrawal,
    depositBonus: 10,
    maintenanceMode: settings.maintenanceMode,
    emailAlerts: true,
    smsGateway: false
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    updateSettings({ minWithdrawal: config.minWithdrawal, maintenanceMode: config.maintenanceMode });
    setIsSaving(false);
    // @ts-ignore
    Swal.fire({ icon: 'success', title: 'Kernel Logic Updated', background: '#fff' });
  };

  const Toggle = ({ active, label, sub, icon: Icon, onClick }: any) => (
    <div className="flex items-center justify-between p-5 bg-gray-50 border border-gray-100 rounded-[1.8rem] group hover:border-theme-primary/20 transition-all">
       <div className="flex items-center space-x-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner ${active ? 'bg-theme-secondary text-theme-primary' : 'bg-white text-gray-300'}`}>
             <Icon className="w-5 h-5" />
          </div>
          <div>
             <p className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-slate-900' : 'text-gray-400'}`}>{label}</p>
             <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mt-1">{sub}</p>
          </div>
       </div>
       <button type="button" onClick={onClick} className={`w-11 h-6 rounded-full p-1 transition-all ${active ? 'bg-theme-primary' : 'bg-gray-200'}`}>
          <motion.div animate={{ x: active ? 20 : 0 }} className="w-4 h-4 bg-white rounded-full shadow-md" />
       </button>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-[1.8rem] flex items-center justify-center shadow-inner border border-emerald-100">
           <LayoutGrid className="w-7 h-7" />
        </div>
        <div>
           <h2 className="text-2xl font-black uppercase text-slate-900 leading-none tracking-tight">Configuration Portal</h2>
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Financial Constants & Module Switchboard</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center space-x-3 text-emerald-600 border-b border-gray-50 pb-4">
               <Banknote className="w-5 h-5" />
               <h4 className="text-[11px] font-black uppercase tracking-widest">Financial Logic Nodes</h4>
            </div>
            <div className="space-y-5">
               <div className="space-y-2">
                  <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Minimum Payout Hub Limit (PKR)</label>
                  <input type="number" required value={config.minWithdrawal} onChange={e => setConfig({...config, minWithdrawal: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 font-black text-lg outline-none focus:border-emerald-400 shadow-inner" />
               </div>
               <div className="space-y-2">
                  <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Referral Activation Yield (%)</label>
                  <input type="number" required value={config.depositBonus} onChange={e => setConfig({...config, depositBonus: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 font-black text-lg outline-none focus:border-emerald-400 shadow-inner" />
               </div>
            </div>
         </div>

         <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 text-amber-600 border-b border-gray-50 pb-4 mb-2">
               <ShieldAlert className="w-5 h-5" />
               <h4 className="text-[11px] font-black uppercase tracking-widest">Module Control Board</h4>
            </div>
            <Toggle label="Maintenance Lock" sub="Freeze all worker nodes" active={config.maintenanceMode} icon={ShieldAlert} onClick={() => setConfig({...config, maintenanceMode: !config.maintenanceMode})} />
            <Toggle label="Email Alerts" sub="Auto-transmission system" active={config.emailAlerts} icon={Bell} onClick={() => setConfig({...config, emailAlerts: !config.emailAlerts})} />
            <Toggle label="SMS Gateway" sub="Mobile node verification" active={config.smsGateway} icon={Smartphone} onClick={() => setConfig({...config, smsGateway: !config.smsGateway})} />
         </div>

         <div className="lg:col-span-2 pt-4">
           <button 
             disabled={isSaving}
             className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl flex items-center justify-center active:scale-95 transition-all hover:bg-emerald-600"
           >
             {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : <Zap className="w-5 h-5 mr-3 text-theme-primary" />}
             Inject Configuration Kernels
           </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ConfigSettings;