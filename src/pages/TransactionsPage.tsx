import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import AddIncomeForm from '../components/Forms/AddIncomeForm';
import AddExpenseForm from '../components/Forms/AddExpenseForm';
import { useTransactions } from '../hooks/useTransactions';
import TransactionFilters from '../components/Transactions/TransactionFilters';
import TransactionTable from '../components/Transactions/TransactionTable';
import EmptyState from '../components/Shared/EmptyState';
import Loader from '../components/Shared/Loader';
import type { FilterValues } from '../components/Transactions/TransactionFilters';

const TransactionsPage = () => {
  const { transactions, loading, refetch, updateTransaction, deleteTransaction } =
    useTransactions();
  const [filtered, setFiltered] = useState(transactions);
  const [openIncomeModal, setOpenIncomeModal] = useState(false);
  const [openExpenseModal, setOpenExpenseModal] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setFiltered(transactions);
  }, [transactions]);

  const handleFilterChange = useCallback(
    (filters: FilterValues) => {
      const { category, from, to, type } = filters;

      const filteredData = transactions.filter(transaction => {
        const tDate = new Date(transaction.date);
        const matchCategory = category ? transaction.category === category : true;
        const matchType = type ? transaction.type === type : true;
        const matchFrom = from ? tDate >= new Date(from) : true;
        const matchTo = to ? tDate <= new Date(to) : true;
        return matchCategory && matchType && matchFrom && matchTo;
      });

      setFiltered(filteredData);
    },
    [transactions]
  );

  if (loading) return <Loader />;

  return (
    <Box px={isMobile ? 2 : 4} py={4}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        All Transactions
      </Typography>

      <TransactionFilters onFilterChange={handleFilterChange} />

      <Stack direction={isMobile ? 'column' : 'row'} spacing={2} mb={3} mt={2}>
        <Button variant="contained" fullWidth={isMobile} onClick={() => setOpenIncomeModal(true)}>
          + Add Income
        </Button>
        <Button variant="contained" fullWidth={isMobile} onClick={() => setOpenExpenseModal(true)}>
          + Add Expense
        </Button>
      </Stack>

      {filtered.length === 0 ? (
        <EmptyState
          message="No transactions found"
          description="Try adjusting your filters or add some transactions."
        />
      ) : (
        <TransactionTable
          transactions={filtered}
          onUpdate={updateTransaction}
          onDelete={deleteTransaction}
        />
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

export default TransactionsPage;
