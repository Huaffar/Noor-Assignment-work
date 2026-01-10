import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Heart, Users, Zap, Building, Globe, Server, CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12 pb-24 scale-[0.98] origin-top">
      {/* Brand Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center space-x-3 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100 shadow-sm">
           <Building className="w-4 h-4 text-rose-600" />
           <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Official Platform Identity</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-none uppercase">
          Noor <span className="text-rose-500 italic">Official</span>
        </h1>
        <div className="bg-white p-10 rounded-[3rem] border border-rose-50 shadow-2xl shadow-rose-900/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-10 -mt-10" />
          <p className="font-urdu text-4xl text-rose-800 font-bold leading-[2.6] text-right" dir="rtl">
            نور آفیشل پاکستان کا سب سے بڑا اور قابلِ اعتماد ڈیجیٹل ورک پلیٹ فارم ہے جہاں ہر شخص اپنی صلاحیتوں کے مطابق باعزت آمدنی حاصل کر سکتا ہے۔ ہمارا عزم شفافیت، سیکیورٹی اور بروقت ادائیگی ہے۔
          </p>
        </div>
      </motion.div>

      {/* Mission & Vision Matrix */}
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:border-rose-200 transition-all"
        >
          <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-8 shadow-inner group-hover:scale-95 transition-transform">
            <Target className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tighter">Our Core Mission</h2>
          <p className="font-urdu text-2xl text-gray-600 leading-[2.4] text-right" dir="rtl">
            ہمارا مقصد پاکستان میں بے روزگاری کا خاتمہ اور محنتی افراد کو ایک ایسا محفوظ ماحول فراہم کرنا ہے جہاں وہ اپنے گھر سے مکمل خود مختاری کے ساتھ کام کر سکیں۔
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
          <h2 className="text-xl font-black mb-4 uppercase tracking-tighter">Future Vision</h2>
          <p className="font-urdu text-2xl text-rose-100/80 leading-[2.4] text-right" dir="rtl">
            ہم ایک ایسا ڈیجیٹل انفراسٹرکچر بنانا چاہتے ہیں جس سے منسلک ہو کر ہر پاکستانی شہری عالمی معیشت میں اپنا حصہ ڈال سکے اور اپنی زندگی کو بہتر بنا سکے۔
          </p>
        </motion.div>
      </div>

      {/* Transparency Hub */}
      <div className="bg-slate-50 border border-gray-100 rounded-[3.5rem] p-10 md:p-16 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div className="space-y-6">
              <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Transparency Hub</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Noor Official operates with 100% logic transparency. Every transaction and task audit is recorded in the system ledger for maximum security.
              </p>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <Server className="w-5 h-5 text-rose-600 mb-2" />
                    <p className="text-xl font-black text-slate-900">99.9%</p>
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Uptime Sync</p>
                 </div>
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
                    <p className="text-xl font-black text-slate-900">End-to-End</p>
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">AES-256 Shield</p>
                 </div>
              </div>
           </div>
           <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-gray-100 space-y-6">
              <h4 className="text-[10px] font-black text-rose-600 uppercase tracking-[0.3em]">Platform Credibility</h4>
              <div className="space-y-4">
                 {[
                   "Verified SECP Compliance",
                   "EasyPaisa/JazzCash Business Partner",
                   "Instant Payout Logic Enabled",
                   "24/7 Human Audit Node"
                 ].map((check, i) => (
                   <div key={i} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shadow-inner"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /></div>
                      <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight">{check}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <div className="text-center pt-8">
        <div className="inline-flex items-center space-x-3 bg-slate-950 text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl border border-white/10 active:scale-95 transition-all cursor-pointer">
          <Globe className="w-5 h-5 text-rose-500" />
          <span>Global Security Sync Active</span>
        </div>
      </div>
    </div>
  );
};

export default About;