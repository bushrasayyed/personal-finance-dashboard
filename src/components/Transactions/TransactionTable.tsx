import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  useTheme,
  Box,
} from '@mui/material';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { Transaction } from '../../types/transaction';
import Pagination from '../Shared/Pagination';
import EditTransactionModal from './EditTransactionModal';

interface TransactionTableProps {
  transactions: Transaction[];
  onUpdate: (id: string, updated: Partial<Transaction>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const ITEMS_PER_PAGE = 10;

const TransactionTable = ({ transactions, onUpdate, onDelete }: TransactionTableProps) => {
  const theme = useTheme();

  const [currentPage, setCurrentPage] = useState(1);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTransactions = transactions.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleEdit = (transaction: Transaction) => setEditingTransaction(transaction);
  const handleCloseModal = () => setEditingTransaction(null);

  const handleUpdate = async (id: string, updated: Partial<Transaction>) => {
    await onUpdate(id, updated);
    handleCloseModal();
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          minWidth: 600,
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#222' : '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Notes</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.map(transaction => (
              <TableRow
                key={transaction.id}
                sx={{
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: '#e0f7e9',
                    borderLeft: '4px solid #4caf50',
                    boxShadow: `0 2px 6px ${theme.palette.mode === 'dark' ? '#1b5e20' : '#81c784'}`,
                  },
                }}
              >
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.category || '—'}</TableCell>
                <TableCell>₹{transaction.amount}</TableCell>
                <TableCell sx={{ color: transaction.type === 'income' ? 'green' : 'red' }}>
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                </TableCell>
                <TableCell>{transaction.notes || '—'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(transaction)} aria-label="edit">
                    <Edit size={18} />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(transaction.id)}
                    aria-label="delete"
                    color="error"
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {editingTransaction && (
        <EditTransactionModal
          open={!!editingTransaction}
          transaction={editingTransaction}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </Box>
  );
};

export default TransactionTable;
