
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  UserPlus, 
  ClipboardCheck, 
  Banknote, 
  MessageCircle
} from 'lucide-react';
import { landingStats, features } from '../utils/landingData';
import { useSystem } from '../context/SystemContext';
import LivePayouts from '../components/LivePayouts';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { settings } = useSystem();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroConfig = settings.heroConfig;
  const slides = heroConfig.slides;

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, heroConfig.transitionDuration * 1000);
    return () => clearInterval(timer);
  }, [slides.length, heroConfig.transitionDuration]);

  // Aspect Ratio Styles
  const getHeroHeight = () => {
    switch(heroConfig.aspectRatio) {
      case '16:9': return 'aspect-video';
      case '21:9': return 'aspect-[21/9]';
      case '4:3': return 'aspect-[4/3]';
      default: return 'h-[80vh] min-h-[500px]';
    }
  };

  return (
    <div className="bg-white">
      <LivePayouts />
      {/* Sleek Dynamic Hero Slider */}
      <section className={`relative overflow-hidden transition-all duration-500 ${getHeroHeight()}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-slate-950/50 z-10" />
            <img 
              src={slides[currentSlide].image} 
              alt="Noor Hero"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-block bg-rose-600 text-white px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase"
            >
              Verified Earning Network
            </motion.div>

            <motion.h1 
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: 'spring' }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 tracking-tighter"
            >
              {slides[currentSlide].title}
            </motion.h1>

            <motion.p 
              key={`sub-${currentSlide}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="text-sm md:text-lg text-gray-200 max-w-lg mx-auto mb-8 font-medium leading-relaxed"
            >
              {slides[currentSlide].subtitle}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <button 
                onClick={() => navigate(slides[currentSlide].buttonLink)}
                className="w-full sm:w-auto px-8 py-4 bg-rose-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-rose-700 transition-all shadow-xl shadow-rose-900/20 flex items-center justify-center group"
              >
                {slides[currentSlide].buttonText} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button 
                className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </div>

        {slides.length > 1 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-10 bg-rose-600' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Thin Stats Bar */}
      <section className="bg-white py-6 border-b border-gray-100">
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
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-6">
                  {feature.icon === 'UserPlus' && <UserPlus className="w-6 h-6" />}
                  {feature.icon === 'ClipboardCheck' && <ClipboardCheck className="w-6 h-6" />}
                  {feature.icon === 'Banknote' && <Banknote className="w-6 h-6" />}
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compact CTA */}
      <section className="py-12 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-80 h-80 bg-rose-600/10 rounded-full -ml-40 -mt-40 blur-[100px]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                Ready to Join <span className="text-rose-600">The Network?</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-base mb-10 max-w-lg mx-auto font-medium">
                Thousands of Pakistanis are already earning. Create your account and start your first assignment in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => navigate('/register')}
                  className="px-10 py-4 bg-white text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all w-full sm:w-auto shadow-2xl"
                >
                  Get Started Free
                </button>
                <a 
                  href={`https://wa.me/${settings.supportWhatsApp}`}
                  className="px-10 py-4 bg-slate-800 text-white rounded-xl font-black text-xs uppercase tracking-widest flex items-center w-full sm:w-auto justify-center border border-white/5"
                >
                  <MessageCircle className="w-5 h-5 mr-2 text-rose-500" /> WhatsApp Support
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
