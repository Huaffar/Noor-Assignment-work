
import { uploadFile } from '../config/cloudinary';

export const buyPlan = async (userId: string, planData: any) => {
  const { planId, trxId, proofImage } = planData;

  // Simulate Cloudinary upload for screenshot
  const proofUrl = await uploadFile(proofImage);

  const planRequest = {
    id: 'PLR_' + Math.random().toString(36).substr(2, 9),
    userId,
    planId,
    trxId,
    proofUrl,
    status: 'Pending',
    requestedAt: new Date()
  };

  console.log("Plan Purchase Request Created:", planRequest);

  return {
    success: true,
    message: "Payment submitted. Admin will verify your Transaction ID shortly.",
    request: planRequest
  };
};

export const withdrawMoney = async (user: any, withdrawalData: any) => {
  const { amount, method, account } = withdrawalData;

  // 1. Check Referral Lock (FINTECH SECURITY)
  if (user.referralCount < 1) {
    throw new Error("Withdrawal Locked: You must invite at least 1 active friend to unlock payouts.");
  }

  // 2. Balance Check
  if (user.balance < amount) {
    throw new Error("Insufficient funds in your Noor Official wallet.");
  }

  // 3. Process Logic
  const withdrawalRequest = {
    id: 'WDR_' + Math.random().toString(36).substr(2, 9),
    userId: user.id,
    amount,
    method,
    account,
    status: 'Pending',
    requestedAt: new Date()
  };

  // Note: In real app, deduct user.balance here and save to DB
  console.log("Withdrawal Request Created:", withdrawalRequest);

  return {
    success: true,
    message: "Withdrawal request sent. Funds will be transferred within 24 hours.",
    request: withdrawalRequest
  };
};
