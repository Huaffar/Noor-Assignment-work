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
  CloudLightning,
  AlertCircle
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
  const [error, setError] = useState<string | null>(null);
  
  const refCode = searchParams.get('ref');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    whatsapp: '',
    referral: refCode || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
    
    if (!/^03\d{9}$/.test(cleanPhone)) {
      setError("Invalid WhatsApp number. Please use 03XXXXXXXXX format.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await register({ ...formData, whatsapp: cleanPhone });
      setSuccess(true);
      confetti({ 
        particleCount: 100, 
        spread: 70, 
        origin: { y: 0.6 },
        colors: [settings.activeThemeId === 'pink' ? '#E11D48' : '#0ea5e9', '#ffffff']
      });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err: any) {
      setError(err.message || "Registration Failed. Try a different email or phone number.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg flex flex-col items-center justify-center p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] themed-gradient rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] themed-gradient rounded-full blur-[120px]" />
      </div>

      <motion.button 
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        onClick={() => navigate('/')}
        className="mb-6 flex items-center space-x-2 text-theme-primary font-black text-[10px] uppercase tracking-widest hover:scale-95 transition-transform z-10"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </motion.button>

      <motion.div 
        initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-[340px] themed-card p-6 sm:p-8 rounded-[2rem] shadow-2xl relative z-10 overflow-hidden border border-theme-primary/5"
      >
        <div className="absolute top-0 left-0 w-full h-1 themed-gradient" />
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 themed-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CloudLightning className="text-white w-6 h-6 fill-white" />
          </div>
          <h2 className="text-xl font-extrabold text-theme-text tracking-tighter uppercase leading-none">Join Noor Official</h2>
          <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">Create your worker account</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-start space-x-2 text-rose-600"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <p className="text-[10px] font-bold uppercase leading-tight">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-theme-primary transition-colors" />
              <input name="name" required value={formData.name} onChange={handleChange} className="w-full bg-theme-bg border border-gray-100 rounded-xl py-3 pl-11 pr-3 text-xs font-bold text-theme-text outline-none focus:border-theme-primary transition-all shadow-inner" placeholder="E.g. Ahmad Raza" />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">WhatsApp Number</label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-theme-primary transition-colors" />
              <input name="whatsapp" required value={formData.whatsapp} onChange={handleChange} className="w-full bg-theme-bg border border-gray-100 rounded-xl py-3 pl-11 pr-3 text-xs font-bold text-theme-text outline-none focus:border-theme-primary transition-all shadow-inner" placeholder="0300 1234567" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-theme-primary transition-colors" />
              <input name="email" required type="email" value={formData.email} onChange={handleChange} className="w-full bg-theme-bg border border-gray-100 rounded-xl py-3 pl-11 pr-3 text-xs font-bold text-theme-text outline-none focus:border-theme-primary transition-all shadow-inner" placeholder="your@email.com" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-theme-primary transition-colors" />
              <input name="password" required type="password" value={formData.password} onChange={handleChange} className="w-full bg-theme-bg border border-gray-100 rounded-xl py-3 pl-11 pr-3 text-xs font-bold text-theme-text outline-none focus:border-theme-primary transition-all shadow-inner" placeholder="••••••••" />
            </div>
          </div>

          <button
            disabled={loading || success}
            className={`w-full py-4 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-xl transition-all flex items-center justify-center group mt-2 ${success ? 'bg-emerald-500 text-white' : 'themed-gradient text-white hover:brightness-110 active:scale-95 disabled:opacity-50'}`}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : success ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Registration Successful</> : <>Join Platform <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
          </button>
        </form>

        <div className="pt-6 mt-6 border-t border-theme-bg text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Already have an account? <Link to="/login" className="text-theme-primary font-black hover:underline ml-1">Login here</Link>
          </p>
        </div>
      </motion.div>

      <div className="mt-8 flex items-center space-x-3 opacity-30 z-10 grayscale">
        <ShieldCheck className="w-4 h-4 text-theme-text" />
        <span className="text-[9px] font-bold text-theme-text uppercase tracking-[0.2em]">Verified Secure System</span>
      </div>
    </div>
  );
};

export default Register;