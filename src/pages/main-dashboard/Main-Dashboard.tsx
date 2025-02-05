import { Box } from '@mui/material';
import { Route, Routes } from 'react-router';
import { AppDrawer, Header } from 'src/common/components';
import ProblemsPage from './pages/problems/ProblemsPage';
import InsightsPage from './pages/insights/InsightsPage';
import RawIdeasPage from './pages/raw-ideas/RawIdeasPage';
import QueriesPage from './pages/queries/QueriesPage';

const MainDashboard = () => {
  return (
    <Box sx={{ height: '100%' }}>
      <Header />
      <Box sx={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        <AppDrawer />
        <Routes>
          <Route path="problems" element={<ProblemsPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="raw-ideas" element={<RawIdeasPage />} />
          <Route path="queries" element={<QueriesPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default MainDashboard;
