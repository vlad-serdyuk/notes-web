import React, { memo } from 'react';
import { Avatar, Box, Button, DropButton, Text } from 'grommet';

const renderItems = (username, onLogOut) => (
  <Box width="120px" background="dark-2" pad="xsmall" align="start">
    <Text>{username}</Text>
    <Button onClick={onLogOut}>Profile</Button>
    <Button onClick={onLogOut}>Log out</Button>
  </Box>
);

const AvatarDropButtonComponent = ({ username, name, onLogOut }) => (
  <DropButton
    alignSelf="center"
    dropContent={renderItems(username, onLogOut)}
    dropProps={{ align: { top: "bottom" } }}
  >
    <Box height="32px" width="32px" align="center">
      <Avatar background="brand">{name}</Avatar>
    </Box>
  </DropButton>
);

export const AvatarDropButton = memo(AvatarDropButtonComponent);