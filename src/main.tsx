import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import TicTacToe from './components/TicTacToe.tsx';
import { ThemeProvider } from '@mui/material';
import { LightTheme } from './Themes.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={LightTheme}>
      <TicTacToe />
    </ThemeProvider>
  </StrictMode>
);
