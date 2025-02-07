import { Box, Button, Chip, Divider, IconButton, TextField, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from 'src/common/api';
import SelectFilterButton from 'src/common/components/SelectFilter/SelectFilterButton';
import { TAG_COLORS } from 'src/common/constants';
import { tss } from 'tss-react/mui';
import {
  Search as SearchIcon,
  SwapVert as SwapIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import InsightItem from '../insights/components/InsightItem/InsightItem';
import RawIdeaItem from '../raw-ideas/components/RawIdeaItem/RawIdeaItem';
import ProblegtmItem from '../problems/components/ProblemItem/ProblemItem';
import { InsightsFormDialog, ProblemsFormDialog, RawIdeasFormDialog } from 'src/common/modals';
import { SelectFilterItem } from 'src/common/components/SelectFilter/SelectFilter';
import { useDebouncedValue } from 'src/common/hooks';
import { HighlightText } from 'src/common/components';

type Dialogs = 'none' | 'problems' | 'insights' | 'rawIdeas';

const QueriesPage = () => {
  const { classes: c } = useStyles();
  const [searchText, setSearchText] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const queryClient = useQueryClient();
  const [dialog, setDialog] = useState<Dialogs>('none');
  const [editItem, setEditItem] = useState<any>(null);
  const [tags, setTags] = useState<SelectFilterItem[]>([]);
  const [sections, setSections] = useState<SelectFilterItem[]>([
    { id: '1', label: 'Problems', selected: true, value: 'problems' },
    { id: '2', label: 'Insights', selected: true, value: 'insights' },
    { id: '3', label: 'Raw Ideas', selected: true, value: 'rawIdeas' },
  ]);

  const debouncedSearchText = useDebouncedValue(searchText, 800);

  const { isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const res = await api.tags.getTags();
      setTags(
        res.map((tag) => ({ id: tag.id, label: tag.name, color: tag.color, selected: false }))
      );
      return res;
    },
  });

  const { data: queries } = useQuery({
    enabled: !isLoading && !!sections.length,
    queryKey: ['queries', tags, sections, order, debouncedSearchText],
    queryFn: () =>
      api.queries.getQueries({
        searchText: debouncedSearchText,
        filters: {
          sections: sections.filter((s) => s.selected).map((s) => s.value as any),
          tags: tags.filter((t) => t.selected).map((t) => t.id),
        },
        sort: { property: 'createdAt', direction: order },
      }),
    initialData: { insights: [], problems: [], rawIdeas: [] },
  });

  const onDelete = (id: string, section: string) => {
    queryClient.setQueryData(
      ['queries', tags, sections, order, debouncedSearchText],
      (data: any) => ({
        ...data,
        [section]: data[section].filter((p: any) => p.id !== id),
      })
    );
  };

  const onUpdate = (newItem: any, section: string) => {
    queryClient.setQueryData(
      ['queries', tags, sections, order, debouncedSearchText],
      (data: any) => ({
        ...data,
        [section]: data[section].map((oldItem: any) =>
          oldItem.id === newItem.id ? newItem : oldItem
        ),
      })
    );
  };

  return (
    <Box className={c.page}>
      <Box className={c.title}>
        <Typography variant="h4">Queries</Typography>
      </Box>

      <Box className={c.actionsPanel}>
        <TextField
          value={searchText}
          size="small"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
          variant="outlined"
          sx={{ width: '300px' }}
          slotProps={{
            input: {
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              endAdornment: searchText && (
                <IconButton size="small" onClick={() => setSearchText('')}>
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
        <SelectFilterButton
          searchable={false}
          filterName="Section"
          data={sections}
          onClose={(items) => items && setSections(items)}
        />

        <Button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')} endIcon={<SwapIcon />}>
          {order === 'asc' ? 'Newest' : 'Oldest'}
        </Button>
      </Box>

      <Box
        sx={{ height: 'calc(100vh - 220px)', overflow: 'auto', pt: 2, scrollbarWidth: 'none' }}
        className={c.content}
      >
        {queries.problems?.map((problem) => (
          <ProblegtmItem
            key={problem.id}
            problem={problem}
            onDelete={(id) => onDelete(id, 'problems')}
            onEdit={() => {
              setEditItem(problem);
              setDialog('problems');
            }}
            onUpdate={(problem) => onUpdate(problem, 'problems')}
          />
        ))}

        <Divider sx={{ my: 2 }} />

        {queries.insights?.map((insight) => (
          <InsightItem
            key={insight.id}
            insight={insight}
            onDelete={(id) => onDelete(id, 'insights')}
            onEdit={() => {
              setEditItem(insight);
              setDialog('insights');
            }}
            onUpdate={(data) => onUpdate(data, 'insights')}
          />
        ))}
        <Divider sx={{ my: 2 }} />

        {queries.rawIdeas?.map((rawIdea) => (
          <RawIdeaItem
            key={rawIdea.id}
            rawIdea={rawIdea}
            onDelete={(id) => onDelete(id, 'rawIdeas')}
            onEdit={() => {
              setEditItem(rawIdea);
              setDialog('rawIdeas');
            }}
            onUpdate={(data) => onUpdate(data, 'rawIdeas')}
          />
        ))}
      </Box>

      {dialog === 'problems' ? (
        <ProblemsFormDialog
          item={editItem}
          onClose={() => {
            setEditItem(null);
            setDialog('none');
          }}
          open
        />
      ) : dialog === 'insights' ? (
        <InsightsFormDialog
          item={editItem}
          onClose={() => {
            setEditItem(null);
            setDialog('none');
          }}
          open
        />
      ) : dialog === 'rawIdeas' ? (
        <RawIdeasFormDialog
          item={editItem}
          onClose={() => {
            setEditItem(null);
            setDialog('none');
          }}
          open
        />
      ) : null}
    </Box>
  );
};

export default QueriesPage;

const useStyles = tss.create(({ theme }) => ({
  page: {
    padding: theme.spacing(2),
    width: '100%',
  },
  title: { marginBottom: theme.spacing(3), display: 'flex', alignItems: 'center' },
  content: {
    width: '100%',
  },
  actionsPanel: {
    display: 'flex',
    alighItems: 'center',
    gap: theme.spacing(2),
  },
}));
