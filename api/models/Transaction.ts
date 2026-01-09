
export interface ITransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'plan_purchase' | 'task_earning' | 'admin_adjustment';
  status: 'pending' | 'approved' | 'rejected' | 'success';
  description: string;
  isCredit: boolean; // true for money in, false for money out
  createdAt: string;
}

export const TransactionSchema = {
  userId: { type: 'ObjectId', ref: 'User', required: true },
  amount: { type: 'Number', required: true },
  type: { 
    type: 'String', 
    enum: ['deposit', 'withdrawal', 'plan_purchase', 'task_earning', 'admin_adjustment'],
    required: true 
  },
  status: { 
    type: 'String', 
    enum: ['pending', 'approved', 'rejected', 'success'], 
    default: 'pending' 
  },
  description: { type: 'String' },
  isCredit: { type: 'Boolean', required: true },
  createdAt: { type: 'Date', default: 'Date.now' }
};
