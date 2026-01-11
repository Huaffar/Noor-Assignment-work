import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Briefcase, 
  ShieldCheck, 
  Wallet, 
  Lightbulb, 
  ArrowRight,
  Zap,
  Info
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';

const Instructions: React.FC = () => {
  const { settings } = useSystem();

  const steps = [
    {
      icon: UserPlus,
      title: "Step 1: Registration",
      urdu: "پہلا مرحلہ: اکاؤنٹ بنانا",
      desc: "Register with your active WhatsApp number.",
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      icon: Briefcase,
      title: "Step 2: Choose Plan",
      urdu: "دوسرا مرحلہ: پلان کا انتخاب",
      desc: "Select a salary tier to unlock daily tasks.",
      color: "text-rose-500",
      bg: "bg-rose-50"
    },
    {
      icon: ShieldCheck,
      title: "Step 3: Complete Work",
      urdu: "تیسرا مرحلہ: کام کی تکمیل",
      desc: "Write assignments clearly and upload photos.",
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      icon: Wallet,
      title: "Step 4: Get Paid",
      urdu: "چوتھا مرحلہ: رقم نکالنا",
      desc: "Withdraw funds to EasyPaisa or JazzCash.",
      color: "text-amber-500",
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6 pb-24 scale-[0.98] origin-top">
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto shadow-xl border border-rose-100"
        >
          <Lightbulb className="w-6 h-6 text-rose-600 animate-pulse" />
        </motion.div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">How It Works</h1>
          <p className="text-[7px] text-gray-400 font-bold uppercase tracking-[0.4em] mt-2">Professional Earning Steps</p>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-5 rounded-[1.8rem] border border-gray-100 shadow-sm flex items-start space-x-4 relative overflow-hidden"
          >
             <div className={`w-10 h-10 rounded-xl ${step.bg} ${step.color} flex items-center justify-center shrink-0 shadow-inner`}>
                <step.icon className="w-5 h-5" />
             </div>
             <div className="flex-1 min-w-0">
                <div className="border-b border-gray-50 pb-2 mb-2">
                   <h3 className="text-[11px] font-black text-slate-900 uppercase">{step.title}</h3>
                   <p className="text-[9px] text-gray-400 font-medium">{step.desc}</p>
                </div>
                <div className="text-right">
                   <h4 className="font-urdu text-lg text-rose-600 font-bold mb-1">{step.urdu}</h4>
                   <p className="font-urdu text-[13px] text-slate-500 leading-relaxed" dir="rtl">
                     {i === 0 ? "اپنا واٹس ایپ نمبر استعمال کریں تاکہ سسٹم آپ سے جڑا رہے۔" : 
                      i === 1 ? "اپنی گنجائش کے مطابق پیکج منتخب کریں تاکہ کام شروع ہو سکے۔" :
                      i === 2 ? "دیے گئے اسائنمنٹ کو مکمل توجہ سے لکھیں اور فوٹو اپلوڈ کریں۔" :
                      "کام کی منظوری کے بعد اپنی رقم ایزی پیسہ یا جاز کیش میں حاصل کریں۔"}
                   </p>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
         <div className="relative z-10 text-center space-y-4">
            <h3 className="text-lg font-black uppercase tracking-tight">Need Support?</h3>
            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.3em]">24/7 Response Guaranteed</p>
            <button 
              onClick={() => window.open(`https://wa.me/${settings.supportWhatsApp}`, '_blank')}
              className="w-full py-4 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center active:scale-95 transition-all"
            >
               WhatsApp Support <ArrowRight className="w-4 h-4 ml-2" />
            </button>
         </div>
      </div>
    </div>
  );
};

export default Instructions;