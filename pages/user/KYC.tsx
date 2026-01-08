
import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  ShieldCheck, 
  Loader2, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  ShieldAlert,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { submitKYC } from '../../api/controllers/userController';

const KYC: React.FC = () => {
  const { user } = useAuth();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(user?.kycStatus === 'submitted');
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 480, height: 480 } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError("Camera access denied. Please enable permissions.");
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
        stopCamera();
      }
    }
  }, [stream]);

  const handleSubmit = async () => {
    if (!capturedImage) return;
    setIsProcessing(true);
    try {
      await submitKYC(user?.id || 'anonymous', capturedImage);
      setIsSubmitted(true);
    } catch (err) {
      setError("Transmission failure. Check connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  const retake = () => {
    setCapturedImage(null);
    startCamera();
  };

  // Status Displays
  if (user?.kycStatus === 'approved') {
    return (
      <div className="max-w-md mx-auto py-12 px-4 text-center">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-8 rounded-[3rem] border border-emerald-100 shadow-xl shadow-emerald-50">
          <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-100">
            <UserCheck className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Identity Verified</h1>
          <p className="text-gray-500 text-sm font-medium mb-6">Your account is fully synchronized and withdrawal-ready.</p>
          <div className="flex items-center justify-center space-x-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 py-2 rounded-xl">
             <ShieldCheck className="w-4 h-4" />
             <span>Global Node Verified</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-[3rem] border border-amber-100 shadow-xl shadow-amber-50">
          <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Review in Progress</h1>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">Our security nodes are verifying your liveness capture. This usually takes 6-12 hours.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto pb-24 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 mb-1 uppercase tracking-tight">Identity Node</h1>
        <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest flex items-center">
          <ShieldAlert className="w-3 h-3 mr-1" /> Required for Cash Payouts
        </p>
      </div>

      <div className="bg-white rounded-[3rem] p-6 shadow-sm border border-gray-100 overflow-hidden">
        <div className="mb-6 space-y-3">
          <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl">
            <h3 className="text-xs font-black text-rose-600 uppercase mb-1">Liveness Check Rules</h3>
            <ul className="text-[11px] text-rose-700 font-bold space-y-1">
              <li>• Look directly into the lens.</li>
              <li>• Ensure your face is in full brightness.</li>
              <li>• Live capture only (No screen photos).</li>
            </ul>
          </div>
        </div>

        <div className="relative aspect-square bg-slate-900 rounded-[2.5rem] overflow-hidden mb-8 border-4 border-white shadow-2xl">
          {!capturedImage ? (
            <>
              {!stream ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mb-4 backdrop-blur-md">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white text-xs font-bold mb-6">Activation required for identity scan.</p>
                  <button 
                    onClick={startCamera}
                    className="px-8 py-3 bg-rose-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                  >
                    Activate Lens
                  </button>
                </div>
              ) : (
                <>
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <div className="absolute inset-0 border-[20px] border-slate-900/40 pointer-events-none rounded-[2.5rem]">
                    <div className="w-full h-full border-2 border-white/20 border-dashed rounded-full" />
                  </div>
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                    <button 
                      onClick={capture}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-rose-500/20 active:scale-90 transition-transform"
                    >
                      <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="relative w-full h-full">
              <img src={capturedImage} className="w-full h-full object-cover" alt="Captured" />
              <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none" />
              <button 
                onClick={retake}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-xl backdrop-blur-md"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {capturedImage && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
             <button 
               onClick={handleSubmit}
               disabled={isProcessing}
               className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl flex items-center justify-center transition-all hover:bg-rose-600"
             >
               {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Verify Identity <ArrowRight className="ml-2 w-4 h-4" /></>}
             </button>
             <p className="text-center text-[9px] font-black text-gray-400 uppercase tracking-widest">Secure AES-256 Biometric Uplink</p>
          </motion.div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center space-x-2 text-rose-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KYC;
