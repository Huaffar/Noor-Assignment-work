
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Wallet, 
  LogOut, 
  Menu, 
  ChevronRight,
  ShieldCheck,
  ClipboardCheck,
  Settings as SettingsIcon,
  Layers,
  FilePlus,
  Banknote,
  Users,
  Briefcase,
  TrendingUp,
  Share2,
  History,
  LifeBuoy,
  User as UserIcon,
  Activity,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = user?.role === 'admin';

  const userMenuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Work Center', path: '/tasks', icon: Briefcase },
    { name: 'My Wallet', path: '/wallet', icon: Wallet },
    { name: 'Request Hub', path: '/requests', icon: History },
    { name: 'Upgrade Plan', path: '/upgrade', icon: TrendingUp },
    { name: 'My Referrals', path: '/referrals', icon: Share2 },
    { name: 'Support', path: '/support', icon: LifeBuoy },
    { name: 'Settings', path: '/profile', icon: SettingsIcon },
  ];

  const adminMenuItems = [
    { name: 'Command Center', path: '/admin', icon: LayoutDashboard },
    { name: 'Users Control', path: '/admin/users', icon: Users },
    { name: 'Audit History', path: '/admin/history', icon: Activity },
    { name: 'Verify Work', path: '/admin/reviews', icon: ClipboardCheck },
    { name: 'Plan Requests', path: '/admin/plan-requests', icon: ShieldCheck },
    { name: 'Payout Hub', path: '/admin/withdrawals', icon: Banknote },
    { name: 'Assignments', path: '/admin/work', icon: FilePlus },
    { name: 'Membership Tiers', path: '/admin/plans', icon: Layers },
    { name: 'Recycle Bin', path: '/admin/trash', icon: Trash2 },
    { name: 'System Core', path: '/admin/settings', icon: SettingsIcon },
  ];

  const currentMenuItems = isAdmin ? adminMenuItems : userMenuItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className={`flex flex-col h-full border-r border-gray-100 ${isAdmin ? 'bg-slate-950 text-white border-slate-900' : 'bg-white'}`}>
      <div className="p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-7 h-7 bg-rose-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-base">N</span>
          </div>
          <span className={`text-lg font-black tracking-tighter ${isAdmin ? 'text-white' : 'text-gray-900'}`}>
            Noor<span className="text-rose-600">Official</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-0.5 mt-2 no-scrollbar overflow-y-auto">
        {currentMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/10' 
                  : isAdmin 
                    ? 'text-slate-500 hover:bg-white/5 hover:text-rose-400'
                    : 'text-gray-400 hover:bg-rose-50 hover:text-rose-600'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : isAdmin ? 'text-slate-600 group-hover:text-rose-400' : 'text-gray-400 group-hover:text-rose-600'}`} />
                <span className="font-bold text-[13px]">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-gray-100/10">
        <div className={`${isAdmin ? 'bg-white/5' : 'bg-gray-50'} p-3 rounded-2xl`}>
          <div className="flex items-center space-x-2.5 mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${isAdmin ? 'bg-rose-600 text-white' : 'bg-white text-rose-600 border border-gray-200'}`}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className={`text-xs font-black truncate ${isAdmin ? 'text-white' : 'text-gray-900'}`}>{user?.name}</p>
              <p className={`text-[8px] font-black uppercase tracking-widest ${isAdmin ? 'text-rose-400' : 'text-gray-400'}`}>
                {isAdmin ? 'Administrator' : 'Verified User'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center justify-center space-x-1.5 py-1.5 font-black text-[10px] uppercase tracking-widest rounded-lg transition-all ${isAdmin ? 'bg-white/5 text-slate-500 hover:text-red-400' : 'text-gray-400 hover:bg-rose-50 hover:text-rose-600'}`}
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden lg:block w-64 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-72 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className={`lg:hidden h-14 border-b px-4 flex items-center justify-between sticky top-0 z-30 ${isAdmin ? 'bg-slate-950 border-slate-900 text-white' : 'bg-white border-gray-100'}`}>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-black text-rose-600 tracking-tighter text-lg">Noor Official</span>
          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100">
             <UserIcon className="w-4 h-4 text-rose-600" />
          </div>
        </header>

        <main className="flex-1 p-3 md:p-6 overflow-x-hidden no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
