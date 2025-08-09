import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar, AppBar, Typography, IconButton, Tooltip } from '@mui/material';
import { Menu as MenuIcon, Sun, Moon } from 'lucide-react';
import Sidebar from '../components/Dashboard/Sidebar';
import { useThemeContext } from '../context/ThemeContext';

const drawerWidth = 240;

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, toggleMode } = useThemeContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          zIndex: theme => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Personal Finance Dashboard
            </Typography>
          </Box>

          {/* Theme Toggle */}
          <Tooltip title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
            <IconButton onClick={toggleMode} color="inherit" size="small">
              {mode === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          ml: { sm: `${drawerWidth}px`, xs: 0 },
          px: { xs: 1.5, sm: 3 },
          py: { xs: 2, sm: 3 },
          mt: { xs: '64px', sm: '64px' },
          minHeight: '100vh',
          boxSizing: 'border-box',
          overflowX: 'hidden',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
