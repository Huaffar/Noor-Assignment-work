
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
  console.log("AUDIT LOG CREATED:", logEntry);
  // In real app, save to AuditLog collection
  return logEntry;
};

export const softDeleteEntity = async (entityType: string, id: string, admin: any) => {
  console.log(`Soft deleting ${entityType} with ID: ${id}`);
  await logAdminAction(admin, `SOFT_DELETE_${entityType.toUpperCase()}`, id, `Entity moved to trash bin.`);
  return { success: true, message: "Moved to Recycle Bin" };
};

export const restoreEntity = async (entityType: string, id: string, admin: any) => {
  console.log(`Restoring ${entityType} with ID: ${id}`);
  await logAdminAction(admin, `RESTORE_${entityType.toUpperCase()}`, id, `Entity restored from trash bin.`);
  return { success: true, message: "Entity restored successfully" };
};

export const permanentDeleteEntity = async (entityType: string, id: string, admin: any) => {
  console.log(`PERMANENTLY deleting ${entityType} with ID: ${id}`);
  await logAdminAction(admin, `PERMANENT_DELETE`, id, `Entity purged from database.`);
  return { success: true, message: "Deleted forever" };
};
