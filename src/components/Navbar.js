import React, { useContext, useEffect } from 'react';
import { AppBar, Toolbar, Button, styled, Switch, FormControlLabel, IconButton } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import currencyService from '../services/currrency';
import { AddCurrencies, setLoading } from '../store/currenciesSlice';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

const navItems = [
  { label: "Home", to: "/" },
  { label: "Exchange rates live", to: "/exchange_rates_live" },
];

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  marginRight: '10px',
};

const activeStyle = {
  backgroundColor: '#032d6e',
};


function Navbar({toggleDrawer}) {
  
  const dispatch = useDispatch()
  const { toggleTheme, mode } = useContext(ThemeContext);

  const getCurrenciesList = async () => {
    dispatch(setLoading(true))
    try {
      const response = await currencyService.GetCurrencyFetch();
      if (response.status === 200) {
        const NewData = Object.keys(response?.data?.conversion_rates).map((key) => {
          return {name: key, rate: parseFloat(response?.data?.conversion_rates[key].toFixed(2))}
        })  
        dispatch(AddCurrencies(NewData))
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    getCurrenciesList()
  }, [])

  return (
    <AppBar position="sticky">
      <div className='flex items-center justify-between sm:pl-6 pl-4 h-14 sm:h-auto'>
            <div className='sm:hidden flex'>
            <IconButton onClick={toggleDrawer}>
              <MenuIcon sx={{ color: "white"}}/>
            </IconButton>
          </div>
        <Link to="/" className='text-xl'>Loan Calculator</Link>

        <div className='flex items-center gap-2'>
          <div className='hidden sm:flex'>
            <Toolbar>
              {navItems.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  style={({ isActive }) => ({
                    ...linkStyle,
                    ...(isActive ? activeStyle : {}),
                    borderRadius: 4,
                    padding: '6px 12px',
                  })}
                  className="hover:bg-white/20 transition-colors"
                >
                  <span>{label}</span> 
                </NavLink>
              ))}
            </Toolbar>
          </div>
          <FormControlLabel
            control={
              <MaterialUISwitch 
                checked={mode === 'dark'}
                onChange={toggleTheme}
              />
            }
          />
        </div>

      </div>
    </AppBar>
  );
}

export default Navbar;
