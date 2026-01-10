import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  CloudLightning,
  Shield
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
      navigate(user.role === 'admin' ? '/admin' : '/dashboard', { replace: true });
    } catch (err) {
      alert("Login Failed: Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAccess = async (type: 'user' | 'admin') => {
    setLoading(true);
    try {
      const user = type === 'user' ? await demoLogin() : await adminDemoLogin();
      navigate(user.role === 'admin' ? '/admin' : '/dashboard', { replace: true });
    } catch (err) {
      alert("Quick access failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] themed-gradient rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] themed-gradient rounded-full blur-[120px]" />
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
        className="w-full max-w-[340px] themed-card p-8 rounded-[3rem] shadow-2xl relative z-10 overflow-hidden border border-theme-primary/10"
      >
        <div className="absolute top-0 left-0 w-full h-1 themed-gradient" />
        
        <div className="text-center mb-8">
          <div className="w-14 h-14 themed-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <CloudLightning className="text-white w-7 h-7 fill-white" />
          </div>
          <h2 className="text-2xl font-black text-theme-text tracking-tighter uppercase leading-none">Member Login</h2>
          <p className="text-[9px] text-gray-400 mt-3 font-bold uppercase tracking-widest leading-none">Enter your email and password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300 group-focus-within:text-theme-primary transition-colors" />
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-theme-bg border border-gray-100 rounded-xl py-3 pl-11 pr-3 text-xs font-bold text-theme-text outline-none focus:border-theme-primary transition-all" placeholder="your@email.com" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300 group-focus-within:text-theme-primary transition-colors" />
              <input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-theme-bg border border-gray-100 rounded-xl py-3 pl-11 pr-11 text-xs font-bold text-theme-text outline-none focus:border-theme-primary transition-all" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-theme-primary">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-4 themed-gradient text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center group"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-3" /> : <>Sign In <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
          </button>
        </form>

        {settings.modules.demoLogin && (
          <div className="mt-8 pt-6 border-t border-gray-50">
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest text-center mb-5">Quick Access</p>
            <div className="grid grid-cols-2 gap-3">
               <button 
                onClick={() => handleQuickAccess('user')} 
                disabled={loading}
                className="py-3 bg-theme-secondary text-theme-primary font-black rounded-xl text-[9px] uppercase tracking-widest border border-theme-primary/10 flex flex-col items-center justify-center hover:bg-theme-primary hover:text-white transition-all shadow-sm active:scale-95 group disabled:opacity-50"
               >
                 <Zap className="w-4 h-4 mb-1.5 group-hover:scale-110 transition-transform" />
                 Worker
               </button>
               <button 
                onClick={() => handleQuickAccess('admin')} 
                disabled={loading}
                className="py-3 bg-slate-900 text-white font-black rounded-xl text-[9px] uppercase tracking-widest border border-white/10 flex flex-col items-center justify-center hover:bg-theme-primary transition-all shadow-sm active:scale-95 group disabled:opacity-50"
               >
                 <Shield className="w-4 h-4 mb-1.5 group-hover:scale-110 transition-transform text-theme-primary" />
                 Admin
               </button>
            </div>
          </div>
        )}

        <div className="pt-6 mt-8 border-t border-theme-bg flex flex-col items-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            New here? <Link to="/register" className="text-theme-primary font-black hover:underline ml-1">Create Account</Link>
          </p>
        </div>
      </motion.div>

      <div className="mt-8 flex items-center space-x-3 opacity-30 z-10 grayscale">
        <ShieldCheck className="w-4 h-4 text-theme-text" />
        <span className="text-[9px] font-black text-theme-text uppercase tracking-widest">Secured by SSL Protocol</span>
      </div>
    </div>
  );
};

export default Login;