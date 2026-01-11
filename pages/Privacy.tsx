import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Lock, Server, Globe } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6 pb-24 scale-[0.98] origin-top">
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center mx-auto shadow-xl border border-slate-800"
        >
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
        </motion.div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">Privacy Policy</h1>
          <p className="text-[7px] text-gray-400 font-bold uppercase tracking-[0.4em] mt-2">Data Protection v2.5</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
        {[
          { icon: Eye, title: "Data Collection", desc: "We only collect necessary details like Name and WhatsApp.", urdu: "ہم صرف ضروری معلومات جیسے نام اور واٹس ایپ محفوظ کرتے ہیں۔" },
          { icon: Lock, title: "Vault Protection", desc: "Your passwords and funds are stored in a secure vault.", urdu: "آپ کا ڈیٹا جدید ترین سیکیورٹی سسٹم کے تحت محفوظ رکھا جاتا ہے۔" },
          { icon: Server, title: "Third Parties", desc: "We never share your personal data with any outside party.", urdu: "آپ کی معلومات کسی تیسرے فریق کو کبھی نہیں دی جائیں گی۔" }
        ].map((sec, i) => (
          <div key={i} className="p-5 space-y-3">
            <div className="flex items-center space-x-3">
               <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <sec.icon className="w-4 h-4" />
               </div>
               <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{sec.title}</h3>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{sec.desc}</p>
            <p className="font-urdu text-[15px] text-rose-800 font-bold text-right" dir="rtl">{sec.urdu}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 border border-gray-100 p-5 rounded-2xl text-center">
         <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
            Last Updated: {new Date().toLocaleDateString()} • Your data is 100% encrypted.
         </p>
      </div>
    </div>
  );
};

export default Privacy;