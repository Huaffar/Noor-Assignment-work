
// Mock database storage for FAQs
let mockFAQs = [
  { id: 'f1', question: "How to pay for a plan?", answer: "Go to 'Upgrade Plan', select your tier, and transfer to our EasyPaisa/JazzCash numbers. Upload your TrxID for verification.", category: 'Payment', isActive: true },
  { id: 'f2', question: "Withdrawal locked?", answer: "Invite at least 1 active referral to unlock your first payout forever.", category: 'Account', isActive: true },
  { id: 'f3', question: "When do tasks reset?", answer: "Every 24 hours at 9:00 AM PKT daily.", category: 'General', isActive: true }
];

export const getPublicFAQs = async () => {
  return mockFAQs.filter(f => f.isActive);
};

export const createFAQ = async (adminId: string, data: any) => {
  const newFAQ = {
    id: 'faq_' + Math.random().toString(36).substr(2, 9),
    ...data,
    isActive: true,
    createdAt: new Date()
  };
  mockFAQs = [newFAQ, ...mockFAQs];
  console.log(`[BACKEND] Admin ${adminId} created FAQ:`, newFAQ.question);
  return { success: true, faq: newFAQ };
};

export const deleteFAQ = async (adminId: string, faqId: string) => {
  mockFAQs = mockFAQs.filter(f => f.id !== faqId);
  console.log(`[BACKEND] Admin ${adminId} deleted FAQ ID:`, faqId);
  return { success: true, message: "FAQ Purged from system" };
};
