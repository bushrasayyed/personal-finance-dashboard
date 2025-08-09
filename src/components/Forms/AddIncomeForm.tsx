import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { Button, TextField, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';

interface AddIncomeFormProps {
  onSuccess: () => void;
}

const AddIncomeForm = ({ onSuccess }: AddIncomeFormProps) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    if (!amount || !date) {
      enqueueSnackbar('Please provide amount and date.', { variant: 'error' });
      return;
    }

    try {
      await addDoc(collection(db, 'transactions'), {
        type: 'income',
        amount: Number(amount),
        date,
        notes,
      });

      enqueueSnackbar('Income added successfully!', { variant: 'success' });
      onSuccess();
    } catch (error) {
      console.error('Failed to add income:', error);
      enqueueSnackbar('Failed to add income.', { variant: 'error' });
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
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField label="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>
        Add Income
      </Button>
    </Stack>
  );
};

export default AddIncomeForm;
