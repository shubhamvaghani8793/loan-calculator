import { useState } from 'react';
import { Button, Container, IconButton, Typography } from '@mui/material';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import LiveRate from './pages/LiveRate';
import NotFound from './pages/NotFound';

function App() {
  
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);
  
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exchange_rates_live" element={<LiveRate />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
      </BrowserRouter>
      
        {/* <IconButton onClick={toggleDrawer} sx={{ m: 2 }}>
          <MenuIcon />
        </IconButton> */}
      
    </>
  );
}

export default App;
