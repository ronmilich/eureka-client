import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  Chip,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import api from 'src/common/api';
import { TAG_COLORS } from 'src/common/constants';
import { tss } from 'tss-react/mui';
import {
  AddCircle as AddProblemIcon,
  Delete as DeleteIcon,
  ModeEdit as EditIcon,
} from '@mui/icons-material';
import { Tag } from 'src/common/models';
import { TagsFormDialog } from 'src/common/modals';

export type TagManagerProps = BoxProps & {
  onClose: (tagsIds: string[] | null) => void;
  onUpdate?: () => void;
  onCreate?: () => void;
  defaultSelection?: string[];
};

const TagManager = ({
  onClose,
  onUpdate,
  onCreate,
  defaultSelection = [],
  ...props
}: TagManagerProps) => {
  const [tagsDialogOpen, setTagsDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(defaultSelection);
  const [editTag, setEditTag] = useState<Tag | null>(null);
  const queryClient = useQueryClient();
  const { classes: c } = useStyles();

  const { data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: api.tags.getTags,
    initialData: [],
  });

  const { mutate: deleteTag } = useMutation({
    mutationFn: (id: string) => api.tags.deleteTag(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(['tags'], (old: any) => old.filter((tag: any) => tag.id !== id));
    },
  });

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleTagSelect = (tagId: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      }
      return [...prev, tagId];
    });
  };

  return (
    <Box {...props} className={c.manager}>
      <Typography variant="h6">Tags Manager</Typography>
      <Box className={c.inputContainer}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          className={c.input}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <IconButton
          onClick={() => {
            setEditTag(null);
            setTagsDialogOpen(true);
          }}
          className={c.addBtn}
        >
          <AddProblemIcon />
        </IconButton>
      </Box>
      <Box className={c.items}>
        {filteredTags.map((tag) => (
          <Box className={c.item} key={tag.id} onClick={() => handleTagSelect(tag.id)}>
            <Box>
              <Checkbox color="primary" checked={selectedTags.includes(tag.id)} />
              <Chip
                key={tag.id}
                label={tag.name}
                sx={{ bgcolor: TAG_COLORS[tag.color] }}
                className={c.tag}
              />
            </Box>

            <Box className={c.itemActions}>
              <IconButton onClick={() => deleteTag(tag.id)} size="small" className={c.iconBtn}>
                <DeleteIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditTag(tag);
                  setTagsDialogOpen(true);
                }}
                className={c.iconBtn}
              >
                <EditIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
      <Box className={c.actions}>
        {selectedTags.length > 0 && (
          <Typography className={c.clearBtn} onClick={() => setSelectedTags([])}>
            Clear all
          </Typography>
        )}
        <Button className={c.actionBtn} sx={{ mr: 1 }} onClick={() => onClose(null)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          className={c.actionBtn}
          onClick={() => onClose(selectedTags)}
        >
          Apply
        </Button>
      </Box>
      {tagsDialogOpen && (
        <TagsFormDialog
          onUpdate={onUpdate}
          open={tagsDialogOpen}
          onClose={() => setTagsDialogOpen(false)}
          tag={editTag}
        />
      )}
    </Box>
  );
};

const useStyles = tss.withNestedSelectors<'itemActions'>().create(({ theme, classes }) => ({
  manager: {
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 6,
    backgroundColor: theme.palette.background.paper,
  },
  inputContainer: { marginBottom: theme.spacing(1), display: 'flex', alignItems: 'center' },
  input: {
    marginRight: theme.spacing(1),
  },
  addBtn: {
    color: theme.palette.primary.main,
    padding: 0,
  },
  items: {
    height: 220,
    overflowY: 'auto',
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 6,
    scrollbarWidth: 'none',
  },

  item: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    [`&:hover .${classes.itemActions}`]: {
      visibility: 'visible',
    },
  },
  itemActions: {
    visibility: 'hidden',
    display: 'flex',
  },
  iconBtn: {
    color: theme.palette.text.disabled,
  },
  itemCheckbox: {
    marginRight: theme.spacing(1),
  },
  actions: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(1),
  },
  actionBtn: {
    height: 32,
    textTransform: 'none',
  },
  clearBtn: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',

    color: theme.palette.primary.main,
  },
  tag: {
    maxWidth: 120,
  },
}));
export default TagManager;
