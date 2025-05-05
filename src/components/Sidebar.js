import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function Sidebar({ open, toggleDrawer }) {
  return (
    <Drawer anchor="left" open={open} onClose={toggleDrawer}>
      <List sx={{ width: 250 }}>
        {['Home', 'About', 'Contact'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
