import { useState } from 'react';
import {
  Box,
  Stack,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  useMediaQuery,
  useTheme,
} from '@mui/material';

export interface FilterValues {
  type: 'income' | 'expense' | '';
  category: string;
  from: Date | null;
  to: Date | null;
}

interface Props {
  onFilterChange: (filters: FilterValues) => void;
}

const TransactionFilters = ({ onFilterChange }: Props) => {
  const [filters, setFilters] = useState<FilterValues>({
    type: '',
    category: '',
    from: null,
    to: null,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (key: keyof FilterValues, value: string | Date | null) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <Box mb={3}>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        alignItems="center"
        justifyContent="flex-start"
      >
        {/* Type */}
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>Type</InputLabel>
          <Select
            value={filters.type}
            label="Type"
            onChange={e => handleChange('type', e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>

        {/* Category */}
        <TextField
          label="Category"
          variant="outlined"
          size="small"
          value={filters.category}
          onChange={e => handleChange('category', e.target.value)}
        />

        {/* From Date */}
        <TextField
          label="From"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          onChange={e => handleChange('from', e.target.value ? new Date(e.target.value) : null)}
        />

        {/* To Date */}
        <TextField
          label="To"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          onChange={e => handleChange('to', e.target.value ? new Date(e.target.value) : null)}
        />
      </Stack>
    </Box>
  );
};

export default TransactionFilters;
