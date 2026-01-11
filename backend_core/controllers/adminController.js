
let auditLogs = [];

exports.getAdminDashboardStats = async () => {
  // Integrated Metric Node
  const baseUsers = 15420;
  const activeAssignmentNodes = 4210;
  const grossYield = 2526000;
  const currentDisbursal = 14500;

  return {
    totalUsers: baseUsers,
    activeNodes: activeAssignmentNodes,
    pendingReviews: 48,
    totalEarning: grossYield,
    todayPayouts: currentDisbursal,
    growthData: [
      { date: 'Mon', users: baseUsers - 220, revenue: 12000, audits: 310 },
      { date: 'Tue', users: baseUsers - 140, revenue: 15000, audits: 420 },
      { date: 'Wed', users: baseUsers - 70, revenue: 18000, audits: 380 },
      { date: 'Thu', users: baseUsers - 30, revenue: 14000, audits: 290 },
      { date: 'Fri', users: baseUsers - 10, revenue: 21000, audits: 450 },
      { date: 'Sat', users: baseUsers - 5, revenue: 19000, audits: 410 },
      { date: 'Today', users: baseUsers, revenue: 22000, audits: 512 },
    ],
    uptime: '99.98%',
    serverLatency: '24ms'
  };
};

exports.logAuditAction = async (adminId, action, details) => {
  const log = {
    id: 'log_' + Date.now(),
    adminId,
    action,
    details,
    timestamp: new Date().toISOString()
  };
  auditLogs.unshift(log);
  return log;
};

exports.getPlanRequests = async () => {
  return [
    { id: 'req_101', userId: 'u1', user: 'Zaid K.', plan: 'Gold Package', price: 3500, trxId: 'TXN882911', status: 'Pending', date: '2m ago', proof: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800' },
    { id: 'req_102', userId: 'u2', user: 'Fatima A.', plan: 'Standard Node', price: 2000, trxId: 'JZC772100', status: 'Pending', date: '15m ago', proof: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800' }
  ];
};

exports.getAuditAnalytics = async () => {
  return {
    todayStats: {
      pending: 48,
      approved: 512,
      rejected: 12,
      netYield: 84200
    }
  };
};
