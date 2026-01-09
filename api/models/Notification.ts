
// Conceptual Notification Schema
export const NotificationSchema = {
  userId: { type: 'ObjectId', ref: 'User', required: false }, // null for global announcements
  title: { type: 'String', required: true },
  message: { type: 'String', required: true },
  type: { 
    type: 'String', 
    enum: ['info', 'success', 'error', 'warning'], 
    default: 'info' 
  },
  targetGroup: { 
    type: 'String', 
    enum: ['all', 'paid', 'free', 'specific'], 
    default: 'specific' 
  },
  isRead: { type: 'Boolean', default: false },
  createdAt: { type: 'Date', default: 'Date.now' }
};
