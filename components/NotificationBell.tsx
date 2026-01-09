
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, X, Info, AlertTriangle, CheckCircle2, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserNotifications, markAsRead, markAllRead } from '../api/controllers/notificationController';

const NotificationBell: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifs, setNotifs] = useState<any[]>([]);
  const unreadCount = notifs.filter(n => !n.isRead).length;

  useEffect(() => {
    if (user?.id) {
      getUserNotifications(user.id).then(setNotifs);
    }
  }, [user]);

  const handleMarkRead = async (id: string) => {
    await markAsRead(id);
    setNotifs(notifs.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAll = async () => {
    if (!user?.id) return;
    await markAllRead(user.id);
    setNotifs(notifs.map(n => ({ ...n, isRead: true })));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
      case 'error': return <X className="w-3.5 h-3.5 text-rose-500" />;
      case 'warning': return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
      default: return <Info className="w-3.5 h-3.5 text-blue-500" />;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl border border-gray-100 bg-white shadow-sm hover:border-rose-200 transition-all active:scale-90"
      >
        <Bell className="w-4 h-4 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[160]"
            />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[170] overflow-hidden"
            >
              <div className="p-3.5 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Alert Node</h3>
                {unreadCount > 0 && (
                  <button onClick={handleMarkAll} className="text-[8px] font-black text-rose-600 uppercase hover:underline">Clear All</button>
                )}
              </div>

              <div className="max-h-[320px] overflow-y-auto no-scrollbar">
                {notifs.length > 0 ? (
                  notifs.map((n) => (
                    <div 
                      key={n.id} 
                      onClick={() => handleMarkRead(n.id)}
                      className={`p-3.5 border-b border-gray-50 flex items-start space-x-3 transition-colors cursor-pointer ${n.isRead ? 'opacity-50' : 'bg-rose-50/20'}`}
                    >
                      <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${
                        n.type === 'success' ? 'bg-emerald-50' : n.type === 'error' ? 'bg-rose-50' : 'bg-blue-50'
                      }`}>
                        {getTypeIcon(n.type)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[10px] font-black text-gray-900 leading-none mb-1 uppercase">{n.title}</h4>
                        <p className="text-[9px] font-medium text-gray-500 leading-tight">{n.message}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center">
                    <CheckCircle2 className="w-8 h-8 text-gray-100 mx-auto mb-2" />
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">System Silent</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
