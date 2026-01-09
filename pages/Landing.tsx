
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Star,
  Users,
  Wallet,
  TrendingUp,
  CheckCircle2,
  Phone,
  PlayCircle,
  UserPlus,
  ClipboardCheck,
  Banknote,
  MessageCircle
} from 'lucide-react';
import { heroSlides } from '../utils/landingData';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Active Members", value: "15,400+", icon: Users, color: "text-blue-600" },
    { label: "Total Paid", value: "Rs. 5.2M", icon: Wallet, color: "text-emerald-600" },
    { label: "Daily Tasks", value: "850+", icon: Zap, color: "text-rose-600" },
  ];

  const workflow = [
    { title: "Create ID", desc: "Sign up with WhatsApp number.", icon: UserPlus },
    { title: "Complete Work", desc: "Daily writing assignments.", icon: ClipboardCheck },
    { title: "Get Paid", desc: "Instant EasyPaisa transfer.", icon: Banknote },
  ];

  const reviews = [
    { name: "Ali Raza", role: "Gold Member", comment: "Bht hi acha platform hai, daily payment mil jati hai.", rating: 5 },
    { name: "Sana Khan", role: "Standard", comment: "Handwriting work is simple and easy. Highly recommended!", rating: 5 },
    { name: "Umar Ahmed", role: "Gold Member", comment: "Noor Official is very trustable. Support team is best.", rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-[#FDF2F8] selection:bg-rose-100 selection:text-rose-600 overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 py-4 md:py-8 space-y-6">
        
        {/* Compact Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-rose-50 relative overflow-hidden flex flex-col justify-center min-h-[380px]">
            <div className="relative z-10">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center space-x-2 bg-rose-50 px-3 py-1 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest">Official Earning Hub v4.0</span>
              </motion.div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h1 className="text-4xl md:text-5xl font-black text-slate-950 leading-[1.1] tracking-tight">
                    {currentSlide === 0 ? <>Ghar Bethay <span className="text-rose-600 italic">Daily</span> Paisay Kamayen</> : 
                     currentSlide === 1 ? <>Instant <span className="text-rose-600 italic">EasyPaisa</span> Payouts</> :
                     <>Simple Work, <span className="text-rose-600 italic">Real</span> Monthly Income</>}
                  </h1>
                  <p className="text-[13px] text-slate-500 font-medium max-w-sm leading-relaxed">
                    Pakistan's most trusted platform for handwriting and digital tasks. Join our 15k+ family today.
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-wrap gap-3 mt-10">
                <button onClick={() => navigate('/register')} className="px-8 py-4 bg-rose-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-rose-100 hover:bg-rose-700 active:scale-95 transition-all flex items-center">
                  Start Earning <ArrowRight className="ml-2 w-4 h-4" />
                </button>
                <button onClick={() => navigate('/login')} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all">Login</button>
              </div>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-5 pointer-events-none">
              <Zap className="w-64 h-64 text-rose-600 rotate-12" />
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="md:col-span-5 grid grid-cols-1 gap-3">
            <div className="bg-slate-950 rounded-[2.5rem] p-6 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                  <div className="w-8 h-8 bg-rose-600 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-3xl font-black tracking-tighter text-rose-500">Rs. 5,200,000+</h4>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Total Payouts Disbursed</p>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-3xl" />
            </div>
            <div className="bg-white rounded-[2.5rem] p-6 border border-rose-50 flex items-center justify-between shadow-sm">
               <div>
                  <h4 className="text-2xl font-black text-slate-900 leading-none">15,400+</h4>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-2">Active Members</p>
               </div>
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-rose-100 overflow-hidden shadow-sm"><img src={`https://i.pravatar.cc/100?u=${i+50}`} /></div>)}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[8px] font-black text-white">+1k</div>
               </div>
            </div>
          </div>
        </section>

        {/* Workflow Section - Compact Steps */}
        <section className="bg-white rounded-[3rem] p-8 md:p-12 border border-rose-50 shadow-sm overflow-hidden">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">How It Works</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Start earning in 3 easy steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {workflow.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center space-y-4 group">
                <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-[1.8rem] flex items-center justify-center shadow-inner group-hover:bg-rose-600 group-hover:text-white transition-all duration-500">
                  <step.icon className="w-7 h-7" />
                </div>
                <div>
                   <h3 className="text-sm font-black text-slate-900 uppercase mb-1">{step.title}</h3>
                   <p className="text-[11px] font-medium text-gray-500">{step.desc}</p>
                </div>
                {i < 2 && <div className="hidden md:block absolute top-8 right-[-15%] w-[30%] border-t-2 border-dashed border-rose-100" />}
              </div>
            ))}
          </div>
        </section>

        {/* Why Trust Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-[2rem] border border-rose-50 shadow-sm text-center space-y-3">
             <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto shadow-sm"><ShieldCheck className="w-5 h-5" /></div>
             <h3 className="text-md font-black text-slate-900 uppercase">100% Secure</h3>
             <p className="font-urdu text-lg text-gray-500 leading-relaxed">آپ کا کام اور رقم ہمارے پاس مکمل محفوظ ہے۔ ہم شفافیت پر یقین رکھتے ہیں۔</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-rose-50 shadow-sm text-center space-y-3">
             <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mx-auto shadow-sm"><Zap className="w-5 h-5" /></div>
             <h3 className="text-md font-black text-slate-900 uppercase">Fast Payouts</h3>
             <p className="font-urdu text-lg text-gray-500 leading-relaxed">ایزی پیسہ اور جاز کیش کے ذریعے روزانہ ادائیگی، بغیر کسی لمبی تاخیر کے۔</p>
          </div>
          <div className="bg-white p-6 rounded-[2rem] border border-rose-50 shadow-sm text-center space-y-3">
             <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto shadow-sm"><Clock className="w-5 h-5" /></div>
             <h3 className="text-md font-black text-slate-900 uppercase">24/7 Help</h3>
             <p className="font-urdu text-lg text-gray-500 leading-relaxed">ہماری ٹیم ہر وقت آپ کی رہنمائی کے لیے واٹس ایپ پر دستیاب ہے۔</p>
          </div>
        </section>

        {/* User Reviews Section */}
        <section className="py-6">
          <div className="flex items-center justify-between px-2 mb-6">
             <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Member Reviews</h2>
             <div className="flex items-center space-x-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-black text-slate-900">4.9/5</span>
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((rev, i) => (
              <div key={i} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center font-black text-rose-600 text-xs shadow-inner">{rev.name[0]}</div>
                  <div>
                    <h4 className="text-[11px] font-black text-slate-900 uppercase leading-none">{rev.name}</h4>
                    <p className="text-[8px] font-bold text-gray-400 uppercase mt-1 tracking-widest">{rev.role}</p>
                  </div>
                </div>
                <p className="text-[12px] font-medium text-slate-600 leading-relaxed italic">"{rev.comment}"</p>
                <div className="flex space-x-0.5">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compact CTA Banner */}
        <section className="bg-rose-600 rounded-[2.5rem] p-10 text-center text-white relative overflow-hidden shadow-2xl shadow-rose-200">
           <div className="relative z-10 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase leading-tight">Ready to join Pakistan's <br/>Most Trusted Network?</h2>
              <p className="text-rose-100 font-bold text-[10px] uppercase tracking-[0.3em]">Registration is free and takes 30 seconds</p>
              <div className="flex justify-center pt-4">
                <button onClick={() => navigate('/register')} className="px-12 py-5 bg-white text-rose-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center">
                  Create My Account <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
           </div>
           <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-20 -mt-20" />
           <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -mr-20 -mb-20" />
        </section>

        {/* WhatsApp Floating (Visual Only) */}
        <div className="flex justify-center pt-4 pb-8">
           <a href={`https://wa.me/923000000000`} className="flex items-center space-x-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 shadow-sm hover:scale-105 transition-transform">
             <MessageCircle className="w-4 h-4" />
             <span>Official Support Center</span>
           </a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
