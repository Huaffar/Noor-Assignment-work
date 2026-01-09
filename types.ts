
export interface User {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  balance: number;
  currency: string;
  completedTasks: number;
  referralCount: number;
  role: 'user' | 'admin';
  avatar?: string;
  status: 'active' | 'banned';
  isDeleted?: boolean;
  deletedAt?: string;
  kycStatus: 'pending' | 'submitted' | 'approved' | 'rejected';
  // Plan Interlinking
  currentPlan?: string | null;
  planStatus: 'active' | 'expired' | 'none' | 'pending';
  planStartDate?: string;
  planExpiryDate?: string;
  dailyLimit: number;
  // Loyalty Fields
  checkInStreak: number;
  lastCheckInDate?: string;
  wantsReminder?: boolean;
  rewardHistory?: {
    id: string;
    amount: number;
    date: string;
    dayNum: number;
  }[];
  // Extended Stats for Admin Audit
  totalEarned: number;
  totalWithdrawn: number;
  teamStats?: {
    l1: number;
    l2: number;
    l3: number;
  };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  type: string;
  status: 'available' | 'completed' | 'pending';
  icon: string;
  isDeleted?: boolean;
  deletedAt?: string;
}

export type PlanValidity = 'lifetime' | 'monthly' | 'yearly' | 'daily';

export interface Plan {
  id: string;
  name: string;
  price: number;
  dailyLimit: number;
  validityType: PlanValidity;
  validityValue: number; // e.g., 30 for monthly, 1 for daily, 0 for lifetime
  badgeColor: string;
  isRecommended?: boolean;
  isDeleted?: boolean;
  deletedAt?: string;
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  targetId: string;
  details: string;
  timestamp: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  token: string | null;
}
