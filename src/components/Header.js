import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Box, Header as GrommetHeader } from 'grommet';

export const Header = () => {
  return (
    <GrommetHeader background="dark-1" pad="small">
      <Box direction="row" gap="medium">
        <Link to="/"><Anchor label="Home" tag="span" /></Link>
        <Link to="/my-notes"><Anchor label="My notes" tag="span" /></Link>
      </Box>
    </GrommetHeader>
  );
};