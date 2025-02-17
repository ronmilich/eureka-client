import { Box, Divider, Typography } from '@mui/material';
import { TAG_COLORS } from 'src/common/constants';
import { SlimIdea } from 'src/common/models';

interface SlimIdeasTableOverviewCellProps {
  slimIdea: SlimIdea;
}

const SlimIdeasTableOverviewCell = ({ slimIdea }: SlimIdeasTableOverviewCellProps) => {
  return (
    <Box sx={{ height: '100%', alignContent: 'center' }}>
      <Box>
        <Typography
          variant="body1"
          sx={(theme) => ({
            fontWeight: 'bold',
            '&:hover': {
              color: theme.palette.primary.main,
              cursor: 'pointer',
            },
          })}
          noWrap
        >
          {slimIdea.details.title}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" noWrap>
          {slimIdea.details.serviceType}
        </Typography>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <Typography variant="body2" noWrap>
          {slimIdea.metadata.status}
        </Typography>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {slimIdea.metadata.tags.length > 0 ? (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {slimIdea.metadata.tags.map((tag) => (
              <Box
                title={tag.name}
                key={tag.id}
                sx={{ bgcolor: TAG_COLORS[tag.color], width: 16, height: 16 }}
              ></Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" noWrap>
            No tags
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SlimIdeasTableOverviewCell;
