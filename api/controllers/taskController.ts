import { uploadFile } from '../config/cloudinary';

// Get PKT Hour (UTC+5)
const getPKTHour = () => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const pkt = new Date(utc + (3600000 * 5));
  return pkt.getHours();
};

export const getDailyAssignment = async (userId: string, user: any) => {
  // 1. Membership Gate
  const hasPlan = user.currentPlan && user.currentPlan !== 'None';
  const isActive = user.planStatus === 'active' || user.planStatus === 'Approved';

  if (!hasPlan || !isActive) {
    return {
      success: false,
      status: 'BLOCKED',
      message: "Access Denied: No active plan node detected."
    };
  }

  // 2. Expiry Gate
  if (user.planExpiryDate && new Date() > new Date(user.planExpiryDate)) {
    return {
      success: false,
      status: 'EXPIRED',
      message: "Node Inactive: Your earning plan has expired."
    };
  }

  const currentHour = getPKTHour();
  
  // 3. Time Gate (08:00 - 23:00 PKT)
  const isOpen = currentHour >= 8 && currentHour < 23;
  
  if (!isOpen) {
    return {
      success: false,
      status: 'CLOSED',
      message: "Work assignments are active from 08:00 AM to 11:00 PM (PKT) only."
    };
  }

  // 4. Plan Limit Gate
  const submissionCount = user.completedTasksToday || 3;
  const isLimitReached = submissionCount >= (user.dailyLimit || 8);

  if (isLimitReached) {
    return {
      success: false,
      status: 'COMPLETED',
      message: "Daily quota fulfilled. You have submitted all pages for your tier."
    };
  }

  // 5. Fetch Active Topic (Admin Managed Mock)
  const topic = {
    id: 'dt_' + new Date().toDateString().replace(/\s/g, '_'),
    title: "Technological Infrastructure in Modern Pakistan",
    content: "The evolution of digital nodes in South Asia has paved the way for decentralized work platforms. By utilizing high-integrity handwriting tasks and digital transcriptions, platforms like Noor Official ensure that human cognitive assets are valued. This assignment requires clear focus on the precision of the output.",
    reward: 240, 
    pagesAllowed: user.dailyLimit || 8,
    pagesSubmitted: submissionCount,
    format: 'Handwritten', // Default format from CMS
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800' // Reference image set by admin
  };

  return {
    success: true,
    status: 'OPEN',
    topic
  };
};

export const submitWork = async (userId: string, taskId: string, proofImage: string, user: any) => {
  const isActive = user.planStatus === 'active' || user.planStatus === 'Approved';
  
  if (!isActive) {
    throw new Error("Logic Violation: Assignment submission rejected. Plan node not active.");
  }

  const currentHour = getPKTHour();
  if (currentHour < 8 || currentHour >= 23) {
    throw new Error("Node Offline: Submissions only allowed during work hours.");
  }

  console.log(`[BACKEND] Initializing Secure Work Trace for User: ${userId}, Task: ${taskId}`);
  
  const proofUrl = await uploadFile(proofImage);

  // Generate Immutable Trace ID
  const traceId = 'TRACE_' + Math.random().toString(36).substr(2, 9).toUpperCase();

  const submission = {
    id: 'SUB_' + Math.random().toString(36).substr(2, 9),
    userId,
    taskId,
    proofUrl,
    traceId,
    status: 'Pending',
    submittedAt: new Date(),
    sequence: (user.completedTasksToday || 0) + 1
  };

  return {
    success: true,
    message: "Payload transmitted. Trace ID: " + traceId,
    submission
  };
};