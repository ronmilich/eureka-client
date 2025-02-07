import { Box } from '@mui/material';
import { Route, Routes } from 'react-router';
import ProblemsPage from './pages/problems/ProblemsPage';
import InsightsPage from './pages/insights/InsightsPage';
import RawIdeasPage from './pages/raw-ideas/RawIdeasPage';
import QueriesPage from './pages/queries/QueriesPage';
import MainDashboardDrawer from './components/MainDashboardDrawer/MainDashboardDrawer';
import MainDashboardMainPage from './pages/main/MainDashboardMainPage';

const MainDashboard = () => {
  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
      <MainDashboardDrawer />
      <Routes>
        <Route path="/" element={<MainDashboardMainPage />} />
        <Route path="problems" element={<ProblemsPage />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="raw-ideas" element={<RawIdeasPage />} />
        <Route path="queries" element={<QueriesPage />} />
      </Routes>
    </Box>
  );
};

export default MainDashboard;
