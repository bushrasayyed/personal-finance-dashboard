import { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { BarChart, Home, Layers } from 'lucide-react';

interface SidebarProps {
  onNavigate?: () => void;
}

const menuItems = [
  { label: 'Overview', icon: <Home size={20} /> },
  { label: 'Analytics', icon: <BarChart size={20} /> },
  { label: 'Services', icon: <Layers size={20} /> },
];

const Sidebar = ({ onNavigate }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState('Overview');

  const handleItemClick = (label: string) => {
    setActiveItem(label);
    if (onNavigate) onNavigate(); // Close drawer on mobile
  };

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Typography variant="h6" fontWeight="bold" textTransform="uppercase" mb={3} color="primary">
        Finance Dashboard
      </Typography>

      <List>
        {menuItems.map(({ label, icon }) => (
          <ListItemButton
            key={label}
            selected={activeItem === label}
            onClick={() => handleItemClick(label)}
            sx={{
              borderRadius: 1,
              mb: 1,
              color: activeItem === label ? 'primary.main' : 'text.primary',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: activeItem === label ? 'primary.main' : 'inherit',
                minWidth: 36,
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
