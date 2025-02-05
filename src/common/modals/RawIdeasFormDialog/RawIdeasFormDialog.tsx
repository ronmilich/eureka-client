import {
  Autocomplete,
  Box,
  Button,
  Chip,
  createFilterOptions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import api from 'src/common/api';
import { RawIdea, RawIdeaCategory, Tag } from 'src/common/models';
import { tss } from 'tss-react/mui';
import TagsFormDialog from '../TagsFormDialog/TagsFormDialog';
import { TAG_COLORS } from 'src/common/constants';

interface RawIdeaForm {
  title: string;
  description: string;
  important: boolean;
  tags: Tag[];
  category?: RawIdeaCategory;
}

interface RawIdeasFormDialogProps {
  onClose: () => void;
  open: boolean;
  item: RawIdea | null;
}

const RawIdeasFormDialog = ({ onClose, open, item }: RawIdeasFormDialogProps) => {
  const [tagsDialogOpen, setTagsDialogOpen] = useState(false);
  const { register, formState, control, getValues } = useForm<RawIdeaForm>({
    defaultValues: {
      title: item?.title || '',
      description: item?.description || '',
      important: item?.important || false,
      tags: item?.tags || [],
      category: item?.category || 'regular',
    },
  });
  const { classes: c } = useStyles();
  const queryClient = useQueryClient();

  const filter = createFilterOptions<Tag>();

  const { mutate: createRawIdea } = useMutation({
    mutationFn: (data: any) => api.rawIdeas.createRawIdea(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['raw-ideas'], (old: RawIdea[]) => [data, ...old]);
      onClose();
    },
  });

  const { mutate: updateRawIdea } = useMutation({
    mutationFn: (data: any) => api.rawIdeas.updateRawIdea(item!.id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(['raw-ideas'], (old: RawIdea[]) =>
        old.map((r) => (r.id === data.id ? data : r))
      );
      onClose();
    },
  });

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: api.tags.getTags,
    initialData: [],
  });

  const onSubmit = async () => {
    const formValues = getValues();
    const data = { ...formValues, tags: formValues.tags.map((tag) => tag.id) };

    if (item) {
      await updateRawIdea(data);
    } else {
      await createRawIdea(data);
    }
  };

  return (
    <Dialog open={open}>
      <Box className={c.dialog}>
        <DialogTitle>{item ? 'Edit' : 'Add'} Raw Idea</DialogTitle>
        <DialogContent className={c.content}>
          <TextField
            label="Title"
            fullWidth
            className={c.field}
            {...register('title', { required: true })}
          />

          <TextField
            multiline
            rows={4}
            label="Description"
            fullWidth
            className={c.field}
            {...register('description', { required: true })}
          />

          <Controller
            control={control}
            name="tags"
            render={({ field }) => (
              <Autocomplete
                filterSelectedOptions={true}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                className={c.field}
                value={field.value}
                getOptionLabel={(option) => option.name}
                onChange={(_, options) => {
                  if (options.length && options[options.length - 1].id === 'new') {
                    setTagsDialogOpen(true);
                  } else {
                    field.onChange(options);
                  }
                }}
                multiple
                options={tags}
                renderInput={(params) => <TextField {...params} label="Tags" />}
                renderOption={(props, option) => {
                  if (option.id === 'new') {
                    return (
                      <Box
                        component="li"
                        onClick={(e) => {
                          e.preventDefault();
                          setTagsDialogOpen(true);
                        }}
                        {...props}
                      >
                        <Typography>Create New tag</Typography>
                      </Box>
                    );
                  } else {
                    return (
                      <Box component="li" {...props}>
                        <Chip
                          label={option.name}
                          sx={{ bgcolor: TAG_COLORS[option.color as keyof typeof TAG_COLORS] }}
                        />
                      </Box>
                    );
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  if (params.inputValue !== '') {
                    filtered.push({
                      id: 'new',
                      name: 'Create New tag',
                      color: 'tone1',
                    });
                  }

                  return filtered;
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option.name}
                      {...getTagProps({ index })}
                      sx={{ bgcolor: TAG_COLORS[option.color] }}
                    />
                  ))
                }
              />
            )}
          />

          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <FormControl fullWidth className={c.field}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={field.value}
                  label="Category"
                  onChange={(e) => field.onChange(e.target.value as RawIdeaCategory)}
                >
                  <MenuItem value="easy">Easy</MenuItem>
                  <MenuItem value="regular">Regular</MenuItem>
                  <MenuItem value="hard">Hard</MenuItem>
                  <MenuItem value="ambitious">Ambitious</MenuItem>
                  <MenuItem value="realistic">Realistic</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="important"
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                }
                label="Important"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" disabled={!formState.isValid} onClick={onSubmit}>
            {item ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Box>
      {tagsDialogOpen && (
        <TagsFormDialog open={tagsDialogOpen} onClose={() => setTagsDialogOpen(false)} tag={null} />
      )}
    </Dialog>
  );
};

export default RawIdeasFormDialog;

const useStyles = tss.create(({ theme }) => ({
  dialog: {
    width: 600,
  },
  content: {
    paddingTop: `${theme.spacing(2)} !important`,
  },
  field: {
    marginBottom: theme.spacing(2),
  },
}));
