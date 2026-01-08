
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  History, 
  FileText, 
  BarChart3, 
  BookOpen, 
  Clock, 
  ArrowRight, 
  TrendingUp
} from 'lucide-react';

const WorkCenter: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'today' | 'drafts' | 'history' | 'reports'>('today');
  const [drafts, setDrafts] = useState<any[]>([]);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const foundDrafts = keys
      .filter(key => key.startsWith('draft_'))
      .map(key => {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        return { id: key.replace('draft_', ''), ...data };
      });
    setDrafts(foundDrafts);
  }, []);

  const tabs = [
    { id: 'today', label: "Daily", icon: Zap },
    { id: 'drafts', label: 'Drafts', icon: FileText, badge: drafts.length > 0 ? drafts.length : null },
    { id: 'history', label: 'History', icon: History },
    { id: 'reports', label: 'Yield', icon: BarChart3 },
  ];

  return (
    <div className="max-w-xl mx-auto pb-20 space-y-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <h1 className="text-xl font-black text-gray-900 leading-none">Work Station</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Earning Assignments</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative px-3 py-2 rounded-lg transition-all flex items-center ${
                activeTab === tab.id ? 'text-rose-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-white rounded-lg shadow-sm" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
              )}
              <span className="relative z-10 flex items-center space-x-1.5">
                <tab.icon className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-tight">{tab.label}</span>
                {tab.badge && <span className="bg-rose-600 text-white text-[8px] w-3 h-3 flex items-center justify-center rounded-full">{tab.badge}</span>}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {activeTab === 'today' && (
            <div className="grid gap-2.5">
              {[
                { id: 't1', title: 'Urdu Transcription', reward: 150, time: '20m', type: 'Writing' },
                { id: 't2', title: 'English Essay Review', reward: 300, time: '35m', type: 'Typing' },
                { id: 't3', title: 'Social Media Pulse', reward: 50, time: '5m', type: 'Surveys' }
              ].map((task) => (
                <div key={task.id} className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group active:bg-gray-50 transition-all">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-gray-900 leading-tight mb-1">{task.title}</h3>
                      <div className="flex items-center space-x-2">
                         <span className="text-[10px] font-black text-emerald-600">Rs. {task.reward}</span>
                         <span className="text-[10px] text-gray-300">•</span>
                         <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{task.time}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => navigate(`/do-task/${task.id}`)} className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center group-hover:bg-rose-600 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
               <div className="divide-y divide-gray-50">
                  {[
                    { id: 1, name: 'Urdu Transcription', date: 'Oct 24', reward: 150, status: 'Approved' },
                    { id: 2, name: 'Math Quiz', date: 'Oct 23', reward: 200, status: 'Pending' },
                    { id: 3, name: 'English Essay', date: 'Oct 22', reward: 350, status: 'Rejected' },
                  ].map((row) => (
                    <div key={row.id} className="p-3.5 flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'Approved' ? 'bg-emerald-500' : row.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'}`} />
                          <div>
                             <p className="text-xs font-black text-gray-900 leading-none mb-1">{row.name}</p>
                             <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{row.date} • Rs. {row.reward}</p>
                          </div>
                       </div>
                       <span className={`text-[8px] font-black uppercase tracking-widest ${row.status === 'Approved' ? 'text-emerald-500' : row.status === 'Pending' ? 'text-amber-500' : 'text-red-500'}`}>
                          {row.status}
                       </span>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                <TrendingUp className="text-emerald-500 w-5 h-5 mx-auto mb-2" />
                <h3 className="text-lg font-black text-gray-900">Rs. 8,450</h3>
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Monthly Yield</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center">
                <Zap className="text-rose-600 w-5 h-5 mx-auto mb-2" />
                <h3 className="text-lg font-black text-gray-900">42</h3>
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Tasks Cleared</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WorkCenter;
