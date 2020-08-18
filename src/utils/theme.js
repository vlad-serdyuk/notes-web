import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

export const theme = deepMerge(grommet, {
  tab: {
    color: 'text',
    active: {
      background: 'background-back',
    },
    hover: {
      background: 'background-back',
      color: 'control',
    },
    border: {
      side: 'bottom',
      color: 'background-back',
      active: {
        color: 'border',
      },
      hover: {
        color: 'control',
      },
    },
    pad: 'none',
    margin: 'none',
  },
});