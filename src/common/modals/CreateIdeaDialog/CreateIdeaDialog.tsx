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
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { DIFFICULTY, IDEA_STATUSES, SERVICE_TYPES, TAG_COLORS } from 'src/common/constants';
import { CreateIdeaRequestBody, Difficulty, IdeaStatus, ServiceType, Tag } from 'src/common/models';
import { tss } from 'tss-react/mui';
import TagsFormDialog from '../TagsFormDialog/TagsFormDialog';
import api from 'src/common/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface CreateIdeaDialogProps {
  open: boolean;
  onClose: () => void;
}

interface IdeaForm {
  title: string;
  shortDescription: string;
  serviceType: ServiceType;
  status: IdeaStatus;
  difficulty: Difficulty;
  estimatedDevelopmentTime: number;
  tags: Tag[];
  detailedDescription: string;
}

const CreateIdeaDialog = ({ open, onClose }: CreateIdeaDialogProps) => {
  const { classes: c } = useStyles();
  const [tagsDialogOpen, setTagsDialogOpen] = useState(false);
  const [timespan, setTimespan] = useState('Days');
  const queryClient = useQueryClient();
  const { register, formState, control, getValues } = useForm<IdeaForm>({
    defaultValues: {
      title: '',
      shortDescription: '',
      serviceType: 'Mobile App',
      status: 'Draft',
      difficulty: 'Easy',
      estimatedDevelopmentTime: 0,
      tags: [],
      detailedDescription: '',
    },
  });

  const filter = createFilterOptions<Tag>();

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: api.tags.getTags,
    initialData: [],
  });

  const { mutate: createIdea } = useMutation({
    mutationFn: (data: CreateIdeaRequestBody) => api.ideas.createIdea(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['slim-ideas'], (old: any) => [data, ...old]);
      onClose();
    },
  });

  const onSubmit = () => {
    const values = getValues();
    createIdea({
      metadata: {
        tags: values.tags.map((tag) => tag.id),
        status: values.status,
      },
      details: {
        serviceType: values.serviceType,
        shortDescription: values.shortDescription,
        title: values.title,
        detailedDescription: '',
      },
      feasibility: {
        difficulty: values.difficulty,
        estimatedDevelopmentTime: values.estimatedDevelopmentTime,
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Create Idea</DialogTitle>
      <DialogContent className={c.content}>
        <TextField
          {...register('title', { required: true })}
          label="Title*"
          className={c.field}
          fullWidth
        />
        <TextField
          {...register('shortDescription', { required: true })}
          label="Short Description*"
          className={c.field}
          fullWidth
          multiline
          rows={4}
        />

        <Controller
          rules={{ required: true }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              disablePortal
              defaultValue={SERVICE_TYPES[0]}
              options={SERVICE_TYPES}
              fullWidth
              className={c.field}
              onChange={(_, data) => field.onChange(data)}
              renderInput={(params) => <TextField {...params} label="Service Type*" />}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography>{option}</Typography>
                </li>
              )}
            />
          )}
          name="serviceType"
          control={control}
        />

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <FormControl fullWidth className={c.field}>
              <InputLabel>Status*</InputLabel>
              <Select
                defaultValue={field.value}
                value={field.value}
                label="Status*"
                onChange={(e) => field.onChange(e.target.value)}
              >
                {IDEA_STATUSES.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="difficulty"
          render={({ field }) => (
            <FormControl fullWidth className={c.field}>
              <InputLabel>Difficulty*</InputLabel>
              <Select
                defaultValue={field.value}
                value={field.value}
                label="Difficulty*"
                onChange={(e) => field.onChange(e.target.value)}
              >
                {DIFFICULTY.map((difficulty) => (
                  <MenuItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </MenuItem>
                ))}
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

        <Typography sx={{ mb: 2 }}>Estimated Development Time:</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl fullWidth sx={{ marginRight: 2 }}>
            <InputLabel>Timespan*</InputLabel>
            <Select
              defaultValue={'Days'}
              value={timespan}
              label="Timespan*"
              onChange={(e) => setTimespan(e.target.value)}
            >
              <MenuItem value={'Days'}>Days</MenuItem>
              <MenuItem value={'Months'}>Months</MenuItem>
              <MenuItem value={'Years'}>Years</MenuItem>
            </Select>
          </FormControl>

          <TextField
            {...register('estimatedDevelopmentTime', { required: true })}
            label={`Number of ${timespan}*`}
            defaultValue={0}
            type="number"
            fullWidth
          />
        </Box>

        {tagsDialogOpen && (
          <TagsFormDialog
            open={tagsDialogOpen}
            onClose={() => setTagsDialogOpen(false)}
            tag={null}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={!formState.isDirty || !formState.isValid}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateIdeaDialog;

const useStyles = tss.create(({ theme }) => ({
  content: {
    paddingTop: `${theme.spacing(2)} !important`,
  },
  field: {
    marginBottom: theme.spacing(2),
    minWidth: 400,
  },
}));
