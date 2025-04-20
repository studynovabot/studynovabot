'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

export default function App({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline ensures consistent styling across browsers */}
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}