
import { uploadFile } from '../config/cloudinary';

export const buyPlan = async (userId: string, planData: any, systemSettings: any) => {
  const { planId, trxId, proofImage, planPrice, referredBy } = planData;
  const proofUrl = await uploadFile(proofImage);

  // 1. Log the Plan Purchase Request
  const planRequest = {
    id: 'PLR_' + Math.random().toString(36).substr(2, 9),
    userId,
    planId,
    trxId,
    proofUrl,
    status: 'Pending',
    requestedAt: new Date()
  };

  // 2. AUTOMATED COMMISSION LOGIC (Simulated for when Admin Approves)
  // In production, this runs after Admin marks the request as 'Approved'
  if (referredBy) {
    const bonusPercentage = systemSettings.finance?.referralBonusPercentage || 10;
    const commission = (planPrice * bonusPercentage) / 100;

    console.log(`[AFFILIATE] User ${userId} purchased plan. Crediting ${referredBy} with Rs. ${commission} (${bonusPercentage}%)`);
    
    // Logic: Update Parent User Balance
    // await User.findByIdAndUpdate(referredBy, { $inc: { balance: commission } });
    
    // Logic: Create Transaction Record
    const commissionTx = {
      id: 'TX_' + Math.random().toString(36).substr(2, 9),
      userId: referredBy,
      fromUserId: userId,
      type: 'referral_bonus',
      amount: commission,
      details: `Commission from ${planId} purchase`,
      timestamp: new Date()
    };
    console.log(`[TRANSACTION] Created referral bonus record:`, commissionTx.id);
  }

  return {
    success: true,
    message: "Payment submitted. Admin will verify your Transaction ID and distribute commissions shortly.",
    request: planRequest
  };
};

export const withdrawMoney = async (user: any, withdrawalData: any) => {
  const { amount, method, account } = withdrawalData;

  // 1. IDENTITY GATE (KYC CHECK)
  if (user.kycStatus !== 'approved') {
    throw new Error("Identity Check Required: Please complete your Liveness Verification (KYC) to unlock withdrawals.");
  }

  // 2. Referral Lock Check
  if (user.referralCount < 1) {
    throw new Error("Withdrawal Locked: You must invite at least 1 active friend to unlock payouts.");
  }

  // 3. Balance Check
  if (user.balance < amount) {
    throw new Error("Insufficient funds in your Noor Official wallet.");
  }

  const withdrawalRequest = {
    id: 'WDR_' + Math.random().toString(36).substr(2, 9),
    userId: user.id,
    amount,
    method,
    account,
    status: 'Pending',
    requestedAt: new Date()
  };

  return {
    success: true,
    message: "Withdrawal request sent. Funds will be transferred within 24 hours.",
    request: withdrawalRequest
  };
};
