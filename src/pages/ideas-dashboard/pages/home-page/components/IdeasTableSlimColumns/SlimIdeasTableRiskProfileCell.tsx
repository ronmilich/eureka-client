import { Box, Typography } from '@mui/material';
import { SlimIdea } from 'src/common/models';

interface SlimIdeasTableRiskProfileCellProps {
  slimIdea: SlimIdea;
}

const SlimIdeasTableRiskProfileCell = ({ slimIdea }: SlimIdeasTableRiskProfileCellProps) => {
  const riskProfileExists =
    slimIdea.riskProfile &&
    slimIdea.riskProfile.challenges > 0 &&
    slimIdea.riskProfile.constraints > 0 &&
    slimIdea.riskProfile.risks > 0;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        gap: 2.5
      }}
    >
      {riskProfileExists ? (
        <>
          <Typography variant="body2" title="Constraints" >
            {slimIdea.riskProfile?.constraints} C
          </Typography>
          <Typography variant="body2" title="Risks">
            {slimIdea.riskProfile?.risks} R
          </Typography>
          <Typography variant="body2" title="Challenges">
            {slimIdea.riskProfile?.challenges} CH
          </Typography>
        </>
      ) : (
        <Typography variant="body2">Not Defined</Typography>
      )}
    </Box>
  );
};

export default SlimIdeasTableRiskProfileCell;
