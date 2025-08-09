import { Box, Typography, Divider, Stack, Paper } from '@mui/material';
import ThemeToggle from '../components/Settings/ThemeToggle';
import ResetAppButton from '../components/Settings/ResetAppButton';
import { useTheme } from '@mui/material/styles';

const Settings = () => {
  const theme = useTheme();

  return (
    <Box
      p={{ xs: 2, sm: 4 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor={theme.palette.background.default}
    >
      <Typography variant="h4" fontWeight="bold" mb={4} color="primary">
        Settings
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 5 },
          width: '100%',
          maxWidth: '600px',
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack spacing={4}>
          {/* Theme Toggle */}
          <Box>
            <Typography variant="subtitle1" gutterBottom fontWeight="600">
              Toggle Theme
            </Typography>
            <ThemeToggle />
          </Box>

          <Divider />

          {/* Reset Button */}
          <Box>
            <Typography variant="subtitle1" gutterBottom color="error" fontWeight="600">
              Delete All Transactions
            </Typography>
            <ResetAppButton />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Settings;
