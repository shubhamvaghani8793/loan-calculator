import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';

function Sidebar({ open, toggleDrawer }) {

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Exchange rates live", to: "/exchange_rates_live" },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer}>
  <List sx={{ width: 250 }}>
    {navItems.map(({ label, to }) => (
      <ListItem key={to} disablePadding>
        <NavLink
          to={to}
          style={({ isActive }) => ({
            display: 'block',
            width: '100%',
            padding: '8px 16px',
            textDecoration: 'none',
            color: isActive ? 'white' : 'inherit',
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            marginLeft: 12,
            marginBlock: 6,
            backgroundColor: isActive ? '#1976d2' : 'transparent',
          })}
          className="hover:bg-white/20 transition-colors"
          onClick={toggleDrawer} 
        >
          {label}
        </NavLink>
      </ListItem>
    ))}
  </List>
</Drawer>

  );
}

export default Sidebar;
