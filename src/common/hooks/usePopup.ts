import { useState } from 'react';

const usePopup = (): [
  boolean,
  HTMLElement | null,
  (event: React.MouseEvent<HTMLElement>) => void,
  () => void
] => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handlePopupOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handlePopupClose = () => setAnchorEl(null);

  return [open, anchorEl, handlePopupOpen, handlePopupClose];
};

export default usePopup;
