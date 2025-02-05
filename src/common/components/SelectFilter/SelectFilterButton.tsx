import { Button, listClasses, Menu } from '@mui/material';
import SelectFilter, { SelectFilterProps } from './SelectFilter';
import { usePopup } from 'src/common/hooks';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';

type SelectFilterButtonProps = SelectFilterProps & {
  filterName: string;
};

const SelectFilterButton = ({ onClose, filterName, data, ...props }: SelectFilterButtonProps) => {
  const [open, anchorEl, handleOpen, handleClose] = usePopup();
  const selectedItems = data.filter((item) => item.selected);

  const name = `${filterName} ${
    selectedItems.length === 0
      ? ''
      : selectedItems.length === 1
      ? `${selectedItems[0].label}`
      : `(${selectedItems.length})`
  }`;

  return (
    <>
      <Button
        size="small"
        sx={{ textTransform: 'none', fontSize: '16px', bgcolor: open ? 'action.hover' : 'default' }}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        onClick={handleOpen}
      >
        {name}{' '}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          [`& .${listClasses.root}`]: { p: 0 },
        }}
      >
        <SelectFilter
          data={data}
          onClose={(selected) => {
            onClose(selected);
            handleClose();
          }}
          {...props}
        />
      </Menu>
    </>
  );
};

export default SelectFilterButton;
