
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  FilePlus, 
  List, 
  BookOpen, 
  Settings, 
  Zap, 
  Upload, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

const WorkManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'all'>('create');
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    reward: '',
    category: 'Handwriting',
    plan: 'Student Bundle',
    instructions: ''
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, call taskController API
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setActiveTab('all');
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Work Manager</h1>
          <p className="text-gray-500 font-medium">Create and deploy assignments to user zones.</p>
        </div>
        
        <div className="flex p-1 bg-gray-100 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
              activeTab === 'create' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-400'
            }`}
          >
            <Plus className="inline w-4 h-4 mr-2" /> Create New
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
              activeTab === 'all' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-400'
            }`}
          >
            <List className="inline w-4 h-4 mr-2" /> All Tasks
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'create' ? (
          <motion.div
            key="create-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-10 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden"
          >
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-8"
              >
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-6 shadow-2xl shadow-emerald-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Task Deployed!</h3>
                <p className="text-gray-500 font-medium mt-2">The assignment is now visible to the target user groups.</p>
              </motion.div>
            )}

            <form onSubmit={handleCreate} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Task Title</label>
                  <input 
                    required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. Urdu Article Transcription"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Reward (PKR)</label>
                  <input 
                    required
                    type="number"
                    value={formData.reward}
                    onChange={e => setFormData({...formData, reward: e.target.value})}
                    placeholder="150"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all appearance-none"
                  >
                    <option>Handwriting</option>
                    <option>Typing</option>
                    <option>Social Media</option>
                    <option>Surveys</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Target Plan Visibility</label>
                  <div className="flex flex-wrap gap-3">
                    {['Free Tier', 'Student Bundle', 'Gold Package'].map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setFormData({...formData, plan: p})}
                        className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all ${
                          formData.plan === p 
                            ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-200' 
                            : 'bg-white border-gray-100 text-gray-400 hover:border-rose-200'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Assignment Instructions</label>
                  <textarea 
                    required
                    value={formData.instructions}
                    onChange={e => setFormData({...formData, instructions: e.target.value})}
                    rows={6}
                    placeholder="Provide step-by-step instructions for the user..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-[2rem] p-6 font-medium text-gray-700 outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="bg-rose-600/5 p-8 rounded-[2.5rem] border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-rose-900">Upload Sample Work</h4>
                    <p className="text-xs font-bold text-rose-600/60 uppercase tracking-widest">Image or PDF (Max 5MB)</p>
                  </div>
                </div>
                <button type="button" className="px-6 py-3 bg-white text-rose-600 border border-rose-200 font-black rounded-xl text-xs hover:bg-rose-50 transition-all">
                  Browse Files
                </button>
              </div>

              <button type="submit" className="w-full py-5 bg-gray-900 text-white font-black rounded-[2rem] hover:bg-rose-600 transition-all flex items-center justify-center shadow-2xl shadow-rose-200 group">
                Deploy Assignment <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="all-tasks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-500">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">Urdu Handwriting Practice #{i}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Rs. 150 Reward</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Student Bundle</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-5 py-2.5 bg-gray-50 text-gray-500 font-bold rounded-xl text-xs hover:bg-rose-50 hover:text-rose-600 transition-all">
                    Edit Task
                  </button>
                  <button className="px-5 py-2.5 bg-emerald-50 text-emerald-600 font-bold rounded-xl text-xs border border-emerald-100">
                    Active
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkManager;
