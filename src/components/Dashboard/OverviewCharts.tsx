import { Box, Paper, Typography, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import type { Transaction } from '../../types/transaction';
import PieChart from '../Charts/PieChart';
import BarChart from '../Charts/BarChart';

interface OverviewChartsProps {
  transactions: Transaction[];
}

const chartVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

const OverviewCharts = ({ transactions }: OverviewChartsProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const paperStyle = {
    p: 2,
    borderRadius: 2,
    boxShadow: 3,
    bgcolor: isDark ? 'grey.900' : 'grey.100',
    transition: '0.3s',
    '&:hover': {
      boxShadow: 6,
      transform: 'scale(1.02)',
    },
  };

  const hasExpenseData = transactions.some(t => t.type === 'expense');

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ width: '100%' }}>
      {/* Pie Chart - show no data if no expense */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={chartVariants}
        style={{ flex: 1 }}
      >
        <Paper sx={paperStyle}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Expenses by Category
          </Typography>
          <Box height={300} display="flex" alignItems="center" justifyContent="center">
            {hasExpenseData ? (
              <PieChart transactions={transactions} />
            ) : (
              <Typography variant="body1" color="text.secondary">
                No expense data available
              </Typography>
            )}
          </Box>
        </Paper>
      </motion.div>

      {/* Bar Chart - always rendered if any transactions */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={chartVariants}
        style={{ flex: 1 }}
      >
        <Paper sx={paperStyle}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Income vs Expenses (Monthly)
          </Typography>
          <Box height={300}>
            <BarChart transactions={transactions} />
          </Box>
        </Paper>
      </motion.div>
    </Stack>
  );
};

export default OverviewCharts;
