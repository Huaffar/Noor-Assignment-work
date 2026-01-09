import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  X, 
  Maximize2, 
  Filter,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Search,
  Eye,
  ArrowUpRight,
  TrendingUp,
  FileText,
  Clock,
  ShieldCheck,
  ChevronDown,
  Loader2,
  Download,
  AlertTriangle
} from 'lucide-react';
import { approveTask, rejectTask, getAuditAnalytics } from '../../api/controllers/adminController';

const ManageTasks: React.FC = () => {
  const [filter, setFilter] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [analytics, setAnalytics] = useState<any>(null);
  const [rejectionModal, setRejectionModal] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  
  const [tasks, setTasks] = useState([
    { id: 'sub_1', userId: 'u_101', user: 'Ahmed Raza', plan: 'Gold', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800', time: '2h ago', status: 'Pending', rate: 240, taskType: 'Writing' },
    { id: 'sub_2', userId: 'u_102', user: 'Sara Khan', plan: 'Basic', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800', time: '4h ago', status: 'Pending', rate: 100, taskType: 'Typing' },
    { id: 'sub_3', userId: 'u_103', user: 'Umar Ahmed', plan: 'Diamond', image: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?q=80&w=800', time: '5h ago', status: 'Pending', rate: 450, taskType: 'Writing' },
    { id: 'sub_4', userId: 'u_104', user: 'Zainab Bibi', plan: 'Gold', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800', time: '6h ago', status: 'Pending', rate: 240, taskType: 'Writing' },
    { id: 'sub_5', userId: 'u_105', user: 'Bilal Malik', plan: 'Standard', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800', time: 'Today', status: 'Pending', rate: 150, taskType: 'Typing' },
  ]);

  useEffect(() => {
    getAuditAnalytics().then(setAnalytics);
  }, []);

  const handleApprove = async (task: any) => {
    await approveTask(task.userId, task.id, task.rate);
    setTasks(tasks.map(t => t.id === task.id ? { ...t, status: 'Approved' } : t));
  };

  const handleReject = async () => {
    if (!rejectionModal || !rejectionReason) return;
    await rejectTask(rejectionModal.userId, rejectionModal.id, rejectionReason);
    setTasks(tasks.map(t => t.id === rejectionModal.id ? { ...t, status: 'Rejected' } : t));
    setRejectionModal(null);
    setRejectionReason('');
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => t.status === filter && t.user.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [tasks, filter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto pb-20 px-1 space-y-4 scale-[0.98] origin-top">
      {/* Top Identity Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 rounded-[1.5rem] border border-pink-50 shadow-sm mx-1">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-slate-950 text-pink-500 shadow-md">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs font-black text-slate-900 uppercase leading-none tracking-tight">Audit Terminal</h1>
            <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-1">Operational Yield Verification</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
             <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
             <input 
               value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
               placeholder="Find Node..." 
               className="bg-gray-50 border border-gray-100 rounded-lg py-1.5 pl-8 pr-3 text-[10px] font-black uppercase outline-none focus:border-pink-300 w-36 shadow-inner" 
             />
          </div>
          <button className="p-2 bg-slate-950 text-white rounded-lg shadow-lg active:scale-90 transition-all"><Download className="w-3 h-3" /></button>
        </div>
      </div>

      {/* Analytics Matrix - Compact */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-1">
        {[
          { label: 'Pending Audits', val: analytics?.todayStats.pending || '0', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Approval Velocity', val: `${analytics?.approvalRate || '0'}%`, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Total Rewarded', val: `Rs. ${(analytics?.totalRewarded / 1000).toFixed(1)}k`, icon: CheckCircle2, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Today Yield', val: `Rs. ${analytics?.todayStats.yield || '0'}`, icon: BarChart3, color: 'text-rose-500', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-3.5 rounded-[1.8rem] border border-pink-50 shadow-sm flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
              <h3 className="text-[13px] font-black text-slate-900 leading-none">{stat.val}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Global Filter Station */}
      <div className="flex items-center justify-between px-2">
         <div className="flex bg-gray-100 p-0.5 rounded-xl border border-gray-200">
           {['Pending', 'Approved', 'Rejected'].map(s => (
             <button 
               key={s} onClick={() => setFilter(s as any)}
               className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase transition-all ${filter === s ? 'bg-white text-pink-600 shadow-sm' : 'text-slate-400'}`}
             >
               {s}
             </button>
           ))}
         </div>
         <div className="flex items-center space-x-1.5 opacity-40 grayscale group hover:opacity-100 hover:grayscale-0 transition-all cursor-help">
            <AlertTriangle className="w-3 h-3 text-amber-500" />
            <span className="text-[7px] font-black text-slate-900 uppercase">Audit Integrity Protocol Active</span>
         </div>
      </div>

      {/* Grid of Compact Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-1">
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:border-pink-300 transition-all"
            >
              <div className="relative aspect-video bg-slate-900 overflow-hidden">
                <img src={task.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt="Proof" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <button 
                  onClick={() => setSelectedImage(task.image)}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                >
                  <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-lg text-white"><Eye className="w-3.5 h-3.5" /></div>
                </button>
                <div className="absolute top-1.5 left-1.5">
                   <div className="bg-slate-900/80 backdrop-blur-sm text-white text-[5px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest border border-white/10">
                     {task.taskType}
                   </div>
                </div>
              </div>

              <div className="p-3 space-y-2.5">
                <div className="min-w-0">
                  <h3 className="text-[9px] font-black text-slate-900 uppercase truncate leading-none mb-1">{task.user}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] font-bold text-slate-300 uppercase">{task.plan} Node</span>
                    <span className="text-[9px] font-black text-emerald-600">Rs. {task.rate}</span>
                  </div>
                </div>

                {task.status === 'Pending' ? (
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setRejectionModal(task)}
                      className="flex-1 py-1.5 bg-gray-50 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg font-black text-[7px] uppercase transition-all"
                    >
                      <X className="w-3 h-3 mx-auto" />
                    </button>
                    <button 
                      onClick={() => handleApprove(task)}
                      className="flex-[2.5] py-1.5 bg-slate-950 text-white hover:bg-emerald-600 rounded-lg font-black text-[7px] uppercase shadow-md transition-all flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 mr-1" /> VERIFY
                    </button>
                  </div>
                ) : (
                  <div className={`p-1 rounded-lg border text-center ${task.status === 'Approved' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
                    <p className="text-[6px] font-black uppercase tracking-widest leading-none py-0.5">{task.status}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTasks.length === 0 && (
         <div className="py-24 text-center">
            <ShieldCheck className="w-12 h-12 text-slate-100 mx-auto mb-4" />
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">Audit Cluster Synchronized</p>
         </div>
      )}

      {/* Rejection Logic Modal */}
      <AnimatePresence>
        {rejectionModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setRejectionModal(null)} />
            <motion.div 
              initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-[340px] bg-white rounded-[2rem] p-8 shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="flex items-center space-x-3 mb-6">
                 <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shadow-inner"><AlertCircle className="w-6 h-6" /></div>
                 <div>
                    <h2 className="text-base font-black text-slate-900 uppercase tracking-tighter leading-none">Denial Logic</h2>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">Assignment Rejection Node</p>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="space-y-1.5">
                    <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Select Discrepancy</label>
                    <div className="grid grid-cols-1 gap-2">
                       {[
                         "Illegible Handwriting",
                         "Low Contrast Capture",
                         "Duplicate Payload Detected",
                         "Incomplete Transcription",
                         "Incorrect Topic Sequence"
                       ].map(r => (
                         <button 
                           key={r} onClick={() => setRejectionReason(r)}
                           className={`p-2.5 rounded-xl border text-left text-[9px] font-bold uppercase transition-all ${rejectionReason === r ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-inner' : 'bg-gray-50 border-gray-100 text-gray-400'}`}
                         >
                           {r}
                         </button>
                       ))}
                    </div>
                 </div>

                 <textarea 
                   value={rejectionReason} onChange={e => setRejectionReason(e.target.value)}
                   className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-[10px] font-bold outline-none focus:border-rose-400 h-20 resize-none" 
                   placeholder="Or type manual reason..."
                 />

                 <div className="flex gap-2 pt-2">
                    <button onClick={() => setRejectionModal(null)} className="flex-1 py-3 bg-gray-100 text-gray-400 font-black rounded-xl text-[9px] uppercase tracking-widest">Cancel</button>
                    <button 
                      onClick={handleReject} disabled={!rejectionReason}
                      className="flex-[2] py-3 bg-rose-600 text-white font-black rounded-xl text-[9px] uppercase tracking-[0.2em] shadow-xl shadow-rose-200 active:scale-95 disabled:opacity-50"
                    >
                      COMMIT REJECTION
                    </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Image Viewport */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={selectedImage} className="max-h-[90vh] max-w-full rounded-xl shadow-2xl border-4 border-white/5" />
            <button className="absolute top-8 right-8 text-white p-3 bg-white/10 rounded-full hover:bg-rose-600 transition-all"><X className="w-5 h-5" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageTasks;