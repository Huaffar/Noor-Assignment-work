let mockFAQs = [
  { id: 'f1', question: "How do I upgrade my plan?", answer: "Navigate to the 'Packages' tab, choose your desired tier, and follow the mobile payment instructions.", category: 'Payment', isActive: true },
  { id: 'f2', question: "How long does withdrawal take?", answer: "Standard withdrawals are processed within 2-4 hours. High-value tiers enjoy priority 30-minute disbursal.", category: 'Payment', isActive: true },
  { id: 'f3', question: "What are the work hours?", answer: "The work terminal is open from 08:00 AM to 11:00 PM Pakistan Time daily.", category: 'General', isActive: true },
  { id: 'f4', question: "Is identity verification mandatory?", answer: "KYC is required only for Diamond and Platinum tiers to prevent network abuse.", category: 'Account', isActive: true },
  { id: 'f5', question: "Can I use multiple accounts?", answer: "No, Noor Official allows only one worker node per identity/IP to maintain platform integrity.", category: 'Account', isActive: true }
];

export const getPublicFAQs = async () => mockFAQs.filter(f => f.isActive);

export const createFAQ = async (adminId: string, data: any) => {
  const newFAQ = { id: 'faq_' + Math.random(), ...data, isActive: true, createdAt: new Date() };
  mockFAQs = [newFAQ, ...mockFAQs];
  return { success: true, faq: newFAQ };
};

export const deleteFAQ = async (adminId: string, id: string) => {
  mockFAQs = mockFAQs.filter(f => f.id !== id);
  return { success: true };
};
