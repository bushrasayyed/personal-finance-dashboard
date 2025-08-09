// components/EmptyState.tsx
import { Box, Typography } from '@mui/material';
import { Inbox } from 'lucide-react';

interface Props {
  message: string;
  description?: string;
}

const EmptyState = ({ message, description }: Props) => {
  return (
    <Box
      textAlign="center"
      py={6}
      px={2}
      sx={{
        opacity: 0.7,
        color: 'text.secondary',
      }}
    >
      <Inbox size={48} style={{ marginBottom: 16 }} />
      <Typography variant="h6">{message}</Typography>
      {description && (
        <Typography variant="body2" mt={1}>
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default EmptyState;
