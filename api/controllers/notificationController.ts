let notifications: any[] = [
  { id: 'n1', userId: 'demo_user', title: 'Network Welcome', message: 'Assalam-o-Alaikum! Your worker node is now active.', type: 'info', isRead: false, createdAt: new Date() },
  { id: 'n2', userId: 'demo_user', title: 'Payment Confirmed', message: 'Rs. 240 from Task #882 added to wallet.', type: 'success', isRead: true, createdAt: new Date(Date.now() - 3600000) },
  { id: 'n3', userId: null, title: 'Maintenance Over', message: 'Global Hub v4.5.0 synchronization complete.', type: 'success', isRead: false, createdAt: new Date(Date.now() - 7200000) },
  { id: 'n4', userId: null, title: 'Referral Boost', message: 'Earn 15% commission on Gold Tiers this weekend!', type: 'warning', isRead: false, createdAt: new Date(Date.now() - 14400000) }
];

export const sendNotification = async (userId: string | null, title: string, message: string, type: any = 'info') => {
  const newNotif = { id: 'notif_' + Math.random(), userId, title, message, type, isRead: false, createdAt: new Date() };
  notifications = [newNotif, ...notifications];
  return newNotif;
};

export const getUserNotifications = async (userId: string) => {
  return notifications.filter(n => n.userId === userId || n.userId === null);
};

export const markAsRead = async (id: string) => {
  notifications = notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
  return { success: true };
};

export const markAllRead = async (userId: string) => {
  notifications = notifications.map(n => (n.userId === userId || n.userId === null) ? { ...n, isRead: true } : n);
  return { success: true };
};

export const broadcastAnnouncement = async (adminId: string, payload: any) => {
  await sendNotification(null, payload.title, payload.message, payload.type);
  return { success: true };
};
