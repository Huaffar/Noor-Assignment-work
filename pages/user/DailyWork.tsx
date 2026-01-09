import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Upload, 
  ImageIcon, 
  Loader2, 
  Send,
  Zap,
  BookOpen,
  History,
  Smartphone,
  ShieldCheck,
  Moon,
  Lock,
  ArrowRight,
  ShieldAlert,
  Target,
  FileText,
  Keyboard,
  PenTool,
  X,
  Database
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
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState(new Date());

  const hasNoPlan = !user?.currentPlan || user?.currentPlan === 'None' || (user?.planStatus !== 'active' && user?.planStatus !== 'Approved');

  useEffect(() => {
    if (hasNoPlan) {
      setLoading(false);
      return;
    }

    fetchAssignment();
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
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

  const handleCopy = () => {
    if (workState?.topic?.content) {
      navigator.clipboard.writeText(workState.topic.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFile(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || hasNoPlan) return;
    setIsSubmitting(true);
    try {
      await submitWork(user?.id || 'demo', workState.topic.id, file, user);
      
      Swal.fire({
        title: 'Work Securely Stored',
        text: 'Assignment payload synced to our secure storage nodes.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        background: '#fff',
        color: '#0f172a'
      });

      fetchAssignment();
      setFile(null);
    } catch (err: any) {
      Swal.fire({
        title: 'Sync Protocol Failure',
        text: err.message,
        icon: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format?.toLowerCase()) {
      case 'handwritten': return <PenTool className="w-4 h-4" />;
      case 'pdf': return <FileText className="w-4 h-4" />;
      case 'typed': return <Keyboard className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 rounded-xl border-4 border-rose-100 border-t-rose-600 animate-spin mb-4" />
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Syncing Assignment Hub...</p>
    </div>
  );

  if (hasNoPlan) {
    return (
      <div className="max-w-xs mx-auto py-12 px-4 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 rounded-[2.5rem] border border-rose-100 shadow-xl relative overflow-hidden">
          <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-[1.8rem] flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Node Locked</h1>
          <p className="text-gray-500 text-[11px] font-bold mb-8 leading-relaxed uppercase tracking-tight">
            Active Earning Tier Required.
          </p>
          <button onClick={() => navigate('/upgrade')} className="w-full py-4 bg-slate-950 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest shadow-lg active:scale-95 transition-all">
            Upgrade Membership
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-24 px-1 space-y-4 scale-[0.98] origin-top">
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center space-x-2">
           <div className="w-8 h-8 bg-slate-950 rounded-lg flex items-center justify-center shadow-lg border border-slate-800">
             <Target className="w-4 h-4 text-rose-600" />
           </div>
           <h1 className="text-sm font-black text-gray-900 uppercase">Work Station</h1>
        </div>
        <div className="bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 flex items-center space-x-2 shadow-sm">
           <Zap className="w-3 h-3 text-rose-600 animate-pulse" />
           <span className="text-[8px] font-black text-rose-600 uppercase">
             Capacity: {workState?.topic?.pagesSubmitted + 1} / {workState?.topic?.pagesAllowed}
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mx-1">
        {/* Left Col: Assignment View */}
        <div className="md:col-span-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 bg-[#FCFCFA] border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center space-x-2 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800 text-white shadow-lg">
                 {getFormatIcon(workState?.topic?.format || 'Handwritten')}
                 <span className="text-[7px] font-black uppercase tracking-widest">{workState?.topic?.format || 'Handwritten'} Mode</span>
               </div>
               <button onClick={handleCopy} className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase transition-all ${copied ? 'bg-emerald-50 text-emerald-600' : 'bg-white border border-gray-200 text-gray-400'}`}>
                 {copied ? 'Copied' : 'Copy'}
               </button>
            </div>
            <h2 className="text-base font-black text-gray-900 mb-3 uppercase tracking-tight">{workState?.topic?.title}</h2>
            <div className="p-4 bg-white rounded-xl border border-gray-50 shadow-inner max-h-[200px] overflow-y-auto">
               <p className="text-[11.5px] font-bold text-gray-600 leading-relaxed italic">"{workState?.topic?.content}"</p>
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col justify-center">
             <div className="space-y-4">
                <div className="flex items-center space-x-3 text-rose-600 mb-2">
                   <ShieldCheck className="w-4 h-4" />
                   <p className="text-[8px] font-black uppercase tracking-widest">Protocol Instructions</p>
                </div>
                <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase">
                  {workState?.topic?.format === 'Handwritten' 
                    ? "Carefully copy the text above onto A4 paper. Ensure handwriting is legible and well-spaced. Use a blue or black pen for maximum contrast."
                    : workState?.topic?.format === 'PDF'
                    ? "Compile your research and findings into a standard PDF node and upload the snapshot here for audit."
                    : "Type the transcription node precisely using our digital terminal format. Accuracy is critical for verification."
                  }
                </p>
             </div>
          </div>
        </div>

        {/* Right Col: Reference & Action */}
        <div className="md:col-span-4 space-y-4">
           {workState?.topic?.image && (
             <div className="bg-white p-3 rounded-[2rem] border border-gray-100 shadow-sm">
                <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-2 px-2 text-center">Visual Reference</p>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-gray-100 shadow-inner group relative">
                   <img src={workState.topic.image} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Target className="w-5 h-5 text-white" />
                   </div>
                </div>
             </div>
           )}

           <form onSubmit={handleSubmit} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-center space-x-2 mb-1">
                 <Database className="w-3 h-3 text-rose-500" />
                 <p className="text-[8px] font-black text-gray-900 uppercase tracking-widest text-center">Cloud Storage Node</p>
              </div>
              <div 
                onClick={() => !file && document.getElementById('work-upload')?.click()}
                className={`p-5 rounded-[1.5rem] border border-dashed flex flex-col items-center justify-center space-y-3 cursor-pointer group transition-all ${
                  file ? 'bg-emerald-50/20 border-emerald-200' : 'bg-rose-50/20 border-rose-100 hover:bg-rose-100/30'
                }`}
              >
                <input type="file" id="work-upload" hidden accept="image/*" onChange={onFileChange} />
                {!file ? (
                  <>
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rose-500 shadow-sm group-hover:scale-110 transition-transform"><Upload className="w-5 h-5" /></div>
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest text-center">Attach Work Asset</p>
                    <p className="text-[6px] font-bold text-gray-300 uppercase">JPEG / PNG / PDF</p>
                  </>
                ) : (
                  <div className="w-full">
                    <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-white shadow-xl">
                        <img src={file} className="w-full h-full object-cover" alt="Proof" />
                        <button type="button" onClick={(e) => {e.stopPropagation(); setFile(null);}} className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-lg active:scale-90 transition-transform"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                )}
              </div>

              <button disabled={isSubmitting || !file} className="w-full py-4 bg-slate-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center group">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />}
                Sync Payload
              </button>
           </form>

           <div className="bg-slate-950 p-4 rounded-[1.8rem] text-center border border-slate-800 shadow-xl">
              <p className="text-[7px] font-black text-pink-500 uppercase tracking-widest mb-1.5">Trace Integrity Active</p>
              <div className="flex items-center justify-center space-x-1.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[8px] font-black text-white uppercase tracking-tighter">NODE_SYNC_{Math.floor(Math.random()*10000)}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DailyWork;