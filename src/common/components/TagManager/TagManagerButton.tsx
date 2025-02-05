import { listClasses, Menu } from '@mui/material';
import { usePopup } from 'src/common/hooks';
import TagManager, { TagManagerProps } from './TagManager';

type TagManagerButtonProps = TagManagerProps & {
  children: React.ReactNode;
};

const TagManagerButton = ({ children, onClose, ...props }: TagManagerButtonProps) => {
  const [open, anchorEl, handleOpen, handleClose] = usePopup();

  return (
    <>
      <div
        style={{
          height: 'fit-content',
          display: 'flex',
          alignItems: 'flex-start',
          cursor: 'pointer',
        }}
        onClick={handleOpen}
      >
        {children}
      </div>
      <Menu
        sx={{
          [`& .${listClasses.root}`]: { p: 0 },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <TagManager
          onClose={(tags) => {
            onClose(tags);
            handleClose();
          }}
          {...props}
        />
      </Menu>
    </>
  );
};

export default TagManagerButton;
