
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Languages, 
  Lightbulb,
  MousePointer2
} from 'lucide-react';
import { Guide } from '../api/models/Guide';

interface GuideModalProps {
  slug: string;
  label?: string;
}

const GuideModal: React.FC<GuideModalProps> = ({ slug, label = "Help Guide" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [lang, setLang] = useState<'en' | 'ur'>('ur'); 
  const [guide, setGuide] = useState<Guide | null>(null);

  useEffect(() => {
    if (isOpen) {
      const mockData: Guide = {
        slug,
        steps: [
          {
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800",
            titleEn: "Step 1: Choose Payout",
            titleUr: "مرحلہ 1: ادائیگی کا طریقہ",
            descriptionEn: "Select EasyPaisa or JazzCash. The box will turn pink to show it is selected.",
            descriptionUr: "ایزی پیسہ یا جاز کیش منتخب کریں۔ منتخب ہونے پر باکس گلابی ہو جائے گا۔"
          },
          {
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800",
            titleEn: "Step 2: Account Number",
            titleUr: "مرحلہ 2: اپنا نمبر درج کریں",
            descriptionEn: "Carefully type your correct mobile wallet number and the name on your account.",
            descriptionUr: "اپنا صحیح موبائل والٹ نمبر اور وہ نام درج کریں جس پر آپ کا اکاؤنٹ بنا ہوا ہے۔"
          },
          {
            image: "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=800",
            titleEn: "Step 3: Click Withdraw",
            titleUr: "مرحلہ 3: پیسے نکلوانا",
            descriptionEn: "Press the black button. Your payment will arrive in 2 to 4 hours after check.",
            descriptionUr: "کالے رنگ کے بٹن کو دبائیں۔ جانچ پڑتال کے بعد آپ کی رقم 2 سے 4 گھنٹے میں پہنچ جائے گی۔"
          }
        ],
        updatedAt: new Date().toISOString()
      };
      setGuide(mockData);
    }
  }, [isOpen, slug]);

  const steps = guide?.steps || [];
  const activeStep = steps[currentStep];
  const toggleLang = () => setLang(prev => prev === 'en' ? 'ur' : 'en');

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-1.5 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl border border-rose-100 font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95"
      >
        <Lightbulb className="w-3.5 h-3.5" />
        <span>{label}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-white/20"
            >
              <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-white relative z-10">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-rose-600" />
                  <h2 className="text-[11px] font-black text-gray-900 uppercase tracking-widest">Easy Steps Guide</h2>
                </div>
                <div className="flex items-center space-x-2">
                   <button onClick={toggleLang} className="flex items-center space-x-1 px-2.5 py-1.5 bg-gray-100 rounded-lg text-gray-500 hover:text-rose-600 transition-all border border-gray-200 shadow-inner">
                     <Languages className="w-3 h-3" />
                     <span className={`text-[9px] font-black ${lang === 'ur' ? 'font-urdu' : 'uppercase'}`}>{lang === 'en' ? 'اردو' : 'EN'}</span>
                   </button>
                   <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 rounded-xl text-gray-400 hover:text-rose-600"><X className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar">
                <AnimatePresence mode="wait">
                  {activeStep && (
                    <motion.div 
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="p-6 space-y-6"
                    >
                      <div className="aspect-video bg-gray-100 rounded-[2rem] overflow-hidden border border-gray-100 shadow-inner relative group">
                        <img src={activeStep.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Step" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1.5 shadow-lg border border-white/50">
                           <MousePointer2 className="w-3 h-3 text-rose-600" />
                           <span className="text-[8px] font-black uppercase text-gray-900">Tutorial View</span>
                        </div>
                      </div>
                      <div>
                        <h3 className={`text-xl font-black text-slate-900 leading-tight mb-2 ${lang === 'ur' ? 'font-urdu text-2xl text-right leading-[1.8]' : ''}`}>
                          {lang === 'en' ? activeStep.titleEn : activeStep.titleUr}
                        </h3>
                        <p className={`text-slate-500 font-medium ${lang === 'en' ? 'text-xs leading-relaxed' : 'font-urdu text-lg text-right leading-[2.2]'}`}>
                          {lang === 'en' ? activeStep.descriptionEn : activeStep.descriptionUr}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-6 bg-gray-50/50 border-t border-gray-100">
                <div className="flex items-center justify-between gap-4">
                  <button 
                    disabled={currentStep === 0} 
                    onClick={() => setCurrentStep(prev => prev - 1)} 
                    className="p-3 bg-white border border-gray-200 text-gray-400 rounded-2xl disabled:opacity-30 active:scale-95 transition-all shadow-sm"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="flex space-x-1.5">
                    {steps.map((_, i) => (
                      <div key={i} className={`h-2 rounded-full transition-all duration-300 ${currentStep === i ? 'w-8 bg-rose-600' : 'w-2 bg-gray-200'}`} />
                    ))}
                  </div>
                  {currentStep === steps.length - 1 ? (
                    <button 
                      onClick={() => setIsOpen(false)} 
                      className="px-6 py-3 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] active:scale-95 transition-all shadow-xl"
                    >
                      GOT IT
                    </button>
                  ) : (
                    <button 
                      onClick={() => setCurrentStep(prev => prev + 1)} 
                      className="p-3 bg-rose-600 text-white rounded-2xl shadow-xl active:scale-95 transition-all"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GuideModal;
