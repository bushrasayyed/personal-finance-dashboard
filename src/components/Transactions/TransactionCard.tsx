import { Card, CardContent, Typography, IconButton, Box, Stack } from '@mui/material';
import { Trash, Pencil } from 'lucide-react';
import type { Transaction } from '../../types/transaction';
import { useState } from 'react';
import EditTransactionModal from './EditTransactionModal';

interface Props {
  transaction: Transaction;
  onUpdate: (id: string, updated: Partial<Transaction>) => void;
  onDelete: (id: string) => void;
}

const TransactionCard = ({ transaction, onUpdate, onDelete }: Props) => {
  const [editOpen, setEditOpen] = useState(false);

  const { type, amount, category, date, notes } = transaction;

  return (
    <>
      <Card
        sx={{
          borderLeft: `6px solid ${type === 'income' ? '#4caf50' : '#f44336'}`,
          mb: 2,
          boxShadow: 2,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            spacing={1}
          >
            <Box>
              <Typography variant="h6" fontWeight={600}>
                ₹{amount.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {category} | {new Date(date).toLocaleDateString()}
              </Typography>
              {notes && (
                <Typography variant="body2" mt={0.5}>
                  📝 {notes}
                </Typography>
              )}
            </Box>

            <Box>
              <IconButton onClick={() => setEditOpen(true)} aria-label="edit">
                <Pencil size={20} />
              </IconButton>
              <IconButton onClick={() => onDelete(transaction.id)} aria-label="delete">
                <Trash size={20} />
              </IconButton>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <EditTransactionModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        transaction={transaction}
        onUpdate={onUpdate}
      />
    </>
  );
};

export default TransactionCard;
