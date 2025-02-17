import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material';
import { SlimIdea } from 'src/common/models';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { usePopup } from 'src/common/hooks';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/common/api';

interface SlimIdeasTableActionsCellProps {
  slimIdea: SlimIdea;
}

const scoreColor = (score: number) => {
  if (score < 10) {
    return '#a8a7a7';
  } else if (score > 10 && score < 30) {
    return '#cf6363';
  } else if (score > 30 && score < 50) {
    return '#FFFF00';
  } else if (score > 50 && score < 70) {
    return '#ADFF2F';
  } else if (score > 70 && score < 90) {
    return '#32CD32';
  } else {
    return '#008000';
  }
};

const SlimIdeasTableActionsCell = ({ slimIdea }: SlimIdeasTableActionsCellProps) => {
  const [open, anchorEl, handleOpen, handleClose] = usePopup();
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteIdea } = useMutation({
    mutationFn: () => api.ideas.deleteIdea(slimIdea.id),
    onSuccess: () =>
      queryClient.setQueryData(['slim-ideas'], (old: SlimIdea[]) =>
        old.filter((idea) => idea.id !== slimIdea.id)
      ),
  });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          borderRadius: '50%',
          bgcolor: scoreColor(slimIdea.metadata.score),
          alignContent: 'center',
          width: 24,
          height: 24,
          justifyItems: 'center',
        }}
      >
        <Typography variant="body1" noWrap fontWeight={700}>
          {slimIdea.metadata.score}
        </Typography>
      </Box>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuList dense>
          <MenuItem
            onClick={() => {
              setOpenDialog(true);
              handleClose();
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Delete Idea
          </MenuItem>
        </MenuList>
      </Menu>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Idea</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this idea?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => deleteIdea()}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SlimIdeasTableActionsCell;
