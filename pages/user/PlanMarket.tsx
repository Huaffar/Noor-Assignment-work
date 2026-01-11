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
  TrendingUp,
  AlertCircle,
  CreditCard,
  Target,
  Sparkles
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import { useAuth } from '../../context/AuthContext';
import { CORE_RULES } from '../../utils/plansData';
import { getAllPlans } from '../../api/controllers/planController';
import { IPlan } from '../../api/models/Plan';

const PlanMarket: React.FC = () => {
  const { settings } = useSystem();
  const { user } = useAuth();
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState<'EasyPaisa' | 'JazzCash'>('EasyPaisa');
  const [trxId, setTrxId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const currentUserPlan = plans.find(p => p.name === user?.currentPlan);
  const currentPlanPrice = currentUserPlan?.price || 0;

  useEffect(() => {
    getAllPlans().then(data => {
      setPlans(data);
      setLoading(false);
    });
  }, []);

  const handleBuy = (plan: IPlan) => {
    if (plan.name === user?.currentPlan) return;
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

  const finalPrice = selectedPlan ? Math.max(0, selectedPlan.price - currentPlanPrice) : 0;
  const isDiamondPro = selectedPlan?.name === 'Diamond Pro';

  if (loading) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
       <Loader2 className="w-10 h-10 text-theme-primary animate-spin mb-4" />
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accessing Tier Data...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-24 px-4 space-y-8 scale-[0.98] origin-top">
      <div className="text-center py-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Revenue Marketplace</h1>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-3">Upgrade node capacity to unlock high-yield assets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((plan, idx) => {
          const isActive = user?.currentPlan === plan.name;
          const isDiamond = plan.name === 'Diamond Pro';

          return (
            <motion.div
              key={plan.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
              className={`p-8 rounded-[2.5rem] border transition-all relative flex flex-col ${
                isActive ? 'border-theme-primary bg-white ring-4 ring-theme-primary/5 shadow-2xl' : 
                isDiamond ? 'bg-slate-950 text-white border-white/10 shadow-2xl overflow-hidden' :
                'bg-white border-gray-100 shadow-sm hover:border-theme-primary/30'
              }`}
            >
              {isDiamond && (
                 <div className="absolute top-0 right-0 w-32 h-32 themed-gradient rounded-full blur-[60px] opacity-20 -mr-16 -mt-16" />
              )}
              
              <div className="flex-grow space-y-6 relative z-10">
                <div className="text-center">
                  <h3 className={`text-[11px] font-black uppercase tracking-widest mb-1 ${isDiamond ? 'text-theme-primary' : 'text-slate-400'}`}>{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className={`text-[10px] font-black uppercase mr-1 ${isDiamond ? 'text-white/30' : 'text-slate-300'}`}>PKR</span>
                    <span className={`text-4xl font-black tracking-tighter leading-none ${isDiamond ? 'text-white' : 'text-slate-900'}`}>{plan.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {[
                    { label: 'Work Cap', val: `${plan.dailyLimit} Pages`, icon: TrendingUp },
                    { label: 'Yield Rate', val: `Rs. ${CORE_RULES.ratePerPage}`, icon: Zap },
                    { label: 'Network', val: `Priority Hub`, icon: ShieldCheck }
                  ].map((feat, fIdx) => (
                    <div key={fIdx} className={`flex items-center justify-between py-2.5 border-b last:border-0 ${isDiamond ? 'border-white/5' : 'border-gray-50'}`}>
                      <div className="flex items-center space-x-2.5">
                         <feat.icon className={`w-3.5 h-3.5 ${isDiamond ? 'text-theme-primary' : 'text-slate-300'}`} />
                         <span className={`text-[9px] font-black uppercase ${isDiamond ? 'text-white/40' : 'text-slate-400'}`}>{feat.label}</span>
                      </div>
                      <span className={`text-[10px] font-black uppercase ${isDiamond ? 'text-white' : 'text-slate-900'}`}>{feat.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => handleBuy(plan)}
                disabled={isActive}
                className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] mt-8 transition-all flex items-center justify-center relative z-10 ${
                  isActive ? 'bg-emerald-50 text-emerald-500 cursor-default' : 
                  isDiamond ? 'bg-white text-slate-950 hover:bg-theme-primary hover:text-white shadow-xl shadow-theme-primary/10' :
                  'bg-slate-950 text-white hover:bg-theme-primary shadow-xl active:scale-95'
                }`}
              >
                {isActive ? 'Active Node' : isDiamond ? 'Unlock Elite Access' : 'Initialize Plan'}
              </button>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {isBuyModalOpen && selectedPlan && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setIsBuyModalOpen(false)} />
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className={`relative w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden border ${isDiamondPro ? 'bg-slate-950 border-white/10' : 'bg-white border-gray-100'}`}
            >
              <div className="p-8">
                <div className={`flex items-center justify-between mb-8 border-b pb-4 ${isDiamondPro ? 'border-white/5' : 'border-gray-50'}`}>
                  <div>
                    <h2 className={`text-xl font-black uppercase tracking-tighter leading-none ${isDiamondPro ? 'text-white' : 'text-slate-900'}`}>Checkout Hub</h2>
                    <p className="text-[9px] font-bold text-theme-primary uppercase tracking-[0.2em] mt-2">{selectedPlan.name} Activation</p>
                  </div>
                  <button onClick={() => setIsBuyModalOpen(false)} className="p-2 rounded-xl text-gray-400 hover:text-rose-600 transition-colors"><X className="w-5 h-5" /></button>
                </div>

                {step === 1 ? (
                  <div className="space-y-6">
                    <div className={`${isDiamondPro ? 'bg-white/5' : 'bg-gray-50'} border border-gray-100 p-6 rounded-3xl space-y-6`}>
                      <div className="flex justify-between items-center px-1">
                        <span className={`text-[10px] font-black uppercase ${isDiamondPro ? 'text-white/40' : 'text-slate-400'}`}>Payable:</span>
                        <span className={`text-2xl font-black ${isDiamondPro ? 'text-theme-primary' : 'text-slate-900'}`}>Rs. {finalPrice.toLocaleString()}</span>
                      </div>

                      <div className="space-y-3">
                        {[
                          { type: 'EasyPaisa', num: settings.payoutMethods.easyPaisa.number, title: settings.payoutMethods.easyPaisa.title, icon: Smartphone, color: 'text-emerald-500' },
                          { type: 'JazzCash', num: settings.payoutMethods.jazzCash.number, title: settings.payoutMethods.jazzCash.title, icon: SmartphoneNfc, color: 'text-rose-500' }
                        ].map((method) => (
                          <div 
                            key={method.type} 
                            onClick={() => setSelectedMethod(method.type as any)}
                            className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                                selectedMethod === method.type ? 'bg-white border-theme-primary shadow-lg ring-4 ring-theme-primary/5' : 'bg-transparent border-transparent opacity-60'
                            }`}
                          >
                            <div className="flex items-center space-x-3.5">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 shadow-inner ${method.color}`}>
                                <method.icon className="w-5 h-5" />
                              </div>
                              <div>
                                <p className={`text-[13px] font-black leading-none mb-1.5 ${isDiamondPro && selectedMethod !== method.type ? 'text-white' : 'text-slate-900'}`}>{method.num}</p>
                                <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">{method.title}</p>
                              </div>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); copyToClipboard(method.num, method.type); }} className="p-2.5 text-slate-400 hover:text-theme-primary transition-all">
                              {copied === method.type ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => setStep(2)}
                      className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl flex items-center justify-center active:scale-95 transition-all ${isDiamondPro ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'}`}
                    >
                      I have sent funds <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setIsSubmitting(true); setTimeout(() => setIsBuyModalOpen(false), 2000); }} className="space-y-5">
                    {/* Payment Account Summary Block */}
                    <div className={`p-4 rounded-2xl border ${isDiamondPro ? 'bg-white/5 border-white/10' : 'bg-blue-50 border-blue-100'} flex items-center justify-between shadow-inner`}>
                       <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedMethod === 'EasyPaisa' ? 'bg-emerald-500' : 'bg-rose-500'} text-white shadow-md`}>
                             {selectedMethod === 'EasyPaisa' ? <Smartphone className="w-4 h-4" /> : <SmartphoneNfc className="w-4 h-4" />}
                          </div>
                          <div>
                             <p className={`text-[7px] font-black uppercase tracking-widest mb-0.5 ${isDiamondPro ? 'text-white/40' : 'text-blue-400'}`}>Sent to {selectedMethod}</p>
                             <p className={`text-[11px] font-black ${isDiamondPro ? 'text-white' : 'text-slate-900'}`}>{selectedMethod === 'EasyPaisa' ? settings.payoutMethods.easyPaisa.number : settings.payoutMethods.jazzCash.number}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className={`text-[7px] font-black uppercase tracking-widest mb-0.5 ${isDiamondPro ? 'text-white/40' : 'text-blue-400'}`}>Value</p>
                          <p className={`text-[11px] font-black ${isDiamondPro ? 'text-white' : 'text-slate-900'}`}>Rs. {finalPrice}</p>
                       </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className={`text-[8px] font-black uppercase tracking-widest ml-1 ${isDiamondPro ? 'text-white/40' : 'text-gray-400'}`}>Sender Mobile Number</label>
                        <input required value={senderNumber} onChange={e => setSenderNumber(e.target.value)} placeholder="03XXXXXXXXX" className={`w-full rounded-xl py-3.5 px-4 font-black text-sm outline-none shadow-inner ${isDiamondPro ? 'bg-white/5 border-white/10 text-white focus:border-theme-primary' : 'bg-gray-50 border-gray-100 focus:border-theme-primary'}`} />
                      </div>
                      <div className="space-y-1.5">
                        <label className={`text-[8px] font-black uppercase tracking-widest ml-1 ${isDiamondPro ? 'text-white/40' : 'text-gray-400'}`}>Transaction ID (TrxID)</label>
                        <input required value={trxId} onChange={e => setTrxId(e.target.value)} placeholder="Enter ID from SMS" className={`w-full rounded-xl py-3.5 px-4 font-black text-sm outline-none shadow-inner ${isDiamondPro ? 'bg-white/5 border-white/10 text-white focus:border-theme-primary' : 'bg-gray-50 border-gray-100 focus:border-theme-primary'}`} />
                      </div>
                    </div>

                    <div className={`border-2 border-dashed rounded-[2rem] p-6 text-center cursor-pointer transition-all ${isDiamondPro ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`} onClick={() => document.getElementById('receipt-up')?.click()}>
                       <input type="file" id="receipt-up" hidden onChange={e => setFile(e.target.files?.[0] || null)} required />
                       <ImageIcon className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                       <p className={`text-[9px] font-black uppercase tracking-widest ${isDiamondPro ? 'text-white/40' : 'text-gray-400'}`}>{file ? file.name : "Attach Payment Receipt"}</p>
                    </div>

                    <div className="flex gap-2">
                       <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 bg-gray-100 text-slate-500 rounded-2xl font-black text-[9px] uppercase">Back</button>
                       <button type="submit" disabled={isSubmitting} className={`flex-[2] py-4 rounded-2xl font-black text-[9px] uppercase tracking-[0.2em] shadow-xl flex items-center justify-center ${isDiamondPro ? 'bg-theme-primary text-white' : 'bg-slate-950 text-white'}`}>
                         {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Activation"}
                       </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanMarket;