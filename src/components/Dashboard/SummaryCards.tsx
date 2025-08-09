import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
import useSummaryData from '../../hooks/useSummaryData';
import { useTheme } from '@mui/material/styles';
import type { Transaction } from '../../types/transaction';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface SummaryCardsProps {
  transactions: Transaction[];
}

const SummaryCards = ({ transactions }: SummaryCardsProps) => {
  const { totalIncome, totalExpense, balance } = useSummaryData(transactions);
  const amounts = [totalIncome, totalExpense, balance];

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const cardData = [
    {
      label: 'Total Income',
      icon: <TrendingUp size={24} color="#4caf50" />,
      bgColor: isDark ? '#226326ff' : '#e8f5e9',
      textColor: isDark ? '#e4f0e5ff' : '#226326ff',
    },
    {
      label: 'Total Expenses',
      icon: <TrendingDown size={24} color="#e92618ff" />,
      bgColor: isDark ? '#700606ff' : '#ffebee',
      textColor: isDark ? '#e4f0e5ff' : '#b30f0fff',
    },
    {
      label: 'Balance',
      icon: <DollarSign size={24} color="#2196f3" />,
      bgColor: isDark ? '#06357aff' : '#e3f2fd',
      textColor: isDark ? '#e4f0e5ff' : '#06357aff',
    },
  ];

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
      {cardData.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          style={{ flex: 1 }}
        >
          <Card
            sx={{
              backgroundColor: card.bgColor,
              boxShadow: 3,
              borderRadius: 2,
              color: card.textColor,
              '&:hover': {
                transform: 'scale(1.03)',
                transition: '0.3s',
              },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                {card.icon}
                <Typography variant="subtitle1" fontWeight={600}>
                  {card.label}
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight={700}>
                ₹{amounts[index].toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </Stack>
  );
};

export default SummaryCards;
