
import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Briefcase, 
  Wallet, 
  ShieldCheck,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Smartphone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
// Fixed: Added useSystem import to access WhatsApp support configuration
import { useSystem } from '../../context/SystemContext';

const Instructions: React.FC = () => {
  // Fixed: Initialized settings via useSystem hook
  const { settings } = useSystem();

  const guides = [
    {
      icon: UserPlus,
      titleEn: "Step 1: Build Account",
      titleUr: "مرحلہ 1: اکاؤنٹ بنانا",
      descEn: "Sign up using your active WhatsApp number and a secure password. Make sure your name matches your ID.",
      descUr: "اپنے واٹس ایپ نمبر اور محفوظ پاس ورڈ کے ساتھ سائن اپ کریں۔ یقینی بنائیں کہ آپ کا نام آپ کے شناختی کارڈ سے مماثل ہے۔",
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      icon: Briefcase,
      titleEn: "Step 2: Choose Plan",
      titleUr: "مرحلہ 2: پلان کا انتخاب",
      descEn: "Select an earning tier that fits your daily capacity. Higher tiers allow more work pages daily.",
      descUr: "ایسا پلان منتخب کریں جو آپ کی روزانہ کی گنجائش کے مطابق ہو۔ اعلیٰ پلانز روزانہ زیادہ کام کی اجازت دیتے ہیں۔",
      color: "bg-rose-50 text-rose-600 border-rose-100"
    },
    {
      icon: ShieldCheck,
      titleEn: "Step 3: Complete Work",
      titleUr: "مرحلہ 3: کام کی تکمیل",
      descEn: "Write assignments clearly on paper, take a sharp photo, and submit before 10 PM PKT daily.",
      descUr: "اسائنمنٹس کو کاغذ پر واضح طور پر لکھیں، صاف تصویر لیں، اور روزانہ رات 10 بجے سے پہلے جمع کرائیں۔",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      icon: Wallet,
      titleEn: "Step 4: Receive Payout",
      titleUr: "مرحلہ 4: ادائیگی کی وصولی",
      descEn: "Earnings are verified by our audit terminal. Withdraw instantly to EasyPaisa or JazzCash.",
      descUr: "آمدنی کی تصدیق ہمارے آڈٹ ٹرمینل سے ہوتی ہے۔ ایزی پیسہ یا جاز کیش میں فوری رقم نکلوائیں۔",
      color: "bg-amber-50 text-amber-600 border-amber-100"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pb-24 px-2 space-y-10">
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 bg-rose-600 rounded-[2rem] flex items-center justify-center text-white mx-auto shadow-2xl mb-6"
        >
           <BookOpen className="w-8 h-8" />
        </motion.div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase leading-none">Learning Center</h1>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Official Onboarding Protocol</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-6 hover:border-rose-100 hover:shadow-xl transition-all group"
          >
             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color} shadow-inner group-hover:scale-110 transition-transform`}>
                <item.icon className="w-7 h-7" />
             </div>
             
             <div className="space-y-4">
                <div className="pb-4 border-b border-gray-50">
                   <h3 className="text-sm font-black text-slate-900 uppercase mb-2">{item.titleEn}</h3>
                   <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{item.descEn}</p>
                </div>
                
                <div className="pt-2 text-right">
                   <h3 className="font-urdu text-2xl font-black text-rose-600 mb-2 leading-[1.8]">{item.titleUr}</h3>
                   <p className="font-urdu text-xl text-slate-600 leading-[2.2]">{item.descUr}</p>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-950 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl border border-slate-800">
         <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl -mr-20 -mt-20" />
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-md">
               <h2 className="text-2xl font-black uppercase tracking-tight">Need 1-on-1 Guidance?</h2>
               <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest leading-loose">
                 Our support agents are available in Urdu and English to help you initialize your earning node.
               </p>
               <div className="flex items-center space-x-3 pt-4">
                  <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[8px] font-black uppercase">Live Support</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                     <Smartphone className="w-3 h-3 text-rose-500" />
                     <span className="text-[8px] font-black uppercase tracking-tighter">Pakistan HQ</span>
                  </div>
               </div>
            </div>
            <button 
               onClick={() => window.open(`https://wa.me/${settings.supportWhatsApp}`, '_blank')}
               className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-rose-600 hover:text-white transition-all active:scale-95"
            >
               Chat on WhatsApp
            </button>
         </div>
      </div>
      
      <div className="flex items-center justify-center space-x-4 opacity-30 grayscale">
         <CheckCircle2 className="w-4 h-4" />
         <span className="text-[9px] font-black uppercase tracking-[0.5em]">End of Instruction Protocol</span>
      </div>
    </div>
  );
};

export default Instructions;
