
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
  Image as ImageIcon,
  CheckCircle2,
  Lock,
  RefreshCw,
  Trash2,
  History,
  Filter,
  Check,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getDailyAssignment, submitWork } from '../../api/controllers/taskController';

declare const Swal: any;

const DailyWork: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [workState, setWorkState] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const [historyFilter, setHistoryFilter] = useState<'All' | 'Approved' | 'Pending'>('All');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockHistory = [
    { id: 'SUB_421', status: 'Approved', reward: 240, date: 'Today, 11:45 AM' },
    { id: 'SUB_399', status: 'Pending', reward: 240, date: 'Today, 09:20 AM' },
    { id: 'SUB_388', status: 'Rejected', reward: 0, date: 'Yesterday' },
  ];

  const filteredHistory = useMemo(() => {
    return mockHistory.filter(h => historyFilter === 'All' || h.status === historyFilter);
  }, [historyFilter]);

  const hasNoPlan = !user?.currentPlan || user?.currentPlan === 'None' || (user?.planStatus !== 'active' && user?.planStatus !== 'Approved');

  useEffect(() => {
    if (hasNoPlan) {
      setLoading(false);
      return;
    }
    fetchAssignment();
  }, [user, hasNoPlan]);

  const fetchAssignment = async () => {
    setLoading(true);
    const res = await getDailyAssignment(user?.id || 'demo', user);
    if (res.status === 'BLOCKED') {
      if (!hasNoPlan) {
         setWorkState(res);
         setLoading(false);
         return;
      }
      navigate('/upgrade');
      return;
    }
    setWorkState(res);
    setLoading(false);
  };

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      Swal.fire({ title: 'Invalid Logic', text: 'Upload valid image assets only.', icon: 'error' });
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setFile(reader.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || hasNoPlan) return;
    setIsSubmitting(true);
    try {
      await submitWork(user?.id || 'demo', workState.topic.id, file, user);
      Swal.fire({ title: 'Synced', text: 'Payload sent to audit node.', icon: 'success', timer: 1500, showConfirmButton: false });
      fetchAssignment();
      setFile(null);
    } catch (err: any) {
      Swal.fire({ title: 'Error', text: err.message, icon: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="max-w-xl mx-auto space-y-4 pb-24 px-1 scale-[0.98] origin-top">
      <div className="flex items-center justify-between px-2">
         <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl themed-gradient flex items-center justify-center shadow-lg"><Target className="w-5 h-5 text-white" /></div>
            <div>
               <h1 className="text-[14px] font-black text-slate-900 uppercase">Task Console</h1>
               <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Payload Deployment Zone</p>
            </div>
         </div>
         <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-white/5 flex items-center space-x-2">
           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
           <span className="text-[7px] font-black text-white uppercase tracking-widest">{workState?.topic?.pagesSubmitted} / {workState?.topic?.pagesAllowed} Nodes</span>
         </div>
      </div>

      <div className="space-y-4">
        {/* Compact Brief Card */}
        <div className="themed-card overflow-hidden">
           <div className="p-5 bg-theme-secondary/20 space-y-4">
              <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-2 bg-slate-950 text-white px-2.5 py-1 rounded-md">
                    <PenTool className="w-3 h-3" />
                    <span className="text-[7px] font-black uppercase">Urdu Script</span>
                 </div>
                 <button className="text-[8px] font-black text-theme-primary uppercase hover:underline">Reference ID #21</button>
              </div>
              <h2 className="text-sm font-black text-slate-900 uppercase leading-tight">{workState?.topic?.title}</h2>
              <div className="bg-white p-4 rounded-xl border border-gray-50 shadow-inner max-h-[120px] overflow-y-auto no-scrollbar">
                 <p className="text-[12px] font-medium text-slate-500 italic leading-relaxed">"{workState?.topic?.content}"</p>
              </div>
           </div>
        </div>

        {/* Action Node */}
        <form onSubmit={handleSubmit} className="themed-card p-5 space-y-5 relative overflow-hidden">
           <div 
             onClick={() => !file && fileInputRef.current?.click()}
             className={`relative aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${
               file ? 'border-emerald-500 bg-emerald-50/10' : 'border-gray-100 bg-gray-50 hover:bg-theme-secondary/5 cursor-pointer'
             }`}
           >
             <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
             <AnimatePresence mode="wait">
               {file ? (
                 <motion.div key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full relative group">
                    <img src={file} className="w-full h-full object-cover" alt="Proof" />
                    <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }} className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg"><X className="w-4 h-4" /></button>
                 </motion.div>
               ) : (
                 <div className="text-center space-y-2">
                    <Upload className="w-8 h-8 text-gray-300 mx-auto" />
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Attach Work Capture</p>
                 </div>
               )}
             </AnimatePresence>
           </div>
           
           <button disabled={isSubmitting || !file} className="w-full py-4 themed-gradient text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl active:scale-95 disabled:opacity-30 transition-all flex items-center justify-center group">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />}
              Dispatch Payload
           </button>
        </form>

        {/* History Ledger Section */}
        <div className="space-y-3">
           <div className="flex items-center justify-between px-2">
              <div className="flex items-center space-x-2">
                 <History className="w-3.5 h-3.5 text-gray-400" />
                 <h3 className="text-[9px] font-black text-slate-900 uppercase">Audit Records</h3>
              </div>
              <div className="flex space-x-1 bg-gray-100 p-0.5 rounded-lg border border-gray-200">
                 {['All', 'Approved', 'Pending'].map(s => (
                    <button key={s} onClick={() => setHistoryFilter(s as any)} className={`px-2 py-1 rounded-md text-[7px] font-black uppercase transition-all ${historyFilter === s ? 'bg-white text-theme-primary shadow-sm' : 'text-gray-400'}`}>{s}</button>
                 ))}
              </div>
           </div>

           <div className="space-y-1">
             {filteredHistory.map(item => (
               <div key={item.id} className="bg-white p-3 rounded-xl border border-gray-50 shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-inner ${item.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : item.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'}`}>
                        {item.status === 'Approved' ? <Check className="w-4 h-4" /> : item.status === 'Pending' ? <RefreshCw className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-900 leading-none mb-1 uppercase">{item.id}</p>
                        <p className="text-[7px] font-bold text-gray-400 uppercase tracking-tighter">{item.date}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-slate-900">Rs. {item.reward}</p>
                     <p className={`text-[6px] font-black uppercase ${item.status === 'Approved' ? 'text-emerald-500' : 'text-amber-500'}`}>{item.status}</p>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default DailyWork;
