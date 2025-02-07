import { Menu as MenuIcon } from '@mui/icons-material';
import { Box, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import { uiStateActions } from 'src/common/store';

const MainDashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton onClick={() => uiStateActions.toggleDrawer()}>
        <MenuIcon />
      </IconButton>
      <Button variant="text" onClick={() => navigate('/ideas-dashboard')}>
        To Ideas Dashboard
      </Button>
    </Box>
  );
};

export default MainDashboardHeader;
