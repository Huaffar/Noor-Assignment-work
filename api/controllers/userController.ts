
// Backend logic for user dashboard and referrals
export const getDashboardStats = async (userId: string) => {
  // Mock data representing a database query result
  return {
    balance: 4500,
    currency: 'PKR',
    activePlan: 'Gold Member',
    todayEarnings: 680.50,
    notice_text: "Assalam-o-Alaikum! New assignments are live. Referral bonus has been increased to 15% for Gold Members. 🚀"
  };
};

export const getReferralData = async (userId: string) => {
  // Logic to fetch team members and earnings
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
