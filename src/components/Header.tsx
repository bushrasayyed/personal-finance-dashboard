import { useState, type MouseEvent } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Stack,
  useMediaQuery,
  useTheme,
  Tooltip,
} from '@mui/material';
import { ChevronDown, Menu as MenuIcon, Moon, Sun } from 'lucide-react';
import { useThemeContext } from '../context/ThemeContext';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { mode, toggleMode } = useThemeContext();

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        py: 2,
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {/* Left side: Menu button on mobile */}
      <Stack direction="row" alignItems="center" spacing={1}>
        {isMobile && onMenuClick && (
          <IconButton onClick={onMenuClick} color="inherit" size="small">
            <MenuIcon size={20} />
          </IconButton>
        )}

        {isMobile && (
          <Typography variant="h6" fontWeight="bold" textTransform="uppercase" color="primary">
            Finance Dashboard
          </Typography>
        )}
      </Stack>

      {/* Right side- theme toggle and profile dropdown */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
          <IconButton onClick={toggleMode} color="inherit" size="small">
            {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>
        </Tooltip>

        <Avatar sx={{ width: 32, height: 32 }}>BS</Avatar>
        {!isMobile && <Typography fontWeight={500}>Bushra Sayyed</Typography>}
        <IconButton size="small" onClick={handleOpen}>
          <ChevronDown size={18} />
        </IconButton>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleClose}>Notifications</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

export default Header;
