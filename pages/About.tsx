import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Heart, Users, Zap, Building } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12 pb-24 scale-[0.98] origin-top">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center space-x-3 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100 shadow-sm">
           <Building className="w-4 h-4 text-rose-600" />
           <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Platform Integrity Verified</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-none uppercase">
          Noor <span className="text-rose-500 italic">Official</span>
        </h1>
        <div className="bg-white p-8 rounded-[3rem] border border-rose-50 shadow-xl shadow-rose-900/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-10 -mt-10" />
          <p className="font-urdu text-3xl md:text-4xl text-rose-800 font-bold leading-[2.4] text-right" dir="rtl">
            نور آفیشل پاکستان کا سب سے بڑا اور قابلِ اعتماد نیٹ ورک ہے جو ڈیجیٹل اسائنمنٹس اور ہینڈ رائٹنگ کے ذریعے لوگوں کو گھر بیٹھے باعزت روزگار فراہم کرتا ہے۔ ہمارا مقصد شفافیت اور فوری ادائیگی کے ذریعے آپ کے وقت کی قدر کرنا ہے۔
          </p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:border-rose-200 transition-all"
        >
          <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-8 shadow-inner group-hover:scale-95 transition-transform">
            <Target className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tighter">ہماری مشن (Our Mission)</h2>
          <p className="font-urdu text-2xl text-gray-600 leading-[2.2] text-right" dir="rtl">
            ہمارا مشن پاکستان کے نوجوانوں اور خواتین کو ایسے مواقع فراہم کرنا ہے جہاں وہ اپنی مہارت کا استعمال کر کے اپنی مالی زندگی کو بہتر بنا سکیں۔ ہم شفافیت اور بھروسے پر یقین رکھتے ہیں۔
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-slate-950 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group border border-white/5"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-3xl" />
          <div className="w-14 h-14 bg-rose-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-2xl group-hover:rotate-12 transition-transform">
            <Eye className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black mb-4 uppercase tracking-tighter">ہمارا وژن (Our Vision)</h2>
          <p className="font-urdu text-2xl text-rose-100/80 leading-[2.2] text-right" dir="rtl">
            ہم ایک ایسا ڈیجیٹل ایکو سسٹم بنانا چاہتے ہیں جہاں ہر محنتی انسان کو اس کی محنت کا پھل بغیر کسی تاخیر کے ملے۔ نور آفیشل ہر پاکستانی کی ترقی کا ضامن بننا چاہتا ہے۔
          </p>
        </motion.div>
      </div>

      <div className="bg-rose-50 rounded-[3.5rem] p-10 md:p-16 border border-rose-100 relative overflow-hidden text-center shadow-inner">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <Heart className="w-96 h-96 -ml-24 -mt-24 text-rose-600" />
        </div>
        
        <div className="relative z-10 space-y-8">
          <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">کیوں منتخب کریں؟ (Why Choose Us?)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck, text: "100% محفوظ نیٹ ورک", color: "text-emerald-600", bg: "bg-emerald-50" },
              { icon: Zap, text: "فوری ایزی پیسہ ادائیگی", color: "text-rose-600", bg: "bg-rose-50" },
              { icon: Users, text: "15000+ فعال ممبرز", color: "text-blue-600", bg: "bg-blue-50" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl flex flex-col items-center justify-center space-y-4 shadow-sm border border-rose-100/50 hover:scale-105 transition-transform">
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center shadow-inner`}>
                   <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <p className="font-urdu text-xl font-bold text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="font-urdu text-2xl text-rose-700/80 max-w-2xl mx-auto pt-6 leading-[2.2] italic" dir="rtl">
            نور آفیشل صرف ایک ویب سائٹ نہیں بلکہ ایک مضبوط کمیونٹی ہے جو پاکستانی ٹیلنٹ کو عالمی معیار پر متعارف کروانے کے لیے کوشاں ہے۔
          </p>
        </div>
      </div>

      <div className="text-center pt-8">
        <div className="inline-flex items-center space-x-3 bg-slate-950 text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl border border-white/10 active:scale-95 transition-all">
          <ShieldCheck className="w-5 h-5 text-rose-500" />
          <span>Security Sync Protocol Active</span>
        </div>
      </div>
    </div>
  );
};

export default About;