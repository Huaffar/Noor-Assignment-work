
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ImageIcon, 
  Megaphone, 
  Layout, 
  Plus, 
  Trash2, 
  Save, 
  Loader2, 
  ToggleRight, 
  Eye,
  Zap,
  Globe,
  MonitorSmartphone,
  CheckCircle2
} from 'lucide-react';

const ManageMarketing: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [banners, setBanners] = useState([
    'https://images.unsplash.com/photo-1573163067521-024c04023ec2?q=80&w=800',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800'
  ]);
  const [config, setConfig] = useState({
    newsTicker: 'Referral bonus has been increased to 15% for Gold Members! 🚀 New handwriting tasks added.',
    popup: {
      isActive: true,
      title: 'Diamond Plan Discount!',
      imageUrl: 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=800',
      link: '/upgrade'
    }
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  const removeBanner = (index: number) => {
    setBanners(banners.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-5xl mx-auto pb-24 px-1 space-y-6 scale-[0.98] origin-top">
      <div className="flex items-center justify-between px-2">
         <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 flex items-center justify-center border border-slate-800 shadow-xl">
               <Megaphone className="w-5 h-5 text-rose-500" />
            </div>
            <div>
               <h1 className="text-lg font-black text-slate-900 leading-none uppercase">Marketing Terminal</h1>
               <p className="text-[7px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-1.5">Visual Asset Deployment</p>
            </div>
         </div>
         <button 
           onClick={handleSave}
           disabled={isSaving}
           className={`px-6 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all flex items-center ${
             isSaved ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-slate-950 text-white hover:bg-rose-600 shadow-xl'
           }`}
         >
           {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" /> : isSaved ? <CheckCircle2 className="w-3.5 h-3.5 mr-2" /> : <Save className="w-3.5 h-3.5 mr-2 text-rose-500" />}
           {isSaved ? "Sync Complete" : "Commit Overrides"}
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Banner Section */}
        <div className="lg:col-span-2 space-y-4">
           <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                 <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Home Sliders</h3>
                 <button className="p-1.5 bg-rose-50 text-rose-600 rounded-lg"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {banners.map((url, i) => (
                  <div key={i} className="relative aspect-[16/8] rounded-2xl overflow-hidden group border border-gray-100">
                     <img src={url} className="w-full h-full object-cover" alt="Banner" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <button className="p-2 bg-white rounded-lg text-gray-900"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => removeBanner(i)} className="p-2 bg-white rounded-lg text-rose-600"><Trash2 className="w-4 h-4" /></button>
                     </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest border-b border-gray-50 pb-3">News Ticker Feed</h3>
              <textarea 
                value={config.newsTicker}
                onChange={e => setConfig({...config, newsTicker: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 font-bold text-xs outline-none focus:border-rose-400 h-24 resize-none shadow-inner" 
                placeholder="Scrolling text message..."
              />
           </div>
        </div>

        {/* Popup Section */}
        <div className="lg:col-span-1 space-y-4">
           <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white shadow-2xl space-y-5 border border-white/5">
              <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-rose-500" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest">Flash Popup</h3>
                 </div>
                 <button 
                  onClick={() => setConfig({...config, popup: {...config.popup, isActive: !config.popup.isActive}})}
                  className={`w-10 h-6 rounded-full p-1 transition-all ${config.popup.isActive ? 'bg-rose-500' : 'bg-white/10'}`}
                 >
                   <motion.div animate={{ x: config.popup.isActive ? 16 : 0 }} className="w-4 h-4 bg-white rounded-full shadow-md" />
                 </button>
              </div>

              <div className="aspect-square bg-white/5 rounded-3xl overflow-hidden border border-white/10 relative group">
                 <img src={config.popup.imageUrl} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all" alt="Popup" />
                 <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white px-4 py-2 rounded-xl text-slate-900 font-black text-[9px] uppercase tracking-widest">Update Image</div>
                 </button>
              </div>

              <div className="space-y-3">
                 <div className="space-y-1">
                    <label className="text-[7px] font-black text-gray-500 uppercase tracking-widest ml-1">Target Link</label>
                    <input value={config.popup.link} onChange={e => setConfig({...config, popup: {...config.popup, link: e.target.value}})} className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 font-bold text-[10px] outline-none focus:border-rose-500" />
                 </div>
              </div>
           </div>

           <div className="bg-rose-50 p-6 rounded-[2.5rem] border border-rose-100 opacity-80">
              <div className="flex items-center space-x-2 mb-3">
                 <MonitorSmartphone className="w-4 h-4 text-rose-600" />
                 <h4 className="text-[9px] font-black text-rose-900 uppercase">Live Preview</h4>
              </div>
              <p className="text-[8px] font-bold text-rose-700 leading-relaxed uppercase tracking-tighter">
                Assets are cached at the browser node. Changes propagate to users within 60 seconds of synchronization.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMarketing;
