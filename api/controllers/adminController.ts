import { ITransaction } from '../models/Transaction';
import { sendNotification } from '../utils/sendNotification';

// Local Mock Storage with rich initial data
export let users = [
  { id: 'u1', name: 'Zaid K.', role: 'user', balance: 5400, referrals: 3, status: 'active', tier: 'Gold Package', joined: '2 days ago' },
  { id: 'u2', name: 'Fatima A.', role: 'user', balance: 1200, referrals: 1, status: 'active', tier: 'Standard', joined: '5 days ago' },
  { id: 'u3', name: 'Umar J.', role: 'user', balance: 450, referrals: 0, status: 'active', tier: 'None', joined: '1 day ago' },
  { id: 'u4', name: 'Sara Q.', role: 'user', balance: 8900, referrals: 8, status: 'active', tier: 'Diamond Pro', joined: '1 week ago' },
  { id: 'u5', name: 'Ahmed R.', role: 'user', balance: 0, referrals: 0, status: 'active', tier: 'None', joined: 'Just now' },
  { id: 'u6', name: 'Zainab B.', role: 'user', balance: 3200, referrals: 2, status: 'active', tier: 'Gold Package', joined: '3 days ago' },
  { id: 'u7', name: 'Bilal M.', role: 'user', balance: 150, referrals: 0, status: 'active', tier: 'Basic', joined: '4 days ago' },
];

export let planRequests = [
  { id: 'req_101', userId: 'u1', user: 'Zaid K.', plan: 'Gold', price: 3500, trxId: 'TXN882911', date: '2m ago', status: 'Pending', proof: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg' },
  { id: 'req_102', userId: 'u2', user: 'Fatima A.', plan: 'Std.', price: 2000, trxId: 'JZC772100', date: '15m ago', status: 'Pending', proof: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg' },
  { id: 'req_103', userId: 'u6', user: 'Zainab B.', plan: 'Gold', price: 3500, trxId: 'EP992288', date: '1h ago', status: 'Pending', proof: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg' },
];

export let taskSubmissions = [
  { id: 'sub_1', userId: 'u1', user: 'Zaid K.', plan: 'Gold', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800', time: '2h ago', status: 'Pending', rate: 240, taskType: 'Writing' },
  { id: 'sub_2', userId: 'u2', user: 'Fatima A.', plan: 'Basic', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800', time: '4h ago', status: 'Pending', rate: 100, taskType: 'Typing' },
  { id: 'sub_3', userId: 'u4', user: 'Sara Q.', plan: 'Diamond', image: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?q=80&w=800', time: '5h ago', status: 'Pending', rate: 450, taskType: 'Writing' },
  { id: 'sub_4', userId: 'u6', user: 'Zainab B.', plan: 'Gold', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800', time: '6h ago', status: 'Pending', rate: 240, taskType: 'Writing' },
];

export const getAdminDashboardStats = async () => {
  // Real-time calculation from local arrays
  return {
    totalUsers: users.length,
    pendingReviews: taskSubmissions.filter(t => t.status === 'Pending').length + planRequests.filter(r => r.status === 'Pending').length,
    totalEarning: 842000,
    todayPayouts: 14500,
    activeNodes: users.filter(u => u.tier !== 'None').length,
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
  const pending = taskSubmissions.filter(t => t.status === 'Pending').length;
  return {
    totalSubmissions: 4250,
    totalRewarded: 184500,
    approvalRate: 94.2,
    rejectedTotal: 156,
    todayStats: {
      pending: pending,
      approved: 312,
      rejected: 12,
      yield: 74880
    }
  };
};

export const getPlanRequests = async () => [...planRequests];

export const approvePlanRequest = async (userId: string, requestId: string, planName: string, amount: number) => {
  planRequests = planRequests.map(r => r.id === requestId ? { ...r, status: 'Approved' } : r);
  return { success: true };
};

export const rejectPlanRequest = async (requestId: string, reason: string) => {
  planRequests = planRequests.map(r => r.id === requestId ? { ...r, status: 'Rejected', rejectionReason: reason } : r);
  return { success: true };
};

export const approveTask = async (userId: string, taskId: string, rate: number) => {
  taskSubmissions = taskSubmissions.map(t => t.id === taskId ? { ...t, status: 'Approved' } : t);
  return { success: true };
};

export const rejectTask = async (userId: string, taskId: string, reason: string) => {
  taskSubmissions = taskSubmissions.map(t => t.id === taskId ? { ...t, status: 'Rejected', rejectionReason: reason } : t);
  return { success: true };
};

export const approveWithdrawal = async (userId: string, requestId: string, amount: number) => ({ success: true });
export const rejectWithdrawal = async (userId: string, requestId: string, amount: number, reason: string) => ({ success: true });
export const restoreEntity = async (type: string, id: string, admin: any) => ({ success: true });
export const permanentDeleteEntity = async (type: string, id: string, admin: any) => ({ success: true });
