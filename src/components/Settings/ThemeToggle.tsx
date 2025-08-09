import { Box, Switch, Typography } from '@mui/material';
import { useThemeContext } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { mode, toggleMode } = useThemeContext();

  const isDark = mode === 'dark';

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" maxWidth={300}>
      <Typography>{isDark ? 'Dark Mode' : 'Light Mode'}</Typography>
      <Switch checked={isDark} onChange={toggleMode} color="primary" />
    </Box>
  );
};

export default ThemeToggle;
