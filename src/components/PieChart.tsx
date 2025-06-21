import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { ChartOptions } from 'chart.js';
import type { Transaction } from '../types/transaction';

//register necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  transactions: Transaction[];
}

//this component visualizes expense breakdown by category in Pie chart
const PieChart = ({ transactions }: PieChartProps) => {
  const expenses = transactions.filter(t => t.type === 'expense');

  //accumulate total amount spent per category
  const categoryTotals: { [category: string]: number } = {};

  expenses.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  //prepare chart data
  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        // a vibrant set of colors to distinguish each category
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#BA68C8',
          '#FF7043',
          '#26A69A',
          '#9575CD',
          '#F06292',
        ],
        borderWidth: 1,
      },
    ],
  };

  //chart configuration options
  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
