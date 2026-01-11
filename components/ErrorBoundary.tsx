import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, RefreshCw, Home, ShieldX } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Standard Platform Error Boundary.
 * Catches critical logic breaks and prevents app-wide crashes.
 */
// Fix: Extend the Component class directly with generic Props and State to ensure 'props' and 'state' members are correctly inherited and recognized by TypeScript
class ErrorBoundary extends Component<Props, State> {
  // Fix: Correctly initialize state as a class property to provide instance-level typing for the component state
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Critical Kernel Logic Break:", error, errorInfo);
  }

  public render(): ReactNode {
    // Fix: Access props and state from 'this', ensuring they are recognized as members inherited from the Component base class
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div className="fixed inset-0 z-[5000] bg-[#fff5f6] flex flex-col items-center justify-center p-6 text-center">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
             <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#e11d48] rounded-full blur-[100px]" />
             <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600 rounded-full blur-[100px]" />
          </div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-[360px] bg-white p-10 rounded-[3rem] border border-[#e11d48]/10 shadow-2xl relative"
          >
            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-rose-100">
               <ShieldX className="w-8 h-8" />
            </div>
            
            <h2 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tighter leading-none">System Sync Lost</h2>
            <p className="text-[10px] text-gray-400 font-bold mb-10 leading-relaxed uppercase tracking-widest px-4">
              Assalam-o-Alaikum! The secure connection was interrupted. Please reboot the system node.
            </p>

            <div className="space-y-3">
              <button 
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl active:scale-95 transition-all flex items-center justify-center group"
              >
                <RefreshCw className="w-4 h-4 mr-2 text-rose-500 group-hover:rotate-180 transition-transform duration-700" /> Reboot System
              </button>
              
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full py-4 bg-gray-50 border border-gray-100 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-sm active:scale-95 transition-all flex items-center justify-center"
              >
                <Home className="w-4 h-4 mr-2" /> Exit To Portal
              </button>
            </div>
          </motion.div>
          
          <p className="mt-10 text-[7px] font-black text-gray-300 uppercase tracking-[0.6em] animate-pulse">Kernel Exception Handler Active</p>
        </div>
      );
    }

    return children || null;
  }
}

export default ErrorBoundary;