import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AppTheme } from './common/components';
import { BrowserRouter } from 'react-router';
import { configureAxios } from './common/services';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

configureAxios();
const queryClient = new QueryClient();

if (window.localStorage.getItem('problems_expandedView') === undefined) {
  window.localStorage.setItem('problems_expandedView', 'expanded');
}

createRoot(document.getElementById('root')!).render(
  <AppTheme>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </AppTheme>
);
