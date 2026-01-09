
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  BookOpen, 
  Trash2, 
  FileText,
  Activity,
  Zap,
  TrendingUp,
  Edit3,
  X,
  Target,
  CheckCircle2,
  AlertCircle,
  Type,
  Layout,
  ImageIcon,
  ArrowUpRight,
  Filter,
  Eye,
  Calendar,
  ShieldCheck,
  MousePointer2,
  // Added missing Clock icon import
  Clock
} from 'lucide-react';

const WorkManager: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([
    { 
      id: 't1', title: 'Transcription Protocol v4', reward: 240, category: 'Writing', plan: 'Gold Package', status: 'Active',
      format: 'Handwritten', instructions: 'Copy the provided Urdu text onto A4 paper clearly.', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800',
      analytics: { total: 1240, approved: 1100, rejected: 80, pending: 60 }
    },
    { 
      id: 't2', title: 'Economic Sentiment Analysis', reward: 350, category: 'Typing', plan: 'Diamond Pro', status: 'Active',
      format: 'Typed', instructions: 'Type a 300-word response to the current market trends.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800',
      analytics: { total: 540, approved: 490, rejected: 30, pending: 20 }
    }
  ]);

  const [editingTask, setEditingTask] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);

  const statsSummary = useMemo(() => {
    const total = tasks.reduce((acc, t) => acc + t.analytics.total, 0);
    const approved = tasks.reduce((acc, t) => acc + t.analytics.approved, 0);
    return {
      total,
      velocity: total > 0 ? ((approved / total) * 100).toFixed(1) : 0
    };
  }, [tasks]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask.id) {
      setTasks(tasks.map(t => t.id === editingTask.id ? { ...editingTask, image: tempImage || editingTask.image } : t));
    } else {
      setTasks([{ ...editingTask, id: 't' + Date.now(), status: 'Active', analytics: { total: 0, approved: 0, rejected: 0, pending: 0 }, image: tempImage }, ...tasks]);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="max-w-7xl mx-auto pb-24 space-y-6 px-1 scale-[0.98] origin-top">
      {/* Global Mission Control Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
         {[
           { label: 'Network Throughput', val: statsSummary.total.toLocaleString(), color: 'text-slate-900', icon: Activity, bg: 'bg-slate-50' },
           { label: 'Integrity Velocity', val: `${statsSummary.velocity}%`, color: 'text-emerald-600', icon: ShieldCheck, bg: 'bg-emerald-50' },
           { label: 'Active Payloads', val: tasks.length, color: 'text-rose-600', icon: Zap, bg: 'bg-rose-50' },
           { label: 'Audit Queue', val: tasks.reduce((acc, t) => acc + t.analytics.pending, 0), color: 'text-amber-600', icon: Clock, bg: 'bg-amber-50' },
         ].map((stat, i) => (
           <div key={i} className={`${stat.bg} p-5 rounded-[2rem] border border-black/5 shadow-sm`}>
             <div className="flex justify-between items-start mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color} opacity-60`} />
                <span className="text-[7px] font-black bg-white/50 px-1.5 py-0.5 rounded text-gray-400 uppercase tracking-widest">Global Hub</span>
             </div>
             <p className="text-2xl font-black text-slate-900 leading-none">{stat.val}</p>
             <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-2">{stat.label}</p>
           </div>
         ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-3 bg-white p-5 rounded-[2rem] border border-pink-50 shadow-sm mx-1">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center border border-slate-800 shadow-2xl">
            <Target className="w-6 h-6 text-rose-500" />
          </div>
          <div>
            <h1 className="text-base font-black text-slate-900 leading-none uppercase tracking-tighter">Assignment CMS</h1>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-1.5">Network Payload Deployment Terminal</p>
          </div>
        </div>
        <button 
          onClick={() => { setEditingTask({ title: '', reward: 240, plan: 'Basic', format: 'Handwritten', instructions: '' }); setTempImage(null); setIsModalOpen(true); }}
          className="px-6 py-3 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-rose-100 active:scale-95 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" /> Inject Daily Work
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 px-2">
        {tasks.map((task) => {
          const successRate = task.analytics.total > 0 ? ((task.analytics.approved / task.analytics.total) * 100).toFixed(1) : "0";
          return (
            <motion.div layout key={task.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:border-rose-200 transition-all hover:shadow-xl relative">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-5">
                    <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shadow-inner group-hover:bg-rose-600 group-hover:text-white transition-all duration-500">
                      <BookOpen className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 uppercase leading-none mb-2">{task.title}</h3>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[7px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 uppercase tracking-widest">Rs. {task.reward} Yield</span>
                        <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">{task.plan}</span>
                        <span className="text-[7px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">{task.format}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-[7px] font-black uppercase tracking-widest border animate-pulse ${task.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                    {task.status}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                   <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 text-center shadow-inner">
                      <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-1">Submissions</p>
                      <p className="text-base font-black text-slate-900 leading-none">{task.analytics.total}</p>
                   </div>
                   <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-center shadow-inner">
                      <p className="text-[7px] font-black text-emerald-600 uppercase tracking-widest mb-1">Approved</p>
                      <p className="text-base font-black text-emerald-600 leading-none">{successRate}%</p>
                   </div>
                   <div className="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100 text-center shadow-inner">
                      <p className="text-[7px] font-black text-rose-600 uppercase tracking-widest mb-1">Rejection</p>
                      <p className="text-base font-black text-rose-600 leading-none">{(100-Number(successRate)).toFixed(1)}%</p>
                   </div>
                </div>

                <div className="space-y-2">
                   <div className="flex items-center justify-between text-[7px] font-black uppercase tracking-widest px-1">
                      <span className="text-gray-400">Node Sync Integrity</span>
                      <span className="text-slate-900">{successRate}% Verified</span>
                   </div>
                   <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden shadow-inner relative">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${successRate}%` }} className="h-full bg-gradient-to-r from-pink-500 to-rose-600 rounded-full" />
                   </div>
                </div>
              </div>

              <div className="mt-auto bg-slate-950 p-4 flex items-center justify-between">
                <div className="flex space-x-2">
                  <button onClick={() => { setEditingTask(task); setTempImage(task.image); setIsModalOpen(true); }} className="p-2.5 bg-white/5 hover:bg-white/10 text-rose-500 rounded-xl transition-all border border-white/10 active:scale-90"><Edit3 className="w-4 h-4" /></button>
                  <button className="p-2.5 bg-white/5 hover:bg-rose-600 text-gray-400 hover:text-white rounded-xl transition-all border border-white/10 active:scale-90"><Trash2 className="w-4 h-4" /></button>
                </div>
                <div className="text-right">
                   <p className="text-[7px] font-black text-rose-500 uppercase tracking-widest leading-none mb-1.5">NODE_ID</p>
                   <p className="text-[9px] font-black text-white/40 uppercase truncate max-w-[120px]">{task.id}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {isModalOpen && editingTask && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-[440px] bg-white rounded-[3rem] p-8 shadow-2xl overflow-y-auto max-h-[90vh] border border-white/20"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                   <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shadow-inner"><Target className="w-6 h-6" /></div>
                   <div>
                      <h2 className="text-base font-black text-slate-900 uppercase tracking-tighter leading-none">Payload Config</h2>
                      <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">Modify Assignment Parameters</p>
                   </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-rose-600 transition-colors"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                 <div className="space-y-1">
                    <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Title Sequence</label>
                    <input required value={editingTask.title} onChange={e => setEditingTask({...editingTask, title: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-5 font-black text-xs outline-none focus:border-rose-400 shadow-inner" placeholder="E.g. Transcription #42" />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Yield/Unit (PKR)</label>
                       <input type="number" required value={editingTask.reward} onChange={e => setEditingTask({...editingTask, reward: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-5 font-black text-xs outline-none focus:border-rose-400 shadow-inner" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Tier Scope</label>
                       <select value={editingTask.plan} onChange={e => setEditingTask({...editingTask, plan: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-5 font-black text-[9px] uppercase outline-none focus:border-rose-400 shadow-inner">
                          <option>Basic</option>
                          <option>Gold Package</option>
                          <option>Diamond Pro</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Assignment Format</label>
                    <div className="flex bg-gray-100 p-1 rounded-xl gap-1 border border-black/5">
                       {['Handwritten', 'PDF', 'Typed'].map(f => (
                         <button 
                           key={f} type="button" onClick={() => setEditingTask({...editingTask, format: f})}
                           className={`flex-1 py-2.5 rounded-lg text-[9px] font-black uppercase transition-all ${editingTask.format === f ? 'bg-white text-rose-600 shadow-sm border border-gray-200' : 'text-slate-400'}`}
                         >
                           {f}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-1">
                    <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Instructions (UR/EN)</label>
                    <textarea value={editingTask.instructions} onChange={e => setEditingTask({...editingTask, instructions: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 font-medium text-[11px] outline-none h-32 resize-none focus:border-rose-400 shadow-inner" placeholder="Detailed assignment instructions for nodes..." />
                 </div>

                 <div className="space-y-1">
                    <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Visual Anchor (Reference Image)</label>
                    <div 
                      onClick={() => document.getElementById('cms-img-up')?.click()}
                      className="border-2 border-dashed border-gray-100 rounded-2xl aspect-video bg-gray-50 flex flex-col items-center justify-center cursor-pointer group hover:bg-rose-50/50 hover:border-rose-200 transition-all overflow-hidden shadow-inner"
                    >
                       {tempImage ? (
                         <img src={tempImage} className="w-full h-full object-cover" />
                       ) : (
                         <>
                           <ImageIcon className="w-8 h-8 text-gray-300 group-hover:text-rose-500 mb-2" />
                           <p className="text-[9px] font-black text-gray-400 uppercase">Attach Reference Payload</p>
                         </>
                       )}
                       <input id="cms-img-up" type="file" hidden onChange={e => {
                         const file = e.target.files?.[0];
                         if (file) {
                           const reader = new FileReader();
                           reader.onload = () => setTempImage(reader.result as string);
                           reader.readAsDataURL(file);
                         }
                       }} />
                    </div>
                 </div>

                 <button className="w-full py-5 bg-slate-950 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:bg-rose-600 active:scale-95 transition-all">
                   Deploy Synchronized Node
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkManager;
