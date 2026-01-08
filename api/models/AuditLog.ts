
// Conceptual Schema for Audit Logging
export const AuditLogSchema = {
  adminId: { type: 'String', required: true },
  adminName: { type: 'String', required: true },
  action: { 
    type: 'String', 
    enum: [
      'APPROVE_WITHDRAWAL', 
      'REJECT_WITHDRAWAL', 
      'SOFT_DELETE_USER', 
      'RESTORE_USER', 
      'SOFT_DELETE_TASK', 
      'PERMANENT_DELETE',
      'UPDATE_SYSTEM_SETTINGS'
    ], 
    required: true 
  },
  targetId: { type: 'String' },
  details: { type: 'String' },
  timestamp: { type: 'Date', default: 'Date.now' }
};
