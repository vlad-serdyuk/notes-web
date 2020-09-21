import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';
import { css } from 'styled-components';

export const theme = deepMerge(grommet, {
  global: {
    font: {
      size: '16px',
    }
  },
  button: {
    border: {
      radius: '12px',
    },
  },
  tabs: {
    header: {
      extend: () => css`
        margin-top: 16px;
        margin-bottom: -12px;
        flex-wrap: nowrap;
        text-align: center;
      `,
    }
  },
  tab: {
    color: 'text',
    background: 'none',
    width: '100%',
    hover: {
      background: 'background-back',
      color: 'control',
    },
    border: {
      side: 'bottom',
      color: 'background-back',
      active: {
        color: 'control',
      },
      hover: {
        color: 'control',
      },
    },
    pad: '8px',
    margin: 'none',
  },
});