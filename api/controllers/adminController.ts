import { ITransaction } from '../models/Transaction';
import { sendNotification } from '../utils/sendNotification';

// Global mock ledger store
let globalLedger: ITransaction[] = [];

// Local User Registry (Mock)
let users = [
  { id: 'u1', name: 'Zaid K.', role: 'user', balance: 5000 },
  { id: 'u2', name: 'Fatima A.', role: 'user', balance: 1200 },
  { id: 'u3', name: 'Umar J.', role: 'user', balance: 450 }
];

// Mock Plan Requests Database
let planRequests = [
  { id: 'req_101', userId: 'u1', user: 'Zaid K.', plan: 'Gold', price: 3500, trxId: 'TXN8829', date: '2m ago', status: 'Pending', proof: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg' },
  { id: 'req_102', userId: 'u2', user: 'Fatima A.', plan: 'Std.', price: 2000, trxId: 'JZC7721', date: '15m ago', status: 'Pending', proof: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg' },
];

export const getAdminDashboardStats = async () => {
  const pendingRequests = planRequests.filter(r => r.status === 'Pending').length;
  return {
    totalUsers: users.length,
    pendingReviews: pendingRequests,
    totalEarning: 245000,
    todayPayouts: 1850,
    activeNodes: users.length,
    uptime: '99.99%',
    growthData: [
      { date: 'Mon', users: 1, revenue: 1000 },
      { date: 'Tue', users: 2, revenue: 3000 },
      { date: 'Today', users: users.length, revenue: 245000 },
    ]
  };
};

export const getAuditAnalytics = async () => {
  const pending = planRequests.filter(r => r.status === 'Pending').length;
  return {
    totalSubmissions: 1254,
    totalRewarded: 18450,
    approvalRate: 94.2,
    rejectedTotal: 72,
    todayStats: {
      pending: pending,
      approved: 312,
      rejected: 12,
      yield: 74880
    },
    weeklyYieldHistory: [4200, 3800, 4500, 4100, 4900, 5200, 4800]
  };
};

export const getPlanRequests = async () => {
  return [...planRequests];
};

export const approvePlanRequest = async (userId: string, requestId: string, planName: string, amount: number) => {
  planRequests = planRequests.map(r => r.id === requestId ? { ...r, status: 'Approved' } : r);
  return { success: true };
};

export const rejectPlanRequest = async (requestId: string, reason: string) => {
  planRequests = planRequests.map(r => r.id === requestId ? { ...r, status: 'Rejected', rejectionReason: reason } : r);
  return { success: true };
};

export const restoreEntity = async (type: string, id: string, admin: any) => {
  return { success: true, message: "Node state restored" };
};

export const permanentDeleteEntity = async (type: string, id: string, admin: any) => {
  return { success: true, message: "Node permanently purged" };
};

// Added missing audit task functions for ManageTasks.tsx
export const approveTask = async (userId: string, taskId: string, rate: number) => {
  console.log(`[ADMIN] Approving task submission ${taskId} for user ${userId} with yield Rs. ${rate}`);
  return { success: true };
};

export const rejectTask = async (userId: string, taskId: string, reason: string) => {
  console.log(`[ADMIN] Rejecting task submission ${taskId} for user ${userId}. Reason: ${reason}`);
  return { success: true };
};

// Added missing withdrawal functions for ManageWithdrawals.tsx
export const approveWithdrawal = async (userId: string, requestId: string, amount: number) => {
  console.log(`[ADMIN] Payout approved for user ${userId}, Request: ${requestId}, Amount: Rs. ${amount}`);
  return { success: true };
};

export const rejectWithdrawal = async (userId: string, requestId: string, amount: number, reason: string) => {
  console.log(`[ADMIN] Payout rejected for user ${userId}, Request: ${requestId}. Reason: ${reason}`);
  return { success: true };
};