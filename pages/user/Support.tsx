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
  MessageSquare,
  Globe
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import { getPublicFAQs } from '../../api/controllers/supportController';

const FAQAccordionItem: React.FC<{ question: string; answer: string; index: number; isOpen: boolean; onClick: () => void }> = ({ question, answer, index, isOpen, onClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-white rounded-[2rem] border transition-all duration-500 overflow-hidden mb-4 ${
        isOpen ? 'border-theme-primary shadow-2xl ring-4 ring-theme-secondary' : 'border-gray-100 shadow-sm hover:border-theme-primary/30'
      }`}
    >
      <button 
        onClick={onClick} 
        className="w-full p-6 flex items-center justify-between text-left group"
      >
        <div className="flex items-center space-x-5 min-w-0 pr-4">
           <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 shrink-0 ${
             isOpen ? 'bg-theme-primary text-white shadow-xl rotate-12' : 'bg-gray-50 text-theme-primary group-hover:scale-110'
           }`}>
             <HelpCircle className="w-5 h-5" />
           </div>
           <span className={`text-[13px] font-black leading-tight uppercase tracking-tight ${
             isOpen ? 'text-theme-primary' : 'text-slate-900'
           }`}>
             {question}
           </span>
        </div>
        <div className={`p-1.5 rounded-xl transition-all duration-700 ${isOpen ? 'rotate-180 bg-theme-primary text-white shadow-lg' : 'bg-gray-100 text-gray-400 group-hover:bg-theme-primary group-hover:text-white'}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="p-8 pt-0 border-t border-gray-50 bg-gray-50/30">
              <div className="flex flex-col space-y-6 pt-6">
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                  {answer}
                </p>
                <div className="pt-6 border-t border-gray-100">
                  <p className="font-urdu text-2xl text-slate-900 leading-[2.4] text-right" dir="rtl">
                    محترم صارف، آپ کی رہنمائی کے لیے مکمل تفصیل یہاں اردو میں درج ہے۔ اگر آپ کو مزید مدد کی ضرورت ہو تو واٹس ایپ پر رابطہ کریں۔
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
      {/* Brand Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-950 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden text-center"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-theme-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10 space-y-6">
           <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/10 shadow-2xl">
              <MessageCircle className="w-8 h-8 text-theme-primary animate-pulse" />
           </div>
           <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter">Support Hub</h1>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mt-2">Active Official Help Node</p>
           </div>
           
           <div className="grid gap-3 pt-4">
             <a 
               href={`https://wa.me/${settings.supportWhatsApp}`}
               target="_blank"
               className="bg-[#25D366] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center shadow-xl shadow-green-950/20 active:scale-95 transition-all hover:bg-[#1ebc56]"
             >
               <MessageCircle className="w-5 h-5 mr-3" /> WhatsApp Help Desk
             </a>
             <button 
               onClick={handleCopyEmail}
               className="bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center hover:bg-white/10 transition-all"
             >
               {copied ? <Check className="w-4 h-4 mr-3 text-emerald-400" /> : <Mail className="w-4 h-4 mr-3 text-theme-primary" />}
               {copied ? "Copied to Clipboard" : "Official Support Email"}
             </button>
           </div>
        </div>
      </motion.div>

      {/* FAQ Center */}
      <div className="space-y-5 px-1">
        <div className="flex items-center justify-between px-3">
           <div>
             <h2 className="text-[14px] font-black text-slate-900 uppercase tracking-widest flex items-center">
               <Globe className="w-4.5 h-4.5 mr-2.5 text-theme-primary" /> Learning Center
             </h2>
             <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1.5">Common Queries & Help</p>
           </div>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input 
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search..." 
                className="bg-gray-100 border-none rounded-xl py-2 pl-9 pr-3 text-[10px] font-black uppercase outline-none focus:bg-white shadow-inner w-32"
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
        </div>
      </div>

      <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm mx-1 space-y-6">
         <div className="flex items-center space-x-4 border-b border-gray-50 pb-5">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shadow-inner text-theme-primary"><Send className="w-6 h-6" /></div>
            <div>
               <h3 className="text-base font-black text-slate-900 uppercase">Direct Ticket</h3>
               <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Typical response: 30-60 mins</p>
            </div>
         </div>
         
         {ticketSent ? (
           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                 <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                 <p className="text-sm font-black text-slate-900 uppercase">Transmission Successful</p>
                 <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest mt-2">Ticket ID: #NOOR-{Math.floor(Math.random()*90000)+10000}</p>
              </div>
              <button onClick={() => setTicketSent(false)} className="px-8 py-2.5 bg-gray-50 rounded-xl text-[9px] font-black uppercase text-slate-500 hover:bg-slate-100 transition-all">Submit Another</button>
           </motion.div>
         ) : (
           <form onSubmit={(e) => { e.preventDefault(); setTicketSent(true); }} className="space-y-4">
              <div className="space-y-1.5">
                 <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Issue Topic</label>
                 <input required className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-xs font-bold outline-none focus:border-theme-primary transition-all shadow-inner" placeholder="E.g. Payment Delay, Verification help" />
              </div>
              <div className="space-y-1.5">
                 <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Message Content</label>
                 <textarea required className="w-full bg-gray-50 border border-gray-100 rounded-[2rem] p-5 text-xs font-bold outline-none focus:border-theme-primary transition-all h-32 resize-none shadow-inner" placeholder="Describe your issue in detail..." />
              </div>
              <button className="w-full bg-slate-950 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl flex items-center justify-center group active:scale-95 transition-all">
                Submit Ticket <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </button>
           </form>
         )}
      </div>

      {/* Security Hub Footer */}
      <div className="flex flex-col items-center justify-center space-y-4 pt-10">
         <div className="flex items-center space-x-3 opacity-30 grayscale">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Official Support Sync Hub v4.2</span>
         </div>
      </div>
    </div>
  );
};

export default Support;