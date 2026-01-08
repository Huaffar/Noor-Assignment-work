
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  BookOpen, 
  Trash2, 
  FileText,
  BarChart3,
  CheckCircle2,
  XCircle,
  Users,
  Clock,
  ChevronRight,
  Activity
} from 'lucide-react';

interface TaskAnalytics {
  total: number;
  approved: number;
  rejected: number;
  pending: number;
}

interface Task {
  id: string;
  title: string;
  reward: number;
  category: string;
  plan: string;
  instructions: string;
  sampleImage: string | null;
  status: 'Active' | 'Paused';
  analytics: TaskAnalytics;
}

const WorkManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'all'>('all');
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 't1', 
      title: 'Urdu Handwriting Practice', 
      reward: 150, 
      category: 'Handwriting', 
      plan: 'Student Bundle', 
      instructions: 'Copy text...', 
      sampleImage: null, 
      status: 'Active',
      analytics: { total: 1240, approved: 1100, rejected: 80, pending: 60 }
    },
    { 
      id: 't2', 
      title: 'English Essay: AI Future', 
      reward: 300, 
      category: 'Typing', 
      plan: 'Gold Package', 
      instructions: 'Write essay...', 
      sampleImage: null, 
      status: 'Active',
      analytics: { total: 540, approved: 490, rejected: 30, pending: 20 }
    }
  ]);

  const [formData, setFormData] = useState<Omit<Task, 'id' | 'status' | 'analytics'>>({
    title: '',
    reward: 0,
    category: 'Handwriting',
    plan: 'Student Bundle',
    instructions: '',
    sampleImage: null
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = { 
      ...formData, 
      id: 't_' + Date.now(), 
      status: 'Active',
      analytics: { total: 0, approved: 0, rejected: 0, pending: 0 }
    };
    setTasks([newTask, ...tasks]);
    setActiveTab('all');
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-3 px-1">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800 shadow-lg">
            <FileText className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div>
            <h1 className="text-sm font-black text-gray-900 leading-none uppercase">Assignments Hub</h1>
            <p className="text-[7px] text-gray-400 font-bold uppercase mt-0.5">Yield & Production Management</p>
          </div>
        </div>
        <div className="flex p-0.5 bg-gray-100 rounded-lg">
          <button onClick={() => setActiveTab('create')} className={`px-3 py-1 rounded-md font-black text-[8px] uppercase tracking-tighter transition-all ${activeTab === 'create' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-400'}`}>Create Node</button>
          <button onClick={() => setActiveTab('all')} className={`px-3 py-1 rounded-md font-black text-[8px] uppercase tracking-tighter transition-all ${activeTab === 'all' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-400'}`}>Monitor Nodes</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'create' ? (
          <motion.div key="create" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
             <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="col-span-2">
                      <label className="text-[7px] font-black text-gray-400 uppercase ml-1">Task Protocol Title</label>
                      <input value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2 font-bold text-[10px] outline-none focus:border-rose-400" placeholder="e.g. Manuscript Transcription v2" />
                   </div>
                   <div>
                      <label className="text-[7px] font-black text-gray-400 uppercase ml-1">Yield (PKR)</label>
                      <input type="number" value={formData.reward || ''} onChange={e=>setFormData({...formData, reward: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2 font-bold text-[10px] outline-none focus:border-rose-400" placeholder="150" />
                   </div>
                   <div>
                      <label className="text-[7px] font-black text-gray-400 uppercase ml-1">Classification</label>
                      <select value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2 font-bold text-[10px] outline-none appearance-none">
                         <option>Handwriting</option>
                         <option>Typing</option>
                         <option>Data Entry</option>
                      </select>
                   </div>
                   <div className="col-span-2">
                      <label className="text-[7px] font-black text-gray-400 uppercase ml-1">Execution Instructions</label>
                      <textarea value={formData.instructions} onChange={e=>setFormData({...formData, instructions: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2 font-bold text-[10px] outline-none focus:border-rose-400 h-20 resize-none" placeholder="Step-by-step logic..." />
                   </div>
                </div>
                <button className="w-full py-2.5 bg-rose-600 text-white font-black rounded-lg text-[9px] uppercase tracking-widest shadow-lg shadow-rose-200 active:scale-95 transition-all">Commit Node to Cluster</button>
             </form>
          </motion.div>
        ) : (
          <div className="space-y-2">
            {tasks.map(task => {
              const approvalRate = task.analytics.total > 0 ? ((task.analytics.approved / task.analytics.total) * 100).toFixed(1) : '0';
              return (
                <div key={task.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
                  <div className="p-3.5 flex items-center justify-between border-b border-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-600 group-hover:text-white transition-all">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-[10px] font-black text-gray-900 leading-none mb-1 uppercase">{task.title}</h3>
                        <div className="flex items-center space-x-2">
                           <span className="text-[7px] font-black text-emerald-600 uppercase">Rs. {task.reward}</span>
                           <span className="text-gray-200 text-[8px]">|</span>
                           <span className="text-[7px] text-gray-400 font-black uppercase tracking-tighter">{task.category} • {task.plan}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                       <button className="p-1.5 bg-gray-50 text-gray-400 rounded-lg hover:text-rose-500 transition-colors"><Trash2 className="w-3 h-3" /></button>
                       <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                    </div>
                  </div>
                  
                  {/* Real-time Analytics Strip */}
                  <div className="bg-gray-50/50 p-2.5 grid grid-cols-4 gap-4 px-5">
                    <div className="space-y-0.5">
                      <p className="text-[6px] font-black text-gray-400 uppercase tracking-widest flex items-center"><Users className="w-2 h-2 mr-1" /> Volume</p>
                      <p className="text-[9px] font-black text-gray-900 leading-none">{task.analytics.total}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[6px] font-black text-emerald-500 uppercase tracking-widest flex items-center"><CheckCircle2 className="w-2 h-2 mr-1" /> Approved</p>
                      <p className="text-[9px] font-black text-gray-900 leading-none">{task.analytics.approved} <span className="text-[6px] text-emerald-500 ml-0.5">({approvalRate}%)</span></p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[6px] font-black text-rose-500 uppercase tracking-widest flex items-center"><XCircle className="w-2 h-2 mr-1" /> Rejected</p>
                      <p className="text-[9px] font-black text-gray-900 leading-none">{task.analytics.rejected}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[6px] font-black text-amber-500 uppercase tracking-widest flex items-center"><Clock className="w-2 h-2 mr-1" /> Pending</p>
                      <p className="text-[9px] font-black text-gray-900 leading-none">{task.analytics.pending}</p>
                    </div>
                  </div>

                  {/* Status Bar */}
                  <div className="px-5 py-1.5 flex items-center justify-between border-t border-gray-50">
                    <div className="flex items-center space-x-1.5">
                       <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[6px] font-black text-emerald-600 uppercase tracking-widest">Active Status</span>
                    </div>
                    <div className="flex items-center space-x-3">
                       <div className="w-20 h-1 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${approvalRate}%` }} 
                            className="h-full bg-emerald-500" 
                          />
                       </div>
                       <span className="text-[6px] font-black text-gray-400 uppercase">Health {approvalRate}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkManager;
