
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
          Empowering <span className="text-rose-600">Pakistan</span>
        </h1>
        <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
          Noor Official is the premier micro-task network designed to bridge the gap between digital assignments and everyday earners.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm"
        >
          <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-6">
            <Target className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed font-medium">
            To provide a transparent, accessible, and high-paying platform for individuals in Pakistan to monetize their skills through handwriting and digital transcription tasks. We believe everyone deserves a fair chance at financial independence.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 p-10 rounded-[3rem] text-white"
        >
          <div className="w-14 h-14 bg-rose-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-rose-600/20">
            <Eye className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black mb-4">Our Vision</h2>
          <p className="text-slate-400 leading-relaxed font-medium">
            To become the leading digital workforce ecosystem in the region, known for absolute transparency, instant payouts, and a supportive community that grows together through shared goals and mutual trust.
          </p>
        </motion.div>
      </div>

      <div className="bg-rose-50 rounded-[3rem] p-10 md:p-16 flex flex-col items-center text-center space-y-6 border border-rose-100">
        <Heart className="w-12 h-12 text-rose-600 animate-pulse" />
        <h3 className="text-3xl font-black text-gray-900 tracking-tight">Why Noor Official?</h3>
        <p className="text-gray-600 max-w-xl font-medium">
          We aren't just a task platform. We are a community of 15,000+ workers who verify work with integrity. Our system is built on localized payment solutions (EasyPaisa/JazzCash) to ensure you get your hard-earned PKR without delays.
        </p>
        <div className="flex items-center space-x-2 text-rose-600 font-black uppercase tracking-widest text-xs pt-4">
          <ShieldCheck className="w-4 h-4" />
          <span>100% SECURE & VERIFIED</span>
        </div>
      </div>
    </div>
  );
};

export default About;
