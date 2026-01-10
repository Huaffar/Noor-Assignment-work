
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap,
  Target,
  PenTool,
  Keyboard,
  ShieldCheck,
  Loader2,
  Lock,
  Filter,
  AlertCircle,
  Search,
  CheckCircle,
  Clock,
  MousePointer2,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

declare const Swal: any;

const DailyWork: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Filter States
  const [typeFilter, setTypeFilter] = useState<'All' | 'Handwritten' | 'Typed' | 'Social'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Available' | 'Completed' | 'Pending'>('All');

  // Multi-Task Mock Data
  const [tasks] = useState<any[]>([
    { id: 'T-821', title: 'Urdu Transcription #42', reward: 240, type: 'Handwritten', status: 'Available', desc: 'Copy Urdu text clearly on A4 paper.', time: '20m' },
    { id: 'T-822', title: 'English Essay: Economy', reward: 350, type: 'Typed', status: 'Available', desc: 'Type a 300-word response to market trends.', time: '45m' },
    { id: 'T-823', title: 'Network Engagement', reward: 50, type: 'Social', status: 'Pending', desc: 'Verify community rules on WhatsApp.', time: '5m' },
    { id: 'T-824', title: 'Logic Verification', reward: 150, type: 'Handwritten', status: 'Completed', desc: 'Audit system logs manually.', time: '30m' },
    { id: 'T-825', title: 'Data Extraction #11', reward: 120, type: 'Typed', status: 'Available', desc: 'Extract key points from PDF.', time: '15m' },
    { id: 'T-826', title: 'Survey Pulse', reward: 40, type: 'Social', status: 'Available', desc: 'Community feedback loop.', time: '2m' },
  ]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchType = typeFilter === 'All' || task.type === typeFilter;
      const matchStatus = statusFilter === 'All' || task.status === statusFilter;
      return matchType && matchStatus;
    });
  }, [tasks, typeFilter, statusFilter]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const hasNoPlan = !user?.currentPlan || user?.currentPlan === 'None';

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="w-10 h-10 text-theme-primary animate-spin mb-4" />
      <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.4em]">Syncing Kernel...</p>
    </div>
  );

  if (hasNoPlan) {
    return (
      <div className="max-w-xs mx-auto py-20 px-2 text-center">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="themed-card p-8">
          <Lock className="w-10 h-10 text-theme-primary mx-auto mb-6" />
          <h1 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Node Locked</h1>
          <p className="text-gray-400 text-[9px] font-bold my-6 leading-relaxed uppercase">Active Tier Initialization Required</p>
          <button onClick={() => navigate('/upgrade')} className="w-full py-3.5 themed-gradient text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl">Packages Hub</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-24 px-4 scale-[0.98] lg:scale-100 origin-top">
      {/* Header Area */}
      <div className="flex items-center justify-between">
         <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl themed-gradient flex items-center justify-center shadow-lg"><Target className="w-6 h-6 text-white" /></div>
            <div>
               <h1 className="text-[20px] lg:text-[24px] font-black text-slate-900 uppercase leading-none">Task Console</h1>
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">Network Payload Deployment Zone</p>
            </div>
         </div>
         <div className="bg-slate-950 px-4 py-2 rounded-xl border border-white/5 flex items-center space-x-2.5">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
           <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Real-time Sync Active</span>
         </div>
      </div>

      {/* Filter Matrix - Wider for PC */}
      <div className="themed-card p-5 space-y-5 shadow-sm border-gray-100">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-2">
                  <Filter className="w-3.5 h-3.5 text-theme-primary" />
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Type Protocol</span>
               </div>
               <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100 space-x-1">
                  {['All', 'Handwritten', 'Typed', 'Social'].map(t => (
                    <button 
                      key={t} onClick={() => setTypeFilter(t as any)}
                      className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${typeFilter === t ? 'bg-slate-950 text-white shadow-md' : 'text-gray-400 hover:text-slate-600'}`}
                    >
                      {t}
                    </button>
                  ))}
               </div>
            </div>

            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-2">
                  <Activity className="w-3.5 h-3.5 text-theme-primary" />
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">State Ledger</span>
               </div>
               <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100 space-x-1">
                  {['All', 'Available', 'Pending', 'Completed'].map(s => (
                    <button 
                      key={s} onClick={() => setStatusFilter(s as any)}
                      className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${statusFilter === s ? 'bg-slate-950 text-white shadow-md' : 'text-gray-400 hover:text-slate-600'}`}
                    >
                      {s}
                    </button>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Task Grid Ledger - PC Grid / Mobile List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         <AnimatePresence mode="popLayout">
           {filteredTasks.map((task) => (
             <motion.div 
               key={task.id}
               layout
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-theme-primary/30 transition-all hover:shadow-xl"
             >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                        task.type === 'Handwritten' ? 'bg-rose-50 text-rose-500' :
                        task.type === 'Typed' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'
                    }`}>
                        {task.type === 'Handwritten' ? <PenTool className="w-5 h-5" /> : 
                        task.type === 'Typed' ? <Keyboard className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[7px] font-black uppercase tracking-widest border ${
                        task.status === 'Available' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        task.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-emerald-50 text-emerald-600 border-emerald-100'
                    }`}>
                        {task.status}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-[14px] font-black text-slate-900 uppercase leading-none mb-2">{task.title}</h3>
                    <p className="text-[10px] text-gray-400 font-medium leading-relaxed mb-4 line-clamp-2">{task.desc}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                   <div className="flex items-center space-x-3">
                      <div>
                        <p className="text-[10px] font-black text-emerald-600">Rs. {task.reward}</p>
                        <p className="text-[7px] font-bold text-gray-300 uppercase tracking-tighter">{task.time} Est.</p>
                      </div>
                   </div>
                   
                   {task.status === 'Available' ? (
                     <button 
                       onClick={() => navigate(`/do-task/${task.id}`)}
                       className="p-3 bg-slate-950 text-white rounded-xl shadow-lg group-hover:bg-theme-primary transition-all active:scale-90 flex items-center space-x-2"
                     >
                       <span className="text-[8px] font-black uppercase tracking-widest px-2">Execute</span>
                       <MousePointer2 className="w-3.5 h-3.5" />
                     </button>
                   ) : task.status === 'Pending' ? (
                     <div className="p-3 bg-gray-50 text-amber-500 rounded-xl border border-gray-100">
                       <Clock className="w-4 h-4" />
                     </div>
                   ) : (
                     <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                       <CheckCircle className="w-4 h-4" />
                     </div>
                   )}
                </div>
             </motion.div>
           ))}
         </AnimatePresence>

         {filteredTasks.length === 0 && (
           <div className="col-span-full py-24 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-10 h-10 text-gray-200" />
              </div>
              <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">No assignments match filters</p>
              <button 
                onClick={() => { setTypeFilter('All'); setStatusFilter('All'); }}
                className="mt-4 text-[10px] font-black text-theme-primary uppercase hover:underline"
              >
                Reset System Grid
              </button>
           </div>
         )}
      </div>

      {/* Safety Protocol Info */}
      <div className="bg-rose-50 border border-rose-100 p-6 rounded-[2.5rem] flex items-start space-x-4">
        <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-1" />
        <div className="space-y-1.5">
           <p className="text-[12px] font-black text-rose-900 uppercase tracking-tighter">Security Alert</p>
           <p className="text-[10px] font-bold text-rose-700 leading-relaxed uppercase tracking-tight">
             All task payloads are audited by human verified nodes. Any attempt to upload duplicate or non-compliant assets will trigger an <span className="text-rose-900 font-black underline">Account Lockdown</span>.
           </p>
        </div>
      </div>
    </div>
  );
};

export default DailyWork;
