
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  X, 
  Smartphone, 
  SmartphoneNfc, 
  ArrowRight,
  Info,
  Loader2,
  Hash,
  ImageIcon,
  Copy,
  Check
} from 'lucide-react';
import { useSystem } from '../../context/SystemContext';
import { useAuth } from '../../context/AuthContext';
import { plansData, CORE_RULES } from '../../utils/plansData';

const PlanMarket: React.FC = () => {
  const { settings } = useSystem();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [trxId, setTrxId] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleBuy = (plan: any) => {
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
    if (!trxId || !file || !senderNumber) {
      alert("Please fill all fields and upload proof.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBuyModalOpen(false);
      alert("Verification Pending! Activation in 1-2 hours.");
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto pb-20 px-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Upgrade Account</h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Unlock consistent daily revenue</p>
      </div>

      {/* Slim Info Rules */}
      <motion.div 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-rose-600 shadow-sm border border-rose-100">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[11px] font-black text-rose-900 leading-tight">Rate: Rs. {CORE_RULES.ratePerPage}/Page</h3>
            <p className="text-[8px] font-bold text-rose-400 uppercase tracking-widest leading-none mt-1">Mon-Fri (Weekends Off)</p>
          </div>
        </div>
        <div className="text-[8px] font-black uppercase tracking-widest bg-rose-600 text-white px-3 py-1.5 rounded-lg shadow-lg shadow-rose-200">
          {CORE_RULES.feeType}
        </div>
      </motion.div>

      {/* High Density Plan Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plansData.map((plan, idx) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm relative flex flex-col hover:border-rose-200 hover:shadow-xl transition-all h-full"
          >
            {plan.isPopular && (
              <div className="absolute top-3 right-3 bg-rose-600 text-white text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest z-10 shadow-md">
                Popular
              </div>
            )}
            
            <div className={`w-full h-1 bg-gradient-to-r ${plan.color} absolute top-0 left-0 rounded-t-full`} />

            <div className="flex-grow">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1.5">{plan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-[10px] font-black text-gray-400 uppercase mr-1">Rs.</span>
                <span className="text-2xl font-black text-gray-900 tracking-tighter">{plan.investment.toLocaleString()}</span>
              </div>

              <div className="w-full border-t border-dashed border-gray-100 mb-4" />

              <ul className="space-y-1.5">
                {[
                  { label: 'Work', val: `${plan.dailyWork} Page` },
                  { label: 'Weekly', val: `Rs. ${plan.weeklySalary.toLocaleString()}` },
                  { label: 'Monthly', val: `Rs. ${plan.monthlySalary.toLocaleString()}` }
                ].map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center justify-between">
                    <div className="flex items-center text-[9px] font-black text-gray-400 uppercase tracking-tighter">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 mr-1.5" />
                      {feat.label}
                    </div>
                    <span className="text-[10px] font-black text-gray-800">{feat.val}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => handleBuy(plan)}
              className="w-full py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest mt-6 transition-all bg-slate-900 text-white hover:bg-rose-600 shadow-lg shadow-gray-200"
            >
              Choose Plan
            </button>
          </motion.div>
        ))}
      </div>

      {/* Compact Purchase Modal */}
      <AnimatePresence>
        {isBuyModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/70 backdrop-blur-md" onClick={() => setIsBuyModalOpen(false)} />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              className="relative w-full max-w-sm bg-white rounded-t-[2rem] sm:rounded-[2rem] p-6 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black text-gray-900 tracking-tight">Purchase {selectedPlan?.name}</h2>
                <button onClick={() => setIsBuyModalOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-full">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {step === 1 ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl space-y-3">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 text-center">Transfer <span className="text-rose-600">Rs. {selectedPlan?.investment}</span> to:</p>
                    
                    {[
                      { type: 'EasyPaisa', num: settings.payoutMethods.easyPaisa.number, name: settings.payoutMethods.easyPaisa.title },
                      { type: 'JazzCash', num: settings.payoutMethods.jazzCash.number, name: settings.payoutMethods.jazzCash.title }
                    ].map((method) => (
                      <div key={method.type} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex items-center space-x-2.5">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${method.type === 'EasyPaisa' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            {method.type === 'EasyPaisa' ? <Smartphone className="w-4 h-4" /> : <SmartphoneNfc className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="text-xs font-black text-gray-900 tracking-tight leading-none mb-1">{method.num}</p>
                            <p className="text-[7px] font-bold text-gray-400 uppercase">Title: {method.name}</p>
                          </div>
                        </div>
                        <button onClick={() => copyToClipboard(method.num, method.type)} className="p-2 hover:text-rose-600 transition-colors">
                          {copied === method.type ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-gray-300" />}
                        </button>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setStep(2)}
                    className="w-full py-3 bg-rose-600 text-white font-black rounded-xl hover:bg-rose-700 transition-all text-xs uppercase tracking-widest"
                  >
                    I have paid
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitProof} className="space-y-3">
                  <div className="bg-rose-50 p-3 rounded-lg border border-rose-100 flex items-start space-x-2">
                    <Info className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <p className="text-[8px] font-bold text-rose-700 leading-tight uppercase">Enter Transaction ID (TrxID) and upload screenshot for activation.</p>
                  </div>

                  <div>
                    <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Sender Number</label>
                    <input required value={senderNumber} onChange={e => setSenderNumber(e.target.value)} placeholder="03XXXXXXXXX" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-2.5 font-bold outline-none text-sm" />
                  </div>

                  <div>
                    <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">TrxID</label>
                    <input required value={trxId} onChange={e => setTrxId(e.target.value)} placeholder="11-digit ID" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-2.5 font-bold outline-none text-sm" />
                  </div>

                  <div 
                    className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer ${file ? 'border-emerald-100 bg-emerald-50/50' : 'border-gray-100 bg-gray-50'}`}
                    onClick={() => document.getElementById('receipt-upload-mini')?.click()}
                  >
                    <input type="file" id="receipt-upload-mini" hidden onChange={e => setFile(e.target.files?.[0] || null)} required />
                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">
                      {file ? file.name : "Attach Receipt"}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-2.5 bg-gray-100 text-gray-500 font-black rounded-xl text-[10px] uppercase">Back</button>
                    <button type="submit" disabled={isSubmitting} className="flex-[2] py-2.5 bg-rose-600 text-white font-black rounded-xl text-[10px] uppercase shadow-lg shadow-rose-200">
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Verify Payment"}
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
