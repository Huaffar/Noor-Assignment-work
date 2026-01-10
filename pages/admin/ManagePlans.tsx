
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
  Zap,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Clock,
  Layout,
  Type
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
    if(confirm("Commit Tier to Recycle Vault? Logic nodes will be isolated.")) {
      await softDeletePlan(id);
      await fetchPlans();
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 space-y-4 px-1 scale-[0.98] origin-top">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-3 themed-card p-5 mx-1">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center shadow-xl"><TrendingUp className="w-5 h-5 text-theme-primary" /></div>
          <div>
            <h1 className="text-[14px] font-black text-slate-900 uppercase leading-none tracking-tighter">Monetization CMS</h1>
            <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest mt-1">Earning Tier Core Infrastructure</p>
          </div>
        </div>
        <button 
          onClick={() => { setEditingPlan({ name: '', price: 0, dailyLimit: 1, validityType: 'monthly', validityValue: 30, badgeColor: '#0ea5e9', isRecommended: false, description: '' }); setIsModalOpen(true); }}
          className="px-6 py-2.5 bg-slate-950 text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5 text-theme-primary" /> Add Yield Node
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 px-1">
        {plans.map((plan) => (
          <motion.div layout key={plan.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:border-theme-primary/30 transition-all">
            <div className="p-6 flex-1 space-y-4">
              <div className="flex justify-between items-start">
                 <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full shadow-inner" style={{ backgroundColor: plan.badgeColor }} />
                    <h3 className="text-[10px] font-black text-slate-900 uppercase truncate">{plan.name}</h3>
                 </div>
                 {plan.isRecommended && <span className="text-[6px] font-black bg-theme-secondary text-theme-primary px-2 py-0.5 rounded-full border border-theme-primary/10 uppercase tracking-widest">HOT</span>}
              </div>
              
              <div className="flex items-baseline space-x-1">
                <span className="text-[8px] font-black text-slate-300 uppercase">PKR</span>
                <p className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{plan.price.toLocaleString()}</p>
              </div>

              {plan.description && (
                <p className="text-[9px] text-slate-400 font-medium line-clamp-2 uppercase tracking-tighter leading-relaxed">
                  {plan.description}
                </p>
              )}

              <div className="grid grid-cols-2 gap-2">
                 <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-center">
                    <p className="text-[6px] font-black text-slate-400 uppercase mb-0.5">Work Cap</p>
                    <p className="text-[9px] font-black text-slate-900">{plan.dailyLimit} Pgs</p>
                 </div>
                 <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-center">
                    <p className="text-[6px] font-black text-slate-400 uppercase mb-0.5">Cycle</p>
                    <p className="text-[9px] font-black text-slate-900 uppercase">{plan.validityType}</p>
                 </div>
              </div>
            </div>

            <div className="p-2.5 bg-slate-950 flex items-center justify-between">
               <div className="flex space-x-1.5">
                  <button onClick={() => { setEditingPlan(plan); setIsModalOpen(true); }} className="p-2 text-theme-primary rounded-lg hover:bg-white/10 active:scale-90"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleTrash(plan.id)} className="p-2 text-rose-500 rounded-lg hover:bg-white/10 active:scale-90"><Trash2 className="w-3.5 h-3.5" /></button>
               </div>
               <span className="text-[7px] font-black text-white/30 uppercase tracking-widest px-2">Active Logic</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && editingPlan && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-6 shadow-2xl overflow-y-auto max-h-[90vh] border border-white/20"
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-50">
                 <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">Node Configuration</h2>
                 <button onClick={() => setIsModalOpen(false)} className="p-1.5 bg-gray-50 rounded-lg text-gray-400"><X className="w-4 h-4" /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                 <div className="space-y-3">
                    <div className="space-y-1">
                       <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Tier Title</label>
                       <input required value={editingPlan.name} onChange={e=>setEditingPlan({...editingPlan, name: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-black text-xs outline-none focus:border-theme-primary shadow-inner" />
                    </div>
                    
                    <div className="space-y-1">
                       <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Market Description</label>
                       <textarea value={editingPlan.description} onChange={e=>setEditingPlan({...editingPlan, description: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-[10px] outline-none focus:border-theme-primary h-20 resize-none shadow-inner" placeholder="Brief plan overview..." />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                       <div className="space-y-1">
                          <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Price (PKR)</label>
                          <input type="number" required value={editingPlan.price} onChange={e=>setEditingPlan({...editingPlan, price: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-black text-xs outline-none focus:border-theme-primary shadow-inner" />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Daily Pgs</label>
                          <input type="number" required value={editingPlan.dailyLimit} onChange={e=>setEditingPlan({...editingPlan, dailyLimit: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-black text-xs outline-none focus:border-theme-primary shadow-inner" />
                       </div>
                    </div>

                    <div className="space-y-1">
                       <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Visual Theme (HEX)</label>
                       <div className="flex space-x-2">
                          <input type="color" value={editingPlan.badgeColor} onChange={e=>setEditingPlan({...editingPlan, badgeColor: e.target.value})} className="w-10 h-10 rounded-lg bg-gray-50 p-1 cursor-pointer border border-gray-100 shadow-sm" />
                          <input value={editingPlan.badgeColor} onChange={e=>setEditingPlan({...editingPlan, badgeColor: e.target.value})} className="flex-1 bg-gray-50 border border-gray-100 rounded-lg px-4 font-mono text-[9px] outline-none" />
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Featured Node</span>
                    <button type="button" onClick={()=>setEditingPlan({...editingPlan, isRecommended: !editingPlan.isRecommended})} className={`w-10 h-5 rounded-full p-1 transition-all ${editingPlan.isRecommended ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                       <motion.div animate={{ x: editingPlan.isRecommended ? 20 : 0 }} className="w-3 h-3 bg-white rounded-full shadow-sm" />
                    </button>
                 </div>

                 <button type="submit" className="w-full py-4 bg-slate-950 text-white rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] shadow-xl hover:bg-theme-primary transition-all flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5 mr-2 text-theme-primary" /> Commit Architecture
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
