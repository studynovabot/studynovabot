// Import Material-UI theme utilities
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007FFF', // Blue for primary components
    },
    secondary: {
      main: '#FF4081', // Pink for secondary components
    },
    background: {
      default: '#f5f5f5', // Light gray background
      paper: '#ffffff', // Card and container background
    },
    text: {
      primary: '#333333', // Dark text
      secondary: '#666666', // Muted text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none', // Disable uppercase buttons
    },
  },
});

export default theme;