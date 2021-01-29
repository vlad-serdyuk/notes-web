import React, { FC, memo, useContext, useState, useCallback } from 'react';
import { Avatar, Box, DropButton, CheckBox, Text } from 'grommet';

import { GlobalContext } from 'common/contexts/globalContext';
import { Themes } from 'common/constants/global';
import { StyledButton } from './AvatarDropDown.styled';

interface BaseAvatarDropButtonProps {
  email: string,
  username: string,
  initials: string,
  theme: string;
  onLogOut: () => void,
}

interface AvatarDropButtonProps extends BaseAvatarDropButtonProps {
  openProfilePage: () => void,
}

interface RenderItemParams extends BaseAvatarDropButtonProps {
  onProfileClick: () => void,
  onSwitchTheme: () => void;
}

const renderItems = ({ email, initials, username, theme, onSwitchTheme, onProfileClick, onLogOut }: RenderItemParams): JSX.Element => (
  <Box width="160px" background="dark-2" pad="xsmall" align="start">
    <Box direction="row" align="center" gap="xsmall" border="bottom">
      <Avatar
        size="small"
        background="brand"
      >
        {initials}
      </Avatar>
      <Box>
        <Text>{username}</Text>
        <Text size="small">{email}</Text>
      </Box>
    </Box>
    <Box pad={{ top: 'small', bottom: 'small' }}>
      <CheckBox
        label="Dark"
        checked={theme === Themes.dark}
        onChange={onSwitchTheme}
        toggle
      />
    </Box>
    <StyledButton onClick={onProfileClick}>Profile</StyledButton>
    <StyledButton onClick={onLogOut}>Log out</StyledButton>
  </Box>
);

const AvatarDropButtonComponent: FC<AvatarDropButtonProps> = ({ email, username, initials, openProfilePage, onLogOut }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { theme, switchTheme } = useContext(GlobalContext);

  const onProfileClick = useCallback(() => {
    openProfilePage();
    setOpen(false);
  }, [setOpen, openProfilePage]);

  const onSwitchTheme = useCallback(() => {
    switchTheme();
  }, [switchTheme]);

  return (
    <DropButton
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      alignSelf="center"
      dropContent={renderItems({ email, initials, username, theme, onSwitchTheme, onProfileClick, onLogOut })}
      dropProps={{ align: { top: 'bottom' } }}
    >
      <Box height="32px" width="32px" align="center">
        <Avatar background="brand">{initials}</Avatar>
      </Box>
    </DropButton>
  );
}

export const AvatarDropButton = memo(AvatarDropButtonComponent);