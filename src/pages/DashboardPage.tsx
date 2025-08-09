import { useCallback, useState, useEffect } from 'react';
import { Box, Typography, Stack, Button, Dialog, DialogTitle } from '@mui/material';
import FilterBar, { type FilterValues } from '../components/Dashboard/FilterBar';
import SummaryCards from '../components/Dashboard/SummaryCards';
import OverviewCharts from '../components/Dashboard/OverviewCharts';
import AddIncomeForm from '../components/Forms/AddIncomeForm';
import AddExpenseForm from '../components/Forms/AddExpenseForm';
import { useTransactions } from '../hooks/useTransactions';
import Loader from '../components/Shared/Loader';

const DashboardPage = () => {
  const { transactions, loading, refetch } = useTransactions();
  const [filtered, setFiltered] = useState(transactions);
  const [openIncomeModal, setOpenIncomeModal] = useState(false);
  const [openExpenseModal, setOpenExpenseModal] = useState(false);
  const [dateRangeSelected, setDateRangeSelected] = useState(false);

  useEffect(() => {
    setFiltered(transactions);
  }, [transactions]);

  const handleFilterChange = useCallback(
    (filters: FilterValues) => {
      const { category, from, to } = filters;

      const hasValidRange = Boolean(from && to);
      setDateRangeSelected(hasValidRange);

      if (!hasValidRange) {
        setFiltered([]);
        return;
      }

      const filteredData = transactions.filter(t => {
        const tDate = new Date(t.date);
        const matchFrom = from ? tDate >= from : true;
        const matchTo = to ? tDate <= to : true;

        // Always filter by date range
        if (!matchFrom || !matchTo) return false;

        // If transaction is income, keep it if it's within date
        if (t.type === 'income') return true;

        // If transaction is expense, apply category filter if selected
        if (t.type === 'expense') {
          const matchCategory = category ? t.category === category : true;
          return matchCategory;
        }

        return false;
      });

      setFiltered(filteredData);
    },
    [transactions]
  );

  if (loading) return <Loader />;

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Overview
      </Typography>

      <FilterBar onFilterChange={handleFilterChange} />

      <Stack direction="row" spacing={2} mb={3}>
        <Button variant="contained" onClick={() => setOpenIncomeModal(true)}>
          + Add Income
        </Button>
        <Button variant="contained" onClick={() => setOpenExpenseModal(true)}>
          + Add Expense
        </Button>
      </Stack>

      {dateRangeSelected ? (
        <>
          <SummaryCards transactions={filtered} />
          <OverviewCharts transactions={filtered} />
        </>
      ) : (
        <Typography variant="body1" mt={6} color="text.secondary">
          Please select a date range to view the dashboard.
        </Typography>
      )}

      {/* Income Modal */}
      <Dialog
        open={openIncomeModal}
        onClose={() => setOpenIncomeModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Income</DialogTitle>
        <Box p={2}>
          <AddIncomeForm
            onSuccess={() => {
              setOpenIncomeModal(false);
              refetch();
            }}
          />
        </Box>
      </Dialog>

      {/* Expense Modal */}
      <Dialog
        open={openExpenseModal}
        onClose={() => setOpenExpenseModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Expense</DialogTitle>
        <Box p={2}>
          <AddExpenseForm
            onSuccess={() => {
              setOpenExpenseModal(false);
              refetch();
            }}
          />
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashboardPage;
