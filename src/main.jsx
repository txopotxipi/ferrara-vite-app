import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css' // Importamos nuestros estilos globales
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { esES } from '@mui/material/locale'; // For Spanish locale, optional
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Create a default theme (or customize it as needed)
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Example primary color
    },
    secondary: {
      main: '#dc004e', // Example secondary color
    },
    // The grey palette will be available by default
  },
}, esES); // Optional: Adds Spanish localization for MUI components like date pickers

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
