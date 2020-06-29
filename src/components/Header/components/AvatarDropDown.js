import React from 'react';
import { Avatar, Box, Button, DropButton } from 'grommet';

const renderItems = (onLogOut) => (
  <Box width="80px" background="dark-2" align="center">
    <Button onClick={onLogOut}>Log out</Button>
  </Box>
);

export const AvatarDropButton = ({ name, onLogOut }) => (
  <DropButton
    alignSelf="center"
    dropContent={renderItems(onLogOut)}
    dropProps={{ align: { top: "bottom" } }}
  >
    <Box height="32px" width="32px" align="center">
      <Avatar background="brand">{name}</Avatar>
    </Box>
  </DropButton>
);