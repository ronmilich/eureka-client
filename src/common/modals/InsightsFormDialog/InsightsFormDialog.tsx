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
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import api from 'src/common/api';
import { Insight, Tag } from 'src/common/models';
import { tss } from 'tss-react/mui';
import TagsFormDialog from '../TagsFormDialog/TagsFormDialog';
import { TAG_COLORS } from 'src/common/constants';

interface InsightsForm {
  text: string;
  important: boolean;
  tags: Tag[];
}

interface InsightsFormDialogProps {
  onClose: () => void;
  open: boolean;
  item: Insight | null;
}

const InsightsFormDialog = ({ onClose, open, item }: InsightsFormDialogProps) => {
  const [tagsDialogOpen, setTagsDialogOpen] = useState(false);
  const { register, formState, control, getValues } = useForm<InsightsForm>({
    defaultValues: {
      text: item?.text || '',
      important: item?.important || false,
      tags: item?.tags || [],
    },
  });
  const { classes: c } = useStyles();
  const queryClient = useQueryClient();

  const filter = createFilterOptions<Tag>();

  const { mutate: createInsight } = useMutation({
    mutationFn: (data: any) => api.insights.createInsight(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['insights'], (old: Insight[]) => [data, ...old]);
      onClose();
    },
  });

  const { mutate: updateInsight } = useMutation({
    mutationFn: (data: any) => api.insights.updateInsight(item!.id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(['insight'], (old: Insight[]) =>
        old.map((i) => (i.id === data.id ? data : i))
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
      await updateInsight(data);
    } else {
      await createInsight(data);
    }
  };

  return (
    <Dialog open={open}>
      <Box className={c.dialog}>
        <DialogTitle>{item ? 'Edit' : 'Add'} Insight</DialogTitle>
        <DialogContent className={c.content}>
          <TextField
          multiline
          rows={6}
            label="Text"
            fullWidth
            className={c.field}
            {...register('text', { required: true })}
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

export default InsightsFormDialog;

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
