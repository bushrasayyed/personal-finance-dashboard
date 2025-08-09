import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';

export interface FilterValues {
  category: string;
  from: Date | null;
  to: Date | null;
  type?: 'income' | 'expense' | 'all';
}

interface Props {
  onFilterChange: (filters: FilterValues) => void;
}

const FilterBar = ({ onFilterChange }: Props) => {
  const [category, setCategory] = useState('');
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  // Fetches unique categories from 'transactions' where type === 'expense'
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const q = query(collection(db, 'transactions'), where('type', '==', 'expense'));
        const snapshot = await getDocs(q);

        const unique = new Set<string>();
        snapshot.forEach(doc => {
          const data = doc.data();
          if (data.category) unique.add(data.category);
        });

        setCategories(Array.from(unique));
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Notify parent when filters change
  useEffect(() => {
    onFilterChange({ category, from, to });
  }, [category, from, to, onFilterChange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          {/* From Date Picker */}
          <DatePicker
            label="From Date"
            value={from}
            onChange={setFrom}
            slotProps={{ textField: { fullWidth: true } }}
          />

          {/* To Date Picker */}
          <DatePicker
            label="To Date"
            value={to}
            onChange={setTo}
            slotProps={{ textField: { fullWidth: true } }}
          />

          {/* Category Dropdown */}
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e: SelectChangeEvent) => setCategory(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};

export default FilterBar;
