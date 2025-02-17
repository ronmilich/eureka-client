import { Box } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import api from 'src/common/api';
import { ideasListTableColDef } from './components/IdeasTableSlimColumns/IdeasListTableColDef';

const IdeasHomepage = () => {
  const { data: ideasSlim, isLoading } = useQuery({
    queryKey: ['slim-ideas'],
    queryFn: () => api.ideas.getIdeasSlim(),
  });

  return (
    <Box sx={{ height: '100%', width: '100%', padding: 2 }}>
      <DataGrid
        columns={ideasListTableColDef}
        rows={ideasSlim}
        loading={isLoading}
        rowSelection={false}
        hideFooter
        rowHeight={72}
        sx={{
          width: '100%',
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
            outline: 'none',
          },
        }}
      />
    </Box>
  );
};

export default IdeasHomepage;
