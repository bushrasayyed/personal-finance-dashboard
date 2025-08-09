import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import type { Transaction } from '../../types/transaction';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface PieChartProps {
  transactions: Transaction[];
}

const PieChart = ({ transactions }: PieChartProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const expenses = transactions.filter(t => t.type === 'expense');

  const categoryTotals: Record<string, number> = {};
  expenses.forEach(t => {
    const category = t.category ?? 'Uncategorized';
    categoryTotals[category] = (categoryTotals[category] || 0) + t.amount;
  });

  const totalAmount = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#4BC0C0',
          '#FF9F40',
          '#9966FF',
          '#FF6384',
          '#36A2EB',
          '#FFD54F',
          '#8D6E63',
          '#66BB6A',
          '#BA68C8',
        ],
        borderColor: isDark ? '#1e1e1e' : '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 14,
          padding: 12,
          font: {
            size: 12,
            family: 'Inter, sans-serif',
            weight: 'bold',
          },
          color: isDark ? '#ccc' : '#444',
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#333' : '#fff',
        titleColor: isDark ? '#fff' : '#111',
        bodyColor: isDark ? '#ddd' : '#222',
        borderColor: isDark ? '#555' : '#ccc',
        borderWidth: 1,
        callbacks: {
          label: context => {
            const label = context.label || '';
            const value = context.raw as number;
            const percentage = ((value / totalAmount) * 100).toFixed(1);
            return `${label}: ₹${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        color: isDark ? '#fff' : '#000',
        font: {
          weight: 'bold' as const,
          size: 11,
        },
        formatter: (value: number) => `₹${value.toLocaleString()}`,
        clamp: true,
        clip: true,
      },
    },
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: 280,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Pie data={data} options={options} />
    </Box>
  );
};

export default PieChart;
