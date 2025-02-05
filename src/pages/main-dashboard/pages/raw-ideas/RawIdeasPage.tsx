import { Box, IconButton, Typography } from '@mui/material';
import { tss } from 'tss-react/mui';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from 'src/common/api';
import { AddCircle as AddProblemIcon } from '@mui/icons-material';
import { RawIdea } from 'src/common/models';
import { useState } from 'react';
import { RawIdeasFormDialog } from 'src/common/modals';
import RawIdeaItem from './components/RawIdeaItem/RawIdeaItem';

const RawIdeasPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRawIdea, setEditRawIdea] = useState<RawIdea | null>(null);
  const { classes: c } = useStyles();
  const queryClient = useQueryClient();

  const { data: rawIdeas } = useQuery({
    queryKey: ['raw-ideas'],
    queryFn: api.rawIdeas.getRawIdeas,
    initialData: [],
  });

  const onCloseModal = () => {
    setEditRawIdea(null);
    setIsModalOpen(false);
  };

  return (
    <Box className={c.page}>
      <Box className={c.title}>
        <Typography variant="h4">Raw Ideas</Typography>
        <IconButton onClick={() => setIsModalOpen(true)} className={c.addBtn}>
          <AddProblemIcon />
        </IconButton>
      </Box>

      {rawIdeas.map((rawIdea) => (
        <RawIdeaItem
          key={rawIdea.id}
          rawIdea={rawIdea}
          onEdit={() => {
            setEditRawIdea(rawIdea);
            setIsModalOpen(true);
          }}
          onDelete={(id) => {
            queryClient.setQueryData(['raw-ideas'], (old: RawIdea[]) =>
              old.filter((rawIdea) => rawIdea.id !== id)
            );
          }}
          onUpdate={(data) => {
            queryClient.setQueryData(['raw-ideas'], (old: RawIdea[]) =>
              old.map((rawIdea) => (rawIdea.id === data.id ? data : rawIdea))
            );
          }}
        />
      ))}

      {isModalOpen && (
        <RawIdeasFormDialog onClose={onCloseModal} open={isModalOpen} item={editRawIdea} />
      )}
    </Box>
  );
};

export default RawIdeasPage;

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
