import React, { FC, useCallback, useContext } from 'react';
import { Box, CheckBox, Text } from 'grommet';

import { Themes } from 'common/constants/global';
import { GlobalContext } from 'common/contexts/globalContext';

export const DisplaySettings: FC = () => {
  const { theme, switchTheme } = useContext(GlobalContext);

  const onSwitchTheme = useCallback(() => {
    switchTheme();
  }, [switchTheme]);

  return (
    <Box gap="small">
      <Text>Theme</Text>
      <CheckBox
        label="Dark"
        checked={theme === Themes.dark}
        onChange={onSwitchTheme}
        toggle
      />
    </Box>
  ); 
};