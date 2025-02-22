import { Box, Tooltip, Typography } from '@mui/material';
import { SlimIdea } from 'src/common/models';
import { convertDays } from 'src/common/utils';

interface SlimIdeasTableFeasibilityCellProps {
  slimIdea: SlimIdea;
}

const SlimIdeasTableFeasibilityCell = ({
  slimIdea: { feasibility },
}: SlimIdeasTableFeasibilityCellProps) => {
  return (
    <Box sx={{ height: '100%', alignContent: 'center' }}>
      {feasibility ? (
        <Tooltip
          title={
            feasibility?.estimatedDevelopmentTime
              ? convertDays(feasibility?.estimatedDevelopmentTime)
              : null
          }
        >
          <Typography
            width="fit-content"
            variant="body2"
            noWrap
            sx={(theme) => ({
              textTransform: 'capitalize',
              color: feasibility?.estimatedDevelopmentTime ? theme.palette.primary.main : 'default',
            })}
          >
            {feasibility?.difficulty}
          </Typography>
        </Tooltip>
      ) : (
        <Typography variant="body2" noWrap>
          Not Defined
        </Typography>
      )}
    </Box>
  );
};

export default SlimIdeasTableFeasibilityCell;
