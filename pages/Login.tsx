
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Lock, 
  ArrowRight, 
  Zap, 
  Eye, 
  EyeOff, 
  Loader2, 
  ChevronLeft, 
  ShieldCheck, 
  User, 
  MessageCircle, 
  Fingerprint, 
  Terminal 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSystem } from '../context/SystemContext';

const Login: React.FC = () => {
  const { login, demoLogin, adminDemoLogin } = useAuth();
  const { settings } = useSystem();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(email, password);
      // Immediate redirection based on role
      navigate(user.role === 'admin' ? '/admin' : '/dashboard', { replace: true });
    } catch (err) {
      alert("Invalid credentials. Access denied.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoWorker = () => {
    demoLogin();
    navigate('/dashboard', { replace: true });
  };

  const handleDemoAdmin = () => {
    adminDemoLogin();
    navigate('/admin', { replace: true });
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
        <span>Back to Home</span>
      </motion.button>

      <motion.div 
        initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-[280px] glass-light p-5 rounded-[2rem] shadow-[0_25px_50px_rgba(225,29,72,0.1)] border border-white/80 relative z-10 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-0.5 bg-rose-600" />
        
        <div className="text-center mb-5">
          <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center mx-auto mb-2.5 shadow-lg shadow-rose-200">
            <Fingerprint className="text-white w-5 h-5" />
          </div>
          <h2 className="text-lg font-black text-slate-900 tracking-tighter leading-none uppercase">Access Hub</h2>
          <p className="text-[7px] text-slate-400 mt-1 font-bold uppercase tracking-widest">Secure Portal v4.0</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div className="space-y-1">
            <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/60 border border-slate-100 rounded-lg py-2 pl-8 pr-3 outline-none focus:border-rose-400 transition-all text-[10px] font-bold text-slate-800 shadow-sm" placeholder="user@noor.com" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[7px] font-black text-gray-400 uppercase tracking-widest ml-1">Access Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
              <input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/60 border border-slate-100 rounded-lg py-2 pl-8 pr-9 outline-none focus:border-rose-400 transition-all text-[10px] font-bold text-slate-800 shadow-sm" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300">
                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </button>
            </div>
          </div>

          <button disabled={loading} className="w-full bg-slate-950 text-white font-black py-3 rounded-lg hover:bg-rose-600 transition-all flex items-center justify-center group shadow-md active:scale-95 disabled:opacity-50 text-[9px] uppercase tracking-[0.2em]">
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Enter Hub'}
            {!loading && <ArrowRight className="ml-1.5 w-3 h-3 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        {settings.modules.demoLogin && (
          <>
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-50"></div></div>
              <span className="relative bg-white/40 backdrop-blur-md px-2 text-[6px] font-black text-slate-300 uppercase tracking-widest">Rapid Access</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
               <button onClick={handleDemoWorker} className="py-2 bg-rose-50 text-rose-600 font-black rounded-lg text-[7px] uppercase tracking-widest border border-rose-100 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                 <Zap className="w-3 h-3 mr-1" /> Worker
               </button>
               <button onClick={handleDemoAdmin} className="py-2 bg-slate-50 text-slate-600 font-black rounded-lg text-[7px] uppercase tracking-widest border border-slate-100 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                 <Terminal className="w-3 h-3 mr-1" /> Admin
               </button>
            </div>
          </>
        )}

        <div className="pt-4 mt-4 border-t border-gray-50 flex flex-col items-center space-y-2.5">
          <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest">
            New Account? <Link to="/register" className="text-rose-600 font-black hover:underline ml-1">Create Now</Link>
          </p>
          <a href={`https://wa.me/${settings.supportWhatsApp}`} target="_blank" className="flex items-center space-x-1.5 text-emerald-600 font-black text-[7px] uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 hover:scale-105 transition-transform shadow-sm">
            <MessageCircle className="w-3 h-3" />
            <span>Support</span>
          </a>
        </div>
      </motion.div>

      <div className="mt-6 flex items-center space-x-1 opacity-20 z-10 grayscale">
        <ShieldCheck className="w-2.5 h-2.5 text-slate-900" />
        <span className="text-[6px] font-black text-slate-900 uppercase tracking-[0.3em]">End-to-End Encryption</span>
      </div>
    </div>
  );
};

export default Login;
