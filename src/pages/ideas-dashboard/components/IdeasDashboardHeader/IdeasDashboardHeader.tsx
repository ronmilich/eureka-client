import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';

const IdeasDashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button variant="text" onClick={() => navigate('/main-dashboard/problems')}>
        To Main Dashboard
      </Button>
    </Box>
  );
};

export default IdeasDashboardHeader;
