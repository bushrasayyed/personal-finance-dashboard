import { Card, CardContent, Typography, Divider } from '@mui/material';
import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
}

//reusable card layout wrapper for any chart section in the dashboard
const ChartCard = ({ title, children }: ChartCardProps) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        {/*section title */}
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {/*chart / any visual component passed as children */}
        {children}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
