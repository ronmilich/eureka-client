import { Box, Typography } from '@mui/material';
import { SlimIdea } from 'src/common/models';
import { convertDays } from 'src/common/utils';

interface SlimIdeasTableFeasibilityCellProps {
  slimIdea: SlimIdea;
}

const SlimIdeasTableFeasibilityCell = ({ slimIdea }: SlimIdeasTableFeasibilityCellProps) => {
  return (
    <Box sx={{ height: '100%', alignContent: 'center' }}>
      {slimIdea.feasibility ? (
        <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
          {slimIdea.feasibility?.difficulty} -{' '}
          {convertDays(slimIdea.feasibility?.estimatedDevelopmentTime)}
        </Typography>
      ) : (
        <Typography variant="body2" noWrap>
          Not Defined
        </Typography>
      )}
    </Box>
  );
};

export default SlimIdeasTableFeasibilityCell;
