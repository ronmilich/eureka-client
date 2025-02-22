import { Box, Button, Chip, IconButton, TextField } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import api from 'src/common/api';
import { ideasListTableColDef } from './components/IdeasTableSlimColumns/IdeasListTableColDef';
import { useState } from 'react';
import { Search as SearchIcon, Clear as ClearIcon, Add as AddIcon } from '@mui/icons-material';
import { SelectFilterItem } from 'src/common/components/SelectFilter/SelectFilter';
import { SelectFilterButton } from 'src/common/components';
import { TAG_COLORS } from 'src/common/constants';
import { CreateIdeaDialog } from 'src/common/modals';

const IdeasHomepage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [tags, setTags] = useState<SelectFilterItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const { data: ideasSlim, isLoading } = useQuery({
    queryKey: ['slim-ideas'],
    queryFn: () => api.ideas.getIdeasSlim(),
  });

  useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await api.tags.getTags();
      setTags(
        res.map((tag) => ({ id: tag.id, label: tag.name, color: tag.color, selected: false }))
      );
      return res;
    },
  });

  return (
    <Box sx={{ height: '100%', width: '100%', padding: 2 }}>
      <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>
        <Box>
          <TextField
            value={searchValue}
            size="small"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            variant="outlined"
            sx={{ width: '300px', mr: 2 }}
            slotProps={{
              input: {
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                endAdornment: searchValue && (
                  <IconButton size="small" onClick={() => setSearchValue('')}>
                    <ClearIcon />
                  </IconButton>
                ),
              },
            }}
          />

          <SelectFilterButton
            filterName="Tags"
            data={tags}
            label={(item) => (
              <Chip
                label={item.label}
                sx={{ bgcolor: TAG_COLORS[item.color as keyof typeof TAG_COLORS] }}
              />
            )}
            onClose={(items) => items && setTags(items)}
          />
        </Box>
        <Button
          variant="contained"
          size="small"
          endIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Create Idea
        </Button>
      </Box>

      <DataGrid
        columns={ideasListTableColDef}
        rows={ideasSlim}
        loading={isLoading}
        rowSelection={false}
        hideFooter
        rowHeight={72}
        sx={{
          height: 'calc(100% - 48px)',
          mb: 2,
          [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
            outline: 'none',
          },
        }}
      />

      <CreateIdeaDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </Box>
  );
};

export default IdeasHomepage;
