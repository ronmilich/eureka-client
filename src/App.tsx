import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import api from './common/api';
import { AuthStateActions } from './common/store';
import { Route, Routes } from 'react-router';
import LoginPage from './pages/login-page/LoginPage';

import MainDashboard from './pages/main-dashboard/Main-Dashboard';
import { ProtectedRoute } from './common/components';
import IdeasDashboard from './pages/ideas-dashboard/IdeasDashboard';
import AppLayout from './pages/AppLayout';

function App() {
  const { isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const user = await api.auth.getUserDetals();
      AuthStateActions.setUser(user);
      return user;
    },
    retry: false,
  });

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
