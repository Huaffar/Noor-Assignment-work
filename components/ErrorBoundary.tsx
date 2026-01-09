
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Standard Platform Error Boundary.
 */
// Fixed: Explicitly extending React.Component with Props and State interfaces to ensure instance properties (props, state) are correctly inherited and recognized by TypeScript.
class ErrorBoundary extends React.Component<Props, State> {
  // Fixed: Property initializer for state ensures the component's state is correctly typed.
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Critical Node Failure Sync:", error, errorInfo);
  }

  public render(): ReactNode {
    // Fixed: Correctly destructuring inherited props and state from the class instance (this).
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div className="fixed inset-0 z-[2000] bg-white flex flex-col items-center justify-center p-6 text-center">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
             <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-600 rounded-full blur-[100px]" />
          </div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-sm bg-white p-10 rounded-[3rem] border border-rose-50 shadow-2xl relative"
          >
            <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
               <ShieldAlert className="w-10 h-10" />
            </div>
            
            <h2 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tighter">Sync Interruption</h2>
            <p className="text-sm text-gray-500 font-medium mb-10 leading-relaxed uppercase tracking-tight">
              Assalam-o-Alaikum! We encountered a temporary node sync issue. Please refresh or return to the main terminal.
            </p>

            <div className="space-y-3">
              <button 
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-rose-200 active:scale-95 transition-all flex items-center justify-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" /> Refresh Terminal
              </button>
              
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all flex items-center justify-center"
              >
                <Home className="w-4 h-4 mr-2" /> Exit Hub
              </button>
            </div>
          </motion.div>
          
          <p className="mt-8 text-[7px] font-black text-gray-300 uppercase tracking-[0.5em]">Network Fault Isolation Active</p>
        </div>
      );
    }

    return children || null;
  }
}

export default ErrorBoundary;
