
import { uploadFile } from '../config/cloudinary';

export const getDashboardStats = async (userId: string) => {
  return {
    balance: 4500,
    currency: 'PKR',
    activePlan: 'Gold Member',
    todayEarnings: 680.50,
    notice_text: "Assalam-o-Alaikum! New assignments are live. Referral bonus has been increased to 15% for Gold Members. 🚀"
  };
};

export const submitKYC = async (userId: string, base64Image: string) => {
  console.log(`[KYC] Processing verification for user: ${userId}`);
  const kycUrl = await uploadFile(base64Image);
  return {
    success: true,
    message: "Identity data transmitted. Review cycle: 12-24 hours.",
    kycUrl
  };
};

export const updateKYCStatus = async (adminId: string, targetUserId: string, status: 'approved' | 'rejected', reason?: string) => {
  console.log(`[ADMIN] ${adminId} marked KYC of ${targetUserId} as ${status.toUpperCase()}`);
  return { success: true };
};

export const getTeamStats = async (userId: string) => {
  // Mocking database aggregation for referrals and transactions
  const teamList = [
    { id: 'u1', name: 'Ahmed Raza', email: 'ahmed@node.com', joinedAt: '2023-10-15', status: 'Active', plan: 'Gold', earnings: 450 },
    { id: 'u2', name: 'Sara Khan', email: 'sara@web.com', joinedAt: '2023-10-18', status: 'Active', plan: 'Basic', earnings: 150 },
    { id: 'u3', name: 'Zohaib Ali', email: 'zohaib@cloud.com', joinedAt: '2023-10-20', status: 'Inactive', plan: 'None', earnings: 0 },
    { id: 'u4', name: 'Bilal Malik', email: 'bilal@pkr.com', joinedAt: '2023-10-22', status: 'Active', plan: 'Diamond', earnings: 1200 },
  ];

  const totalDirects = teamList.length;
  const totalCommission = teamList.reduce((acc, curr) => acc + curr.earnings, 0);

  return {
    success: true,
    totalDirects,
    totalCommission,
    teamList
  };
};

export const getReferralData = async (userId: string) => {
  const referrals = [
    { id: 'r1', name: 'Ahmed Raza', date: '2023-10-15', earnings: 150, status: 'Active' },
    { id: 'r2', name: 'Sara Khan', date: '2023-10-18', earnings: 45, status: 'Active' },
    { id: 'r3', name: 'Zohaib Ali', date: '2023-10-20', earnings: 0, status: 'Pending' }
  ];

  const totalEarnings = referrals.reduce((acc, curr) => acc + curr.earnings, 0);

  return {
    referralCode: `NOOR-${userId.substring(0, 5).toUpperCase()}`,
    referralLink: `https://noorofficial.com/register?ref=${userId}`,
    totalReferrals: referrals.length,
    activeReferrals: referrals.filter(r => r.status === 'Active').length,
    referralEarnings: totalEarnings,
    referralList: referrals
  };
};
