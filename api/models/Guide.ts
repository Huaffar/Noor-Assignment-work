
export interface GuideStep {
  image: string;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
}

export interface Guide {
  slug: string; // e.g. 'withdraw', 'plans', 'kyc'
  steps: GuideStep[];
  updatedAt: string;
}

// Conceptual Schema for Backend
export const GuideSchema = {
  slug: { type: 'String', required: true, unique: true },
  steps: [
    {
      image: { type: 'String' },
      titleEn: { type: 'String' },
      titleUr: { type: 'String' },
      descriptionEn: { type: 'String' },
      descriptionUr: { type: 'String' }
    }
  ],
  updatedAt: { type: 'Date', default: 'Date.now' }
};
