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
import type { Transaction } from '../types/transaction';

//register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

interface BarChartProps {
  transactions: Transaction[];
}

const BarChart = ({ transactions }: BarChartProps) => {
  //initialize a map to accumulate income & expense totals by month
  const monthMap: { [month: string]: { income: number; expense: number } } = {};

  transactions.forEach(t => {
    const month = format(parseISO(t.date), 'MMM yyyy');

    //accumulate amount based on transaction type
    if (!monthMap[month]) {
      monthMap[month] = { income: 0, expense: 0 };
    }
    if (t.type === 'income') {
      monthMap[month].income += t.amount;
    } else {
      monthMap[month].expense += t.amount;
    }
  });

  //extract labels(months) & corresponding income/expense data for  chart
  const labels = Object.keys(monthMap);
  const incomeData = labels.map(label => monthMap[label].income);
  const expenseData = labels.map(label => monthMap[label].expense);

  //prepare chart dataset
  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Expense',
        data: expenseData,
        backgroundColor: '#F44336',
      },
    ],
  };

  //chart configuration options
  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  //render  bar chart
  return <Bar data={data} options={options} />;
};

export default BarChart;
