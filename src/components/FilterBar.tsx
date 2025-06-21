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

export interface FilterValues {
  category: string;
  from: Date | null;
  to: Date | null;
}

interface Props {
  onFilterChange: (filters: FilterValues) => void;
}

//this comp renders filter toolbar to refine data based on category & date range
const FilterBar = ({ onFilterChange }: Props) => {
  const [category, setCategory] = useState('');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  //whenever any filter changes, notify parent comp
  useEffect(() => {
    onFilterChange({ category, from: fromDate, to: toDate });
  }, [category, fromDate, toDate, onFilterChange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {/*category dropdown */}
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e: SelectChangeEvent) => setCategory(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Salary">Salary</MenuItem>
              <MenuItem value="Groceries">Groceries</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Freelance">Freelance</MenuItem>
              <MenuItem value="Travelling">Travelling</MenuItem>
              <MenuItem value="Bills">Bills</MenuItem>
              <MenuItem value="Rents">Rents</MenuItem>
              <MenuItem value="Shopping">Shopping</MenuItem>
              <MenuItem value="Coachings">Coachings</MenuItem>
            </Select>
          </FormControl>

          {/* date pickers ie from and to */}
          <DatePicker
            label="From"
            value={fromDate}
            onChange={date => setFromDate(date)}
            slotProps={{ textField: { fullWidth: true } }}
          />

          <DatePicker
            label="To"
            value={toDate}
            onChange={date => setToDate(date)}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};

export default FilterBar;
