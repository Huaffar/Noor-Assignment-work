
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, 
  ArrowUpRight, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  Building, 
  Smartphone, 
  SmartphoneNfc,
  CheckCircle2,
  Loader2,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  UserCheck,
  Lock,
  ArrowDownToLine
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../../context/AuthContext';
import { useSystem } from '../../context/SystemContext';
import { requestWithdrawal } from '../../api/controllers/financeController';
import GuideModal from '../../components/GuideModal';
import KYCModal from '../../components/KYCModal';

const Withdraw: React.FC = () => {
  const { user } = useAuth();
  const { settings } = useSystem();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showKYC, setShowKYC] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    method: 'EasyPaisa',
    account: '',
    title: ''
  });

  const kycModuleActive = settings.modules.kycRequired;
  const isKYCVerified = user?.kycStatus === 'approved';
  const isKYCBlocked = kycModuleActive && !isKYCVerified;

  const currentBalance = user?.balance || 0;
  const minLimit = settings.minWithdrawal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isKYCBlocked) {
       setShowKYC(true);
       return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await requestWithdrawal(user, formData, settings);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#E11D48', '#FFFFFF'] });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const methods = [
    { id: 'EasyPaisa', icon: Smartphone, color: 'bg-emerald-50 text-emerald-600' },
    { id: 'JazzCash', icon: SmartphoneNfc, color: 'bg-rose-50 text-rose-600' },
    { id: 'Bank', icon: Building, color: 'bg-blue-50 text-blue-600' }
  ];

  if (success) {
    return (
      <div className="max-w-xs mx-auto py-16 px-2 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="themed-card p-8">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
          <h1 className="text-xl font-black text-slate-900 uppercase leading-none">Log Success</h1>
          <p className="text-[10px] text-gray-400 font-bold my-6 uppercase">Syncing to financial ledger...</p>
          <button onClick={() => navigate('/requests')} className="w-full py-3.5 bg-slate-950 text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl">Audit Ledger</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto pb-24 px-1 space-y-4 scale-[0.96] origin-top">
      <KYCModal isOpen={showKYC} onClose={() => setShowKYC(false)} />
      
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center shadow-lg border border-white/5">
             <ArrowDownToLine className="w-4 h-4 text-theme-primary" />
          </div>
          <h1 className="text-[14px] font-black text-slate-900 uppercase">Payout Hub</h1>
        </div>
        <GuideModal slug="withdraw" label="FAQ" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
        className="relative h-32 rounded-[1.8rem] bg-slate-950 p-6 text-white shadow-xl mx-1 overflow-hidden"
      >
        <div className="bg-data-grid absolute inset-0 opacity-10" />
        <div className="relative z-10 flex flex-col justify-between h-full">
           <div>
              <p className="text-[7px] font-black uppercase tracking-[0.3em] text-theme-primary mb-1">Withdrawable</p>
              <h2 className="text-2xl font-black tracking-tighter">Rs. {currentBalance.toLocaleString()}</h2>
           </div>
           <div className="flex items-center space-x-1 opacity-40">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <p className="text-[7px] font-black uppercase tracking-widest leading-none">Security Verified</p>
           </div>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="themed-card p-5 space-y-6 mx-1">
        <div className="space-y-2">
           <div className="grid grid-cols-3 gap-2">
              {methods.map((m) => (
                <button
                  key={m.id} type="button" onClick={() => setFormData({...formData, method: m.id})}
                  className={`py-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    formData.method === m.id ? 'border-theme-primary bg-theme-secondary/20 shadow-inner' : 'border-gray-50 bg-gray-50/50 grayscale opacity-40'
                  }`}
                >
                  <m.icon className={`w-4 h-4 ${formData.method === m.id ? 'text-theme-primary' : 'text-gray-400'}`} />
                  <span className={`text-[8px] font-black uppercase tracking-tight ${formData.method === m.id ? 'text-theme-primary' : 'text-gray-400'}`}>{m.id}</span>
                </button>
              ))}
           </div>
        </div>

        <div className="space-y-4">
           <div className="space-y-1">
             <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Asset Value (PKR)</label>
             <input required type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 font-black text-lg outline-none focus:border-theme-primary" placeholder="500+" />
           </div>

           <div className="space-y-3">
              <input required value={formData.account} onChange={e => setFormData({...formData, account: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2.5 px-4 font-bold text-[10px] outline-none" placeholder="Account Number" />
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-lg py-2.5 px-4 font-bold text-[10px] outline-none" placeholder="Account Title" />
           </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg flex items-center space-x-2 text-rose-600">
             <AlertCircle className="w-3 h-3 shrink-0" />
             <span className="text-[8px] font-black uppercase leading-tight">{error}</span>
          </div>
        )}

        <button 
          disabled={loading || !formData.amount || Number(formData.amount) < minLimit}
          className="w-full py-3.5 bg-slate-950 text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl flex items-center justify-center active:scale-95 disabled:opacity-30 transition-all"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Lock className="w-3.5 h-3.5 mr-2 text-theme-primary" />}
          {isKYCBlocked ? "Identity Auth Required" : "Initialize Disbursement"}
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
