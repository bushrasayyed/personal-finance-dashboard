import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useTransactions } from '../../hooks/useTransactions';
import { useSnackbar } from 'notistack';

const LOCAL_KEYS_TO_CLEAR = ['mode', 'finlytico_currency', 'finlytico_date_format'];

const ResetDataButton = () => {
  const [open, setOpen] = useState(false);
  const { deleteAllTransactions } = useTransactions();
  const { enqueueSnackbar } = useSnackbar();

  const handleReset = async () => {
    try {
      await deleteAllTransactions();
      LOCAL_KEYS_TO_CLEAR.forEach(key => localStorage.removeItem(key));
      enqueueSnackbar('All transactions have been reset.', { variant: 'success' });
      setOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Reset failed:', error);
      enqueueSnackbar('Failed to reset data. Please try again.', { variant: 'error' });
    }
  };

  return (
    <>
      <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
        Reset (Clear All Data)
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Reset</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete all your financial data and reset settings? This action
            is <strong>irreversible</strong>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReset} color="error">
            Confirm Reset
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResetDataButton;
