import { DarkMode, LightMode } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { Route, Routes } from 'react-router';
import { appMode, uiStateActions } from 'src/common/store';
import IdeasDashboardHeader from 'src/pages/ideas-dashboard/components/IdeasDashboardHeader/IdeasDashboardHeader';
import MainDashboardHeader from 'src/pages/main-dashboard/components/MainDashboardHeader/MainDashboardHeader';
import { tss } from 'tss-react/mui';

const AppHeader = () => {
  const { classes: c } = useStyles();

  return (
    <Box className={c.header}>
      <Routes>
        <Route path="/main-dashboard/*" element={<MainDashboardHeader />} />
        <Route path="/ideas-dashboard/*" element={<IdeasDashboardHeader />} />
      </Routes>

      <Box className={c.alignment}>
        <IconButton onClick={() => uiStateActions.toggleMode()}>
          {appMode.value === 'light' ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default AppHeader;

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
