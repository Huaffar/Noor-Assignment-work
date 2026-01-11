import React from 'react';
import { motion } from 'framer-motion';
import { Scale, AlertCircle, CheckCircle, Ban, ShieldAlert } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6 pb-24 scale-[0.98] origin-top">
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ rotate: 10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center mx-auto shadow-xl border border-slate-800"
        >
          <Scale className="w-6 h-6 text-theme-primary" />
        </motion.div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">Terms of Service</h1>
          <p className="text-[7px] text-gray-400 font-bold uppercase tracking-[0.4em] mt-2">Platform Rules & Contract</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
        {[
          { icon: CheckCircle, title: "Account Usage", desc: "One account per person. Multiple accounts lead to a permanent ban.", urdu: "ایک صارف صرف ایک اکاؤنٹ بنا سکتا ہے۔ خلاف ورزی پر پابندی لگائی جائے گی۔" },
          { icon: AlertCircle, title: "Work Quality", desc: "Assignment work must be clear and original. Plagiarism is not paid.", urdu: "اسائنمنٹ کا کام صاف اور اصل ہونا چاہیے۔ نقل کرنے پر ادائیگی نہیں ہوگی۔" },
          { icon: Ban, title: "Non-Refundable", desc: "Activation fees for plans are non-refundable after activation.", urdu: "پلان ایکٹو ہونے کے بعد فیس کسی بھی صورت میں واپس نہیں کی جائے گی۔" }
        ].map((rule, i) => (
          <div key={i} className="p-5 space-y-3">
            <div className="flex items-center space-x-3">
               <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <rule.icon className="w-4 h-4" />
               </div>
               <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{rule.title}</h3>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{rule.desc}</p>
            <p className="font-urdu text-[15px] text-indigo-800 font-bold text-right" dir="rtl">{rule.urdu}</p>
          </div>
        ))}
      </div>

      <div className="bg-rose-50 border border-rose-100 p-5 rounded-2xl flex items-center space-x-3 mx-1">
         <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
         <p className="text-[8px] font-bold text-rose-700 uppercase tracking-tighter">
            Any attempt to cheat the system will result in immediate account termination without notice.
         </p>
      </div>
    </div>
  );
};

export default Terms;