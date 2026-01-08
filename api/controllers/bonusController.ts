
export const claimDailyBonus = async (user: any, streakConfig: any) => {
  const now = new Date();
  const lastDate = user.lastCheckInDate ? new Date(user.lastCheckInDate) : null;
  
  // 1. Check if claimed today
  if (lastDate && lastDate.toDateString() === now.toDateString()) {
    throw new Error("Already claimed today. Come back tomorrow! 🌙");
  }

  let newStreak = 1;
  if (lastDate) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastDate.toDateString() === yesterday.toDateString()) {
      // 2. Continuous streak
      newStreak = (user.checkInStreak % 7) + 1;
    } else {
      // 3. Missed day - reset
      newStreak = 1;
    }
  }

  // 4. Calculate Reward
  const reward = (newStreak === 7) ? streakConfig.milestoneReward : streakConfig.dailyReward;

  // Simulate user update
  const updatedUser = {
    ...user,
    balance: user.balance + reward,
    lastCheckInDate: now.toISOString(),
    checkInStreak: newStreak
  };

  console.log(`[BONUS] User ${user.id} claimed Rs. ${reward}. New Streak: ${newStreak}`);

  return {
    success: true,
    reward,
    newStreak,
    user: updatedUser,
    message: `Assalam-o-Alaikum! Rs. ${reward} added to your wallet.`
  };
};
