
export interface Plan {
  id: string;
  name: string;
  investment: number;
  dailyWork: number;
  weeklySalary: number;
  monthlySalary: number;
  color: string;
  isPopular?: boolean;
}

export const plansData: Plan[] = [
  {
    id: 'p1',
    name: 'BASIC',
    investment: 1000,
    dailyWork: 1,
    weeklySalary: 1200,
    monthlySalary: 4800,
    color: 'from-gray-100 to-gray-200'
  },
  {
    id: 'p2',
    name: 'STANDARD',
    investment: 2000,
    dailyWork: 2,
    weeklySalary: 2400,
    monthlySalary: 9600,
    color: 'from-yellow-50 to-orange-100'
  },
  {
    id: 'p3',
    name: 'GOLD',
    investment: 3500,
    dailyWork: 3,
    weeklySalary: 3600,
    monthlySalary: 14400,
    color: 'from-yellow-200 to-yellow-400',
    isPopular: true
  },
  {
    id: 'p4',
    name: 'DIAMOND',
    investment: 6000,
    dailyWork: 4,
    weeklySalary: 4800,
    monthlySalary: 19200,
    color: 'from-rose-100 to-rose-200'
  }
];

export const CORE_RULES = {
  ratePerPage: 240,
  workingDays: 'Monday - Friday',
  weekends: 'Weekends Off',
  feeType: 'One-Time Registration Fee | Lifetime Earning'
};
