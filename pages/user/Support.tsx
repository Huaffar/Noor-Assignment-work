
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Mail, 
  ChevronDown, 
  HelpCircle, 
  LifeBuoy,
  ShieldCheck,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import { getPublicFAQs } from '../../api/controllers/supportController';

const FAQItem: React.FC<{ question: string; answer: string; index: number }> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl border-l-4 border-rose-500 border-r border-t border-b border-gray-100 overflow-hidden mb-2 shadow-sm"
    >
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-4 flex items-center justify-between text-left group">
        <span className="text-xs font-black text-gray-900 leading-tight pr-4 group-hover:text-rose-600 transition-colors">{question}</span>
        <div className={`p-1 rounded-lg bg-gray-50 transition-transform ${isOpen ? 'rotate-180 bg-rose-50 text-rose-600' : 'text-gray-400'}`}>
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="border-t border-gray-50"
          >
            <div className="p-4 pt-3 text-[11px] text-gray-500 font-medium leading-relaxed bg-rose-50/10">
              {answer}
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
  const [copied, setCopied] = useState(false);
  const [ticketSent, setTicketSent] = useState(false);

  useEffect(() => {
    getPublicFAQs().then(data => setFaqs(data));
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("support@noorofficial.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSent(true);
    setTimeout(() => setTicketSent(false), 3000);
  };

  return (
    <div className="max-w-xl mx-auto pb-24 space-y-6 px-1">
      {/* Contact Hero */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-rose-600 to-rose-700 p-6 rounded-[2.5rem] text-white shadow-xl shadow-rose-900/10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="relative z-10 text-center">
           <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
           </div>
           <h1 className="text-xl font-black mb-1">Need Earning Help?</h1>
           <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-6">Our agents are online 24/7</p>
           
           <div className="flex flex-col gap-2">
             <a 
               href={`https://wa.me/${settings.supportWhatsApp}`}
               target="_blank"
               className="bg-[#25D366] text-white py-3 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
             >
               <MessageCircle className="w-5 h-5 mr-2" /> Chat with Support
             </a>
             
             <button 
               onClick={handleCopyEmail}
               className="bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center hover:bg-white/20 transition-all"
             >
               {copied ? <Check className="w-4 h-4 mr-2 text-emerald-300" /> : <Mail className="w-4 h-4 mr-2" />}
               {copied ? "Address Copied" : "Copy Support Email"}
             </button>
           </div>
        </div>
      </motion.div>

      {/* Dynamic FAQs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2 mb-1">
           <div className="flex items-center space-x-2">
             <HelpCircle className="w-4 h-4 text-rose-600" />
             <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Common Solutions</h2>
           </div>
           <span className="text-[8px] font-black text-gray-400 uppercase">{faqs.length} entries</span>
        </div>
        
        <div>
          {faqs.map((faq, idx) => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} index={idx} />
          ))}
        </div>
      </div>

      {/* Quick Ticket Form */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 border-b border-gray-50 pb-3">
           <div className="w-7 h-7 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center"><Send className="w-4 h-4" /></div>
           <h3 className="text-xs font-black text-gray-900 uppercase">Submit a Ticket</h3>
        </div>
        
        {ticketSent ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center space-y-2">
             <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-6 h-6" />
             </div>
             <p className="text-xs font-black text-gray-900">Ticket Dispatched!</p>
             <p className="text-[10px] text-gray-400 uppercase font-bold">Verification ID: #{Math.floor(Math.random()*90000)+10000}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleTicketSubmit} className="space-y-3">
             <input required placeholder="Subject of query" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-[11px] font-bold outline-none focus:border-rose-400" />
             <textarea required placeholder="Describe your issue in detail..." className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-[11px] font-bold outline-none focus:border-rose-400 h-24 resize-none" />
             <button className="w-full bg-slate-900 text-white py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center group">
               Send Ticket <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
             </button>
          </form>
        )}
      </div>

      {/* Trust Badge */}
      <div className="bg-gray-100/50 rounded-2xl p-4 flex items-center justify-center space-x-4 border border-gray-100">
        <div className="flex items-center text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">
           <ShieldCheck className="w-4 h-4 text-emerald-500 mr-2" />
           Verified Noor Support Network
        </div>
      </div>
    </div>
  );
};

export default Support;
