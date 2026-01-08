
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Maximize2, User, BookOpen, Clock, AlertCircle } from 'lucide-react';

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
    // In real app, call processSubmission API
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Review Submissions</h1>
        <p className="text-gray-500 font-medium">Verify the quality of user work before releasing payments.</p>
      </div>

      <div className="space-y-8">
        {submissions.map((sub, idx) => (
          <motion.div
            key={sub.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col lg:flex-row h-full"
          >
            {/* Proof Preview Area */}
            <div className="lg:w-1/2 bg-gray-50 flex items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-gray-100 relative min-h-[300px]">
              {sub.type === 'file' ? (
                <div className="relative group w-full h-full flex items-center justify-center">
                  <img 
                    src={sub.content} 
                    alt="Proof" 
                    className="max-h-[400px] w-auto rounded-xl shadow-lg border-4 border-white object-contain"
                  />
                  <button 
                    onClick={() => setSelectedImage(sub.content)}
                    className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur rounded-2xl shadow-xl text-gray-900 hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="w-full bg-white p-8 rounded-3xl border border-gray-200 shadow-inner font-medium text-gray-700 leading-relaxed overflow-y-auto max-h-[400px]">
                  {sub.content}
                </div>
              )}
            </div>

            {/* Actions & Details Area */}
            <div className="lg:w-1/2 p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 mb-1">{sub.task}</h3>
                    <div className="flex items-center text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg w-fit">
                      Reward: Rs. {sub.reward}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Submitted</p>
                    <p className="text-sm font-bold text-gray-900">{sub.time}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">User</p>
                      <p className="text-sm font-bold text-gray-900">{sub.user}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    <p className="text-xs font-bold text-gray-600">Ensure the proof matches the task instructions before approving.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => handleProcess(sub.id, 'reject')}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center"
                >
                  <X className="w-5 h-5 mr-2" /> Reject
                </button>
                <button
                  onClick={() => handleProcess(sub.id, 'approve')}
                  className="flex-[2] py-4 bg-rose-600 text-white font-black rounded-2xl hover:bg-rose-700 transition-all flex items-center justify-center shadow-lg shadow-rose-200 group"
                >
                  <Check className="w-5 h-5 mr-2 group-hover:scale-125 transition-transform" /> Approve & Pay
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {submissions.length === 0 && (
          <div className="p-20 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
            <Check className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-gray-400">All Caught Up!</h2>
            <p className="text-gray-400 font-medium">There are no pending submissions for review.</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedImage} 
              className="max-h-screen max-w-full rounded-2xl shadow-2xl"
            />
            <button 
              className="absolute top-8 right-8 text-white hover:rotate-90 transition-transform"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewTasks;
