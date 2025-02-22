import { Box, Divider, IconButton, Menu, Typography } from '@mui/material';
import { TAG_COLORS } from 'src/common/constants';
import { SlimIdea } from 'src/common/models';
import { Info as InfoIcon } from '@mui/icons-material';
import { usePopup } from 'src/common/hooks';
import { useNavigate } from 'react-router';

interface SlimIdeasTableOverviewCellProps {
  slimIdea: SlimIdea;
}

const SlimIdeasTableOverviewCell = ({
  slimIdea: { details, metadata, id },
}: SlimIdeasTableOverviewCellProps) => {
  const [open, anchorEl, handleOpen, handleClose] = usePopup();
  const navigate = useNavigate();

  return (
    <Box sx={{ height: '100%', alignContent: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          onClick={() => navigate(`/ideas-dashboard/${id}`)}
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
          {details.title}
        </Typography>

        <IconButton size="small" color="primary" onClick={handleOpen}>
          <InfoIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
          {details.serviceType}
        </Typography>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <Typography variant="body2" noWrap sx={{ textTransform: 'capitalize' }}>
          {metadata.status}
        </Typography>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {metadata.tags.length > 0 ? (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {metadata.tags.map((tag) => (
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
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}>
        <Box sx={{ px: 1, width: 350 }}>
          <Typography variant="body1">{details.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {details.shortDescription}
          </Typography>
        </Box>
      </Menu>
    </Box>
  );
};

export default SlimIdeasTableOverviewCell;
