
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

export interface Plan {
  id: string;
  name: string;
  investment: number;
  dailyWork: number;
  weeklySalary: number;
  monthlySalary: number;
  color: string;
  isPopular?: boolean;
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
