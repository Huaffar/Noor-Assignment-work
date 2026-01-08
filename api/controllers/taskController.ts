
import { uploadFile } from '../config/cloudinary';

export const submitAssignment = async (userId: string, taskId: string, proofData: any) => {
  const { proofType, proofContent } = proofData;

  // 1. Validation Logic
  // Check if user already submitted this task today
  // const today = new Date().setHours(0,0,0,0);
  // const existing = await Submission.findOne({ userId, taskId, submittedAt: { $gte: today } });
  // if (existing) throw new Error("Daily limit reached for this task.");

  let proofUrl = '';
  let proofText = '';

  // 2. Handle Proof Content
  if (proofType === 'file') {
    // proofContent would be the base64 or file object
    proofUrl = await uploadFile(proofContent);
  } else {
    proofText = proofContent;
  }

  // 3. Save Submission
  const submission = {
    id: 'sub_' + Math.random().toString(36).substr(2, 9),
    userId,
    taskId,
    proofType,
    proofUrl,
    proofText,
    status: 'Pending',
    submittedAt: new Date()
  };

  console.log("Submission saved:", submission);

  return {
    success: true,
    message: "Your assignment has been submitted and is pending approval.",
    submission
  };
};
