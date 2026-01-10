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
  Quote
} from 'lucide-react';
import { heroSlides } from '../utils/landingData';
import { plansData } from '../utils/plansData';
import { reviews } from '../utils/mockData';
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

  return (
    <div className="min-h-screen bg-theme-bg overflow-x-hidden">
      <LivePayouts />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-10 space-y-24">
        
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 themed-card p-6 sm:p-10 relative overflow-hidden flex flex-col justify-center min-h-[350px]">
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
                    Join thousands of workers making real daily PKR through simple assignments.
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-wrap gap-3 mt-8">
                <button onClick={() => navigate('/register')} className="px-8 py-4 themed-gradient text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center group transition-all">
                  Get Started <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1" />
                </button>
                <button onClick={() => navigate('/login')} className="px-8 py-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all">Worker Login</button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="bg-slate-950 rounded-2xl p-6 text-white flex flex-col justify-between shadow-xl relative overflow-hidden border border-white/5">
               <div className="relative z-10">
                  <TrendingUp className="w-5 h-5 text-theme-primary mb-4" />
                  <h4 className="text-2xl font-black text-theme-primary">Rs. 8.4M+</h4>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Total Payouts</p>
               </div>
            </div>
            <div className="themed-card p-6 flex flex-col justify-between shadow-md relative overflow-hidden">
               <Users className="w-5 h-5 text-theme-primary mb-4" />
               <h4 className="text-xl font-black text-theme-text leading-none">15k+</h4>
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Active Members</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-slate-950 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute -top-24 -left-24 w-96 h-96 bg-theme-primary rounded-full blur-[120px]" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
               <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight leading-none mb-4">Hamary Sath Kyun <br/><span className="text-theme-primary">Kam Karein?</span></h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Why Thousands Choose Noor Official</p>
               </div>
               
               <div className="grid gap-4">
                  {[
                    { title: "Mehfooz Platform", desc: "Aap ki har kamai mehfooz hai aur verification ke baad fori transfer hoti hai.", icon: ShieldCheck },
                    { title: "EasyPaisa Withdraw", desc: "Baghair kisi mushkil ke apni rakam EasyPaisa ya JazzCash mein hasil karein.", icon: Zap },
                    { title: "24/7 Live Support", desc: "Humari team har waqt aap ki rehnumai ke liye majood hai.", icon: MessageCircle }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                       <div className="w-10 h-10 bg-theme-primary/20 rounded-xl flex items-center justify-center shrink-0"><item.icon className="w-5 h-5 text-theme-primary" /></div>
                       <div>
                          <h4 className="font-urdu text-2xl mb-1 text-white leading-none">{item.title}</h4>
                          <p className="font-urdu text-lg text-slate-400 leading-relaxed text-right md:text-left">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="hidden md:block">
               <div className="bg-theme-secondary/10 p-10 rounded-[4rem] border border-white/5 relative overflow-hidden">
                  <p className="font-urdu text-4xl text-white text-center leading-[2.2]" dir="rtl">
                    نور آفیشل کا مقصد پاکستان میں ہر فرد کو ایک مستحکم آمدنی کا ذریعہ فراہم کرنا ہے۔ ہماری شفافیت ہی ہماری پہچان ہے۔
                  </p>
                  <div className="absolute bottom-0 right-0 p-8"><Quote className="w-20 h-20 text-white/5" /></div>
               </div>
            </div>
          </div>
        </section>

        {/* Client Reviews */}
        <section className="space-y-12">
           <div className="text-center">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Kamyab Workers Ki Kahani</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">What Our Members Say</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-1 pb-12">
              {reviews.map((rev) => (
                <motion.div 
                  key={rev.id}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm relative transition-all hover:shadow-md"
                >
                   <div className="flex items-center space-x-1 text-amber-400 mb-4">
                      {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                   </div>
                   <p className="text-[11px] text-gray-500 font-medium italic mb-6 leading-relaxed">"{rev.comment}"</p>
                   <div className="flex items-center space-x-3">
                      <img src={rev.avatar} className="w-10 h-10 rounded-xl object-cover shadow-sm" alt={rev.name} />
                      <div>
                         <h4 className="text-[10px] font-black text-slate-900 uppercase leading-none">{rev.name}</h4>
                         <p className="text-[8px] font-bold text-theme-primary uppercase tracking-tighter mt-1">{rev.role}</p>
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