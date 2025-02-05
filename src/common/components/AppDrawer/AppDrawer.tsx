import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  listItemIconClasses,
  listItemTextClasses,
  listItemButtonClasses,
} from '@mui/material';
import { Insights, PsychologyAlt, Gesture, SpeakerNotes, QueryStats } from '@mui/icons-material';
import { tss } from 'tss-react/mui';
import { useNavigate } from 'react-router';
import { appDrawer } from 'src/common/store';

const navigationItems = [
  {
    label: 'Queries',
    Icon: QueryStats,
    path: '/main-dashboard/queries',
  },
  {
    label: 'Problems',
    Icon: PsychologyAlt,
    path: '/main-dashboard/problems',
  },
  {
    label: 'Insights',
    Icon: Insights,
    path: '/main-dashboard/insights',
  },
  {
    label: 'Raw Ideas',
    Icon: Gesture,
    path: '/main-dashboard/raw-ideas',
  },
  {
    label: 'General Notes',
    Icon: SpeakerNotes,
    path: '/main-dashboard/notes',
  },
];

const AppDrawer = () => {
  const { classes: c } = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={`${c.drawer} ${appDrawer.value ? '' : c.closed}`}>
      <List>
        {navigationItems.map(({ label, Icon, path }) => (
          <ListItem key={label} disablePadding className={c.item}>
            <ListItemButton
              onClick={() => navigate(path)}
              selected={window.location.pathname.startsWith(path)}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={label}
                hidden={!appDrawer.value}
                slotProps={{
                  primary: { variant: 'body1' },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AppDrawer;

const useStyles = tss.create(({ theme }) => ({
  drawer: {
    width: theme.spacing(30),
    flexShrink: 0,
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    borderRight: `1px solid ${theme.palette.divider}`,
    overflow: 'hidden',
  },
  closed: {
    width: theme.spacing(9),
  },
  item: {
    padding: theme.spacing(0, 1),
    [`& .${listItemButtonClasses.root}`]: {
      height: theme.spacing(6),
      borderRadius: 8,
    },
    [`& .${listItemButtonClasses.selected} .${listItemIconClasses.root}`]: {
      color: theme.palette.primary.main,
    },
    [`& .${listItemButtonClasses.selected} .${listItemTextClasses.primary}`]: {
      color: theme.palette.primary.main,
    },
    [`& .${listItemIconClasses.root}`]: {
      minWidth: 0,
      justifyContent: 'center',
      marginRight: theme.spacing(1.5),
    },
  },
}));
