import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp,
  UserPlus,
  ClipboardCheck,
  Banknote,
  MessageCircle,
  CloudLightning,
  Star,
  Users,
  Zap,
  Globe,
  Wallet,
  Target,
  Rocket
} from 'lucide-react';
import { heroSlides } from '../utils/landingData';
import LivePayouts from '../components/LivePayouts';
import { plansData } from '../utils/plansData';

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
    { title: "Safe & Secure", desc: "Data protected by SSL.", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Fast Payouts", desc: "EasyPaisa in 4 hours.", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Urdu Help", desc: "Support in your language.", icon: MessageCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Easy Work", desc: "Writing & typing tasks.", icon: ClipboardCheck, color: "text-rose-500", bg: "bg-rose-50" },
  ];

  const reviews = [
    { name: "Ahmed Raza", role: "Worker", text: "Bohat acha platform hai, rozana payment mil jati hai.", stars: 5, img: "https://i.pravatar.cc/100?u=1" },
    { name: "Sana Khan", role: "Student", text: "Pocket money ke liye best hai. Simple kaam hai.", stars: 5, img: "https://i.pravatar.cc/100?u=2" },
    { name: "M. Usman", role: "Gold Member", text: "Team Noor official support bohat fast hai.", stars: 4, img: "https://i.pravatar.cc/100?u=3" },
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
                <span className="text-[9px] font-black text-theme-primary uppercase tracking-widest italic">Pakistan Ka Trusted Network</span>
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
                     <>Pakistan Ka <span className="text-theme-primary">No. 1</span> Network</>}
                  </h1>
                  <p className="text-xs sm:text-base text-gray-500 font-medium leading-relaxed">
                    Handwriting aur simple digital tasks mukammal karein aur rozana PKR reward hasil karein.
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-wrap gap-3 mt-8">
                <button onClick={() => navigate('/register')} className="px-8 py-4 themed-gradient text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center group transition-all">
                  Get Started <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1" />
                </button>
                <button onClick={() => navigate('/login')} className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all">Login</button>
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
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Members</p>
            </div>
          </div>
        </section>

        {/* Why Choose Noor */}
        <section className="space-y-8">
           <div className="text-center">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Kyun Humein Chunien?</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Top Features</p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((f, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-all group">
                   <div className={`w-10 h-10 ${f.bg} ${f.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-inner group-hover:scale-110 transition-transform`}>
                      <f.icon className="w-5 h-5" />
                   </div>
                   <h3 className="text-[11px] font-black text-slate-900 uppercase">{f.title}</h3>
                   <p className="text-[9px] text-gray-400 mt-1 leading-tight">{f.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* COMPACT PLAN SECTION */}
        <section className="space-y-8">
           <div className="text-center">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Hamary Earning Plans</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Select Best Plan for You</p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {plansData.map((plan, i) => (
                <motion.div 
                  key={plan.id} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-center relative overflow-hidden group hover:border-theme-primary transition-all"
                >
                   {plan.isPopular && <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[5px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-widest z-10 animate-pulse">Hot</div>}
                   <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-tight mb-2">{plan.name}</h3>
                   <div className="bg-gray-50 py-3 rounded-xl mb-4 shadow-inner">
                      <p className="text-[7px] font-black text-gray-400 uppercase tracking-tighter mb-1">Registration</p>
                      <p className="text-base font-black text-slate-900 leading-none">Rs. {plan.investment}</p>
                   </div>
                   <div className="space-y-2 text-left px-1">
                      <div className="flex items-center justify-between border-b border-gray-50 pb-1.5">
                         <span className="text-[8px] font-black text-gray-400 uppercase">Reward/Day</span>
                         <span className="text-[10px] font-black text-emerald-600">Rs. {plan.dailyWork * 240}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-gray-50 pb-1.5">
                         <span className="text-[8px] font-black text-gray-400 uppercase">Work Cap</span>
                         <span className="text-[10px] font-black text-slate-900">{plan.dailyWork} Pages</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-[8px] font-black text-gray-400 uppercase">Monthly</span>
                         <span className="text-[10px] font-black text-theme-primary">Rs. {plan.monthlySalary}</span>
                      </div>
                   </div>
                   <button onClick={() => navigate('/register')} className="w-full mt-4 py-2 bg-slate-950 text-white rounded-lg text-[9px] font-black uppercase tracking-widest group-hover:bg-theme-primary transition-colors active:scale-95">Select Plan</button>
                </motion.div>
              ))}
           </div>
        </section>

        {/* Success Stories (Reviews) */}
        <section className="bg-slate-950 p-8 rounded-[2rem] text-white overflow-hidden relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-theme-primary/10 rounded-full blur-[100px]" />
           <div className="relative z-10">
              <div className="text-center mb-10">
                 <h2 className="text-2xl font-black uppercase">Success Stories</h2>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Workers Speak</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {reviews.map((r, i) => (
                   <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-4">
                      <div className="flex items-center space-x-3">
                         <img src={r.img} className="w-10 h-10 rounded-full border-2 border-theme-primary" />
                         <div>
                            <p className="text-[11px] font-black uppercase leading-none">{r.name}</p>
                            <p className="text-[8px] text-slate-500 uppercase mt-1">{r.role}</p>
                         </div>
                      </div>
                      <p className="text-[10px] text-slate-300 italic leading-relaxed">"{r.text}"</p>
                      <div className="flex space-x-0.5">
                        {[...Array(5)].map((_, si) => <Star key={si} className={`w-3 h-3 ${si < r.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />)}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950 rounded-[2rem] p-10 mt-20 text-white relative overflow-hidden border border-white/5">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
              <div className="space-y-4">
                 <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-theme-primary rounded-xl flex items-center justify-center"><CloudLightning className="w-6 h-6 text-white fill-white" /></div>
                    <span className="text-xl font-black tracking-tighter uppercase">Noor<span className="text-theme-primary">Official</span></span>
                 </div>
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-loose">Pakistan's sasta aur trusted network.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-slate-300">Links</h4>
                    <div className="flex flex-col space-y-2 text-[9px] font-bold text-slate-500 uppercase">
                       <Link to="/register" className="hover:text-theme-primary transition-colors">Apply Now</Link>
                       <Link to="/login" className="hover:text-theme-primary transition-colors">Login Hub</Link>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-slate-300">Support</h4>
                    <div className="flex flex-col space-y-2 text-[9px] font-bold text-slate-500 uppercase">
                       <a href="#" className="hover:text-theme-primary transition-colors">WhatsApp Help</a>
                       <a href="#" className="hover:text-theme-primary transition-colors">Terms</a>
                    </div>
                 </div>
              </div>
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase text-slate-300">Official</h4>
                 <div className="flex items-center space-x-3">
                    <button className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-theme-primary transition-all"><Globe className="w-4 h-4" /></button>
                    <button className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-[#25D366] transition-all"><MessageCircle className="w-4 h-4" /></button>
                 </div>
              </div>
           </div>
           <div className="mt-12 pt-8 border-t border-white/5 text-center">
              <p className="text-[8px] font-black text-slate-600 uppercase tracking-[0.5em]">© 2024 Noor Digital Network. Pakistan Verified Hub.</p>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;