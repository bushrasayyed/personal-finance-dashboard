import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Button, TextField, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';

interface AddExpenseFormProps {
  onSuccess: () => void;
}

const AddExpenseForm = ({ onSuccess }: AddExpenseFormProps) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    if (!amount || !category || !date) {
      enqueueSnackbar('Please fill all required fields.', { variant: 'error' });
      return;
    }

    try {
      await addDoc(collection(db, 'transactions'), {
        type: 'expense',
        amount: Number(amount),
        category,
        date,
        notes,
      });

      enqueueSnackbar('Expense added successfully!', { variant: 'success' });
      onSuccess();
    } catch (error) {
      console.error('Failed to add expense:', error);
      enqueueSnackbar('Failed to add expense.', { variant: 'error' });
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <TextField label="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField label="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>
        Add Expense
      </Button>
    </Stack>
  );
};

export default AddExpenseForm;
