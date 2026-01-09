
import { uploadFile } from '../config/cloudinary';

export const getDashboardStats = async (userId: string) => {
  return {
    balance: 4500,
    currency: 'PKR',
    activePlan: 'Gold Member',
    todayEarnings: 680.50,
    referralCount: 12,
    notice_text: "Assalam-o-Alaikum! New assignments are live. Referral bonus has been increased to 15% for Gold Members. 🚀"
  };
};

export const updateProfile = async (userId: string, data: { name?: string; avatar?: string }) => {
  return {
    success: true,
    message: "Profile updated successfully.",
    user: { id: userId, name: data.name, avatar: data.avatar }
  };
};

export const changePassword = async (userId: string, payload: any) => {
  const { oldPassword, newPassword } = payload;
  const isMatch = oldPassword === "demo123"; 

  if (!isMatch) {
    throw new Error("Incorrect current password.");
  }

  return {
    success: true,
    message: "Password changed successfully."
  };
};

export const submitKYC = async (userId: string, base64Image: string) => {
  const kycUrl = await uploadFile(base64Image);
  return {
    success: true,
    message: "Identity submitted. Review will take 12-24 hours.",
    kycUrl
  };
};

export const updateKYCStatus = async (adminId: string, targetUserId: string, status: 'approved' | 'rejected', reason?: string) => {
  return { success: true };
};

export const getTeamStats = async (userId: string) => {
  const teamList = [
    { id: 'u1', name: 'Ahmed Raza', email: 'ahmed@node.com', joinedAt: 'Oct 15, 2023', status: 'Active', plan: 'Gold', earnings: 450 },
    { id: 'u2', name: 'Sara Khan', email: 'sara@web.com', joinedAt: 'Oct 18, 2023', status: 'Active', plan: 'Basic', earnings: 150 },
    { id: 'u3', name: 'Zohaib Ali', email: 'zohaib@cloud.com', joinedAt: 'Oct 20, 2023', status: 'Inactive', plan: 'None', earnings: 0 },
    { id: 'u4', name: 'Bilal Malik', email: 'bilal@pkr.com', joinedAt: 'Oct 22, 2023', status: 'Active', plan: 'Diamond', earnings: 1200 },
  ];

  const totalDirects = teamList.length;
  const totalCommission = teamList.reduce((acc, curr) => acc + curr.earnings, 0);

  return { success: true, totalDirects, totalCommission, teamList };
};

export const getReferralData = async (userId: string) => {
  // Richer Mock Data for the 3-Tier Tree
  const referrals = [
    { id: 'r1', name: 'Ahmed Raza', date: 'Oct 15', earnings: 450, status: 'Active', level: 1 },
    { id: 'r2', name: 'Sara Khan', date: 'Oct 18', earnings: 250, status: 'Active', level: 1 },
    { id: 'r3', name: 'Zohaib Ali', date: 'Oct 20', earnings: 0, status: 'Pending', level: 1 },
    { id: 'r4', name: 'Fatima Malik', date: 'Oct 21', earnings: 125, status: 'Active', level: 2 },
    { id: 'r5', name: 'Usman Jameel', date: 'Oct 22', earnings: 80, status: 'Active', level: 2 },
    { id: 'r6', name: 'Hina Siddiqui', date: 'Oct 23', earnings: 45, status: 'Active', level: 3 },
    { id: 'r7', name: 'Bilal Khan', date: 'Oct 24', earnings: 30, status: 'Active', level: 3 },
  ];

  const totalEarnings = referrals.reduce((acc, curr) => acc + curr.earnings, 0);

  return {
    referralCode: `NOOR-${userId.substring(0, 5).toUpperCase()}`,
    referralLink: `${window.location.origin}/#/register?ref=${userId}`,
    totalReferrals: referrals.length,
    activeReferrals: referrals.filter(r => r.status === 'Active').length,
    referralEarnings: totalEarnings,
    levels: {
      l1: referrals.filter(r => r.level === 1).length,
      l2: referrals.filter(r => r.level === 2).length,
      l3: referrals.filter(r => r.level === 3).length
    },
    referralList: referrals
  };
};
