import { Box } from '@mui/material';
import { Route, Routes } from 'react-router';
import IdeasHomepage from './pages/home-page/IdeasHomepage';

const IdeasDashboard = () => {
  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
      <Routes>
        <Route path="/" element={<IdeasHomepage />} />
        <Route path="/" element={<></>} />
      </Routes>
    </Box>
  );
};

export default IdeasDashboard;
