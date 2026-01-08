
import { uploadFile } from '../config/cloudinary';

export const deployTask = async (adminId: string, taskData: any) => {
  const { title, reward, category, instructions, sampleImage, plan } = taskData;

  console.log(`[BACKEND] Deploying new task node for ${plan}...`);
  
  let sampleImageUrl = null;
  if (sampleImage && sampleImage.startsWith('data:')) {
     sampleImageUrl = await uploadFile(sampleImage);
  }

  const newTask = {
    id: 'T_' + Math.random().toString(36).substr(2, 9),
    title,
    reward,
    category,
    instructions, // Multi-line text block
    sampleImage: sampleImageUrl,
    status: 'Active',
    deployedBy: adminId,
    createdAt: new Date()
  };

  // In production: await db.tasks.create(newTask);
  console.log("[BACKEND] Task committed to production cluster:", newTask.id);

  return {
    success: true,
    task: newTask
  };
};

export const submitAssignment = async (userId: string, taskId: string, proofData: any) => {
  const { proofType, proofContent } = proofData;

  let proofUrl = '';
  let proofText = '';

  if (proofType === 'file') {
    proofUrl = await uploadFile(proofContent);
  } else {
    proofText = proofContent;
  }

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

  console.log("[BACKEND] Submission node created:", submission.id);

  return {
    success: true,
    message: "Submission node active. Awaiting admin audit.",
    submission
  };
};
