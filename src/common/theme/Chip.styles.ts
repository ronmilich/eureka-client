import { Theme } from '@emotion/react';
import { ComponentsVariants, ComponentsProps, chipClasses } from '@mui/material';
import '@mui/material/Chip';

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    lean: true;
  }
}

const defaultProps: ComponentsProps['MuiChip'] = {
  size: 'small',
  variant: 'lean',
};

const variants: ComponentsVariants<Theme>['MuiChip'] = [
  {
    props: { variant: 'lean' },
    style: {
      color: 'white',
      borderRadius: 6,
      [`& .${chipClasses.deleteIcon}`]: {
        color: 'white',
      },
      [`& .${chipClasses.deleteIcon}:hover`]: {
        color: '#DADADA',
      },
    },
  },
];

export const chipComponentOverrides = {
  MuiChip: {
    variants,
    defaultProps,
  },
};
