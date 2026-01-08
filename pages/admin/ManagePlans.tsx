
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Zap, Layers, X, Info, ShieldCheck } from 'lucide-react';

const ManagePlans: React.FC = () => {
  const [plans, setPlans] = useState([
    { id: 'p1', name: 'Starter', price: 1000, limit: 1, commission: 2 },
    { id: 'p2', name: 'Standard', price: 2000, limit: 2, commission: 5 },
    { id: 'p3', name: 'Gold Pro', price: 3500, limit: 3, commission: 10 }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);

  const handleOpenModal = (plan?: any) => {
    setEditingPlan(plan || null);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 px-1 space-y-6">
      <div className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-xl font-black text-gray-900 leading-none">Membership Tiers</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Pricing Infrastructure</p>
        </div>
        <button onClick={() => handleOpenModal()} className="p-2.5 bg-pink-600 text-white rounded-xl shadow-lg shadow-pink-100"><Plus className="w-4 h-4" /></button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {plans.map((plan, idx) => (
          <motion.div key={plan.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative group">
            <div className="absolute top-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleOpenModal(plan)} className="p-1.5 text-gray-400 hover:text-pink-500 bg-gray-50 rounded-lg"><Edit3 className="w-3 h-3" /></button>
              <button className="p-1.5 text-gray-400 hover:text-rose-500 bg-gray-50 rounded-lg"><Trash2 className="w-3 h-3" /></button>
            </div>
            <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center text-pink-600 mb-4"><Layers className="w-4 h-4" /></div>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{plan.name}</h3>
            <p className="text-lg font-black text-gray-900 tracking-tight leading-none mb-3">Rs. {plan.price.toLocaleString()}</p>
            <div className="space-y-1.5 pt-3 border-t border-gray-50">
              <div className="flex items-center justify-between text-[8px] font-black uppercase text-gray-400 tracking-tighter"><span>Daily Tasks</span><span className="text-gray-900">{plan.limit}</span></div>
              <div className="flex items-center justify-between text-[8px] font-black uppercase text-gray-400 tracking-tighter"><span>Referral</span><span className="text-emerald-500">{plan.commission}%</span></div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-xs bg-white rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6"><h2 className="text-sm font-black text-gray-900 uppercase">Modify Tier</h2><button onClick={() => setIsModalOpen(false)}><X className="w-4 h-4 text-gray-400" /></button></div>
              <form className="space-y-4">
                <div><label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Plan Name</label><input defaultValue={editingPlan?.name} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-2.5 font-bold outline-none focus:border-pink-400 text-xs" /></div>
                <div className="grid grid-cols-2 gap-3">
                   <div><label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Price (PKR)</label><input type="number" defaultValue={editingPlan?.price} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-2.5 font-bold outline-none focus:border-pink-400 text-xs" /></div>
                   <div><label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Comm. %</label><input type="number" defaultValue={editingPlan?.commission} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-2.5 font-bold outline-none focus:border-pink-400 text-xs" /></div>
                </div>
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full py-3 bg-pink-600 text-white font-black rounded-xl text-[10px] uppercase shadow-lg shadow-pink-100">Save Configuration</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManagePlans;
