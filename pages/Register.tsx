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
      alert("Invalid format. Use 03XXXXXXXXX (11 digits starting with 03)");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters for security.");
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      setSuccess(true);
      confetti({ 
        particleCount: 100, 
        spread: 70, 
        origin: { y: 0.6 },
        colors: [settings.activeThemeId === 'pink' ? '#E11D48' : '#0ea5e9', '#ffffff']
      });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      alert("Registration Failed: Please use a unique email address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg flex flex-col items-center justify-center p-5 relative overflow-hidden">
      {/* Background Decor */}
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
        className="w-full max-w-[320px] themed-card p-6 sm:p-8 rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden border border-theme-primary/5"
      >
        <div className="absolute top-0 left-0 w-full h-1 themed-gradient" />
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 themed-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CloudLightning className="text-white w-6 h-6 fill-white" />
          </div>
          <h2 className="text-xl font-black text-theme-text tracking-tighter uppercase leading-none">Create Account</h2>
          <p className="text-[8px] text-gray-400 mt-2.5 font-bold uppercase tracking-widest leading-none">Join the verified worker network</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300 group-focus-within:text-theme-primary transition-colors" />
              <input name="name" required value={formData.name} onChange={handleChange} className="w-full bg-theme-bg border border-gray-100 rounded-xl py-2.5 pl-11 pr-3 text-[11px] font-bold text-theme-text outline-none focus:border-theme-primary transition-all shadow-inner" placeholder="Ahmad Ali" />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">WhatsApp No</label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300 group-focus-within:text-theme-primary transition-colors" />
              <input name="whatsapp" required value={formData.whatsapp} onChange={handleChange} className="w-full bg-theme-bg border border-gray-100 rounded-xl py-2.5 pl-11 pr-3 text-[11px] font-bold text-theme-text outline-none focus:border-theme-primary transition-all shadow-inner" placeholder="03XXXXXXXXX" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300 group-focus-within:text-theme-primary transition-colors" />
              <input name="email" required type="email" value={formData.email} onChange={handleChange} className="w-full bg-theme-bg border border-gray-100 rounded-xl py-2.5 pl-11 pr-3 text-[11px] font-bold text-theme-text outline-none focus:border-theme-primary transition-all shadow-inner" placeholder="user@example.com" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest ml-1">Secure Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300 group-focus-within:text-theme-primary transition-colors" />
              <input name="password" required type="password" value={formData.password} onChange={handleChange} className="w-full bg-theme-bg border border-gray-100 rounded-xl py-2.5 pl-11 pr-3 text-[11px] font-bold text-theme-text outline-none focus:border-theme-primary transition-all shadow-inner" placeholder="••••••••" />
            </div>
          </div>

          <button
            disabled={loading || success}
            className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all flex items-center justify-center group mt-2 ${success ? 'bg-emerald-500 text-white' : 'themed-gradient text-white hover:brightness-110 active:scale-95 disabled:opacity-50'}`}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : success ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Initializing...</> : <>Start Earning <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
          </button>
        </form>

        <div className="pt-6 mt-6 border-t border-theme-bg text-center">
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
            Already a member? <Link to="/login" className="text-theme-primary font-black hover:underline ml-1">Sign In</Link>
          </p>
        </div>
      </motion.div>

      <div className="mt-8 flex items-center space-x-3 opacity-30 z-10 grayscale">
        <ShieldCheck className="w-3.5 h-3.5 text-theme-text" />
        <span className="text-[8px] font-black text-theme-text uppercase tracking-widest">Verified Pakistani Network</span>
      </div>
    </div>
  );
};

export default Register;