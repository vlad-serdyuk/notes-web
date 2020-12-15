import React, { FC, useCallback, useContext } from 'react';
import { Box, CheckBox, Text } from 'grommet';

import { GlobalContext } from '../../common/contexts/globalContext';
import { Themes } from '../../common/constants/global';
import { SubmitButton } from './DisplaySettings.styled';

export const DisplaySettings: FC = () => {
  const { theme, switchTheme } = useContext(GlobalContext);

  const onSwitchTheme = useCallback(() => {
    switchTheme();
  }, [switchTheme]);

  const resetPassword = () => null;

  return (
    <Box gap="small">
      <Text>Theme</Text>
      <CheckBox
        label="Dark"
        checked={theme === Themes.dark}
        onChange={onSwitchTheme}
        toggle
      />
      
      <Box align="end">
        <SubmitButton
          primary
          label="Save"
          onClick={resetPassword}
        />
      </Box>
    </Box>
  ); 
};