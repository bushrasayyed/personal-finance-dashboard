import { Card, CardContent, Typography, Box } from '@mui/material';

interface SummaryBoxProps {
  title: string;
  amount: number;
  color: string; // Hex/theme color like '#4CAF50'
}

//with responsive design & subtle hover interaction
const SummaryBox = ({ title, amount, color }: SummaryBoxProps) => {
  return (
    <Card
      elevation={3}
      sx={{
        height: '100%',
        backgroundColor: `${color}20`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 6,
          cursor: 'pointer',
        },
        p: { xs: 2, sm: 3 },
      }}
    >
      <CardContent>
        {/* Card label */}
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
          sx={{ fontSize: { xs: 14, md: 16 } }}
        >
          {title}
        </Typography>
        {/*display currency formatted amount */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { xs: 24, md: 32 }, color }}>
            ₹{amount.toLocaleString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryBox;
