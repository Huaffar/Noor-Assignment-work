
// Conceptual Mongoose Models for Backend

export const TaskSchema = {
  title: { type: 'String', required: true },
  description: { type: 'String', required: true },
  reward: { type: 'Number', required: true }, // Reward in PKR
  daily_limit: { type: 'Number', default: 1 },
  instructions: { type: 'String' },
  category: { type: 'String', enum: ['assignment', 'survey', 'social'], default: 'assignment' },
  createdAt: { type: 'Date', default: 'Date.now' }
};

export const SubmissionSchema = {
  userId: { type: 'ObjectId', ref: 'User', required: true },
  taskId: { type: 'ObjectId', ref: 'Task', required: true },
  proofType: { type: 'String', enum: ['file', 'text'], required: true },
  proofUrl: { type: 'String' }, // Cloudinary URL
  proofText: { type: 'String' }, // For manually typed work
  status: { type: 'String', enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  submittedAt: { type: 'Date', default: 'Date.now' }
};
