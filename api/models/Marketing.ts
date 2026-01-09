
export interface IMarketing {
  id: string;
  homeBanners: string[];
  newsTicker: string;
  popup: {
    isActive: boolean;
    imageUrl: string;
    link: string;
    title: string;
  };
  appVersion: string;
  updatedAt: string;
}

export const MarketingSchema = {
  homeBanners: [{ type: 'String' }],
  newsTicker: { type: 'String', default: 'Assalam-o-Alaikum! Welcome to Noor Official.' },
  popup: {
    isActive: { type: 'Boolean', default: false },
    imageUrl: { type: 'String' },
    link: { type: 'String' },
    title: { type: 'String' }
  },
  appVersion: { type: 'String', default: '2.5.0' },
  updatedAt: { type: 'Date', default: 'Date.now' }
};
