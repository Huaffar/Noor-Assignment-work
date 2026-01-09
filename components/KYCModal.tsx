import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  ShieldCheck, 
  Loader2, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  X,
  UserCheck,
  ShieldAlert,
  Lock,
  Eye,
  // Added ArrowRight to resolve "Cannot find name 'ArrowRight'" error
  ArrowRight
} from 'lucide-react';
import { submitKYC } from '../api/controllers/userController';

interface KYCModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const KYCModal: React.FC<KYCModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<'intro' | 'camera' | 'preview' | 'success'>('intro');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      setError(null);
      setPhase('camera');
      // JIT Request: Browser prompt only happens here
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 480, height: 480 },
        audio: false 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError("Camera access was denied or is unavailable. Please allow access in browser settings.");
      setPhase('intro');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(base64);
        setPhase('preview');
        stopCamera();
      }
    }
  }, [stream]);

  const handleSubmit = async () => {
    if (!capturedImage) return;
    setIsProcessing(true);
    try {
      await submitKYC('user_id', capturedImage);
      setPhase('success');
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 3000);
    } catch (err) {
      setError("Transmission failed. Please check your data connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={handleClose}
          />
          
          <motion.div 
            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-sm bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/20"
          >
            <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white relative z-10">
               <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-rose-600" />
                  <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">Identity Node Auth</h2>
               </div>
               <button onClick={handleClose} className="p-2 bg-gray-100 rounded-xl text-gray-400 hover:text-rose-600"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-8">
              {phase === 'intro' ? (
                <div className="space-y-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto text-rose-600 border border-rose-100">
                       <Lock className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Biometric Verification</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                      To secure your payouts, we require a one-time liveness check. Your biometric data is encrypted and never shared.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-slate-50 rounded-2xl border border-gray-100 space-y-2">
                     <p className="font-urdu text-xl text-rose-800 text-center">پیمنٹ وصول کرنے کے لیے اپنی شناخت کی تصدیق کریں۔</p>
                  </div>

                  <button 
                    onClick={startCamera}
                    className="w-full py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-rose-600 transition-all flex items-center justify-center group"
                  >
                    Initialize Biometric Node <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  {error && (
                    <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center space-x-2 text-rose-600">
                      <ShieldAlert className="w-4 h-4" />
                      <span className="text-[9px] font-black uppercase tracking-tight">{error}</span>
                    </div>
                  )}
                </div>
              ) : phase === 'success' ? (
                <div className="text-center space-y-6 py-6">
                  <div className="w-20 h-20 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-emerald-100">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 uppercase">Audit Sequence Logged</h3>
                    <p className="font-urdu text-xl text-gray-500 mt-2 leading-[2.2]">آپ کی معلومات کی جانچ پڑتال کی جا رہی ہے۔ جلد ہی آپ کو مطلع کر دیا جائے گا۔</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative aspect-square bg-slate-950 rounded-[2.5rem] overflow-hidden border-4 border-gray-50 shadow-2xl">
                    {phase === 'camera' && (
                      <>
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                        <div className="absolute inset-0 border-[30px] border-slate-950/60 pointer-events-none rounded-[2.5rem]">
                          <div className="w-full h-full border-2 border-white/20 border-dashed rounded-full" />
                          <div className="absolute top-1/2 left-0 w-full h-px bg-rose-500/30 animate-pulse" />
                        </div>
                        <button onClick={capture} className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-rose-500/20 active:scale-90 transition-transform">
                          <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center text-white">
                            <Camera className="w-6 h-6" />
                          </div>
                        </button>
                        <div className="absolute top-4 left-0 right-0 text-center">
                           <span className="bg-slate-900/80 text-white text-[7px] font-black uppercase px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">Position Face in Center</span>
                        </div>
                      </>
                    )}

                    {phase === 'preview' && capturedImage && (
                      <div className="relative w-full h-full">
                        <img src={capturedImage} className="w-full h-full object-cover" alt="Captured" />
                        <button onClick={reset} className="absolute top-4 right-4 p-2 bg-black/60 text-white rounded-xl backdrop-blur-md active:scale-95 transition-all"><RotateCcw className="w-4 h-4" /></button>
                        <div className="absolute bottom-4 left-0 right-0 text-center">
                           <span className="bg-emerald-500 text-white text-[7px] font-black uppercase px-3 py-1 rounded-full shadow-lg">Frame Captured</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {phase === 'preview' && (
                    <button 
                      onClick={handleSubmit}
                      disabled={isProcessing}
                      className="w-full py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl flex items-center justify-center group"
                    >
                      {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Sync Biometric Trace</>}
                    </button>
                  )}
                </div>
              )}
            </div>
            
            <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
               <p className="text-[7px] font-black text-gray-400 uppercase tracking-[0.4em]">Protocol 4.5.1 Alpha Identity Lock</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default KYCModal;