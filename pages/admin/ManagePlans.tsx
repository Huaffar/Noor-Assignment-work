
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
  BarChart, 
  ArrowUpRight, 
  ChevronRight,
  Loader2,
  PieChart as PieIcon,
  Activity
} from 'lucide-react';
import { getAllPlans } from '../../api/controllers/planController';

const ManagePlans: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePlanForStats, setActivePlanForStats] = useState<any>(null);
  const [editingPlan, setEditingPlan] = useState<any>(null);

  useEffect(() => {
    getAllPlans().then(data => {
      setPlans(data);
      setIsLoading(false);
    });
  }, []);

  const handleOpenModal = (plan?: any) => {
    setEditingPlan(plan || null);
    setIsModalOpen(true);
  };

  if (isLoading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-rose-600 animate-spin" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto pb-20 px-1 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-none tracking-tight">Earning Plans Hub</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-2">Revenue & Subscription Intelligence</p>
        </div>
        <div className="flex items-center space-x-2">
           <div className="bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 flex items-center space-x-2">
              <Activity className="w-3.5 h-3.5 text-rose-600" />
              <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest">Global Payout Mode: Active</span>
           </div>
           <button onClick={() => handleOpenModal()} className="p-2.5 bg-rose-600 text-white rounded-xl shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all">
             <Plus className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan, idx) => (
          <motion.div 
            key={plan.id} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: idx * 0.05 }} 
            className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm relative group overflow-hidden flex flex-col"
          >
            {/* Visual Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(plan)} className="p-2 text-gray-400 hover:text-pink-600 bg-gray-50 rounded-xl"><Edit3 className="w-4 h-4" /></button>
                  <button className="p-2 text-gray-400 hover:text-rose-600 bg-gray-50 rounded-xl"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{plan.name}</h3>
              <p className="text-2xl font-black text-gray-900 tracking-tighter leading-none mb-4">Rs. {plan.price.toLocaleString()}</p>
              
              <div className="grid grid-cols-2 gap-2 mb-6">
                <div className="bg-gray-50 p-2 rounded-xl border border-gray-100/50">
                  <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Daily Limit</p>
                  <p className="text-xs font-black text-gray-900">{plan.dailyLimit} Tasks</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl border border-gray-100/50">
                  <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Validity</p>
                  <p className="text-xs font-black text-gray-900">{plan.validityDays} Days</p>
                </div>
              </div>
            </div>

            {/* In-Card Analytics Footer */}
            <div className="mt-auto bg-slate-950 p-6 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-rose-600/10 rounded-full blur-2xl -mr-12 -mt-12" />
               <div className="relative z-10 flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                     <div>
                        <p className="text-[8px] font-black text-rose-400 uppercase tracking-widest">Active Pool</p>
                        <h4 className="text-base font-black leading-none">{plan.analytics.activeSubscribers.toLocaleString()} <span className="text-[10px] text-slate-500">Users</span></h4>
                     </div>
                     <button 
                       onClick={() => setActivePlanForStats(plan)}
                       className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-rose-600 transition-colors"
                     >
                        <ArrowUpRight className="w-4 h-4" />
                     </button>
                  </div>

                  <div className="space-y-1.5">
                     <div className="flex items-center justify-between text-[7px] font-black uppercase tracking-widest">
                        <span className="text-slate-500">Task Velocity</span>
                        <span className="text-rose-400">{plan.analytics.tasksCompleted.toLocaleString()} Cleared</span>
                     </div>
                     <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: '65%' }} 
                          className="h-full bg-rose-600 rounded-full" 
                        />
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Intelligence Drawer */}
      <AnimatePresence>
        {activePlanForStats && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => setActivePlanForStats(null)} />
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} 
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
               <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-600 shadow-sm border border-gray-100">
                        <Target className="w-6 h-6" />
                     </div>
                     <div>
                        <h2 className="text-xl font-black text-gray-900 leading-none">{activePlanForStats.name} Insight</h2>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Behavioral Analytics Node</p>
                     </div>
                  </div>
                  <button onClick={() => setActivePlanForStats(null)} className="p-2 hover:bg-gray-100 rounded-xl"><X className="w-5 h-5 text-gray-400" /></button>
               </div>

               <div className="p-8 grid md:grid-cols-2 gap-8">
                  {/* Left Column: Core Stats */}
                  <div className="space-y-6">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-3xl border border-gray-100">
                           <Users className="w-5 h-5 text-blue-500 mb-2" />
                           <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Growth Rate</p>
                           <h4 className="text-xl font-black text-gray-900">+12%</h4>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-3xl border border-gray-100">
                           <TrendingUp className="w-5 h-5 text-emerald-500 mb-2" />
                           <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Yield GVM</p>
                           <h4 className="text-xl font-black text-gray-900">Rs. {activePlanForStats.analytics.grossRevenue.toLocaleString()}</h4>
                        </div>
                     </div>

                     <div className="bg-slate-900 rounded-[2rem] p-6 text-white">
                        <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 mb-4">Task Completion Throughput</h5>
                        <div className="space-y-4">
                           <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Submissions</span>
                              <span className="text-xs font-black">{(activePlanForStats.analytics.tasksCompleted * 1.2).toFixed(0)}</span>
                           </div>
                           <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Approvals</span>
                              <span className="text-xs font-black text-emerald-400">{activePlanForStats.analytics.tasksCompleted}</span>
                           </div>
                           <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: '83%' }} className="h-full bg-emerald-500" />
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Right Column: Mini Chart Simulation */}
                  <div className="space-y-6">
                     <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col justify-between">
                        <div>
                           <div className="flex items-center justify-between mb-6">
                              <h5 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Subscriber Lifecycle</h5>
                              <PieIcon className="w-4 h-4 text-rose-600" />
                           </div>
                           
                           <div className="space-y-4">
                              {[
                                { label: 'Active', val: '68%', color: 'bg-rose-600' },
                                { label: 'Trial', val: '22%', color: 'bg-rose-200' },
                                { label: 'Churn', val: '10%', color: 'bg-slate-100' }
                              ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                   <div className="flex items-center space-x-2">
                                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                                      <span className="text-[10px] font-black text-gray-500 uppercase">{item.label}</span>
                                   </div>
                                   <span className="text-[10px] font-black text-gray-900">{item.val}</span>
                                </div>
                              ))}
                           </div>
                        </div>
                        
                        <button 
                          onClick={() => setActivePlanForStats(null)}
                          className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 transition-colors mt-6"
                        >
                           Close Report
                        </button>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
            <motion.div initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-sm bg-white rounded-[2rem] p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-base font-black text-gray-900 uppercase tracking-tight">{editingPlan ? 'Edit Configuration' : 'Create New Tier'}</h2>
                <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Internal Title</label>
                  <input defaultValue={editingPlan?.name} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold outline-none focus:border-rose-400 text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Market Price</label>
                      <input type="number" defaultValue={editingPlan?.price} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold outline-none focus:border-rose-400 text-xs" />
                   </div>
                   <div>
                      <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Tasks / Day</label>
                      <input type="number" defaultValue={editingPlan?.dailyLimit} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold outline-none focus:border-rose-400 text-xs" />
                   </div>
                </div>
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full py-4 bg-rose-600 text-white font-black rounded-xl text-[10px] uppercase shadow-lg shadow-rose-200 mt-4">Commit Configuration</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManagePlans;
