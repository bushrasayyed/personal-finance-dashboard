import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FilterBar, { type FilterValues } from '../components/FilterBar';
import SummaryBox from '../components/SummaryBox';
import ChartCard from '../components/ChartCard';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import data from '../data/data.json';
import type { Transaction } from '../types/transaction';

const DashboardPage = () => {
  //state to hold all transactions & currently filtered transactions
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [filtered, setFiltered] = useState<Transaction[]>([]);

  //load transaction data from local JSON once when  component mounts
  useEffect(() => {
    setAllTransactions(data as Transaction[]);
    setFiltered(data as Transaction[]);
  }, []);

  // Handle filters with useCallback
  const handleFilterChange = useCallback(
    (filters: FilterValues) => {
      const { category, from, to } = filters;

      const filteredData = allTransactions.filter(t => {
        const matchCategory = category ? t.category === category : true;
        const tDate = new Date(t.date).getTime();

        const matchFrom = from ? tDate >= new Date(from).getTime() : true;
        const matchTo = to ? tDate <= new Date(to).getTime() : true;

        return matchCategory && matchFrom && matchTo;
      });

      setFiltered(filteredData);
    },
    [allTransactions]
  );

  //compute income from all transactions
  const totalIncome = allTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  //calculate total expenses from filtered data
  const totalExpense = filtered
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  //calculate balance
  const balance = totalIncome - totalExpense;

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Dashboard Overview
      </Typography>

      {/*filters for category & date range */}
      <FilterBar onFilterChange={handleFilterChange} />

      {/*summary cards for income, expenses, & balance */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} mb={4} useFlexGap>
        <SummaryBox title="Income" amount={totalIncome} color="#4CAF50" />
        <SummaryBox title="Expenses" amount={totalExpense} color="#F44336" />
        <SummaryBox title="Balance" amount={balance} color="#2196F3" />
      </Stack>

      {/*charts section:Pie for expenses by category, Bar for monthly trends */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Box flex={1}>
          <ChartCard title="Expenses by Category">
            <PieChart transactions={filtered} />
          </ChartCard>
        </Box>

        <Box flex={1}>
          <ChartCard title="Income vs Expense (Monthly)">
            <BarChart transactions={filtered} />
          </ChartCard>
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardPage;
