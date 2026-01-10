
import React, { useState, useEffect, useCallback } from 'react';
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
  Info,
  File as FileIcon,
  AlertCircle
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
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const savedDraft = localStorage.getItem(`draft_${id}`);
    if (savedDraft) {
      const data = JSON.parse(savedDraft);
      setProofText(data.text || '');
      if (data.text) setActiveTab('write');
    }
  }, [id]);

  // Drag and Drop Logic
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      // Validation: Image or PDF only
      if (droppedFile.type.startsWith('image/') || droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        setActiveTab('upload');
      } else {
        alert("Invalid format: Please drop an image or PDF document.");
      }
    }
  };

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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }} 
          animate={{ scale: 1, rotate: 0 }} 
          className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-8 shadow-2xl shadow-emerald-200"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>
        <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight uppercase">Payload Transmitted</h2>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] max-w-xs">Logic node verified. Syncing with audit cluster...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-24 px-4 space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/tasks')} className="flex items-center text-slate-400 font-black text-[10px] hover:text-theme-primary transition-colors uppercase tracking-[0.2em]">
          <ChevronLeft className="w-4 h-4 mr-1" /> Return to Cluster
        </button>
        <div className="flex items-center space-x-3">
          <button onClick={handleSaveDraft} className={`flex items-center px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isDraftSaved ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-400 shadow-sm hover:border-theme-primary/30'}`}>
            {isDraftSaved ? <CheckCircle2 className="w-3.5 h-3.5 mr-2" /> : <Save className="w-3.5 h-3.5 mr-2" />}
            {isDraftSaved ? 'State Saved' : 'Save Local Draft'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Context & Preview */}
        <div className="lg:col-span-4 space-y-4">
          <div className="themed-card p-6 border-gray-100 shadow-sm">
            <div className="flex items-center space-x-3 mb-4 text-theme-primary">
               <div className="w-8 h-8 bg-theme-secondary rounded-lg flex items-center justify-center">
                 <Info className="w-4 h-4" />
               </div>
               <h3 className="text-[11px] font-black uppercase tracking-widest leading-none">Node Protocol</h3>
            </div>
            <div className="space-y-3">
              {[
                "Deploy payload on clean A4 surface.",
                "Ensure focus & edge detection.",
                "PDF format preferred for multi-page."
              ].map((text, i) => (
                <div key={i} className="flex items-start">
                  <span className="w-5 h-5 bg-theme-secondary text-theme-primary rounded-md flex items-center justify-center mr-3 shrink-0 text-[10px] font-black">{i+1}</span>
                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-slate-950 rounded-[2.5rem] p-6 text-white relative overflow-hidden group cursor-pointer border border-white/10 shadow-2xl" 
            onClick={() => setShowSample(true)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-theme-primary/10 rounded-full -mr-16 -mt-16 group-hover:bg-theme-primary/20 transition-all" />
            <div className="flex items-center justify-between mb-4">
               <div className="space-y-1">
                 <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-theme-primary">Anchor Resource</h3>
                 <p className="text-[14px] font-black uppercase">Sample Execution</p>
               </div>
               <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                 <Maximize2 className="w-4 h-4" />
               </div>
            </div>
            <div className="relative aspect-video bg-white/5 rounded-2xl overflow-hidden border border-white/5">
              <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800" className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-opacity" alt="Sample" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-white text-slate-900 px-4 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest shadow-2xl">View Detailed Capture</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Execution Terminal */}
        <div className="lg:col-span-8">
          <div className="themed-card p-6 md:p-8 border-gray-100 shadow-sm min-h-[500px] flex flex-col">
            <div className="flex p-1 bg-gray-50 rounded-2xl mb-8 border border-gray-100">
              <button onClick={() => setActiveTab('upload')} className={`flex-1 flex items-center justify-center space-x-3 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${activeTab === 'upload' ? 'bg-white text-theme-primary shadow-md' : 'text-gray-400 hover:text-slate-600'}`}>
                <Upload className="w-4 h-4" /> <span>Payload Upload</span>
              </button>
              <button onClick={() => setActiveTab('write')} className={`flex-1 flex items-center justify-center space-x-3 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${activeTab === 'write' ? 'bg-white text-theme-primary shadow-md' : 'text-gray-400 hover:text-slate-600'}`}>
                <FileText className="w-4 h-4" /> <span>Direct Input</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-8" onDragEnter={handleDrag}>
              <AnimatePresence mode="wait">
                {activeTab === 'upload' ? (
                  <motion.div 
                    key="up" 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex-1 flex flex-col"
                  >
                    <div 
                      className={`relative flex-1 border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center transition-all cursor-pointer ${
                        file ? 'border-emerald-200 bg-emerald-50/10' : 
                        dragActive ? 'border-theme-primary bg-theme-secondary scale-[0.99] shadow-inner' : 
                        'border-gray-100 bg-gray-50/50 hover:border-theme-primary/40 hover:bg-gray-50'
                      }`}
                      onClick={() => document.getElementById('file-up')?.click()}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input type="file" id="file-up" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} accept="image/*,application/pdf" />
                      
                      {file ? (
                        <div className="flex flex-col items-center text-center p-8">
                          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-4 text-emerald-500 border border-emerald-50">
                            {file.type === 'application/pdf' ? <FileIcon className="w-10 h-10" /> : <ImageIcon className="w-10 h-10" />}
                          </div>
                          <p className="text-sm font-black text-slate-900 mb-1 max-w-xs truncate">{file.name}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{(file.size / (1024 * 1024)).toFixed(2)} MB • READY FOR TRANSMISSION</p>
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                            className="mt-6 px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all"
                          >
                            Purge Asset
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-center p-12 pointer-events-none">
                          <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 transition-all duration-500 ${dragActive ? 'bg-theme-primary text-white scale-110 shadow-2xl' : 'bg-white text-theme-primary shadow-lg border border-gray-100'}`}>
                             <Upload className="w-10 h-10" />
                          </div>
                          <p className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                            {dragActive ? 'Release to Initialize' : 'Deploy Captured Payload'}
                          </p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Drag and Drop or Click to Browse</p>
                          <div className="mt-8 flex items-center space-x-3 opacity-30">
                             <ImageIcon className="w-4 h-4" />
                             <span className="w-1 h-1 rounded-full bg-gray-400" />
                             <FileIcon className="w-4 h-4" />
                             <span className="text-[8px] font-black uppercase tracking-widest">JPG, PNG, PDF SUPPORTED</span>
                          </div>
                        </div>
                      )}

                      {/* Global Drag Overlay */}
                      {dragActive && (
                        <div className="absolute inset-0 bg-theme-primary/5 backdrop-blur-[2px] rounded-[2.5rem] border-4 border-theme-primary border-dashed z-50 pointer-events-none flex items-center justify-center">
                           <motion.div 
                             initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                             className="bg-white p-6 rounded-3xl shadow-2xl flex items-center space-x-4"
                           >
                              <div className="w-10 h-10 themed-gradient rounded-xl flex items-center justify-center shadow-lg">
                                <Upload className="w-6 h-6 text-white" />
                              </div>
                              <span className="text-sm font-black text-slate-900 uppercase tracking-tighter">Initialize Fast Drop</span>
                           </motion.div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="wr" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="flex-1">
                    <textarea 
                      value={proofText} 
                      onChange={(e) => setProofText(e.target.value)} 
                      placeholder="Begin typing your assignment here... Ensure every word matches the source payload precisely." 
                      className="w-full h-full min-h-[300px] bg-gray-50 border border-gray-100 rounded-[2rem] p-8 focus:outline-none focus:ring-4 focus:ring-theme-primary/5 focus:border-theme-primary/40 transition-all font-medium text-slate-700 resize-none text-[13px] leading-relaxed shadow-inner" 
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                 <div className="flex-1 flex items-center p-4 bg-amber-50 rounded-2xl border border-amber-100 text-amber-700">
                    <AlertCircle className="w-4 h-4 mr-3 shrink-0" />
                    <p className="text-[10px] font-bold uppercase leading-tight tracking-tight">Audit Protocol: AI generated or duplicate payloads will result in immediate isolation of the worker node.</p>
                 </div>
                 <button 
                  disabled={isSubmitting || (activeTab === 'upload' && !file) || (activeTab === 'write' && !proofText)} 
                  className="w-full sm:w-auto px-12 py-5 themed-gradient text-white font-black rounded-2xl hover:brightness-110 transition-all flex items-center justify-center shadow-2xl shadow-theme-primary/30 disabled:opacity-50 text-[11px] uppercase tracking-[0.2em] group"
                 >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Finalize Transmission <Send className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" /></>}
                 </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSample && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[500] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12" 
            onClick={() => setShowSample(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-4xl w-full bg-white rounded-[3rem] p-3 shadow-2xl overflow-hidden" 
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-8 right-8 z-10">
                <button onClick={() => setShowSample(false)} className="p-3 bg-black/50 backdrop-blur-md text-white rounded-2xl hover:bg-black/80 transition-all active:scale-90 shadow-xl">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="max-h-[80vh] overflow-y-auto no-scrollbar rounded-[2.5rem]">
                <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200" className="w-full h-auto rounded-[2.5rem] shadow-inner" alt="Sample Zoom" />
                <div className="p-8 text-center bg-gray-50 border-t border-gray-100">
                   <h4 className="text-xl font-black text-slate-900 uppercase mb-2">Verified Execution Standard</h4>
                   <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em]">Quality assurance node v4.2 requires this level of legibility.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoTask;
