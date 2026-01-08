
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Maximize2, User, BookOpen, Clock, AlertCircle, Eye, FileText } from 'lucide-react';

const ReviewTasks: React.FC = () => {
  const [submissions, setSubmissions] = useState([
    {
      id: 'sub_101',
      user: 'Zaid Khan',
      task: 'Urdu Handwriting Practice',
      reward: 150,
      type: 'file',
      content: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      time: '2h ago'
    },
    {
      id: 'sub_102',
      user: 'Fatima Ali',
      task: 'Current Affairs Summary',
      reward: 100,
      type: 'text',
      content: 'Today, the federal government announced a new initiative to boost agricultural exports by 20% over the next two fiscal years...',
      time: '4h ago'
    }
  ]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleProcess = (id: string, action: 'approve' | 'reject') => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 space-y-4 px-1">
      <div className="px-1">
        <h1 className="text-xl font-black text-gray-900 leading-none uppercase tracking-tight">Audit Center</h1>
        <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest mt-1">Verification Queue: {submissions.length} Nodes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <AnimatePresence mode="popLayout">
          {submissions.map((sub, idx) => (
            <motion.div
              key={sub.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group"
            >
              {/* Compact Proof Area */}
              <div className="relative aspect-[16/9] bg-gray-50 border-b border-gray-50 flex items-center justify-center overflow-hidden">
                {sub.type === 'file' ? (
                  <>
                    <img src={sub.content} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Proof" />
                    <button 
                      onClick={() => setSelectedImage(sub.content)}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <div className="bg-white p-2 rounded-xl text-gray-900 shadow-xl"><Eye className="w-4 h-4" /></div>
                    </button>
                  </>
                ) : (
                  <div className="p-4 text-[9px] text-gray-500 font-medium leading-relaxed overflow-hidden italic line-clamp-4">
                    {sub.content}
                  </div>
                )}
                <div className="absolute top-2 left-2 flex space-x-1.5">
                   <div className="bg-rose-600 text-white text-[6px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest shadow-md">Rs. {sub.reward}</div>
                   <div className="bg-white/90 backdrop-blur-sm text-gray-900 text-[6px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest shadow-sm border border-black/5">{sub.type} Node</div>
                </div>
              </div>

              {/* Details Area */}
              <div className="p-3.5 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="min-w-0">
                    <h3 className="text-[10px] font-black text-gray-900 uppercase leading-tight truncate">{sub.task}</h3>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5 flex items-center">
                      <User className="w-2.5 h-2.5 mr-1" /> {sub.user} • {sub.time}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleProcess(sub.id, 'reject')}
                    className="flex-1 py-2 bg-gray-50 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl font-black text-[9px] uppercase transition-all"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleProcess(sub.id, 'approve')}
                    className="flex-[2] py-2 bg-slate-900 text-white hover:bg-emerald-600 rounded-xl font-black text-[9px] uppercase shadow-lg transition-all"
                  >
                    Approve Work
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {submissions.length === 0 && (
        <div className="p-20 text-center bg-gray-50/50 border border-dashed border-gray-100 rounded-[2rem]">
          <Check className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">No pending audits in cluster</p>
        </div>
      )}

      {/* Standardized Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={selectedImage} className="max-h-full max-w-full rounded-2xl shadow-2xl" />
            <button className="absolute top-8 right-8 text-white"><X className="w-10 h-10" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewTasks;
