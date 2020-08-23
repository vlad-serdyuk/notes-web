import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { css } from 'styled-components';

export const theme = deepMerge(grommet, {
  global: {
    font: {
      size: '16px',
    }
  },
  tabs: {
    header: {
      extend: () => css`
        margin-top: 16px;
        margin-bottom: -12px;
      `,
    }
  },
  tab: {
    color: 'text',
    background: 'none',
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