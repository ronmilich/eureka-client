import { Box, IconButton } from '@mui/material';
import { SlimIdea } from 'src/common/models';
import {
  EmojiPeople as EmojiPeopleIcon,
  Map as MapIcon,
  SportsKabaddi as SportsKabaddiIcon,
  MonetizationOn as MonetizationOnIcon,
  CreditCard as CreditCardIcon,
  Domain as DomainIcon,
} from '@mui/icons-material';
import { tss } from 'tss-react/mui';

interface SlimIdeasTableDetailsCellProps {
  slimIdea: SlimIdea;
}

const SlimIdeasTableDetailsCell = ({ slimIdea }: SlimIdeasTableDetailsCellProps) => {
  const { classes: c } = useStyles();

  return (
    <Box className={c.cell}>
      <IconButton size="small" disabled={slimIdea.targetAudience === 0} className={c.btn}>
        <EmojiPeopleIcon />
      </IconButton>
      <IconButton size="small" className={c.btn}>
        <MapIcon />
      </IconButton>
      <IconButton size="small" className={c.btn}>
        <SportsKabaddiIcon />
      </IconButton>
      <IconButton size="small" className={c.btn}>
        <MonetizationOnIcon />
      </IconButton>
      <IconButton size="small" className={c.btn}>
        <DomainIcon />
      </IconButton>
    </Box>
  );
};

export default SlimIdeasTableDetailsCell;

const useStyles = tss.create(() => ({
  cell: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  btn: {
    // backgroundColor: 'red',
  },
}));
