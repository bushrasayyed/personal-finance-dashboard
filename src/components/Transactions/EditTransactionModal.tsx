import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
  Button,
  Stack,
} from '@mui/material';
import { useState, useEffect } from 'react';
import type { Transaction } from '../../types/transaction';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';

interface EditTransactionModalProps {
  open: boolean;
  onClose: () => void;
  transaction: Transaction;
  onUpdate: (id: string, updated: Partial<Transaction>) => void;
}

const EditTransactionModal = ({
  open,
  onClose,
  transaction,
  onUpdate,
}: EditTransactionModalProps) => {
  const [formData, setFormData] = useState({
    category: transaction.category || '',
    amount: transaction.amount,
    date: transaction.date,
    notes: transaction.notes || '',
  });

  const [categories, setCategories] = useState<string[]>([]);

  const fetchCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'categories'));
      const fetched = snapshot.docs.map(doc => doc.data().name);
      setCategories(fetched);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onUpdate(transaction.id, formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Edit {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            select
            label="Category"
            value={formData.category}
            onChange={e => handleChange('category', e.target.value)}
            fullWidth
          >
            {categories.length > 0 ? (
              categories.map(cat => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Loading categories...</MenuItem>
            )}
          </TextField>

          <TextField
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={e => handleChange('amount', Number(e.target.value))}
            fullWidth
          />

          <TextField
            type="date"
            label="Date"
            value={formData.date}
            onChange={e => handleChange('date', e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            label="Notes"
            value={formData.notes}
            onChange={e => handleChange('notes', e.target.value)}
            fullWidth
            multiline
            rows={2}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTransactionModal;
