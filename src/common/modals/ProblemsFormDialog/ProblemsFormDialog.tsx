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
import { Problem, ProblemPriority, Tag } from 'src/common/models';
import { tss } from 'tss-react/mui';
import TagsFormDialog from '../TagsFormDialog/TagsFormDialog';
import { TAG_COLORS } from 'src/common/constants';

interface ProblemsForm {
  title: string;
  description: string;
  important: boolean;
  priority: ProblemPriority;
  tags: Tag[];
}

interface ProblemsFormDialogProps {
  onClose: () => void;
  open: boolean;
  item: Problem | null;
}

const ProblemsFormDialog = ({ onClose, open, item }: ProblemsFormDialogProps) => {
  const [tagsDialogOpen, setTagsDialogOpen] = useState(false);
  const { register, formState, control, getValues } = useForm<ProblemsForm>({
    defaultValues: {
      title: item?.title || '',
      description: item?.description || '',
      important: item?.important || false,
      priority: item?.priority || 'regular',
      tags: item?.tags || [],
    },
  });
  const { classes: c } = useStyles();
  const queryClient = useQueryClient();

  const filter = createFilterOptions<Tag>();

  const { mutate: createProblem } = useMutation({
    mutationFn: (data: any) => api.problems.createProblem(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['problems'], (old: any) => [data, ...old]);
      onClose();
    },
  });

  const { mutate: updateProblem } = useMutation({
    mutationFn: (data: any) => api.problems.updateProblem(item!.id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(['problems'], (old: any) =>
        old.map((p: any) => (p.id === data.id ? data : p))
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
      await updateProblem(data);
    } else {
      await createProblem(data);
    }
  };

  return (
    <Dialog open={open}>
      <Box className={c.dialog}>
        <DialogTitle>{item ? 'Edit' : 'Add'} Problem</DialogTitle>
        <DialogContent className={c.content}>
          <TextField
            label="Title"
            fullWidth
            className={c.field}
            {...register('title', { required: true })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            className={c.field}
            {...register('description')}
          />

          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <FormControl fullWidth className={c.field}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={field.value}
                  label="Priority"
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="regular">Regular</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            )}
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

export default ProblemsFormDialog;

const useStyles = tss.create(({ theme }) => ({
  dialog: {
    width: 600,
  },
  content: {
    paddingTop: theme.spacing(4),
  },
  field: {
    marginBottom: theme.spacing(2),
  },
}));
