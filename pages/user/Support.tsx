import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Mail, 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck,
  Send,
  CheckCircle2,
  Check,
  Zap,
  ArrowRight,
  Search,
  MessageSquare
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import { getPublicFAQs } from '../../api/controllers/supportController';

const FAQAccordionItem: React.FC<{ question: string; answer: string; index: number; isOpen: boolean; onClick: () => void }> = ({ question, answer, index, isOpen, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-white rounded-[1.8rem] border transition-all duration-300 overflow-hidden mb-3 ${
        isOpen ? 'border-rose-400 shadow-xl shadow-rose-900/5 ring-4 ring-rose-50' : 'border-gray-100 shadow-sm'
      }`}
    >
      <button 
        onClick={onClick} 
        className="w-full p-5 flex items-center justify-between text-left group"
      >
        <div className="flex items-center space-x-4 min-w-0 pr-4">
           <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
             isOpen ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-500'
           }`}>
             <HelpCircle className="w-4 h-4" />
           </div>
           <span className={`text-[12px] font-black leading-tight truncate uppercase tracking-tight ${
             isOpen ? 'text-rose-600' : 'text-slate-900'
           }`}>
             {question}
           </span>
        </div>
        <div className={`p-1.5 rounded-lg transition-all duration-500 ${isOpen ? 'rotate-180 bg-rose-600 text-white' : 'bg-gray-50 text-gray-400 group-hover:text-rose-500'}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-rose-50 bg-rose-50/10">
              <div className="flex flex-col space-y-4 pt-4">
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  {answer}
                </p>
                <div className="pt-2 border-t border-rose-100/50">
                  <p className="font-urdu text-2xl text-rose-800 leading-[2.2] text-right" dir="rtl">
                    یہاں آپ کی رہنمائی کے لیے اردو میں تفصیل درج ہے۔ ہم آپ کی بہتر خدمت کے لیے پرعزم ہیں۔
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Support: React.FC = () => {
  const { settings } = useSystem();
  const [faqs, setFaqs] = useState<any[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const [ticketSent, setTicketSent] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getPublicFAQs().then(data => setFaqs(data));
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("support@noorofficial.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredFaqs = faqs.filter(f => f.question.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-xl mx-auto pb-24 space-y-6 px-1 scale-[0.98] origin-top">
      {/* Contact Matrix */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full -mr-32 -mt-32 blur-[80px]" />
        <div className="relative z-10 text-center space-y-6">
           <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/10 shadow-2xl">
              <Zap className="w-8 h-8 text-rose-500 animate-pulse" />
           </div>
           <div>
              <h1 className="text-2xl font-black uppercase tracking-tighter">Need Earning Help?</h1>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mt-2">Active Support Node: Online</p>
           </div>
           
           <div className="grid grid-cols-1 gap-3 pt-2">
             <a 
               href={`https://wa.me/${settings.supportWhatsApp}`}
               target="_blank"
               className="bg-[#25D366] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center shadow-xl shadow-green-950/20 active:scale-95 transition-all hover:bg-[#1ebc56]"
             >
               <MessageCircle className="w-5 h-5 mr-3" /> WhatsApp Support
             </a>
             
             <button 
               onClick={handleCopyEmail}
               className="bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
             >
               {copied ? <Check className="w-4 h-4 mr-3 text-emerald-400" /> : <Mail className="w-4 h-4 mr-3 text-rose-500" />}
               {copied ? "ID Synced to Clipboard" : "Copy Official Email"}
             </button>
           </div>
        </div>
      </motion.div>

      {/* FAQ Hub */}
      <div className="space-y-4 px-2">
        <div className="flex items-center justify-between px-1 mb-2">
           <div>
             <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center">
               <HelpCircle className="w-4.5 h-4.5 mr-2.5 text-rose-600" /> Knowledge Base
             </h2>
             <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mt-1">Platform Logic & Tutorials</p>
           </div>
           <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input 
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Find..." 
                className="bg-gray-100 border-none rounded-lg py-1 pl-6 pr-2 text-[9px] font-black uppercase outline-none focus:bg-rose-50 w-24 transition-colors"
              />
           </div>
        </div>
        
        <div>
          {filteredFaqs.map((faq, idx) => (
            <FAQAccordionItem 
              key={faq.id} 
              question={faq.question} 
              answer={faq.answer} 
              index={idx} 
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
          {filteredFaqs.length === 0 && (
             <div className="py-12 text-center bg-white rounded-[2rem] border border-dashed border-gray-100">
               <MessageSquare className="w-10 h-10 text-gray-100 mx-auto mb-3" />
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">No matching nodes in database</p>
             </div>
          )}
        </div>
      </div>

      {/* Quick Ticket Node */}
      <div className="bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6 mx-2">
        <div className="flex items-center space-x-3 border-b border-gray-50 pb-4">
           <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shadow-inner"><Send className="w-5 h-5" /></div>
           <h3 className="text-sm font-black text-slate-900 uppercase">Dispatch Support Pulse</h3>
        </div>
        
        {ticketSent ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center space-y-4">
             <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
             </div>
             <div>
                <p className="text-xs font-black text-slate-900 uppercase">Ticket Synchronized</p>
                <p className="text-[8px] text-slate-400 uppercase font-bold tracking-widest mt-1">Verification Hash: #{Math.floor(Math.random()*90000)+10000}</p>
             </div>
             <button onClick={() => setTicketSent(false)} className="px-6 py-2 bg-slate-100 rounded-xl text-[8px] font-black uppercase text-slate-400">Send New Pulse</button>
          </motion.div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setTicketSent(true); }} className="space-y-4">
             <div className="space-y-1">
                <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Inquiry Subject</label>
                <input required className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-[10px] font-bold outline-none focus:border-rose-400 shadow-inner" placeholder="E.g. Payout Node Delay" />
             </div>
             <div className="space-y-1">
                <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Payload Content</label>
                <textarea required className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-[10px] font-bold outline-none focus:border-rose-400 h-28 resize-none shadow-inner" placeholder="Describe the discrepancy in detail..." />
             </div>
             <button className="w-full bg-slate-950 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl flex items-center justify-center group active:scale-95 transition-all">
               Initialize Sync <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
             </button>
          </form>
        )}
      </div>

      {/* Security Footer */}
      <div className="flex items-center justify-center space-x-3 opacity-30 grayscale pt-4">
         <ShieldCheck className="w-4 h-4 text-emerald-500" />
         <span className="text-[8px] font-black uppercase tracking-[0.5em]">Noor Official Secure Hub v4.2</span>
      </div>
    </div>
  );
};

export default Support;