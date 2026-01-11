
import { ITransaction } from '../models/Transaction';
import { sendNotification } from '../utils/sendNotification';

// Local Mock Storage logic
const getGlobalUsers = () => {
  const stored = localStorage.getItem('noor_global_users');
  if (stored) return JSON.parse(stored);
  
  // Default Seed Data
  const seed = [
    { id: 'u1', name: 'Zaid K.', role: 'user', balance: 5400, referrals: 3, status: 'active', tier: 'Gold Package', joined: '2 days ago' },
    { id: 'u2', name: 'Fatima A.', role: 'user', balance: 1200, referrals: 1, status: 'active', tier: 'Standard', joined: '5 days ago' },
    { id: 'u3', name: 'Umar J.', role: 'user', balance: 450, referrals: 0, status: 'active', tier: 'None', joined: '1 day ago' },
    { id: 'u4', name: 'Sara Q.', role: 'user', balance: 8900, referrals: 8, status: 'active', tier: 'Diamond Pro', joined: '1 week ago' },
  ];
  localStorage.setItem('noor_global_users', JSON.stringify(seed));
  return seed;
};

export const getAdminDashboardStats = async () => {
  const users = getGlobalUsers();
  const planRequests = JSON.parse(localStorage.getItem('noor_plan_requests') || '[]');
  
  return {
    totalUsers: users.length,
    pendingReviews: planRequests.filter((r: any) => r.status === 'Pending').length + 4,
    totalEarning: 842000,
    todayPayouts: 14500,
    activeNodes: users.filter((u: any) => u.tier !== 'None').length,
    uptime: '99.99%',
    growthData: [
      { date: 'Mon', users: users.length - 5, revenue: 12000 },
      { date: 'Tue', users: users.length - 3, revenue: 15000 },
      { date: 'Wed', users: users.length - 2, revenue: 18000 },
      { date: 'Today', users: users.length, revenue: 22000 },
    ]
  };
};

export const getAuditAnalytics = async () => {
  return {
    totalSubmissions: 4250,
    totalRewarded: 184500,
    approvalRate: 94.2,
    rejectedTotal: 156,
    todayStats: {
      pending: 12,
      approved: 312,
      rejected: 12,
      yield: 74880
    }
  };
};

export const getPlanRequests = async () => {
  return JSON.parse(localStorage.getItem('noor_plan_requests') || '[]');
};

export const approvePlanRequest = async (userId: string, requestId: string, planName: string, amount: number) => {
  const requests = JSON.parse(localStorage.getItem('noor_plan_requests') || '[]');
  const updated = requests.map((r: any) => r.id === requestId ? { ...r, status: 'Approved' } : r);
  localStorage.setItem('noor_plan_requests', JSON.stringify(updated));
  return { success: true };
};

export const rejectPlanRequest = async (requestId: string, reason: string) => {
  const requests = JSON.parse(localStorage.getItem('noor_plan_requests') || '[]');
  const updated = requests.map((r: any) => r.id === requestId ? { ...r, status: 'Rejected', rejectionReason: reason } : r);
  localStorage.setItem('noor_plan_requests', JSON.stringify(updated));
  return { success: true };
};

export const approveTask = async (userId: string, taskId: string, rate: number) => ({ success: true });
export const rejectTask = async (userId: string, taskId: string, reason: string) => ({ success: true });
export const approveWithdrawal = async (userId: string, requestId: string, amount: number) => ({ success: true });
export const rejectWithdrawal = async (userId: string, requestId: string, amount: number, reason: string) => ({ success: true });
export const restoreEntity = async (type: string, id: string, admin: any) => ({ success: true });
export const permanentDeleteEntity = async (type: string, id: string, admin: any) => ({ success: true });
