import { uploadFile } from '../config/cloudinary';
import { ITransaction } from '../models/Transaction';

// Mock Transaction Store
let transactions: ITransaction[] = [];

export const requestWithdrawal = async (user: any, data: any, settings: any) => {
  const { amount, method, account } = data;

  // Real data check for withdrawal unlock
  if (settings.modules.requireReferralForWithdraw) {
    const required = settings.referralStrategy.withdrawalUnlockReferrals || 1;
    // user.referralCount is the source of truth
    if ((user.referralCount || 0) < required) {
      throw new Error(`Access Blocked: Withdrawal requires at least ${required} active referral(s). Current: ${user.referralCount || 0}`);
    }
  }

  if (settings.modules.kycRequired && user.kycStatus !== 'approved') {
    throw new Error("Identity verification required.");
  }
  
  if (amount < settings.minWithdrawal) {
    throw new Error(`Minimum withdrawal is Rs. ${settings.minWithdrawal}`);
  }
  
  if (amount > user.balance) {
    throw new Error("Insufficient balance.");
  }

  const requestId = 'WDR_' + Math.random().toString(36).substr(2, 9);
  
  const tx: ITransaction = {
    id: requestId,
    userId: user.id,
    amount: Number(amount),
    type: 'withdrawal',
    status: 'pending',
    description: `Withdrawal to ${method} (${account})`,
    isCredit: false,
    createdAt: new Date().toISOString()
  };
  transactions.push(tx);

  return {
    success: true,
    requestId,
    message: "Withdrawal request logged in audit ledger."
  };
};

export const buyPlan = async (userId: string, planData: any, systemSettings: any, user: any) => {
  const { planPrice, planName } = planData;
  const requestId = 'PLR_' + Math.random().toString(36).substr(2, 9);
  
  const tx: ITransaction = {
    id: requestId,
    userId: userId,
    amount: planPrice,
    type: 'plan_purchase',
    status: 'pending',
    description: `Activation Node: ${planName}`,
    isCredit: false,
    createdAt: new Date().toISOString()
  };
  transactions.push(tx);

  return {
    success: true,
    message: "Activation pending audit review.",
    txId: requestId
  };
};