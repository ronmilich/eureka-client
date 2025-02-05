import { Box, IconButton, Typography } from '@mui/material';
import { tss } from 'tss-react/mui';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from 'src/common/api';
import { AddCircle as AddProblemIcon } from '@mui/icons-material';
import { Insight } from 'src/common/models';
import InsightItem from './components/InsightItem/InsightItem';
import { useState } from 'react';
import { InsightsFormDialog } from 'src/common/modals';

const InsightsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editInsight, setEditInsight] = useState<Insight | null>(null);
  const { classes: c } = useStyles();
  const queryClient = useQueryClient();

  const { data: insights } = useQuery({
    queryKey: ['insights'],
    queryFn: api.insights.getInsights,
    initialData: [],
  });

  const onCloseModal = () => {
    setEditInsight(null);
    setIsModalOpen(false);
  };

  return (
    <Box className={c.page}>
      <Box className={c.title}>
        <Typography variant="h4">Insights</Typography>
        <IconButton onClick={() => setIsModalOpen(true)} className={c.addBtn}>
          <AddProblemIcon />
        </IconButton>
      </Box>

      {insights.map((insight) => (
        <InsightItem
          key={insight.id}
          insight={insight}
          onEdit={() => {
            setEditInsight(insight);
            setIsModalOpen(true);
          }}
          onDelete={(id) => {
            queryClient.setQueryData(['insights'], (old: Insight[]) =>
              old.filter((insight) => insight.id !== id)
            );
          }}
          onUpdate={(data) => {
            queryClient.setQueryData(['insights'], (old: Insight[]) =>
              old.map((insight) => (insight.id === data.id ? data : insight))
            );
          }}
        />
      ))}

      {isModalOpen && (
        <InsightsFormDialog onClose={onCloseModal} open={isModalOpen} item={editInsight} />
      )}
    </Box>
  );
};

export default InsightsPage;

const useStyles = tss.create(({ theme }) => ({
  page: {
    padding: theme.spacing(2),
    width: '100%',
  },
  title: { marginBottom: theme.spacing(3), display: 'flex', alignItems: 'center' },
  content: {
    width: '100%',
  },
  addBtn: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));
