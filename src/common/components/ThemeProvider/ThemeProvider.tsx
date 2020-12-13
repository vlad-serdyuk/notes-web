import React, { FC } from 'react';
import { Grommet } from 'grommet';
import { theme } from '../../../styled/theme';

export const ThemeProvider: FC = ({ children }) => {
  return (
    <Grommet theme={theme} themeMode="light">
      {children}
    </Grommet>
  );
};