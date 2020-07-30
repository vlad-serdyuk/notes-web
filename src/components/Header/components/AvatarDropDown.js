import React, { memo } from 'react';
import { Avatar, Box, Button, DropButton, Text } from 'grommet';

import { StyledButton } from './AvatarDropDown.styled';

const renderItems = (email, initials, username, onLogOut) => (
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
    <StyledButton onClick={onLogOut}>Profile</StyledButton>
    <StyledButton onClick={onLogOut}>Log out</StyledButton>
  </Box>
);

const AvatarDropButtonComponent = ({ email, username, initials, onLogOut }) => (
  <DropButton
    alignSelf="center"
    dropContent={renderItems(email, initials, username, onLogOut)}
    dropProps={{ align: { top: "bottom" } }}
  >
    <Box height="32px" width="32px" align="center">
      <Avatar background="brand">{initials}</Avatar>
    </Box>
  </DropButton>
);

export const AvatarDropButton = memo(AvatarDropButtonComponent);