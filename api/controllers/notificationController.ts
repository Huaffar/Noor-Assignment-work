
// Simulated database for notifications
let notifications: any[] = [
  { id: 'n1', userId: 'demo_user', title: 'Welcome!', message: 'Start your first task today.', type: 'info', isRead: false, createdAt: new Date() },
  { id: 'n2', userId: 'demo_user', title: 'Bonus Received', message: 'Rs. 50 added to your wallet.', type: 'success', isRead: true, createdAt: new Date(Date.now() - 86400000) }
];

/**
 * UTILITY: System-wide alert trigger
 */
export const sendNotification = async (userId: string | null, title: string, message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
  const newNotif = {
    id: 'notif_' + Math.random().toString(36).substr(2, 9),
    userId,
    title,
    message,
    type,
    isRead: false,
    createdAt: new Date()
  };
  notifications = [newNotif, ...notifications];
  console.log(`[ALERTER] Pushed ${type} alert to ${userId || 'GLOBAL'}: ${title}`);
  return newNotif;
};

export const getUserNotifications = async (userId: string) => {
  return notifications.filter(n => n.userId === userId || n.userId === null);
};

export const markAsRead = async (notificationId: string) => {
  notifications = notifications.map(n => n.id === notificationId ? { ...n, isRead: true } : n);
  return { success: true };
};

export const markAllRead = async (userId: string) => {
  notifications = notifications.map(n => (n.userId === userId || n.userId === null) ? { ...n, isRead: true } : n);
  return { success: true };
};

export const broadcastAnnouncement = async (adminId: string, payload: any) => {
  const { title, message, targetGroup } = payload;
  console.log(`[ADMIN] ${adminId} broadcasting to ${targetGroup}: ${title}`);
  // In real app, this would iterate users or set a null userId for global
  await sendNotification(null, title, message, 'info');
  return { success: true };
};
