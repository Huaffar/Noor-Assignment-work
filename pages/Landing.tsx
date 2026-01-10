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
  ClipboardCheck,
  Globe
} from 'lucide-react';
import { heroSlides } from '../utils/landingData';
import { plansData } from '../utils/plansData';
import LivePayouts from '../components/LivePayouts';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { title: "Safe Network", desc: "PKR SSL Protected.", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Fast Payout", desc: "4h Max Payout.", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Urdu Help", desc: "24/7 Local Support.", icon: MessageCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Easy Work", desc: "Pen & Paper tasks.", icon: ClipboardCheck, color: "text-rose-500", bg: "bg-rose-50" },
  ];

  return (
    <div className="min-h-screen bg-theme-bg overflow-x-hidden">
      <LivePayouts />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-10 space-y-16">
        
        {/* Shrunk Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 themed-card p-6 sm:p-10 relative overflow-hidden flex flex-col justify-center min-h-[300px]">
            <div className="relative z-10 max-w-xl">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center space-x-2 bg-theme-secondary px-3 py-1 rounded-full mb-6 border border-theme-primary/10">
                <span className="text-[9px] font-black text-theme-primary uppercase tracking-widest italic">Pakistan No. 1 Network</span>
              </motion.div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h1 className="text-3xl sm:text-5xl font-black text-theme-text leading-tight tracking-tight uppercase">
                    {currentSlide === 0 ? <>Ghar Bethay <span className="text-theme-primary">Paisay</span> Kamaein</> : 
                     currentSlide === 1 ? <>Fauri <span className="text-theme-primary">Payment</span> Hasil Karein</> :
                     <>Pakistan Ka <span className="text-theme-primary">Trusted</span> Network</>}
                  </h1>
                  <p className="text-xs sm:text-base text-gray-500 font-medium leading-relaxed">
                    Simple handwriting tasks mukammal karein aur rozana PKR reward hasil karein.
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-wrap gap-3 mt-8">
                <button onClick={() => navigate('/register')} className="px-8 py-4 themed-gradient text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center group transition-all">
                  Apply Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1" />
                </button>
                <button onClick={() => navigate('/login')} className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all">Member Login</button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="bg-slate-950 rounded-2xl p-6 text-white flex flex-col justify-between shadow-xl relative overflow-hidden border border-white/5">
               <div className="relative z-10">
                  <TrendingUp className="w-5 h-5 text-theme-primary mb-4" />
                  <h4 className="text-2xl font-black text-theme-primary">Rs. 8.4M+</h4>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Paid Out</p>
               </div>
            </div>
            <div className="themed-card p-6 flex flex-col justify-between shadow-md relative overflow-hidden">
               <Users className="w-5 h-5 text-theme-primary mb-4" />
               <h4 className="text-xl font-black text-theme-text leading-none">15k+</h4>
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Active Members</p>
            </div>
          </div>
        </section>

        {/* COMPACT PLAN SECTION */}
        <section className="space-y-8">
           <div className="text-center">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Hamary Earning Packages</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Select Best Plan for You</p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-1">
              {plansData.map((plan) => (
                <motion.div 
                  key={plan.id} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center relative overflow-hidden group hover:border-theme-primary transition-all"
                >
                   {plan.isPopular && <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[5px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest z-10">Hot</div>}
                   <h3 className="text-[10px] font-black text-slate-900 uppercase mb-2 tracking-tight">{plan.name}</h3>
                   <div className="bg-gray-50 py-3 rounded-xl mb-4 shadow-inner">
                      <p className="text-[7px] font-black text-gray-400 uppercase tracking-tighter mb-1">Registration</p>
                      <p className="text-sm font-black text-slate-900 leading-none">Rs. {plan.investment}</p>
                   </div>
                   <div className="space-y-2 text-left px-1">
                      <div className="flex items-center justify-between border-b border-gray-50 pb-1.5">
                         <span className="text-[7px] font-black text-gray-400 uppercase">Work Cap</span>
                         <span className="text-[9px] font-black text-slate-900">{plan.dailyWork} Pages</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-[7px] font-black text-gray-400 uppercase">Monthly</span>
                         <span className="text-[9px] font-black text-theme-primary">Rs. {plan.monthlySalary}</span>
                      </div>
                   </div>
                   <button onClick={() => navigate('/register')} className="w-full mt-4 py-2 bg-slate-950 text-white rounded-lg text-[8px] font-black uppercase tracking-widest group-hover:bg-theme-primary transition-colors">Start Today</button>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950 rounded-[2rem] p-10 text-white relative overflow-hidden border border-white/5">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
              <div className="space-y-4">
                 <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-theme-primary rounded-xl flex items-center justify-center"><CloudLightning className="w-6 h-6 text-white fill-white" /></div>
                    <span className="text-xl font-black tracking-tighter uppercase">Noor<span className="text-theme-primary">Official</span></span>
                 </div>
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-loose">Pakistan's trusted micro-task network.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-slate-300">Hub Links</h4>
                    <div className="flex flex-col space-y-2 text-[9px] font-bold text-slate-500 uppercase">
                       <Link to="/register" className="hover:text-theme-primary">Apply Now</Link>
                       <Link to="/login" className="hover:text-theme-primary">Login Node</Link>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-slate-300">Support</h4>
                    <div className="flex flex-col space-y-2 text-[9px] font-bold text-slate-500 uppercase">
                       <a href="#" className="hover:text-theme-primary">WhatsApp</a>
                       <a href="#" className="hover:text-theme-primary">Rules</a>
                    </div>
                 </div>
              </div>
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase text-slate-300">Presence</h4>
                 <div className="flex items-center space-x-3">
                    <button className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-theme-primary transition-all"><Globe className="w-4 h-4" /></button>
                    <button className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[#25D366] transition-all"><MessageCircle className="w-4 h-4" /></button>
                 </div>
              </div>
           </div>
           <div className="mt-12 pt-8 border-t border-white/5 text-center">
              <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.5em]">© 2024 Noor Digital Network. Verified Hub.</p>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
