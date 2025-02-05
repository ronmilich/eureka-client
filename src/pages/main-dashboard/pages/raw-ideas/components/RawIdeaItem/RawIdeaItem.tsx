import { Box, Chip, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { RawIdea, UpdateRawIdeaParam } from 'src/common/models';
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

interface RawIdeaItemProps {
  rawIdea: RawIdea;
  onDelete?: (id: string) => void;
  onEdit?: () => void;
  onUpdate?: (rawIdea: RawIdea) => void;
}

const RawIdeaItem = ({ rawIdea, onDelete, onEdit, onUpdate }: RawIdeaItemProps) => {
  const { classes: c } = useStyles({ important: rawIdea.important });

  const { mutate: deleteRawIdea } = useMutation({
    mutationFn: (id: string) => api.rawIdeas.deleteRawIdea(id),
    onSuccess: (_, id) => onDelete?.(id),
  });

  const { mutate: updateRawIdea } = useMutation({
    mutationFn: (data: UpdateRawIdeaParam) => api.rawIdeas.updateRawIdea(data.id, data.body),
    onSuccess: (data) => onUpdate?.(data),
  });

  return (
    <Box className={c.item}>
      <Typography variant="caption" color="textDisabled" className={c.date}>
        {dayjs(rawIdea.createdAt).format('DD/MM/YYYY')}
      </Typography>
      <Box className={c.body}>
        <Box className={c.title}>
          <Typography className={c.titleText}>{rawIdea.title}</Typography>
          <Typography variant="caption" color="textDisabled" className={c.categoryText}>
            ({rawIdea.category})
          </Typography>
          <IconButton
            size="small"
            className={c.iconBtn}
            onClick={() =>
              updateRawIdea({ id: rawIdea.id, body: { important: !rawIdea.important } })
            }
          >
            <StarIcon className={c.importantIcon} />
          </IconButton>
        </Box>

        <Typography variant="body2" color="textSecondary">
          {rawIdea.description}
        </Typography>

        <Box className={c.tags}>
          {rawIdea.tags.map((tag) => (
            <Chip key={tag.id} label={tag.name} sx={{ bgcolor: TAG_COLORS[tag.color] }} />
          ))}
          <TagManagerButton
            defaultSelection={rawIdea.tags.map((tag) => tag.id)}
            onClose={(tags) => {
              if (tags !== null) {
                updateRawIdea({ id: rawIdea.id, body: { tags } });
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
        <IconButton onClick={() => deleteRawIdea(rawIdea.id)} size="small" className={c.iconBtn}>
          <DeleteIcon />
        </IconButton>
        <IconButton size="small" onClick={onEdit} className={c.iconBtn}>
          <EditIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RawIdeaItem;

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
    title: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    date: { marginRight: theme.spacing(1), marginTop: theme.spacing(0.1) },
    titleText: { marginRight: theme.spacing(1), fontWeight: 700 },
    categoryText: { marginRight: theme.spacing(1) },
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
