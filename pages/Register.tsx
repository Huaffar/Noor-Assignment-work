
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Loader2,
  ChevronLeft,
  ShieldCheck,
  Gift,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useSystem } from '../context/SystemContext';

const Register: React.FC = () => {
  const { register } = useAuth();
  const { settings } = useSystem();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const refCode = searchParams.get('ref');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    whatsapp: '',
    referral: refCode || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^03\d{9}$/.test(formData.whatsapp)) {
      alert("Use format: 03XXXXXXXXX");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password: Min 6 characters");
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      setSuccess(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#E11D48', '#ffffff'] });
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      alert("Registration failed. Data error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
      
      <motion.button 
        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
        onClick={() => navigate('/')}
        className="mb-4 flex items-center space-x-1.5 text-rose-600 font-black text-[9px] uppercase tracking-widest hover:scale-95 transition-transform z-10"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span>Return Home</span>
      </motion.button>

      <motion.div 
        initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-[280px] glass-light p-5 rounded-[2rem] shadow-[0_25px_50px_rgba(225,29,72,0.1)] border border-white/80 relative z-10 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-rose-500 to-indigo-500" />
        
        <div className="text-center mb-5">
          <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center mx-auto mb-2.5 shadow-lg shadow-rose-200">
            <Zap className="text-white w-5 h-5 fill-white" />
          </div>
          <h2 className="text-lg font-black text-slate-900 tracking-tighter leading-none uppercase">Join Hub</h2>
          <p className="text-[7px] text-slate-400 mt-1 font-bold uppercase tracking-widest">Registration Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Identity</label>
              <div className="relative group">
                <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
                <input name="name" required value={formData.name} onChange={handleChange} className="w-full bg-white/60 border border-slate-100 rounded-lg py-2 pl-7 pr-2 text-[9px] font-bold text-slate-800 outline-none focus:border-rose-400 shadow-sm" placeholder="Name" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">WhatsApp</label>
              <div className="relative group">
                <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
                <input name="whatsapp" required value={formData.whatsapp} onChange={handleChange} className="w-full bg-white/60 border border-slate-100 rounded-lg py-2 pl-7 pr-2 text-[9px] font-bold text-slate-800 outline-none focus:border-rose-400 shadow-sm" placeholder="03XXX" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Endpoint</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
              <input name="email" required type="email" value={formData.email} onChange={handleChange} className="w-full bg-white/60 border border-slate-100 rounded-lg py-2 pl-8 pr-3 text-[9px] font-bold text-slate-800 outline-none focus:border-rose-400 shadow-sm" placeholder="user@node.com" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Access Pass</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
              <input name="password" required type="password" value={formData.password} onChange={handleChange} className="w-full bg-white/60 border border-slate-100 rounded-lg py-2 pl-8 pr-3 text-[9px] font-bold text-slate-800 outline-none focus:border-rose-400 shadow-sm" placeholder="Min 6 chars" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Affiliate Code</label>
            <div className="relative group">
              <Gift className={`absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 ${refCode ? 'text-emerald-500' : 'text-slate-300'}`} />
              <input name="referral" value={formData.referral} onChange={handleChange} readOnly={!!refCode} className={`w-full border rounded-lg py-2 pl-8 pr-3 text-[9px] font-bold outline-none shadow-sm ${refCode ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-white/60 border-slate-100 text-slate-800'}`} placeholder="Optional" />
            </div>
          </div>

          <button
            disabled={loading || success}
            className={`w-full font-black py-3 rounded-lg transition-all flex items-center justify-center shadow-md active:scale-95 text-[9px] uppercase tracking-[0.2em] mt-2 ${success ? 'bg-emerald-500 text-white' : 'bg-slate-950 text-white hover:bg-rose-600'}`}
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : success ? <><CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Registered</> : 'Build Identity'}
          </button>
        </form>

        <div className="pt-4 mt-4 border-t border-gray-50 flex flex-col items-center space-y-2.5">
          <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest">
            Member? <Link to="/login" className="text-rose-600 font-black hover:underline ml-1">Sign In</Link>
          </p>
          <a href={`https://wa.me/${settings.supportWhatsApp}`} target="_blank" className="flex items-center space-x-1.5 text-emerald-600 font-black text-[7px] uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 hover:scale-105 transition-transform shadow-sm">
            <MessageCircle className="w-3 h-3" />
            <span>WhatsApp</span>
          </a>
        </div>
      </motion.div>

      <div className="mt-6 flex items-center space-x-1.5 opacity-20 z-10 grayscale">
        <ShieldCheck className="w-2.5 h-2.5 text-slate-900" />
        <span className="text-[6px] font-black text-slate-900 uppercase tracking-[0.3em]">Node Secure Network</span>
      </div>
    </div>
  );
};

export default Register;
