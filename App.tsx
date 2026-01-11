import React, { useEffect, useState, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layout & Critical Components
import Header from './layout/Header';
import Footer from './layout/Footer';
import UserLayout from './layout/UserLayout';
import Preloader from './components/Preloader';
import Maintenance from './components/Maintenance';
import UserSurvey from './components/UserSurvey'; 
import ErrorBoundary from './components/ErrorBoundary';
import { useAuth } from './context/AuthContext';
import { useSystem } from './context/SystemContext';
import { useMobileBack } from './hooks/useMobileBack';
import { useNotifications } from './hooks/useNotifications';
import { AdminRoute, UserRoute } from './components/RouteGuards';

// Direct Imports for Auth Stability
import Login from './pages/Login';
import Register from './pages/Register';

// Lazy Loaded Pages
const Landing = lazy(() => import('./pages/Landing'));
const Dashboard = lazy(() => import('./pages/user/Dashboard'));
const DailyWork = lazy(() => import('./pages/user/DailyWork'));
const WalletHub = lazy(() => import('./pages/user/WalletHub'));
const Withdraw = lazy(() => import('./pages/user/Withdraw')); 
const Profile = lazy(() => import('./pages/user/Profile'));
const PlanMarket = lazy(() => import('./pages/user/PlanMarket'));
const Referrals = lazy(() => import('./pages/user/Referrals'));
const MyRequests = lazy(() => import('./pages/user/MyRequests'));
const Support = lazy(() => import('./pages/user/Support'));
const About = lazy(() => import('./pages/About'));
const Instructions = lazy(() => import('./pages/user/Instructions'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const UserManager = lazy(() => import('./pages/admin/UserManager'));
const ManagePlans = lazy(() => import('./pages/admin/ManagePlans'));
const ManageTasks = lazy(() => import('./pages/admin/ManageTasks')); 
const KYCRequests = lazy(() => import('./pages/admin/KYCRequests'));
const PaymentMethods = lazy(() => import('./pages/admin/PaymentMethods'));
const PlanRequests = lazy(() => import('./pages/admin/requests/PlanRequests'));
const Trash = lazy(() => import('./pages/admin/Trash'));
const AuditHistory = lazy(() => import('./pages/admin/AuditHistory'));
const WorkManager = lazy(() => import('./pages/admin/WorkManager'));
const AdminReports = lazy(() => import('./pages/admin/AdminReports'));
const ManageWithdrawals = lazy(() => import('./pages/admin/ManageWithdrawals'));

// New Settings Portals
const GeneralSettings = lazy(() => import('./pages/admin/settings/GeneralSettings'));
const SeoSettings = lazy(() => import('./pages/admin/settings/SeoSettings'));
const ConfigSettings = lazy(() => import('./pages/admin/settings/ConfigSettings'));
const AdvancedSettings = lazy(() => import('./pages/admin/settings/AdvancedSettings'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const SystemIntegrityWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useMobileBack();
  useNotifications(); 
  const { user, isAuthenticated } = useAuth();
  const [showSurvey, setShowSurvey] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user && user.role !== 'admin') {
      const surveyKey = `noor_survey_done_${user.id}`;
      if (!localStorage.getItem(surveyKey) && (!user.currentPlan || user.currentPlan === 'None')) {
        setShowSurvey(true);
      }
    }
  }, [user, isAuthenticated]);

  return (
    <>
      {showSurvey && <UserSurvey onComplete={() => { if(user) localStorage.setItem(`noor_survey_done_${user.id}`, 'true'); setShowSurvey(false); }} />}
      {children}
    </>
  );
};

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={isAuthenticated} user={user} onLogout={logout} />
      <main className="flex-grow pt-14 sm:pt-16">{children}</main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const { settings } = useSystem();
  if (settings.maintenanceMode) return <Maintenance />;

  return (
    <Router>
      <ScrollToTop />
      <ErrorBoundary>
        <SystemIntegrityWrapper>
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/instructions" element={<PublicLayout><Instructions /></PublicLayout>} />
              <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
              <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />

              <Route path="/dashboard" element={<UserRoute><UserLayout><Dashboard /></UserLayout></UserRoute>} />
              <Route path="/tasks" element={<UserRoute><UserLayout><DailyWork /></UserLayout></UserRoute>} />
              <Route path="/wallet" element={<UserRoute><UserLayout><WalletHub /></UserLayout></UserRoute>} />
              <Route path="/withdraw" element={<UserRoute><UserLayout><Withdraw /></UserLayout></UserRoute>} />
              <Route path="/profile" element={<UserRoute><UserLayout><Profile /></UserLayout></UserRoute>} />
              <Route path="/upgrade" element={<UserRoute><UserLayout><PlanMarket /></UserLayout></UserRoute>} />
              <Route path="/referrals" element={<UserRoute><UserLayout><Referrals /></UserLayout></UserRoute>} />
              <Route path="/requests" element={<UserRoute><UserLayout><MyRequests /></UserLayout></UserRoute>} />
              <Route path="/support" element={<UserRoute><UserLayout><Support /></UserLayout></UserRoute>} />

              {/* Admin Logic Gates */}
              <Route path="/admin" element={<AdminRoute><UserLayout><AdminDashboard /></UserLayout></AdminRoute>} />
              <Route path="/admin/users" element={<AdminRoute><UserLayout><UserManager /></UserLayout></AdminRoute>} />
              <Route path="/admin/plans" element={<AdminRoute><UserLayout><ManagePlans /></UserLayout></AdminRoute>} />
              <Route path="/admin/plan-requests" element={<AdminRoute><UserLayout><PlanRequests /></UserLayout></AdminRoute>} />
              <Route path="/admin/withdrawals" element={<AdminRoute><UserLayout><ManageWithdrawals /></UserLayout></AdminRoute>} />
              <Route path="/admin/reviews" element={<AdminRoute><UserLayout><ManageTasks /></UserLayout></AdminRoute>} />
              <Route path="/admin/kyc" element={<AdminRoute><UserLayout><KYCRequests /></UserLayout></AdminRoute>} />
              <Route path="/admin/finance" element={<AdminRoute><UserLayout><PaymentMethods /></UserLayout></AdminRoute>} />
              <Route path="/admin/settings/general" element={<AdminRoute><UserLayout><GeneralSettings /></UserLayout></AdminRoute>} />
              <Route path="/admin/settings/seo" element={<AdminRoute><UserLayout><SeoSettings /></UserLayout></AdminRoute>} />
              <Route path="/admin/settings/config" element={<AdminRoute><UserLayout><ConfigSettings /></UserLayout></AdminRoute>} />
              <Route path="/admin/settings/advanced" element={<AdminRoute><UserLayout><AdvancedSettings /></UserLayout></AdminRoute>} />
              <Route path="/admin/trash" element={<AdminRoute><UserLayout><Trash /></UserLayout></AdminRoute>} />
              <Route path="/admin/audit" element={<AdminRoute><UserLayout><AuditHistory /></UserLayout></AdminRoute>} />
              <Route path="/admin/work" element={<AdminRoute><UserLayout><WorkManager /></UserLayout></AdminRoute>} />
              <Route path="/admin/reports" element={<AdminRoute><UserLayout><AdminReports /></UserLayout></AdminRoute>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </SystemIntegrityWrapper>
      </ErrorBoundary>
    </Router>
  );
};

export default App;