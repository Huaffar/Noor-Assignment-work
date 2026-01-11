import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, CheckCircle2, Globe, Cpu, Users, Building } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6 pb-24 scale-[0.98] origin-top">
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center mx-auto shadow-xl border border-slate-800"
        >
          <Building className="w-6 h-6 text-theme-primary" />
        </motion.div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">About Noor Official</h1>
          <p className="text-[7px] text-gray-400 font-bold uppercase tracking-[0.4em] mt-2">Verified Earning System v4.5</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden"
      >
        <p className="font-urdu text-lg text-slate-700 font-bold leading-[2.2] text-right" dir="rtl">
          نور آفیشل پاکستان کا سب سے بڑا اور قابلِ اعتماد ڈیجیٹل ورک پلیٹ فارم ہے جہاں ہر محنتی شہری اپنی صلاحیتوں کے مطابق باعزت اور مستحکم آمدنی حاصل کر سکتا ہے۔ ہمارا عزم شفافیت اور بروقت ادائیگی ہے۔
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-3">
        {[
          { 
            icon: Target, 
            title: "Core Mission", 
            urdu: "پاکستان میں بے روزگاری کا خاتمہ اور محنتی افراد کو ایک محفوظ ماحول فراہم کرنا۔",
            color: "text-rose-500",
            bg: "bg-rose-50"
          },
          { 
            icon: Eye, 
            title: "Future Vision", 
            urdu: "ہر پاکستانی شہری کو عالمی ڈیجیٹل معیشت کا حصہ بنانا۔",
            color: "text-indigo-500",
            bg: "bg-indigo-50"
          }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-5 rounded-3xl border border-gray-100 flex items-center space-x-4"
          >
            <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 shadow-inner`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
               <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{item.title}</h3>
               <p className="font-urdu text-[14px] text-slate-500 leading-relaxed text-right" dir="rtl">{item.urdu}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
         <div className="bg-slate-950 p-5 rounded-[2rem] text-white shadow-xl">
            <Users className="w-4 h-4 text-theme-primary mb-3" />
            <p className="text-[14px] font-black tracking-tighter">15,000+</p>
            <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest mt-1">Active Workers</p>
         </div>
         <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500 mb-3" />
            <p className="text-[14px] font-black text-slate-900 tracking-tighter">AES-256</p>
            <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mt-1">Secure Account</p>
         </div>
      </div>
    </div>
  );
};

export default About;