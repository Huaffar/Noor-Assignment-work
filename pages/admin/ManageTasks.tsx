import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  X, 
  Search,
  Clock,
  ShieldCheck,
  Power,
  Activity,
  Zap,
  Target,
  AlertCircle
} from 'lucide-react';

const ManageTasks: React.FC = () => {
  const [filter, setFilter] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [tasks, setTasks] = useState([
    { id: 'sub_1', userId: 'u_101', user: 'Ahmed Raza', plan: 'Gold', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800', time: '2h ago', status: 'Pending', rate: 240, taskType: 'Writing', isActive: true },
    { id: 'sub_2', userId: 'u_102', user: 'Sara Khan', plan: 'Basic', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800', time: '4h ago', status: 'Pending', rate: 100, taskType: 'Typing', isActive: true },
    { id: 'sub_3', userId: 'u_103', user: 'Umar Ahmed', plan: 'Diamond', image: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?q=80&w=800', time: '5h ago', status: 'Pending', rate: 450, taskType: 'Writing', isActive: false },
  ]);

  const toggleTaskState = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isActive: !t.isActive } : t));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => t.status === filter && t.user.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [tasks, filter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto pb-20 px-1 space-y-4 scale-[0.98] origin-top">
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mx-1 flex flex-col md:flex-row justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-950 text-white shadow-lg">
            <ShieldCheck className="w-5 h-5 text-theme-primary" />
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-900 uppercase">Audit Terminal</h1>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-1">Payload Manager: {filter}</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-300" />
          <input 
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)} 
            placeholder="Search Worker ID..." 
            className="bg-gray-50 border border-gray-100 rounded-lg py-1.5 pl-8 pr-3 text-[10px] font-black uppercase outline-none focus:border-theme-primary w-full md:w-44" 
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-gray-100 p-0.5 rounded-xl mx-2 border border-gray-200">
        {['Pending', 'Approved', 'Rejected'].map(s => (
          <button 
            key={s} onClick={() => setFilter(s as any)}
            className={`flex-1 py-2 rounded-lg text-[8px] font-black uppercase transition-all ${filter === s ? 'bg-white text-theme-primary shadow-sm' : 'text-gray-400'}`}
          >
            {s} Queue
          </button>
        ))}
      </div>

      {/* Grid of Submissions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 px-1">
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task) => (
            <motion.div 
              key={task.id} 
              layout 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group transition-all ${!task.isActive ? 'grayscale opacity-70' : ''}`}
            >
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <img src={task.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt="Work" />
                <div className="absolute top-2 left-2 flex gap-1">
                   <div className="px-2 py-0.5 bg-slate-900/80 text-[6px] text-white font-black rounded uppercase tracking-tighter">{task.taskType}</div>
                   {!task.isActive && <div className="px-2 py-0.5 bg-rose-600 text-white text-[6px] font-black rounded uppercase">Paused</div>}
                </div>
                {/* Status Toggle Button Overlay */}
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleTaskState(task.id); }}
                  className={`absolute top-2 right-2 p-1.5 rounded-lg shadow-lg border transition-all ${task.isActive ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                >
                  <Power className="w-3 h-3" />
                </button>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div className="mb-3">
                  <h3 className="text-[10px] font-black text-slate-900 uppercase truncate leading-none mb-1.5">{task.user}</h3>
                  <div className="flex justify-between items-center text-[7px] font-bold text-gray-400 uppercase">
                    <span>{task.plan} Node</span>
                    <span className="text-emerald-600 font-black">Rs. {task.rate}</span>
                  </div>
                </div>

                <div className="flex gap-1.5">
                  <button className="p-2 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all"><X className="w-3.5 h-3.5" /></button>
                  <button className="flex-1 py-1.5 bg-slate-950 text-white rounded-lg font-black text-[8px] uppercase tracking-widest hover:bg-emerald-600">Approve</button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTasks.length === 0 && (
        <div className="p-20 text-center flex flex-col items-center">
           <AlertCircle className="w-10 h-10 text-gray-100 mb-4" />
           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">No entries found in this node.</p>
        </div>
      )}
    </div>
  );
};

export default ManageTasks;
