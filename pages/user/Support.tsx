
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Mail, 
  ChevronDown, 
  HelpCircle, 
  LifeBuoy,
  ShieldCheck
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-2 shadow-sm">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-4 flex items-center justify-between text-left">
        <span className="text-xs font-black text-gray-900 leading-tight pr-4">{question}</span>
        <ChevronDown className={`w-4 h-4 text-rose-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-gray-50">
            <div className="p-4 text-[11px] text-gray-500 font-medium leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Support: React.FC = () => {
  const { settings } = useSystem();

  const faqs = [
    { question: "How to pay for a plan?", answer: "Go to 'Upgrade Plan', select your tier, and transfer to our EasyPaisa/JazzCash numbers. Upload your TrxID for verification." },
    { question: "Withdrawal locked?", answer: "Invite at least 1 active referral to unlock your first payout forever." },
    { question: "When do tasks reset?", answer: "Every 24 hours at 9:00 AM PKT daily." }
  ];

  return (
    <div className="max-w-xl mx-auto pb-20 space-y-5 px-1">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-rose-200">
          <LifeBuoy className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-black text-gray-900 leading-none">Support Center</h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest max-w-xs mx-auto">We are here for you 24/7</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-center space-y-3">
          <MessageCircle className="w-6 h-6 text-[#25D366] mx-auto" />
          <p className="text-[10px] font-black text-gray-900 uppercase">WhatsApp</p>
          <a href={`https://wa.me/${settings.supportWhatsApp}`} target="_blank" className="block w-full py-2 bg-[#25D366] text-white text-[9px] font-black rounded-lg uppercase">Chat Now</a>
        </div>
        <div className="bg-slate-900 p-5 rounded-3xl text-white text-center space-y-3">
          <Mail className="w-6 h-6 text-rose-500 mx-auto" />
          <p className="text-[10px] font-black uppercase">Email</p>
          <a href="mailto:support@noorofficial.com" className="block w-full py-2 bg-white/10 text-rose-400 text-[9px] font-black rounded-lg uppercase">Contact</a>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center space-x-2 px-2">
           <HelpCircle className="w-4 h-4 text-rose-600" />
           <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">FAQs</h2>
        </div>
        <div>{faqs.map((faq, idx) => <FAQItem key={idx} {...faq} />)}</div>
      </div>

      <div className="bg-gray-100/50 rounded-2xl p-4 flex items-center justify-center space-x-4">
        <div className="flex items-center text-[9px] font-black text-gray-400 uppercase tracking-widest">
           <ShieldCheck className="w-4 h-4 text-emerald-500 mr-2" />
           Verified System Hub
        </div>
      </div>
    </div>
  );
};

export default Support;
