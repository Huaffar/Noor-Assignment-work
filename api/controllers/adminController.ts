
export const getAdminDashboardStats = async () => {
  return {
    totalUsers: 12500,
    pendingReviews: 124,
    totalEarning: 450200,
    todayPayouts: 12500,
    revenueHistory: [
      { date: '2023-10-18', amount: 45000 },
      { date: '2023-10-19', amount: 52000 },
      { date: '2023-10-20', amount: 48000 },
      { date: '2023-10-21', amount: 61000 },
      { date: '2023-10-22', amount: 55000 },
      { date: '2023-10-23', amount: 67000 },
      { date: '2023-10-24', amount: 72000 }
    ],
    userDistribution: [
      { name: 'Active', value: 8500, color: '#e11d48' },
      { name: 'Banned', value: 1200, color: '#475569' },
      { name: 'New', value: 2800, color: '#f43f5e' }
    ],
    planPerformance: [
      { id: 'p1', name: 'Starter', activeUsers: 4500, tasksDone: 12000, revenue: 4500000 },
      { id: 'p2', name: 'Standard', activeUsers: 3200, tasksDone: 25000, revenue: 6400000 },
      { id: 'p3', name: 'Gold Pro', activeUsers: 1800, tasksDone: 45000, revenue: 6300000 }
    ]
  };
};

export const logAdminAction = async (admin: any, action: string, targetId: string, details: string) => {
  const logEntry = {
    id: 'log_' + Math.random().toString(36).substr(2, 9),
    adminId: admin.id,
    adminName: admin.name,
    action,
    targetId,
    details,
    timestamp: new Date().toISOString()
  };
  return logEntry;
};

export const softDeleteEntity = async (entityType: string, id: string, admin: any) => {
  await logAdminAction(admin, `SOFT_DELETE_${entityType.toUpperCase()}`, id, `Entity moved to trash bin.`);
  return { success: true, message: "Moved to Recycle Bin" };
};

// Added restoreEntity to fix the import error in Trash.tsx
export const restoreEntity = async (entityType: string, id: string, admin: any) => {
  await logAdminAction(admin, `RESTORE_${entityType.toUpperCase()}`, id, `Entity restored from trash bin.`);
  return { success: true, message: "Restored successfully" };
};

// Added permanentDeleteEntity to fix the import error in Trash.tsx
export const permanentDeleteEntity = async (entityType: string, id: string, admin: any) => {
  await logAdminAction(admin, `PERMANENT_DELETE_${entityType.toUpperCase()}`, id, `Entity permanently removed from database.`);
  return { success: true, message: "Permanently deleted" };
};
