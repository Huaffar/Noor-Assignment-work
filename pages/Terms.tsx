import React from 'react';
import { motion } from 'framer-motion';
import { Scale, AlertCircle, CheckCircle, Ban } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 pb-24">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Terms of Service</h1>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Node Participation Contract</p>
      </div>

      <div className="themed-card p-10 space-y-8 shadow-2xl">
        <section className="space-y-4">
          <div className="flex items-center space-x-3 text-theme-primary">
            <CheckCircle className="w-6 h-6" />
            <h2 className="text-xl font-black uppercase">Worker Eligibility</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            Users must be Pakistani residents with a valid mobile wallet. One user is allowed only one node (account). Attempting to sync multiple nodes from a single IP will result in a global ban.
          </p>
          <div className="p-4 bg-rose-50 border-r-4 border-rose-500">
            <p className="font-urdu text-2xl text-rose-800">ایک صارف صرف ایک اکاؤنٹ بنا سکتا ہے۔ ایک سے زیادہ اکاؤنٹ بنانے پر تمام اکاؤنٹس بلاک کر دیے جائیں گے۔</p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center space-x-3 text-theme-primary">
            <AlertCircle className="w-6 h-6" />
            <h2 className="text-xl font-black uppercase">Payload Integrity</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            Assignments must be 100% original. Submission of blurry, duplicate, or AI-generated handwriting will lead to reward deduction or node suspension without notice.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center space-x-3 text-theme-primary">
            <Ban className="w-6 h-6" />
            <h2 className="text-xl font-black uppercase">Refund Policy</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            Plan activation fees are utilized for network maintenance and worker payouts. As such, once a revenue node is initialized, fees are strictly non-refundable.
          </p>
        </section>
      </div>

      <div className="flex items-center justify-center space-x-4 opacity-30">
        <Scale className="w-8 h-8" />
        <p className="text-[10px] font-black uppercase tracking-widest">Governed by Pakistani Digital Laws</p>
      </div>
    </div>
  );
};

export default Terms;