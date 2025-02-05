import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { appMode } from 'src/common/store';
import { createNewTheme } from 'src/common/theme';

interface AppThemeProps {
  children: ReactNode;
}

const AppTheme = ({ children }: AppThemeProps) => {
  const appTheme = createNewTheme(appMode.value);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
