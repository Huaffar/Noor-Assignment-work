
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
  Lock
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
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E11D48', '#FFFFFF', '#FB7185']
      });

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const methods = [
    { id: 'EasyPaisa', icon: Smartphone, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 'JazzCash', icon: SmartphoneNfc, color: 'bg-rose-50 text-rose-600 border-rose-100' },
    { id: 'Bank', icon: Building, color: 'bg-blue-50 text-blue-600 border-blue-100' }
  ];

  if (success) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-10 rounded-[3.5rem] border border-emerald-100 shadow-2xl shadow-emerald-50">
          <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-200">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight uppercase">Payout Logged</h1>
          <p className="text-gray-500 text-sm font-medium mb-10 leading-relaxed px-4">
            Your request for <span className="text-rose-600 font-black">Rs. {formData.amount}</span> has been synced. Expected arrival: <span className="font-bold">2-4 hours</span>.
          </p>
          <button 
            onClick={() => navigate('/requests')}
            className="w-full py-5 bg-slate-950 text-white rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl active:scale-95 transition-all"
          >
            Check History
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto pb-24 px-1 space-y-6 scale-[0.98] origin-top">
      <KYCModal isOpen={showKYC} onClose={() => setShowKYC(false)} />
      
      <div className="flex items-center justify-between px-3">
        <div>
          <h1 className="text-xl font-black text-gray-900 leading-none">Payout Hub</h1>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1.5">Convert dividends to mobile cash</p>
        </div>
        <div className="flex items-center space-x-2">
          <GuideModal slug="withdraw" label="FAQ" />
          {kycModuleActive && (
            <div className={`px-3 py-1.5 rounded-xl border flex items-center space-x-2 ${isKYCVerified ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
              {isKYCVerified ? <UserCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
              <span className="text-[8px] font-black uppercase tracking-widest">{isKYCVerified ? 'Verified' : 'Pending'}</span>
            </div>
          )}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-44 rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-2xl overflow-hidden mx-2 border border-slate-800"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-rose-500 mb-1.5">Available Balance</p>
              <h2 className="text-3xl font-black tracking-tighter">Rs. {currentBalance.toLocaleString()}</h2>
            </div>
            <Wallet className="w-8 h-8 text-white/10" />
          </div>
          <div className="flex items-center space-x-2">
             <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
             <p className="text-[9px] font-black tracking-[0.2em] uppercase opacity-50">Verified Earning Account</p>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-7 shadow-sm border border-gray-100 space-y-7 mx-2">
        <div className="space-y-4">
           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2">Payment Channel</p>
           <div className="grid grid-cols-3 gap-2.5">
              {methods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setFormData({...formData, method: m.id})}
                  className={`py-3.5 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                    formData.method === m.id ? 'border-rose-600 bg-rose-50 shadow-inner' : 'border-gray-50 bg-gray-50 grayscale'
                  }`}
                >
                  <m.icon className={`w-5 h-5 ${formData.method === m.id ? 'text-rose-600' : 'text-gray-400'}`} />
                  <span className={`text-[9px] font-black uppercase tracking-tight ${formData.method === m.id ? 'text-rose-600' : 'text-gray-400'}`}>{m.id}</span>
                </button>
              ))}
           </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest ml-2">Payout Amount (PKR)</label>
            <div className="relative">
               <input 
                 required
                 type="number"
                 value={formData.amount}
                 onChange={e => setFormData({...formData, amount: e.target.value})}
                 className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 font-black text-xl outline-none focus:border-rose-400 shadow-inner"
                 placeholder="Enter amount..."
               />
               <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[8px] font-black text-emerald-500 uppercase tracking-widest">Min: {minLimit}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest ml-2">Wallet Number</label>
              <input required value={formData.account} onChange={e => setFormData({...formData, account: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-5 font-bold text-xs outline-none shadow-inner" placeholder="03XXXXXXXXX" />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[8px] font-black text-gray-400 uppercase tracking-widest ml-2">Account Title</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-5 font-bold text-xs outline-none shadow-inner" placeholder="Full Legal Name" />
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl flex items-center space-x-2 text-rose-600">
             <AlertCircle className="w-4 h-4" />
             <span className="text-[10px] font-black uppercase">{error}</span>
          </div>
        )}

        <button 
          disabled={loading || !formData.amount || Number(formData.amount) < minLimit}
          className="w-full py-4.5 bg-slate-950 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] shadow-xl active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center group"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-3" /> : <Lock className="w-4 h-4 mr-3 text-rose-500 group-hover:text-white" />}
          {isKYCBlocked ? "Identity Auth Required" : "Secure Payout Request"}
        </button>
      </form>

      <div className="bg-white/50 border border-gray-100 p-4 rounded-2xl flex items-start space-x-3 mx-2">
         <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
         <p className="text-[8px] font-bold text-gray-500 leading-tight uppercase tracking-tight">
           Misalignment between account title and wallet records will result in audit failure. Ensure your details match your <span className="text-rose-600">EasyPaisa/JazzCash</span> ID.
         </p>
      </div>
    </div>
  );
};

export default Withdraw;
