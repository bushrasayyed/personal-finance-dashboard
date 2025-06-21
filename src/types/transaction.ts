export type Transaction = {
  id: number;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string; // ISO format,e.g."2025-06-10"
};
