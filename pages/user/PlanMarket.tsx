
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  X, 
  Smartphone, 
  SmartphoneNfc, 
  Loader2,
  ImageIcon,
  Copy,
  Check,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import { useAuth } from '../../context/AuthContext';
import { CORE_RULES } from '../../utils/plansData';
import { getAllPlans } from '../../api/controllers/planController';
import { IPlan } from '../../api/models/Plan';

const PlanMarket: React.FC = () => {
  const { settings } = useSystem();
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [trxId, setTrxId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    getAllPlans().then(data => {
      setPlans(data);
      setLoading(false);
    });
  }, []);

  const handleBuy = (plan: IPlan) => {
    setSelectedPlan(plan);
    setIsBuyModalOpen(true);
    setStep(1);
    setTrxId('');
    setSenderNumber('');
    setFile(null);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId || !file || !senderNumber) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBuyModalOpen(false);
      alert("Activation Request Logged. Verification will complete within 2-4 hours.");
    }, 2000);
  };

  if (loading) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
       <Loader2 className="w-8 h-8 text-pink-400 animate-spin mb-4" />
       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Hydrating Tier Data...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-24 px-4 space-y-8 scale-[0.98] origin-top">
      <div className="text-center py-6">
        <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Packages</h1>
        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1.5">Select a node to initialize revenue</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-6 rounded-[2rem] border border-pink-50 shadow-sm relative flex flex-col hover:border-pink-200 transition-all group"
          >
            {plan.isRecommended && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[6px] font-black px-3 py-1 rounded-full uppercase tracking-widest z-10 shadow-lg border border-pink-400">
                Most Active
              </div>
            )}
            
            <div className="flex-grow space-y-6">
              <div className="text-center">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-[10px] font-black text-slate-300 uppercase mr-1">Rs</span>
                  <span className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{plan.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: 'Work Node', val: `${plan.dailyLimit} Pgs`, icon: Clock },
                  { label: 'Yield Page', val: `Rs. ${CORE_RULES.ratePerPage}`, icon: Zap },
                  { label: 'Cycle', val: `${plan.validityDays} Days`, icon: ShieldCheck }
                ].map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center justify-between py-2 border-b border-pink-50/50 last:border-0">
                    <div className="flex items-center space-x-2">
                       <feat.icon className="w-3 h-3 text-pink-400" />
                       <span className="text-[8px] font-black text-slate-400 uppercase">{feat.label}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-900">{feat.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => handleBuy(plan)}
              className="w-full py-3 rounded-2xl font-black text-[9px] uppercase tracking-widest mt-8 transition-all bg-slate-950 text-white hover:bg-pink-500 shadow-xl active:scale-95"
            >
              Initialize Node
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isBuyModalOpen && selectedPlan && (
          <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setIsBuyModalOpen(false)} />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              className="relative w-full max-w-sm bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                   <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Activation Flow</h2>
                   <p className="text-[8px] font-bold text-pink-400 uppercase tracking-widest mt-1">Tier: {selectedPlan.name}</p>
                </div>
                <button onClick={() => setIsBuyModalOpen(false)} className="p-2 bg-pink-50 rounded-xl text-pink-400"><X className="w-5 h-5" /></button>
              </div>

              {step === 1 ? (
                <div className="space-y-6">
                  <div className="bg-pink-50/50 border border-pink-100 p-5 rounded-3xl space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Transfer <span className="text-pink-600">Rs. {selectedPlan.price}</span> to Hub:</p>
                    
                    {[
                      { type: 'EasyPaisa', num: settings.payoutMethods.easyPaisa.number, title: settings.payoutMethods.easyPaisa.title, icon: Smartphone, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                      { type: 'JazzCash', num: settings.payoutMethods.jazzCash.number, title: settings.payoutMethods.jazzCash.title, icon: SmartphoneNfc, color: 'bg-pink-50 text-pink-500 border-pink-100' }
                    ].map((method) => (
                      <div key={method.type} className="flex items-center justify-between bg-white p-3 rounded-2xl border border-pink-100 shadow-sm group">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method.color} shadow-inner`}>
                            <method.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[12px] font-black text-slate-900 leading-none mb-1.5">{method.num}</p>
                            <p className="text-[7px] font-bold text-slate-400 uppercase">Title: {method.title}</p>
                          </div>
                        </div>
                        <button onClick={() => copyToClipboard(method.num, method.type)} className="p-2.5 bg-pink-50 text-pink-500 rounded-xl">
                          {copied === method.type ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl"
                  >
                    I Have Dispatched Funds
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitProof} className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Account Number</label>
                      <input required value={senderNumber} onChange={e => setSenderNumber(e.target.value)} placeholder="03XXXXXXXXX" className="w-full bg-pink-50 border border-pink-100 rounded-xl p-3 font-black text-[12px] outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-1">Transaction ID Node</label>
                      <input required value={trxId} onChange={e => setTrxId(e.target.value)} placeholder="TrxID" className="w-full bg-pink-50 border border-pink-100 rounded-xl p-3 font-black text-[12px] outline-none" />
                    </div>
                  </div>

                  <div className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${file ? 'bg-emerald-50 border-emerald-200' : 'bg-pink-50 border-pink-100'}`} onClick={() => document.getElementById('receipt-upload')?.click()}>
                    <input type="file" id="receipt-upload" hidden onChange={e => setFile(e.target.files?.[0] || null)} required />
                    {file ? <p className="text-[10px] font-black text-emerald-600 truncate">{file.name}</p> : <div className="space-y-1"><ImageIcon className="w-6 h-6 mx-auto text-pink-300" /><p className="text-[8px] font-black text-pink-400 uppercase">Attach Receipt Asset</p></div>}
                  </div>

                  <div className="flex gap-2">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest">Back</button>
                    <button type="submit" disabled={isSubmitting} className="flex-[2] py-4 bg-pink-400 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Deploy Proof"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanMarket;
