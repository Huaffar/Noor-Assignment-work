
export const claimDailyBonus = async (user: any, streakConfig: any) => {
  const now = new Date();
  const lastDate = user.lastCheckInDate ? new Date(user.lastCheckInDate) : null;
  
  // 1. Time Gate Verification
  if (lastDate && lastDate.toDateString() === now.toDateString()) {
    throw new Error("Node sync failed: Already claimed today. 🌙");
  }

  let newStreak = 1;
  let resetTriggered = false;

  if (lastDate) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastDate.toDateString() === yesterday.toDateString()) {
      // Continuous streak logic
      newStreak = (user.checkInStreak >= 7) ? 1 : user.checkInStreak + 1;
    } else {
      // Missed day - Protocol Reset
      newStreak = 1;
      resetTriggered = true;
    }
  }

  // 2. Yield Calculation
  const reward = (newStreak === 7) ? streakConfig.milestoneReward : streakConfig.dailyReward;

  // 3. Ledger Entry
  const historyEntry = {
    id: 'rew_' + Math.random().toString(36).substr(2, 9),
    amount: reward,
    date: now.toISOString(),
    dayNum: newStreak
  };

  // 4. Update Atomic State
  const updatedUser = {
    ...user,
    balance: user.balance + reward,
    lastCheckInDate: now.toISOString(),
    checkInStreak: newStreak,
    rewardHistory: [historyEntry, ...(user.rewardHistory || [])].slice(0, 10)
  };

  return {
    success: true,
    reward,
    newStreak,
    user: updatedUser,
    message: resetTriggered 
      ? `Protocol Reset: Streak started fresh with Rs. ${reward}.`
      : `Sync Success: Rs. ${reward} credited to your node.`
  };
};

/**
 * UTILITY: Get Global Earning Stats
 * Includes history of all plan node activations
 */
export const getGlobalDailyStats = async () => {
  return {
    totalRevenue: 52000,
    activePlans: [
      { id: 'h1', user: 'Zaid K.', plan: 'Gold', amount: 3500, date: '2023-10-25' },
      { id: 'h2', user: 'Fatima A.', plan: 'Standard', amount: 2000, date: '2023-10-25' },
      { id: 'h3', user: 'Umar J.', plan: 'Diamond', amount: 6000, date: '2023-10-24' }
    ],
    taskYield: 14200,
    newRegistrations: 12
  };
};
