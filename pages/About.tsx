
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Heart, Users, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
          Noor <span className="text-rose-500 italic">Official</span>
        </h1>
        <div className="bg-white/40 p-6 rounded-[2rem] border border-rose-100 shadow-sm">
          <p className="urdu text-xl md:text-2xl text-rose-700 font-bold leading-relaxed">
            نور آفیشل پاکستان کا سب سے بڑا اور قابلِ اعتماد نیٹ ورک ہے جو ڈیجیٹل اسائنمنٹس اور ہینڈ رائٹنگ کے ذریعے لوگوں کو گھر بیٹھے باعزت روزگار فراہم کرتا ہے۔ ہمارا مقصد شفافیت اور فوری ادائیگی کے ذریعے آپ کے وقت کی قدر کرنا ہے۔
          </p>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden"
        >
          <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 mb-5">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-black text-gray-900 mb-3">ہماری مشن (Our Mission)</h2>
          <p className="urdu text-lg text-gray-600">
            ہمارا مشن پاکستان کے نوجوانوں اور خواتین کو ایسے مواقع فراہم کرنا ہے جہاں وہ اپنی مہارت کا استعمال کر کے اپنی مالی زندگی کو بہتر بنا سکیں۔ ہم شفافیت اور بھروسے پر یقین رکھتے ہیں۔
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl shadow-rose-900/10"
        >
          <div className="w-12 h-12 bg-rose-600 rounded-xl flex items-center justify-center text-white mb-5">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-black mb-3">ہمارا وژن (Our Vision)</h2>
          <p className="urdu text-lg text-rose-200">
            ہم ایک ایسا ڈیجیٹل ایکو سسٹم بنانا چاہتے ہیں جہاں ہر محنتی انسان کو اس کی محنت کا پھل بغیر کسی تاخیر کے ملے۔ نور آفیشل ہر پاکستانی کی ترقی کا ضامن بننا چاہتا ہے۔
          </p>
        </motion.div>
      </div>

      {/* Why Us Section */}
      <div className="bg-rose-50 rounded-[2.5rem] p-8 md:p-12 border border-rose-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <Heart className="w-64 h-64 -ml-16 -mt-16" />
        </div>
        
        <div className="relative z-10 text-center space-y-6">
          <h3 className="text-2xl font-black text-gray-900">کیوں منتخب کریں؟ (Why Choose Us?)</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, text: "100% محفوظ نیٹ ورک", color: "text-emerald-600" },
              { icon: Zap, text: "فوری ایزی پیسہ ادائیگی", color: "text-rose-600" },
              { icon: Users, text: "15000+ فعال ممبرز", color: "text-blue-600" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 shadow-sm border border-rose-100/50">
                <item.icon className={`w-6 h-6 ${item.color}`} />
                <p className="urdu text-sm font-bold text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="urdu text-lg text-rose-700/80 max-w-2xl mx-auto pt-4">
            نور آفیشل صرف ایک ویب سائٹ نہیں بلکہ ایک مضبوط کمیونٹی ہے جو پاکستانی ٹیلنٹ کو عالمی معیار پر متعارف کروانے کے لیے کوشاں ہے۔
          </p>
        </div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-slate-900 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-gray-200">
          <ShieldCheck className="w-4 h-4 text-rose-500" />
          <span>Noor Official Security Verified</span>
        </div>
      </div>
    </div>
  );
};

export default About;
