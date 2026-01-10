import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  X, 
  Filter,
  CheckCircle2,
  BarChart3,
  Search,
  Eye,
  TrendingUp,
  Clock,
  ShieldCheck,
  Download,
  Target,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { approveTask, rejectTask, getAuditAnalytics } from '../../api/controllers/adminController';

const ManageTasks: React.FC = () => {
  const [filter, setFilter] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [analytics, setAnalytics] = useState<any>({
    todayStats: { pending: 0, approved: 0, rejected: 0, yield: 0 },
    approvalRate: 0,
    totalRewarded: 0
  });
  
  const [tasks, setTasks] = useState([
    { id: 'sub_1', userId: 'u_101', user: 'Ahmed Raza', plan: 'Gold', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800', time: '2h ago', status: 'Pending', rate: 240, taskType: 'Writing' },
    { id: 'sub_2', userId: 'u_102', user: 'Sara Khan', plan: 'Basic', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800', time: '4h ago', status: 'Pending', rate: 100, taskType: 'Typing' },
    { id: 'sub_3', userId: 'u_103', user: 'Umar Ahmed', plan: 'Diamond', image: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?q=80&w=800', time: '5h ago', status: 'Pending', rate: 450, taskType: 'Writing' },
  ]);

  useEffect(() => {
    refreshAnalytics();
  }, [tasks]);

  const refreshAnalytics = async () => {
    const data = await getAuditAnalytics();
    // Dynamically update based on local state to ensure real-time feel
    const pending = tasks.filter(t => t.status === 'Pending').length;
    const approved = tasks.filter(t => t.status === 'Approved').length;
    const rejected = tasks.filter(t => t.status === 'Rejected').length;
    
    setAnalytics({
      ...data,
      todayStats: {
        pending,
        approved: data.todayStats.approved + approved,
        rejected: data.todayStats.rejected + rejected,
        yield: data.todayStats.yield + (approved * 240)
      }
    });
  };

  const handleApprove = async (task: any) => {
    await approveTask(task.userId, task.id, task.rate);
    setTasks(tasks.map(t => t.id === task.id ? { ...t, status: 'Approved' } : t));
  };

  const handleReject = async (task: any) => {
    if(!confirm("Task reject kar dein?")) return;
    await rejectTask(task.userId, task.id, "Audit failed");
    setTasks(tasks.map(t => t.id === task.id ? { ...t, status: 'Rejected' } : t));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => t.status === filter && t.user.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [tasks, filter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto pb-20 px-1 space-y-4 scale-[0.98] origin-top">
      {/* Identity Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mx-1">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-950 text-white shadow-lg">
            <ShieldCheck className="w-5 h-5 text-theme-primary" />
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-900 uppercase leading-none">Review Center</h1>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Audit of Personnel Submissions</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-300" />
             <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search Entity..." className="bg-gray-50 border border-gray-100 rounded-lg py-1.5 pl-8 pr-3 text-[10px] font-black uppercase outline-none focus:border-theme-primary w-40" />
          </div>
          <button className="p-2.5 bg-slate-950 text-white rounded-xl shadow-lg"><Download className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Analytics cluster connected */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-1">
        {[
          { label: 'Waiting List', val: analytics.todayStats.pending, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Total Approved', val: analytics.todayStats.approved, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Total Rejected', val: analytics.todayStats.rejected, icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
          { label: 'Audit Rate', val: `${analytics.approvalRate}%`, icon: Target, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-gray-50 shadow-sm space-y-3 group hover:border-theme-primary/30 transition-all">
            <div className={`w-9 h-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[12px] font-black text-slate-900 leading-none">{stat.val}</p>
              <p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mt-1.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex bg-gray-100 p-0.5 rounded-xl mx-2 border border-gray-200">
        {['Pending', 'Approved', 'Rejected'].map(s => (
          <button 
            key={s} onClick={() => setFilter(s as any)}
            className={`flex-1 py-2 rounded-lg text-[8px] font-black uppercase transition-all ${filter === s ? 'bg-white text-theme-primary shadow-sm' : 'text-gray-400'}`}
          >
            {s} Node
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-1 pb-10">
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task) => (
            <motion.div key={task.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl border border-gray-50 shadow-sm overflow-hidden flex flex-col group transition-all border-b-4 hover:border-theme-primary">
              <div className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer" onClick={() => setSelectedImage(task.image)}>
                <img src={task.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt="Work" />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 text-[6px] text-white font-black rounded uppercase">{task.taskType}</div>
              </div>

              <div className="p-3.5 space-y-3">
                <div className="min-w-0">
                  <h3 className="text-[10px] font-black text-slate-900 uppercase truncate mb-1">{task.user}</h3>
                  <div className="flex justify-between items-center text-[7px] font-bold text-gray-400 uppercase">
                    <span>{task.plan} Hub</span>
                    <span className="text-emerald-600 font-black">Rs. {task.rate}</span>
                  </div>
                </div>

                {task.status === 'Pending' ? (
                  <div className="flex gap-1.5">
                    <button onClick={() => handleReject(task)} className="p-1.5 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all"><X className="w-4 h-4" /></button>
                    <button onClick={() => handleApprove(task)} className="flex-1 py-1.5 bg-slate-950 text-white rounded-lg font-black text-[8px] uppercase tracking-widest transition-all hover:bg-emerald-600">Pay Node</button>
                  </div>
                ) : (
                  <div className={`py-1.5 rounded-lg border text-center font-black text-[7px] uppercase tracking-widest ${task.status === 'Approved' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
                    {task.status} State
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTasks.length === 0 && (
         <div className="py-20 text-center flex flex-col items-center">
            <Target className="w-10 h-10 text-gray-100 mb-4" />
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No matching nodes found</p>
         </div>
      )}

      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <img src={selectedImage} className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl border border-white/10" alt="Zoom" />
            <button className="absolute top-6 right-6 text-white p-2 bg-white/10 rounded-full"><X className="w-6 h-6" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageTasks;