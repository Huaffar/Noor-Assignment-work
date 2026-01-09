
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Save, 
  Loader2, 
  ImageIcon, 
  Type, 
  Languages,
  ChevronRight,
  Eye,
  AlertCircle,
  // Added missing CheckCircle2 import
  CheckCircle2
} from 'lucide-react';
import { GuideStep } from '../../api/models/Guide';

const ManageGuides: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState('withdraw');
  const [steps, setSteps] = useState<GuideStep[]>([
    { image: '', titleEn: '', titleUr: '', descriptionEn: '', descriptionUr: '' }
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const pageOptions = [
    { id: 'login', label: 'Sign In Page' },
    { id: 'plans', label: 'Earning Plans' },
    { id: 'withdraw', label: 'Withdrawal Hub' },
    { id: 'kyc', label: 'Identity Node' },
    { id: 'dashboard', label: 'User Dashboard' }
  ];

  const handleAddStep = () => {
    setSteps([...steps, { image: '', titleEn: '', titleUr: '', descriptionEn: '', descriptionUr: '' }]);
  };

  const handleRemoveStep = (idx: number) => {
    setSteps(steps.filter((_, i) => i !== idx));
  };

  const updateStep = (idx: number, field: keyof GuideStep, val: string) => {
    const newSteps = [...steps];
    newSteps[idx][field] = val;
    setSteps(newSteps);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API Call
    await new Promise(r => setTimeout(r, 1500));
    setIsSaving(false);
    alert("Guide Node Published to CDN");
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 px-1 space-y-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 shadow-xl">
            <BookOpen className="w-4 h-4 text-rose-500" />
          </div>
          <div>
            <h1 className="text-base font-black text-gray-900 uppercase">Instructional CMS</h1>
            <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Bilingual Node Content</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Select Target Page:</label>
          <select 
            value={selectedPage}
            onChange={e => setSelectedPage(e.target.value)}
            className="bg-white border border-gray-100 rounded-lg px-3 py-1.5 font-black text-[10px] uppercase outline-none focus:border-rose-400 shadow-sm"
          >
            {pageOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Editor Area */}
        <div className="xl:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6 relative group"
              >
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                   <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 bg-rose-600 text-white rounded-lg flex items-center justify-center font-black text-[10px]">#0{idx+1}</span>
                      <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Instruction Node</h3>
                   </div>
                   <button onClick={() => handleRemoveStep(idx)} className="p-2 text-gray-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* English Input */}
                   <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                         <Languages className="w-3.5 h-3.5" />
                         <span className="text-[8px] font-black uppercase">English Stream</span>
                      </div>
                      <input 
                        value={step.titleEn}
                        onChange={e => updateStep(idx, 'titleEn', e.target.value)}
                        placeholder="Title (English)" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-xs outline-none focus:border-rose-400" 
                      />
                      <textarea 
                        value={step.descriptionEn}
                        onChange={e => updateStep(idx, 'descriptionEn', e.target.value)}
                        placeholder="Description (English)" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 font-bold text-xs outline-none h-24 resize-none focus:border-rose-400" 
                      />
                   </div>

                   {/* Urdu Input */}
                   <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-rose-500">
                         <Languages className="w-3.5 h-3.5" />
                         <span className="text-[8px] font-black uppercase">Urdu Stream (Nastaliq)</span>
                      </div>
                      <input 
                        value={step.titleUr}
                        onChange={e => updateStep(idx, 'titleUr', e.target.value)}
                        placeholder="عنوان" 
                        className="w-full bg-rose-50/30 border border-rose-100 rounded-xl p-3 font-urdu text-lg outline-none focus:border-rose-400" 
                      />
                      <textarea 
                        value={step.descriptionUr}
                        onChange={e => updateStep(idx, 'descriptionUr', e.target.value)}
                        placeholder="تفصیل" 
                        className="w-full bg-rose-50/30 border border-rose-100 rounded-xl p-3 font-urdu text-lg outline-none focus:border-rose-400" 
                      />
                   </div>
                </div>

                <div className="space-y-1">
                   <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Instructional Image (URL)</label>
                   <div className="relative group">
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <input 
                        value={step.image}
                        onChange={e => updateStep(idx, 'image', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-10 pr-4 font-bold text-xs outline-none focus:border-rose-400" 
                        placeholder="https://..." 
                      />
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button 
            onClick={handleAddStep}
            className="w-full py-6 border-2 border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center text-gray-400 hover:text-rose-600 hover:border-rose-200 transition-all bg-white/50"
          >
            <Plus className="w-8 h-8 mb-2" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Add Logic Step</span>
          </button>
        </div>

        {/* Sidebar / Actions */}
        <div className="xl:col-span-1 space-y-4">
           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-3xl -mr-10 -mt-10" />
              <div className="relative z-10">
                 <h2 className="text-xl font-black mb-1">State Sync</h2>
                 <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-8">Ready to deploy node v2.1</p>
                 
                 <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3 text-xs font-bold text-slate-400">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                       <span>{steps.length} Protocol Steps</span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs font-bold text-slate-400">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                       <span>Bilingual (EN/UR) Sync</span>
                    </div>
                 </div>

                 <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all flex items-center justify-center"
                 >
                   {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 mr-2" /> Commit Guide</>}
                 </button>
              </div>
           </div>

           <div className="bg-rose-50 border border-rose-100 p-6 rounded-[2.5rem] flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-rose-700 uppercase">Typography Note</p>
                 <p className="text-[8px] font-bold text-rose-600 leading-relaxed uppercase tracking-tight">
                    The Urdu stream utilizes browser-level Jameel Noori Nastaliq rendering. If the preview looks like standard font, ensure the .ttf node is loaded.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ManageGuides;
