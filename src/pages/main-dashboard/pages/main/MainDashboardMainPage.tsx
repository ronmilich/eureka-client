import { Box, Typography } from '@mui/material';
import { tss } from 'tss-react/mui';

const MainDashboardMainPage = () => {
  const { classes: c } = useStyles();

  return (
    <Box className={c.page}>
      <Box className={c.title}>
        <Typography variant="h4">Dashboard</Typography>
      </Box>
      <Box className={c.content}>
        <Typography variant="body1" color="textSecondary">
          Welcome to the main dashboard. Here you will create and manage the all the information,
          ideas, problems, and insights to help you find the best solutions.
        </Typography>
      </Box>
    </Box>
  );
};

export default MainDashboardMainPage;

const useStyles = tss.create(({ theme }) => ({
  page: {
    padding: theme.spacing(2),
    width: '100%',
  },
  title: { marginBottom: theme.spacing(3), display: 'flex', alignItems: 'center' },
  content: {
    width: '100%',
  },
}));
