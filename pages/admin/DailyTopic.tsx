
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Save, 
  CheckCircle2, 
  Loader2, 
  History,
  ShieldCheck,
  Type,
  Layout,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DailyTopic: React.FC = () => {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [formData, setFormData] = useState({
    title: 'The Future of Artificial Intelligence',
    content: 'Artificial Intelligence is transforming how we live and work. From healthcare to finance, AI nodes are optimizing complex data streams...',
    date: new Date().toISOString().split('T')[0]
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsDone(true);
      setTimeout(() => setIsDone(false), 2000);
    }, 1500);
  };

  return (
    <div className="max-w-xl mx-auto pb-20 space-y-4 px-1">
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-xl font-black text-gray-900 leading-none uppercase tracking-tight">Assignment Node</h1>
          <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest mt-1">Logic Payload Control</p>
        </div>
        <div className="bg-white px-2 py-1 rounded-lg border border-gray-100 flex items-center space-x-1.5 shadow-sm">
           <Clock className="w-2.5 h-2.5 text-rose-500" />
           <span className="text-[7px] font-black text-gray-500 uppercase">Resets in 14h</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 bg-rose-50/20">
           <div className="flex items-center space-x-2 text-rose-600">
             <ShieldCheck className="w-3.5 h-3.5" />
             <h3 className="text-[9px] font-black uppercase tracking-widest">Assignment Infrastructure</h3>
           </div>
        </div>

        <form onSubmit={handleUpdate} className="p-5 space-y-4">
           <div className="space-y-1">
             <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Topic Headline</label>
             <div className="relative group">
                <Type className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-300 group-focus-within:text-rose-500" />
                <input 
                  required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pl-8 pr-3 font-bold text-xs outline-none focus:border-rose-400"
                  placeholder="e.g. Modern Economics"
                />
             </div>
           </div>

           <div className="space-y-1">
             <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Payload Content</label>
             <textarea 
               required
               value={formData.content}
               onChange={e => setFormData({...formData, content: e.target.value})}
               className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-xs outline-none h-32 resize-none focus:border-rose-400"
               placeholder="Paste today's assignment text here..."
             />
           </div>

           <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Effective Date</label>
                <div className="relative">
                   <Layout className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                   <input type="date" value={formData.date} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pl-8 pr-3 font-black text-[9px] outline-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Audit Node</label>
                <div className="w-full bg-rose-50 border border-rose-100 rounded-xl py-2 px-3 text-[9px] font-black text-rose-600 uppercase">Auto-Verification Active</div>
              </div>
           </div>

           <button 
             disabled={isSaving || isDone}
             className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all flex items-center justify-center ${
               isDone ? 'bg-emerald-500' : 'bg-slate-900 hover:bg-rose-600'
             } text-white`}
           >
             {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : isDone ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4 mr-2" />}
             {isSaving ? "Injecting Payload..." : isDone ? "Logic Node Synchronized" : "Update Daily Topic"}
           </button>
        </form>
      </div>

      <div className="bg-gray-100/50 p-4 rounded-2xl flex items-center justify-between px-6 opacity-60">
        <div className="flex items-center space-x-2">
           <History className="w-3.5 h-3.5 text-gray-400" />
           <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Topic Revision History</span>
        </div>
        <span className="text-[8px] font-black text-rose-500">v42.0</span>
      </div>
    </div>
  );
};

export default DailyTopic;
