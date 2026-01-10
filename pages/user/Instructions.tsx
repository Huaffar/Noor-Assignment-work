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
  AlertCircle,
  Lightbulb,
  Zap,
  MousePointer2
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';

const Instructions: React.FC = () => {
  const { settings } = useSystem();

  const guides = [
    {
      icon: UserPlus,
      titleEn: "01. Create Node",
      titleUr: "مرحلہ 1: اپنا اکاؤنٹ بنائیں",
      descEn: "Initialize your identity with an active WhatsApp number. This is your communication link.",
      descUr: "اپنے واٹس ایپ نمبر کے ساتھ سائن اپ کریں۔ یہی آپ کا پلیٹ فارم سے رابطے کا ذریعہ ہوگا۔",
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      icon: Briefcase,
      titleEn: "02. Select Earning Tier",
      titleUr: "مرحلہ 2: پلان کا انتخاب کریں",
      descEn: "Choose a revenue node (Standard, Gold, or Diamond) to unlock high-yield daily tasks.",
      descUr: "اپنی گنجائش کے مطابق ایک پلان منتخب کریں تاکہ آپ روزانہ کے کام شروع کر سکیں۔",
      color: "bg-rose-50 text-rose-600 border-rose-100"
    },
    {
      icon: ShieldCheck,
      titleEn: "03. Payload Execution",
      titleUr: "مرحلہ 3: اسائنمنٹ مکمل کریں",
      descEn: "Write or type tasks with 100% precision. Low-quality captures will result in verification failure.",
      descUr: "دیے گئے کام کو مکمل توجہ سے لکھیں یا ٹائپ کریں۔ غلطی کی صورت میں ادائیگی روک دی جائے گی۔",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      icon: Wallet,
      titleEn: "04. Capital Withdrawal",
      titleUr: "مرحلہ 4: رقم وصول کریں",
      descEn: "Once audit is complete, initialize withdrawal to your mobile wallet. Processing is instant.",
      descUr: "کام کی تصدیق کے بعد اپنی رقم ایزی پیسہ یا جاز کیش میں فوری طور پر نکلوا لیں۔",
      color: "bg-amber-50 text-amber-600 border-amber-100"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pb-24 px-2 space-y-12 scale-[0.98] origin-top">
      <div className="text-center space-y-5">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-slate-950 rounded-[2.5rem] flex items-center justify-center text-rose-500 mx-auto shadow-2xl mb-6 border border-slate-800"
        >
           <Lightbulb className="w-10 h-10 animate-pulse" />
        </motion.div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">Learning Center</h1>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Official Platform Onboarding Protocol</p>
      </div>

      {/* Timeline Guide */}
      <div className="space-y-4">
        {guides.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all"
          >
             <div className="absolute -right-4 -top-4 text-slate-50 font-black text-9xl pointer-events-none group-hover:text-rose-50 transition-colors">0{i+1}</div>
             <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${item.color} shadow-inner shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                   <item.icon className="w-10 h-10" />
                </div>
                
                <div className="flex-1 space-y-6">
                   <div className="border-b border-gray-50 pb-4">
                      <h3 className="text-lg font-black text-slate-900 uppercase mb-2 flex items-center">
                        {item.titleEn}
                      </h3>
                      <p className="text-[12px] text-slate-500 leading-relaxed font-medium">{item.descEn}</p>
                   </div>
                   
                   <div className="text-right">
                      <h3 className="font-urdu text-3xl font-black text-rose-600 mb-3 leading-[1.8]">{item.titleUr}</h3>
                      <p className="font-urdu text-2xl text-slate-600 leading-[2.4]">{item.descUr}</p>
                   </div>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      {/* Live Help Card */}
      <div className="bg-slate-950 p-12 rounded-[4rem] text-white relative overflow-hidden shadow-2xl border border-slate-800 mx-2">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-theme-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
         <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="space-y-6 max-w-xl text-center lg:text-left">
               <div className="inline-flex items-center space-x-2 bg-rose-600/10 px-4 py-2 rounded-full border border-rose-600/20">
                  <Zap className="w-4 h-4 text-rose-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Fast-Track Onboarding</span>
               </div>
               <h2 className="text-3xl font-black uppercase tracking-tight leading-tight">Need Real-Time Assistance?</h2>
               <p className="text-sm text-slate-400 font-medium uppercase tracking-widest leading-loose">
                 Our support engineers are available 24/7 in Urdu and English to guide you through the node initialization process.
               </p>
               <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
                  <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                     <span className="text-[9px] font-black uppercase tracking-widest">Secure Sync Node</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                     <Smartphone className="w-4 h-4 text-rose-500" />
                     <span className="text-[9px] font-black uppercase tracking-widest">Pakistan HQ</span>
                  </div>
               </div>
            </div>
            <button 
               onClick={() => window.open(`https://wa.me/${settings.supportWhatsApp}`, '_blank')}
               className="px-12 py-6 bg-white text-slate-950 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:bg-rose-600 hover:text-white transition-all active:scale-95 flex items-center group"
            >
               Connect to Hub <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
         </div>
      </div>
      
      {/* Footer Assurance */}
      <div className="flex flex-col items-center justify-center space-y-4 pt-10">
         <div className="flex space-x-4 opacity-30 grayscale">
            <CheckCircle2 className="w-6 h-6" />
            <ShieldCheck className="w-6 h-6" />
            <BookOpen className="w-6 h-6" />
         </div>
         <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.6em]">Protocol Instruction Complete</span>
      </div>
    </div>
  );
};

export default Instructions;