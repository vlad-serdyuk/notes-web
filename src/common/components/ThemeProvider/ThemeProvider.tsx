import React, { FC, useContext } from 'react';
import { Grommet } from 'grommet';

import { theme } from '../../../styled/theme';
import { GlobalContext } from '../../../common/contexts/globalContext';

export const ThemeProvider: FC = ({ children }) => {
  const { theme: themeMode } = useContext(GlobalContext);

  return (
    <Grommet theme={theme} themeMode={themeMode}>
      {children}
    </Grommet>
  );
};