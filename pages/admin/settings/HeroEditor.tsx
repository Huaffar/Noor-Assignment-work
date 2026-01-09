
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cropper from 'react-easy-crop';
import { 
  UploadCloud, 
  Save, 
  Trash2, 
  Edit2, 
  Plus,
  ImageIcon,
  Loader2,
  Layers,
  X,
  Maximize,
  AspectRatio,
  Check
} from 'lucide-react';
import { useSystem, HeroSlide } from '../../../context/SystemContext';

const HeroEditor: React.FC = () => {
  const { settings, updateSettings } = useSystem();
  const [slides, setSlides] = useState<HeroSlide[]>(settings.heroConfig.slides);
  const [isSaving, setIsSaving] = useState(false);
  
  // Cropper States
  const [cropModal, setCropModal] = useState<{ open: boolean, image: string, slideId?: string } | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(16 / 9);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback((_area: any, pixels: any) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCropModal({ open: true, image: reader.result as string });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const applyCrop = async () => {
    // In a real app, you would use canvas to get the blob here.
    // For this simulation, we use the original image + crop metadata.
    const newSlide: HeroSlide = { 
      id: cropModal?.slideId || 's' + Date.now(), 
      image: cropModal?.image || '', 
      title: "New Earning Node", 
      subtitle: "Join the verified Pakistani worker network.", 
      buttonText: "Join Now", 
      buttonLink: "/register" 
    };

    if (cropModal?.slideId) {
      setSlides(prev => prev.map(s => s.id === cropModal.slideId ? newSlide : s));
    } else {
      setSlides(prev => [...prev, newSlide]);
    }
    setCropModal(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    updateSettings({ heroConfig: { ...settings.heroConfig, slides } });
    setIsSaving(false);
    alert("Landing Infrastructure Updated.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Banner Node Controller</h3>
          <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Multi-Ratio Visual Assets</p>
        </div>
        <div className="flex items-center space-x-2">
          <input type="file" id="hero-up" hidden onChange={handleFileUpload} accept="image/*" />
          <button 
            onClick={() => document.getElementById('hero-up')?.click()}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-950 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-600 shadow-xl transition-all"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Deploy Asset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {slides.map((slide, idx) => (
              <motion.div 
                key={slide.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-rose-200 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-12 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 shrink-0 relative">
                    <img src={slide.image} className="w-full h-full object-cover" alt="Slide" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <Maximize className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[10px] font-black text-gray-900 uppercase truncate max-w-[150px]">{slide.title}</h4>
                    <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">Node #0{idx+1}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5">
                  <button onClick={() => setCropModal({ open: true, image: slide.image, slideId: slide.id })} className="p-2 text-gray-400 hover:text-rose-600 bg-gray-50 rounded-lg"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setSlides(slides.filter(s => s.id !== slide.id))} className="p-2 text-gray-400 hover:text-rose-600 bg-gray-50 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-3.5 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl flex items-center justify-center hover:bg-rose-600 active:scale-95 transition-all"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2 text-rose-500" />}
            Sync Visual Core
          </button>
        </div>

        <div className="space-y-4">
           <div className="bg-rose-50 p-5 rounded-[2rem] border border-rose-100 shadow-inner">
              <div className="flex items-center space-x-2 mb-3">
                 <AspectRatio className="w-4 h-4 text-rose-600" />
                 <h4 className="text-[9px] font-black text-rose-900 uppercase">Ratio Compliance</h4>
              </div>
              <p className="text-[8px] font-bold text-rose-700 uppercase leading-relaxed">
                Visual nodes are automatically scaled. Use <span className="font-black text-rose-900 italic">21:9</span> for a cinematic desktop feel or <span className="font-black text-rose-900 italic">16:9</span> for mobile-optimized grids.
              </p>
           </div>
        </div>
      </div>

      {/* ADVANCED CROPPER MODAL */}
      <AnimatePresence>
        {cropModal?.open && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-[80vh]"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shadow-inner"><Maximize className="w-5 h-5" /></div>
                    <div>
                       <h3 className="text-sm font-black text-gray-900 uppercase">Precision Cropper</h3>
                       <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Asset Geometry Control</p>
                    </div>
                 </div>
                 <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-xl">
                    {[
                      { l: '16:9', v: 16/9 },
                      { l: '21:9', v: 21/9 },
                      { l: '4:3', v: 4/3 }
                    ].map(r => (
                      <button 
                        key={r.l} onClick={() => setAspect(r.v)}
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${aspect === r.v ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-400'}`}
                      >
                        {r.l}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="flex-1 relative bg-slate-900">
                <Cropper
                  image={cropModal.image}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                 <div className="flex-1 px-4">
                    <input type="range" value={zoom} min={1} max={3} step={0.1} onChange={(e) => setZoom(Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-600" />
                 </div>
                 <div className="flex space-x-3">
                    <button onClick={() => setCropModal(null)} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-400 rounded-xl font-black text-[10px] uppercase">Cancel</button>
                    <button onClick={applyCrop} className="px-10 py-2.5 bg-slate-950 text-white rounded-xl font-black text-[10px] uppercase flex items-center shadow-xl hover:bg-rose-600">
                      <Check className="w-4 h-4 mr-2 text-rose-500" /> Confirm Crop
                    </button>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroEditor;
