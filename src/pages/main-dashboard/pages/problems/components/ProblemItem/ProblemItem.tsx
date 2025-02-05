import { Box, Chip, Collapse, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Problem, ProblemPriority, UpdateProblemParam } from 'src/common/models';
import { tss } from 'tss-react/mui';
import {
  Add as AddProblemIcon,
  Star as StarIcon,
  KeyboardDoubleArrowUp as HighPriorityIcon,
  KeyboardDoubleArrowDown as LowPriorityIcon,
  Remove as RegularPriorityIcon,
  Delete as DeleteIcon,
  ModeEdit as EditIcon,
} from '@mui/icons-material';
import { TAG_COLORS } from 'src/common/constants';
import TagManagerButton from 'src/common/components/TagManager/TagManagerButton';
import { useMutation } from '@tanstack/react-query';
import api from 'src/common/api';

export interface ProblemItemProps {
  problem: Problem;
  onDelete?: (id: string) => void;
  onEdit?: () => void;
  onUpdate?: (problem: Problem) => void;
}

const ProblemItem = ({ problem, onEdit, onDelete, onUpdate }: ProblemItemProps) => {
  const { classes: c } = useStyles({ important: problem.important, priority: problem.priority });
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { mutate: deleteProblem } = useMutation({
    mutationFn: (id: string) => api.problems.deleteProblem(id),
    onSuccess: (_, id) => onDelete?.(id),
  });

  const { mutate: updateProblem } = useMutation({
    mutationFn: (data: UpdateProblemParam) => api.problems.updateProblem(data.id, data.body),
    onSuccess: (updatedProblem) => onUpdate?.(updatedProblem),
  });

  const PriorityIcon =
    problem.priority === 'high'
      ? HighPriorityIcon
      : problem.priority === 'low'
      ? LowPriorityIcon
      : RegularPriorityIcon;

  const onUpdatePriority = async (priority: ProblemPriority) => {
    await updateProblem({
      id: problem.id,
      body: { priority: priority === 'low' ? 'regular' : priority === 'regular' ? 'high' : 'low' },
    });
  };

  return (
    <Box className={c.item}>
      <Box className={c.leftSide}>
        <Typography variant="caption" color="textDisabled" className={c.dateText}>
          {dayjs(problem.createdAt).format('DD/MM/YYYY')}
        </Typography>
        <Box className={c.icons}>
          <IconButton
            title="Mark as important"
            size="small"
            className={c.iconBtn}
            onClick={() =>
              updateProblem({ id: problem.id, body: { important: !problem.important } })
            }
          >
            <StarIcon className={c.importantIcon} />
          </IconButton>
          <IconButton
            size="small"
            className={c.iconBtn}
            onClick={() => onUpdatePriority(problem.priority)}
          >
            <PriorityIcon className={c.priorityIcon} titleAccess={`${problem.priority} priority`} />
          </IconButton>
        </Box>
      </Box>
      <Box className={c.body}>
        <Typography sx={{ mr: 10 }}>{problem.title}</Typography>

        {problem.description && (
          <>
            <Collapse in={!isCollapsed}>
              <Typography className={c.description}>{problem.description}</Typography>
            </Collapse>
            <Typography
              variant="caption"
              onClick={() => setIsCollapsed((prev) => !prev)}
              className={c.toggleText}
            >
              {isCollapsed ? 'Show More' : 'Show Less'}
            </Typography>
          </>
        )}

        <Box className={c.tags}>
          {problem.tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              sx={{ bgcolor: TAG_COLORS[tag.color] }}
              onDelete={() =>
                updateProblem({
                  id: problem.id,
                  body: { tags: problem.tags.filter((t) => t.id !== tag.id).map((tag) => tag.id) },
                })
              }
            />
          ))}
          <TagManagerButton
            defaultSelection={problem.tags.map((tag) => tag.id)}
            onClose={(tags) => {
              if (tags !== null) {
                updateProblem({ id: problem.id, body: { tags } });
              }
            }}
          >
            <Chip
              className={c.newTag}
              label={
                <Box className={c.newTagContent}>
                  <Typography variant="caption">Add Tag</Typography>
                  <AddProblemIcon sx={{ fontSize: 16 }} />
                </Box>
              }
            />
          </TagManagerButton>
        </Box>
      </Box>

      <Box className={c.actions}>
        <IconButton onClick={() => deleteProblem(problem.id)} size="small" className={c.iconBtn}>
          <DeleteIcon />
        </IconButton>
        <IconButton size="small" onClick={onEdit} className={c.iconBtn}>
          <EditIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ProblemItem;

const useStyles = tss
  .withParams<{ important: boolean; priority: ProblemPriority }>()
  .withNestedSelectors<'actions' | 'newTag'>()
  .create(({ theme, important, priority, classes }) => ({
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
    body: {},
    dateText: {},
    toggleText: {
      cursor: 'pointer',
      color: theme.palette.primary.main,
    },
    description: {
      fontSize: 12,
      color: theme.palette.text.secondary,
    },
    leftSide: {
      marginRight: theme.spacing(2),
    },
    icons: {
      height: 'fit-content',
      display: 'flex',
      justifyContent: 'space-between',
    },
    importantIcon: {
      color: important ? 'gold' : theme.palette.text.disabled,
    },
    priorityIcon: {
      fill:
        priority === 'high'
          ? '#c62828'
          : priority === 'low'
          ? '#1e88e5'
          : theme.palette.text.disabled,
    },
    actions: {
      position: 'absolute',
      top: 8,
      right: 8,
      marginLeft: 'auto',
      display: 'none',
      height: 'fit-content',
      gap: theme.spacing(0.75),
    },
    iconBtn: {
      padding: 0,
      color: theme.palette.text.disabled,
    },
    tags: {
      display: 'flex',
      gap: theme.spacing(1),
      marginTop: theme.spacing(0.5),
    },
  }));
