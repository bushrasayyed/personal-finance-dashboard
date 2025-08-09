import { useMemo } from 'react';
import type { Transaction } from '../types/transaction';

interface SummaryData {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const useSummaryData = (transactions: Transaction[]): SummaryData => {
  return useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    return { totalIncome, totalExpense, balance };
  }, [transactions]);
};

export default useSummaryData;
