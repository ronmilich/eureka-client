import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { ChangeEvent, JSX, useState } from 'react';
import { tss } from 'tss-react/mui';
import { Search as SearchIcon } from '@mui/icons-material';

export interface SelectFilterItem {
  id: string;
  label: string;
  selected: boolean;
  [key: string]: any;
}

export interface SelectFilterProps {
  searchable?: boolean;
  onClose: (selectedItems: SelectFilterItem[] | null) => void;
  data: SelectFilterItem[];
  label?: (item: SelectFilterItem) => JSX.Element;
}

const SelectFilter = ({ searchable = true, onClose, data = [], label }: SelectFilterProps) => {
  const { classes: c } = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [items, setItems] = useState<SelectFilterItem[]>(data);

  const filterdItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleItemSelect = (item: SelectFilterItem) => {
    const newItems = items.map((i) => (i.id === item.id ? { ...i, selected: !i.selected } : i));
    setItems(newItems);
  };

  const toggleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    const newItems = items.map((i) => ({ ...i, selected: event.target.checked }));
    setItems(newItems);
  };

  return (
    <Box className={c.filter}>
      {searchable && (
        <TextField
          className={c.input}
          size="small"
          fullWidth
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          slotProps={{
            input: { startAdornment: <SearchIcon sx={{ mr: 1 }} /> },
          }}
        />
      )}

      <FormControlLabel
        className={c.selectAll}
        control={
          <Checkbox
            color="primary"
            checked={filterdItems.length > 0 && filterdItems.every((item) => item.selected)}
            onChange={toggleSelectAll}
          />
        }
        label="Select all"
      />

      <Box className={c.items}>
        {filterdItems.map((item) => (
          <Box
            sx={{
              bgcolor: item.selected ? 'action.hover' : 'inherit',
            }}
            className={c.item}
            key={item.id}
            onClick={() => handleItemSelect(item)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox color="primary" checked={item.selected} />
              {label?.(item) || <Typography>{item.label}</Typography>}
            </Box>
          </Box>
        ))}
      </Box>

      <Box className={c.actions}>
        <Button className={c.actionBtn} sx={{ mr: 1 }} onClick={() => onClose(null)}>
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          className={c.actionBtn}
          onClick={() => onClose(items)}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
};

export default SelectFilter;

const useStyles = tss.create(({ theme }) => ({
  filter: {
    minWidth: 250,
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 6,
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    marginBottom: theme.spacing(1),
    width: 250,
    display: 'block',
  },
  selectAll: {
    marginLeft: 2,
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
  items: {
    height: 200,
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    scrollbarWidth: 'none',
    paddingTop: theme.spacing(1),
  },

  item: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

//selectedItems.some((selectedItem) => selectedItem.id === item.id
