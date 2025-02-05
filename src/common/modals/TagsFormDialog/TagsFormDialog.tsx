import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import api from 'src/common/api';
import { TAG_COLORS } from 'src/common/constants';
import { Tag } from 'src/common/models';
import { tss } from 'tss-react/mui';
import { Done as DoneIcon } from '@mui/icons-material';
import { useState } from 'react';

interface TagsFormDialogProps {
  open: boolean;
  tag: Tag | null;
  onClose: () => void;
  onUpdate?: () => void;
}

interface TagsForm {
  name: string;
  color: string;
}

const TagsFormDialog = ({ onClose, open, tag, onUpdate }: TagsFormDialogProps) => {
  const [selectedColor, setSelectedColor] = useState(tag?.color || 'tone1');
  const { register, formState, control, getValues } = useForm<TagsForm>({
    defaultValues: {
      name: tag?.name || '',
      color: tag?.color || 'tone1',
    },
  });
  const { classes: c } = useStyles();
  const queryClient = useQueryClient();

  const { mutate: createTag } = useMutation({
    mutationFn: (data: any) => api.tags.createTag(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['tags'], (old: any) => [data, ...old]);
      onClose();
    },
  });

  const { mutate: updateTag } = useMutation({
    mutationFn: (data: any) => api.tags.updateTag(tag!.id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(['tags'], (old: any) =>
        old.map((p: any) => (p.id === data.id ? data : p))
      );
      onUpdate?.();
      onClose();
    },
  });

  const onSubmit = async () => {
    if (tag) {
      await updateTag(getValues());
    } else {
      await createTag(getValues());
    }
  };

  return (
    <Dialog open={open}>
      <Box className={c.dialog}>
        <DialogTitle>{tag ? 'Edit' : 'Add'} Tag</DialogTitle>

        <DialogContent className={c.content}>
          <TextField
            label="Title"
            fullWidth
            className={c.field}
            {...register('name', { required: true })}
          />

          <Controller
            control={control}
            name="color"
            render={({ field }) => (
              <Box className={c.colors}>
                {Object.entries(TAG_COLORS).map(([key, value]) => (
                  <Box
                    key={key}
                    className={c.color}
                    sx={{ bgcolor: value }}
                    onClick={() => {
                      setSelectedColor(key as any);
                      field.onChange(key);
                    }}
                  >
                    {selectedColor === key && <DoneIcon className={c.doneIcon} />}
                  </Box>
                ))}
              </Box>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" disabled={!formState.isValid} onClick={onSubmit}>
            {tag ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default TagsFormDialog;

const useStyles = tss.create(({ theme }) => ({
  dialog: {
    minWidth: 400,
  },
  content: {
    paddingTop: `${theme.spacing(2)} !important`,
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  colors: {
    display: 'flex',
  },
  color: {
    width: 32,
    height: 32,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      opacity: 0.8,
      transform: 'scale(1.1)',
    },
  },
  doneIcon: {
    color: 'white',
  },
}));
