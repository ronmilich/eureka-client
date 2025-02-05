import { createTheme, PaletteMode } from '@mui/material';
import { chipComponentOverrides } from './Chip.styles';

export const createNewTheme = (mode: PaletteMode = 'light') =>
  createTheme({
    components: {
      ...chipComponentOverrides,
    },
    palette: {
      mode,
    },
  });
