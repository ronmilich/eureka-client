import { DarkMode, LightMode, Menu } from '@mui/icons-material';
import { Box, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import { appMode, uiStateActions } from 'src/common/store';
import { tss } from 'tss-react/mui';

const IdeasDashboardHeader = () => {
  const { classes: c } = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={c.header}>
      <Box className={c.alignment}>
        <IconButton onClick={() => uiStateActions.toggleDrawer()}>
          <Menu />
        </IconButton>
        <Button variant="text" onClick={() => navigate('/main-dashboard/problems')}>To Main Dashboard</Button>
      </Box>

      <Box className={c.alignment}>
        <IconButton onClick={() => uiStateActions.toggleMode()}>
          {appMode.value === 'light' ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default IdeasDashboardHeader;

const useStyles = tss.create(({ theme }) => ({
  header: {
    display: 'flex',
    width: '100%',
    height: theme.spacing(10),
    padding: theme.spacing(0, 2),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  alignment: {
    display: 'flex',
    alignItems: 'center',
  },
}));
