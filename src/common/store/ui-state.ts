import { PaletteMode } from '@mui/material';
import { signal } from '@preact/signals-react';

export const appMode = signal<PaletteMode>('dark');
export const appDrawer = signal<boolean>(true);

export const uiStateActions = {
  toggleMode: () => (appMode.value = appMode.value === 'light' ? 'dark' : 'light'),
  toggleDrawer: () => (appDrawer.value = !appDrawer.value),
};
