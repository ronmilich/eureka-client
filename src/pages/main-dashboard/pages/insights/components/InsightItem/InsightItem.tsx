import { Box, Chip, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Insight, UpdateInsightParam } from 'src/common/models';
import { tss } from 'tss-react/mui';
import {
  Star as StarIcon,
  Delete as DeleteIcon,
  ModeEdit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { TAG_COLORS } from 'src/common/constants';
import TagManagerButton from 'src/common/components/TagManager/TagManagerButton';
import { useMutation } from '@tanstack/react-query';
import api from 'src/common/api';

interface InsightItemProps {
  insight: Insight;
  onDelete?: (id: string) => void;
  onEdit: () => void;
  onUpdate?: (insight: Insight) => void;
}

const InsightItem = ({ insight, onDelete, onEdit, onUpdate }: InsightItemProps) => {
  const { classes: c } = useStyles({ important: insight.important });

  const { mutate: deleteInsight } = useMutation({
    mutationFn: (id: string) => api.insights.deleteInsight(id),
    onSuccess: (_, id) => onDelete?.(id),
  });

  const { mutate: updateInsight } = useMutation({
    mutationFn: (data: UpdateInsightParam) => api.insights.updateInsight(data.id, data.body),
    onSuccess: (data) => onUpdate?.(data),
  });

  return (
    <Box className={c.item}>
      <Box className={c.leftSide}>
        <Typography variant="caption" color="textDisabled">
          {dayjs(insight.createdAt).format('DD/MM/YYYY')}
        </Typography>
        <IconButton
          size="small"
          className={c.iconBtn}
          onClick={() => updateInsight({ id: insight.id, body: { important: !insight.important } })}
        >
          <StarIcon className={c.importantIcon} />
        </IconButton>
      </Box>
      <Box className={c.body}>
        <Typography className={c.text}>{insight.text}</Typography>
        <Box className={c.tags}>
          {insight.tags.map((tag) => (
            <Chip key={tag.id} label={tag.name} sx={{ bgcolor: TAG_COLORS[tag.color] }} />
          ))}
          <TagManagerButton
            defaultSelection={insight.tags.map((tag) => tag.id)}
            onClose={(tags) => {
              if (tags !== null) {
                updateInsight({ id: insight.id, body: { tags } });
              }
            }}
          >
            <Chip
              className={c.newTag}
              label={
                <Box className={c.newTagContent}>
                  <Typography variant="caption">Add Tag</Typography>
                  <AddIcon sx={{ fontSize: 16 }} />
                </Box>
              }
            />
          </TagManagerButton>
        </Box>
      </Box>

      <Box className={c.actions}>
        <IconButton onClick={() => deleteInsight(insight.id)} size="small" className={c.iconBtn}>
          <DeleteIcon />
        </IconButton>
        <IconButton size="small" onClick={onEdit} className={c.iconBtn}>
          <EditIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default InsightItem;

const useStyles = tss
  .withParams<{ important: boolean }>()
  .withNestedSelectors<'actions' | 'newTag'>()
  .create(({ theme, important, classes }) => ({
    newTag: {
      display: 'none',
    },
    newTagContent: {
      display: 'flex',
      alignItems: 'center',
      opacity: 0.5,
    },
    item: {
      position: 'relative',
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1),
      width: 900,
      display: 'flex',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      borderRadius: 4,
      [`&:hover .${classes.actions}`]: {
        display: 'flex',
      },
      [`&:hover .${classes.newTag}`]: {
        display: 'flex',
      },
    },
    leftSide: {
      marginTop: 1,
      marginRight: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    iconBtn: {
      padding: 0,
      color: theme.palette.text.disabled,
      width: 'fit-content',
      height: 'fit-content',
    },
    importantIcon: {
      color: important ? 'gold' : theme.palette.text.disabled,
    },
    body: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    tags: {
      display: 'flex',
      gap: theme.spacing(1),
      marginTop: theme.spacing(0.5),
    },
    text: { marginRight: theme.spacing(6) },
    actions: {
      position: 'absolute',
      top: 8,
      right: 8,
      marginLeft: 'auto',
      display: 'none',
      height: 'fit-content',
      gap: theme.spacing(0.75),
    },
  }));
