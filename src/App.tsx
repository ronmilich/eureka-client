import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import api from './common/api';
import { AuthStateActions } from './common/store';
import { Route, Routes } from 'react-router';
import LoginPage from './pages/login-page/LoginPage';
import { ProtectedRoute } from './common/components/ProtectedRoute/ProtectedRoute';

import MainDashboard from './pages/main-dashboard/Main-Dashboard';

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
              <Routes>
                <Route path="/main-dashboard/*" element={<MainDashboard />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
