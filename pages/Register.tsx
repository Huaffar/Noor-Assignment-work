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
  Loader2,
  ChevronLeft,
  ShieldCheck,
  MessageCircle,
  CloudLightning
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
      alert("Invalid format. Use 03XXXXXXXXX");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      // Logic fix: Ensure user is registered and redirect to dashboard
      await register(formData);
      setSuccess(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => navigate('/dashboard'), 1500); // Redirect to dashboard, not login
    } catch (err) {
      alert("System could not register. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <motion.button 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        onClick={() => navigate('/')}
        className="mb-4 flex items-center space-x-1 text-theme-primary font-black text-[10px] uppercase tracking-widest z-10"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </motion.button>

      <motion.div 
        initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-[320px] themed-card p-6 shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="text-center mb-6">
          <div className="w-10 h-10 themed-gradient rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <CloudLightning className="text-white w-5 h-5 fill-white" />
          </div>
          <h2 className="text-lg font-black text-theme-text tracking-tighter uppercase">New Account</h2>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Join our worker network</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[8px] font-black text-gray-400 uppercase ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
              <input name="name" required value={formData.name} onChange={handleChange} className="w-full bg-theme-bg/50 border border-gray-100 rounded-lg py-2.5 pl-9 pr-3 text-[11px] font-bold outline-none focus:border-theme-primary" placeholder="Ahmad Ali" />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-[8px] font-black text-gray-400 uppercase ml-1">WhatsApp No</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
              <input name="whatsapp" required value={formData.whatsapp} onChange={handleChange} className="w-full bg-theme-bg/50 border border-gray-100 rounded-lg py-2.5 pl-9 pr-3 text-[11px] font-bold outline-none focus:border-theme-primary" placeholder="03XXXXXXXXX" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[8px] font-black text-gray-400 uppercase ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
              <input name="email" required type="email" value={formData.email} onChange={handleChange} className="w-full bg-theme-bg/50 border border-gray-100 rounded-lg py-2.5 pl-9 pr-3 text-[11px] font-bold outline-none focus:border-theme-primary" placeholder="user@gmail.com" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[8px] font-black text-gray-400 uppercase ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
              <input name="password" required type="password" value={formData.password} onChange={handleChange} className="w-full bg-theme-bg/50 border border-gray-100 rounded-lg py-2.5 pl-9 pr-3 text-[11px] font-bold outline-none focus:border-theme-primary" placeholder="••••••••" />
            </div>
          </div>

          <button
            disabled={loading || success}
            className={`w-full font-black py-3.5 rounded-xl transition-all flex items-center justify-center shadow-lg active:scale-95 text-[10px] uppercase tracking-widest mt-4 ${success ? 'bg-emerald-500 text-white' : 'themed-gradient text-white hover:brightness-105'}`}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : success ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Creating...</> : 'Create My Account'}
          </button>
        </form>

        <div className="pt-4 mt-4 border-t border-theme-bg text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Already member? <Link to="/login" className="text-theme-primary font-black hover:underline">Sign In</Link>
          </p>
        </div>
      </motion.div>

      <div className="mt-6 flex items-center space-x-2 opacity-30 grayscale">
        <ShieldCheck className="w-3 h-3 text-theme-text" />
        <span className="text-[8px] font-black text-theme-text uppercase tracking-widest">Verified Pakistani Network</span>
      </div>
    </div>
  );
};

export default Register;