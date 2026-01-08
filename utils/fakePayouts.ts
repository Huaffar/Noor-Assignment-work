
export interface PayoutProof {
  id: string;
  name: string;
  amount: number;
  method: 'EasyPaisa' | 'JazzCash';
  time: string;
  color: string;
}

const names = [
  "Ali R.", "Sana K.", "M. Ahmed", "Zaid Khan", "Fatima A.", 
  "Omar M.", "Hina S.", "Bilal J.", "Ayesha B.", "Hamza T.",
  "Zainab U.", "Usman P.", "Khadija W.", "Saad Q.", "Mariam L."
];

const colors = [
  "bg-rose-500", "bg-blue-500", "bg-emerald-500", 
  "bg-amber-500", "bg-indigo-500", "bg-pink-500"
];

export const generateRandomPayout = (): PayoutProof => {
  const name = names[Math.floor(Math.random() * names.length)];
  const amounts = [500, 1200, 2500, 3000, 4500, 750, 1500];
  const methods: ('EasyPaisa' | 'JazzCash')[] = ['EasyPaisa', 'JazzCash'];
  const times = ["Just now", "1 min ago", "2 mins ago", "4 mins ago"];

  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    amount: amounts[Math.floor(Math.random() * amounts.length)],
    method: methods[Math.floor(Math.random() * methods.length)],
    time: times[Math.floor(Math.random() * times.length)],
    color: colors[Math.floor(Math.random() * colors.length)]
  };
};
