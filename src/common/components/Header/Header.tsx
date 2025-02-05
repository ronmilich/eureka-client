import { DarkMode, LightMode, Menu } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { appMode, uiStateActions } from 'src/common/store';
import { tss } from 'tss-react/mui';

const Header = () => {
  const { classes: c } = useStyles();

  return (
    <Box className={c.header}>
      <Box className={c.alignment}>
        <IconButton onClick={() => uiStateActions.toggleDrawer()}>
          <Menu />
        </IconButton>
        <Typography variant="h6">Hello Ron Milich</Typography>
      </Box>

      <Box className={c.alignment}>
        <IconButton onClick={() => uiStateActions.toggleMode()}>
          {appMode.value === 'light' ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;

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
