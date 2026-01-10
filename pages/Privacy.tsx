import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Lock, Server } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 pb-24">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Privacy Shield</h1>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Official Data Protection Protocol</p>
      </div>

      <div className="themed-card p-10 space-y-8 shadow-2xl">
        <section className="space-y-4">
          <div className="flex items-center space-x-3 text-theme-primary">
            <Eye className="w-6 h-6" />
            <h2 className="text-xl font-black uppercase">Information Collection</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            We collect only necessary worker metadata including your Legal Name, WhatsApp Number for communication, and Payment Wallet details for disbursing your earnings. We do not track personal browsing activity outside our portal.
          </p>
          <div className="p-4 bg-gray-50 border-r-4 border-theme-primary">
            <p className="font-urdu text-2xl text-slate-700">ہم صرف آپ کا نام، واٹس ایپ نمبر اور والٹ کی تفصیلات محفوظ کرتے ہیں تاکہ آپ کو بروقت ادائیگی کی جا سکے۔</p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center space-x-3 text-theme-primary">
            <Lock className="w-6 h-6" />
            <h2 className="text-xl font-black uppercase">Secure Nodes</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            All user data is encrypted using AES-256 standards. Your financial information is strictly isolated and accessible only to the automated payout kernel during withdrawal requests.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center space-x-3 text-theme-primary">
            <Server className="w-6 h-6" />
            <h2 className="text-xl font-black uppercase">Third Party Links</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed font-medium">
            Noor Official never sells your information to advertising nodes. We only share transaction identifiers with EasyPaisa and JazzCash hubs to complete your payout synchronization.
          </p>
        </section>
      </div>

      <div className="text-center opacity-30">
        <ShieldCheck className="w-12 h-12 mx-auto mb-2" />
        <p className="text-[8px] font-black uppercase tracking-widest">Last Synced: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Privacy;