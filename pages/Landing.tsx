
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  UserPlus, 
  ClipboardCheck, 
  Banknote, 
  ShieldCheck, 
  Zap, 
  MessageCircle
} from 'lucide-react';
import { heroSlides, landingStats, features } from '../utils/landingData';
import { useSystem } from '../context/SystemContext';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { settings } = useSystem();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white">
      {/* Sleek Hero Slider */}
      <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-slate-950/60 z-10" />
            <img 
              src={heroSlides[currentSlide].url} 
              alt="Noor Hero"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block bg-rose-600 text-white px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase"
            >
              Verified Earning Network
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 tracking-tight"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-sm md:text-base text-gray-200 max-w-lg mx-auto mb-8 font-medium leading-relaxed"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex items-center justify-center space-x-3"
            >
              <button 
                onClick={() => navigate('/login')}
                className="px-6 py-3 bg-rose-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-rose-700 transition-all shadow-xl shadow-rose-900/20 flex items-center group"
              >
                Sign In <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button 
                className="px-6 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-rose-600' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Thin Stats Bar */}
      <section className="bg-white py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Workers", value: landingStats.totalUsers },
              { label: "Total Paid", value: landingStats.totalPaid },
              { label: "Live Tasks", value: landingStats.activeTasks },
              { label: "Support", value: landingStats.supportResponse }
            ].map((stat, idx) => (
              <div key={idx} className="text-center border-r last:border-0 border-gray-100 md:border-r">
                <div className="text-base md:text-xl font-black text-gray-900 tracking-tighter">{stat.value}</div>
                <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High Density Features */}
      <section className="py-12 md:py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-rose-600 font-black uppercase tracking-widest text-[9px]">Workflow</span>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 mb-4">
                  {feature.icon === 'UserPlus' && <UserPlus className="w-5 h-5" />}
                  {feature.icon === 'ClipboardCheck' && <ClipboardCheck className="w-5 h-5" />}
                  {feature.icon === 'Banknote' && <Banknote className="w-5 h-5" />}
                </div>
                <h3 className="text-base font-black text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compact CTA */}
      <section className="py-12 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-rose-600/10 rounded-full -ml-32 -mt-32 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-5xl font-black text-white mb-4 tracking-tighter">
                Ready to Join <span className="text-rose-600">The Movement?</span>
              </h2>
              <p className="text-slate-400 text-xs md:text-sm mb-8 max-w-md mx-auto font-medium">
                Thousands are already earning. Create your account and start your first task in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button 
                  onClick={() => navigate('/register')}
                  className="px-8 py-3 bg-white text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all w-full sm:w-auto"
                >
                  Get Started Free
                </button>
                <a 
                  href={`https://wa.me/${settings.supportWhatsApp}`}
                  className="px-8 py-3 bg-slate-800 text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center w-full sm:w-auto justify-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2 text-rose-500" /> WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
