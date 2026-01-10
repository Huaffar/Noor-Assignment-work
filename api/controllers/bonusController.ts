export const claimDailyBonus = async (user: any, streakConfig: any) => {
  const now = new Date();
  const lastDate = user.lastCheckInDate ? new Date(user.lastCheckInDate) : null;
  
  if (lastDate && lastDate.toDateString() === now.toDateString()) {
    throw new Error("Pehlay hi claim kar chukay hain. 🌙");
  }

  let newStreak = 1;
  let resetTriggered = false;

  if (lastDate) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastDate.toDateString() === yesterday.toDateString()) {
      newStreak = (user.checkInStreak >= 7) ? 1 : user.checkInStreak + 1;
    } else {
      newStreak = 1;
      resetTriggered = true;
    }
  }

  const reward = (newStreak === 7) ? streakConfig.milestoneReward : streakConfig.dailyReward;

  const historyEntry = {
    id: 'rew_' + Math.random().toString(36).substr(2, 9),
    amount: reward,
    date: now.toISOString(),
    dayNum: newStreak,
    status: 'Confirmed'
  };

  const updatedUser = {
    ...user,
    balance: user.balance + reward,
    lastCheckInDate: now.toISOString(),
    checkInStreak: newStreak,
    rewardHistory: [historyEntry, ...(user.rewardHistory || [])].slice(0, 30)
  };

  return {
    success: true,
    reward,
    newStreak,
    user: updatedUser,
    message: resetTriggered 
      ? `Streak fresh start hui Rs. ${reward} ke sath.`
      : `Rs. ${reward} aap ke balance mein jama ho gaye.`
  };
};

export const getAttendanceHistory = async (userId: string) => {
  return [
    { id: '1', date: '2023-10-25', amount: 5, status: 'Present' },
    { id: '2', date: '2023-10-24', amount: 5, status: 'Present' },
    { id: '3', date: '2023-10-23', amount: 5, status: 'Present' },
    { id: '4', date: '2023-10-22', amount: 50, status: 'Milestone' },
  ];
};
