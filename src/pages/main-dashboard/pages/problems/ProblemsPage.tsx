import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { tss } from 'tss-react/mui';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from 'src/common/api';
import ProblemItem from './components/ProblemItem/ProblemItem';
import {
  AddCircle as AddProblemIcon,
  UnfoldLess as UnfoldLessIcon,
  UnfoldMore as UnfoldMoreIcon,
  TableView as TableViewIcon,
  TableRows as TableRowsIcon,
} from '@mui/icons-material';
import { Problem } from 'src/common/models';
import { ProblemsFormDialog } from 'src/common/modals';
import ProblemItemMinimal from './components/ProblemItemMinimal/ProblemItemMinimal';

const ProblemsPage = () => {
  const { classes: c } = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProblem, setEditProblem] = useState<Problem | null>(null);
  const [isExpandedView, setIsExpandedView] = useState(
    window.localStorage.getItem('problems_expandedView') === 'expanded'
  );
  const [itemsMode, setItemsMode] = useState<'list' | 'table'>('list');
  const queryClient = useQueryClient();

  const { data: problems } = useQuery({
    queryKey: ['problems'],
    queryFn: api.problems.getProblems,
    initialData: [],
  });

  const onCloseModal = () => {
    setEditProblem(null);
    setIsModalOpen(false);
  };

  const CurrentItem = isExpandedView ? ProblemItem : ProblemItemMinimal;

  return (
    <Box className={c.page}>
      <Box className={c.title}>
        <Typography variant="h4">Problems</Typography>
        <Box className={c.actions}>
          <IconButton onClick={() => setIsModalOpen(true)} className={c.actionBtn}>
            <AddProblemIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setIsExpandedView((prev) => !prev);
              window.localStorage.setItem(
                'problems_expandedView',
                isExpandedView ? 'collapsed' : 'expanded'
              );
            }}
            className={c.actionBtn}
          >
            {isExpandedView ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
          </IconButton>
          <IconButton
            disabled
            onClick={() => setItemsMode((prev) => (prev === 'list' ? 'table' : 'list'))}
            className={c.actionBtn}
          >
            {itemsMode === 'list' ? <TableViewIcon /> : <TableRowsIcon />}
          </IconButton>
        </Box>
      </Box>

      {problems.map((problem) => (
        <CurrentItem
          key={problem.id}
          problem={problem}
          onEdit={() => {
            setEditProblem(problem);
            setIsModalOpen(true);
          }}
          onUpdate={(updatedProblem) => {
            queryClient.setQueryData(['problems'], (old: any) =>
              old.map((p: any) => (p.id === updatedProblem.id ? updatedProblem : p))
            );
          }}
          onDelete={(id) => {
            queryClient.setQueryData(['problems'], (old: any) =>
              old.filter((p: any) => p.id !== id)
            );
          }}
        />
      ))}

      {isModalOpen && (
        <ProblemsFormDialog onClose={onCloseModal} open={isModalOpen} item={editProblem} />
      )}
    </Box>
  );
};

export default ProblemsPage;

const useStyles = tss.create(({ theme }) => ({
  page: {
    padding: theme.spacing(2),
    width: '100%',
  },
  title: { marginBottom: theme.spacing(3), display: 'flex', alignItems: 'center' },
  content: {
    width: '100%',
  },
  actionBtn: {
    color: theme.palette.primary.main,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(1),
  },
}));
