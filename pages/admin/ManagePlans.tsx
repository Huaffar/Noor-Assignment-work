
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Layers, 
  X, 
  TrendingUp, 
  Users, 
  Target, 
  ArrowUpRight, 
  Loader2,
  Activity
} from 'lucide-react';
import { getAllPlans } from '../../api/controllers/planController';

const ManagePlans: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllPlans().then(data => {
      setPlans(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <div className="min-h-[300px] flex items-center justify-center"><Loader2 className="w-6 h-6 text-rose-600 animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-3 px-1">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800">
            <Layers className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div>
            <h1 className="text-sm font-black text-gray-900 leading-none uppercase">Monetization</h1>
            <p className="text-[7px] text-gray-400 font-bold uppercase mt-0.5">Tier Configuration</p>
          </div>
        </div>
        <button className="p-1.5 bg-rose-600 text-white rounded-lg shadow-lg hover:bg-rose-700 transition-all">
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group">
            <div className="p-3">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{plan.name}</h3>
                 <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 bg-gray-50 text-gray-300 rounded"><Edit3 className="w-2.5 h-2.5" /></button>
                 </div>
              </div>
              <p className="text-lg font-black text-gray-900 tracking-tighter">Rs. {plan.price.toLocaleString()}</p>
              <div className="flex items-center space-x-2 mt-2">
                 <div className="bg-rose-50 px-1.5 py-0.5 rounded text-[7px] font-black text-rose-600 uppercase">{plan.dailyLimit} Tks/D</div>
                 <div className="bg-gray-50 px-1.5 py-0.5 rounded text-[7px] font-black text-gray-400 uppercase">{plan.validityDays} Days</div>
              </div>
            </div>
            <div className="mt-auto bg-slate-950 p-2.5 text-white">
               <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[6px] font-black text-rose-400 uppercase">Live Pool</p>
                    <p className="text-[10px] font-black">{plan.analytics.activeSubscribers}</p>
                  </div>
                  <ArrowUpRight className="w-2.5 h-2.5 text-gray-600" />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePlans;
