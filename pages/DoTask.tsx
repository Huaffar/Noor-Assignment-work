
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  ChevronLeft, 
  CheckCircle2, 
  Image as ImageIcon,
  Send,
  Loader2,
  Save,
  Maximize2,
  X,
  Info
} from 'lucide-react';

const DoTask: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upload' | 'write'>('upload');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [proofText, setProofText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [showSample, setShowSample] = useState(false);

  useEffect(() => {
    const savedDraft = localStorage.getItem(`draft_${id}`);
    if (savedDraft) {
      const data = JSON.parse(savedDraft);
      setProofText(data.text || '');
      if (data.text) setActiveTab('write');
    }
  }, [id]);

  const handleSaveDraft = () => {
    localStorage.setItem(`draft_${id}`, JSON.stringify({
      text: proofText,
      lastSaved: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      localStorage.removeItem(`draft_${id}`);
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => navigate('/tasks'), 2500);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-emerald-100">
          <CheckCircle2 className="w-8 h-8" />
        </motion.div>
        <h2 className="text-xl font-black text-gray-900 mb-2 tracking-tight">Work Submitted!</h2>
        <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest max-w-xs">Reviewing submission... redirecting shortly.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-20 px-2 space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/tasks')} className="flex items-center text-gray-400 font-black text-xs hover:text-pink-500 transition-colors uppercase tracking-widest">
          <ChevronLeft className="w-4 h-4 mr-0.5" /> Back
        </button>
        <button onClick={handleSaveDraft} className={`flex items-center px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${isDraftSaved ? 'bg-emerald-500 text-white' : 'bg-white border border-gray-100 text-gray-400 shadow-sm'}`}>
          {isDraftSaved ? <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
          {isDraftSaved ? 'Saved' : 'Draft'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-2 mb-3 text-pink-600">
             <Info className="w-4 h-4" />
             <h3 className="text-[10px] font-black uppercase tracking-widest">Instructions</h3>
          </div>
          <div className="space-y-2 text-[11px] text-gray-600 font-medium leading-relaxed">
            <p className="flex items-start"><span className="w-4 h-4 bg-pink-50 text-pink-600 rounded flex items-center justify-center mr-2 shrink-0 text-[8px]">1</span> Copy text to A4 paper or type below.</p>
            <p className="flex items-start"><span className="w-4 h-4 bg-pink-50 text-pink-600 rounded flex items-center justify-center mr-2 shrink-0 text-[8px]">2</span> Ensure text is sharp and readable.</p>
          </div>
        </div>

        <div className="bg-pink-600 rounded-2xl p-4 text-white relative overflow-hidden group cursor-pointer" onClick={() => setShowSample(true)}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
          <div className="flex items-center justify-between mb-2">
             <h3 className="font-black text-[10px] uppercase tracking-widest">Sample Work</h3>
             <Maximize2 className="w-3.5 h-3.5" />
          </div>
          <div className="relative aspect-[16/9] bg-white/20 rounded-xl overflow-hidden border border-white/10">
            <img src="https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Sample" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-4 md:p-6 border border-gray-100 shadow-sm">
        <div className="flex p-1 bg-gray-50 rounded-xl mb-6">
          <button onClick={() => setActiveTab('upload')} className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg font-black text-[11px] uppercase tracking-tight transition-all ${activeTab === 'upload' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`}>
            <ImageIcon className="w-3.5 h-3.5" /> <span>Upload</span>
          </button>
          <button onClick={() => setActiveTab('write')} className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg font-black text-[11px] uppercase tracking-tight transition-all ${activeTab === 'write' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'}`}>
            <FileText className="w-3.5 h-3.5" /> <span>Write</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'upload' ? (
              <motion.div key="up" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${file ? 'border-emerald-200 bg-emerald-50/20' : 'border-gray-100 bg-gray-50 hover:border-pink-200'}`} onClick={() => document.getElementById('file-up')?.click()}>
                  <input type="file" id="file-up" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} accept="image/*" />
                  {file ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-3" />
                      <p className="text-xs font-black text-gray-900">{file.name}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-8 h-8 text-pink-300 mb-3" />
                      <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Attach JPEG/PDF</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div key="wr" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <textarea value={proofText} onChange={(e) => setProofText(e.target.value)} placeholder="Begin typing your assignment here..." className="w-full h-48 bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-pink-500/5 focus:border-pink-400 transition-all font-medium text-gray-700 resize-none text-xs leading-relaxed" />
              </motion.div>
            )}
          </AnimatePresence>

          <button disabled={isSubmitting || (activeTab === 'upload' && !file) || (activeTab === 'write' && !proofText)} className="w-full bg-pink-600 text-white font-black py-4 rounded-xl hover:bg-pink-700 transition-all flex items-center justify-center shadow-lg shadow-pink-100 disabled:opacity-50 text-xs uppercase tracking-widest">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Submit Assignment <Send className="w-3.5 h-3.5 ml-2" /></>}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {showSample && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setShowSample(false)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="relative max-w-sm w-full bg-white rounded-2xl p-2 shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <img src="https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg" className="w-full h-auto rounded-xl" alt="Sample Zoom" />
              <button onClick={() => setShowSample(false)} className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full"><X className="w-5 h-5" /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoTask;
