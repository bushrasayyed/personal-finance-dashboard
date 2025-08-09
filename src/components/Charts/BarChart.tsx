import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { format, parseISO } from 'date-fns';
import type { Transaction } from '../../types/transaction';
import { useTheme } from '@mui/material/styles';

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

interface BarChartProps {
  transactions: Transaction[];
}

const BarChart = ({ transactions }: BarChartProps) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const monthMap: { [month: string]: { income: number; expense: number } } = {};

  transactions.forEach(t => {
    const month = format(parseISO(t.date), 'MMM yyyy');
    if (!monthMap[month]) {
      monthMap[month] = { income: 0, expense: 0 };
    }
    if (t.type === 'income') {
      monthMap[month].income += t.amount;
    } else {
      monthMap[month].expense += t.amount;
    }
  });

  const labels = Object.keys(monthMap);
  const incomeData = labels.map(label => monthMap[label].income);
  const expenseData = labels.map(label => monthMap[label].expense);

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: isDark ? '#4ca751ff' : '#4CAF50',
        borderRadius: 8,
        barThickness: 28,
      },
      {
        label: 'Expense',
        data: expenseData,
        backgroundColor: isDark ? '#da4848ff' : '#F44336',
        borderRadius: 8,
        barThickness: 28,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 20,
          font: {
            size: 14,
            weight: 'bold',
          },
          color: isDark ? '#e0e0e0' : '#444',
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#424242' : '#f5f5f5',
        titleColor: isDark ? '#fff' : '#333',
        bodyColor: isDark ? '#ddd' : '#222',
        borderColor: isDark ? '#616161' : '#ddd',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? '#ccc' : '#666',
          font: {
            size: 12,
          },
        },
        grid: {
          color: isDark ? '#333' : '#e0e0e0',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: isDark ? '#ccc' : '#666',
          font: {
            size: 12,
          },
          callback: value => `₹${value}`,
        },
        grid: {
          color: isDark ? '#333' : '#e0e0e0',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
