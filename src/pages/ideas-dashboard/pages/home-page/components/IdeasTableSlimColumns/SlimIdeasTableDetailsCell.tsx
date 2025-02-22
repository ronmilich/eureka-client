import { Box, Tooltip, Typography } from '@mui/material';
import { SlimIdea } from 'src/common/models';
import {
  EmojiPeople as EmojiPeopleIcon,
  Map as MapIcon,
  SportsKabaddi as SportsKabaddiIcon,
  MonetizationOn as MonetizationOnIcon,
  Domain as DomainIcon,
} from '@mui/icons-material';
import { tss } from 'tss-react/mui';

interface SlimIdeasTableDetailsCellProps {
  slimIdea: SlimIdea;
}

const SlimIdeasTableDetailsCell = ({
  slimIdea: {
    targetAudience,
    roadmap,
    competitiveAnalysis,
    monetizationStrategies,
    marketAnalysis,
  },
}: SlimIdeasTableDetailsCellProps) => {
  const { classes: c } = useStyles();

  return (
    <Box className={c.cell}>
      {/* TARGET AUDIENCE */}
      <Tooltip title={targetAudience > 0 ? `Target Audience: ${targetAudience} Items ` : null}>
        <EmojiPeopleIcon
          sx={(theme) => ({
            cursor: 'pointer',
            color: targetAudience > 0 ? '#1abc9c' : theme.palette.grey[700],
          })}
        />
      </Tooltip>

      {/* ROADMAP */}
      <Tooltip
        title={
          roadmap && roadmap?.milestones > 0
            ? `Roadmap: ${roadmap.milestones} Milestones${
                roadmap.targetLaunchDate ? ` | Launch Date: ${roadmap.targetLaunchDate}` : ''
              }`
            : null
        }
      >
        <MapIcon
          sx={(theme) => ({
            cursor: 'pointer',
            color: roadmap && roadmap?.milestones > 0 ? '#2980b9' : theme.palette.grey[700],
          })}
        />
      </Tooltip>

      {/* Competitors */}
      <Tooltip
        title={
          competitiveAnalysis && competitiveAnalysis.competitors > 0
            ? `Competitors: ${competitiveAnalysis.competitors} Found`
            : null
        }
      >
        <SportsKabaddiIcon
          sx={(theme) => ({
            cursor: 'pointer',
            color:
              competitiveAnalysis && competitiveAnalysis.competitors > 0
                ? '#f39c12'
                : theme.palette.grey[700],
          })}
        />
      </Tooltip>

      {/* MONETIZATION STRATEGIES */}
      <Tooltip
        title={
          monetizationStrategies > 0
            ? `Monetization Strategies: ${monetizationStrategies} Items`
            : null
        }
      >
        <MonetizationOnIcon
          sx={(theme) => ({
            cursor: 'pointer',
            color: monetizationStrategies > 0 ? '#9b59b6' : theme.palette.grey[700],
          })}
        />
      </Tooltip>

      {/* MARKET ANALYSIS */}
      <Tooltip
        title={
          marketAnalysis ? (
            <Box>
              <Typography sx={{ textDecoration: 'underline' }}>Market Analysis</Typography>
              <Box>Sector: {marketAnalysis.sector}</Box>
              {marketAnalysis.subSector && <Box>Sub Sector: {marketAnalysis.subSector}</Box>}
              {marketAnalysis.marketSize && <Box>Market Size: {marketAnalysis.marketSize}</Box>}
            </Box>
          ) : null
        }
      >
        <DomainIcon
          sx={(theme) => ({
            cursor: 'pointer',
            color: marketAnalysis ? '#e74c3c' : theme.palette.grey[700],
          })}
        />
      </Tooltip>
    </Box>
  );
};

export default SlimIdeasTableDetailsCell;

const useStyles = tss.create(() => ({
  cell: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
}));
