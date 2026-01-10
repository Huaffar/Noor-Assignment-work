
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap,
  Target,
  PenTool,
  FileText,
  Keyboard,
  Upload,
  Send,
  Loader2,
  X,
  ShieldCheck,
  ImageIcon,
  CheckCircle2,
  Lock,
  RefreshCw,
  History,
  Filter,
  Check,
  AlertCircle,
  Search,
  CheckCircle,
  Clock,
  MousePointer2,
  // Fix: Added missing Activity icon import from lucide-react
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getDailyAssignment, submitWork } from '../../api/controllers/taskController';

declare const Swal: any;

const DailyWork: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter States
  const [typeFilter, setTypeFilter] = useState<'All' | 'Handwritten' | 'Typed' | 'Social'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Available' | 'Completed' | 'Pending'>('All');

  // Multi-Task Mock Data for Demonstration of Filtering
  const [tasks, setTasks] = useState<any[]>([
    { id: 'T-821', title: 'Urdu Transcription #42', reward: 240, type: 'Handwritten', status: 'Available', desc: 'Copy Urdu text clearly on A4 paper.', time: '20m' },
    { id: 'T-822', title: 'English Essay: Economy', reward: 350, type: 'Typed', status: 'Available', desc: 'Type a 300-word response to market trends.', time: '45m' },
    { id: 'T-823', title: 'Network Engagement', reward: 50, type: 'Social', status: 'Pending', desc: 'Verify community rules on WhatsApp.', time: '5m' },
    { id: 'T-824', title: 'Logic Verification', reward: 150, type: 'Handwritten', status: 'Completed', desc: 'Audit system logs manually.', time: '30m' },
  ]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchType = typeFilter === 'All' || task.type === typeFilter;
      const matchStatus = statusFilter === 'All' || task.status === statusFilter;
      return matchType && matchStatus;
    });
  }, [tasks, typeFilter, statusFilter]);

  useEffect(() => {
    // Initial Sync
    setTimeout(() => setLoading(false), 800);
  }, []);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      Swal.fire({ title: 'Invalid Logic', text: 'Upload valid image assets only.', icon: 'error' });
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setFile(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };

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
    <div className="max-w-xl mx-auto space-y-6 pb-24 px-1 scale-[0.98] origin-top">
      {/* Header Area */}
      <div className="flex items-center justify-between px-2">
         <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl themed-gradient flex items-center justify-center shadow-lg"><Target className="w-6 h-6 text-white" /></div>
            <div>
               <h1 className="text-[16px] font-black text-slate-900 uppercase leading-none">Task Console</h1>
               <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Payload Deployment Zone</p>
            </div>
         </div>
         <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-white/5 flex items-center space-x-2">
           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
           <span className="text-[8px] font-black text-white uppercase tracking-widest">Active System</span>
         </div>
      </div>

      {/* Filter Matrix */}
      <div className="themed-card p-4 space-y-4 shadow-sm border-gray-100">
         <div className="space-y-3">
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-1.5">
                  <Filter className="w-3 h-3 text-theme-primary" />
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Type Protocol</span>
               </div>
               <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100 space-x-1">
                  {['All', 'Handwritten', 'Typed', 'Social'].map(t => (
                    <button 
                      key={t} onClick={() => setTypeFilter(t as any)}
                      className={`px-3 py-1 rounded-md text-[7px] font-black uppercase transition-all ${typeFilter === t ? 'bg-slate-950 text-white shadow-md' : 'text-gray-400 hover:text-slate-600'}`}
                    >
                      {t}
                    </button>
                  ))}
               </div>
            </div>

            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-1.5">
                  <Activity className="w-3 h-3 text-theme-primary" />
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">State Ledger</span>
               </div>
               <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100 space-x-1">
                  {['All', 'Available', 'Pending', 'Completed'].map(s => (
                    <button 
                      key={s} onClick={() => setStatusFilter(s as any)}
                      className={`px-3 py-1 rounded-md text-[7px] font-black uppercase transition-all ${statusFilter === s ? 'bg-slate-950 text-white shadow-md' : 'text-gray-400 hover:text-slate-600'}`}
                    >
                      {s}
                    </button>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* Task List Ledger */}
      <div className="space-y-2">
         <AnimatePresence mode="popLayout">
           {filteredTasks.map((task) => (
             <motion.div 
               key={task.id}
               layout
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-theme-primary/30 transition-all"
             >
                <div className="flex items-center space-x-4 min-w-0">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                      task.type === 'Handwritten' ? 'bg-rose-50 text-rose-500' :
                      task.type === 'Typed' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'
                   }`}>
                      {task.type === 'Handwritten' ? <PenTool className="w-5 h-5" /> : 
                       task.type === 'Typed' ? <Keyboard className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                   </div>
                   <div className="min-w-0">
                      <h3 className="text-[12px] font-black text-slate-900 uppercase leading-none truncate mb-1.5">{task.title}</h3>
                      <div className="flex items-center space-x-2">
                         <span className="text-[9px] font-black text-emerald-600">Rs. {task.reward}</span>
                         <span className="text-gray-200 text-[10px]">|</span>
                         <span className="text-[7px] font-bold text-gray-400 uppercase">{task.time} Work</span>
                         <div className={`px-2 py-0.5 rounded-full text-[6px] font-black uppercase border ${
                            task.status === 'Available' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            task.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                            'bg-emerald-50 text-emerald-600 border-emerald-100'
                         }`}>
                            {task.status}
                         </div>
                      </div>
                   </div>
                </div>
                
                {task.status === 'Available' ? (
                  <button 
                    onClick={() => navigate(`/do-task/${task.id}`)}
                    className="p-3 bg-slate-950 text-white rounded-xl shadow-lg group-hover:bg-theme-primary transition-all active:scale-90"
                  >
                    <MousePointer2 className="w-4 h-4" />
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
             </motion.div>
           ))}
         </AnimatePresence>

         {filteredTasks.length === 0 && (
           <div className="py-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-200" />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">No assignments match filters</p>
              <button 
                onClick={() => { setTypeFilter('All'); setStatusFilter('All'); }}
                className="mt-4 text-[9px] font-black text-theme-primary uppercase hover:underline"
              >
                Reset Logic Console
              </button>
           </div>
         )}
      </div>

      {/* Safety Protocol Info */}
      <div className="bg-rose-50 border border-rose-100 p-4 rounded-[1.8rem] flex items-start space-x-3 mx-1">
        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
           <p className="text-[10px] font-black text-rose-900 uppercase tracking-tighter">Security Alert</p>
           <p className="text-[8px] font-bold text-rose-700 leading-relaxed uppercase tracking-tight">
             All task payloads are audited by human verified nodes. Any attempt to upload duplicate or non-compliant assets will trigger an <span className="text-rose-900 font-black">Account Lockdown</span>.
           </p>
        </div>
      </div>
    </div>
  );
};

export default DailyWork;
