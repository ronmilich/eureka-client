import { Box, Collapse, IconButton, svgIconClasses, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { ProblemPriority, UpdateProblemParam } from 'src/common/models';
import { tss } from 'tss-react/mui';
import {
  Add as AddIcon,
  Star as StarIcon,
  KeyboardDoubleArrowUp as HighPriorityIcon,
  KeyboardDoubleArrowDown as LowPriorityIcon,
  ArrowDownward as ArrowDownIcon,
  ArrowUpward as ArrowUpIcon,
  Remove as RegularPriorityIcon,
  Delete as DeleteIcon,
  ModeEdit as EditIcon,
} from '@mui/icons-material';
import { TAG_COLORS } from 'src/common/constants';
import TagManagerButton from 'src/common/components/TagManager/TagManagerButton';
import { useMutation } from '@tanstack/react-query';
import api from 'src/common/api';
import { ProblemItemProps } from '../ProblemItem/ProblemItem';

const ProblemItemMinimal = ({ problem, onEdit, onDelete, onUpdate }: ProblemItemProps) => {
  const { classes: c } = useStyles({ important: problem.important, priority: problem.priority });
  const [isCollapsed, setIsCollapsed] = useState(true);

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
      <Typography variant="caption" color="textDisabled" className={c.dateText}>
        {dayjs(problem.createdAt).format('DD/MM/YYYY')}
      </Typography>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 10 }}>
          <Typography>{problem.title}</Typography>
          <Box className={c.stats}>
            {problem.description && (
              <IconButton
                size="small"
                className={c.miniIcon}
                color="primary"
                onClick={() => setIsCollapsed((prev) => !prev)}
              >
                {isCollapsed ? <ArrowDownIcon /> : <ArrowUpIcon />}
              </IconButton>
            )}
            <IconButton
              size="small"
              className={c.miniIcon}
              onClick={() =>
                updateProblem({ id: problem.id, body: { important: !problem.important } })
              }
            >
              <StarIcon className={c.importantIcon} />
            </IconButton>
            <IconButton
              size="small"
              className={c.miniIcon}
              onClick={() => onUpdatePriority(problem.priority)}
            >
              <PriorityIcon
                className={c.priorityIcon}
                titleAccess={`${problem.priority} priority`}
              />
            </IconButton>
            <Box className={c.tags}>
              {problem.tags.map((tag) => (
                <Box
                  key={tag.id}
                  title={tag.name}
                  sx={{ bgcolor: TAG_COLORS[tag.color] }}
                  className={c.tag}
                ></Box>
              ))}
            </Box>

            <TagManagerButton
              defaultSelection={problem.tags.map((tag) => tag.id)}
              onClose={(tags) => {
                if (tags !== null) {
                  updateProblem({ id: problem.id, body: { tags } });
                }
              }}
            >
              <IconButton title="Add Tag" size="small" color="primary" className={c.miniIcon}>
                <AddIcon />
              </IconButton>
            </TagManagerButton>
          </Box>
        </Box>

        {problem.description && (
          <Collapse in={!isCollapsed}>
            <Typography className={c.description}>{problem.description}</Typography>
          </Collapse>
        )}
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

export default ProblemItemMinimal;

const useStyles = tss
  .withParams<{ important: boolean; priority: ProblemPriority }>()
  .withNestedSelectors<'actions'>()
  .create(({ theme, important, priority, classes }) => ({
    item: {
      position: 'relative',
      padding: theme.spacing(0.25, 0.25, 0.25, 1),
      width: 900,
      display: 'flex',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      borderRadius: 4,
      [`&:hover .${classes.actions}`]: {
        display: 'flex',
      },
    },
    dateText: {
      marginRight: theme.spacing(2),
      marginTop: 1,
      color: important ? 'gold' : theme.palette.text.secondary,
    },
    description: {
      fontSize: 12,
      color: theme.palette.text.secondary,
    },
    stats: {
      height: 'fit-content',
      alighItems: 'center',
      display: 'flex',
      marginLeft: theme.spacing(1),
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
      width: 16,
      height: 16,
      [`& .${svgIconClasses.root}`]: {
        fontSize: 16,
      },
    },
    tags: {
      display: 'flex',
      gap: theme.spacing(0.25),
    },
    tag: {
      width: 16,
      height: 16,
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
    miniIcon: {
      width: 16,
      height: 16,
      [`& .${svgIconClasses.root}`]: {
        fontSize: 16,
      },
    },
  }));
