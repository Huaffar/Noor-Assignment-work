import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Layers, 
  X, 
  Target, 
  Loader2,
  Activity,
  Zap,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { getAllPlans, createPlan, updatePlan, softDeletePlan } from '../../api/controllers/planController';
import { IPlan } from '../../api/models/Plan';

const ManagePlans: React.FC = () => {
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Partial<IPlan> | null>(null);

  useEffect(() => { fetchPlans(); }, []);

  const fetchPlans = async () => {
    setIsLoading(true);
    const data = await getAllPlans();
    setPlans(data);
    setIsLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;
    if (editingPlan.id) await updatePlan(editingPlan.id, editingPlan);
    else await createPlan(editingPlan as any);
    await fetchPlans();
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const handleTrash = async (id: string) => {
    if(confirm("Move tier to Recycle Vault? Users currently on this plan will not be affected.")) {
      await softDeletePlan(id);
      await fetchPlans();
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 space-y-4 px-1 scale-[0.98] origin-top">
      {/* Monetization Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-3 bg-white p-5 rounded-[2rem] border border-pink-50 shadow-sm mx-1">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center border border-slate-800 shadow-2xl">
            <TrendingUp className="w-6 h-6 text-pink-400" />
          </div>
          <div>
            <h1 className="text-base font-black text-slate-900 leading-none uppercase tracking-tighter">Monetization Hub</h1>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-1.5">Earning Tier Infrastructure</p>
          </div>
        </div>
        <button 
          onClick={() => { setEditingPlan({ name: '', price: 0, dailyLimit: 1, validityType: 'monthly', validityValue: 30, badgeColor: '#f472b6', isRecommended: false }); setIsModalOpen(true); }}
          className="px-6 py-3 bg-pink-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-pink-100 active:scale-95 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Revenue Tier
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 px-1">
        {plans.map((plan) => (
          <motion.div layout key={plan.id} className="bg-white rounded-[2.5rem] border border-pink-50 shadow-sm overflow-hidden flex flex-col group hover:border-pink-300 transition-all">
            <div className="p-7 flex-1 space-y-6">
              <div className="flex justify-between items-start">
                 <div className="flex items-center space-x-2.5">
                    <div className="w-3.5 h-3.5 rounded-full shadow-inner" style={{ backgroundColor: plan.badgeColor }} />
                    <h3 className="text-[12px] font-black text-slate-900 uppercase truncate tracking-tight">{plan.name}</h3>
                 </div>
                 {plan.isRecommended && <span className="text-[6px] font-black bg-pink-50 text-pink-500 px-2 py-0.5 rounded-full uppercase border border-pink-100">Hot</span>}
              </div>
              
              <div className="flex items-baseline space-x-2">
                <span className="text-[10px] font-black text-slate-300 uppercase">PKR</span>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">{plan.price.toLocaleString()}</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                 <div className="p-3 bg-pink-50/20 rounded-2xl border border-pink-50/50 text-center shadow-inner">
                    <p className="text-[6px] font-black text-slate-400 uppercase tracking-widest mb-1">Capacity</p>
                    <p className="text-[11px] font-black text-slate-900 leading-none">{plan.dailyLimit} Pgs</p>
                 </div>
                 <div className="p-3 bg-gray-50/50 rounded-2xl border border-gray-100 text-center shadow-inner">
                    <p className="text-[6px] font-black text-slate-400 uppercase tracking-widest mb-1">Cycle</p>
                    <p className="text-[11px] font-black text-slate-900 uppercase leading-none">{plan.validityType}</p>
                 </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950 flex items-center justify-between">
               <div className="flex space-x-2">
                  <button onClick={() => { setEditingPlan(plan); setIsModalOpen(true); }} className="p-2 bg-white/5 text-pink-400 rounded-xl hover:bg-white/10 transition-colors shadow-lg active:scale-90"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => handleTrash(plan.id)} className="p-2 bg-white/5 text-slate-500 hover:text-rose-500 rounded-xl hover:bg-white/10 transition-colors shadow-lg active:scale-90"><Trash2 className="w-4 h-4" /></button>
               </div>
               <div className="flex items-center space-x-1.5 px-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[7px] font-black text-white/30 uppercase tracking-widest">Live Node</span>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && editingPlan && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-[380px] bg-white rounded-[3rem] p-8 shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-4">
                 <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shadow-inner"><Layers className="w-6 h-6" /></div>
                    <div>
                       <h2 className="text-base font-black text-slate-900 uppercase">Tier Configuration</h2>
                       <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Personnel Revenue Gate</p>
                    </div>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-rose-600"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <label className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-1">Plan Identity</label>
                       <input required value={editingPlan.name} onChange={e=>setEditingPlan({...editingPlan, name: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-4 font-black text-xs outline-none focus:border-rose-400 shadow-inner" />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Value (PKR)</label>
                       <input type="number" required value={editingPlan.price} onChange={e=>setEditingPlan({...editingPlan, price: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-4 font-black text-xs outline-none focus:border-rose-400 shadow-inner" />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <label className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-1">Daily Capacity</label>
                       <input type="number" required value={editingPlan.dailyLimit} onChange={e=>setEditingPlan({...editingPlan, dailyLimit: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-4 font-black text-xs outline-none focus:border-rose-400 shadow-inner" />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-1">Validity Protocol</label>
                       <select value={editingPlan.validityType} onChange={e=>setEditingPlan({...editingPlan, validityType: e.target.value as any})} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-4 font-black text-[9px] uppercase outline-none focus:border-rose-400 shadow-inner">
                          <option value="monthly">Monthly Cycle</option>
                          <option value="yearly">Yearly Cycle</option>
                          <option value="lifetime">Permanent Node</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-1">Aesthetic Signature (HEX)</label>
                    <div className="flex space-x-2">
                       <input type="color" value={editingPlan.badgeColor} onChange={e=>setEditingPlan({...editingPlan, badgeColor: e.target.value})} className="w-12 h-10 rounded-xl bg-gray-50 p-1 cursor-pointer border border-gray-100" />
                       <input value={editingPlan.badgeColor} onChange={e=>setEditingPlan({...editingPlan, badgeColor: e.target.value})} className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 font-mono text-[10px] outline-none" />
                    </div>
                 </div>

                 <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <button 
                      type="button"
                      onClick={()=>setEditingPlan({...editingPlan, isRecommended: !editingPlan.isRecommended})}
                      className={`w-10 h-5 rounded-full p-0.5 transition-all ${editingPlan.isRecommended ? 'bg-emerald-500' : 'bg-slate-200'}`}
                    >
                      <motion.div animate={{ x: editingPlan.isRecommended ? 20 : 0 }} className="w-4 h-4 bg-white rounded-full shadow-md" />
                    </button>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Recommended Tag Node</span>
                 </div>

                 <button type="submit" className="w-full py-4.5 bg-slate-950 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:bg-rose-600 transition-all flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 mr-2 text-rose-500" /> Commit Tier Sync
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManagePlans;