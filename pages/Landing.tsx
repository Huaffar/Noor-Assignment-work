import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp,
  Zap,
  Star,
  Users,
  MessageCircle,
  CloudLightning,
  Globe,
  Quote,
  LayoutDashboard
} from 'lucide-react';
import { heroSlides } from '../utils/landingData';
import { useAuth } from '../context/AuthContext';
import { reviews } from '../utils/mockData';
import LivePayouts from '../components/LivePayouts';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePortalAction = () => {
    if (isAuthenticated) {
      navigate(user?.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg overflow-x-hidden">
      <LivePayouts />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-10 space-y-24">
        
        {/* Hero Section - Optimized for PC Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 themed-card p-8 md:p-16 relative overflow-hidden flex flex-col justify-center min-h-[400px] lg:min-h-[500px]">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] themed-gradient rounded-full blur-[150px] -mr-48 -mt-48" />
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="inline-flex items-center space-x-3 bg-theme-secondary px-4 py-2 rounded-full mb-8 border border-theme-primary/10 shadow-sm"
              >
                <div className="w-2 h-2 bg-theme-primary rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-theme-primary uppercase tracking-[0.2em] italic">Pakistan's Verified Earning Network</span>
              </motion.div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide}
                  initial={{ opacity: 0, y: 15 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight uppercase">
                    {currentSlide === 0 ? <>Build Your <span className="text-theme-primary">Wealth</span> From Home</> : 
                     currentSlide === 1 ? <>Instant <span className="text-theme-primary">Payouts</span> Every Day</> :
                     <>Join The <span className="text-theme-primary">Verified</span> Elite Hub</>}
                  </h1>
                  <p className="text-sm md:text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
                    Access high-yield assignments and secure your monthly PKR income with our redundant payout infrastructure.
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-wrap gap-4 mt-12">
                {!isAuthenticated ? (
                  <button 
                    onClick={() => navigate('/register')} 
                    className="px-10 py-5 themed-gradient text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-theme-primary/20 flex items-center group transition-all active:scale-95"
                  >
                    Initialize Account <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button 
                    onClick={() => navigate('/dashboard')} 
                    className="px-10 py-5 themed-gradient text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-theme-primary/20 flex items-center group transition-all active:scale-95"
                  >
                    Go to Dashboard <LayoutDashboard className="ml-3 w-5 h-5" />
                  </button>
                )}
                
                <button 
                  onClick={handlePortalAction} 
                  className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-slate-800 active:scale-95 flex items-center"
                >
                  {isAuthenticated ? 'System Portal' : 'Worker Login'}
                </button>
              </div>
            </div>
          </div>

          {/* Side Metrics - Desktop Optimized */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-4">
            <div className="bg-slate-950 rounded-[2.5rem] p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden border border-white/5 group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-theme-primary/10 rounded-full blur-3xl group-hover:bg-theme-primary/20 transition-colors" />
               <div className="relative z-10">
                  <TrendingUp className="w-8 h-8 text-theme-primary mb-6" />
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">Total Node Yield</p>
                  <h4 className="text-4xl font-black text-white tracking-tighter">Rs. 8.4M+</h4>
                  <div className="mt-6 flex items-center space-x-2">
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                     <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Live Syncing</span>
                  </div>
               </div>
            </div>
            <div className="themed-card p-8 flex flex-col justify-between shadow-xl relative overflow-hidden border border-gray-100 group">
               <Users className="w-8 h-8 text-theme-primary mb-6" />
               <div className="relative z-10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Verified Personnel</p>
                  <h4 className="text-4xl font-black text-slate-900 tracking-tighter">15,000+</h4>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">Active Global Nodes</p>
               </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Expanded for PC */}
        <section className="bg-slate-950 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl border border-white/5">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute -top-48 -left-48 w-[800px] h-[800px] bg-theme-primary rounded-full blur-[160px]" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="space-y-12">
               <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">Why Choose <br/><span className="text-theme-primary">Noor Official?</span></h2>
                  <p className="text-sm md:text-lg text-slate-400 font-medium uppercase tracking-[0.2em] leading-relaxed">The architecture of trust in Pakistan's digital economy.</p>
               </div>
               
               <div className="grid gap-6">
                  {[
                    { title: "Secured Nodes", desc: "Your data and earnings are protected by AES-256 encryption and human audit verification.", icon: ShieldCheck },
                    { title: "Instant Liquidity", desc: "Initialize withdrawals anytime and receive PKR in your mobile wallet within hours.", icon: Zap },
                    { title: "Redundant Support", desc: "A global network of support nodes ready to assist you 24/7 in multiple languages.", icon: MessageCircle }
                  ].map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="flex items-start space-x-6 p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all cursor-default"
                    >
                       <div className="w-14 h-14 bg-theme-primary/20 rounded-2xl flex items-center justify-center shrink-0 border border-theme-primary/20 shadow-inner">
                         <item.icon className="w-7 h-7 text-theme-primary" />
                       </div>
                       <div>
                          <h4 className="text-xl font-black uppercase tracking-tight text-white mb-2">{item.title}</h4>
                          <p className="text-sm text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
            
            <div className="hidden lg:block relative">
               <div className="bg-theme-secondary/5 p-16 rounded-[5rem] border border-white/10 relative overflow-hidden backdrop-blur-sm">
                  <Quote className="w-24 h-24 text-theme-primary opacity-20 mb-8" />
                  <p className="font-urdu text-5xl text-white text-right leading-[2.2] relative z-10" dir="rtl">
                    نور آفیشل کا مقصد پاکستان میں ہر فرد کو ایک مستحکم اور باعزت آمدنی کا ذریعہ فراہم کرنا ہے۔ ہماری شفافیت اور بروقت ادائیگی ہی ہمارا فخر ہے۔
                  </p>
                  <div className="absolute bottom-0 left-0 p-12 opacity-5">
                    <CloudLightning className="w-64 h-64 text-white" />
                  </div>
               </div>
               {/* Floating elements for PC flair */}
               <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-10 -right-10 w-24 h-24 bg-theme-primary rounded-full blur-2xl opacity-40" />
               <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -bottom-10 -left-10 w-32 h-32 bg-rose-600 rounded-full blur-3xl opacity-20" />
            </div>
          </div>
        </section>

        {/* Reviews Section - Multi-column for PC */}
        <section className="space-y-16">
           <div className="text-center space-y-4">
              <div className="inline-block px-4 py-1.5 bg-theme-secondary rounded-full text-[10px] font-black text-theme-primary uppercase tracking-widest border border-theme-primary/10">Community Success</div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Voices of the Network</h2>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-1 pb-16">
              {reviews.map((rev) => (
                <motion.div 
                  key={rev.id}
                  whileHover={{ y: -10, shadow: "0 25px 50px -12px rgba(0,0,0,0.1)" }}
                  className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm relative transition-all group overflow-hidden"
                >
                   <div className="absolute top-0 left-0 w-full h-1 bg-gray-50 group-hover:bg-theme-primary transition-colors" />
                   <div className="flex items-center space-x-1 text-amber-400 mb-6">
                      {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                   </div>
                   <p className="text-sm md:text-base text-gray-500 font-medium italic mb-8 leading-relaxed">"{rev.comment}"</p>
                   <div className="flex items-center space-x-4 border-t border-gray-50 pt-6">
                      <img src={rev.avatar} className="w-12 h-12 rounded-2xl object-cover shadow-md group-hover:rotate-6 transition-transform" alt={rev.name} />
                      <div>
                         <h4 className="text-xs font-black text-slate-900 uppercase leading-none mb-1">{rev.name}</h4>
                         <p className="text-[9px] font-bold text-theme-primary uppercase tracking-widest">{rev.role}</p>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;