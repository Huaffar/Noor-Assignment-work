
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  X, 
  User, 
  ShieldCheck, 
  Eye, 
  Search, 
  Loader2, 
  MessageSquare,
  AlertCircle,
  ArrowRight,
  Camera,
  Maximize2
} from 'lucide-react';
import { updateKYCStatus } from '../../api/controllers/userController';

const KYCRequests: React.FC = () => {
  const [requests, setRequests] = useState([
    { id: 'u101', name: 'Zaid Ali', email: 'zaid@node.com', image: 'https://i.pravatar.cc/300?u=zaid', time: '2h ago' },
    { id: 'u102', name: 'Sara Malik', email: 'sara@cloud.com', image: 'https://i.pravatar.cc/300?u=sara', time: '4h ago' },
    { id: 'u103', name: 'Hamza Khan', email: 'hamza@pkr.com', image: 'https://i.pravatar.cc/300?u=hamza', time: 'Yesterday' },
    { id: 'u104', name: 'Bilal Ahmed', email: 'bilal@ops.com', image: 'https://i.pravatar.cc/300?u=bilal', time: 'Now' },
  ]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rejectionModal, setRejectionModal] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleAction = async (userId: string, status: 'approved' | 'rejected') => {
    if (status === 'rejected' && !rejectionModal) {
      setRejectionModal(userId);
      return;
    }
    await updateKYCStatus('admin_root', userId, status, rejectionReason);
    setRequests(requests.filter(r => r.id !== userId));
    setRejectionModal(null);
    setRejectionReason('');
  };

  return (
    <div className="max-w-5xl mx-auto pb-20 space-y-4 px-1">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 px-1">
        <div>
          <h1 className="text-xl font-black text-gray-900 leading-none uppercase tracking-tight">Identity Node</h1>
          <p className="text-[7px] text-gray-400 font-bold uppercase tracking-widest mt-1">Liveness Queue: {requests.length} Captures</p>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input className="bg-white border border-gray-100 rounded-lg py-1.5 pl-8 pr-3 text-[10px] font-black uppercase outline-none focus:border-rose-400 w-40 shadow-sm" placeholder="Find Node..." />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <AnimatePresence mode="popLayout">
          {requests.map((req) => (
            <motion.div 
              key={req.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-900">
                <img src={req.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Selfie" />
                <button 
                  onClick={() => setSelectedImage(req.image)}
                  className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                >
                  <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl text-white"><Maximize2 className="w-4 h-4" /></div>
                </button>
                <div className="absolute top-2 left-2">
                   <div className="bg-emerald-500 text-white text-[5px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-[0.2em] flex items-center">
                     <Camera className="w-2 h-2 mr-1" /> Live
                   </div>
                </div>
              </div>

              <div className="p-3 space-y-2.5">
                <div className="min-w-0">
                  <h3 className="text-[10px] font-black text-gray-900 leading-none truncate uppercase">{req.name}</h3>
                  <p className="text-[7px] font-bold text-gray-400 uppercase tracking-tighter mt-1 truncate">{req.email}</p>
                </div>

                <div className="flex gap-1.5">
                  <button 
                    onClick={() => handleAction(req.id, 'rejected')}
                    className="p-1.5 bg-gray-50 text-gray-400 hover:text-rose-600 rounded-lg transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => handleAction(req.id, 'approved')}
                    className="flex-1 py-1.5 bg-slate-900 text-white hover:bg-emerald-600 rounded-lg font-black text-[8px] uppercase shadow-md transition-all flex items-center justify-center"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {requests.length === 0 && (
        <div className="p-16 text-center bg-gray-50/50 border border-dashed border-gray-200 rounded-2xl">
          <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Database Synchronized</p>
        </div>
      )}

      {/* Rejection Modal Standardized */}
      <AnimatePresence>
        {rejectionModal && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setRejectionModal(null)} />
            <motion.div 
              initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl overflow-hidden"
            >
              <div className="mb-4">
                <h2 className="text-sm font-black text-gray-900 uppercase">State Denial Logic</h2>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Personnel Rejection Node</p>
              </div>
              <div className="space-y-3">
                <textarea 
                  value={rejectionReason}
                  onChange={e => setRejectionReason(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 text-[10px] font-bold outline-none h-24 resize-none"
                  placeholder="Reason for biometric denial..."
                />
                <button 
                  onClick={() => handleAction(rejectionModal, 'rejected')}
                  disabled={!rejectionReason}
                  className="w-full py-2.5 bg-rose-600 text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl disabled:opacity-50"
                >
                  Commit Rejection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KYCRequests;
