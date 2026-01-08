
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  HelpCircle, 
  Save, 
  Loader2, 
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { getPublicFAQs, createFAQ, deleteFAQ } from '../../api/controllers/supportController';
import { useAuth } from '../../context/AuthContext';

const ManageSupport: React.FC = () => {
  const { user } = useAuth();
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'General'
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    const data = await getPublicFAQs();
    setFaqs(data);
    setIsLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) return;
    setIsSaving(true);
    const res = await createFAQ(user?.id || 'admin', formData);
    if (res.success) {
      setFaqs([res.faq, ...faqs]);
      setFormData({ question: '', answer: '', category: 'General' });
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    const res = await deleteFAQ(user?.id || 'admin', id);
    if (res.success) {
      setFaqs(faqs.filter(f => f.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-3 px-1">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800 shadow-lg">
            <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div>
            <h1 className="text-sm font-black text-gray-900 leading-none uppercase">Support Node</h1>
            <p className="text-[7px] text-gray-400 font-bold uppercase mt-0.5">Knowledge Base Management</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Left: Form */}
        <div className="lg:col-span-1 space-y-3">
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-[9px] font-black text-gray-900 uppercase border-b border-gray-50 pb-2 mb-3">Add Protocol</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-[7px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Question</label>
                <input 
                  required
                  value={formData.question}
                  onChange={e => setFormData({...formData, question: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2 font-bold text-[10px] outline-none focus:border-rose-400"
                  placeholder="How to..."
                />
              </div>
              <div>
                <label className="block text-[7px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2 font-bold text-[10px] outline-none"
                >
                  <option>General</option>
                  <option>Payment</option>
                  <option>Account</option>
                </select>
              </div>
              <div>
                <label className="block text-[7px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Answer</label>
                <textarea 
                  required
                  value={formData.answer}
                  onChange={e => setFormData({...formData, answer: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-100 rounded-lg p-2 font-bold text-[10px] outline-none focus:border-rose-400 h-24 resize-none"
                  placeholder="Enter detailed response..."
                />
              </div>
              <button 
                type="submit" 
                disabled={isSaving}
                className="w-full py-2 bg-rose-600 text-white font-black rounded-lg text-[9px] uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center"
              >
                {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Plus className="w-3 h-3 mr-1" /> Deploy FAQ</>}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Right: List */}
        <div className="lg:col-span-2 space-y-2">
          <div className="bg-gray-100/50 p-2 rounded-xl flex items-center justify-between px-4">
             <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Active Database: {faqs.length} Nodes</span>
             <Filter className="w-3 h-3 text-gray-300" />
          </div>
          
          <AnimatePresence mode="popLayout">
            {faqs.map(faq => (
              <motion.div 
                key={faq.id}
                layout
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-start justify-between group hover:border-rose-200 transition-all"
              >
                <div className="min-w-0 pr-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[7px] font-black bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded uppercase tracking-tighter">{faq.category}</span>
                    <h4 className="text-[10px] font-black text-gray-900 truncate">{faq.question}</h4>
                  </div>
                  <p className="text-[9px] text-gray-500 font-medium line-clamp-1">{faq.answer}</p>
                </div>
                <button 
                  onClick={() => handleDelete(faq.id)}
                  className="p-1.5 bg-gray-50 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all shrink-0"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {faqs.length === 0 && !isLoading && (
            <div className="p-10 text-center bg-gray-50/50 border border-dashed border-gray-100 rounded-2xl">
              <MessageSquare className="w-8 h-8 text-gray-100 mx-auto mb-2" />
              <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">No FAQ data in cluster</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageSupport;
