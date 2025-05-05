import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useContext, useEffect, useMemo, useState } from "react"

export const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {

  const [mode, setMode] = useState('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if(savedMode === 'light' || savedMode === 'dark') {
      setMode(savedMode);
    }
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const nextMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', nextMode);
      return nextMode;
    });
  }

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
} 
