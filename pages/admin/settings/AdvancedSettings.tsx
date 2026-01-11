import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, ShieldAlert, Trash2, RefreshCcw, Loader2, Code, Database, Terminal } from 'lucide-react';

const AdvancedSettings: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [customCss, setCustomCss] = useState("");

  const handleAction = async (action: string) => {
    if (!confirm(`Are you sure you want to execute: ${action}? This operation is destructive and irreversible.`)) return;
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSaving(false);
    // @ts-ignore
    Swal.fire({ icon: 'success', title: 'Operation Complete', text: `${action} successful.`, background: '#fff' });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-14 h-14 bg-rose-950 text-rose-500 rounded-[1.8rem] flex items-center justify-center shadow-xl border border-rose-900">
           <Terminal className="w-7 h-7" />
        </div>
        <div>
           <h2 className="text-2xl font-black uppercase text-slate-900 leading-none tracking-tight">Advanced Portal</h2>
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Kernel Tuning & Destructive Maintenance</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
         <div className="flex items-center space-x-3 text-rose-600 border-b border-gray-50 pb-4">
            <Code className="w-5 h-5" />
            <h4 className="text-[11px] font-black uppercase tracking-widest">Interface Styling Payload (CSS)</h4>
         </div>
         <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">Inject raw CSS into the platform head node. Use for real-time visual overrides.</p>
         <textarea 
           value={customCss}
           onChange={e => setCustomCss(e.target.value)}
           className="w-full bg-slate-950 text-emerald-400 border border-slate-800 rounded-[2rem] p-8 font-mono text-[11px] outline-none h-56 resize-none shadow-2xl" 
           placeholder="/* .themed-card { border-radius: 50px !important; } */"
         />
         <button className="flex items-center space-x-2 px-8 py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg hover:bg-emerald-600 transition-all active:scale-95">
            <Save className="w-4 h-4" />
            <span>Apply Global Styling Pulse</span>
         </button>
      </div>

      <div className="bg-rose-50 border-2 border-rose-100 p-8 rounded-[3.5rem] space-y-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-48 h-48 bg-rose-200/20 rounded-full blur-3xl -mr-20 -mt-20" />
         
         <div className="flex items-start space-x-5 relative z-10">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-rose-100"><Trash2 className="w-7 h-7 text-rose-600" /></div>
            <div>
               <h3 className="text-xl font-black text-rose-950 uppercase leading-none tracking-tight">Danger Zone Nucleus</h3>
               <p className="text-[9px] font-bold text-rose-600 uppercase tracking-widest mt-2.5 leading-relaxed">Destructive operations console. Unauthorized access will result in automatic node isolation.</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
            <button 
              onClick={() => handleAction("Flush Redis & CDN Cache")}
              className="flex items-center justify-between p-6 bg-white border border-rose-100 rounded-[2rem] group hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95"
            >
               <div className="flex items-center space-x-4">
                  <RefreshCcw className="w-6 h-6 text-rose-600 group-hover:text-white transition-colors" />
                  <div className="text-left">
                     <p className="text-[11px] font-black uppercase tracking-tight">Purge Data Cache</p>
                     <p className="text-[7px] font-bold uppercase opacity-60 mt-1">Reset Browser & API Buffers</p>
                  </div>
               </div>
               <Loader2 className="w-4 h-4 opacity-0 group-hover:opacity-100 animate-spin" />
            </button>

            <button 
              onClick={() => handleAction("Reset Demo Data Registry")}
              className="flex items-center justify-between p-6 bg-white border border-rose-100 rounded-[2rem] group hover:bg-rose-950 hover:text-white transition-all shadow-sm active:scale-95"
            >
               <div className="flex items-center space-x-4">
                  <Database className="w-6 h-6 text-rose-600 group-hover:text-rose-500 transition-colors" />
                  <div className="text-left">
                     <p className="text-[11px] font-black uppercase tracking-tight">Wipe Demo Ledger</p>
                     <p className="text-[7px] font-bold uppercase opacity-60 mt-1">Purge all mock audit data</p>
                  </div>
               </div>
               <ShieldAlert className="w-4 h-4 opacity-0 group-hover:opacity-100 text-rose-500" />
            </button>
         </div>
      </div>
    </motion.div>
  );
};

export default AdvancedSettings;