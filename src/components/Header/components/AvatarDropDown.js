import React, { memo } from 'react';
import { Avatar, Box, Button, DropButton, Text } from 'grommet';

const renderItems = (initials, username, onLogOut) => (
  <Box width="120px" background="dark-2" pad="xsmall" align="start">
    <Box direction="row" gap="xsmall" border="bottom">
      <Avatar
        size="small"
        background="brand"
      >
        {initials}
      </Avatar>
      <Text>{username}</Text>
    </Box>
    <Button onClick={onLogOut}>Profile</Button>
    <Button onClick={onLogOut}>Log out</Button>
  </Box>
);

const AvatarDropButtonComponent = ({ username, initials, onLogOut }) => (
  <DropButton
    alignSelf="center"
    dropContent={renderItems(initials, username, onLogOut)}
    dropProps={{ align: { top: "bottom" } }}
  >
    <Box height="32px" width="32px" align="center">
      <Avatar background="brand">{initials}</Avatar>
    </Box>
  </DropButton>
);

export const AvatarDropButton = memo(AvatarDropButtonComponent);