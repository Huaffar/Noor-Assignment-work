import React, { useState, useEffect, useMemo } from 'react';
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
  Activity,
  FileText,
  History,
  XCircle,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DailyWork: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'available' | 'pending' | 'history' | 'rejected'>('available');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Handwritten' | 'Typed'>('All');

  const [tasks] = useState<any[]>([
    { id: 'T-821', title: 'Urdu Script Transcription #42', reward: 240, type: 'Handwritten', status: 'Available', desc: 'Copy 2 pages of Urdu text clearly on A4 sheets.', estTime: '25m' },
    { id: 'T-822', title: 'English Business Essay Node', reward: 350, type: 'Typed', status: 'Available', desc: 'Type a 400-word analysis on digital economy.', estTime: '40m' },
    { id: 'T-824', title: 'Accounting Ledger Capture', reward: 150, type: 'Handwritten', status: 'Approved', desc: 'Manual ledger entry verification.', estTime: '15m', date: 'Oct 24' },
    { id: 'T-825', title: 'Legal Terminology Sync', reward: 120, type: 'Typed', status: 'Rejected', desc: 'Accurate typing of legal contract definitions.', estTime: '10m', reason: 'Blurry photo submission', date: 'Oct 23' },
  ]);

  const filteredTasks = useMemo(() => {
    let base = tasks;
    if (activeTab === 'available') base = tasks.filter(t => t.status === 'Available');
    else if (activeTab === 'pending') base = tasks.filter(t => t.status === 'Pending');
    else if (activeTab === 'history') base = tasks.filter(t => t.status === 'Approved');
    else if (activeTab === 'rejected') base = tasks.filter(t => t.status === 'Rejected');

    return base.filter(task => typeFilter === 'All' || task.type === typeFilter);
  }, [tasks, typeFilter, activeTab]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="w-10 h-10 text-theme-primary animate-spin mb-4" />
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Loading Work Station...</p>
    </div>
  );

  const hasNoPlan = !user?.currentPlan || user?.currentPlan === 'None';
  if (hasNoPlan) {
    return (
      <div className="max-w-xs mx-auto py-16 px-4 text-center">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="themed-card p-10 border border-theme-primary/10">
          <Lock className="w-12 h-12 text-theme-primary mx-auto mb-8" />
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Access Locked</h1>
          <p className="text-gray-400 text-[10px] font-bold my-8 leading-relaxed uppercase tracking-widest">An active earning plan is required to view daily assignments.</p>
          <button onClick={() => navigate('/upgrade')} className="w-full py-4 themed-gradient text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl">Activate Plan Now</button>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'available', label: 'Available', icon: Zap },
    { id: 'pending', label: 'In Review', icon: Clock },
    { id: 'history', label: 'Approved', icon: CheckCircle },
    { id: 'rejected', label: 'Rejected', icon: XCircle }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-4 pb-24 px-1 scale-[0.98] lg:scale-100 origin-top">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 py-2">
         <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl themed-gradient flex items-center justify-center shadow-2xl"><FileText className="w-6 h-6 text-white" /></div>
            <div>
               <h1 className="text-2xl font-black text-slate-900 uppercase leading-none tracking-tight">Assignment Station</h1>
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2">Daily Work Pipeline • {activeTab}</p>
            </div>
         </div>
         
         <div className="flex bg-gray-100 p-1 rounded-2xl border border-gray-200 shadow-inner overflow-x-auto no-scrollbar">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id as any)} className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase transition-all whitespace-nowrap ${activeTab === t.id ? 'bg-white text-theme-primary shadow-sm border border-gray-200' : 'text-gray-400 hover:text-slate-600'}`}>
                <t.icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            ))}
         </div>
      </div>

      {/* Logic Filters */}
      <div className="themed-card p-4 mx-1 shadow-sm border-gray-50 flex items-center justify-between bg-white/50 backdrop-blur-md">
         <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-theme-primary" />
            <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">Filter Format</span>
         </div>
         <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-100 space-x-1">
            {['All', 'Handwritten', 'Typed'].map(t => (
              <button 
                key={t} onClick={() => setTypeFilter(t as any)}
                className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${typeFilter === t ? 'bg-slate-950 text-white shadow-md' : 'text-gray-400 hover:text-slate-600'}`}
              >
                {t}
              </button>
            ))}
         </div>
      </div>

      {/* Assignment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-1">
         <AnimatePresence mode="popLayout">
           {filteredTasks.map((task) => (
             <motion.div 
               key={task.id}
               layout
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-theme-primary/30 transition-all hover:shadow-xl relative"
             >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                        task.type === 'Handwritten' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'
                    }`}>
                        {task.type === 'Handwritten' ? <PenTool className="w-6 h-6" /> : <Keyboard className="w-6 h-6" />}
                    </div>
                    {activeTab === 'rejected' && <div className="p-2 bg-rose-50 text-rose-600 rounded-xl"><XCircle className="w-5 h-5" /></div>}
                  </div>
                  
                  <div>
                    <h3 className="text-[14px] font-black text-slate-900 uppercase leading-tight mb-2 group-hover:text-theme-primary transition-colors">{task.title}</h3>
                    <p className="text-[10px] text-gray-400 font-medium leading-relaxed line-clamp-2 uppercase tracking-tighter">
                      {activeTab === 'rejected' ? `Issue: ${task.reason}` : task.desc}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-5 border-t border-gray-50 mt-6">
                   <div>
                      <p className="text-[12px] font-black text-emerald-600 leading-none">Rs. {task.reward}</p>
                      <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1.5 flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-slate-300" /> {task.estTime} Cycle
                      </p>
                   </div>
                   
                   {activeTab === 'available' ? (
                     <button 
                       onClick={() => navigate(`/do-task/${task.id}`)}
                       className="px-5 py-3 bg-slate-950 text-white rounded-2xl shadow-xl active:scale-95 transition-all flex items-center space-x-3 group-hover:bg-theme-primary"
                     >
                       <span className="text-[10px] font-black uppercase tracking-widest">Execute</span>
                       <ChevronRight className="w-4 h-4" />
                     </button>
                   ) : (
                     <div className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest border ${
                       task.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                       task.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                       'bg-amber-50 text-amber-600 border-amber-100'
                     }`}>
                       {task.status}
                     </div>
                   )}
                </div>
             </motion.div>
           ))}
         </AnimatePresence>
      </div>

      {filteredTasks.length === 0 && (
        <div className="py-24 text-center bg-white/30 border-2 border-dashed border-gray-100 rounded-[3rem] mx-1">
           <Target className="w-12 h-12 text-gray-100 mx-auto mb-4" />
           <p className="text-[11px] font-black text-gray-300 uppercase tracking-widest">No matching records found in this category.</p>
        </div>
      )}

      {/* Security Banner */}
      <div className="bg-slate-950 p-6 rounded-[2.5rem] flex items-start space-x-5 mx-1 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-theme-primary/10 rounded-full blur-2xl -mr-16 -mt-16" />
        <AlertCircle className="w-6 h-6 text-theme-primary shrink-0 mt-1" />
        <div className="space-y-1 relative z-10">
           <p className="text-[11px] font-black text-white uppercase tracking-tight">Assignment Verification Protocol</p>
           <p className="text-[9px] font-bold text-slate-400 leading-relaxed uppercase tracking-tight opacity-70">
             Audit nodes review all submissions within 2-4 hours. Intentional duplicates or low-quality captures will result in node cooling mode. Maintain 100% precision.
           </p>
        </div>
      </div>
    </div>
  );
};

export default DailyWork;