import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './index.css';
import App from './App'


const theme = createTheme({
  primaryColor: 'indigo',
  defaultRadius: 'md',
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider theme={theme} defaultColorScheme="dark">
        <Notifications position="top-right" />
        <HashRouter>
          <App />
        </HashRouter>
    </MantineProvider>
  </QueryClientProvider>
)
